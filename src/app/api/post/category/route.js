import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(){
    try {
      const query = 'SELECT * FROM categorias';
  
      const results = await new Promise((resolve, reject) => {
        database.query(query, (error, results) => {
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
