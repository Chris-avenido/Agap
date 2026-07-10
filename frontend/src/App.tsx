import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ApplicantDashboard from './pages/ApplicantDashboard';
import PublicCareers from './pages/PublicCareers';
import ApplicantJobList from './pages/ApplicantJobList';
import ApplicantJobDetails from './pages/ApplicantJobDetails';
import ApplicationPage from './pages/ApplicationPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const sessionStr = localStorage.getItem('session_data');
  if (!sessionStr) {
    return <Navigate to="/login" replace />;
  }
  try {
    const session = JSON.parse(sessionStr);
    if (session.expiry && session.expiry > new Date().getTime()) {
      return children;
    } else {
      localStorage.removeItem('session_data');
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem('session_data');
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PublicCareers />} />
        <Route path="/apply" element={<ApplicationPage />} />

        <Route path="/login" element={<Login />} />

        {/* Applicant Facing Routes (No Sidebar for Registration) */}
        <Route path="/applicant-dashboard" element={<ProtectedRoute><ApplicantDashboard /></ProtectedRoute>} />
        <Route path="/applicant-jobs" element={<ProtectedRoute><ApplicantJobList /></ProtectedRoute>} />
        <Route path="/applicant-jobs/:id" element={<ProtectedRoute><ApplicantJobDetails /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
