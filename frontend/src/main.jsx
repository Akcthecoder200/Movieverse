import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
)
