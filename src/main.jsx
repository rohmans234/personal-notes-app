// src/main.jsx (Corrected)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext'; // <-- IMPORT ThemeProvider
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* <-- Router membungkus semuanya */}
      <ThemeProvider> {/* <-- Provider membungkus semuanya */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);