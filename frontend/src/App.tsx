import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantDashboard from './pages/ApplicantDashboard';
import PublicCareers from './pages/PublicCareers';
import ApplicantJobList from './pages/ApplicantJobList';
import ApplicantJobDetails from './pages/ApplicantJobDetails';
import ApplicationPage from './pages/ApplicationPage';
import HqSsoCallback from './pages/HqSsoCallback';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  useEffect(() => {
    const token = localStorage.getItem('agap_token');
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(async (response) => {
          if (!response.ok) throw new Error('Invalid token');
          const { data } = await response.json();
          localStorage.setItem('agap_user', JSON.stringify({ uid: data.uid, email: data.email, role: data.role }));
          localStorage.setItem('session_data', JSON.stringify({ id: data.uid, uid: data.uid, email: data.email, role: data.role, expiry: Date.now() + 3 * 60 * 60 * 1000 }));
          setStatus('authenticated');
        })
        .catch(() => {
          localStorage.removeItem('agap_token');
          localStorage.removeItem('agap_user');
          localStorage.removeItem('session_data');
          setStatus('unauthenticated');
        });
      return;
    }

    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return setStatus('unauthenticated');
    try {
      const session = JSON.parse(sessionStr);
      setStatus(session.expiry && session.expiry > Date.now() ? 'authenticated' : 'unauthenticated');
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
        <Route path="/auth/hq-callback" element={<HqSsoCallback />} />

        {/* Applicant Facing Routes (No Sidebar for Registration) */}
        <Route path="/applicant-dashboard" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
        <Route path="/applicant-jobs" element={<ProtectedRoute><ApplicantJobList /></ProtectedRoute>} />
        <Route path="/applicant-jobs/:id" element={<ProtectedRoute><ApplicantJobDetails /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
