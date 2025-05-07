const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// 전체 노트 조회
router.get('/', noteController.getAllNotes);

// 노트 이름과 계층을 기준으로 제품 필터링
router.get('/filter', noteController.getProductsByNote);

module.exports = router;
