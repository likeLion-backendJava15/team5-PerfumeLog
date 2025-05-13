import React from "react";

export default function ReviewFilter({ sortOption, setSortOption }) {
  return (
    <div className="d-flex justify-content-end mb-3">
      <select
        className="form-select w-auto"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="recent">최신순</option>
        <option value="oldest">오래된순</option>
        <option value="likes">좋아요순</option>
      </select>
    </div>
  );
}