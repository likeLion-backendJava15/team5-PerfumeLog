const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken'); // 로그인하면 보내주는 '비밀열쇠' 만드는 도구
const UserDTO = require('../DTO/userDTO'); // 응답(결과)을 포장해주는 도구

exports.register = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
  
    if (!username || !password) {
      return res.status(400).json(UserDTO.error('아이디와 비밀번호는 필수입니다.'));
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json(UserDTO.error('비밀번호가 일치하지 않습니다.'));
    }
  
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      return res.status(409).json(UserDTO.error('이미 존재하는 아이디입니다.'));
    }
  
    const newUser = await UserModel.createUser(username, password);
    res.status(201).json(UserDTO.success('회원가입 성공'));
  };

  exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findByUsername(username);
  
    if (!user) {
      return res.status(401).json(UserDTO.error('아이디 또는 비밀번호가 틀렸습니다.'));
    }
  
    const valid = await UserModel.validatePassword(password, user.password);
    if (!valid) {
      return res.status(401).json(UserDTO.error('아이디 또는 비밀번호가 틀렸습니다.'));
    }
  
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  
    res.json(UserDTO.success('로그인 성공', token));
  };

  exports.logout = (req, res) => {
    res.json(UserDTO.success('로그아웃 성공'));
  };

  