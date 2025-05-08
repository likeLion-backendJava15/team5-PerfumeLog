// src/components/ProductList.js
import React from 'react';
import { Container } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <Container className="mt-3">
      {products.map((product, index) => (
        <div key={index} className="border-bottom py-3">
          <ProductCard product={product} />
        </div>
      ))}
    </Container>
  );
};

export default ProductList;
