const model = require('../models/productNoteModel');
const dto = require('../DTO/productNoteDTO');

const ProductNoteController = {
  async get(req, res) {
    try {
      const notes = await model.getNoteByProduct(req.params.id);
      const dtos = notes.map(r => new dto(r));
      res.json(dtos);
    } catch (err) {
      console.error("제품 노트 조회 오류: ", err);
      res.status(500).json({ error: "제품 노트 조회 실패" });
    }
  }
};

module.exports = ProductNoteController;