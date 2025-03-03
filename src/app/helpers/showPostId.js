const API_URL = process.env.API_URL;

const normalizedAPI_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;

export async function showPostId(postId, userId) {
  try {
    const res = await fetch(`${normalizedAPI_URL}api/post/${postId}?user_id=${userId}`, {
      headers: { "Content-type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    // Verifica si la API devuelve un array y si tiene al menos un elemento
    if (Array.isArray(data) && data.length > 0) {
      return data[0]; // Devuelve la primera publicación
    } else {
      throw new Error("No se encontró la publicación");
    }
  } catch (error) {
    console.error("Error en showPostId:", error);
    return null; // Devuelve null si hay un error
  }
}