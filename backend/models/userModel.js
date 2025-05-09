const db = require('../config/db');

const UserModel = {
  // 회원가입
  async createUser(userid, password) {
    const [existingUser] = await db.query('SELECT * FROM user WHERE userid = ?', [userid]);
    if (existingUser.length > 0) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const [result] = await db.query(
      'INSERT INTO user (userid, password) VALUES (?, ?)',
      [userid, password]
    );

    return { id: result.insertId, userid };
  },

  // 로그인
  async login(userid, password) {
    const [rows] = await db.query('SELECT * FROM user WHERE userid = ?', [userid]);
  
    if (rows.length === 0) {
      throw new Error('아이디가 존재하지 않습니다.');
    }
  
    const foundUser = rows[0];
  
    if (foundUser.password !== password) {
      throw new Error('비밀번호가 잘못되었습니다.');
    }
  
    return foundUser;
  }
  ,

  // 아이디 중복 확인
  async checkUserIdExist(userid) {
    const [rows] = await db.query('SELECT * FROM user WHERE userid = ?', [userid]);
    return rows.length > 0;
  },

  // 회원 탈퇴
  async deleteUser(userid) {
    const [result] = await db.query('DELETE FROM user WHERE userid = ?', [userid]);
    return result.affectedRows > 0;
  }
};

module.exports = UserModel;
