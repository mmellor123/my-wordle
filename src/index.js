import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AlertProvider } from './api/context/AlertContext';
import WordleInit from './components/WordleInit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <WordleInit/>
    </AlertProvider>
  </React.StrictMode>
);
