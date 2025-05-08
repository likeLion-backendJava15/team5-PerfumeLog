import React, { useState } from "react";
import "../index.css";

export default function ReviewForm({ productId, userId, onAdd, product }) {
  const [form, setForm] = useState({
    rating: 0,
    longevity: 2,
    sillage: 2,
    gender: 2,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const levelMap = {
      0: "매우약함",
      1: "약함",
      2: "중간",
      3: "강함",
      4: "아주강함",
    };

    const genderMap = {
      0: "남성적",
      1: "중성적",
      2: "여성적",
    };

    const reviewData = {
      user_id: userId,
      product_id: productId,
      rating: form.rating,
      longevity: levelMap[form.longevity],
      sillage: levelMap[form.sillage],
      gender: genderMap[form.gender],
      content: form.content,
    };

    const res = await fetch(`http://localhost:3001/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      alert("리뷰 등록 완료!");
      setForm({ rating: 0, longevity: 3, sillage: 3, gender: 3, content: "" });
      onAdd?.();
    } else {
      alert("리뷰 등록 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4"
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Nanum Myeongjo, serif' }}
    >
      <div className="p-4" style={{ backgroundColor: "#fff" }}>
        {/* 제품 정보 + 별점*/}
        <div className="d-flex gap-4 align-items-start mb-4">
  {/* 왼쪽: 이미지 */}
  <img
    src={product.imageUrl}
    alt={product.name}
    className="rounded"
    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
    referrerPolicy="no-referrer"
  />

  {/* 오른쪽: 텍스트 블록 */}
  <div className="flex-grow-1">
    {/* 브랜드 + 별점 한 줄 */}
    <div className="d-flex justify-content-between align-items-center">
      <p className="text-muted mb-1">{product.brand}</p>
      <div style={{position: 'relative', top:'20px'}}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setForm({ ...form, rating: star })}
            style={{
              cursor: 'pointer',
              fontSize: '2rem',
              color: star <= form.rating ? '#f5c518' : '#e0e0e0',
              marginLeft: star > 1 ? '4px' : '0'
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>

    {/* 제품명 */}
    <h5 className="fw-bold mb-0">{product.name}</h5>
  </div>
</div>

        <RangeWithLabel
          name="longevity"
          label="지속력"
          value={form.longevity}
          onChange={handleChange}
          marks={["매우약함", "약함", "중간", "강함", "아주강함"]}
        />
        <RangeWithLabel
          name="sillage"
          label="확산력"
          value={form.sillage}
          onChange={handleChange}
          marks={["매우약함", "약함", "중간", "강함", "아주강함"]}
        />
        <RangeWithLabel
          name="gender"
          label="성별느낌"
          value={form.gender}
          onChange={handleChange}
          marks={["남성적", "중성적", "여성적"]}
        />

        <div className="mb-4">
          <textarea
            name="content"
            className="form-control"
            style={{ height: '200px',
              padding: '15px',
              resize: 'none'
             }}
            placeholder="내가 느낀 향과 계절감, 잔향, 지속력 등에 대해 자유롭게 작성해주세요 :)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={5}
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn text-white px-4"
            style={{ backgroundColor: "#4FB7B1",
              fontWeight: "500",
              fontFamily: 'Noto Sans KR'
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </form>
  );
}

const RangeWithLabel = ({ name, label, value, onChange, marks }) => {
  return (
    <div
      className="d-flex align-items-start mb-5"
      style={{ columnGap: '50px' }}
    >
      <div
        className="text-center fw-bold pt-3"
        style={{
          width: '100px',
          color: '#4FB7B1',
          flexShrink: 0
        }}
      >
        {label}
      </div>

      <div className="flex-grow-1">
        {/* 마커 텍스트 */}
        <div
          className="slider-labels"
          style={{
            position: "relative",
            height: "1.5rem",
            marginBottom: "0.5rem"
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
                whiteSpace: "nowrap"
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* 슬라이더 */}
        <input
          type="range"
          name={name}
          min="0"
          max={marks.length - 1}
          value={value}
          onChange={onChange}
          className="form-range custom-range"
          style={{ marginTop: "0px" }}
        />
      </div>
    </div>
  );
};

