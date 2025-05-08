import React, { useState } from "react";

export default function ReviewList({ reviews }) {
    return (
      <div>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r.id} className="mb-3 border-bottom pb-2">
              <strong>{r.rating}점</strong>
              <p>{r.content}</p>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
    );
  }