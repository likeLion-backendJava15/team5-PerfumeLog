const db = require("../config/db");

// 리뷰 조회
exports.getAllReviewsByProductid = async (product_id, sort = "recent") => {
  let selectClause = "r.*, u.userid";
  let orderClause = "";
  let joinClause = `
    JOIN USER u ON r.user_id = u.id
  `;
  let groupClause = "";

  if (sort === "likes") {
    selectClause += ", COUNT(rl.id) AS like_count";
    joinClause += " LEFT JOIN REVIEW_LIKE rl ON r.id = rl.review_id";
    groupClause = "GROUP BY r.id";
    orderClause = "ORDER BY like_count DESC, r.created_at DESC";
  } else if (sort === "oldest") {
    orderClause = "ORDER BY r.created_at ASC";
  } else {
    orderClause = "ORDER BY r.created_at DESC";
  }

  const query = `
    SELECT ${selectClause}
    FROM REVIEW r
    ${joinClause}
    WHERE r.product_id = ?
    ${groupClause}
    ${orderClause}
  `;

  return db.query(query, [product_id]);
};

// 리뷰 생성
exports.createReview = async (review) => {
  const { user_id, product_id, rating, longevity, sillage, gender, content } =
    review;
  console.log("모델로 전달된 데이터:", review);

  try {
    const [result] = await db.query(
      `
            INSERT INTO REVIEW (user_id, product_id, rating, longevity, sillage, gender, content, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
          `,
      [user_id, product_id, rating, longevity, sillage, gender, content]
    );
    console.log("✅ 삽입 성공:", result);
    return result;
  } catch (err) {
    console.error("DB 리뷰 삽입 오류:", err);
    throw err;
  }
};

// 리뷰 삭제
exports.deleteReview = async (reviewId, userId) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 리뷰 좋아요 먼저 삭제
    await conn.query(`DELETE FROM REVIEW_LIKE WHERE review_id = ?`, [reviewId]);

    // 리뷰 삭제
    await conn.query(`DELETE FROM REVIEW WHERE id = ? AND user_id = ?`, [
      reviewId,
      userId,
    ]);

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// 리뷰 통계
exports.getReviewStatsByProductId = async (productId) => {
  const [rows] = await db.query(
    `
        SELECT
          ROUND(AVG(rating), 2) AS avg_rating,
          COUNT(*) AS total_reviews,
          ROUND(AVG(CASE longevity
            WHEN '매우약함' THEN 1 
            WHEN '약함' THEN 2 
            WHEN '중간' THEN 3
            WHEN '강함' THEN 4 
            WHEN '아주강함' THEN 5 
            ELSE NULL END), 1) AS avg_longevity,
          ROUND(AVG(CASE sillage
            WHEN '매우약함' THEN 1 
            WHEN '약함' THEN 2 
            WHEN '중간' THEN 3
            WHEN '강함' THEN 4 
            WHEN '아주강함' THEN 5 
            ELSE NULL END), 1) AS avg_sillage,
          (SELECT
          CASE
            WHEN
              SUM(gender = '여성적') = SUM(gender = '남성적')
            THEN '중성적'
            ELSE (
              SELECT gender
              FROM REVIEW
              WHERE product_id = ?
              GROUP BY gender
              ORDER BY COUNT(*) DESC
              LIMIT 1
            )
          END
        FROM REVIEW
        WHERE product_id = ?
      ) AS majority_gender
    FROM REVIEW
    WHERE product_id = ?
    `,
    [productId, productId, productId]
  );

  const [distributionRows] = await db.query(
    `
      SELECT rating, COUNT(*) AS count
      FROM REVIEW
      WHERE product_id = ?
      GROUP BY rating
    `,
    [productId]
  );

  return {
    ...rows[0],
    distribution: distributionRows,
  };
};

// 리뷰 수정
exports.updateReview = async (data) => {
  const { review_id, user_id, rating, longevity, sillage, gender, content } =
    data;

  const [result] = await db.query(
    `
      UPDATE REVIEW
      SET
        rating = ?,
        longevity = ?,
        sillage = ?,
        gender = ?,
        content = ?
      WHERE id = ? AND user_id = ?
    `,
    [rating, longevity, sillage, gender, content, review_id, user_id]
  );

  return result;
};

// 내리뷰
exports.getReviewsByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT r.*, u.userid, p.name AS product_name, b.name AS brand_name
     FROM REVIEW r
     JOIN USER u ON r.user_id = u.id
     JOIN PRODUCT p ON r.product_id = p.id
     JOIN BRAND b ON p.brand_id = b.id
     WHERE r.user_id = ?
     ORDER BY r.created_at DESC`,
    [userId]
  );
  return rows;
};

exports.getAllReviewsWithUser = async () => {
  const [rows] = await db.query(`
    SELECT r.*, u.userid, p.name AS product_name, b.name AS brand_name
    FROM REVIEW r
    LEFT JOIN USER u ON r.user_id = u.id
    LEFT JOIN PRODUCT p ON r.product_id = p.id
    LEFT JOIN BRAND b ON p.brand_id = b.id
    ORDER BY r.created_at DESC
  `);
  return rows; 
};

exports.adminDeleteReview = async (reviewId) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(`DELETE FROM REVIEW_LIKE WHERE review_id = ?`, [reviewId]);
    await conn.query(`DELETE FROM REVIEW WHERE id = ?`, [reviewId]);
    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
