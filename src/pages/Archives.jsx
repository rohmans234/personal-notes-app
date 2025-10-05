// src/pages/Archives.jsx
import NotesList from '../components/NotesList';

function Archives({ notes, onDelete, onArchive }) {
  // notes di sini sudah terfilter di App.jsx untuk archived: true
  return (
    <section className="archives-page">
      <h2>Catatan Terarsip</h2>
      {notes.length === 0 ? (
        <p className="empty-message">Arsip kosong</p> 
      ) : (
        <NotesList notes={notes} onDelete={onDelete} onArchive={onArchive} />
      )};
    </section>
  );
}
export default Archives;