const ReviewLikeDTO = require('../DTO/reviewLikeDTO'); 
const reviewLikeModel = require('../models/reviewLikeModel');

exports.toggleLike = async (req, res) => {
  const { reviewId } = req.params;
  const { user_id } = req.body;

  try {
    const isLiked = await reviewLikeModel.checkIfLiked(user_id, reviewId);

    if (isLiked) {
      await reviewLikeModel.removeLike(user_id, reviewId);
      res.json(ReviewLikeDTO.toToggleResponse(false, '좋아요 취소됨'));  
    } else {
      await reviewLikeModel.addLike(user_id, reviewId);
      res.json(ReviewLikeDTO.toToggleResponse(true, '좋아요 등록됨'));  
    }
  } catch (err) {
    res.status(500).json(ReviewLikeDTO.toError(err.message)); 
  }
};

exports.getLikeCount = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const count = await reviewLikeModel.countLikes(reviewId);
    res.json(ReviewLikeDTO.toLikeResponse(count, null));
  } catch (err) {
    res.status(500).json(ReviewLikeDTO.toError(err.message));
  }
};

exports.isLikedByUser = async (req, res) => {
  const { reviewId } = req.params;
  const { user_id } = req.query;

  try {
    const isLiked = await reviewLikeModel.checkIfLiked(user_id, reviewId);
    res.json(ReviewLikeDTO.toLikeResponse(null, isLiked));
  } catch (err) {
    res.status(500).json(ReviewLikeDTO.toError(err.message));
  }
};
