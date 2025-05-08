import { Star, Heart } from "lucide-react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductDetail({ product, notes, toggleLike, isLiked }) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="container py-4">
      <div className="row mb-5">
        <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
          <img 
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="row mb-5 col-md-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h5 text-muted">{product.brand}</h2>
              <h1 className="h3 font-weight-bold">{product.name}</h1>
              <div className="d-flex align-items-center">
                <Star className="text-warning me-2" fill="#FFD700" />
              <span>{product.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="text-secondary ms-2">({product.reviewCount || 0})</span>
            </div>
          </div>
          <div className="h3">{product.price?.toLocaleString() || '0'}</div>
        </div>

        <div className="mb-3">
            <span className="badge bg-danger">{product.family}</span>
        </div>

        <div className="row mb-3">
            <div className="col">
              <h5 className="fw-bold">Top</h5>
              {notes.TOP?.map((note, index) => (
                <span key={index} className="d-block">#{note}</span>
              ))}
            </div>
            <div className="col">
              <h5 className="fw-bold">Base</h5>
              {notes.BASE?.map((note, index) => (
                <span key={index} className="d-block">#{note}</span>
              ))}
            </div>
          </div>
        
          <div className="d-flex justify-content-between border-top pt-3">
            <button className="btn btn-link text-success">리뷰 쓰기</button>
            <button onClick={toggleLike} className="btn btn-outline-secondary">
              <Heart className={isLiked ? 'text-danger' : 'text-secondary'} fill={isLiked ? '#FF6347' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-top py-3 d-flex">
        <button 
          onClick={() => setActiveTab('info')} 
          className={`btn flex-grow-1 ${activeTab === 'info' ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          상품정보
        </button>
        <button 
          onClick={() => setActiveTab('review')} 
          className={`btn flex-grow-1 ${activeTab === 'review' ? 'btn-primary' : 'btn-outline-secondary'}`}
        >
          리뷰
        </button>
      </div>

      <div className="mt-3">
        {activeTab === 'info' ? (
          <div>상품 정보 내용</div>
        ) : (
          <div>리뷰 내용</div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
