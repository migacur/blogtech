"use client";
import Link from "next/link";
import Image from 'next/image';

export default function Recommended({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-0 md:mt-6 ml-0 md:ml-3 mx-auto md:mx-0 w-full">
        <h3 className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-3 md:mb-2">
          Publicaciones similares
        </h3>
        <p>No hay publicaciones recomendadas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="mt-0 md:mt-6 ml-0 md:ml-3 mx-auto md:mx-0 w-full">
      <h3 className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-3 md:mb-2">
        Publicaciones similares
      </h3>
      <ul>
        {data.map(post => (
          <Link href={`/post/${post.publicacion_id}`} key={post.publicacion_id}>
            <li className="w-full h-[105px] flex text-[#404040] mb-2 p-0 md:p-3 bg-[#fff] shadow-sm rounded-lg hover:bg-[#edecf0] hover:transition-all cursor-pointer overflow-hidden">
              <Image
                src={post.imagen}
                width={100}
                height={100}
                alt='Imagen de la publicación'
                className="min-w-[100px] min-h-[80px] object-cover pointer-events-none mr-2 rounded-md"
              />
              <span className="text-left text-[.95rem] mt-2 md:mt-0">
                {post.titulo}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}