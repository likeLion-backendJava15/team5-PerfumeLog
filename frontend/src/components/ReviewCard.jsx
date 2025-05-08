import React, { useEffect, useState } from "react";

export default function ReviewCard({ review, userId }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const thumbFilled = process.env.PUBLIC_URL + "/thumb-filled.png";
  const thumbEmpty = process.env.PUBLIC_URL + "/thumb.png";

  useEffect(() => {
    if (!userId || !review.id) return;

    fetch(
      `http://localhost:3001/api/review-likes/${review.id}/likes/check?user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setLiked(data.likedByUser));

    fetch(`http://localhost:3001/api/review-likes/${review.id}/likes/count`)
      .then((res) => res.json())
      .then((data) => setLikeCount(data.likeCount));
  }, [review.id, userId]);

  const handleLike = () => {
    fetch(`http://localhost:3001/api/review-likes/${review.id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("toggle like response:", data); // 디버깅용

        if (typeof data.toggled === "boolean") {
          setLiked(data.toggled);
          setLikeCount((prev) => prev + (data.toggled ? 1 : -1));
        } else {
          console.warn("서버 응답 오류:", data);
        }
      })
      .catch((err) => {
        console.error("like toggle fetch 실패:", err);
      });
  };

  const toggleContent = () => setExpanded((prev) => !prev);

  return (
    <div
      className="p-4 mb-4"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #D5EDE9",
        borderRadius: "12px",
      }}
    >
      {/* 상단: 유저 아이디 + 날짜 */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-semibold" style={{ color: "#7699a1" }}>
          {review?.userid ?? "익명"}
        </span>
        <span style={{ fontSize: "0.875rem", color: "#aaaaaa" }}>
          {review?.createdAt?.split("T")[0]}
        </span>
      </div>

      {/* 별점 */}
      <div className="mb-2" style={{ color: "#f5c518", fontSize: "1.1rem" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{ color: n <= review?.rating ? "#f5c518" : "#e4e4e4" }}
          >
            ★
          </span>
        ))}
      </div>

      {/* 리뷰 내용 */}
      <p
        className="mb-2"
        style={{
          whiteSpace: "pre-line",
          fontSize: "0.95rem",
          lineHeight: "1.6",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "none" : 3,
        }}
      >
        {review?.content}
      </p>

      {/* 더보기 */}
      {review?.content?.length > 100 && (
        <button
          className="btn btn-sm px-2 py-1"
          style={{ backgroundColor: "transparent", color: "#4fb7b1" }}
          onClick={toggleContent}
        >
          {expanded ? "접기" : "더보기"}
        </button>
      )}

      {/* 추천 */}
      <div className="text-end">
        {userId ? (
          <button
            className="btn btn-sm"
            onClick={handleLike}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: liked ? "#4fb7b1" : "#999",
            }}
          >
            <img
              src={liked ? thumbFilled : thumbEmpty}
              alt="like"
              width={16}
              height={16}
              style={{ marginRight: "4px" }}
            />
            {likeCount}
          </button>
        ) : (
          <span style={{ fontSize: "0.875rem", color: "#ccc" }}>
            로그인 시 추천 가능
          </span>
        )}
      </div>
    </div>
  );
}
