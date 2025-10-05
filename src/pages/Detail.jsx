// src/pages/Detail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils/local-data';
import NotFound from './NotFound'; // Import 404

function Detail({ notes, onDelete, onArchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find(n => n.id === id);

  if (!note) {
    return <NotFound />; // Jika ID tidak valid (Kriteria Utama 3)
  }

  const handleDelete = () => {
    onDelete(note.id);
    navigate('/'); // Kembali ke Home setelah hapus
  };

  const handleArchive = () => {
    onArchive(note.id);
    navigate(note.archived ? '/archives' : '/'); // Navigasi yang sesuai
  };

  return (
    <section className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__date">{showFormattedDate(note.createdAt)}</p>
      {/* MERENDER HTML FORMATTED BODY */}
      <div className="detail-page__body">{parser(note.body)}</div> 
      <div className="detail-page__action">
        <button onClick={handleDelete} className="btn-danger">Hapus</button> {/* Kriteria Utama 5 */}
        <button onClick={handleArchive} className="btn-primary">
          {note.archived ? 'Batal Arsip' : 'Arsipkan'}
        </button>
      </div>
    </section>
  );
}
export default Detail;