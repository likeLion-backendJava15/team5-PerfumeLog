// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 공통 컴포넌트
import Header from "./components/Header";

// 페이지 단위 컴포넌트
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ReviewPage from "./pages/ReviewPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import MyReview from "./pages/MyReview";
import WishList from "./pages/WishList";
import SearchResult from "./pages/SearchResult";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
      <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        {/* 로그인과 회원가입 페이지가 아닌 경우에만 헤더를 렌더링 */}
        {window.location.pathname !== "/login" && 
        window.location.pathname !== "/signup" && <Header />}
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route
                path="/reviews/create/:productId"
                element={<ReviewPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/myreviews" element={<MyReview />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/search" element={<SearchResult />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
