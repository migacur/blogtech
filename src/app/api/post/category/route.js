import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(){
    try {
      const query = 'SELECT * FROM categorias';

      const [results] = await database.query(query);
    
        return NextResponse.json(results,{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }
