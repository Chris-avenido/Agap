import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Lock, User, Eye, EyeOff, ArrowLeft, LogIn, ShieldCheck, Clock, BarChart3, CheckCircle2, Briefcase, Award, MapPin } from 'lucide-react';
import '../nexus-landing.css';
import modernLogo from '../assets/modern_logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as 'jobseeker' | 'reclass' | null;
  const [portalType, setPortalType] = useState<'jobseeker' | 'reclass'>(
    typeParam === 'reclass' ? 'reclass' : 'jobseeker'
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'passcode'>('password');
  const [plantillaNumber, setPlantillaNumber] = useState('');
  const [reclassFullName, setReclassFullName] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [regionsList, setRegionsList] = useState<string[]>([]);
  const [divisionsByRegion, setDivisionsByRegion] = useState<Record<string, string[]>>({});

  // Registration state
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/incumbent-locations`)
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setRegionsList(d.data.regions || []);
          setDivisionsByRegion(d.data.divisionsByRegion || {});
        }
      })
      .catch(err => console.error('Error fetching incumbent locations:', err));
  }, []);

  useEffect(() => {
    const cleanPlantilla = plantillaNumber.trim().toUpperCase();
    if (cleanPlantilla.length >= 8) {
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/incumbent-info?plantilla=${encodeURIComponent(cleanPlantilla)}`);
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.region) setSelectedRegion(json.data.region);
            if (json.data.division) setSelectedDivision(json.data.division);
            if (json.data.target_position) setTargetPosition(json.data.target_position);
          }
        } catch {
          // ignore
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [plantillaNumber]);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (portalType === 'reclass') {
      const cleanFullName = reclassFullName.trim();
      const cleanPlantilla = plantillaNumber.trim().toUpperCase();

      if (!cleanFullName) {
        Swal.fire('Required', 'Please enter your Full Name for Reclassification.', 'warning');
        return;
      }
      if (!cleanPlantilla) {
        Swal.fire('Required', 'Please enter your Plantilla Item Number for Reclassification.', 'warning');
        return;
      }
      if (!selectedRegion) {
        Swal.fire('Required', 'Please select your Region for Reclassification.', 'warning');
        return;
      }
      if (!selectedDivision) {
        Swal.fire('Required', 'Please select your Division for Reclassification.', 'warning');
        return;
      }
      if (!targetPosition) {
        Swal.fire('Required', 'Please select your Target Position for Reclassification.', 'warning');
        return;
      }
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/reclass-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: cleanFullName,
            plantilla_item_number: cleanPlantilla,
            target_position: targetPosition,
            region: selectedRegion.trim().toUpperCase(),
            division: selectedDivision.trim().toUpperCase(),
          })
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
          const now = new Date();
          const item = {
            id: resData.data.id,
            applicant_number: resData.data.applicant_number,
            email: resData.data.email,
            registrant_type: resData.data.registrant_type || 'reclass',
            plantilla_item_number: cleanPlantilla,
            target_position: targetPosition || resData.data.target_position,
            region: (selectedRegion || resData.data.region || '').trim().toUpperCase(),
            division: (selectedDivision || resData.data.division || '').trim().toUpperCase(),
            expiry: now.getTime() + 3 * 60 * 60 * 1000,
          };
          localStorage.setItem('session_data', JSON.stringify(item));
          navigate('/applicant-dashboard');
        } else {
          Swal.fire('Verification Failed', resData.message || 'Verification failed. Please check your Full Name and Plantilla Item Number.', 'error');
        }
      } catch (err) {
        console.error('Reclass login error:', err);
        Swal.fire('Error', 'Unable to connect to the server.', 'error');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      Swal.fire('Required', 'Please enter your username/email and password.', 'warning');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, password, loginMethod })
      });

      if (response.ok) {
        const resData = await response.json();
        const applicantId = resData.data.id;
        const now = new Date();
        const item = {
          id: applicantId,
          applicant_number: resData.data.applicant_number,
          email: resData.data.email,
          registrant_type: resData.data.registrant_type || 'jobseeker',
          plantilla_item_number: resData.data.plantilla_item_number || null,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(item));
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: fpEmail })
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all required fields before submitting
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          surname: lastName,
          email_address: regEmail,
          password: regPassword,
          registrant_type: 'jobseeker',
        })
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
          showConfirmButton: false
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
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-medium"
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
            {isRegistering ? 'Create an Account' : 'Welcome back!'}
          </h2>
          <p className="mt-2 text-[15px] font-medium text-[var(--muted)]">
            {isRegistering ? 'Join AGAP Portal to start your application' : 'Sign in to access your account'}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]/70">
            Government HR Management Information System
          </p>

          <div className="mt-8">
            {/* Portal Switcher Tabs — only shown during login */}
            {!isRegistering && (
              <>
                <div className="mb-4 p-1 bg-gray-100 rounded-xl flex gap-1 border border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setPortalType('jobseeker');
                      setSearchParams({ type: 'jobseeker' });
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      portalType === 'jobseeker'
                        ? 'bg-[#022851] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Jobseeker Portal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPortalType('reclass');
                      setSearchParams({ type: 'reclass' });
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                      portalType === 'reclass'
                        ? 'bg-[#0369a1] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Reclassification</span>
                  </button>
                </div>

                {/* Portal Info Alert */}
                {portalType === 'reclass' ? (
                  <div className="mb-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3 text-xs text-[#0369a1] flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-[#0369a1]" />
                    <span>Logging in to the <strong>Guidance Counselor Reclassification</strong> gateway.</span>
                  </div>
                ) : (
                  <div className="mb-4 bg-[#f8fafc] border border-gray-200 rounded-xl p-3 text-xs text-[#022851] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 shrink-0 text-[#022851]" />
                    <span>Logging in to the <strong>General Jobseeker &amp; Vacancies</strong> gateway.</span>
                  </div>
                )}
              </>
            )}

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
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors"
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

                {/* Submit button: standard registration */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#022851] hover:bg-[#021f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022851] transition-colors disabled:opacity-60"
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
                    className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors focus:outline-none"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                {portalType === 'reclass' ? (
                  /* Reclassification: Full Name + Plantilla Item Number */
                  <div className="bg-[#f0f9ff]/80 border border-[#bae6fd] rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0369a1] flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#0369a1]" /> Incumbent Credentials
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0369a1] bg-[#e0f2fe] px-2.5 py-0.5 rounded-full border border-[#bae6fd]">
                        DepEd Incumbent
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0369a1] mb-1">
                        Full Name
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-[#0369a1]" />
                        </div>
                        <input
                          type="text"
                          required
                          value={reclassFullName}
                          onChange={e => setReclassFullName(e.target.value)}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors bg-white text-[var(--ink)]"
                          placeholder="e.g. Maria Cecilia Hinayhinay or Hinayhinay, Maria Cecilia"
                        />
                      </div>
                      <p className="text-[11px] text-[#0369a1]/80 mt-1 leading-normal">
                        Enter your full name as registered in DepEd incumbent guidance counselor records.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0369a1] mb-1">
                        Plantilla Item Number
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Award className="h-5 w-5 text-[#0369a1]" />
                        </div>
                        <input
                          type="text"
                          required
                          value={plantillaNumber}
                          onChange={e => setPlantillaNumber(e.target.value.toUpperCase())}
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors font-mono uppercase bg-white text-[var(--ink)] tracking-wider"
                          placeholder="e.g. OSEC-DECSB-GCO1-540001-2015"
                        />
                      </div>
                      <p className="text-[11px] text-[#0369a1]/80 mt-1 leading-normal">
                        Enter your official DepEd Plantilla Item Number. No username or password required.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0369a1] mb-1">
                        Region
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-[#0369a1]" />
                        </div>
                        <select
                          required
                          value={selectedRegion}
                          onChange={e => {
                            setSelectedRegion(e.target.value);
                            setSelectedDivision('');
                          }}
                          className="block w-full pl-10 pr-8 sm:text-sm border-gray-300 rounded-md border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors bg-white text-[var(--ink)] cursor-pointer"
                        >
                          <option value="">Select Region</option>
                          {regionsList.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[11px] text-[#0369a1]/80 mt-1 leading-normal">
                        Select your DepEd regional office.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0369a1] mb-1">
                        Division
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-[#0369a1]" />
                        </div>
                        <select
                          required
                          value={selectedDivision}
                          onChange={e => setSelectedDivision(e.target.value)}
                          disabled={!selectedRegion}
                          className="block w-full pl-10 pr-8 sm:text-sm border-gray-300 rounded-md border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors bg-white text-[var(--ink)] cursor-pointer disabled:opacity-60 disabled:bg-gray-50"
                        >
                          <option value="">{selectedRegion ? 'Select Division' : 'Select Region First'}</option>
                          {(divisionsByRegion[selectedRegion] || []).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[11px] text-[#0369a1]/80 mt-1 leading-normal">
                        Select your DepEd schools division office.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0369a1] mb-1">
                        Target Position
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-[#0369a1]" />
                        </div>
                        <select
                          required
                          value={targetPosition}
                          onChange={e => setTargetPosition(e.target.value)}
                          className="block w-full pl-10 pr-8 sm:text-sm border-gray-300 rounded-md border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors bg-white text-[var(--ink)] cursor-pointer"
                        >
                          <option value="">Select Target Position</option>
                          <option value="School Counselor Associate I">School Counselor Associate I</option>
                          <option value="School Counselor Associate II">School Counselor Associate II</option>
                          <option value="School Counselor Associate III">School Counselor Associate III</option>
                          <option value="School Counselor Associate IV">School Counselor Associate IV</option>
                        </select>
                      </div>
                      <p className="text-[11px] text-[#0369a1]/80 mt-1 leading-normal">
                        Select your target position for reclassification.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Jobseeker: Username and Password */
                  <>
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
                          className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors ${loginMethod === 'password' ? 'bg-white text-[#022851] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Password
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLoginMethod('passcode'); setPassword(''); }}
                          className={`flex-1 text-sm font-bold py-2 rounded-md transition-colors ${loginMethod === 'passcode' ? 'bg-white text-[#022851] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
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
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[var(--ink)] transition-colors"
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
                  </>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-colors ${
                      portalType === 'reclass'
                        ? 'bg-[#0369a1] hover:bg-[#02527e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0369a1]'
                        : 'bg-[#022851] hover:bg-[#021f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#022851]'
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    {loading ? 'Verifying...' : portalType === 'reclass' ? 'Access Reclassification' : 'Sign in'}
                  </button>
                </div>

                {portalType !== 'reclass' ? (
                  <div className="mt-4 text-center text-sm text-[var(--muted)]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsRegistering(true); setShowPassword(false); }}
                      className="font-medium text-[var(--blue)] hover:text-[var(--blue-deep)] transition-colors focus:outline-none"
                    >
                      Register here
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 text-center text-xs text-gray-500">
                    Looking for standard job vacancies?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setPortalType('jobseeker');
                        setSearchParams({ type: 'jobseeker' });
                      }}
                      className="font-semibold text-[#0369a1] hover:underline focus:outline-none"
                    >
                      Switch to Jobseeker Portal
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative w-0 flex-1 bg-[var(--navy)] flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-2)] to-[var(--navy)] opacity-90"></div>
        {/* Placeholder for building watermark image if available */}
        <div className="absolute inset-0 bg-[url('/path-to-your-watermark.png')] bg-bottom bg-no-repeat bg-contain opacity-10 mix-blend-overlay"></div>
        
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
    </div>
  );
}
