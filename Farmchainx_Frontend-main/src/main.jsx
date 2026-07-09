import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from "./context/Cart.jsx";

window.API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080'
  : 'https://farmchainx-joq1.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <CartProvider>
      <App />
  </CartProvider>
  </React.StrictMode>
);