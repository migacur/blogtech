const database = require("../libs/mysql");

async function updateViewsPost (postId) {
    
    try {
        const query = `UPDATE publicaciones SET visitas = visitas + 1 WHERE publicacion_id = ${postId}`;
    
        const results = await new Promise((resolve, reject) => {
          database.query(query, [postId], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      } catch (error) {
         console.error(error);
      }
  }

 module.exports = updateViewsPost