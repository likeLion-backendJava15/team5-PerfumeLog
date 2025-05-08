import React from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, productId, userId }) {
  if (!reviews?.length) return <p className="text-muted">작성된 리뷰가 없습니다.</p>;

  return (
    <div className="pt-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} userId={userId} />
      ))}
    </div>
  );
}
