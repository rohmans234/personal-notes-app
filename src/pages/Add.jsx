// src/pages/Add.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const maxTitleLength = 50;

  const onTitleChangeHandler = (event) => {
    if (event.target.value.length <= maxTitleLength) {
      setTitle(event.target.value); // Controlled Component
    }
  };

  // Kriteria Utama 4: Content Editable untuk Rich Format Body
  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML); // Controlled Component, ambil innerHTML
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({
      id: `notes-${+new Date()}`, // ID unik berdasarkan timestamp
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    });
    navigate('/'); // Kembali ke Home
  };

  return (
    <section className="add-new-page card shadow-lg">
      <form onSubmit={onSubmitHandler}>
        <p className="add-new-page__input__title-limit">
          Sisa karakter: {maxTitleLength - title.length}
        </p>
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Judul Catatan"
          required
          value={title}
          onChange={onTitleChangeHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Isi catatan (gunakan fitur bold/italic browser)..."
          contentEditable
          onInput={onBodyInputHandler}
        />
        <button type="submit" className="btn-primary">Buat Catatan</button>
      </form>
    </section>
  );
}
export default Add;