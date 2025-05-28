// roleMiddleware.js
import { NextResponse } from 'next/server';
import database from '../libs/mysql';

export async function roleMiddleware(request,userId,requiredRole) {
 
  try {
    const query = `
      SELECT 
        usuarios.username, 
        rangos.nombre_rango as rango_usuario
      FROM usuarios
      LEFT JOIN rangos ON rangos.rango_id = usuarios.rango
      WHERE usuario_id = ? AND rangos.nombre_rango = ?;
    `;

     const [results] = await database.query(query,[userId, requiredRole]);

    if (results.length === 0) {
      return NextResponse.json(
        { msg: "Usuario no autorizado" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Ocurrió un error en el servidor" },
      { status: 500 }
    );
  }

  // Si todo está bien, no devuelvas nada (o devuelve null/undefined)
  return null;
}