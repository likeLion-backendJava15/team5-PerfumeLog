// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductList from '../components/ProductList';

// const Homepage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [brand, setBrand] = useState('');
//   const [family, setFamily] = useState('');
//   const [brandList, setBrandList] = useState([]);
//   const [familyList, setFamilyList] = useState([]);

//   // 브랜드, 향 계열 목록 가져오기
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [brandsRes, familiesRes] = await Promise.all([
//           axios.get('http://localhost:3001/api/products/brands'),
//           axios.get('http://localhost:3001/api/products/families')
//         ]);
//         setBrandList(brandsRes.data);
//         setFamilyList(familiesRes.data);
//       } catch (err) {
//         console.error('필터 목록 불러오기 실패:', err);
//       }
//     };
//     fetchFilters();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = 'http://localhost:3001/api/products';
//         const params = new URLSearchParams();
//         if (brand) params.append('brand', brand);
//         if (family) params.append('family', family);
//         if (params.toString()) url += `?${params.toString()}`;

//         const response = await axios.get(url);
//         setProducts(response.data);
//       } catch (err) {
//         console.error('제품 불러오기 실패:', err);
//         setError('제품 목록을 불러오지 못했습니다.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [brand, family]);

//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="px-4 py-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4" style={{ color: '#4FB7B1' }}>브랜드 / 향 계열 필터링</h2>

//       <div className="flex gap-4 mb-6">
//         <select onChange={(e) => setBrand(e.target.value)} defaultValue="" className="border rounded px-2 py-1">
//           <option value="">브랜드 선택</option>
//           {brandList.map((b) => (
//             <option key={b} value={b}>{b}</option>
//           ))}
//         </select>

//         <select onChange={(e) => setFamily(e.target.value)} defaultValue="" className="border rounded px-2 py-1">
//           <option value="">향 계열 선택</option>
//           {familyList.map((f) => (
//             <option key={f} value={f}>{f}</option>
//           ))}
//         </select>
//       </div>

//       <h2 className="text-2xl font-bold mb-6" style={{ color: '#4FB7B1' }}>제품 목록</h2>
//       {products.length > 0 ? (
//         <ProductList
//           products={products.map((product) => ({
//             id: product.id,
//             imageUrl: product.imageUrl,
//             productName: product.name,
//             brandName: product.brand,
//             averageRating: product.averageRating,
//             reviewCount: product.reviewCount,
//           }))}
//         />
//       ) : (
//         <p className="text-gray-500">제품이 없습니다.</p>
//       )}
//     </div>
//   );
// };

// export default Homepage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState('');
  const [family, setFamily] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3001/api/products';

      const query = [];
      if (brand) query.push(`brand=${encodeURIComponent(brand)}`);
      if (family) query.push(`family=${encodeURIComponent(family)}`);

      if (query.length > 0) {
        url = `http://localhost:3001/api/products/filter?${query.join('&')}`;
      }

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('제품 불러오기 실패:', err);
      setError('제품 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [brand, family]);

  const handleFilterChange = (value, type) => {
    if (type === 'brand') {
      setBrand(value);
    } else if (type === 'family') {
      setFamily(value);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#4FB7B1]">브랜드 / 향 계열 필터링</h2>
      <ProductFilter onFilterChange={handleFilterChange} />

      <h2 className="text-2xl font-bold mb-6 text-[#4FB7B1]">제품 목록</h2>
      {products.length > 0 ? (
        <ProductList
          products={products.map((product) => ({
            id: product.id,
            imageUrl: product.imageUrl,
            productName: product.name,
            brandName: product.brand,
            averageRating: product.averageRating,
            reviewCount: product.reviewCount,
          }))}
        />
      ) : (
        <p className="text-gray-500">제품이 없습니다.</p>
      )}
    </div>
  );
};

export default Homepage;