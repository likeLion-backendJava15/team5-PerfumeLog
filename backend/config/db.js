const mysql = require('mysql2/promise'); 
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// DB 연결 확인 로그 (옵션)
pool.query('SELECT DATABASE() AS db')
  .then(([rows]) => {
    console.log('연결된 DB:', rows[0].db);
  })
  .catch(err => {
    console.error('DB 연결 실패:', err.message);
  });

module.exports = pool; 