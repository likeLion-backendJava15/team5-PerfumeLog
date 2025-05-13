const reviewModel = require("../models/reviewModel"); // dao
const { toReviewDTO, toStatsDTO } = require("../DTO/reviewDTO"); //dto

// 리뷰 조회
exports.getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const sort = req.query.sort || "recent";

    const [reviews] = await reviewModel.getAllReviewsByProductid(
      productId,
      sort
    );
    const dto = reviews.map(toReviewDTO);
    console.log("조회 결과:", dto);
    res.status(200).json(dto);
  } catch (err) {
    console.error("❌ 리뷰 조회 실패:", err);
    res.status(500).json({ error: "리뷰 조회 실패" });
  }
};

// 리뷰 생성
exports.createReview = async (req, res) => {
  try {
    const result = await reviewModel.createReview(req.body);

    console.log("✅ 리뷰 등록 성공:", result);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("❌ 리뷰 등록 중 컨트롤러 오류:", err);
    res.status(500).json({ error: "리뷰 등록 실패", detail: err.message });
  }
};

// 리뷰 삭제
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.params.userId;
  try {
    const result = await reviewModel.deleteReview(reviewId, userId);
    res.status(200).json({ message: "삭제 완료" });
  } catch (err) {
    console.error("❌ 리뷰 삭제 오류:", err);
    res.status(500).json({ error: "리뷰 삭제 실패" });
  }
};

// 리뷰 통계 조회
exports.getReviewStats = async (req, res) => {
  try {
    const stats = await reviewModel.getReviewStatsByProductId(
      req.params.productId
    );
    console.log("최종 통계 응답 데이터:", stats);
    res.json({
      distribution: stats.distribution || [],
      ...toStatsDTO(stats),
    });
  } catch (err) {
    console.error("❌ 리뷰 통계 조회 실패:", err);
    res.status(500).json({ error: "리뷰 통계 조회 실패" });
  }
};

// 리뷰 수정
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.params.userId;

    const { rating, longevity, sillage, gender, content } = req.body;

    const result = await reviewModel.updateReview({
      review_id: reviewId,
      user_id: userId,
      rating,
      longevity,
      sillage,
      gender,
      content,
    });

    res.status(200).json({ message: "리뷰 수정 완료" });
  } catch (err) {
    console.error("❌ 리뷰 수정 오류:", err);
    res.status(500).json({ error: "리뷰 수정 실패" });
  }
};

// 내 리뷰 조회
exports.getReviewsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await reviewModel.getReviewsByUserId(userId);
    const dto = reviews.map(toReviewDTO);
    res.status(200).json(dto);
  } catch (err) {
    console.error("사용자 리뷰 조회 실패:", err);
    res.status(500).json({ error: '사용자 리뷰 조회 실패' });
  }
};

// 관리자 전용 전체 리뷰 조회
exports.getAllReviewsAsAdmin = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviewsWithUser();
    console.log("✅ 전체 리뷰 조회 결과:", reviews);
    const dto = reviews.map(toReviewDTO);
    res.status(200).json(dto);
  } catch (err) {
    console.error("전체 리뷰 조회 실패:", err);
    res.status(500).json({ error: '전체 리뷰 조회 실패' });
  }
};

exports.adminDeleteReview = async (req, res) => {
  try {
    const result = await reviewModel.adminDeleteReview(req.params.reviewId);
    res.status(200).json({ message: "삭제 완료" });
  } catch (err) {
    console.error("❌ 관리자 리뷰 삭제 실패:", err);
    res.status(500).json({ error: "리뷰 삭제 실패" });
  }
};