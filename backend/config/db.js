const mysql = require("mysql2/promise");
require("dotenv").config(); // .env 파일 로드

const pool = mysql.createPool({
  host: process.env.DB_HOST, // ex: 'localhost'
  user: process.env.DB_USER, // ex: 'root'
  password: process.env.DB_PASSWORD, // ex: 'yourpassword'
  database: process.env.DB_NAME, // ex: 'perfume_db'
});

pool
  .query("SELECT DATABASE() AS db")
  .then(([rows]) => {
    console.log("연결DB:", rows[0].db); //
  })
  .catch((err) => {
    console.error("실패:", err.message);
  });

module.exports = pool;
