import updateViewsPost from "@/app/helpers/updateViews";
import database from "@/app/libs/mysql";
import { roleMiddleware } from "@/app/api/roleMiddleware";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
/* Mostrar por ID */
export async function GET(request, { params }) {

 const postId = params.id;
 const { searchParams } = new URL(request.url); 
 const userId = searchParams.get('user_id');  // usuario logueado
 console.log("--- ID DEL USUARIO ENDPOINT POST:ID")
console.log( userId )
 console.log("--- ID DEL USUARIO ENDPOINT POST:ID")
// tengo que obtener el id del votante no del creador de post
    try {

      const query = `
   SELECT publicaciones.*, categorias.nombre_categoria,usuarios.usuario_id,usuarios.username AS autor,SUM(votos_publicacion.positivo)-SUM(votos_publicacion.negativo) AS cantidad_votos, 
CASE 
  CASE 
    WHEN votos_publicacion.userId = ? THEN
      CASE 
        WHEN votos_publicacion.positivo = 1 THEN 'like'
        WHEN votos_publicacion.negativo = 1 THEN 'dislike'
        ELSE NULL
      END
    ELSE NULL
  END as resultado_voto
FROM publicaciones 
    LEFT JOIN categorias 
    ON publicaciones.categoria = categorias.categoria_id
    LEFT JOIN usuarios
    ON publicaciones.idUsuario = usuarios.usuario_id
    LEFT JOIN votos_publicacion
    ON votos_publicacion.postId = publicaciones.publicacion_id
    WHERE publicacion_id = ?;
      `;

      const [results] = await database
            .query(query, [userId,postId]);
        
     if (results) {
        await updateViewsPost(postId)
        return NextResponse.json(results,{status:200});    
    }      
  
    return NextResponse.redirect("/")
    
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }

  /* Actualizar */

  export async function PUT(request,{params}){
    try {
      const token = request.cookies.get('myToken');
      const postId = params.id;
      const data = await request.json();
      const { titulo,subtitulo,texto,categoria } = data;
    
      if(!token){
        return NextResponse.json(
          { msg: "Usuario no autorizado" },
          { status: 401 }
        );
      }
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
      const userId = decoded.userId
    const middlewareResponse = await roleMiddleware(request,userId,'Admin');
    if (middlewareResponse) {
      return middlewareResponse; 
    }
      const query = `
      UPDATE publicaciones
      SET titulo = ?,
      subtitulo = ?,
      texto = ?,
      categoria = ?
      WHERE publicacion_id = ?
      AND idUsuario = ?
      `;

      const [results] = await database
            .query(query, [titulo,subtitulo,texto,categoria,postId,userId]);
      console.log(results)
      return NextResponse.json({msg:"Se ha modificado la publicación",status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor' });
    }
  }
  
  /* Eliminar */
  export async function DELETE(request,{ params }) {
    
    try {
      const token = request.cookies.get('myToken');
      const postId = params.id;

      if(!token){
        return NextResponse.json(
          { msg: "Usuario no autorizado" },
          { status: 401 }
        );
      }
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
      const userId = decoded.userId
    const middlewareResponse = await roleMiddleware(request,userId,'Admin');
    if (middlewareResponse) {
      return middlewareResponse; 
    }

      const query = 'DELETE FROM publicaciones WHERE publicacion_id = ? AND idUsuario = ?';
  
      const [results] = await database
            .query(query, [postId,userId]);
      
      if(!results){
         return NextResponse.json({msg:"Esta publicación no está disponible",status: 400});
      }

      return NextResponse.json({msg:"Se ha eliminado la publicación",status: 200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: 'Ocurrió un error en el servidor',status:500});
    }
  }