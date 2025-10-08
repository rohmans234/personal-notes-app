// src/pages/ArchivesPage.jsx (FIXED)
import React, { useState, useEffect } from 'react';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import NotesList from '../components/NotesList';

function ArchivesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArchivedNotes() {
      const { data } = await getArchivedNotes();
      setNotes(data);
      setLoading(false);
    }
    fetchArchivedNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    // Refresh catatan setelah menghapus
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    // Refresh catatan setelah membatalkan arsip
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  if (loading) {
    return <p>Memuat arsip...</p>;
  }

  return (
    <section className="archives-page">
      <h2>Catatan Terarsip</h2>
      {notes.length === 0 ? (
        <p className="empty-message">Arsip kosong</p>
      ) : (
        <NotesList notes={notes} onDelete={onDeleteHandler} onArchive={onUnarchiveHandler} />
      )}
    </section>
  );
}

export default ArchivesPage;