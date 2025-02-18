import Recommended from './Recommended';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default async function RecommendedWrapper({ postId, categoryId }) {
  try {
    const res = await fetch(`${API_URL}/api/post/recommended/${postId}/${categoryId}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    return <Recommended data={data.results} />;
  } catch (error) {
    console.error("Error al cargar datos:", error);
    return (
      <div className="mt-0 md:mt-6 ml-0 md:ml-3 mx-auto md:mx-0 w-full">
        <h3 className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-3 md:mb-2">
          Publicaciones similares
        </h3>
        <p>No se pudieron cargar las publicaciones recomendadas.</p>
      </div>
    );
  }
}