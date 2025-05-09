import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import ReviewList from '../components/ReviewList';

const MyReview = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchMyReviews = async () => {
      if (!user?.id && !user?.userid) {
        console.log("⛔ 로그인된 사용자 정보 없음");
        return;
      }
  
      const userId = user.id || user.userid;
  
      try {
        const response = await axios.get(`http://localhost:3001/api/reviews/user/${userId}`);
        console.log(user);
        console.log("✅ 내 리뷰:", response.data);
        setReviews(response.data);
      } catch (err) {
        console.error("❌ 리뷰 불러오기 실패:", err);
        setError('내 리뷰를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMyReviews();
  }, [user, reloadFlag]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ color: '#4FB7B1' }}>내 리뷰</h2>
      <ReviewList reviews={reviews} userId={user.id || user.userid} />
    </div>
  );
};

export default MyReview;
