// src/pages/AddPage.jsx (FIXED)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import useInput from '../hooks/useInput';

function AddPage() {
  const navigate = useNavigate();
  const [title, onTitleChange] = useInput('');
  const [body, setBody] = useInput(''); // Gunakan useInput juga untuk body

  // Fungsi untuk menangani input dari contentEditable
  const onBodyInput = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/'); // Kembali ke halaman utama setelah berhasil
    }
  };

  return (
    <section className="add-new-page">
      <form onSubmit={onSubmitHandler}>
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Judul Catatan"
          required
          value={title}
          onChange={onTitleChange}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Isi catatan..."
          contentEditable
          onInput={onBodyInput}
        />
        <button type="submit" className="btn-primary">Buat Catatan</button>
      </form>
    </section>
  );
}

export default AddPage;