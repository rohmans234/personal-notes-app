// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { getInitialData } from './utils/local-data';
// Import pages dan components
import Header from './components/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Add from './pages/Add';
import Archives from './pages/Archives';
import NotFound from './pages/NotFound';

function AppContent() {
  const [notes, setNotes] = useState(getInitialData()); // State data
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || ''; // Opsional 2: Search Parameter

  // --- Fungsi Manipulasi Catatan (Penting!) ---
  const onAddNoteHandler = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Tambahkan di awal
  };

  const onDeleteHandler = (id) => { // Kriteria Utama 5
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  const onArchiveHandler = (id) => { // Kriteria Opsional 1
    setNotes((prevNotes) => prevNotes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  const onSearchChangeHandler = (newKeyword) => { // Opsional 2
    setSearchParams({ keyword: newKeyword });
  };
  // ---------------------------------------------

  // Filter Catatan berdasarkan keyword (Opsional 2)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <Header keyword={keyword} onSearchChange={onSearchChangeHandler} />
      <main className="app-main">
        <Routes>
          {/* Kriteria Utama 1 & 2 */}
          <Route path="/" element={<Home notes={filteredNotes.filter(n => !n.archived)} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
          {/* Kriteria Opsional 1 */}
          <Route path="/archives" element={<Archives notes={filteredNotes.filter(n => n.archived)} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
          {/* Kriteria Utama 4 */}
          <Route path="/notes/new" element={<Add addNote={onAddNoteHandler} />} />
          {/* Kriteria Utama 3 */}
          <Route path="/notes/:id" element={<Detail notes={notes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
          {/* Kriteria Opsional 3: 404 Pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

// Komponen Pembungkus untuk Routing
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;