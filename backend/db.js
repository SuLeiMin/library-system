// backend/db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,    
  user: 'root',
  password: '',
  database: 'demo'
});
module.exports = pool;
