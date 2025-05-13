import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { useAuth } from '../AuthContext';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [notes, setNotes] = useState({ TOP: [], BASE: [] });
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  const { user } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    if(id) {
      fetch(`http://localhost:3001/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("제품 데이터 로드 실패:", err));
    
      fetch(`http://localhost:3001/api/product-notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const notesData = { TOP: [], BASE: [] };
          data.forEach((note) => {
            notesData[note.type]?.push(note.name);
          });
          setNotes(notesData);
        })
        .catch((err) => console.error("노트 데이터 로드 실패: ", err));
      
      fetch(`http://localhost:3001/api/reviews/${id}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch((err) => console.error("리뷰 데이터 로드 실패: ", err));

      fetch(`http://localhost:3001/api/reviews/stats/${id}`)
        .then(res => res.json())
        .then(data => setReviewStats(data))
        .catch((err) => console.error("리뷰 통계 로드 실패: ", err));
    }

    if(userId) {
      fetch(`http://localhost:3001/api/wishes/${userId}/${id}`)
        .then((res) => res.json())
        .then((data) => setIsLiked(data.isLiked))
        .catch((err) => console.error("찜 상태 로드 실패: ", err));
    }
  }, [id, userId, reloadFlag]);

  const toggleLike = () => {
    if(!userId) {
      console.warn("로그인 후 찜 기능을 사용할 수 있습니다.");
      return;
    }

    const apiUrl = 'http://localhost:3001/api/wishes';

    fetch(apiUrl, {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: id
      }),
    })
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => console.error("찜 요청 실패:", err));
  };
  
  return (
    <div className="p-4">
      {(product.error) ? (
        <p>Product not found</p>
      ) : (
        <ProductDetail
          product={product}
          notes={notes}
          toggleLike={toggleLike}
          isLiked={isLiked}
          reviews={reviews}
          currentUserId={userId}
          reviewStats={reviewStats}
          reloadFlag={reloadFlag}
          setReloadFlag={setReloadFlag}
        />
      )}
    </div>
  );
}

export default ProductPage;
