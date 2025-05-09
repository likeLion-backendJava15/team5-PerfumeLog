// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm'; // LoginForm 컴포넌트 사용
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        userid: userid,
        password: password
      });
      login({ userid });
      alert(response.data.message);
      navigate('/');
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
