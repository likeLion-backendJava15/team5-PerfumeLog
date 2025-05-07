const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewLikeController');

router.post('/:reviewId/like', controller.toggleLike);
router.get('/:reviewId/likes/count', controller.getLikeCount);
router.get('/:reviewId/likes/check', controller.isLikedByUser);

module.exports = router;
