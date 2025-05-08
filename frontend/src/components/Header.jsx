// src/components/Header.js
import React from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Navbar bg="light" className="px-3 py-2 border-bottom" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="로고" width="30" height="30" className="d-inline-block align-top" />
          <span className="ms-2 text-teal">향기 저장소</span>
        </Navbar.Brand>
        <Form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
          <FormControl
            type="search"
            placeholder="검색어를 입력하세요"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">
            <FaSearch />
          </Button>
        </Form>
        <Button variant="link" className="text-muted">
          <FaBars size={20} />
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
