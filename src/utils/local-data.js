// src/utils/local-data.js
const getInitialData = () => ([
  // ... data awal Anda di sini, contoh:
  {
    id: 'notes-1',
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
  // ... catatan lainnya
]);

// Fungsi bantuan untuk format tanggal (Opsional, untuk UI yang lebih baik)
const showFormattedDate = (date) => {
  // ... implementasi format tanggal
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export { getInitialData, showFormattedDate };