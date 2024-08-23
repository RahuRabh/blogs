import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customToast.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
  <BlogProvider>
    <App />
    <ToastContainer
           position="top-center"
          autoClose={2000}
          closeOnClick
          pauseOnHover
          hideProgressBar={false}
          closeButton={false}
          toastClassName="custom-toast"
        />
  </BlogProvider>
  </AuthProvider>  
  </React.StrictMode>
);