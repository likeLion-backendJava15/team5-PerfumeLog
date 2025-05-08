import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ imageUrl, brand, name, averageRating, reviewCount }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
      <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <p className="text-sm text-gray-500">{brand}</p>
        <h3 className="text-base font-semibold">{name}</h3>
        <div className="flex items-center gap-2 text-yellow-500 text-sm mt-1">
          <Star size={16} fill="#F0C24D" strokeWidth={1} />
          <span>{averageRating}</span>
          <span className="text-gray-400 ml-1">리뷰({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
