import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../AuthContext';

export default function ReviewCreatePage() {
  const { user, loading } = useAuth();
  console.log('Context에서 받은 user:', user);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
      {loading ? (
        <p>로그인 정보를 불러오는 중입니다...</p>
      ) : product && user?.userid ? (
        <ReviewForm productId={productId} userId={user.id} product={product} />
      ) : (
        <p>리뷰 작성 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
