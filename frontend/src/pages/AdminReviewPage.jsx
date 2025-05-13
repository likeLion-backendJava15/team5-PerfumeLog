import React, { useEffect, useState } from "react";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/reviews/all")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("전체 리뷰 불러오기 실패:", err));
  }, [reloadFlag]);

  const handleDelete = (reviewId) => {
    if (!window.confirm("정말 이 리뷰를 삭제하시겠습니까?")) return;

    fetch(`http://localhost:3001/api/reviews/admin/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => setReloadFlag((prev) => !prev))
      .catch((err) => console.error("리뷰 삭제 실패:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#4FB7B1" }}>
        전체 리뷰 관리 (관리자)
      </h2>

      {reviews.length === 0 ? (
        <p className="text-muted">등록된 리뷰가 없습니다.</p>
      ) : (
        <div className="list-group">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="list-group-item list-group-item-action mb-2 border rounded"
            >
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{review.userid}</strong> 님의 리뷰
                  <div className="text-muted small">
                    제품: {review.productName} / 평점: {review.rating}
                  </div>
                  <div className="mt-2">{review.content}</div>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(review.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
