import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Wordle from './components/Wordle';
import { AlertProvider } from './api/context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <Wordle correctWord="navel" attempts={6}/>
    </AlertProvider>
  </React.StrictMode>
);
