import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

export default function ReviewCreatePage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  // 로그인된 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('불러온 유저:', user);
      setUserId(user.id);
    } else {
      console.log('localStorage에 유저 없음');
    }
  }, []);

  // 제품 정보 불러오기
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('불러온 제품:', data);
        setProduct(data);
      })
      .catch((err) => console.error('제품 정보 로딩 실패:', err));
  }, [productId]);

  return (
    <div className="container mt-5 px-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {product && userId ? (
        <>
          {/* 리뷰 작성 폼 */}
          <ReviewForm productId={productId} userId={userId} product={product} />
        </>
      ) : (
        <p>리뷰 작성 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
