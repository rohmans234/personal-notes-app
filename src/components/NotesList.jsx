import React from 'react';
import NoteItem from './NoteItem'; // Import komponen item

function NotesList({ notes, onDelete, onArchive }) {
  // Jika tidak ada catatan yang diterima (setelah difilter atau dicari)
  if (notes.length === 0) {
    // Mengembalikan null di sini, karena pesan "Tidak ada catatan"
    // atau "Arsip kosong" sudah ditangani di komponen Halaman (Home.jsx/Archives.jsx)
    return null; 
  }
  
  return (
    // Gunakan class untuk tata letak grid modern (sesuai kriteria UI)
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