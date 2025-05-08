import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Star } from 'lucide-react';

const ProductCard = ({ id, imageUrl, brandName, productName, averageRating, reviewCount }) => {
  const navigate = useNavigate();
  console.log('✅ ProductCard props:', {
    id,
    imageUrl,
    brandName,
    productName,
    averageRating,
    reviewCount
  });
  return (
    <Card className="mb-3 shadow-sm border-0 rounded-3" onClick={() => navigate(`/product/${id}`)} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={3}>
            <Image src={imageUrl} alt={productName} thumbnail rounded />
          </Col>
          <Col>
            <div className="text-muted small">{brandName}</div>
            <h5 className="mb-1">{productName}</h5>
            <div className="d-flex align-items-center text-warning">
              <Star size={16} fill="#F0C24D" strokeWidth={1} /> <span className="ms-1">{averageRating}</span>
            </div>
            <div>
            <span className="text-muted small">리뷰({reviewCount})</span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
