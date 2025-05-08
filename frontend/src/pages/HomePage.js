import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList'; // 같은 방식으로 재사용

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('전체 제품 불러오기 실패:', err);
        setError('제품 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#4FB7B1' }}>전체 제품 목록</h2>
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

// import React, { useEffect, useState } from 'react';
// import ProductFilter from '../components/ProductFilter';
// import ProductCard from '../components/ProductCard';
// import axios from 'axios';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [note, setNote] = useState('');
//   const [type, setType] = useState('');

//   const fetchProducts = async () => {
//     try {
//       let url = 'http://localhost:3001/api/products';
//       if (note && type) {
//         url = `http://localhost:3001/api/notes/filter?note=${note}&type=${type}`;
//       }
//       const res = await axios.get(url);
//       setProducts(res.data);
//     } catch (err) {
//       console.error('제품 가져오기 실패:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [note, type]);

//   return (
//     <div>
//       <ProductFilter
//         onFilterChange={(selectedNote, selectedType) => {
//           setNote(selectedNote);
//           setType(selectedType);
//         }}
//       />
//       <div className="product-list">
//         {products.map(product => (
//           <ProductCard key={product.product_id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;