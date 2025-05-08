const pool = require('../config/db');

const UserModel = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async createUser(username, password) {
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return { id: result.insertId, username };
  },

  async validatePassword(inputPassword, savedPassword) {
    return inputPassword === savedPassword;
  }
};

module.exports = UserModel;
