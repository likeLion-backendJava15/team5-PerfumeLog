const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async createUser(username, password) {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    );
    return { id: result.insertId, username };
  }
};

module.exports = UserModel;

async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

