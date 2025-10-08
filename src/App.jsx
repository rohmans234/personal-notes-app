// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { getUserLogged, putAccessToken,  } from './utils/network-data';

// Import Pages
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
    return <p>Loading...</p>; // Indikator loading
  }

  if (authedUser === null) {
    return (
      <BrowserRouter>
        <header className="app-header">
          <h1><Link to="/">Aplikasi Catatan</Link></h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
        <header className="app-header">
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
            <nav>
                <Link to="/archives">Arsip</Link>
            </nav>
            <button onClick={onLogout}>Logout ({authedUser.name})</button>
        </header>
        <main className="app-main">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivesPage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;