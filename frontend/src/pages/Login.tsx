import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Lock, User, Eye, EyeOff, ArrowLeft, LogIn, ShieldCheck, Clock, BarChart3, CheckCircle2, Briefcase, Award, AlertCircle, Phone } from 'lucide-react';
import '../nexus-landing.css';
import modernLogo from '../assets/modern_logo.png';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as 'jobseeker' | 'reclass' | null;
  const [portalType, setPortalType] = useState<'jobseeker' | 'reclass'>(
    typeParam === 'reclass' ? 'reclass' : 'jobseeker'
  );
  const [loading, setLoading] = useState(false);

  // Jobseeker Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'passcode'>('password');

  // Jobseeker Registration state
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reclassification Login state
  const [reclassView, setReclassView] = useState<'login' | 'register_step_a'>('login');
  const [reclassEmail, setReclassEmail] = useState('');
  const [reclassPassword, setReclassPassword] = useState('');
  const [reclassPasscode, setReclassPasscode] = useState('');
  const [showReclassPassword, setShowReclassPassword] = useState(false);
  const [reclassLoginMethod, setReclassLoginMethod] = useState<'password' | 'passcode'>('password');
  const [reclassLoginError, setReclassLoginError] = useState<string | null>(null);

  // Reclassification Registration Step A
  const [stepAPlantilla, setStepAPlantilla] = useState('');
  const [stepAError, setStepAError] = useState<string | null>(null);
  const [stepAIsAlreadyRegistered, setStepAIsAlreadyRegistered] = useState(false);
  const [stepAVerifying, setStepAVerifying] = useState(false);

  // Reclassification Registration Step B Modal
  const [isStepBModalOpen, setIsStepBModalOpen] = useState(false);
  const [gmisDetails, setGmisDetails] = useState<{
    itemNumber: string;
    designation: string;
    region: string;
    division: string;
    schoolName: string;
  }>({
    itemNumber: '',
    designation: '',
    region: '',
    division: '',
    schoolName: '',
  });

  const [stepBFirstName, setStepBFirstName] = useState('');
  const [stepBMiddleName, setStepBMiddleName] = useState('');
  const [stepBLastName, setStepBLastName] = useState('');
  const [stepBMobile, setStepBMobile] = useState('');
  const [stepBEmail, setStepBEmail] = useState('');
  const [stepBPassword, setStepBPassword] = useState('');
  const [stepBConfirmPassword, setStepBConfirmPassword] = useState('');
  const [stepBPasscode, setStepBPasscode] = useState('');
  const [showStepBPassword, setShowStepBPassword] = useState(false);
  const [showStepBConfirmPassword, setShowStepBConfirmPassword] = useState(false);
  const [stepBError, setStepBError] = useState<string | null>(null);
  const [stepBRegistering, setStepBRegistering] = useState(false);

  useEffect(() => {
    if (typeParam === 'reclass' || typeParam === 'jobseeker') {
      setPortalType(typeParam);
    }
  }, [typeParam]);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.expiry && session.expiry > new Date().getTime()) {
          navigate('/applicant-dashboard');
        } else {
          localStorage.removeItem('session_data');
        }
      } catch {
        localStorage.removeItem('session_data');
      }
    }
  }, [navigate]);

  // Handle Reclass Login
  const handleReclassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setReclassLoginError(null);

    const cleanEmail = reclassEmail.trim();
    if (!cleanEmail) {
      setReclassLoginError('Invalid email or credentials');
      return;
    }

    if (reclassLoginMethod === 'password' && !reclassPassword) {
      setReclassLoginError('Invalid email or credentials');
      return;
    }

    if (reclassLoginMethod === 'passcode' && (!reclassPasscode || !/^\d{6}$/.test(reclassPasscode.trim()))) {
      setReclassLoginError('Invalid email or credentials');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          loginMethod: reclassLoginMethod,
          password: reclassLoginMethod === 'password' ? reclassPassword : undefined,
          passcode: reclassLoginMethod === 'passcode' ? reclassPasscode.trim() : undefined,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        const user = resData.user || resData.data;
        const now = new Date();
        const sessionItem = {
          id: user.id,
          applicant_number: user.applicant_number,
          email: user.email,
          registrant_type: 'reclass',
          plantilla_item_number: user.plantilla_item_number,
          current_position: user.current_position,
          target_position: user.target_position,
          region: user.region,
          division: user.division,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
          token: resData.token,
        };
        localStorage.setItem('session_data', JSON.stringify(sessionItem));
        navigate('/applicant-dashboard');
      } else {
        if (response.status === 429) {
          setReclassLoginError(resData.message || 'Account temporarily locked out. Please try again later.');
        } else {
          setReclassLoginError('Invalid email or credentials');
        }
      }
    } catch (err) {
      console.error('Reclass login error:', err);
      setReclassLoginError('Invalid email or credentials');
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration Step A: Item Number Check
  const handleStepAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepAError(null);
    setStepAIsAlreadyRegistered(false);

    const cleanPlantilla = stepAPlantilla.trim().toUpperCase();
    if (!cleanPlantilla) {
      setStepAError('Please enter your Plantilla Item Number.');
      return;
    }

    setStepAVerifying(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-verify-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_number: cleanPlantilla }),
      });

      const resData = await response.json();
      if (response.ok && resData.status === 'valid') {
        setGmisDetails({
          itemNumber: resData.data.item_number || cleanPlantilla,
          designation: resData.data.current_position || 'Guidance Counselor',
          region: resData.data.region || 'N/A',
          division: resData.data.division || 'N/A',
          schoolName: resData.data.school_name || '',
        });
        if (reclassEmail && !stepBEmail) {
          setStepBEmail(reclassEmail);
        }
        setStepBError(null);
        setIsStepBModalOpen(true);
      } else if (resData.status === 'already_registered' || response.status === 409) {
        setStepAIsAlreadyRegistered(true);
        setStepAError('This Plantilla Item Number is already registered. Please sign in.');
      } else {
        setStepAError('Plantilla Item Number not found in GMIS records.');
      }
    } catch (err) {
      console.error('Step A verification error:', err);
      setStepAError('Unable to connect to the server. Please try again.');
    } finally {
      setStepAVerifying(false);
    }
  };

  // Handle Registration Step B: Modal Submit
  const handleStepBRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepBError(null);

    if (!stepBFirstName.trim() || !stepBLastName.trim()) {
      setStepBError('First Name and Last Name are required.');
      return;
    }

    const cleanMobile = stepBMobile.trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      setStepBError('Mobile number must be an 11-digit Philippine mobile number starting with 09 (e.g. 09XXXXXXXXX).');
      return;
    }

    const cleanEmail = stepBEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStepBError('Please enter a valid email address.');
      return;
    }

    if (!stepBPassword || !stepBPassword.trim()) {
      setStepBError('Password is required.');
      return;
    }

    if (stepBPassword !== stepBConfirmPassword) {
      setStepBError('Passwords do not match.');
      return;
    }

    const cleanPasscode = stepBPasscode.trim();
    if (!/^\d{6}$/.test(cleanPasscode)) {
      setStepBError('Passcode must be exactly 6 numeric digits.');
      return;
    }

    setStepBRegistering(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_number: gmisDetails.itemNumber,
          first_name: stepBFirstName.trim(),
          middle_name: stepBMiddleName.trim() || undefined,
          last_name: stepBLastName.trim(),
          mobile_number: cleanMobile,
          email: cleanEmail,
          password: stepBPassword,
          passcode: cleanPasscode,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        const user = resData.user || resData.data;
        const now = new Date();
        const sessionItem = {
          id: user.id,
          applicant_number: user.applicant_number,
          email: user.email,
          registrant_type: 'reclass',
          plantilla_item_number: user.plantilla_item_number || gmisDetails.itemNumber,
          current_position: user.current_position || gmisDetails.designation,
          region: user.region || gmisDetails.region,
          division: user.division || gmisDetails.division,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
          token: resData.token,
        };
        localStorage.setItem('session_data', JSON.stringify(sessionItem));
        setIsStepBModalOpen(false);
        navigate('/applicant-dashboard');
      } else {
        setStepBError(resData.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      console.error('Step B registration error:', err);
      setStepBError('Unable to connect to the server. Please try again.');
    } finally {
      setStepBRegistering(false);
    }
  };

  // Jobseeker login
  const handleJobseekerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      Swal.fire('Required', 'Please enter your username/email and password.', 'warning');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, password, loginMethod }),
      });

      if (response.ok) {
        const resData = await response.json();
        const applicantId = resData.data.id;
        const now = new Date();
        const sessionItem = {
          id: applicantId,
          applicant_number: resData.data.applicant_number,
          email: resData.data.email,
          registrant_type: resData.data.registrant_type || 'jobseeker',
          plantilla_item_number: resData.data.plantilla_item_number || null,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(sessionItem));
        navigate('/applicant-dashboard');
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

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { value: fpEmail } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'name@example.com',
      showCancelButton: true,
      confirmButtonText: 'Send Reset Link',
      confirmButtonColor: '#022851',
    });

    if (fpEmail) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/applicants/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: fpEmail }),
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire('Success', data.message, 'success');
        } else {
          Swal.fire('Error', data.message || 'Failed to send reset link', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Unable to reach the server', 'error');
      }
    }
  };

  // Jobseeker register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      Swal.fire('Error', 'First name and last name are required.', 'error');
      return;
    }
    if (!regEmail.trim()) {
      Swal.fire('Error', 'Email address is required.', 'error');
      return;
    }
    if (!regPassword) {
      Swal.fire('Error', 'Password is required.', 'error');
      return;
    }
    if (regPassword.length < 6) {
      Swal.fire('Error', 'Password must be at least 6 characters.', 'error');
      return;
    }
    if (!confirmPassword) {
      Swal.fire('Error', 'Please confirm your password.', 'error');
      return;
    }
    if (regPassword !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          surname: lastName,
          email_address: regEmail,
          password: regPassword,
          registrant_type: 'jobseeker',
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        const now = new Date();
        const item = {
          id: resData.data.id,
          applicant_number: resData.data.applicant_number,
          email: resData.data.email_address || resData.data.email,
          registrant_type: resData.data.registrant_type || 'jobseeker',
          plantilla_item_number: resData.data.plantilla_item_number || null,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(item));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account created successfully!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/applicant-dashboard');
        });
      } else {
        Swal.fire('Error', resData.message || 'Registration failed', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Server error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-2)] relative" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-[var(--blue)] rounded-lg flex items-center justify-center shadow-sm overflow-hidden p-1">
              <img src={modernLogo} alt="AGAP Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-[var(--ink)] font-bold text-lg leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>AGAP Portal</span>
                <span className="text-[var(--ink)]/70 text-[10px] uppercase tracking-wider font-semibold mt-0.5">Agile Gateway for Appointments and Placements</span>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-[var(--ink)] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRegistering
              ? 'Create an Account'
              : portalType === 'reclass'
              ? (reclassView === 'register_step_a' ? 'Reclassification Registration' : 'Reclassification Login')
              : 'Welcome back!'}
          </h2>
          <p className="mt-2 text-[15px] font-medium text-[var(--muted)]">
            {isRegistering
              ? 'Join AGAP Portal to start your application'
              : portalType === 'reclass'
              ? (reclassView === 'register_step_a'
                  ? 'Verify your Plantilla Item Number to begin registration'
                  : 'Sign in using your email and password or 6-digit passcode')
              : 'Sign in to access your account'}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]/70">
            Government HR Management Information System
          </p>

          <div className="mt-8">
            {/* Gateway Header Badge */}
            {!isRegistering && (
              <>
                {portalType === 'reclass' ? (
                  <div className="mb-5 bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-center shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0369a1] text-white flex items-center justify-center shadow-sm">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#0369a1] uppercase tracking-wider">Reclassification Portal</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Guidance Counselor Gateway</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 bg-[#f8fafc] border border-gray-200 rounded-xl p-3 text-xs text-[#022851] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 shrink-0 text-[#022851]" />
                    <span>Logging in to the <strong>General Jobseeker &amp; Vacancies</strong> gateway.</span>
                  </div>
                )}
              </>
            )}

            {/* FORM 1: Jobseeker Registration Form */}
            {isRegistering ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[var(--ink)]">First Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[var(--muted)]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                        placeholder="Juan"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[var(--ink)]">Last Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="block w-full px-3 sm:text-sm border-gray-300 rounded-md border py-2 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                        placeholder="Dela Cruz"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ink)]">Email Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-[var(--muted)]" />
                    </div>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                      placeholder="name@example.com"
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
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ink)]">Confirm Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[var(--muted)]" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#022851] hover:bg-[#021f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022851] transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-[var(--muted)]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(false); setShowPassword(false); }}
                    className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors focus:outline-none cursor-pointer"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            ) : portalType === 'reclass' ? (
              /* RECLASSIFICATION FLOW */
              reclassView === 'register_step_a' ? (
                /* STEP A: PLANTILLA ITEM NUMBER CHECK */
                <form onSubmit={handleStepAVerify} className="space-y-5">
                  <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 text-xs text-sky-800 leading-relaxed">
                    <p className="font-semibold mb-1">Step 1 of 2: GMIS Verification</p>
                    <p>Enter your official DepEd Plantilla Item Number. We will verify your record against the GMIS database before proceeding to account registration.</p>
                  </div>

                  {stepAError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                        <span className="font-medium">{stepAError}</span>
                      </div>
                      {stepAIsAlreadyRegistered && (
                        <button
                          type="button"
                          onClick={() => {
                            setReclassView('login');
                            setStepAError(null);
                            setStepAIsAlreadyRegistered(false);
                          }}
                          className="self-start text-xs font-bold text-[#0369a1] hover:underline cursor-pointer ml-6"
                        >
                          Proceed to Sign in &rarr;
                        </button>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-[#0369a1] mb-1.5">
                      Plantilla Item Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-5 w-5 text-[#0369a1]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={stepAPlantilla}
                        onChange={e => {
                          setStepAPlantilla(e.target.value.toUpperCase());
                          setStepAError(null);
                          setStepAIsAlreadyRegistered(false);
                        }}
                        className="block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors font-mono uppercase bg-white text-[var(--ink)] tracking-wider"
                        placeholder="XXXX-XXXXX-XXXX-XXXXXXX-XXXX"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      Format: Standard 4 to 5 segments separated by hyphens (e.g. OSEC-DECSB-GDC-...).
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={stepAVerifying}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#0369a1] hover:bg-[#02527e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0369a1] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {stepAVerifying ? 'Verifying Item Number...' : 'Verify Item Number'}
                    </button>
                  </div>

                  <div className="mt-4 text-center text-sm text-[var(--muted)]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setReclassView('login');
                        setStepAError(null);
                        setStepAIsAlreadyRegistered(false);
                      }}
                      className="font-bold text-[#0369a1] hover:underline transition-colors focus:outline-none cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              ) : (
                /* RECLASSIFICATION DEFAULT: ACCOUNT LOGIN */
                <form onSubmit={handleReclassLogin} className="space-y-5">
                  {reclassLoginError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span className="font-medium">{reclassLoginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[var(--ink)]">Email Address</label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[var(--muted)]" />
                      </div>
                      <input
                        type="email"
                        required
                        value={reclassEmail}
                        onChange={e => {
                          setReclassEmail(e.target.value);
                          setReclassLoginError(null);
                        }}
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors"
                        placeholder="name@deped.gov.ph"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Tabs for Password vs 6-Digit Passcode */}
                    <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setReclassLoginMethod('password');
                          setReclassLoginError(null);
                        }}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer ${
                          reclassLoginMethod === 'password'
                            ? 'bg-white text-[#0369a1] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Password
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReclassLoginMethod('passcode');
                          setReclassLoginError(null);
                        }}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer ${
                          reclassLoginMethod === 'passcode'
                            ? 'bg-white text-[#0369a1] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        6-Digit Passcode
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--ink)]">
                        {reclassLoginMethod === 'password' ? 'Password' : '6-Digit Passcode'}
                      </label>
                      <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-[var(--muted)]" />
                        </div>
                        {reclassLoginMethod === 'password' ? (
                          <>
                            <input
                              type={showReclassPassword ? 'text' : 'password'}
                              required
                              value={reclassPassword}
                              onChange={e => {
                                setReclassPassword(e.target.value);
                                setReclassLoginError(null);
                              }}
                              className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowReclassPassword(!showReclassPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors cursor-pointer"
                            >
                              {showReclassPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </>
                        ) : (
                          <input
                            type="password"
                            inputMode="numeric"
                            maxLength={6}
                            required
                            value={reclassPasscode}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g, '');
                              setReclassPasscode(val);
                              setReclassLoginError(null);
                            }}
                            className="block w-full pl-10 pr-4 sm:text-sm border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors tracking-widest font-mono text-center font-bold"
                            placeholder="••••••"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#0369a1] hover:bg-[#02527e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0369a1] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>

                  <div className="mt-4 text-center text-sm text-[var(--muted)]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setReclassView('register_step_a');
                        setStepAPlantilla('');
                        setStepAError(null);
                        setStepAIsAlreadyRegistered(false);
                      }}
                      className="font-bold text-[#0369a1] hover:underline transition-colors focus:outline-none cursor-pointer"
                    >
                      Register
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* FORM 3: Jobseeker Login Form */
              <form onSubmit={handleJobseekerLogin} className="space-y-6">
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

                <div className="space-y-4">
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('password'); setPassword(''); }}
                      className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors cursor-pointer ${loginMethod === 'password' ? 'bg-white text-[#022851] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Password
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLoginMethod('passcode'); setPassword(''); }}
                      className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors cursor-pointer ${loginMethod === 'passcode' ? 'bg-white text-[#022851] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      6-Digit Passcode
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--ink)]">
                      {loginMethod === 'password' ? 'Password' : '6-Digit Passcode'}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-[var(--muted)]" />
                      </div>
                      <input
                        type={loginMethod === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                        required
                        maxLength={loginMethod === 'passcode' ? 6 : undefined}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md border py-2 px-3 focus:ring-[var(--blue)] focus:border-[var(--blue)] outline-none transition-colors"
                        placeholder={loginMethod === 'password' ? '••••••••' : 'Enter 6-digit passcode'}
                      />
                      {loginMethod === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      )}
                    </div>
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
                    <a href="#" onClick={handleForgotPassword} className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#022851] hover:bg-[#021f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022851] transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    {loading ? 'Verifying...' : 'Sign in'}
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-[var(--muted)]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(true); setShowPassword(false); }}
                    className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors focus:outline-none cursor-pointer"
                  >
                    Register here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Right Column Branding Banner */}
      <div className="hidden lg:flex relative w-0 flex-1 bg-[var(--navy)] flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-2)] to-[var(--navy)] opacity-90"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center max-w-3xl mt-[-80px]">
          <div className="w-24 h-24 bg-[#0a386c] rounded-[24px] flex items-center justify-center mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
            <Building2 className="w-12 h-12 text-[#fbbf24]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Streamlining Public Service Recruitment
          </h1>
          <p className="text-lg text-blue-100/90 max-w-xl leading-relaxed">
            A modern, efficient, and transparent platform for managing the entire hiring lifecycle.
            Automated screening, structured evaluation, and seamless onboarding.
          </p>
        </div>

        {/* Feature Icons Bottom Row */}
        <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center gap-12 px-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
               <User className="w-7 h-7 text-[#fbbf24] relative z-10" />
               <CheckCircle2 className="w-4 h-4 text-[#fbbf24] absolute bottom-3 right-3 z-10" />
            </div>
            <span className="text-xs font-semibold text-white/80 tracking-wide">Fair Process</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
               <ShieldCheck className="w-8 h-8 text-[#fbbf24] relative z-10" />
            </div>
            <span className="text-xs font-semibold text-white/80 tracking-wide">Secure Data</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
               <Clock className="w-8 h-8 text-[#fbbf24] relative z-10" />
            </div>
            <span className="text-xs font-semibold text-white/80 tracking-wide">Time Saving</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
               <BarChart3 className="w-8 h-8 text-[#fbbf24] relative z-10" />
            </div>
            <span className="text-xs font-semibold text-white/80 tracking-wide">Data Driven</span>
          </div>
        </div>
      </div>

      {/* REGISTRATION STEP B MODAL (NON-DISMISSIBLE) */}
      {isStepBModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0369a1] to-[#0284c7] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight leading-tight">Reclassification Registration</h3>
                  <p className="text-xs text-sky-100">Step 2 of 2: Create Account Credentials</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full border border-white/20">
                GMIS Verified
              </span>
            </div>

            <form onSubmit={handleStepBRegister} className="p-6 space-y-5">
              {/* GMIS Read-Only Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>GMIS Plantilla Details (Read-only)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Plantilla Item Number:</span>
                    <span className="font-mono font-bold text-[#0369a1] break-all">{gmisDetails.itemNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Current Designation:</span>
                    <span className="font-semibold text-slate-800">{gmisDetails.designation || 'Guidance Counselor'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Region:</span>
                    <span className="font-semibold text-slate-800">{gmisDetails.region || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Division:</span>
                    <span className="font-semibold text-slate-800">{gmisDetails.division || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {stepBError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-medium">{stepBError}</span>
                </div>
              )}

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepBFirstName}
                    onChange={e => setStepBFirstName(e.target.value)}
                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Middle Name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={stepBMiddleName}
                    onChange={e => setStepBMiddleName(e.target.value)}
                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                    placeholder="Protacio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepBLastName}
                    onChange={e => setStepBLastName(e.target.value)}
                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                    placeholder="Dela Cruz"
                  />
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      value={stepBMobile}
                      onChange={e => setStepBMobile(e.target.value.replace(/\D/g, ''))}
                      className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                      placeholder="09XXXXXXXXX"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">11-digit PH mobile</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={stepBEmail}
                      onChange={e => setStepBEmail(e.target.value)}
                      className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                      placeholder="name@deped.gov.ph"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">Unique login email</span>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type={showStepBPassword ? 'text' : 'password'}
                      required
                      value={stepBPassword}
                      onChange={e => setStepBPassword(e.target.value)}
                      className="block w-full pr-8 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStepBPassword(!showStepBPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showStepBPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type={showStepBConfirmPassword ? 'text' : 'password'}
                      required
                      value={stepBConfirmPassword}
                      onChange={e => setStepBConfirmPassword(e.target.value)}
                      className="block w-full pr-8 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStepBConfirmPassword(!showStepBConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showStepBConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 6-Digit Passcode */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  6-Digit Passcode <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm max-w-xs">
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={stepBPasscode}
                    onChange={e => setStepBPasscode(e.target.value.replace(/\D/g, ''))}
                    className="block w-full text-sm border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none tracking-widest font-mono text-center font-bold"
                    placeholder="••••••"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Used for quick 6-digit passcode login</span>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsStepBModalOpen(false);
                    setReclassView('login');
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  Back to login
                </button>
                <button
                  type="submit"
                  disabled={stepBRegistering}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0369a1] hover:bg-[#02527e] rounded-lg shadow-sm transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {stepBRegistering ? 'Registering Account...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
