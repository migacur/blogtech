import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const jwt = request.cookies.get('myToken')?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = [
    '/', 
    '/ingresar', 
    '/registrar',
    '/api/users/login',
    '/api/users/verify'
  ];

  if (publicPaths.includes(path) || path.startsWith('/public/')) {
    return NextResponse.next();
  }

  const isApiRoute = path.startsWith('/api/');

  try {
    if (!jwt) throw new Error('No token'); // Token no presente

    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    console.log('Token válido para usuario:', payload.userId);

    if (isApiRoute) {
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId);
      return response;
    }

    return NextResponse.next();
    
  } catch (error) {
    console.log('Error de autenticación:', error.message);

    // Manejar token expirado usando el código de error (jose usa códigos)
    if (error.code === 'ERR_JWT_EXPIRED') {
      const response = NextResponse.redirect(new URL("/ingresar", request.url));
      response.cookies.delete('myToken');
      return response;
    }

    // Manejar otros errores (token inválido o ausente)
    if (isApiRoute) {
      return new NextResponse(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Redirigir a login para rutas no-API
    return NextResponse.redirect(new URL("/ingresar", request.url));
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

