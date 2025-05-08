// backend/DTO/noteDTO.js

exports.noteToDTO = (note) => {
    return {
      id: note.id,
      name: note.name,
    };
  };
  
  exports.productToDTO = (product) => {
    return {
      id: product.product_id,
      name: product.name,
      brand: product.brand,
      imageUrl: product.image_url,
      price: product.price,
    };
  };
  