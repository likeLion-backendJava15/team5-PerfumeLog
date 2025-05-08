import React, { useEffect, useState } from "react";
import "../index.css";

export default function ReviewStats({ productId }) {
  const [stats, setStats] = useState(null);
  const [distribution, setDistribution] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!productId) return;

    fetch(`http://localhost:3001/api/reviews/stats/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);

        const dist = [0, 0, 0, 0, 0];
        if (data.distribution) {
          data.distribution.forEach(({ rating, count }) => {
            if (rating >= 1 && rating <= 5) {
              dist[5 - rating] = count;
            }
          });
        }
        setDistribution(dist);
      });
  }, [productId]);

  if (!stats) return <div>로딩 중...</div>;

  const renderSlider = (label, value, marks) => (
    <div
      className="d-flex align-items-start mb-5"
      style={{ columnGap: "50px", width: "100%" }}
    >
      <div
        className="text-center fw-bold pt-3"
        style={{ width: "100px", color: "#4FB7B1", flexShrink: 0 }}
      >
        {label}
      </div>

      <div className="flex-grow-1">
        <div
          className="slider-labels"
          style={{
            position: "relative",
            height: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          {marks.map((text, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i / (marks.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <input
          type="range"
          min="0"
          max={marks.length - 1}
          value={(() => {
            if (label === "지속력") return stats.averageLongevity ? stats.averageLongevity - 1 : 2;
            if (label === "확산력") return stats.averageSillage ? stats.averageSillage - 1 : 2;
            if (label === "성별")
              return stats.majorityGender === "남성적"
                ? 2
                : stats.majorityGender === "여성적"
                ? 0
                : 1;
            return 0;
          })()}
          disabled
          className="form-range custom-range"
        />
      </div>
    </div>
  );

  return (
    <div
      className="d-flex px-4 py-3 justify-content-between align-items-start"
      style={{ gap: "2rem" }}
    >
      {/* 왼쪽: 별점 평균 + 분포 */}
      <div style={{ flex: "1" }}>
        <div className="text-center mb-3">
          <div className="d-flex justify-content-center align-items-center mb-1">
            <span style={{ fontSize: "2rem", color: "#f5c518" }}>★</span>
            <span
              className="fw-bold"
              style={{ fontSize: "2rem", marginLeft: "8px" }}
            >
              {stats.averageRating != null
                ? Number(stats.averageRating).toFixed(1)
                : "0.0"}
            </span>
          </div>
          <div className="review-cnt-text">{stats.totalReviews} Reviews</div>
        </div>

        {distribution.map((count, idx) => (
          <div key={idx} className="d-flex align-items-center mb-2">
            <span style={{ width: "20px", color: "#929292" }}>{5 - idx}</span>
            <div
              className="flex-grow-1 bg-light"
              style={{
                height: "10px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(count / Math.max(...distribution)) * 100}%`,
                  backgroundColor: "#f5c518",
                  height: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 오른쪽: 슬라이더 */}
      <div style={{ flex: "2" }}>
        {renderSlider("지속력", stats.averageLongevity, [
          "매우약함",
          "약함",
          "중간",
          "강함",
          "아주강함",
        ])}
        {renderSlider("확산력", stats.averageSillage, [
          "매우약함",
          "약함",
          "중간",
          "강함",
          "아주강함",
        ])}
        {renderSlider("성별", stats.majorityGender, [
          "여성적",
          "중성적",
          "남성적",
        ])}
      </div>
    </div>
  );
}
