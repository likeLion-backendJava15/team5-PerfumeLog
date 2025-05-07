// 노트 정보를 DTO로 변환
const noteToDTO = (note) => ({
    id: note.id,
    name: note.name,
  });
  
  // 제품 정보를 DTO로 변환
  const productToDTO = (product) => ({
    id: product.product_id,
    name: product.name,
    brand: product.brand,
    image_url: product.image_url,
    price: product.price,
  });
  