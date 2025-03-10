import database from '@/app/libs/mysql';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const bcrypt = require('bcrypt');

export async function POST(request) {
    try {
      const data = await request.json();
      const { username,password } = data;
     
      if(!username || !password){
        return NextResponse
        .json({msg: "Ambos campos son obligatorios"}, {status:400})
      }

      const query = 'SELECT usuarios.usuario_id,usuarios.username,usuarios.password,usuarios.email FROM usuarios WHERE username = ?';
  
      const results = await new Promise((resolve, reject) => {
        database.query(query,[username],(error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      
      if(results.length === 0){
        console.log(results.length)
        return NextResponse.json({ msg: 'No se ha encontrado el usuario'}, { status: 401});
      }
      const userPassword = results[0].password;
      const email = results[0].email;
      const userId = results[0].usuario_id;
 
      if(!await bcrypt.compare(password, userPassword)){
        return NextResponse.json({ msg: "La contraseña es incorrecta" }, { status: 401 });
      }

      
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 28800,
          userId,
          username
        },
        process.env.JWT_SECRET
      );
      
      const usuario = {id: userId, name: username}

      const response = NextResponse.json({
        token,
        usuario,
        status:200
      });
  
      response.cookies.set({
        name: "myToken",
        value: token,
        httpOnly: true,
     secure: true,
     sameSite: "strict",
      maxAge: 1 * 60 * 1000,
        path: "/",
      });

      response.cookies.set({
        name: "usuario",
        value: JSON.stringify(usuario),
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 60 * 1000,
        path: "/",
      });
      

      return response;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor'}, { status: 500});
    }
  }