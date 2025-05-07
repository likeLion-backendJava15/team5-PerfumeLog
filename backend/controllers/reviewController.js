const reviewModel = require('../models/reviewModel'); // dao
const { toReviewDTO, toStatsDTO } = require('../DTO/reviewDTO');  //dto

// 리뷰 조회
exports.getReviews = async (req, res) => {
    try {
        const [reviews] = await reviewModel.getAllReviewsByProductid(req.params.productId);
        const dto = reviews.map(toReviewDTO);
        console.log('조회 결과:', dto);
        res.json(dto);
      } catch (err) {
        res.status(500).json({ error: '리뷰 조회 실패' });
      }
};

// 리뷰 생성
exports.createReview = async (review) => {
  const { user_id, product_id, rating, longevity, sillage, gender, content } = review;
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
  console.error('DB 리뷰 삽입 오류:', err);
  throw err;
}
};

// 리뷰 생성
exports.createReview = async (review) => {
  const { user_id, product_id, rating, longevity, sillage, gender, content } = review;
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
  console.error('DB 리뷰 삽입 오류:', err);
  throw err;
}
};

// 리뷰 삭제
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.params.userId;
  try {
    const result = await reviewModel.deleteReview(reviewId, userId);
    res.status(200).json({ message: '삭제 완료' });
  } catch (err) {
    console.error("❌ 리뷰 삭제 오류:", err);
    res.status(500).json({ error: '리뷰 삭제 실패' });
  }
};
