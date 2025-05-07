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

// 리뷰 생성
exports.createReview = async (review) => {
  const { user_id, product_id, rating, longevity, sillage, gender, content } =
    review;
  console.log("모델로 전달된 데이터:", review);

  try {
    const [result] = await db.query(
      `
            INSERT INTO REVIEW (user_id, product_id, rating, longevity, sillage, gender, content, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
          `,
      [user_id, product_id, rating, longevity, sillage, gender, content]
    );
    console.log("✅ 삽입 성공:", result);
    return result;
  } catch (err) {
    console.error("DB 리뷰 삽입 오류:", err);
    throw err;
  }
};

// 리뷰 삭제
exports.deleteReview = async (reviewId, userId) => {
  const [result] = await db.query(
    `
        DELETE FROM REVIEW WHERE id = ? AND user_id = ?
      `,
    [reviewId, userId]
  );
  return result.affectedRows > 0;
};

// 리뷰 통계
exports.getReviewStatsByProductId = async (productId) => {
  const [rows] = await db.query(
    `
        SELECT
          ROUND(AVG(rating), 2) AS avg_rating,
          COUNT(*) AS total_reviews,
          ROUND(AVG(CASE longevity
            WHEN '매우약함' THEN 1 
            WHEN '약함' THEN 2 
            WHEN '중간' THEN 3
            WHEN '강함' THEN 4 
            WHEN '아주강함' THEN 5 
            ELSE NULL END), 1) AS avg_longevity,
          ROUND(AVG(CASE sillage
            WHEN '매우약함' THEN 1 
            WHEN '약함' THEN 2 
            WHEN '중간' THEN 3
            WHEN '강함' THEN 4 
            WHEN '아주강함' THEN 5 
            ELSE NULL END), 1) AS avg_sillage,
          (SELECT gender FROM REVIEW WHERE product_id = ? 
          GROUP BY gender ORDER BY COUNT(*) 
          DESC LIMIT 1) AS majority_gender
        FROM REVIEW
        WHERE product_id = ?
      `,
    [productId, productId]
  );

  return rows[0];
};

// 리뷰 수정
exports.updateReview = async (data) => {
  const { review_id, user_id, rating, longevity, sillage, gender, content } =
    data;

  const [result] = await db.query(
    `
      UPDATE REVIEW
      SET
        rating = ?,
        longevity = ?,
        sillage = ?,
        gender = ?,
        content = ?
      WHERE id = ? AND user_id = ?
    `,
    [rating, longevity, sillage, gender, content, review_id, user_id]
  );

  return result;
};
