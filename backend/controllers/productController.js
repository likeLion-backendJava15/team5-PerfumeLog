const ProductModel = require('../models/productModel');
const ProductDTO = require('../DTO/productDTO');

const ProductController = {
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      const productDTOs = products.map(product => new ProductDTO(product));
      res.json(productDTOs);
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await ProductModel.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: '제품을 찾을 수 없습니다.' });
      res.json(new ProductDTO(product));
    } catch (error) {
      res.status(500).json({ error: '서버 오류' });
    }
  },

  async search(req, res) {
    try {
      console.log('search 함수 호출됨')
      const keyword = req.query.q;
      if (!keyword) {
        return res.status(400).json({ error: '검색어를 입력하세요.' });
      }
      const results = await ProductModel.searchProducts(keyword);
      console.log('검색어:', keyword);
      console.log('검색 결과:', results);
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    }
  },
};

module.exports = ProductController;