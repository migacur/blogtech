"use client"
import Image  from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from "sweetalert2"
import Spinner from './spinner/Spinner';


const FormEdit = ({post}) => {

    const [data,setData]=useState([]);
    const [isLoad,setIsLoad]=useState(true)
    const router = useRouter()

    const leerInput = e => {
        setData({...data, 
          [e.target.name] : e.target.value})
      }
      
    const editarPost = async e => {
        e.preventDefault()
        setIsLoad(false)
        const { titulo,subtitulo,texto,categoria } = data;

        const newData = {
            titulo: titulo? titulo : post.titulo,
            subtitulo: subtitulo? subtitulo : post.subtitulo,
            texto: texto? texto : post.texto,
            categoria: categoria? categoria : post.categoria
        }
      
        await fetch(`/api/post/${post.publicacion_id}`, {
          method: "PUT",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json()) // Parsea la respuesta como JSON
          .then((res) => {
       
            if(res.status === 200){
              Swal.fire({
                title: "Publicación Modificada",
                text: res.msg,
                icon: "success"
              });
              setIsLoad(true)
              router.push(`/post/${post.publicacion_id}`)
            }else{
              Swal.fire({
                title: 'Ha ocurrido un error',
                text: res.msg,
                icon: 'error',
              })
            }
          })
          .catch((e) => {
            Swal.fire({
              title: 'Ha ocurrido un error',
              text: e.res.msg,
              icon: 'error',
            })
          });
      
      }
      
      
  return (
    <form 
    onSubmit={editarPost}
method="PUT" 
action={`api/post/${post.publicacion_id}`}
className="text-[#404040]   flex flex-col place-content-center p-3 place-items-center ">
    <h1 className="font-bold text-center uppercase mt-5 mb-2 text-[1.3rem] rounded">Editar Post</h1>
    <label htmlFor="titulo" className="w-full text-[.9rem] text-[#01C29A] font-bold uppercase text-left">Título</label>
    <input 
    onChange={leerInput}
    name="titulo"
    defaultValue={post.titulo}
    className="w-full py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm" type="text" placeholder="Ingresa el título"/>
     <label htmlFor="subtitulo" className="w-full text-[.9rem] text-[#01C29A] font-bold uppercase text-left">Subtítulo</label>
    <input 
    onChange={leerInput}
    name="subtitulo"
    defaultValue={post.subtitulo}
    className="w-full py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm" type="text" placeholder="Ingresa el subtítulo"/>
   
   <Image
  src={post.imagen}
  width={300}
  height={250}
  alt='Imagen de la publicación'
  className="mt-2 rounded-md shadow-md max-h-[400px] object-cover"
  />
      <small className="text-red-500 font-bold" >La imagen NO puede ser editada</small>
      <label htmlFor="texto" className="block w-full text-[.9rem] text-[#01C29A] font-bold uppercase text-left mt-0 sm:mt-3">Contenido</label>
    <textarea 
    className="w-full min-h-40 p-1 resize-none border-none outline-none shadow-sm my-2 border-2 rounded focus:bg-slate-200"
    name="texto"
    defaultValue={post.texto}
    onChange={leerInput}
    placeholder="Agrega el contenido aqui...">
    </textarea>
    <h2 className="my-1 text-[#01C29A] font-bold uppercase text-[.85rem] ">Elige la categoría</h2>
    <select name="categoria" 
    defaultValue={post.categoria}
    onChange={leerInput}
    className="border outline-none mt-1 mb-2 uppercase text-[.85rem] font-bold">
    <option value="null">-- Elegir Categoría --</option>
    <option value="1">Tecnología</option>
    <option value="2">Videojuegos</option>
    <option value="3">Cine</option>
    <option value="4">Televisión</option>
    <option value="5">Deportes</option>
    <option value="6">Música</option>
    </select>
    { !isLoad && <Spinner texto="Por favor, espere..."/> }
    <input 
    className="w-[250px] mt-2 bg-[#01C29A] hover:bg-[#299680] text-[#fff] py-1 cursor-pointer uppercase font-bold rounded" type="submit" value="Editar Publicación"/>

</form>
  )
}

export default FormEdit