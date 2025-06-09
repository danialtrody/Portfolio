// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '123321',
//   port: 5432, // default PostgreSQL port
// });

// module.exports = pool;



//express pg dotenv
// const express = require('express');
// const app = express();
// app.use(express.json());

// const createDBConnection = require('./db');
// const PORT = process.env.PORT || 5001;

// Setup PostgreSQL connection pool using environment variables
//  const pool = createDBConnection();//RenderDb




// app.get('/fake/users', (req, res) => {
//   const fakeUsers = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
//     { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
//   ];

//   res.status(200).json(fakeUsers);
// });

// app.get('/fake/users2', (req, res) => {
//   const fakeUsers = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
//     { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
//   ];

//   res.status(200).json(fakeUsers);
// });
// app.listen(PORT, () => {
//   console.log(Server is running on port ${PORT});
// });