const db = require("../config/db");

// 리뷰 조회
exports.getAllReviewsByProductid = async (product_id) => {
  return db.query(
    `SELECT * FROM REVIEW
        WHERE product_id=?
        ORDER BY created_at DESC`,
        [product_id]
  );
};