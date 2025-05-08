const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// 회원가입
router.post('/signup', UserController.signup);

// 로그인
router.post('/login', UserController.login);

// 아이디 중복 확인
router.post('/check-id', UserController.checkUserId);


module.exports = router;
