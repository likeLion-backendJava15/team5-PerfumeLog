import React, { useEffect, useState } from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [note, setNote] = useState('');
  const [type, setType] = useState('');

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3001/api/products';
      if (note && type) {
        url = `http://localhost:3001/api/notes/filter?note=${note}&type=${type}`;
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('제품 가져오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [note, type]);

  return (
    <div>
      <h2>향수 목록</h2>
      <ProductFilter
        onFilterChange={(selectedNote, selectedType) => {
          setNote(selectedNote);
          setType(selectedType);
        }}
      />
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;