import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ReviewForm from '../components/ReviewForm';

const reviewList = () => {
    return 
    <div>
        <h3>리뷰 작성</h3>
        <ReviewForm/>
    </div>
};

export default reviewList;