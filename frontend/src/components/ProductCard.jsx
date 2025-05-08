import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ imageUrl, brand, name, averageRating, reviewCount }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center">
      <img src={imageUrl} alt={name} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-1">
        <p className="text-sm text-gray-500">{brand}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill='#F0C24D' />
          <span>{averageRating}</span>
          <span className="text-gray-400">리뷰({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
