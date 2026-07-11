import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock, User, Eye, EyeOff } from 'lucide-react';
import ApplicationModal from '../components/ApplicationModal';
import '../nexus-landing.css';
import modernLogo from '../assets/modern_logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex bg-[var(--bg-2)]" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-[var(--blue)] rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
              <img src={modernLogo} alt="AGAP Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>AGAP Portal</h2>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Government HR Management Information System
          </p>

          <div className="mt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--ink)]">Username</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[var(--muted)]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--ink)]">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[var(--muted)]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--blue)] focus:ring-[var(--blue)] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--ink)] cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--blue)] hover:bg-[var(--blue-deep)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--blue)] transition-colors"
                >
                  {loading ? 'Authenticating...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative w-0 flex-1 bg-[var(--navy)] flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-2)] to-[var(--navy)] opacity-90"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center max-w-3xl">
          <div className="w-24 h-24 bg-[var(--card-glass-b)] backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-[var(--card-border)] shadow-lg">
             <Building2 className="w-12 h-12 text-[var(--hero-accent)]" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-[var(--hero-title)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Streamlining Public Service Recruitment
          </h1>
          <p className="text-xl text-[var(--hero-copy)] max-w-2xl leading-relaxed">
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
