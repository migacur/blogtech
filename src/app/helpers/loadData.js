//const API_URL = process.env.API_URL;

// Asegura que API_URL termine con "/"
//const normalizedAPI_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;

export async function loadPost() {
    try {
        const res = await fetch("/api/post", {
            headers: { "Content-type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Validación básica
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of posts");
        }

        return data;
    } catch (error) {
        console.error("Error loading posts:", error);
        return []; // O podrías devolver un valor por defecto o lanzar el error nuevamente
    }
}