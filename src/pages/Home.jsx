// src/pages/Home.jsx
import NotesList from '../components/NotesList.jsx';

function Home({ notes, onDelete, onArchive }) {
  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      {notes.length === 0 ? (
        <p className="empty-message">Tidak ada catatan</p> // Kriteria Utama 2 (Conditional Rendering)
      ) : (
        <NotesList notes={notes} onDelete={onDelete} onArchive={onArchive} />
      )}
    </section>
  );
}
export default Home;