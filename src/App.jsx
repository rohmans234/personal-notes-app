// src/App.jsx (Corrected)
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeContext } from './contexts/ThemeContext.js';

// Import Pages and Components
import Header from './components/Header'; // Asumsi Header ada di sini
import HomePage from './pages/Home';
import ArchivesPage from './pages/Archives';
import DetailPage from './pages/Detail';
import AddPage from './pages/Add';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { theme } = useContext(ThemeContext); // Ambil tema dari context

  // Atur tema pada body saat komponen pertama kali render atau saat tema berubah
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Cek status login pengguna saat aplikasi pertama dimuat
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchUser();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  if (initializing) {
    return <p className="loading-indicator">Loading...</p>; // Tampilan loading awal
  }

  // Tampilan jika pengguna BELUM login
  if (authedUser === null) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1><Link to="/">Aplikasi Catatan</Link></h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Tampilan jika pengguna SUDAH login
  return (
    <div className="app-container">
      {/* Header sekarang berada di sini, dengan data pengguna */}
      <Header logout={onLogout} name={authedUser.name} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;