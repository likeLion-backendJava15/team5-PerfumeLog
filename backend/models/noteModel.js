const db = require('../config/db');

// 전체 노트 목록 조회
exports.getAllNotes = async () => {
  const [rows] = await db.query(`
    SELECT id, name
    FROM note
    ORDER BY name ASC
  `);
  return rows;
};
