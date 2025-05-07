const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:productId', reviewController.getReviews);
router.post('/', reviewController.createReview);

module.exports = router;