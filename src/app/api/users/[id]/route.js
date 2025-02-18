import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

/* Mostrar por ID */
export async function GET(request, { params }) {
    try {
      const userId = params.id;
  
      const query = 'SELECT * FROM usuarios WHERE usuario_id = ?';
  
      const results = await new Promise((resolve, reject) => {
        database.query(query, [userId], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      console.log(results)
        return NextResponse.json(results,{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }

   /* Actualizar */

   export async function PUT(request,{params}){
    try {
      const userId = params.id;
      const data = await request.json();
  
      const query = `
      UPDATE usuarios
      SET username = ?,
      password = ?,
      email = ?
      WHERE usuario_id = ?
      `;
  
      const results = await new Promise((resolve, reject) => {
       database.query(query, [data,userId], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  
      return NextResponse.json({results,status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }
  

  /* Eliminar */
  export async function DELETE(request,{ params }) {
    try {
      const userId = params.id;
      const query = 'DELETE FROM usuarios WHERE usuario_id = ?';
  
      const results = await new Promise((resolve, reject) => {
        database.query(query, [userId], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  
      return NextResponse.json({results,status: 200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' }, {status:500});
    }
  }