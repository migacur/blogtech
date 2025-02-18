export async function GET(req) {
  try {
    // Obtener los datos del usuario del header
    const userDataHeader = req.headers.get('x-user-data');
    
    // Verificar si el header existe
    if (!userDataHeader) {
      return new Response(JSON.stringify({ message: 'No se encontraron datos del usuario en el header' }), { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Clear-Site-Data': '"cookies", "storage"' // Eliminar cookies y almacenamiento local
        }
      });
    }

    // Parsear los datos del usuario
    const userData = JSON.parse(userDataHeader);

    // Validar que los datos del usuario sean un objeto y contengan información válida
    if (typeof userData !== 'object' || userData === null || Object.keys(userData).length === 0) {
      return new Response(JSON.stringify({ message: 'Datos del usuario no válidos' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Clear-Site-Data': '"cookies", "storage"' // Eliminar cookies y almacenamiento local
        }
      });
    }

    // Devolver los datos del usuario si todo está bien
    return new Response(JSON.stringify(userData), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    // Manejar cualquier error inesperado
    console.error('Error en el endpoint GET:', error);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Clear-Site-Data': '"cookies", "storage"' // Eliminar cookies y almacenamiento local
      }
    });
  }
}