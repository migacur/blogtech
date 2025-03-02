const API_URL = process.env.API_URL;

export async function cargarPerfil() {
  try {
    const res = await fetch(`${API_URL}/api/users/profile`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Evitar caché
        'Pragma': 'no-cache', // Para compatibilidad con HTTP/1.0
        'Expires': '0', // Para evitar caché en proxies
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error("La respuesta no es JSON");
    }

    const data = await res.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error("Error cargando el perfil:", error);
    return null;
  }
}