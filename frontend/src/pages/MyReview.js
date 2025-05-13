import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const MyReview = () => {
  const { user } = useAuth();
  const userId = user?.id || user?.userid;
  const [myReviews, setMyReviews] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [reloadFlag, setReloadFlag] = useState(false);

  const thumbFilled = process.env.PUBLIC_URL + "/thumb-filled.png";
  const thumbEmpty = process.env.PUBLIC_URL + "/thumb.png";

  useEffect(() => {
    fetch(`http://localhost:3001/api/reviews/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setMyReviews(data);
        const liked = new Set(data.filter((r) => r.liked).map((r) => r.id));
        setLikedReviews(liked);
      })
      .catch((err) => console.error("리뷰 로딩 실패:", err));
  }, [userId, reloadFlag]);

  const handleDelete = (reviewId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    fetch(`http://localhost:3001/api/reviews/${reviewId}/${userId}`, {
      method: "DELETE",
    })
      .then(() => setReloadFlag((prev) => !prev))
      .catch((err) => console.error("삭제 실패:", err));
  };

  const handleUpdate = (reviewId) => {
    const targetReview = myReviews.find((r) => r.id === reviewId);
    if (!targetReview) return;

    fetch(`http://localhost:3001/api/reviews/${reviewId}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: targetReview.rating,
        longevity: targetReview.longevity,
        sillage: targetReview.sillage,
        gender: targetReview.gender,
        content: editedContent,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setMyReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId ? { ...r, content: editedContent } : r
          )
        );
        setEditModeId(null);
      })
      .catch((err) => console.error("수정 실패:", err));
  };

  const handleLikeToggle = (reviewId) => {
    fetch(`http://localhost:3001/api/review-likes/${reviewId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLikedReviews((prev) => {
          const updated = new Set(prev);
          const updatedReviews = myReviews.map((r) =>
            r.id === reviewId
              ? { ...r, likeCount: r.likeCount + (data.toggled ? 1 : -1) }
              : r
          );
          setMyReviews(updatedReviews);

          if (data.toggled) {
            updated.add(reviewId);
          } else {
            updated.delete(reviewId);
          }
          return updated;
        });
      })
      .catch((err) => console.error("좋아요 토글 실패:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#4FB7B1" }}>
        내 리뷰
      </h2>

      {myReviews.map((review) => {
        const expanded = review.id === editModeId;
        return (
          <div
            key={review.id}
            className="p-4 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D5EDE9",
              borderRadius: "12px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold" style={{ color: "#7699a1" }}>
                {review?.userid ?? "익명"}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#aaaaaa" }}>
                {review?.createdAt?.split("T")[0]}
              </span>
            </div>

            <p className="mb-2 fw-bold" style={{ color: "#4FB7B1" }}>
              {review.brandName} - {review.productName}
            </p>

            <div
              className="mb-2"
              style={{ color: "#f5c518", fontSize: "1.1rem" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  style={{ color: n <= review?.rating ? "#f5c518" : "#e4e4e4" }}
                >
                  ★
                </span>
              ))}
            </div>

            {editModeId === review.id ? (
              <>
                <textarea
                  className="form-control my-2"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleUpdate(review.id)}
                >
                  저장
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditModeId(null)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <p
                  className="mb-2"
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {review?.content}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setEditModeId(review.id);
                        setEditedContent(review.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(review.id)}
                    >
                      삭제
                    </button>
                  </div>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleLikeToggle(review.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: likedReviews.has(review.id) ? "#4fb7b1" : "#999",
                    }}
                  >
                    <img
                      src={
                        likedReviews.has(review.id) ? thumbFilled : thumbEmpty
                      }
                      alt="like"
                      width={16}
                      height={16}
                      style={{ marginRight: "4px" }}
                    />
                    {review.likeCount || 0}
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyReview;
