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

import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const SSOInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessingSSO, setIsProcessingSSO] = useState(false);

  useEffect(() => {
    const ssoToken = searchParams.get('sso_token');
    if (ssoToken) {
      setIsProcessingSSO(true);
      
      const processSSO = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/sso-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sso_token: ssoToken })
          });

          if (response.ok) {
            const resData = await response.json();
            const now = new Date();
            const item = {
              id: resData.data.id,
              applicant_number: resData.data.applicant_number,
              email: resData.data.email,
              expiry: now.getTime() + 3 * 60 * 60 * 1000,
            };
            localStorage.setItem('session_data', JSON.stringify(item));
            
            // Remove the token from the URL and redirect to dashboard
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('sso_token');
            const newSearch = newSearchParams.toString();
            const newPath = location.pathname + (newSearch ? `?${newSearch}` : '');
            
            // Force replace the URL without token, then go to dashboard
            window.history.replaceState(null, '', newPath);
            navigate('/applicant-dashboard', { replace: true });
          } else {
            const errData = await response.json();
            Swal.fire('SSO Error', errData.message || 'SSO authentication failed.', 'error');
          }
        } catch (error) {
          console.error("SSO Processing Error:", error);
          Swal.fire('Error', 'Unable to connect to the SSO service.', 'error');
        } finally {
          setIsProcessingSSO(false);
        }
      };

      processSSO();
    }
  }, [searchParams, navigate, location.pathname]);

  if (isProcessingSSO) {
    return <div className="min-h-screen flex items-center justify-center">Authenticating via SSO...</div>;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SSOInterceptor>
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
      </SSOInterceptor>
    </BrowserRouter>
  );
}

export default App;
