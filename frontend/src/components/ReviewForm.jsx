import React, { useState } from 'react';

const ReviewForm = () => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [longevity, setLongevity] = useState(3);
  const [sillage, setSillage] = useState(3);
  const [gender, setGender] = useState(3);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const reviewData = {
      rating,
      longevity,
      sillage,
      gender,
      content,
    };
    console.log('제출할 리뷰:', reviewData);
    // 서버 전송 로직 추가 가능
  };

  return (
    <div className="p-4 border rounded-md w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">리뷰 쓰기</h2>

      <div className="flex items-center gap-4 mb-4">
        <img src="/sample-product.jpg" alt="향수 이미지" className="w-20 h-20" />
        <div>
          <p className="text-sm text-gray-500">브랜드명</p>
          <h3 className="text-xl font-bold">제품 이름</h3>
        </div>
      </div>

      {/* STEP 1: 별점 + 슬라이더 */}
      {step === 1 && (
        <>
          <div className="mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* 슬라이더 입력 */}
          <Slider label="지속력" value={longevity} setValue={setLongevity} />
          <Slider label="확산력" value={sillage} setValue={setSillage} />
          <Slider label="성별" value={gender} setValue={setGender} />

          <button
            onClick={() => setStep(2)}
            className="mt-6 bg-teal-500 text-white px-4 py-2 rounded"
          >
            다음 단계
          </button>
        </>
      )}

      {/* STEP 2: 리뷰 작성 */}
      {step === 2 && (
        <>
          <div className="mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="w-full h-40 p-2 border rounded resize-none"
            placeholder="향수의 노트, 강약, 계절감, 상황, 지속력, 확산력 등에 대해 자유롭게 리뷰를 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
          >
            등록하기
          </button>
        </>
      )}
    </div>
  );
};

const Slider = ({ label, value, setValue }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="range"
      min="1"
      max="5"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full"
    />
    <div className="text-center text-sm mt-1">{value}점</div>
  </div>
);

export default ReviewForm;
