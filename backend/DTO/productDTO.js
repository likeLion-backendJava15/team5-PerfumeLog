class ProductDTO {
    constructor({
      id,
      product_name,
      brand_name,
      image_url,
      price,
      family_name,
      average_rating,
      review_count
    }) {
      this.id = id;
      this.name = product_name;
      this.brand = brand_name;
      this.imageUrl = image_url;
      this.price = price;
      this.family = family_name;
      this.averageRating = average_rating;
      this.reviewCount = review_count;
    }
  }
  
  module.exports = ProductDTO;
  
  
  