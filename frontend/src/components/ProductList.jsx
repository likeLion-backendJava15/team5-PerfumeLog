import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.image_url}
          brand={product.brand_name}
          name={product.product_name}
          averageRating={product.average_rating}
          reviewCount={product.review_count}
        />
      ))}
    </div>
  );
};

export default ProductList;
