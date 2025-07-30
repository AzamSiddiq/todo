// db.js
const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.PSQL_URL, // put your Neon URL here or in .env
  ssl: {
    rejectUnauthorized: false
  }
},
console.log("Neon connected")
);

// const createTables = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         email VARCHAR(100) UNIQUE NOT NULL,
//         college_name VARCHAR(100),
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password TEXT NOT NULL
//       );
//     `);

//     console.log("✅ Users table created or already exists.");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Error creating tables:", err.message);
//     process.exit(1);
//   }
// };

// createTables();

module.exports = pool;