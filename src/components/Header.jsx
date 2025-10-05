// src/components/Header.jsx
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Komponen SearchBar dibuat terpisah

function Header({ keyword, onSearchChange }) {
  return (
    <header className="app-header">
      <h1><Link to="/">My Notes</Link></h1>
      <nav>
        <Link to="/">Aktif</Link>
        <Link to="/archives">Arsip</Link>
        <Link to="/notes/new" className="add-btn">+</Link>
      </nav>
      {/* SearchBar akan menggunakan URL Search Parameter (Opsional 2) */}
      <SearchBar keyword={keyword} onSearchChange={onSearchChange} />
    </header>
  );
}

export default Header;

// (SearchBar component removed, should be in its own file)