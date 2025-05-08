// components/LoginForm.jsx
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const LoginForm = ({ onLogin, onGoToSignup }) => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">로그인</h3>
        <Form className="p-4 border rounded shadow-sm bg-white">
          <Form.Group className="mb-4">
            <Form.Control type="text" placeholder="아이디" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control type="password" placeholder="비밀번호" />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button
              style={{ backgroundColor: '#4FB7B1', borderColor: '#4FB7B1' }}
              className="py-2"
              onClick={onLogin}
            >
              로그인
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm p-0"
              style={{ color: '#4FB7B1', fontSize: '0.9rem' }}
              onClick={onGoToSignup}
            >
              회원가입
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
