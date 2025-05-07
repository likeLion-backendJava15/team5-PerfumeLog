const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:productId', reviewController.getReviews);
router.post('/', reviewController.createReview);
router.delete('/:reviewId/:userId', reviewController.deleteReview);
router.get('/stats/:productId', reviewController.getReviewStats);
router.put('/:reviewId/:userId', reviewController.updateReview);

module.exports = router;