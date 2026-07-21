import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const DEV_TOKEN = import.meta.env.VITE_DEV_SSO_TOKEN;

if (import.meta.env.MODE === 'development' && !localStorage.getItem('token') && DEV_TOKEN) {
  console.log('✅ Injecting Development SSO Token');
  localStorage.setItem('token', DEV_TOKEN);
  localStorage.setItem('session_data', JSON.stringify({
    id: 1,
    email: "wilfredo.cabral@deped.gov.ph",
    role: "Applicant",
    expiry: Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days from now
  }));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
