const db = require('../config/db');

const ProductModel = {
    // 전체 제품 조회
  async getAllProducts() {
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
      FROM PRODUCT P
      JOIN BRAND B ON P.brand_id = B.id
    `);
    return rows;
  },
  
  // 제품 상세 조회
  async getProductById(id) {
    const [rows] = await db.query(`
      SELECT 
        P.id,
        P.name AS product_name,
        P.image_url,
        P.price,
        B.name AS brand_name,
        FF.name AS family_name,
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
      FROM PRODUCT P
      JOIN BRAND B ON P.brand_id = B.id
      JOIN FRAGRANCE_FAMILY FF ON P.family_id = FF.id
      WHERE P.id = ?
    `, [id]);
  
    return rows[0];

  },
  
 // 🔍 제품 검색 기능 추가
  async searchProducts(query) {
    const [rows] = await db.query(`
      SELECT 
        P.id,
        P.image_url,
        P.name AS product_name,
        B.name AS brand_name,
        FF.name AS family_name,
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
      FROM PRODUCT P
      JOIN BRAND B ON P.brand_id = B.id
      JOIN FRAGRANCE_FAMILY FF ON P.family_id = FF.id
      WHERE 
        P.name LIKE ? OR
        B.name LIKE ? OR
        FF.name LIKE ?
    `, [`%${query}%`, `%${query}%`, `%${query}%`]);

    return rows;
  }
  

};

module.exports = ProductModel;
