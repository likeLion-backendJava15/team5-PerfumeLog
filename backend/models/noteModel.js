const db = require('../config/db');

// 전체 노트 목록 조회
const getAllNotes = async () => {
  const [rows] = await db.query(`
    SELECT id, name
    FROM note
    ORDER BY name ASC
  `);
  return rows;
};

// 특정 노트 이름과 계층(type)에 해당하는 제품 목록 조회
const getProductsByNote = async (noteName, noteType) => {
  const [rows] = await db.query(`
    SELECT p.id AS product_id, p.name, b.name AS brand, p.image_url, p.price
    FROM product_note pn
    JOIN note n ON pn.note_id = n.id
    JOIN product p ON pn.product_id = p.id
    JOIN brand b ON p.brand_id = b.id
    WHERE n.name = ? AND pn.type = ?
  `, [noteName, noteType]);
  return rows;
};
