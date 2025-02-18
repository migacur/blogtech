import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function verifyUsername (username,email){
    try {
        const query = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    
        const results = await new Promise((resolve, reject) => {
          database.query(query,[username,email],(error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
 
        if(results.length){
            return NextResponse.json({msg:"Ya existe un usuario con ese username"} , { status: 401 });
        }
  
      } catch (error) {
        return NextResponse.json({ msg: 'Ocurrió un error en el servidor'}, { status: 500});
      }
}