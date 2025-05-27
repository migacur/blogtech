"use client"
import { useRouter } from 'next/navigation';
import Swal  from 'sweetalert2';

const API_URL = process.env.API_URL;

const BtnDelete = ({postId}) => {
  

    const router = useRouter()

    const eliminarPost = async postId => {
        await fetch(`${API_URL}/api/post/${postId}`, {
            method: "DELETE"
          })
            .then((response) => response.json()) // Parsea la respuesta como JSON
            .then((res) => {
              console.log(res)
              if(res.status === 200){
                Swal.fire({
                  title: "Publicación Eliminada",
                  text: res.msg,
                  icon: "success"
                });
                router.push("/")
              }else{
                Swal.fire({
                  title: 'Algo anda mal',
                  text: res.msg,
                  icon: 'error',
                })
              }
          
            })
            .catch((error) => {
              Swal.fire({
                title: 'Ha ocurrido un error',
                text: error,
                icon: 'error',
              })
            });
    
    }

  return (
    <button onClick={()=>eliminarPost(postId)} 
    className='w-[130px] flex place-items-center bg-red-500 uppercase py-1 px-4 rounded-md text-[#fff] font-bold text-[.9rem] mt-2 mb-1 transition-colors duration-300 transform hover:bg-red-600'>
    <svg xmlns="http://www.w3.org/2000/svg" 
    className='mr-1 fill-white w-[22px] h-[21px]'
    viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"/><path d="M9 10h2v8H9zm4 0h2v8h-2z"/></svg>
    Eliminar
    </button>
  )
}

export default BtnDelete