// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found-page text-center">
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/" className="btn-primary">Kembali ke Home</Link>
    </section>
  );
}
export default NotFound;