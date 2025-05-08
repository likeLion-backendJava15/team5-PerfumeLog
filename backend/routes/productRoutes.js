const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

module.exports = router;