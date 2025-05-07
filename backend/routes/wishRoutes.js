const express = require('express');
const router = express.Router();
const WishController = require('../controllers/wishController');

router.get('/:userId', WishController.getUserWishes);
router.post('/', WishController.addWish);
router.delete('/', WishController.deleteWish);

module.exports = router;
