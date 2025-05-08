// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setMenuOpen(false); // 메뉴 닫기
  };
  return (
    <div style={{ backgroundColor: '#E8F7F6', padding: '10px 20px', borderBottom: '1px solid #d0e8e6' ,position: 'relative' }}>
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* 왼쪽: 로고*/}
        <div className="d-flex align-items-center">
          <img src="/logo512.png" alt="로고" height="75" />
        </div>

        {/* 가운데: 검색창 */}
        <Form className="d-flex flex-grow-1 mx-4" style={{ maxWidth: '800px'}}>
          <FormControl
            type="search"
            placeholder="향수 이름, 브랜드, 향 계열 등 검색"
            className="me-2"
            aria-label="Search"
            style={{ backgroundColor: 'white', border: 'none', borderRadius: '5px' ,height: '48px'}}
          />
          <Button variant="link" style={{ color: '#8ECFC9',height: '40px' }}>
            <FaSearch size={25} />
          </Button>
        </Form>

        {/* 오른쪽: 햄버거 메뉴 */}
        <Button variant="link" style={{ color: '#8ECFC9' }} onClick={toggleMenu}>
          <FaBars size={30} />
        </Button>
      </Container>
      {menuOpen && (
            <div style={{
              position: 'absolute',
              padding: '10px',
              right: 10,
              top: '100%',
              backgroundColor: 'white',
              border: '3px #E8F7F6 solid',
              borderRadius: '5px',
              zIndex: 1000,
              width: '160px',
            }}>
              <div style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('/myreviews')}>내 리뷰</div>
              <div style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('/wishlist')}>찜 목록</div>
              <div style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleMenuClick('/login')}>로그아웃</div>
            </div>
          )}
    </div>
  );
};

export default Header;
