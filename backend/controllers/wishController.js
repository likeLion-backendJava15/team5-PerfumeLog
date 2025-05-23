const WishModel = require('../models/wishModel');
const WishDTO = require('../DTO/wishDTO');

const WishController = {
  async getUserWishes(req, res) {
    try {
      const userId = req.params.userId;
      const wishes = await WishModel.getWishesByUserId(userId);
      const wishDTOs = wishes.map(w => new WishDTO(w));
      res.json(wishDTOs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    }
  },

  async addWish(req, res) {
    try {
      const { userId, productId } = req.body;
      const newWish = await WishModel.addWish(userId, productId);
      res.status(201).json(newWish);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },

  async deleteWish(req, res) {
    try {
      const { userId, productId } = req.body;
      await WishModel.removeWish(userId, productId);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    }
  },

  async isLiked(req, res) {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const isLiked = await WishModel.getWishByUserIdAndProductId(userId, productId);
      if(isLiked){
        res.json({isLiked: true});
      } else {
        res.json({isLiked: false});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    }
  }
};

module.exports = WishController;
