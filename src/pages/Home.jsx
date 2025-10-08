// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import NotesList from '../components/NotesList';
import { Link } from 'react-router-dom';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes(); // Refresh
    setNotes(data);
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes(); // Refresh
    setNotes(data);
  };

  if (loading) {
    return <p>Memuat catatan...</p>;
  }

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      <NotesList notes={notes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />
      <div className="homepage__action">
        <Link to="/notes/new" className="action" title="Tambah">+</Link>
      </div>
    </section>
  );
}

export default HomePage;