const db = require('../config/db');

const WishModel = {
    // 찜 목록 조회
  async getWishesByUserId(userId) {
    const [rows] = await db.query(`
      SELECT 
        P.id,
        P.image_url,
        P.name AS product_name,
        B.name AS brand_name,
        (
          SELECT ROUND(AVG(R.rating), 1)
          FROM REVIEW R
          WHERE R.product_id = P.id
        ) AS average_rating,
        (
          SELECT COUNT(*)
          FROM REVIEW R
          WHERE R.product_id = P.id
        ) AS review_count
      FROM WISH W
      JOIN PRODUCT P ON W.product_id = P.id
      JOIN BRAND B ON P.brand_id = B.id
      WHERE W.user_id = ?
    `, [userId]);

    return rows;
  },

  async addWish(userId, productId) {
    const [rows] = await db.query(
      'SELECT * FROM WISH WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    
    // DB의 UNIQUE 제약조건 위반 - 중복복
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
  }
};

module.exports = WishModel;
