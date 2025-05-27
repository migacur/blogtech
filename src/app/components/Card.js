"use client"
import Image  from 'next/image';

import Link from "next/link"

const Card = ({posts}) => {

 const cortarTexto = (text,index) => {
  if(index === 0){
    let fin = text.indexOf("</p>"); 
    let nuevoTexto = text.slice(0, fin);
    return nuevoTexto;
  }else{
    return `${text.substring(0, 60)}...`
  }
}

  return (
      <>
        { posts.map((post,i) => (
           <Link href={`/post/${post.publicacion_id}`} key={post.publicacion_id}>
          <div
          className={`${i === 0 ? 'h-auto flex-col ' : '' } w-full h-[200px] flex mt-6 hover:bg-slate-100
           cursor-pointer transition-all rounded-md max-sm:flex-col max-md:h-auto `}>
  
  <Image
  priority={true}
  src={post.imagen}
  width={400}
  height={200}
  alt='Imagen de la publicación'
  unoptimized 
  className={`pointer-events-none ${i === 0 ? 'w-[100%]' : 'w-[50%]'} h-full object-cover object-center max-sm:w-[100%]`} 
/>

          
    <div className={`p-2 ${i === 0 ? 'w-[100%]' : 'w-[50%]'} max-sm:w-[100%]`}>
           <div className='p-2 flex justify-start '>
            <p className='flex justify-center items-center rounded-sm bg-[#01C29A] px-2 text-[.8rem] text-white '>{post.nombre_categoria}</p>
            <p className='ml-2 text-[.8rem] font-bold text-[#404040]'>{post.fecha_publicado.slice(0,10)}</p>
            </div>
            <div className='p-2'>
              <h2 className={`${i === 0 ? 'text-[1.6rem]'  : 'text-[1.1rem]'} font-bold text-[#404040]`}>
              {post.titulo}
              </h2>
              <div className={`${i === 0 ? 'text-[.95rem]' : 'text-[.85rem]'} mt-1`}> 
            <div 
            dangerouslySetInnerHTML={{__html: cortarTexto(post.texto,i)}}></div>
        </div>  
            </div>
            </div>
          </div>
          </Link>
        ))
        
        }
        </>

       )
}

export default Card