import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
root.render(
  <React.StrictMode> 
    <App />  
  </React.StrictMode>
);


// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
