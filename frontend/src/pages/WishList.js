// WishList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import { useAuth } from '../AuthContext';

const WishList = () => {
  const { user, loading: authLoading } = useAuth(); // 로그인 정보 가져오기
  const [wishProducts, setWishProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return; // user 정보가 없으면 요청하지 않음

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/wishes/${user.id}`);
        setWishProducts(response.data);
        console.log("✔ 불러온 찜 목록:", response.data);
      } catch (err) {
        console.error('찜 목록 불러오기 실패:', err);
        setError('찜 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  if (authLoading || loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#4FB7B1' }}>내 찜 목록</h2>
      {wishProducts.length > 0 ? (
        <ProductList
          products={wishProducts.map((product) => ({
            id: product.id,
            imageUrl: product.imageUrl,
            productName: product.productName,
            brandName: product.brandName,
            averageRating: product.averageRating,
            reviewCount: product.reviewCount,
          }))}
        />
      ) : (
        <p className="text-gray-500">찜한 제품이 없습니다.</p>
      )}
    </div>
  );
};

export default WishList;
