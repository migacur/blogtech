import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const rutas = ["/","/api/users/verify", "/post/:id", "/editar/:path*", "/publicar"];
  const jwt = request.cookies.get("myToken");

  console.log('Middleware - Ruta solicitada:', request.nextUrl.pathname); // Depuración
  console.log('Middleware - Token recibido:', jwt); // Depuración

  // Si la ruta no requiere autenticación, continúa
  if (!rutas.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta requiere autenticación, devuelve un JSON
  if (!jwt) {
    console.log('Middleware - Token no proporcionado, redirigiendo a /ingresar'); // Depuración
    return NextResponse.redirect(new URL("/ingresar", request.url));
  }

  try {
    // Verifica el token JWT
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    console.log('Middleware - Token válido, usuario:', payload.userId); // Depuración

    // Agrega los datos del usuario al header
    const response = NextResponse.next();
    response.headers.set('x-user-data', JSON.stringify(payload));
    
    return response;
  } catch (error) {
    console.log('Middleware - Token inválido, redirigiendo a /ingresar'); // Depuración
    return NextResponse.redirect(new URL("/ingresar", request.url));
  }
}

export const config = {
  matcher: ["/api/users/verify","/api/users/profile", "/post/:id", "/editar/:path*", "/publicar"],
};