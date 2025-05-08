class ReviewLikeDTO {
    constructor({ id, user_id, review_id, created_at }) {
      this.id = id;
      this.userId = user_id;
      this.reviewId = review_id;
      this.createdAt = created_at;
    }
  
    static toLikeResponse(likeCount, likedByUser) {
      return {
        likeCount,
        likedByUser
      };
    }
  
    static toToggleResponse(toggled, message) {
      return {
        success: true,
        toggled,
        message
      };
    }
  
    static toError(message) {
      return {
        success: false,
        error: message
      };
    }
  }
  
  module.exports = ReviewLikeDTO;