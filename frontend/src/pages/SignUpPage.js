// src/pages/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from '../components/SignUpForm'; // SignUpForm 컴포넌트 사용
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/signup', {
        userid: userId,
        password: password
      });
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      setError('');
      setUserId('');
      setPassword('');
      setPasswordConfirm('');
    } catch (err) {
      setError('회원가입 실패. 다시 시도해주세요.');
    }
  };

  const handleCheckId = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/check-id', {
        userid: userId
      });
      alert(response.data.message);
    } catch (err) {
      setError('아이디 중복 확인 실패.');
    }
  };

  const handleGoToLogin = () => {
    // 로그인 페이지로 이동
    window.location.href = '/login';
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUpForm 
        onSignup={handleSignup}
        onCheckId={handleCheckId}
        onGoToLogin={handleGoToLogin}
        userId={userId}
        password={password}
        passwordConfirm={passwordConfirm}
        setUserId={setUserId}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SignupPage;
