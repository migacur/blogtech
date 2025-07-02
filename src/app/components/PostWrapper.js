// app/post/[id]/PostWrapper.js
import { cookies } from 'next/headers';
import { showPostId } from '@/app/helpers/showPostId';
import Post from '@/app/components/Post';
import { redirect } from 'next/navigation';
import NotFound from './NotFound';
import RecommendedWrapper from './recommendedWapper';
import CategoryList from './CategoryList';
import { jwtVerify } from 'jose';

export default async function PostWrapper({ params }) {
  // 1. Obtener token de autenticación (no la cookie de usuario)
  const tokenCookie = cookies().get('myToken');
  
  // 2. Verificar si el token existe
  if (!tokenCookie) {
    return redirect('/ingresar');
  }

  let userId;
  try {
    // 3. Verificar y decodificar el token JWT
    const { payload } = await jwtVerify(
      tokenCookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    
    userId = payload.userId;
    console.log(`ID de usuario obtenido del token: ${userId}`);
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return redirect('/ingresar');
  }

  let post;
  try {
    // 4. Obtener el post usando el ID del usuario del token
    post = await showPostId(params.id, userId);
    console.log(post);
  } catch (error) {
    console.error('Error al obtener el post:', error);
    return <NotFound message="Ocurrió un error al cargar la publicación" />;
  }

  if (!post) {
    return <NotFound message="Ocurrió un error al mostrar la publicación" />;
  }

  if (post.publicacion_id !== Number(params.id)) {
    return <NotFound message="La publicación que buscas no existe" />;
  }

  return (
    <div className="flex flex-col md:flex-row col-span-3 gap-5">
      <div className='p-1 flex col-span-3 w-full md:col-span-2 md:w-[68%] md:p-0'>
        <Post 
          post={post} 
          params={params} 
          userId={userId} 
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