import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ productId, userId, sort, onReload }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:3001/api/reviews/${productId}?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error("리뷰 로드 실패:", err);
      });
  }, [productId, sort, onReload]); 

  return (
    <div>
      {reviews.length === 0 ? (
        <p>등록된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            userId={userId}
            onReload={onReload}
          />
        ))
      )}
    </div>
  );
}