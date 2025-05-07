const db = require('../config/db');

const WishModel = {
  async getWishesByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM WISH WHERE user_id = ?', [userId]);
    return rows;
  },

async addWish(userId, productId) {
    const [rows] = await db.query(
      'SELECT * FROM WISH WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    // DB의 UNIQUE 제약조건 위반
    if (rows.length > 0) {
      throw new Error('이미 찜한 제품입니다.');
    }
    const [result] = await db.query(
      'INSERT INTO WISH (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );
  
    return { id: result.insertId, user_id: userId, product_id: productId };
  },
  

  async removeWish(userId, productId) {
    await db.query('DELETE FROM WISH WHERE user_id = ? AND product_id = ?', [userId, productId]);
  },
};

module.exports = WishModel;