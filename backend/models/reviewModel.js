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
