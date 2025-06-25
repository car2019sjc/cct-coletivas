import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercepta erros de removeChild globalmente
const originalRemoveChild = Node.prototype.removeChild;
Node.prototype.removeChild = function<T extends Node>(child: T): T {
  try {
    if (this.contains(child)) {
      return originalRemoveChild.call(this, child) as T;
    } else {
      console.warn('Tentativa de remover nó que não é filho, ignorando...');
      return child;
    }
  } catch (error) {
    console.warn('Erro capturado no removeChild:', error);
    return child;
  }
};

// Captura erros globais
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes('removeChild')) {
    console.warn('Erro de removeChild capturado globalmente, prevenindo crash');
    event.preventDefault();
    return false;
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
