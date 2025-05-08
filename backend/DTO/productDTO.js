class ProductDTO {
    constructor({ id, name, brand_id, family_id, image_url, price, description_url }) {
      this.id = id;
      this.name = name;
      this.brandId = brand_id;
      this.familyId = family_id;
      this.imageUrl = image_url;
      this.price = price;
      this.descriptionUrl = description_url;
    }
  }
  
  module.exports = ProductDTO;