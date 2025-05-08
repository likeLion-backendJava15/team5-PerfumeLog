import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [notes, setNotes] = useState({ TOP: [], BASE: [] });
  const [isLiked, setIsLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  // 로그인된 사용자 정보 불러오기
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

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
    }
  }, [id]);
  
  const toggleLike = () => {
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
      <ProductDetail product={product} notes={notes} toggleLike={toggleLike} isLiked={isLiked} reviews={reviews} currentUserId={userId} />
    )}
    </div>
  );
}

export default ProductPage;
