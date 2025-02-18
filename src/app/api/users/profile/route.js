import { NextResponse } from 'next/server';
import database from '@/app/libs/mysql';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(request) {
  // Obtén la cookie 'myToken'
  const token = request.cookies.get('myToken')?.value;
console.log(`El token es: ${token}`)
const cookieStore = cookies();
const tokenJWT = cookieStore.get('myToken')?.value;
console.log(tokenJWT)
  if (!token) {
    return NextResponse.json(
      { msg: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    // Decodifica el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener JWT_SECRET en tus variables de entorno
    const userId = decoded.userId; // Asume que el payload del token contiene un campo `userId`

    // Consulta SQL para obtener el perfil del usuario
    const query = `
      SELECT 
        usuarios.username, 
        usuarios.email, 
        rangos.nombre_rango as rango_usuario, 
        COUNT(votos_publicacion.userId) as votos_usuario 
      FROM usuarios
      LEFT JOIN rangos ON rangos.rango_id = usuarios.rango
      LEFT JOIN votos_publicacion ON votos_publicacion.userId = usuarios.usuario_id
      WHERE usuario_id = ?;
    `;

    const results = await new Promise((resolve, reject) => {
      database.query(query, [userId], (error, results) => { // Usa el userId en la consulta
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      return NextResponse.json(
        { msg: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0], { status: 200 });
  } catch (error) {
    console.error('Error en la consulta:', error);
    return NextResponse.json(
      { msg: 'Error en el servidor' },
      { status: 500 }
    );
  }
}