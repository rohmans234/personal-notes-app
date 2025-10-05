// src/components/SearchBar.jsx
import React from 'react';

function SearchBar({ keyword, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Cari judul catatan..."
      value={keyword} // Controlled Component
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchBar;