const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// 전체 노트 조회
router.get('/', noteController.getAllNotes);

// note와 type으로 제품 필터링
router.get('/filter', noteController.getProductsByNote);

module.exports = router;
