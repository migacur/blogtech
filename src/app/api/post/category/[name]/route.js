import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
      const category = params.name.trim();
      console.log(category)
      const query = `
        SELECT * FROM publicaciones 
        LEFT JOIN categorias
        ON publicaciones.categoria = categorias.categoria_id
        WHERE nombre_categoria = ?
        ORDER BY fecha_publicado DESC;
      `;
  
      const results = await new Promise((resolve, reject) => {
        database.query(query, [category], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    
        return NextResponse.json(results,{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }
