import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid #eee'
    }}>
      {/* 향수 이미지 */}
      <img
        src={product.image_url}
        alt={product.name}
        style={{ width: '60px', height: '100px', objectFit: 'cover' }}
      />

      {/* 향수 정보 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.8rem', color: '#555' }}>
          브랜드명
        </span>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          {product.name}
        </span>

        {/* 별점 및 리뷰 수 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
          <FaStar color="#f4c542" />
          <span style={{ fontSize: '0.9rem' }}>{product.avg_rating?.toFixed(2) || '0.00'}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>
          리뷰({product.review_count || 0})
        </span>
      </div>
    </div>
  );
};

export default ProductCard;