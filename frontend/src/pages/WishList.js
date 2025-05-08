// src/pages/WishList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

const WishList = () => {
  const [wishProducts, setWishProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/api/wish'); // API 엔드포인트에 맞게 수정
        setWishProducts(response.data);
      } catch (err) {
        console.error('찜 목록 불러오기 실패:', err);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="px-3">
      <h3 className="my-4">내 찜 목록</h3>
      <ProductList products={wishProducts} />
    </div>
  );
};

export default WishList;
