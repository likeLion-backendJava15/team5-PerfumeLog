import React from 'react';

const ProductFilter = ({ onFilterChange }) => {
  const handleBrandChange = (e) => {
    onFilterChange(e.target.value, 'brand');
  };

  const handleScentChange = (e) => {
    onFilterChange(e.target.value, 'family');
  };

  return (
    <div className="product-filter" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
      <select onChange={handleBrandChange} defaultValue="">
        <option value="">브랜드 선택</option>
        <option value="Antonio Puig">Antonio Puig</option>
        <option value="Anucci">Anucci</option>
        <option value="Armand Basi">Armand Basi</option>
        <option value="Aubusson">Aubusson</option>
        <option value="Avon">Avon</option>
        <option value="Basile">Basile</option>
        <option value="Borsalino">Borsalino</option>
        <option value="Chanel">Chanel</option>
        <option value="Comptoir Sud Pacifique">Comptoir Sud Pacifique</option>
        <option value="Coty">Coty</option>
        <option value="Creed">Creed</option>
        <option value="Dunhill">Dunhill</option>
        <option value="Geo F Trumper">Geo F Trumper</option>
        <option value="Guerlain">Guerlain</option>
        <option value="Hermès">Hermès</option>
        <option value="Hugo Boss">Hugo Boss</option>
        <option value="Jacomo">Jacomo</option>
        <option value="Mikhail Baryshnikov">Mikhail Baryshnikov</option>
        <option value="Miller Harris">Miller Harris</option>
      </select>

      <select onChange={handleScentChange} defaultValue="">
        <option value="">향 계열 선택</option>
        <option value="citrus_smells">citrus_smells</option>
        <option value="flowers">flowers</option>
        <option value="greens_herbs_and_fougeres">greens_herbs_and_fougeres</option>
        <option value="spices">spices</option>
        <option value="woods_and_mosses">woods_and_mosses</option>
      </select>
    </div>
  );
};

export default ProductFilter;