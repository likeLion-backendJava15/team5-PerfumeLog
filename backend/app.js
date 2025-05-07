const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 테스트용 기본 라우트 http://localhost:3001/
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// 라우터 연결
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/product-notes', require('./routes/productNoteRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/wishes', require('./routes/wishRoutes'));
app.use('/api/review-likes', require('./routes/reviewLikeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});