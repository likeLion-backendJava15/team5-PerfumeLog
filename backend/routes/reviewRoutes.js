const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/user/:userId', reviewController.getReviewsByUserId);
router.get('/stats/:productId', reviewController.getReviewStats);
router.get('/all', reviewController.getAllReviewsAsAdmin);
router.get('/:productId', reviewController.getReviews);
router.post('/', reviewController.createReview);
router.delete('/admin/:reviewId', reviewController.adminDeleteReview);
router.delete('/:reviewId/:userId', reviewController.deleteReview);
router.put('/:reviewId/:userId', reviewController.updateReview);

module.exports = router;