import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const jwt = request.cookies.get('myToken')?.value;
  const path = request.nextUrl.pathname;

  // 1. Rutas públicas que no requieren autenticación
  const publicPaths = [
    '/', 
    '/ingresar', 
    '/registrar',
    '/api/users/login',
    '/api/users/verify' // ¡Importante! Esta debe ser pública
  ];

  // 2. Verificar si es una ruta pública
  if (publicPaths.includes(path) || path.startsWith('/public/')) {
    return NextResponse.next();
  }

  // 3. Determinar si es una ruta API
  const isApiRoute = path.startsWith('/api/');

  try {
    // 4. Verificar token para rutas protegidas
    if (!jwt) throw new Error('No token');

    // 5. Verificar el token JWT
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    console.log('Token válido para usuario:', payload.userId);

    // 6. Para rutas API: agregar user-id al header
    if (isApiRoute) {
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId);
      return response;
    }

    return NextResponse.next();
    
  } catch (error) {
    console.log('Error de autenticación:', error.message);

      if (error instanceof jwt.TokenExpiredError) {
    // Limpiar cookies expiradas
    const response = NextResponse.redirect(new URL("/ingresar", request.url));
    response.cookies.delete('myToken');
    
    return response;
    }
    
    // 7. Manejo diferente para rutas API vs páginas
    if (isApiRoute) {
      return new NextResponse(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // 8. Para rutas de página, redirigir a login
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