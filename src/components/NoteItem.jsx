// src/components/NoteItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils/local-data';

function NoteItem({ id, title, body, createdAt, onDelete, onArchive, archived }) {
  // Hanya menampilkan preview body
  const bodyPreview = body.length > 100 ? body.substring(0, 100) + '...' : body;

  return (
    <div className="note-item card shadow-sm">
      <Link to={`/notes/${id}`} className="note-item__title">
        <h2>{title}</h2>
      </Link>
      <p className="note-item__date">{showFormattedDate(createdAt)}</p>
      {/* Gunakan parser untuk body yang mungkin memiliki format HTML */}
      <div className="note-item__body">{parser(bodyPreview)}</div> 
      <div className="note-item__actions">
        <button onClick={() => onDelete(id)} className="btn-danger">Hapus</button> 
        <button onClick={() => onArchive(id)} className="btn-secondary">
          {archived ? 'Batal Arsip' : 'Arsipkan'}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;