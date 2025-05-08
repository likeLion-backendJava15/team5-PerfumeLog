const UserModel = require('../models/userModel'); 

const UserController = {
  // 회원가입
  async signup(req, res) {
    const { userid, password } = req.body; // 요청 본문에서 userid와 password를 가져옵니다.
    console.log('받은 데이터:', req.body);

    try {
      // 사용자 생성 (암호화나 인증 없이 단순 삽입)
      const user = await UserModel.createUser(userid, password); 
      res.status(201).json({ message: '회원가입 성공', userId: user.id });
      console.log('DB에서 찾은 유저:', user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  // 로그인
  async login(req, res) {
    const { userid, password } = req.body; // 로그인 시 아이디와 비밀번호를 받음.

    try {
      // 로그인 시 사용자 정보 조회
      const user = await UserModel.login(userid, password);
      if (!user) {
        return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }

      // 로그인 성공 시, 기본적인 메시지를 반환
      res.status(200).json({ message: '로그인 성공' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  // 아이디 중복 확인
  async checkUserId(req, res) {
    const { userid } = req.body;

    try {
      const isExist = await UserModel.checkUserIdExist(userid);
      if (isExist) {
        return res.status(400).json({ error: '이미 존재하는 아이디입니다.' });
      }
      res.status(200).json({ message: '사용 가능한 아이디입니다.' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  // 회원 탈퇴
  async deleteUser(req, res) {
    const { userid } = req.body;

    try {
      const result = await UserModel.deleteUser(userid);
      if (result) {
        res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
      } else {
        res.status(400).json({ error: '회원 탈퇴에 실패하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = UserController;
