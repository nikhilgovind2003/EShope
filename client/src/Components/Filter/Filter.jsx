import React from 'react';
import { useProductContext } from '../../Contexts/ProductContext';
import "./filter.css";

const Filter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    categories
  } = useProductContext();

  const priceOptions = [
    { label: "Below ₹500", value: 500 },
    { label: "Below ₹1,000", value: 1000 },
    { label: "Below ₹5,000", value: 5000 },
    { label: "Below ₹10,000", value: 10000 },
    { label: "No Limit", value: 1000000000 },
  ];

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange(1000000000);
  };

  return (
    <div>
      <aside className="sidebar">
        <h2 className="filter-title">Filters</h2>

        {/* Category Filter */}
        <div className="filter-section">
          <label className="filter-label">Category</label>
          <div className="radio-group">
            {categories.map((cat) => (
              <label key={cat} className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="radio-input"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="filter-section">
          <label className="filter-label">Price Range</label>
          <div className="radio-group">
            {priceOptions.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name="price"
                  value={option.value}
                  checked={parseInt(priceRange) === option.value}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="radio-input"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="filter-section">
          <button className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Filter;
