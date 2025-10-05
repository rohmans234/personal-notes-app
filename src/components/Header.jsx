// src/components/Header.jsx
import React from 'react'; // Impor React untuk komponen yang lebih stabil
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx'; // Tambahkan ekstensi .jsx

function Header({ keyword, onSearchChange }) {
  return (
    <header className="app-header">
      <h1><Link to="/">My Notes</Link></h1>
      <nav>
        <Link to="/">Aktif</Link>
        <Link to="/archives">Arsip</Link>
        <Link to="/notes/new" className="add-btn">+</Link>
      </nav>
      <SearchBar keyword={keyword} onSearchChange={onSearchChange} />
    </header>
  );
}

export default Header;