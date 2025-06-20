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
          <div className="flex mb-2 p-0 md:p-3 bg-[#fff]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FBBF24" viewBox="0 0 24 24"   style={{ 
    fill: 'rgba(0, 0, 0, 1)',
    transform: '', 
    msFilter: '' 
  }}
><path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path><path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path></svg>
          <p className="text-red-700 text-[.8rem] ml-[.1rem]">Ocurrió un error al mostrar las publicaciones</p>
          </div>
          }
    </ul>
  )
}

export default Trend