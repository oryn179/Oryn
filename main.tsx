
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Select the root element defined in index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Target container 'root' not found. Check index.html.");
}

// Create and render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
