import { verifyUsername } from "@/app/helpers/verifyUsername";
import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');
/*
export async function GET() {
    try {
      const query = 'SELECT * FROM usuarios';
  
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
*/
  export async function POST(request) {
    try {
      const data = await request.json();
      const { username,password,password_repeat,email } = data;
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if(username.trim().length < 8 || username.trim().length > 20){
        return NextResponse
        .json({msg: "El nombre de usuario debe contener entre 8 y 20 caracteres"}, {status:400})
      }

      if(password.trim().length < 10){
        return NextResponse
        .json({msg: "La contraseña debe contener al menos 10 caracteres"}, {status:400})
      }


      if(password !== password_repeat){
        return NextResponse.json({msg: "Las contraseñas no coinciden"}, {status:400})
      }

      if(!regex.test(email)){
        return NextResponse.json({msg: "El email tiene un formato inválido"}, {status:400})
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const comprobarUsername = await verifyUsername(username.trim(),email.trim())
      
      if(comprobarUsername?.status === 401){
        return NextResponse
                .json({msg: "El username y/o email ya se encuentran registrado"}, {status:400})
      }
      
      const query = 'INSERT INTO usuarios(username,password,email) VALUES (?,?,?)';
  
      const results = await new Promise((resolve, reject) => {
        database.query(query,[username,hashPassword,email],(error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      return NextResponse.json({results, status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor'}, { status: 500});
    }
  }