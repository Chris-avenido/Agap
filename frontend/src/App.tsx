import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantDashboard from './pages/ApplicantDashboard';
import PublicCareers from './pages/PublicCareers';
import ApplicantJobList from './pages/ApplicantJobList';
import ApplicantJobDetails from './pages/ApplicantJobDetails';
import ApplicationPage from './pages/ApplicationPage';
import HqSsoCallback from './pages/HqSsoCallback';
import { AuthProvider, useAuth } from './auth/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAuth();

  if (status === 'checking') return <div className="min-h-screen grid place-items-center">Loading…</div>;
  return status === 'authenticated' ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider><Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PublicCareers />} />
        <Route path="/apply" element={<ApplicationPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/applicant-login" element={<Login />} />
        <Route path="/auth/hq-callback" element={<HqSsoCallback />} />

        {/* Applicant Facing Routes (No Sidebar for Registration) */}
        <Route path="/applicant-dashboard" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
        <Route path="/applicant-jobs" element={<ProtectedRoute><ApplicantJobList /></ProtectedRoute>} />
        <Route path="/applicant-jobs/:id" element={<ProtectedRoute><ApplicantJobDetails /></ProtectedRoute>} />

      </Routes></AuthProvider>
    </BrowserRouter>
  );
}

export default App;
