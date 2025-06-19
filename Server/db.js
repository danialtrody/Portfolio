const { Pool } = require('pg');
require('dotenv').config();

function createDBConnection() {
  const env = process.env.NODE_ENV || 'development';  // 'development' or 'production'

  let pool;

  if (env === 'development') {
    // Local DB connection
    pool = new Pool({
      user: process.env.LOCAL_DB_USER,
      host: process.env.LOCAL_DB_HOST,
      database: process.env.LOCAL_DB_NAME,
      password: process.env.LOCAL_DB_PASSWORD,
      port: process.env.LOCAL_DB_PORT,
    });
  } else {
    // Production DB connection (on Render)
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false }, // Required for Render's SSL
    });
  }

  return pool;
}

module.exports = createDBConnection();
