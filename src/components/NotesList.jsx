// src/components/NotesList.jsx
import React from 'react';
import NoteItem from './NoteItem.jsx'; // Mengimpor NoteItem sebagai default

function NotesList({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return null; 
  }
  
  return (
    <div className="notes-list-grid">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          {...note} 
          onDelete={onDelete} 
          onArchive={onArchive} 
        />
      ))}
    </div>
  );
}

export default NotesList;