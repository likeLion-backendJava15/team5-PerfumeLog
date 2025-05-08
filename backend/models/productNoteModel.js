const db = require('../config/db');

const productNoteModel = {
  async getNoteByProduct(id) {
    const [rows] = await db.query('SELECT product_note.type, note.name FROM product_note JOIN note ON (note.id = product_note.note_id) JOIN product ON (product.id = product_note.product_id) WHERE product_id = ?;', [id]);
    return rows;
  }
};

module.exports = productNoteModel;