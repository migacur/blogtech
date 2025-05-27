import database from "@/app/libs/mysql";
import { NextResponse } from 'next/server';

export async function GET(request, { params }){
 
 //  console.log(params.data[0])
  const postId = params.data[0]
  const categoryId = params.data[1]
  console.log(postId,categoryId)
    // Obtén los parámetros de consulta de la solicitud

    try {
        const query = `
        SELECT * FROM publicaciones
        LEFT JOIN categorias
        ON publicaciones.categoria = categorias.categoria_id
        WHERE categorias.categoria_id = ? AND publicaciones.publicacion_id != ?
        ORDER BY publicaciones.fecha_publicado DESC
        LIMIT 5;
        `

         const [results] = await database.query(query, [categoryId,postId]);
          return NextResponse.json({results,status:200});
          
  
      } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
      }
}