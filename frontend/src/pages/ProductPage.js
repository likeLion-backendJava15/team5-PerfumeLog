import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [notes, setNotes] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if(id) {
      fetch(`http://localhost:3001/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("제품 데이터 로드 실패:", err));
    
      fetch(`http://localhost:3001/api/product-notes/${id}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("노트 데이터 로드 실패: ", err));
    }
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);
  
  if (product.error) return <p>Product not found</p>;

  return (
    <div className="p-4">
        <ProductDetail product={product} notes={notes} reviews={reviews} />
    </div>
  );
}

export default ProductPage;
