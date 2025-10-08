// src/pages/DetailPage.jsx (FIXED)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/local-data';
import NotFound from './NotFound';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id);
    navigate('/'); // Kembali ke Home setelah hapus
  };

  const handleArchive = async () => {
    await archiveNote(id);
    navigate('/'); // Kembali ke Home setelah arsip
  };

  const handleUnarchive = async () => {
    await unarchiveNote(id);
    navigate('/archives'); // Kembali ke halaman arsip
  };

  if (loading) {
    return <p>Memuat catatan...</p>;
  }

  if (!note) {
    return <NotFound />;
  }

  return (
    <section className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__date">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        <button onClick={handleDelete} className="btn-danger">Hapus</button>
        {note.archived ? (
          <button onClick={handleUnarchive} className="btn-primary">
            Batal Arsip
          </button>
        ) : (
          <button onClick={handleArchive} className="btn-primary">
            Arsipkan
          </button>
        )}
      </div>
    </section>
  );
}

export default DetailPage;