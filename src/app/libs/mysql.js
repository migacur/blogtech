import mysql from "mysql2/promise";

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  
  // Ajustes críticos para Clever Cloud
  waitForConnections: true,
  connectionLimit: 2,           // Reducido a 2 conexiones (más seguro para plan gratuito)
  queueLimit: 5,                // Límite de cola reducido
  connectTimeout: 30000,        // 30 segundos para conectar
  acquireTimeout: 30000,        // Nuevo: tiempo para obtener conexión
  idleTimeout: 55000,           // 55s < 60s de Clever Cloud
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000, // 30 segundos
  timezone: 'Z',                // Usar UTC
  
  // Importante para evitar desconexiones
  ssl: {
    rejectUnauthorized: true
  }
});

// Manejo avanzado de eventos
database.on('acquire', (connection) => {
  console.log(`Conexión adquirida: ${connection.threadId}`);
});

database.on('release', (connection) => {
  console.log(`Conexión liberada: ${connection.threadId}`);
});

database.on('connection', (connection) => {
  // Ejecutar consulta keep-alive cada 40 segundos
  setInterval(async () => {
    try {
      await connection.query('SELECT 1');
      console.log('Keep-alive ejecutado');
    } catch (error) {
      console.error('Error en keep-alive:', error);
    }
  }, 40000);
});

database.on('error', (err) => {
  console.error('Error en el pool de MySQL:', err);
});

// Verificación de conexión
async function verificarConexion() {
  try {
    const connection = await database.getConnection();
    await connection.query("SELECT 1");
    console.log("✅ Conexión exitosa a la BBDD");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a la BBDD:", error.message);
    
    // Reconexión automática después de 5 segundos
    setTimeout(verificarConexion, 5000);
  }
}

verificarConexion();

export default database;