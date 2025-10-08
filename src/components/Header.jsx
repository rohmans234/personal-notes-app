// src/components/Header.jsx

import React, { useEffect, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import { ThemeContext } from '../contexts/ThemeContext'; 
function Header({ keyword, onSearchChange }) {
  const { theme, toggleTheme } = useContext(ThemeContext); 
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className="app-header">
      <h1><Link to="/">My Notes</Link></h1>
      <nav>
        <Link to="/">Aktif</Link>
        <Link to="/archives">Arsip</Link>
        <Link to="/notes/new" className="add-btn">+</Link>
     
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      <SearchBar keyword={keyword} onSearchChange={onSearchChange} />
    </header>
  );
}

export default Header;