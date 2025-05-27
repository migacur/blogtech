import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    let limite = 5;
    try {
      const query = `
      SELECT publicaciones.publicacion_id,publicaciones.titulo, usuarios.username, categorias.nombre_categoria, COUNT(votos_publicacion.voto_id) as contador_votos FROM publicaciones 
      LEFT JOIN usuarios
      ON publicaciones.idUsuario = usuarios.usuario_id
      LEFT JOIN categorias
      ON publicaciones.categoria = categorias.categoria_id
      LEFT JOIN votos_publicacion
      ON votos_publicacion.postId = publicaciones.publicacion_id
      GROUP BY publicaciones.publicacion_id
      ORDER BY (publicaciones.visitas + contador_votos)/2 DESC LIMIT ?;
      `;

      const [results] = await database.query(query, [limite]);
  
      return NextResponse.json(results, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor'}, { status: 500});
    }
  }
  