import Recommended from './Recommended';

const API_URL = process.env.API_URL;

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
        <div className="flex flex-wrap justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FBBF24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>
          <p className="text-red-700 text-[.8rem] ml-[.1rem]">Ocurrió un error al mostrar las publicaciones</p>
          </div>
      </div>
    );
  }
}