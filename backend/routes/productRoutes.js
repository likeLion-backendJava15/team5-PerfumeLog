const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
// Express는 위에서부터 순차적으로 라우팅을 평가, 특정한 경로 (/search)는 일반적인 파라미터 경로 (/:id)보다 먼저 나와야 제대로 동작
router.get('/search', ProductController.search);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

module.exports = router;