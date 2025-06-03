import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.get('myToken')?.value;

    if (!token) {
      return NextResponse.json(
        { msg: 'No autenticado' },
        { status: 401 }
      );
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Devolver los datos del usuario
    return NextResponse.json(
      {
        id: decoded.userId,
        name: decoded.username
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error en verify:', error);
    
    // Manejar token expirado específicamente
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { msg: 'Token expirado' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { msg: 'Token inválido' },
      { status: 401 }
    );
  }
}