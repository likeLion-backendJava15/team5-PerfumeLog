exports.toReviewDTO = (review) => ({ // 일반 리뷰 DTO
  id: review.id,
  userId: review.user_id,
  rating: review.rating,
  longevity: review.longevity,
  sillage: review.sillage,
  gender: review.gender,
  content: review.content,
  createdAt: review.created_at,
});

// 통계 DTO
exports.toStatsDTO = (stat) => ({
  averageRating: stat.avg_rating,
  averageLongevity: stat.avg_longevity,
  averageSillage: stat.avg_sillage,
  totalReviews: stat.total_reviews,
  majorityGender: stat.majority_gender,
});