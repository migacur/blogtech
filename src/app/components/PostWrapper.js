// app/post/[id]/PostWrapper.js
//import { cookies } from 'next/headers';
import { showPostId } from '@/app/helpers/showPostId';
import Post from '@/app/components/Post';
import { redirect } from 'next/navigation';
//import Swal from 'sweetalert2';
import NotFound from './NotFound';
import RecommendedWrapper from './recommendedWapper';
import CategoryList from './CategoryList';
import { getUserId } from '../actions/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostWrapper({ params }) {

   const userId = await getUserId();

    if (!userId) {
      console.error("Usuario NO encontrado...")
    return redirect('/ingresar');
    }
  
  let post;

  try {
    // Intenta obtener el post
    post = await showPostId(params.id, userId);
    console.log(post)
  } catch (error) {
    console.error('Error al obtener el post:', error);
    return;
  }

  if(!post){
    return <NotFound message="Ocurrió un error al mostrar la publicación" /> 
  }

  if (post.publicacion_id !== Number(params.id)) {
    return <NotFound message="La publicación que buscas no existe" /> 
  }

  return (
    <div className="flex flex-col md:flex-row col-span-3 gap-5 ">
    <div className='p-1 flex col-span-3 w-full md:col-span-2 md:w-[68%] md:p-0'>

    <Post 
      post={post} 
      params={params} 
      userLogin={userLogin} 
      cantidadVotos={Number(post.cantidad_votos)}
    />

</div>
<div className='p-1 w-full md:w-[32%] col-span-3 md:col-span-2 mt-10 md:p-0'>
  <CategoryList param={post.nombre_categoria} />
  <RecommendedWrapper postId={post.publicacion_id} categoryId={post.categoria} />
  </div>
</div>
  );
}