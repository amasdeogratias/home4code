import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import axios from 'axios'


const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://127.0.0.1:8080/api';
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


