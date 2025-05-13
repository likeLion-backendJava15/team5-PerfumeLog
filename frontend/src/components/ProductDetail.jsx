import { Star, Heart } from "lucide-react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import ReviewStats from "./ReviewStats";

function ProductDetail({
  product,
  notes,
  toggleLike,
  isLiked,
  reviews,
  currentUserId,
  reviewStats,
  reloadFlag,
  setReloadFlag, 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.returnToReviewTab === true ? "review" : "info";
  });

  const handleWriteReview = () => {
    navigate(`/reviews/create/${product.id}`, {
      state: { returnToReviewTab: true },
    });
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
                  {product.averageRating != null
                    ? Number(product.averageRating).toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-secondary ms-2">
                  리뷰({product.reviewCount || 0})
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
              {notes.TOP?.map((note, index) => (
                <span key={index} className="d-block">
                  #{note}
                </span>
              ))}
            </div>
            <div className="col">
              <h5 className="fw-bold">Base</h5>
              {notes.BASE?.map((note, index) => (
                <span key={index} className="d-block">
                  #{note}
                </span>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between border-top pt-3">
            <div className="d-flex align-items-center">
              <img
                onClick={handleWriteReview}
                src="/reviewCreate.png"
                alt="리뷰 아이콘"
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
              />
              <button
                onClick={handleWriteReview}
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
          <div>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        ) : (
          <>
            <ReviewStats productId={product.id} reloadFlag={reloadFlag} />
            <hr style={{ borderTop: "2px solid #9dd6cd", margin: "2rem 0" }} />
            <ReviewList
              reviews={reviews}
              productId={product.id}
              userId={currentUserId}
              onReload={() => setReloadFlag(prev => !prev)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
