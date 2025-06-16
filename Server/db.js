// db.js
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "portfolio",
//   password: "123321",    
//   port: 5432
// });

// module.exports = pool;


const { Pool } = require("pg");

const pool = new Pool({
  user: "d_4xt7_user",
  host: "dpg-d182em8dl3ps738neskg-a.oregon-postgres.render.com",
  database: "d_4xt7",
  password: "RtI1VzF2QVkyVNcK2ZRrkXEjaM9G7Rhq",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Render's self-signed certs
  },
});

module.exports = pool;

