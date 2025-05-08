import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Star } from 'lucide-react';

const ProductCard = ({ imageUrl, brandName, productName, averageRating, reviewCount }) => {

  return (
    <Card className="mb-3 shadow-sm border-0 rounded-3">
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
