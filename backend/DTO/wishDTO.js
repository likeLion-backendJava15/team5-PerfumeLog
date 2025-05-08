class WishDTO {
    constructor({ id, user_id, product_id }) {
      this.id = id;
      this.userId = user_id;
      this.productId = product_id;
    }
  }
  
  module.exports = WishDTO;