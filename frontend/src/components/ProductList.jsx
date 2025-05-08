// src/components/ProductList.js
import React from 'react';
import { Container } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {

  return (
    <Container className="mt-3">
      {products.map((product, index) => (
        <div key={index} style={{ borderBottom: '2px solid #D5EDE9' }} className="py-3">
          <ProductCard
      id={product.id} 
      imageUrl={product.imageUrl} 
      brandName={product.brandName} 
      productName={product.productName} 
      averageRating={product.averageRating}
      reviewCount={product.reviewCount}/>

        </div>
      ))}
    </Container>
  );
};

export default ProductList;
