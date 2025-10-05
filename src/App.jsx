// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { 
  getAllNotes, 
  addNote, 
  deleteNote, 
  archiveNote, 
  unarchiveNote 
} from './utils/local-data';

// Import pages dan components
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Add from './pages/Add.jsx';
import Archives from './pages/Archives.jsx';
import NotFound from './pages/NotFound.jsx';

function AppContent() {
  // Ambil data awal HANYA sekali saat komponen pertama kali dirender
  const [notes, setNotes] = useState(getAllNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const onAddNoteHandler = (newNote) => {
    addNote(newNote); // Panggil fungsi dari local-data.js
    setNotes(getAllNotes()); // Perbarui state dengan data terbaru
  };

  const onDeleteHandler = (id) => {
    deleteNote(id); // Panggil fungsi dari local-data.js
    setNotes(getAllNotes()); // Perbarui state dengan data terbaru
  };

  const onArchiveHandler = (id) => {
    const note = notes.find(n => n.id === id);
    if (note.archived) {
      unarchiveNote(id); // Panggil fungsi dari local-data.js
    } else {
      archiveNote(id); // Panggil fungsi dari local-data.js
    }
    setNotes(getAllNotes()); // Perbarui state dengan data terbaru
  };

  const onSearchChangeHandler = (newKeyword) => {
    setSearchParams({ keyword: newKeyword });
  };

  // Filter Catatan berdasarkan keyword
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <Header keyword={keyword} onSearchChange={onSearchChangeHandler} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home notes={filteredNotes.filter(n => !n.archived)} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
          <Route path="/archives" element={<Archives notes={filteredNotes.filter(n => n.archived)} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
          <Route path="/notes/new" element={<Add addNote={onAddNoteHandler} />} />
          <Route path="/notes/:id" element={<Detail notes={notes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />} />
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