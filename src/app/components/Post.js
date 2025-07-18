"use client"
import React, { useState,useCallback } from 'react'
import Voto from './Voto'
import Detalles from './Detalles'
import BtnEdit from './BtnEdit'
import BtnDelete from './BtnDelete'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/post/[id]/page.module.css';

const Post = ({post,params,userId,cantidadVotos}) => {
  const [votos, setVotos] = useState(cantidadVotos);
  const [votoAnterior, setVotoAnterior] = useState(post.resultado_voto || null);

  const actualizarVotos = useCallback((nuevoVoto) => {
  setVotos((prevVotos) => {
    const cambioPorVotoAnterior = votoAnterior === "like" ? -1 : votoAnterior === "dislike" ? +1 : 0;
    const cambioPorNuevoVoto = nuevoVoto === "like" ? +1 : nuevoVoto === "dislike" ? -1 : 0;
    return prevVotos + cambioPorVotoAnterior + cambioPorNuevoVoto;
  });

  setVotoAnterior(nuevoVoto === votoAnterior ? null : nuevoVoto); // Alternar voto
}, [votoAnterior]);

  return (

    <div className="w-full mt-9 text-[#404040] mb-[-2.5rem] md:mb-0 ">
      <h1 className="mt-6 mb-3 text-2xl sm:text-3xl md:text-4xl font-bold ">{post.titulo}</h1>
      <h2 className="text-1xl sm:text-2xl md:text-3xl">{post.subtitulo}</h2>
      <div className='flex place-content-end place-items-center'>
        {userId === post.idUsuario &&
          <>
            <BtnEdit post={params.id} />
            <BtnDelete postId={params.id} />
          </>
        }
      </div>
      <p className="text-[.8rem] inline text-[#404040]">
        <span className="font-bold">Publicado en </span>
        <Link href={`/categoria/${post.nombre_categoria}`} className="uppercase text-[#01C29A] ml-1 font-bold">
          {post.nombre_categoria}
        </Link>
      </p>
      <Image
        src={post.imagen}
        width={1000}
        height={250}
        alt='Imagen de la publicación'
        className="rounded-md shadow-sm max-h-[400px] object-cover"
      />
      <div className={`${styles.contenedor} text-[.9rem] sm:text-[1rem] md:text-[1.05rem] `} dangerouslySetInnerHTML={{ __html: post.texto }}>
      </div>
      <div>
      <Detalles post={post} />
      </div>
      <div className='col-span-2'>
      <div className='mt-4 mb-1 py-2 flex flex-col justify-center items-center border-t-2 border-slate-200 '>
        <p className='text-1xl font-bold text-[#404040]'>¿Te gustó la publicación?</p>
        <div className='flex mt-2 mb-4 items-center'>
          <div className='flex flex-col justify-center items-center '>
          <Voto
          post={post}
          postId={params.id}
          userId={userId}
          />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Post
