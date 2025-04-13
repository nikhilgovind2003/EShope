import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './Contexts/ProductContext.jsx'; // Adjust path as needed
import React from 'react';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
  </BrowserRouter>
);
