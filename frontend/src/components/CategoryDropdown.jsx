import React from "react";
import "./CategoryDropdown.css";

const CategoryDropdown = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="category-drowdown-container">
      <label htmlFor="category" className="category-label">Filter</label>
      <select id="category" name="category" value={selectedCategory} onChange={(e) => onChange(e.target.value)} className="category-dropdown">
        <option value="">All</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
