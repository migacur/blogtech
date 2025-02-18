const mysql = require("mysql");

const database = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

database.connect(function(err) {
  if (err) {
    console.error('Error conectando a: ' + err.stack);
    return;
  }
 
  console.log('Conectado a BBDD con ID ' + database.threadId);
});

module.exports = database