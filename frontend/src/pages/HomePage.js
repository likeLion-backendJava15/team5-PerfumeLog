// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('제품 불러오기 실패:', err);
      setError('제품 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <ProductFilter onFilterChange={handleFilterChange} />

      <h2 className="text-2xl font-bold mb-6 text-[#4FB7B1]">전체 제품 목록</h2>
      {products.length > 0 ? (
        <ProductList
          products={products.map((product) => ({
            id: product.id,
            imageUrl: product.imageUrl,
            productName: product.name,
            brandName: product.brand,
            averageRating: product.averageRating,
            reviewCount: product.reviewCount,
          }))}
        />
      ) : (
        <p className="text-gray-500">제품이 없습니다.</p>
      )}
    </div>
  );
};

export default Homepage;
