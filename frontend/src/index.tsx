import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import axios from 'axios';

// Configuración global de axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'; // URL base del backend

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




