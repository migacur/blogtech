import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const jwt = request.cookies.get('myToken')?.value;
  const path = request.nextUrl.pathname;
  console.log('Leyendo jwt desde middleware:', jwt);
  
  const publicPaths = [
    '/', 
    '/ingresar', 
    '/registrar',
    '/api/users/login',
  ];

  // Crear respuesta base
  let response;

  // 1. Aplicar headers de no-caché para rutas protegidas
  if (path.startsWith('/post/') || 
      path.startsWith('/editar/') || 
      path.startsWith('/publicar')) {
    response = NextResponse.next();
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  } else {
    response = NextResponse.next();
  }

  if (publicPaths.includes(path) || path.startsWith('/public/')) {
    return response;
  }

  const isApiRoute = path.startsWith('/api/');

  try {
    if (!jwt) throw new Error('No token');

    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    console.log('Token válido para usuario:', payload.userId);

    if (isApiRoute) {
      response.headers.set('x-user-id', payload.userId);
    }

    return response;
    
  } catch (error) {
    console.log('Error de autenticación:', error.message);

    if (error.code === 'ERR_JWT_EXPIRED') {
      console.log("REDIRIGIENDO A INGRESAR DESDE ERR_JWT_EXPIRED...");
      const redirectResponse = NextResponse.redirect(new URL("/ingresar", request.url));
      redirectResponse.cookies.delete('myToken');
      
      // Agregar headers de no-caché a la redirección
      redirectResponse.headers.set('Cache-Control', 'private, no-store, max-age=0');
      return redirectResponse;
    }

    if (isApiRoute) {
      return new NextResponse(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log("REDIRIGIENDO A INGRESAR DESDE rutas no-API...");
    const redirectResponse = NextResponse.redirect(new URL("/ingresar", request.url));
    
    // Agregar headers de no-caché a la redirección
    redirectResponse.headers.set('Cache-Control', 'private, no-store, max-age=0');
    return redirectResponse;
  }
}

export const config = {
  matcher: [
    '/post/:path*',
    '/editar/:path*',
    '/publicar',
    '/api/users/profile'
  ]
};