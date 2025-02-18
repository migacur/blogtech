import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
   
    try {
      const query = `
      SELECT publicaciones.*, usuarios.username, categorias.nombre_categoria FROM publicaciones 
      LEFT JOIN usuarios
      ON publicaciones.idUsuario = usuarios.usuario_id
      LEFT JOIN categorias
      ON publicaciones.categoria = categorias.categoria_id
      ORDER BY fecha_publicado DESC
      LIMIT 10;
      `;
  
      const results = await new Promise((resolve, reject) => {
        database.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      return NextResponse.json(results, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor'}, { status: 500});
    }
  }
  
