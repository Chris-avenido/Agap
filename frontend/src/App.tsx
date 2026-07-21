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

    try {
      // 1. Decode the JWT payload containing the user object
      const base64Url = ssoToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      // 2. Set the expected localStorage keys for the AGAP session
      const session = {
        id: decodedPayload.uid || decodedPayload.id || 1, // Safely extract user ID
        applicant_number: decodedPayload.applicant_number || `ID-${decodedPayload.uid || 1}`,
        email: decodedPayload.email || decodedPayload.sub,
        expiry: decodedPayload.exp ? decodedPayload.exp * 1000 : Date.now() + 3 * 60 * 60 * 1000,
      };

      localStorage.setItem('session_data', JSON.stringify(session));

      // 3. Clean the sso_token query parameter from the URL address bar
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // 4. Redirect the user to the logged-in home page
      navigate('/applicant-dashboard', { replace: true });
    } catch (error) {
      console.error('SSO login parsing failed:', error);
      Swal.fire('SSO Error', 'Unable to process HQ sign-in token.', 'error');
      navigate('/login', { replace: true });
    } finally {
      setIsProcessingSSO(false);
    }
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
