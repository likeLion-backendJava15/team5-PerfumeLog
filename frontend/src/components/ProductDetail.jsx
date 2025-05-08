import { Star, Heart } from "lucide-react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import ReviewStats from "./ReviewStats";

function ProductDetail({ product, notes, reviews }) {
  const navigate = useNavigate();
  const handleWriteReview = () => {
    navigate(`/reviews/create/${product.id}`);
  };

  const topNotes = notes
    .filter((note) => note.type === "TOP")
    .map((note) => note.name);
  const baseNotes = notes
    .filter((note) => note.type === "BASE")
    .map((note) => note.name);

  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="container py-4">
      <div className="row mb-5">
        <div
          className="col-md-5 d-flex align-items-center justify-content-center"
          style={{ height: "500px" }}
        >
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="row mb-5 col-md-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h5 text-muted">{product.brand}</h2>
              <h1 className="h3 font-weight-bold">{product.name}</h1>
              <div className="d-flex align-items-center">
                <Star className="text-warning me-2" fill="#FFD700" />
                <span>
                  {product.averageRating
                    ? Number(product.averageRating).toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-secondary ms-2">
                  ({product.reviewCount || 0})
                </span>
              </div>
            </div>
            <div className="h3">{product.price?.toLocaleString() || "0"}</div>
          </div>

          <div className="mb-3">
            <span className="badge bg-danger">{product.family}</span>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h5 className="fw-bold">Top</h5>
              {topNotes.length > 0 ? (
                topNotes.map((note, index) => (
                  <span key={index} className="block">
                    {note}
                  </span>
                ))
              ) : (
                <span>없음</span>
              )}
            </div>
            <div className="col">
              <h5 className="fw-bold">Base</h5>
              {baseNotes.length > 0 ? (
                baseNotes.map((note, index) => (
                  <span key={index} className="block">
                    {note}
                  </span>
                ))
              ) : (
                <span>없음</span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between border-top pt-3">
            <div className="d-flex align-items-center">
              <img onClick={handleWriteReview}
                src="/reviewCreate.png"
                alt="리뷰 아이콘"
                style={{ width: "50px", height: "50px", cursor: 'pointer' }}
              />
              <button onClick={handleWriteReview}
                className="customBtn"
                style={{
                  color: "#4FB7B1",
                  fontWeight: "bold",
                  fontFamily: "Nanum Myeongjo, Noto Sans KR, serif",
                  fontSize: "1.2em",
                  marginLeft: "7px",
                  marginTop: "6px",
                }}
              >
                리뷰 쓰기
              </button>
            </div>
            <button onClick={toggleLike} className="customBtn">
              <Heart
                className={isLiked ? "text-danger" : "text-secondary"}
                fill={isLiked ? "#FF6347" : "none"}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="py-3 d-flex">
        <button
          onClick={() => setActiveTab("info")}
          className={`btn flex-grow-1 ${
            activeTab === "info" ? "product-btn-selected" : "product-btn"
          }`}
        >
          상품정보
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`btn flex-grow-1 ${
            activeTab === "review" ? "product-btn-selected" : "product-btn"
          }`}
        >
          리뷰
        </button>
      </div>

      <div className="mt-3">
        {activeTab === "info" ? (
          <div>상품 정보 내용</div>
        ) : (
          <>
          <ReviewStats productId={product.id} />
          <ReviewList reviews={reviews} productId={product.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
