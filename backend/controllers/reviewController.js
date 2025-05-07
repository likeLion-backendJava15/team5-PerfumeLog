const reviewModel = require('../models/reviewModel'); // dao
const { toReviewDTO, toStatsDTO } = require('../DTO/reviewDTO');  //dto

exports.getReviews = async (req, res) => {
    try {
        const [reviews] = await reviewModel.getAllReviewsByProductid(req.params.productId);
        const dto = reviews.map(toReviewDTO);
        console.log('조회 결과:', dto);
        res.json(dto);
      } catch (err) {
        res.status(500).json({ error: '리뷰 조회 실패' });
      }
};