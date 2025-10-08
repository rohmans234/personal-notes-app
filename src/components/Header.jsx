// src/components/Header.jsx (Corrected)
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext.js'; // Impor dari file baru


function Header({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <h1><Link to="/">Aplikasi Catatan</Link></h1>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/archives">Arsip</Link>
      </nav>
      <div>
        <button onClick={toggleTheme} className="button-theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button onClick={logout} className="button-logout">
          Logout ({name})
        </button>
      </div>
    </header>
  );
}

export default Header;