import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import Swal from 'sweetalert2';
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

const SSOInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ssoToken = searchParams.get('sso_token');
  const [isProcessingSSO, setIsProcessingSSO] = useState(Boolean(ssoToken));

  useEffect(() => {
    if (!ssoToken) {
      setIsProcessingSSO(false);
      return;
    }

    const abortController = new AbortController();
    setIsProcessingSSO(true);

    const processSSO = async () => {
      try {
        const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const response = await fetch(`${apiBaseUrl}/api/applicants/sso-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sso_token: ssoToken }),
          signal: abortController.signal,
        });
        const payload = await response.json().catch(() => null);

        if (!response.ok || !payload?.success || !payload?.data) {
          throw new Error(payload?.message || 'SSO authentication failed.');
        }

        const session = {
          id: payload.data.id,
          applicant_number: payload.data.applicant_number,
          email: payload.data.email,
          expiry: Number.isFinite(payload.data.expiry)
            ? payload.data.expiry
            : Date.now() + 3 * 60 * 60 * 1000,
        };

        localStorage.setItem('session_data', JSON.stringify(session));
        navigate('/applicant-dashboard', { replace: true });
      } catch (error) {
        if (abortController.signal.aborted) return;

        console.error('SSO processing error:', error);
        const message = error instanceof Error ? error.message : 'Unable to connect to the SSO service.';
        await Swal.fire('SSO Error', message, 'error');
        navigate('/login', { replace: true });
      } finally {
        if (!abortController.signal.aborted) setIsProcessingSSO(false);
      }
    };

    void processSSO();
    return () => abortController.abort();
  }, [navigate, ssoToken]);

  if (isProcessingSSO) {
    return <div className="min-h-screen flex items-center justify-center">Signing you in from InsightED HQ...</div>;
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
