const express = require('express');
const router = express.Router();
const WishController = require('../controllers/wishController');

// GET /api/wish/:userId
router.get('/:userId', WishController.getUserWishes);

// POST /api/wish
router.post('/', WishController.addWish);

// DELETE /api/wish
router.delete('/', WishController.deleteWish);

router.get('/:userId/:productId', WishController.isLiked);

module.exports = router;
