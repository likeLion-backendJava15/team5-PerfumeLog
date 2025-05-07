const noteModel = require('../models/noteModel');
const noteDTO = require('../DTO/noteDTO');

// 전체 노트 조회
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.getAllNotes();
    const result = notes.map(noteDTO.noteToDTO);
    res.status(200).json(result);
  } catch (err) {
    console.error('노트 목록 조회 실패:', err);  
    res.status(500).json({ message: '노트 목록 조회 실패' });
  }
};

// 노트 이름과 계층을 기준으로 제품 필터링
exports.getProductsByNote = async (req, res) => {
  const { note, type } = req.query;

  if (!note || !type) {
    return res.status(400).json({ message: 'note와 type 쿼리 파라미터가 필요합니다' });
  }

  try {
    const products = await noteModel.getProductsByNote(note, type);
    const result = products.map(noteDTO.productToDTO);
    res.status(200).json(result);
  } catch (err) {
    console.error('제품 필터링 실패:', err);  // ✅ 여기도 정확한 위치 로그
    res.status(500).json({ message: '제품 필터링 실패' });
  }
};