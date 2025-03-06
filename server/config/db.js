require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on traffic
  queueLimit: 0
});

// Promisify the pool for async/await queries
const db = pool.promise();

module.exports = db;

