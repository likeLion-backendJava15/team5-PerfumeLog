// src/pages/SearchResult.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/search?q=${query}`);
        setSearchResults(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('검색 실패:', err);
        setError('검색 결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (query && query.trim()) {
      fetchSearchResults();
    } else {
      setLoading(false); // 로딩 멈추고
    }
  }, [query]);

  if (!query || !query.trim()) {
    return <div className="text-gray-500 text-center mt-6">검색어를 입력해주세요.</div>;
  }

  if (loading) return <div>로딩 중...!</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#4FB7B1' }}>
        "{query}" 검색 결과</h2>
      {searchResults.length > 0 ? (
        <ProductList
          products={searchResults.map((product) => ({
          id: product.id,
          imageUrl: product.image_url,
          productName: product.product_name,
          brandName: product.brand_name,
          averageRating: product.average_rating,
          reviewCount: product.review_count,
          }))}
        />
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResult;