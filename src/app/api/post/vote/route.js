import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const data = await request.json();
  const postId = Number(data.postId);
  const userId = Number(data.userId);

  if(typeof postId !== 'number' || typeof userId !== 'number' || !data){
     return NextResponse.json({ 
          msg: "Los datos recibidos no son correctos", 
          status: 400 
        });
  }

  // Obtenemos una conexión del pool
  const connection = await database.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Buscar voto existente
    const [existingVotes] = await connection.query(
      "SELECT * FROM votos_publicacion WHERE postId = ? AND userId = ?",
      [postId, userId]
    );

    // 2. Manejar lógica de votos
    if (existingVotes.length > 0) {
      const existingVote = existingVotes[0];
      
      // Caso 1: Eliminar voto existente
      if (
        (existingVote.positivo === 1 && data.condition === "like") ||
        (existingVote.negativo === 1 && data.condition === "dislike")
      ) {
        await connection.query(
          "DELETE FROM votos_publicacion WHERE postId = ? AND userId = ?",
          [postId, userId]
        );
        
        await connection.commit();
         revalidateTag(`post-${postId}`);
        return NextResponse.json({ 
          msg: "Has eliminado el voto correctamente", 
          status: 200 
        });
      }
      // Caso 2: Cambiar voto existente
      else {
        // Primero eliminamos el voto existente
        await connection.query(
          "DELETE FROM votos_publicacion WHERE postId = ? AND userId = ?",
          [postId, userId]
        );
        
        // Luego insertamos el nuevo voto
        console.log("---INICIO PRUEBA VOTOS LIKES---")
        console.log(`La id del post es: ${postId} y el id del user es: ${userId}`)
         console.log(typeof postId, typeof userId)
        console.log(data)
        console.log(data.condition)
        console.log("---FIN PRUEBA VOTOS LIKES---")
        await connection.query(
          `INSERT INTO votos_publicacion 
          (positivo, negativo, postId, userId) 
          VALUES (?, ?, ?, ?)`,
          [
            data.condition === "like" ? 1 : 0,
            data.condition === "dislike" ? 1 : 0,
            postId,
            userId
          ]
        );
        
        await connection.commit();
        revalidateTag(`post-${postId}`);
        return NextResponse.json({ 
          msg: "Has cambiado tu voto correctamente", 
          status: 200 
        });
      }
    } 
    // Caso 3: Nuevo voto
    else {
      await connection.query(
        `INSERT INTO votos_publicacion 
        (positivo, negativo, postId, userId) 
        VALUES (?, ?, ?, ?)`,
        [
          data.condition === "like" ? 1 : 0,
          data.condition === "dislike" ? 1 : 0,
          postId,
          userId
        ]
      );
      
      await connection.commit();
     revalidateTag(`post-${postId}`);
      return NextResponse.json({ 
        msg: "Has votado esta publicación correctamente", 
        status: 200 
      });
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error en POST /api/post/vote:", error);
    return NextResponse.json({ 
      msg: "No se pudo realizar el voto para esta publicación", 
      status: 500 
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}