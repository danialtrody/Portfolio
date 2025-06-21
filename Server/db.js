const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env

// Function to create a PostgreSQL pool based on the environment
function createDBConnection() {
    const environment = process.env.NODE_ENV || 'renderdb';  // default to 'local' if NODE_ENV is not set
    // REACT_APP_API_BASE_URL="https://portfolio-6-5icm.onrender.com"
    let pool;

    if (environment === 'localdb') {
        pool = new Pool({
            user: process.env.LOCAL_DB_USER,
            host: process.env.LOCAL_DB_HOST,
            database: process.env.LOCAL_DB_NAME,
            password: process.env.LOCAL_DB_PASSWORD,
            port: process.env.LOCAL_DB_PORT,
        });
    } else if (environment === 'renderdb') {
        pool = new Pool({
            user: process.env.REMOTE_DB_USER,
            host: process.env.REMOTE_DB_HOST,
            database: process.env.REMOTE_DB_NAME,
            password: process.env.REMOTE_DB_PASSWORD,
            port: process.env.REMOTE_DB_PORT,
            ssl: { rejectUnauthorized: false }
            
        });
    } else if (environment === 'cloud') {
        pool = new Pool({
            user: process.env.CLOUD_DB_USER,
            host: process.env.CLOUD_DB_HOST,
            database: process.env.CLOUD_DB_NAME,
            password: process.env.CLOUD_DB_PASSWORD,
            port: process.env.CLOUD_DB_PORT,
            ssl: { rejectUnauthorized: false }
        });
    }

    return pool;
}

module.exports = createDBConnection;




// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "portfolio_v",
//   password: "123456789",    
//   port: 5432
// });

// module.exports = pool;


// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "d_4xt7_user",
//   host: "dpg-d182em8dl3ps738neskg-a.oregon-postgres.render.com",
//   database: "d_4xt7",
//   password: "RtI1VzF2QVkyVNcK2ZRrkXEjaM9G7Rhq",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false, // Required for Render's self-signed certs
//   },
// });

// module.exports = pool;


