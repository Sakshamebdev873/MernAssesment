import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <ToastContainer position='top-left' /> */}
  </React.StrictMode>,
)
