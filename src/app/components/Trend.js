"use client"

import { useRouter } from "next/navigation"

const Trend = ({tendencias}) => {
    
    const router = useRouter()


  return (
    <ul>
     {tendencias ? tendencias.map(post => (
            <div key={post.publicacion_id} 
            onClick={()=> router.push(`/post/${post.publicacion_id}`)}
            className="mb-2 p-0 md:p-3 bg-[#fff] shadow-sm rounded-lg hover:bg-[#edecf0] hover:transition-all cursor-pointer">
            <span className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-2"> {post.nombre_categoria} </span>
            <h4 className="text-[#404040]"> {post.titulo}. </h4>
            
            </div>
          ))
            :
          <p>Ocurrió un error al mostrar las publicaciones</p>
          }
    </ul>
  )
}

export default Trend