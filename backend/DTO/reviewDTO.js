exports.toReviewDTO = (review) => ({ // 일반 리뷰 DTO
  id: review.id,
  userId: review.user_id, // auto 생성되는 userId
  userid: review.userid, // 사용자가 입력한 userid
  rating: review.rating,
  longevity: review.longevity,
  sillage: review.sillage,
  gender: review.gender,
  content: review.content,
  createdAt: review.created_at,
  productName: review.product_name,
  brandName: review.brand_name,
  likeCount: review.like_count ?? 0,
});

// 통계 DTO
exports.toStatsDTO = (stat) => ({
  averageRating: stat.avg_rating,
  averageLongevity: stat.avg_longevity,
  averageSillage: stat.avg_sillage,
  totalReviews: stat.total_reviews,
  majorityGender: stat.majority_gender,
});