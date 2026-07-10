import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User } from 'lucide-react';
import ApplicationModal from '../components/ApplicationModal';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Registration state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.expiry && session.expiry > new Date().getTime()) {
          navigate('/applicant-jobs');
        } else {
          localStorage.removeItem('session_data');
        }
      } catch {
        localStorage.removeItem('session_data');
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, password })
      });

      if (response.ok) {
        const resData = await response.json();
        const now = new Date();
        const item = {
          id: resData.data.id,
          email: resData.data.email,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(item));
        navigate('/applicant-jobs');
      } else {
        Swal.fire('Error', 'Invalid credentials', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Server error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">IE</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">InsightED</h2>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to AGAP Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Government HR Management Information System
          </p>

          <div className="mt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? 'Authenticating...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-brand-900">
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center text-white p-12 text-center">
          <Building2 className="w-32 h-32 mb-8 text-brand-400 opacity-80" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">Streamlining Public Service Recruitment</h1>
          <p className="text-lg text-brand-200 max-w-2xl">
            A modern, efficient, and transparent platform for managing the entire hiring lifecycle.
            Automated screening, structured evaluation, and seamless onboarding.
          </p>
        </div>
      </div>

      {/* Applicant Registration Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle="General Registration"
      />
    </div>
  );
}
