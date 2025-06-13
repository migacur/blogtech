"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"
import Spinner from "./spinner/Spinner"

const FormAdd = () => {

  const [post,setPost]=useState([])
  const [imagen,setImagen]=useState('')
  const [isLoad,setIsLoad]=useState(true)
  const router = useRouter()

  const leerImagen = e => setImagen( e.target.files[0] )

  const leerInput = e => {
    setPost({...post, 
      [e.target.name] : e.target.value})
  }
  
    const agregarPost = async e => {
      e.preventDefault()
      setIsLoad(false)
    const  { titulo,subtitulo,texto, categoria } = post;

      if(!titulo || !subtitulo || !texto || !categoria || !imagen){
        Swal.fire({
          title: 'Algo anda mal',
          text: "Todos los campos son obligatorios",
          icon: 'error',
        })
        return;
      }

      const formData = new FormData();
      formData.append('file', imagen);
 
        // Agregar cada propiedad del objeto post al formData
  for (const key in post) {
    formData.append(key, post[key]);
  }

      await fetch('/api/post/add', {
        method: "POST",
        body: formData,
        credentials: 'include' 
      })
        .then((response) => response.json()) // Parsea la respuesta como JSON
        .then((res) => {
          console.log(res)
          if(res.status === 200){
            Swal.fire({
              title: "Publicación realizada",
              text: "Has agregado una nueva publicación",
              icon: "success"
            });
            setIsLoad(true)
            router.push("/")
          }else{
            Swal.fire({
              title: 'Algo anda mal',
              text: res.msg,
              icon: 'error',
            })
          }
        setIsLoad(true)
        })
        .catch((error) => {
          Swal.fire({
            title: 'Ha ocurrido un error',
            text: error,
            icon: 'error',
          })
        });

        setIsLoad(true)
    }

  return (
    <form 
    method="POST" 
    action="/api/post/add" 
    encType="multipart/form-data"
    onSubmit={agregarPost}
    className="text-[#404040] min-w-[600px] flex flex-col place-content-center p-3 place-items-center">
        <h1 className="font-bold text-center uppercase mt-5 mb-2 text-[1.3rem] rounded">Agregar Post</h1>
        <input 
        onChange={leerInput}
        name="titulo"
        className="w-full py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm" type="text" placeholder="Ingresa el título"/>
        <input 
        onChange={leerInput}
        name="subtitulo"
        className="w-full py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm" type="text" placeholder="Ingresa el subtítulo"/>
        <label htmlFor="imagen" className="my-2 relative inline-block px-4 py-1 font-semibold text-white bg-[#01C29A] rounded cursor-pointer hover:bg-[#299680] active:bg-[#1f7261] focus:outline-none focus:ring focus:ring-blue-200 text-[.9rem] ">
         {imagen ? 'Imagen Cargada' : 'Haz click para subir la imagen'}
        </label>
        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={leerImagen}  className="hidden"/>
        <textarea 
        className="w-full min-h-40 p-1 resize-none border-none outline-none shadow-sm my-2 border rounded focus:bg-slate-200"
        name="texto"
        onChange={leerInput}
        placeholder="Agrega el contenido aqui...">
        </textarea>
        <h2 className="my-1 text-[#01C29A] font-bold uppercase text-[.85rem] ">Elige la categoría</h2>
        <select name="categoria" 
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
        { !isLoad && <Spinner texto="Publicando..."/> }
        <input 
        className="w-full mt-2 bg-[#01C29A] hover:bg-[#299680] text-[#fff] py-1 cursor-pointer uppercase font-bold rounded" type="submit" value="Agregar Publicación"/>

    </form>
  )
}

export default FormAdd