const db = require('../config/db');

const ProductModel = {
  async getAllProducts() {
    const [rows] = await db.query('SELECT * FROM PRODUCT');
    return rows;
  },

  async getProductById(id) {
    const [rows] = await db.query('SELECT * FROM PRODUCT WHERE id = ?', [id]);
    return rows[0];
  },
};

module.exports = ProductModel;