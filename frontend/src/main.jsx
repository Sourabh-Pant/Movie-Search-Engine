import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { MovieProvider } from './contexts/MovieContext' // ✅ add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider> {/* ✅ wrap your app with movie context */}
          <App />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
