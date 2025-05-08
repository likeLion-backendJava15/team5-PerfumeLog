class WishDTO {
    constructor({ id, image_url, product_name, brand_name, average_rating, review_count }) {
      this.id = id;
      this.imageUrl = image_url;
      this.productName = product_name;
      this.brandName = brand_name;
      this.averageRating = average_rating;
      this.reviewCount = review_count;
    }
  }
  
  module.exports = WishDTO;
  