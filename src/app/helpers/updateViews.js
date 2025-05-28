const database = require("../libs/mysql");

async function updateViewsPost (postId) {
    
    try {
        const query = `UPDATE publicaciones SET visitas = visitas + 1 WHERE publicacion_id = ${postId}`;
    
        const [results] = await database.query(query, [postId]);
        console.log(results)
      } catch (error) {
         console.error(error);
      }
  }

 module.exports = updateViewsPost