// components/SignupForm.jsx
import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const SignUpForm = ({ 
  onSignup, 
  onCheckId, 
  onGoToLogin, 
  userId, 
  setUserId, 
  password, 
  setPassword, 
  passwordConfirm, 
  setPasswordConfirm,
  error,
  successMessage
}) => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-4">회원가입</h3>
        <Form className="p-4 border rounded shadow-sm bg-white">
          <Form.Group className="mb-4">
            <Row>
              <Col xs={8}>
                <Form.Control 
                  type="text" 
                  placeholder="아이디"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Col>
              <Col xs={4}>
                <Button
                  className="w-100"
                  style={{ backgroundColor: "#4FB7B1", borderColor: "#4FB7B1" }}
                  onClick={(e) => {
                    e.preventDefault(); 
                    onCheckId();
                  }}
                >
                  중복확인
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control 
              type="password" 
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control 
              type="password" 
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <div className="d-grid mb-4">
            <Button
              style={{ backgroundColor: "#4FB7B1", borderColor: "#4FB7B1" }}
              className="py-2"
              onClick={(e) => {
                e.preventDefault();
                onSignup();
              }}
            >
              회원가입
            </Button>
          </div>

          <div className="text-center pt-3">
            <span className="text-sm me-2">이미 계정이 있으신가요?</span>
            <Button
              variant="link"
              className="text-sm p-0"
              style={{ color: "#4FB7B1", fontSize: "0.9rem" }}
              onClick={onGoToLogin}
            >
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};


export default SignUpForm;
