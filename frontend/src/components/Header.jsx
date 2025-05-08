// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaBars } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setMenuOpen(false); // 메뉴 닫기
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchKeyword.trim())}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#E8F7F6",
        padding: "10px 20px",
        borderBottom: "1px solid #d0e8e6",
        position: "relative",
      }}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-between"
      >
        {/* 왼쪽: 로고*/}
        <div className="d-flex align-items-center" style={{cursor: 'pointer',transition: 'transform 0.2s',}}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}>
          <img src="/logo512.png" alt="로고" height="75" />
        </div>

        {/* 가운데: 검색창 */}
        <Form className="d-flex flex-grow-1 mx-4" style={{ maxWidth: "800px" }}>
          <FormControl
            type="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="향수 이름, 브랜드, 향 계열 등 검색"
            className="me-2"
            aria-label="Search"
            style={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              height: "48px",
            }}
          />
          {/* 검색버튼 */}
          <Button variant="link" style={{ color: '#8ECFC9',height: '40px' }} onClick={handleSearch}>
            <FaSearch size={25} />
          </Button>
        </Form>

        {/* 오른쪽: 햄버거 메뉴 */}
        <Button
          variant="link"
          style={{ color: "#8ECFC9" }}
          onClick={toggleMenu}
        >
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
              <div style={{cursor: 'pointer',transition: 'transform 0.2s',padding: '10px', borderBottom: '2px solid #E8F7F6'}}
                onClick={() => navigate('reviews')}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}>내 리뷰</div>

                <div style={{cursor: 'pointer',transition: 'transform 0.2s',padding: '10px', borderBottom: '2px solid #E8F7F6', margin: '5px 0px 5px 0px'}}
                onClick={() => navigate('wishlist')}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}>찜 목록</div>

                <div style={{cursor: 'pointer',transition: 'transform 0.2s',padding: '10px' }}
                onClick={() => navigate('login')}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}>로그아웃</div>
            </div>
          )}
    </div>
  );
};

export default Header;
