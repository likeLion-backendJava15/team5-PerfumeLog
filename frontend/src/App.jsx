// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";

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

function App() {
  return (
    <AuthProvider>
      <AuthProvider>
  <Router>
        <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
          <Header />
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
              <Route path="/myreviews" element={<MyReviewWithUser />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/search" element={<SearchResult />} />
            </Routes>
          </div>
        </div>
      </Router>
</AuthProvider>
    </AuthProvider>
  );
}

export default App;



const MyReviewWithUser = () => {
  const { user } = useContext(AuthContext);
  return <MyReview userId={user?.id} />;
};