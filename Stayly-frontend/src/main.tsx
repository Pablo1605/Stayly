import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryProvider } from './providers/QueryProvider';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './auth/authContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
