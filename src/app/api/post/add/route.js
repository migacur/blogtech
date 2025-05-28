import { NextResponse } from 'next/server';
import cloudinary from '../../../libs/cloudinary';
import database from '@/app/libs/mysql';
import { roleMiddleware } from '@/app/api/roleMiddleware';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const token = request.cookies.get('myToken');
  const data = await request.formData();
  const imagen = data.get('file');
  const titulo = data.get('titulo');
  const subtitulo = data.get('subtitulo');
  const contenido = data.get('texto');
  const categoria = data.get('categoria');
 
  try {
    if (!token) {
      return NextResponse.json(
        { msg: "Usuario no autorizado" },
        { status: 401 }
      );
    }
    
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const userId = decoded.userId;
   
    const middlewareResponse = await roleMiddleware(request, userId, 'Admin');
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Validar campos obligatorios
    if (!titulo.trim() || !subtitulo.trim() || !contenido.trim() || !categoria.trim()) {
      return NextResponse.json({ msg: "Todos los campos son obligatorios", status: 400 });
    }

    // Validar la imagen
    if (!imagen) {
      return NextResponse.json({ msg: "No se encontró la imagen", status: 400 });
    }

    // Subir la imagen a Cloudinary (sin cambios, ya usa promesas)
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }).end(buffer);
    });
    const imagenFinal = response.url;

    // Obtener conexión de la base de datos
    const connection = await database.getConnection();
    
    try {
      await connection.beginTransaction(); // Iniciar transacción

      // Insertar la publicación en la base de datos usando mysql2/promise
      const query = `
        INSERT INTO publicaciones (titulo, subtitulo, imagen, texto, fecha_publicado, categoria, idUsuario)
        VALUES (?, ?, ?, ?, NOW(), ?, ?);
      `;
      
      const [results] = await connection.query(query, [
        titulo, 
        subtitulo, 
        imagenFinal, 
        contenido, 
        categoria, 
        userId
      ]);
      console.log(results)
      await connection.commit(); // Confirmar transacción
      
      return NextResponse.json({ 
        msg: "Publicación realizada exitosamente", 
        status: 200 
      });
    } catch (error) {
      await connection.rollback(); // Revertir en caso de error
      throw error; // Lanzar el error al catch principal
    } finally {
      connection.release(); // Liberar la conexión siempre
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ 
      msg: "No se pudo realizar la publicación", 
      status: 500 
    });
  }
}