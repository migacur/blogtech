import database from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // Importa revalidatePath

export async function POST(request) {
  const data = await request.json();
  const postId = data.postId;
  const userId = data.userId;

  try {
    const buscarVoto = "SELECT * FROM votos_publicacion WHERE postId = ? AND userId = ?";
    const paramsInsert = data.condition === "like" ? [1, 0, postId, userId] : [0, 1, postId, userId];
    
    const busqueda = await new Promise((resolve, reject) => {
      database.query(buscarVoto, [postId, userId], (error, results) => {
        if (error) {
          return reject(error);
        }

        if (results.length > 0) {
          if ((results[0].positivo === 1 && data.condition === "like") ||
              (results[0].negativo === 1 && data.condition !== "like")) {
            
            const eliminarVotoUsuario = "DELETE FROM votos_publicacion WHERE postId = ? AND userId = ?";
            database.query(eliminarVotoUsuario, [postId, userId], (error, results) => {
              if (error) {
                return reject(error);
              } else {
                resolve({ msg: "Has eliminado el voto correctamente", status: 200 });
              }
            });

          } else {
            
            const eliminarVotoUsuario = "DELETE FROM votos_publicacion WHERE postId = ? AND userId = ?";
            database.query(eliminarVotoUsuario, [postId, userId], (error, results) => {
              if (error) {
                return reject(error);
              } else {
                const queryInsert = `
                  INSERT INTO votos_publicacion (positivo, negativo, postId, userId)
                  VALUES (?, ?, ?, ?)
                `;
                const paramsInsertNuevo = data.condition === "like" ? [1, 0, postId, userId] : [0, 1, postId, userId];

                database.query(queryInsert, paramsInsertNuevo, (error, results) => {
                  if (error) {
                    return reject(error);
                  } else {
                    resolve({ msg: "Has cambiado tu voto correctamente", status: 200 });
                  }
                });
              }
            });

          }
        } else {
          resolve(results);
        }
      });
    });

    if (busqueda.length === 0) {
      const query = "INSERT INTO votos_publicacion (positivo, negativo, postId, userId) VALUES (?, ?, ?, ?)";
      const results = await new Promise((resolve, reject) => {
        database.query(query, paramsInsert, (error, results) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ msg: "Has votado esta publicación correctamente", status: 200 });
          }
        });
      });

      // Invalidar el caché de la ruta del post después de registrar el voto
      revalidatePath(`/post/${postId}`);

      return NextResponse.json(results);
    } else {
      // Invalidar el caché de la ruta del post después de cambiar o eliminar el voto
      revalidatePath(`/post/${postId}`);

      return NextResponse.json(busqueda);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "No se pudo realizar el voto para esta publicación", status: 500 });
  }
}