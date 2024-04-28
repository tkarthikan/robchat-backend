require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false
  },
});

module.exports = pool;



// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   logging: false, // Disable logging SQL queries (optional)
// });

// module.exports = sequelize;

// const { Pool } = require('pg');

// // Create a pool
// const pool = new Pool({
//   user: 'your_username',
//   host: 'localhost',
//   database: 'your_database',
//   password: 'your_password',
//   port: 5432, // default PostgreSQL port
// });

// // Define Message table creation query
// const createMessageTableQuery = `
//   CREATE TABLE IF NOT EXISTS messages (
//     id SERIAL PRIMARY KEY,
//     text TEXT NOT NULL,
//     sender_id INTEGER REFERENCES users(id),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// // Connect to the database and create tables
// pool.connect((err, client, done) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL', err);
//     return;
//   }
//   client.query(createMessageTableQuery, (err, result) => {
//     done();
//     if (err) {
//       console.error('Error creating messages table', err);
//       return;
//     }
//     console.log('Messages table created successfully');
//     // You can create other tables similarly if needed
//   });
// });

// module.exports = pool;


