import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

const MyReview = () => {
  const { user } = useAuth();
  const userId = user?.id || user?.userid;
  const [myReviews, setMyReviews] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [likedReviews, setLikedReviews] = useState(new Set());

  const [newProductId, setNewProductId] = useState("");
  const [newContent, setNewContent] = useState("");
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/user/${userId}`)
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
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => {
        // 삭제 후 강제 reload 트리거 → useEffect 재실행
        setReloadFlag((prev) => !prev);
      })
      .catch((err) => console.error("삭제 실패:", err));
  };

  const handleUpdate = (reviewId) => {
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editedContent }),
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
    fetch(`http://localhost:5000/api/review-likes/${reviewId}/like`, {
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

  const handleAddReview = () => {
    if (!newProductId.trim() || !newContent.trim()) return;

    fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: newProductId,
        content: newContent,
      }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setMyReviews((prev) => [
          ...prev,
          { ...newReview, likeCount: 0, liked: false },
        ]);
        setNewProductId("");
        setNewContent("");
      })
      .catch((err) => console.error("리뷰 등록 실패:", err));
  };

  return (
    <div>
      <h2>내 리뷰</h2>

      <div
        style={{ marginBottom: "20px", padding: 10, border: "1px solid #ddd" }}
      >
        <h4>📝 리뷰 작성</h4>
        <input
          type="text"
          value={newProductId}
          placeholder="제품 ID"
          onChange={(e) => setNewProductId(e.target.value)}
        />
        <br />
        <textarea
          value={newContent}
          placeholder="리뷰 내용"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <br />
        <button onClick={handleAddReview}>리뷰 등록</button>
      </div>

      {myReviews.map((review) => (
        <div
          key={review.id}
          style={{ borderBottom: "1px solid #ccc", padding: 10 }}
        >
          <strong>{review.productName}</strong>
          {editModeId === review.id ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(review.id)}>저장</button>
              <button onClick={() => setEditModeId(null)}>취소</button>
            </>
          ) : (
            <>
              <p>{review.content}</p>
              <button
                onClick={() => {
                  setEditModeId(review.id);
                  setEditedContent(review.content);
                }}
              >
                수정
              </button>
              <button onClick={() => handleDelete(review.id)}>삭제</button>
              <button onClick={() => handleLikeToggle(review.id)}>
                {likedReviews.has(review.id) ? "❤️" : "🤍"} 좋아요 (
                {review.likeCount})
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyReview;
