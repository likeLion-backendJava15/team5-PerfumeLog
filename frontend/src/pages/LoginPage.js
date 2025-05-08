// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm'; // LoginForm 컴포넌트 사용

const LoginPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        userid: userid,
        password: password
      });
      alert(response.data.message);
      // 로그인 성공 후 추가 작업 (예: 홈 페이지로 리디렉션 등)
    } catch (err) {
      setError('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  const handleGoToSignup = () => {
    // 회원가입 페이지로 이동
    window.location.href = '/signup';
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm 
        onLogin={handleLogin}
        onGoToSignup={handleGoToSignup}
        userId={userid}
        password={password}
        setUserId={setUserId}
        setPassword={setPassword}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
