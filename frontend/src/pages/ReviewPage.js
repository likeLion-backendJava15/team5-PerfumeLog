import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Header from "../components/Header";

export default function ReviewPage() {

  return (
    <div className="p-6">
        <ProductDetail/>
    </div>
  );
}
