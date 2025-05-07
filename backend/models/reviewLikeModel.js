const pool = require('../config/db');

exports.checkIfLiked = async (userId, reviewId) => {
  const [rows] = await pool.query(
    'SELECT * FROM review_like WHERE user_id = ? AND review_id = ?',
    [userId, reviewId]
  );
  return rows.length > 0;
};

exports.addLike = async (userId, reviewId) => {
  await pool.query(
    'INSERT INTO review_like (user_id, review_id) VALUES (?, ?)',
    [userId, reviewId]
  );
};

exports.removeLike = async (userId, reviewId) => {
  await pool.query(
    'DELETE FROM review_like WHERE user_id = ? AND review_id = ?',
    [userId, reviewId]
  );
};

exports.countLikes = async (reviewId) => {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM review_like WHERE review_id = ?',
    [reviewId]
  );
  return rows[0].count;
};
