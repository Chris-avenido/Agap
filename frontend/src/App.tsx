import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantDashboard from './pages/ApplicantDashboard';
import PublicCareers from './pages/PublicCareers';
import ApplicantJobList from './pages/ApplicantJobList';
import ApplicantJobDetails from './pages/ApplicantJobDetails';
import ApplicationPage from './pages/ApplicationPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      setStatus('unauthenticated');
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      if (session.expiry && session.expiry > Date.now()) {
        setStatus('authenticated');
      } else {
        localStorage.removeItem('session_data');
        setStatus('unauthenticated');
      }
    } catch {
      localStorage.removeItem('session_data');
      setStatus('unauthenticated');
    }
  }, []);

  if (status === 'checking') return <div className="min-h-screen grid place-items-center">Loading…</div>;
  return status === 'authenticated' ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PublicCareers />} />
        <Route path="/apply" element={<ApplicationPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/applicant-login" element={<Login />} />

        {/* Applicant Facing Routes (No Sidebar for Registration) */}
        <Route path="/applicant-dashboard" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
        <Route path="/applicant-jobs" element={<ProtectedRoute><ApplicantJobList /></ProtectedRoute>} />
        <Route path="/applicant-jobs/:id" element={<ProtectedRoute><ApplicantJobDetails /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
