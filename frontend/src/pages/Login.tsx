import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Lock, User, Eye, EyeOff, ArrowLeft, LogIn, ShieldCheck, Clock, BarChart3, CheckCircle2, Briefcase, Award, AlertCircle, Phone, HelpCircle, X, ArrowRight, UserPlus, Sparkles, FileText, Check } from 'lucide-react';
import '../nexus-landing.css';
import modernLogo from '../assets/modern_logo.png';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

const RECLASS_LOGIN_TOUR_STEPS = [
  {
    sel: '#tour-login-identifier',
    label: 'Step 1 of 4: Account Identifier',
    title: 'Plantilla Item No. or DepEd Email',
    body: 'Enter your 28-character Plantilla Item Number or your official DepEd email address to identify your account.',
  },
  {
    sel: '#tour-login-credentials',
    label: 'Step 2 of 4: Authentication Mode',
    title: 'Password or 6-Digit Passcode',
    body: 'Choose between standard Password sign-in or use your 6-digit numeric PIN passcode for quick, secure authentication.',
  },
  {
    sel: '#tour-login-submit',
    label: 'Step 3 of 4: Access Account',
    title: 'Sign In to Dashboard',
    body: 'Click "Sign in" to access your applicant dashboard, upload requirements, and monitor real-time evaluation status.',
  },
  {
    sel: '#tour-login-register',
    label: 'Step 4 of 4: First-Time User',
    title: 'Register New Account',
    body: 'First time applicant? Click "Register" to verify your Plantilla Item Number in GMIS and create your profile.',
  },
];

const RECLASS_REG_TOUR_STEPS = [
  {
    sel: '#tour-reg-plantilla',
    label: 'Step 1 of 5: Plantilla Verification',
    title: 'DepEd Plantilla Item Number',
    body: 'Enter your 28-character GMIS Plantilla Item Number and click "Verify" to validate against official DepEd central records.',
  },
  {
    sel: '#tour-reg-name',
    label: 'Step 2 of 5: Personal Details',
    title: 'Incumbent Full Name',
    body: 'Enter your legal First Name and Last Name as registered in official DepEd personnel records.',
  },
  {
    sel: '#tour-reg-contact',
    label: 'Step 3 of 5: DepEd Contact Info',
    title: 'Official DepEd Email & Mobile',
    body: 'Provide your official DepEd email (deped.gov.ph) for status updates and an 11-digit mobile number for SMS notifications.',
  },
  {
    sel: '#tour-reg-security',
    label: 'Step 4 of 5: Security Credentials',
    title: 'Password & 6-Digit Passcode',
    body: 'Create a secure password and a 6-digit numeric passcode for rapid and convenient sign-in.',
  },
  {
    sel: '#tour-reg-submit',
    label: 'Step 5 of 5: Account Submission',
    title: 'Submit Reclassification Account',
    body: 'Click "Register Account" to complete your registration and proceed directly to uploading your reclassification documents.',
  },
];

const RECLASS_NEW_APP_TOUR_STEPS = [
  {
    sel: '#tour-newapp-plantilla',
    label: 'Step 1 of 6: Plantilla Verification',
    title: 'Plantilla Item Number',
    body: 'Enter your 28-character Plantilla Item Number and click "Verify" to validate available reclassification slots.',
  },
  {
    sel: '#tour-newapp-name',
    label: 'Step 2 of 6: Personal Details',
    title: 'Applicant Full Name',
    body: 'Enter your legal First Name, Middle Name, and Last Name as registered in official records.',
  },
  {
    sel: '#tour-newapp-contact',
    label: 'Step 3 of 6: Contact Information',
    title: 'Official DepEd Email & Mobile',
    body: 'Provide your official DepEd email (deped.gov.ph) for status updates and an 11-digit mobile number for SMS notifications.',
  },
  {
    sel: '#tour-newapp-station',
    label: 'Step 4 of 6: Current Position & Station',
    title: 'Designation, Region & Division',
    body: 'Specify your current position title, Region, Division, and School/Station name.',
  },
  {
    sel: '#tour-newapp-qualifications',
    label: 'Step 5 of 6: Qualifications & Experience',
    title: 'Degree, Eligibility, Experience & Training',
    body: 'Provide your educational degree, professional eligibility / license, years of experience, and hours of relevant training.',
  },
  {
    sel: '#tour-newapp-security',
    label: 'Step 6 of 6: Security & Submission',
    title: 'Password, Passcode & Submit',
    body: 'Set a secure password and 6-digit quick PIN passcode, then click "Register New Application" to complete registration.',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as 'jobseeker' | 'reclass' | null;
  const [portalType, setPortalType] = useState<'jobseeker' | 'reclass'>(
    typeParam === 'reclass' ? 'reclass' : 'jobseeker'
  );
  const [loading, setLoading] = useState(false);

  // Welcome Guide and Guided Tour state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourMode, setTourMode] = useState<'login' | 'register'>('login');
  const [tourIndex, setTourIndex] = useState(0);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const getActiveTourSteps = () => {
    if (tourMode === 'login') return RECLASS_LOGIN_TOUR_STEPS;
    return reclassRegType === 'new' ? RECLASS_NEW_APP_TOUR_STEPS : RECLASS_REG_TOUR_STEPS;
  };

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

  // Reclassification Login/Register state
  const [reclassView, setReclassView] = useState<'login' | 'register'>('login');
  const [reclassEmail, setReclassEmail] = useState('');
  const [reclassPassword, setReclassPassword] = useState('');
  const [reclassPasscode, setReclassPasscode] = useState('');
  const [showReclassPassword, setShowReclassPassword] = useState(false);
  const [reclassLoginMethod, setReclassLoginMethod] = useState<'password' | 'passcode'>('password');
  const [reclassLoginError, setReclassLoginError] = useState<string | null>(null);

  // Reclassification Registration state (Inline)
  const [stepAPlantilla, setStepAPlantilla] = useState('');
  const [stepAError, setStepAError] = useState<string | null>(null);
  const [stepAIsAlreadyRegistered, setStepAIsAlreadyRegistered] = useState(false);
  const [stepAVerifying, setStepAVerifying] = useState(false);
  const [stepAVerified, setStepAVerified] = useState(false);

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

  // Reclassification Registration Category: 'existing' (incumbent) vs 'new' (new application)
  const [reclassRegType, setReclassRegType] = useState<'existing' | 'new'>('existing');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // New Application Registration Form state
  const [newAppFirstName, setNewAppFirstName] = useState('');
  const [newAppMiddleName, setNewAppMiddleName] = useState('');
  const [newAppLastName, setNewAppLastName] = useState('');
  const [newAppEmail, setNewAppEmail] = useState('');
  const [newAppMobile, setNewAppMobile] = useState('');
  const [newAppPlantilla, setNewAppPlantilla] = useState('');
  const [newAppDesignation, setNewAppDesignation] = useState('Guidance Counselor I');
  const [newAppRegion, setNewAppRegion] = useState('');
  const [newAppDivision, setNewAppDivision] = useState('');
  const [newAppSchoolName, setNewAppSchoolName] = useState('');
  const [newAppPassword, setNewAppPassword] = useState('');
  const [newAppConfirmPassword, setNewAppConfirmPassword] = useState('');
  const [newAppPasscode, setNewAppPasscode] = useState('');
  const [showNewAppPassword, setShowNewAppPassword] = useState(false);
  const [showNewAppConfirmPassword, setShowNewAppConfirmPassword] = useState(false);
  const [newAppError, setNewAppError] = useState<string | null>(null);
  const [newAppRegistering, setNewAppRegistering] = useState(false);
  const [newAppVerifying, setNewAppVerifying] = useState(false);
  const [newAppVerified, setNewAppVerified] = useState(false);
  const [newAppIsAlreadyRegistered, setNewAppIsAlreadyRegistered] = useState(false);
  const [newAppIsIncumbentRecord, setNewAppIsIncumbentRecord] = useState(false);
  const [newAppEducation, setNewAppEducation] = useState('');
  const [newAppYearsExperience, setNewAppYearsExperience] = useState('');
  const [newAppHoursTraining, setNewAppHoursTraining] = useState('');
  const [newAppEligibility, setNewAppEligibility] = useState('');
  const [newAppStep, setNewAppStep] = useState<number>(1);

  // Incumbent locations
  const [incumbentLocations, setIncumbentLocations] = useState<{
    regions: string[];
    divisionsByRegion: Record<string, string[]>;
  }>({ regions: [], divisionsByRegion: {} });

  // Tour positioning logic
  const placeTour = (index: number, retries = 4) => {
    const steps = getActiveTourSteps();
    const step = steps[index];
    if (!step) {
      endTour();
      return;
    }

    const hl = highlightRef.current;
    const tip = tooltipRef.current;
    if (!hl || !tip) return;

    const el = document.querySelector(step.sel) as HTMLElement;

    if (!el) {
      if (retries > 0) {
        setTimeout(() => placeTour(index, retries - 1), 70);
        return;
      }
      hl.classList.remove('active');
      tip.classList.add('active');
      tip.style.visibility = 'hidden';
      const tw = tip.offsetWidth || 390;
      const th = tip.offsetHeight || 180;
      const gap = 20;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      tip.style.top = Math.max(gap, (vh - th) / 2) + 'px';
      tip.style.left = Math.min(Math.max(gap, (vw - tw) / 2), vw - tw - gap) + 'px';
      tip.style.visibility = 'visible';
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const pad = 8;
      hl.style.top = Math.max(4, rect.top - pad) + 'px';
      hl.style.left = Math.max(4, rect.left - pad) + 'px';
      hl.style.width = Math.min(window.innerWidth - 8, rect.width + pad * 2) + 'px';
      hl.style.height = (rect.height + pad * 2) + 'px';
      hl.classList.add('active');

      tip.classList.add('active');
      tip.style.visibility = 'hidden';

      const tw = tip.offsetWidth || 390;
      const th = tip.offsetHeight || 180;
      const gap = 16;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top: number;
      if (rect.bottom + gap + th <= vh) {
        top = rect.bottom + gap;
      } else if (rect.top - gap - th >= 0) {
        top = rect.top - gap - th;
      } else {
        top = Math.max(gap, (vh - th) / 2);
      }

      let left = rect.left + rect.width / 2 - tw / 2;
      left = Math.min(Math.max(gap, left), vw - tw - gap);

      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
      tip.style.visibility = 'visible';
    }, 60);
  };

  const startTour = (mode?: 'login' | 'register') => {
    setShowWelcomeModal(false);
    setPortalType('reclass');
    const targetMode = mode || (reclassView === 'register' ? 'register' : 'login');
    setTourMode(targetMode);
    if (targetMode === 'register') {
      setReclassView('register');
      setNewAppStep(1);
    } else {
      setReclassView('login');
    }
    setTourIndex(0);
    setTourActive(true);
  };

  const endTour = () => {
    setTourActive(false);
    if (highlightRef.current) highlightRef.current.classList.remove('active');
    if (tooltipRef.current) tooltipRef.current.classList.remove('active');
  };

  const tourNext = () => {
    const steps = getActiveTourSteps();
    if (tourIndex >= steps.length - 1) {
      endTour();
      return;
    }
    setTourIndex(prev => prev + 1);
  };

  const tourPrev = () => {
    if (tourIndex <= 0) return;
    setTourIndex(prev => prev - 1);
  };

  // Synchronize guided tour steps with New Reclassification Application wizard pages
  useEffect(() => {
    if (tourActive && portalType === 'reclass' && reclassView === 'register' && reclassRegType === 'new') {
      if (tourIndex <= 2) {
        setNewAppStep(1);
      } else if (tourIndex <= 4) {
        setNewAppStep(2);
      } else {
        setNewAppStep(3);
      }
    }
  }, [tourActive, tourIndex, portalType, reclassView, reclassRegType]);

  useEffect(() => {
    if (tourActive) {
      placeTour(tourIndex);

      const handleResize = () => placeTour(tourIndex);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize, true);
      };
    }
  }, [tourActive, tourIndex, tourMode, reclassView, newAppStep]);

  useEffect(() => {
    if (typeParam === 'reclass') {
      setPortalType('reclass');
      if (searchParams.get('view') === 'register') {
        setReclassView('register');
      }
      setShowWelcomeModal(true);
    } else if (typeParam === 'jobseeker') {
      setPortalType('jobseeker');
    }
    if (searchParams.get('guide') === 'true') {
      setShowWelcomeModal(true);
    }
  }, [typeParam, searchParams]);

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

  useEffect(() => {
    if (portalType === 'reclass') {
      fetch(`${API_BASE_URL}/api/applicants/incumbent-locations`)
        .then(res => res.json())
        .then(resData => {
          if (resData.success && resData.data) {
            setIncumbentLocations(resData.data);
            if (resData.data.regions?.length > 0 && !newAppRegion) {
              const firstReg = resData.data.regions[0];
              setNewAppRegion(firstReg);
              const firstDivs = resData.data.divisionsByRegion[firstReg];
              if (firstDivs?.length > 0) {
                setNewAppDivision(firstDivs[0]);
              }
            }
          }
        })
        .catch(err => console.warn('Could not load incumbent locations:', err));
    }
  }, [portalType]);

  useEffect(() => {
    if (newAppRegion && incumbentLocations.divisionsByRegion[newAppRegion]?.length > 0) {
      const divs = incumbentLocations.divisionsByRegion[newAppRegion];
      if (!divs.includes(newAppDivision)) {
        setNewAppDivision(divs[0]);
      }
    }
  }, [newAppRegion, incumbentLocations]);

  // Handle Reclass Login
  const handleReclassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setReclassLoginError(null);

    const cleanEmail = reclassEmail.trim();
    if (!cleanEmail) {
      setReclassLoginError('Please enter your Plantilla Item Number or DepEd Email.');
      return;
    }

    if (reclassLoginMethod === 'password' && !reclassPassword) {
      setReclassLoginError('Please enter your password.');
      return;
    }

    if (reclassLoginMethod === 'passcode' && (!reclassPasscode || !/^\d{6}$/.test(reclassPasscode.trim()))) {
      setReclassLoginError('Please enter a valid 6-digit numeric passcode.');
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
          setReclassLoginError('Invalid credentials. Please check your email/item number and password or passcode.');
        }
      }
    } catch (err) {
      console.error('Reclass login error:', err);
      setReclassLoginError('Unable to connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Inline Item Number Verify (Incumbent GMIS)
  const handleVerifyPlantillaInline = async (itemNo?: string) => {
    const cleanPlantilla = (itemNo || stepAPlantilla).trim().toUpperCase();
    if (!cleanPlantilla) {
      setStepAError('Please enter your Plantilla Item Number.');
      return;
    }

    setStepAVerifying(true);
    setStepAError(null);
    setStepAIsAlreadyRegistered(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-verify-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_number: cleanPlantilla, category: 'existing' }),
      });

      const resData = await response.json();
      if (response.ok && resData.status === 'valid') {
        setStepAVerified(true);
        setGmisDetails({
          itemNumber: resData.data.item_number || cleanPlantilla,
          designation: resData.data.current_position || 'Incumbent',
          region: resData.data.region || 'N/A',
          division: resData.data.division || 'N/A',
          schoolName: resData.data.school_name || '',
        });
        if (resData.data.first_name) setStepBFirstName(resData.data.first_name);
        if (resData.data.last_name) setStepBLastName(resData.data.last_name);
        if (resData.data.email) setStepBEmail(resData.data.email);
        if (resData.data.mobile_number) setStepBMobile(resData.data.mobile_number);
        setStepAError(null);
      } else if (resData.status === 'already_registered' || response.status === 409) {
        setStepAIsAlreadyRegistered(true);
        setStepAVerified(false);
        setStepAError('This Plantilla Item Number is already registered. Please sign in.');
      } else {
        setStepAVerified(false);
        setStepAError(resData.message || 'No records found.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setStepAError('Unable to verify with GMIS records. Please try again.');
    } finally {
      setStepAVerifying(false);
    }
  };

  // Verify Plantilla Item Number for New Reclassification Application
  const handleVerifyNewAppPlantilla = async () => {
    const cleanPlantilla = newAppPlantilla.trim().toUpperCase();
    if (!cleanPlantilla) {
      setNewAppError('Please enter your Plantilla Item Number.');
      return;
    }

    setNewAppVerifying(true);
    setNewAppError(null);
    setNewAppIsAlreadyRegistered(false);
    setNewAppIsIncumbentRecord(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-verify-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_number: cleanPlantilla, category: 'new' }),
      });

      const resData = await response.json();
      if (response.ok && resData.status === 'valid') {
        setNewAppVerified(true);
        if (resData.data.first_name) setNewAppFirstName(String(resData.data.first_name).toUpperCase());
        if (resData.data.last_name) setNewAppLastName(String(resData.data.last_name).toUpperCase());
        if (resData.data.current_position) setNewAppDesignation(String(resData.data.current_position).toUpperCase());
        if (resData.data.region) setNewAppRegion(String(resData.data.region).toUpperCase());
        if (resData.data.division) setNewAppDivision(String(resData.data.division).toUpperCase());
        if (resData.data.school_name) setNewAppSchoolName(String(resData.data.school_name).toUpperCase());
        if (resData.data.education) setNewAppEducation(String(resData.data.education).toUpperCase());
        if (resData.data.years_experience !== undefined && resData.data.years_experience !== null && resData.data.years_experience !== '') {
          setNewAppYearsExperience(String(resData.data.years_experience));
        }
        if (resData.data.hours_of_training !== undefined && resData.data.hours_of_training !== null && resData.data.hours_of_training !== '') {
          setNewAppHoursTraining(String(resData.data.hours_of_training));
        }
        if (resData.data.eligibility) setNewAppEligibility(String(resData.data.eligibility).toUpperCase());
        setNewAppError(null);
      } else if (resData.status === 'incumbent_record') {
        setNewAppIsIncumbentRecord(true);
        setNewAppVerified(false);
        setNewAppError(resData.message || 'This Plantilla Item Number belongs to an existing GMIS incumbent record. Please proceed to Incumbent Plantilla Registration.');
      } else if (resData.status === 'already_registered' || response.status === 409) {
        setNewAppIsAlreadyRegistered(true);
        setNewAppVerified(false);
        setNewAppError('This Plantilla Item Number is already registered. Please sign in.');
      } else {
        setNewAppVerified(false);
        setNewAppError(resData.message || 'No records found');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setNewAppError('Unable to verify with reclassification records. Please try again.');
    } finally {
      setNewAppVerifying(false);
    }
  };

  // Handle Full Inline Registration
  const handleReclassRegisterInline = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepBError(null);

    const cleanPlantilla = stepAPlantilla.trim().toUpperCase();
    if (!cleanPlantilla) {
      setStepBError('Plantilla Item Number is required.');
      return;
    }

    if (!stepAVerified) {
      setStepBError('Please verify your Plantilla Item Number before registering.');
      return;
    }

    const cleanFirstName = stepBFirstName.trim();
    const cleanLastName = stepBLastName.trim();
    if (!cleanFirstName || !cleanLastName) {
      setStepBError('First Name and Last Name are required.');
      return;
    }

    const cleanEmail = stepBEmail.trim().toLowerCase();
    if (!cleanEmail.endsWith('@deped.gov.ph') || !/^[a-zA-Z0-9._%+-]+@deped\.gov\.ph$/.test(cleanEmail)) {
      setStepBError('Only official @deped.gov.ph email addresses are allowed (e.g. juan.delacruz@deped.gov.ph).');
      return;
    }

    const cleanMobile = stepBMobile.trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      setStepBError('Mobile number must be an 11-digit Philippine mobile number starting with 09 (09XXXXXXXXX).');
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
          item_number: cleanPlantilla,
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
          plantilla_item_number: user.plantilla_item_number || cleanPlantilla,
          current_position: user.current_position || gmisDetails.designation,
          region: user.region || gmisDetails.region,
          division: user.division || gmisDetails.division,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
          token: resData.token,
        };
        localStorage.setItem('session_data', JSON.stringify(sessionItem));
        navigate('/applicant-dashboard');
      } else {
        setStepBError(resData.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setStepBError('Unable to connect to the server. Please try again.');
    } finally {
      setStepBRegistering(false);
    }
  };

  // Step navigation & validation for New Reclassification Application
  const handleNextStep1 = () => {
    setNewAppError(null);
    const cleanPlantilla = newAppPlantilla.trim().toUpperCase();
    if (!cleanPlantilla) {
      setNewAppError('Please enter your Plantilla Item Number.');
      return false;
    }

    if (!newAppVerified) {
      setNewAppError('Please verify your Plantilla Item Number before proceeding.');
      return false;
    }

    const cleanFirstName = newAppFirstName.trim().toUpperCase();
    const cleanLastName = newAppLastName.trim().toUpperCase();
    if (!cleanFirstName || !cleanLastName) {
      setNewAppError('First Name and Last Name are required.');
      return false;
    }

    const rawEmail = newAppEmail.trim();
    const checkEmail = rawEmail.toLowerCase();
    if (!checkEmail.endsWith('@deped.gov.ph') || !/^[a-zA-Z0-9._%+-]+@deped\.gov\.ph$/.test(checkEmail)) {
      setNewAppError('Only official @deped.gov.ph email addresses are allowed (e.g. juan.delacruz@deped.gov.ph).');
      return false;
    }

    const cleanMobile = newAppMobile.trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      setNewAppError('Mobile number must be an 11-digit Philippine mobile number starting with 09 (09XXXXXXXXX).');
      return false;
    }

    setNewAppError(null);
    setNewAppStep(2);
    return true;
  };

  const handleNextStep2 = () => {
    setNewAppError(null);
    if (!newAppDesignation.trim()) {
      setNewAppError('Current Position is required.');
      return false;
    }

    if (!newAppRegion.trim()) {
      setNewAppError('Please select or enter your Region.');
      return false;
    }

    if (!newAppDivision.trim()) {
      setNewAppError('Please select or enter your Division.');
      return false;
    }

    setNewAppError(null);
    setNewAppStep(3);
    return true;
  };

  const handleNewAppFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppStep === 1) {
      handleNextStep1();
    } else if (newAppStep === 2) {
      handleNextStep2();
    } else if (newAppStep === 3) {
      handleNewApplicationRegister(e);
    }
  };

  // Handle New Application Registration
  const handleNewApplicationRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewAppError(null);

    const cleanPlantilla = newAppPlantilla.trim().toUpperCase();
    if (!cleanPlantilla) {
      setNewAppError('Plantilla Item Number is required.');
      return;
    }

    if (!newAppVerified) {
      setNewAppError('Please verify your Plantilla Item Number before registering.');
      return;
    }

    const cleanFirstName = newAppFirstName.trim().toUpperCase();
    const cleanLastName = newAppLastName.trim().toUpperCase();
    if (!cleanFirstName || !cleanLastName) {
      setNewAppError('First Name and Last Name are required.');
      return;
    }

    const rawEmail = newAppEmail.trim();
    const checkEmail = rawEmail.toLowerCase();
    if (!checkEmail.endsWith('@deped.gov.ph') || !/^[a-zA-Z0-9._%+-]+@deped\.gov\.ph$/.test(checkEmail)) {
      setNewAppError('Only official @deped.gov.ph email addresses are allowed (e.g. juan.delacruz@deped.gov.ph).');
      return;
    }

    const cleanMobile = newAppMobile.trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      setNewAppError('Mobile number must be an 11-digit Philippine mobile number starting with 09 (09XXXXXXXXX).');
      return;
    }

    if (!newAppPassword || !newAppPassword.trim()) {
      setNewAppError('Password is required.');
      return;
    }

    if (newAppPassword !== newAppConfirmPassword) {
      setNewAppError('Passwords do not match.');
      return;
    }

    const cleanPasscode = newAppPasscode.trim();
    if (!/^\d{6}$/.test(cleanPasscode)) {
      setNewAppError('Passcode must be exactly 6 numeric digits.');
      return;
    }

    setNewAppRegistering(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicants/reclass-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_application: true,
          item_number: cleanPlantilla.toUpperCase(),
          first_name: cleanFirstName.toUpperCase(),
          middle_name: newAppMiddleName.trim() ? newAppMiddleName.trim().toUpperCase() : undefined,
          last_name: cleanLastName.toUpperCase(),
          mobile_number: cleanMobile,
          email: checkEmail,
          password: newAppPassword,
          passcode: cleanPasscode,
          current_position: (newAppDesignation.trim() || 'GUIDANCE COUNSELOR I').toUpperCase(),
          region: newAppRegion.trim() ? newAppRegion.trim().toUpperCase() : undefined,
          division: newAppDivision.trim() ? newAppDivision.trim().toUpperCase() : undefined,
          school_name: newAppSchoolName.trim() ? newAppSchoolName.trim().toUpperCase() : undefined,
          education: newAppEducation.trim() ? newAppEducation.trim().toUpperCase() : undefined,
          years_experience: newAppYearsExperience.trim() !== '' ? newAppYearsExperience.trim() : undefined,
          hours_of_training: newAppHoursTraining.trim() !== '' ? newAppHoursTraining.trim() : undefined,
          eligibility: newAppEligibility.trim() ? newAppEligibility.trim().toUpperCase() : undefined,
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
          plantilla_item_number: user.plantilla_item_number || cleanPlantilla,
          current_position: user.current_position || newAppDesignation,
          region: user.region || newAppRegion,
          division: user.division || newAppDivision,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
          token: resData.token,
        };
        localStorage.setItem('session_data', JSON.stringify(sessionItem));
        Swal.fire({
          icon: 'success',
          title: 'Account Registered',
          text: 'Your new reclassification application profile has been registered.',
          timer: 1800,
          showConfirmButton: false,
        }).then(() => {
          navigate('/applicant-dashboard');
        });
      } else {
        setNewAppError(resData.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      console.error('New application registration error:', err);
      setNewAppError('Unable to connect to the server. Please try again.');
    } finally {
      setNewAppRegistering(false);
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

  const handleBack = () => {
    // If category modal is open, close it and return to reclass login
    if (showCategoryModal) {
      setShowCategoryModal(false);
      setReclassView('login');
      return;
    }

    // If on Reclassification registration page (either Incumbent or New Application)
    if (portalType === 'reclass' && reclassView === 'register') {
      setShowCategoryModal(true);
      return;
    }

    // If on Jobseeker registration, return to login form
    if (isRegistering) {
      setIsRegistering(false);
      return;
    }

    // Default: navigate back in history if possible, else go to landing page
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex bg-[var(--bg-2)] relative overflow-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-medium cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="flex-1 flex flex-col py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-full overflow-y-auto">
        <div className={`mx-auto my-auto w-full transition-all duration-300 ${portalType === 'reclass' && reclassView === 'register'
            ? 'max-w-md sm:max-w-xl lg:w-[520px]'
            : 'max-w-sm lg:w-96'
          }`}>
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
                ? (reclassView === 'register'
                    ? (reclassRegType === 'new' ? 'New Reclassification Application' : 'Incumbent Plantilla Registration')
                    : 'Reclassification Login')
                : 'Welcome back!'}
          </h2>
          <p className="mt-2 text-[15px] font-medium text-[var(--muted)]">
            {isRegistering
              ? 'Join AGAP Portal to start your application'
              : portalType === 'reclass'
                ? (reclassView === 'register'
                  ? (reclassRegType === 'new'
                    ? (newAppStep === 1
                        ? 'Step 1 of 3: Enter Plantilla Item Number, applicant name, and contact details'
                        : newAppStep === 2
                          ? 'Step 2 of 3: Provide your current station assignment and professional qualifications'
                          : 'Step 3 of 3: Set up your account password and 6-digit security passcode')
                    : 'Enter your Plantilla Item Number, DepEd email, and password to set up your account')
                  : 'Sign in using your Plantilla Item Number or DepEd email')
                : 'Sign in to access your account'}
          </p>
          <p className="mt-1.5 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0"></span>
            Government HR Management Information System &bull; DepEd
          </p>

          <div className="mt-8">
            {/* Gateway Header & Switcher */}
            {!isRegistering && (
              <div className="mb-5" id="tour-reclass-portal">
                {portalType === 'reclass' ? (
                  <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3 sm:p-3.5 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0369a1] text-white flex items-center justify-center shadow-xs shrink-0">
                        {reclassRegType === 'new' && reclassView === 'register' ? (
                          <UserPlus className="w-4 h-4" />
                        ) : (
                          <Award className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#0369a1] uppercase tracking-wider">Reclassification Portal</h3>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {reclassView === 'register'
                            ? (reclassRegType === 'new' ? 'New Application Registration' : 'Incumbent Plantilla Registration')
                            : 'Incumbent Gateway'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {reclassView === 'register' && reclassRegType === 'new' && (
                        <button
                          type="button"
                          onClick={() => {
                            setReclassRegType('existing');
                            navigate('/login?type=reclass&guide=true');
                          }}
                          className="text-xs font-bold text-[#0369a1] hover:text-[#02527e] hover:underline cursor-pointer px-1.5 py-1"
                        >
                          Incumbent Registration &rarr;
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => startTour(reclassView)}
                        className="text-xs font-bold text-[#0369a1] hover:text-[#02527e] flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1.5 rounded-lg border border-sky-200 shadow-2xs hover:bg-sky-50 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{reclassView === 'register' ? 'Register Tutorial' : 'Login Tutorial'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-3 text-xs text-[#022851] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 shrink-0 text-[#022851]" />
                      <span>Logging in to <strong>General Jobseeker &amp; Vacancies</strong></span>
                    </div>
                  </div>
                )}
              </div>
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
              reclassView === 'register' ? (
                <div className="space-y-4">
                  {reclassRegType === 'new' ? (
                    /* FORM: NEW APPLICATION REGISTRATION */
                    <form onSubmit={handleNewAppFormSubmit} className="space-y-3.5">
                      {/* Step Progress Wizard */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          {/* Step 1 Indicator */}
                          <button
                            type="button"
                            onClick={() => {
                              if (newAppStep > 1) {
                                setNewAppError(null);
                                setNewAppStep(1);
                              }
                            }}
                            disabled={newAppStep === 1}
                            className={`flex items-center gap-2 text-left transition-all ${
                              newAppStep === 1
                                ? 'cursor-default'
                                : newAppStep > 1
                                ? 'cursor-pointer group'
                                : 'cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                                newAppStep === 1
                                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                                  : newAppStep > 1
                                  ? 'bg-emerald-600 text-white group-hover:bg-emerald-700'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {newAppStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 1</p>
                              <p
                                className={`text-xs font-bold leading-tight ${
                                  newAppStep === 1
                                    ? 'text-indigo-950'
                                    : newAppStep > 1
                                    ? 'text-slate-700 group-hover:text-indigo-600'
                                    : 'text-slate-400'
                                }`}
                              >
                                Plantilla & Identity
                              </p>
                            </div>
                          </button>

                          {/* Connector Line 1-2 */}
                          <div
                            className={`flex-1 mx-2 sm:mx-3 h-0.5 rounded-full transition-all ${
                              newAppStep > 1 ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />

                          {/* Step 2 Indicator */}
                          <button
                            type="button"
                            onClick={() => {
                              if (newAppStep > 2) {
                                setNewAppError(null);
                                setNewAppStep(2);
                              }
                            }}
                            disabled={newAppStep <= 2}
                            className={`flex items-center gap-2 text-left transition-all ${
                              newAppStep === 2
                                ? 'cursor-default'
                                : newAppStep > 2
                                ? 'cursor-pointer group'
                                : 'cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                                newAppStep === 2
                                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                                  : newAppStep > 2
                                  ? 'bg-emerald-600 text-white group-hover:bg-emerald-700'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {newAppStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 2</p>
                              <p
                                className={`text-xs font-bold leading-tight ${
                                  newAppStep === 2
                                    ? 'text-indigo-950'
                                    : newAppStep > 2
                                    ? 'text-slate-700 group-hover:text-indigo-600'
                                    : 'text-slate-400'
                                }`}
                              >
                                Station & Qualifications
                              </p>
                            </div>
                          </button>

                          {/* Connector Line 2-3 */}
                          <div
                            className={`flex-1 mx-2 sm:mx-3 h-0.5 rounded-full transition-all ${
                              newAppStep > 2 ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />

                          {/* Step 3 Indicator */}
                          <div
                            className={`flex items-center gap-2 text-left ${
                              newAppStep === 3 ? 'cursor-default' : 'cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                                newAppStep === 3
                                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              3
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 3</p>
                              <p
                                className={`text-xs font-bold leading-tight ${
                                  newAppStep === 3 ? 'text-indigo-950' : 'text-slate-400'
                                }`}
                              >
                                Security & Submit
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Step Description */}
                        <div className="sm:hidden mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">
                            {newAppStep === 1 && 'Step 1: Plantilla & Identity'}
                            {newAppStep === 2 && 'Step 2: Station & Qualifications'}
                            {newAppStep === 3 && 'Step 3: Security & Submission'}
                          </span>
                          <span className="text-[11px] font-semibold text-indigo-600">
                            Page {newAppStep} of 3
                          </span>
                        </div>
                      </div>

                      {/* Error Alert */}
                      {newAppError && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                            <span className="font-medium">{newAppError}</span>
                          </div>
                          {newAppIsIncumbentRecord && (
                            <button
                              type="button"
                              onClick={() => {
                                const plantilla = newAppPlantilla;
                                setStepAPlantilla(plantilla);
                                setReclassRegType('existing');
                                setNewAppError(null);
                                setNewAppIsIncumbentRecord(false);
                                handleVerifyPlantillaInline(plantilla);
                              }}
                              className="self-start text-xs font-bold text-[#0369a1] hover:text-[#02527e] hover:underline cursor-pointer ml-6 flex items-center gap-1.5"
                            >
                              <span>Proceed to Incumbent Plantilla Registration &rarr;</span>
                            </button>
                          )}
                          {newAppIsAlreadyRegistered && (
                            <button
                              type="button"
                              onClick={() => {
                                setReclassView('login');
                                setNewAppError(null);
                                setNewAppIsAlreadyRegistered(false);
                                setNewAppIsIncumbentRecord(false);
                              }}
                              className="self-start text-xs font-bold text-indigo-700 hover:underline cursor-pointer ml-6"
                            >
                              Proceed to Sign in &rarr;
                            </button>
                          )}
                        </div>
                      )}

                      {/* STEP 1: PLANTILLA & IDENTITY */}
                      {newAppStep === 1 && (
                        <>
                          {/* Plantilla Item Number Verification */}
                          <div id="tour-newapp-plantilla">
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Plantilla Item Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                              <div className="relative rounded-lg shadow-2xs flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Award className="h-4 w-4 text-indigo-600" />
                                </div>
                                <input
                                  type="text"
                                  required
                                  value={newAppPlantilla}
                                  onChange={e => {
                                    setNewAppPlantilla(e.target.value.toUpperCase());
                                    setNewAppVerified(false);
                                    setNewAppError(null);
                                    setNewAppIsAlreadyRegistered(false);
                                    setNewAppIsIncumbentRecord(false);
                                  }}
                                  className="block w-full pl-9 pr-3 text-xs border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-colors font-mono uppercase bg-white text-[var(--ink)] tracking-wider"
                                  placeholder="e.g. OSEC-DECSB-GSS2-14-2015"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleVerifyNewAppPlantilla}
                                disabled={newAppVerifying || !newAppPlantilla.trim()}
                                className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                              >
                                {newAppVerifying ? (
                                  <span>Checking...</span>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Verify</span>
                                  </>
                                )}
                              </button>
                            </div>
                            {newAppVerified && (
                              <div className="mt-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>
                                  <strong>Plantilla Record Verified:</strong> {newAppDesignation} {newAppFirstName ? `• ${newAppFirstName} ${newAppLastName}` : ''} ({newAppDivision || newAppRegion || 'DepEd'})
                                </span>
                              </div>
                            )}
                            {!newAppVerified && (
                              <p className="text-[11px] text-gray-400 mt-1">
                                Must be an active plantilla item in reclassification records with unassigned personnel and email.
                              </p>
                            )}
                          </div>

                          {/* Name Fields */}
                          <div id="tour-newapp-name" className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="sm:col-span-1">
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                First Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={newAppFirstName}
                                onChange={e => setNewAppFirstName(e.target.value.toUpperCase())}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                placeholder="JUAN"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Middle Name
                              </label>
                              <input
                                type="text"
                                value={newAppMiddleName}
                                onChange={e => setNewAppMiddleName(e.target.value.toUpperCase())}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                placeholder="SANTOS"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Last Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={newAppLastName}
                                onChange={e => setNewAppLastName(e.target.value.toUpperCase())}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                placeholder="DELA CRUZ"
                              />
                            </div>
                          </div>

                          {/* Official DepEd Email & Mobile */}
                          <div id="tour-newapp-contact" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Official DepEd Email <span className="text-red-500">*</span>
                              </label>
                              <div className="relative rounded-lg shadow-2xs">
                                <input
                                  type="email"
                                  required
                                  value={newAppEmail}
                                  onChange={e => {
                                    setNewAppEmail(e.target.value);
                                    setNewAppError(null);
                                  }}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                                  placeholder="name@deped.gov.ph"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Mobile Number <span className="text-red-500">*</span>
                              </label>
                              <div className="relative rounded-lg shadow-2xs">
                                <input
                                  type="tel"
                                  maxLength={11}
                                  required
                                  value={newAppMobile}
                                  onChange={e => setNewAppMobile(e.target.value.replace(/\D/g, ''))}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none font-mono"
                                  placeholder="09XXXXXXXXX"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Step 1 Action Button: Next */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={handleNextStep1}
                              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors cursor-pointer"
                            >
                              <span>Next: Station & Qualifications</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* STEP 2: STATION & QUALIFICATIONS */}
                      {newAppStep === 2 && (
                        <>
                          {/* Current Position & Station Section */}
                          <div id="tour-newapp-station" className="space-y-2.5">
                            {/* Current Position */}
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                Current Position <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={newAppDesignation}
                                onChange={e => setNewAppDesignation(e.target.value.toUpperCase())}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white font-medium uppercase"
                                placeholder="E.G. GUIDANCE SERVICES SPECIALIST II"
                              />
                            </div>

                            {/* Region & Division */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Region <span className="text-red-500">*</span>
                                </label>
                                {incumbentLocations.regions?.length > 0 ? (
                                  <select
                                    value={newAppRegion}
                                    onChange={e => setNewAppRegion(e.target.value.toUpperCase())}
                                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white font-medium uppercase"
                                  >
                                    <option value="">Select Region</option>
                                    {incumbentLocations.regions.map(r => (
                                      <option key={r} value={r.toUpperCase()}>{r.toUpperCase()}</option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    value={newAppRegion}
                                    onChange={e => setNewAppRegion(e.target.value.toUpperCase())}
                                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                    placeholder="E.G. REGION IV-A"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Division <span className="text-red-500">*</span>
                                </label>
                                {incumbentLocations.divisionsByRegion[newAppRegion]?.length > 0 ? (
                                  <select
                                    value={newAppDivision}
                                    onChange={e => setNewAppDivision(e.target.value.toUpperCase())}
                                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none bg-white font-medium uppercase"
                                  >
                                    <option value="">Select Division</option>
                                    {incumbentLocations.divisionsByRegion[newAppRegion].map(d => (
                                      <option key={d} value={d.toUpperCase()}>{d.toUpperCase()}</option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type="text"
                                    value={newAppDivision}
                                    onChange={e => setNewAppDivision(e.target.value.toUpperCase())}
                                    className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                    placeholder="E.G. QUEZON"
                                  />
                                )}
                              </div>
                            </div>

                            {/* School Name */}
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                School / Station Name <span className="text-gray-400 font-normal">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={newAppSchoolName}
                                onChange={e => setNewAppSchoolName(e.target.value.toUpperCase())}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                placeholder="E.G. QUEZON NATIONAL HIGH SCHOOL"
                              />
                            </div>
                          </div>

                          {/* Qualification Details */}
                          <div id="tour-newapp-qualifications" className="space-y-2.5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Education / Degree
                                </label>
                                <input
                                  type="text"
                                  value={newAppEducation}
                                  onChange={e => setNewAppEducation(e.target.value.toUpperCase())}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                  placeholder="E.G. BACHELOR / MASTER IN GUIDANCE & COUNSELING"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Eligibility / Professional License
                                </label>
                                <input
                                  type="text"
                                  value={newAppEligibility}
                                  onChange={e => setNewAppEligibility(e.target.value.toUpperCase())}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none uppercase"
                                  placeholder="E.G. RA 1080 (REGISTERED GUIDANCE COUNSELOR)"
                                />
                              </div>
                            </div>

                            {/* Qualification Details: Experience & Training Hours */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Years of Experience
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={newAppYearsExperience}
                                  onChange={e => setNewAppYearsExperience(e.target.value)}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none font-mono"
                                  placeholder="e.g. 5"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Hours of Relevant Training
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={newAppHoursTraining}
                                  onChange={e => setNewAppHoursTraining(e.target.value)}
                                  className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none font-mono"
                                  placeholder="e.g. 40"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Step 2 Action Buttons: Back & Next */}
                          <div className="pt-2 flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setNewAppError(null);
                                setNewAppStep(1);
                              }}
                              className="w-1/3 flex justify-center items-center gap-1.5 py-3 px-3 border border-gray-300 rounded-lg shadow-2xs text-xs sm:text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleNextStep2}
                              className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors cursor-pointer"
                            >
                              <span>Next: Security Credentials</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* STEP 3: SECURITY CREDENTIALS & SUBMIT */}
                      {newAppStep === 3 && (
                        <>
                          {/* Security Credentials */}
                          <div id="tour-newapp-security" className="space-y-2.5">
                            {/* Password & Confirm Password */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-2xs">
                                  <input
                                    type={showNewAppPassword ? 'text' : 'password'}
                                    required
                                    value={newAppPassword}
                                    onChange={e => setNewAppPassword(e.target.value)}
                                    className="block w-full pr-8 text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                                    placeholder="••••••••"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowNewAppPassword(!showNewAppPassword)}
                                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                  >
                                    {showNewAppPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                  Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative rounded-lg shadow-2xs">
                                  <input
                                    type={showNewAppConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={newAppConfirmPassword}
                                    onChange={e => setNewAppConfirmPassword(e.target.value)}
                                    className="block w-full pr-8 text-xs border-gray-300 rounded-lg border py-2 px-2.5 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                                    placeholder="••••••••"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowNewAppConfirmPassword(!showNewAppConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                  >
                                    {showNewAppConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* 6-Digit Passcode */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-bold text-gray-700">
                                  6-Digit Passcode <span className="text-red-500">*</span>
                                </label>
                                <span className="text-[10px] text-gray-400">Used for quick passcode sign-in</span>
                              </div>
                              <input
                                type="password"
                                inputMode="numeric"
                                maxLength={6}
                                required
                                value={newAppPasscode}
                                onChange={e => setNewAppPasscode(e.target.value.replace(/\D/g, ''))}
                                className="block w-full text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none tracking-widest font-mono text-center font-bold"
                                placeholder="••••••"
                              />
                            </div>
                          </div>

                          {/* Step 3 Action Buttons: Back & Submit */}
                          <div id="tour-newapp-submit" className="pt-2 flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setNewAppError(null);
                                setNewAppStep(2);
                              }}
                              className="w-1/3 flex justify-center items-center gap-1.5 py-3 px-3 border border-gray-300 rounded-lg shadow-2xs text-xs sm:text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Back</span>
                            </button>
                            <button
                              type="submit"
                              disabled={newAppRegistering || !newAppVerified}
                              className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:opacity-60 cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4 shrink-0" />
                              <span>{newAppRegistering ? 'Registering...' : !newAppVerified ? 'Verify Plantilla First' : 'Register New Application'}</span>
                            </button>
                          </div>
                        </>
                      )}

                      <div className="mt-4 flex flex-col items-center gap-2 text-sm text-[var(--muted)]">
                        <div>
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setReclassView('login');
                              setNewAppError(null);
                            }}
                            className="font-bold text-[#0369a1] hover:underline transition-colors focus:outline-none cursor-pointer"
                          >
                            Sign in here
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowCategoryModal(true)}
                          className="text-xs text-indigo-600 hover:text-indigo-800 underline transition-colors cursor-pointer"
                        >
                          &larr; Back to category selection
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* RECLASSIFICATION INLINE REGISTRATION FORM (EXISTING INCUMBENT) */
                    <form onSubmit={handleReclassRegisterInline} className="space-y-4">
                  {/* Error Alert */}
                  {(stepBError || stepAError) && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                        <span className="font-medium">{stepBError || stepAError}</span>
                      </div>
                      {stepAIsAlreadyRegistered && (
                        <button
                          type="button"
                          onClick={() => {
                            setReclassView('login');
                            setStepAError(null);
                            setStepBError(null);
                            setStepAIsAlreadyRegistered(false);
                          }}
                          className="self-start text-xs font-bold text-[#0369a1] hover:underline cursor-pointer ml-6"
                        >
                          Proceed to Sign in &rarr;
                        </button>
                      )}
                    </div>
                  )}

                  {/* Plantilla Item Number */}
                  <div id="tour-reg-plantilla">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Plantilla Item Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative rounded-lg shadow-sm flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Award className="h-4 w-4 text-[#0369a1]" />
                        </div>
                        <input
                          type="text"
                          required
                          value={stepAPlantilla}
                          onChange={e => {
                            setStepAPlantilla(e.target.value.toUpperCase());
                            setStepAError(null);
                            setStepBError(null);
                            setStepAIsAlreadyRegistered(false);
                            setStepAVerified(false);
                          }}
                          className="block w-full pl-9 pr-3 text-xs border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors font-mono uppercase bg-white text-[var(--ink)] tracking-wider"
                          placeholder="XXXX-XXXXX-XXXX-XXXXXXX-XXXX"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleVerifyPlantillaInline()}
                        disabled={stepAVerifying || !stepAPlantilla.trim()}
                        className="px-3.5 py-2 text-xs font-bold text-white bg-[#0369a1] hover:bg-[#02527e] disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                      >
                        {stepAVerifying ? (
                          <span>Checking...</span>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </>
                        )}
                      </button>
                    </div>

                    {stepAVerified && (
                      <div className="mt-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          <strong>GMIS Match:</strong> {gmisDetails.designation || 'Incumbent'} ({gmisDetails.division || 'DepEd'})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Incumbent First Name & Last Name */}
                  <div id="tour-reg-name" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={stepBFirstName}
                          onChange={e => {
                            setStepBFirstName(e.target.value);
                            setStepBError(null);
                          }}
                          className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none capitalize"
                          placeholder="Juan"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={stepBLastName}
                          onChange={e => {
                            setStepBLastName(e.target.value);
                            setStepBError(null);
                          }}
                          className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none capitalize"
                          placeholder="Dela Cruz"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DepEd Email & Mobile Number */}
                  <div id="tour-reg-contact" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        DepEd Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={stepBEmail}
                          onChange={e => {
                            setStepBEmail(e.target.value);
                            setStepBError(null);
                          }}
                          className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                          placeholder="firstname.lastname@deped.gov.ph"
                        />
                      </div>
                    </div>

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
                          className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none font-mono"
                          placeholder="09XXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password, Confirm Password & 6-Digit Passcode */}
                  <div id="tour-reg-security" className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                          <input
                            type={showStepBPassword ? 'text' : 'password'}
                            required
                            value={stepBPassword}
                            onChange={e => setStepBPassword(e.target.value)}
                            className="block w-full pl-9 pr-8 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowStepBPassword(!showStepBPassword)}
                            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showStepBPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                          <input
                            type={showStepBConfirmPassword ? 'text' : 'password'}
                            required
                            value={stepBConfirmPassword}
                            onChange={e => setStepBConfirmPassword(e.target.value)}
                            className="block w-full pl-9 pr-8 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowStepBConfirmPassword(!showStepBConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            {showStepBConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 6-Digit Passcode */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          6-Digit Passcode <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-gray-400">Used for quick passcode login</span>
                      </div>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          inputMode="numeric"
                          maxLength={6}
                          required
                          value={stepBPasscode}
                          onChange={e => setStepBPasscode(e.target.value.replace(/\D/g, ''))}
                          className="block w-full pl-9 text-xs border-gray-300 rounded-lg border py-2 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none tracking-widest font-mono text-center font-bold"
                          placeholder="••••••"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div id="tour-reg-submit" className="pt-2">
                    <button
                      type="submit"
                      disabled={stepBRegistering || !stepAVerified}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#0369a1] hover:bg-[#02527e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0369a1] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {stepBRegistering ? 'Registering Account...' : !stepAVerified ? 'Verify Plantilla Item First' : 'Register Account'}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-2 text-sm text-[var(--muted)]">
                    <div>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setReclassView('login');
                          setStepBError(null);
                          setStepAError(null);
                          setStepAIsAlreadyRegistered(false);
                        }}
                        className="font-bold text-[#0369a1] hover:underline transition-colors focus:outline-none cursor-pointer"
                      >
                        Sign in here
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-xs text-[#0369a1] hover:text-[#02527e] underline transition-colors cursor-pointer"
                    >
                      &larr; Back to category selection
                    </button>
                  </div>
                </form>
                  )}
                </div>
              ) : (
                /* RECLASSIFICATION DEFAULT: ACCOUNT LOGIN */
                <form onSubmit={handleReclassLogin} className="space-y-5">
                  {reclassLoginError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span className="font-medium">{reclassLoginError}</span>
                    </div>
                  )}

                  <div id="tour-login-identifier">
                    <label className="block text-sm font-medium text-[var(--ink)]">Plantilla Item No. or DepEd Email</label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[var(--muted)]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={reclassEmail}
                        onChange={e => {
                          setReclassEmail(e.target.value);
                          setReclassLoginError(null);
                        }}
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg border py-2.5 px-3 focus:ring-[#0369a1] focus:border-[#0369a1] outline-none transition-colors"
                        placeholder="Plantilla Item No. or name@deped.gov.ph"
                      />
                    </div>
                  </div>

                  <div id="tour-login-credentials" className="space-y-4">
                    {/* Tabs for Password vs 6-Digit Passcode */}
                    <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setReclassLoginMethod('password');
                          setReclassLoginError(null);
                        }}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer ${reclassLoginMethod === 'password'
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
                        className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all cursor-pointer ${reclassLoginMethod === 'passcode'
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

                  <div id="tour-login-submit" className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#0369a1] hover:bg-[#02527e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0369a1] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>

                  <div id="tour-login-register" className="mt-4 text-center text-sm text-[var(--muted)]">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setShowCategoryModal(true);
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
      <div className="hidden lg:flex relative w-0 flex-1 bg-[var(--navy)] flex-col items-center justify-center h-full overflow-hidden">
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

      {/* Reclassification Registration Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sky-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top gradient stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#06345F] via-[#0A6FA6] to-[#FDBA22]" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setShowCategoryModal(false);
                setReclassView('login');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-sky-100 border border-sky-200 text-[#0369a1] text-[11px] font-bold rounded-full uppercase tracking-wider mb-2">
                DepEd Reclassification Portal
              </span>
              <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Select Application Category
              </h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-md mx-auto">
                Please select your registration classification to proceed with the appropriate setup process under DepEd guidelines.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Option 1: Incumbent GMIS Plantilla Record */}
              <div
                onClick={() => {
                  setShowCategoryModal(false);
                  setReclassRegType('existing');
                  setReclassView('register');
                  navigate('/login?type=reclass&guide=true');
                }}
                className="group border-2 border-sky-200 hover:border-[#0369a1] bg-sky-50/50 hover:bg-sky-50 rounded-2xl p-4 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-sky-200 group-hover:border-[#0369a1] text-[#0369a1] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all">
                  <Award className="w-6 h-6 text-[#0369a1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#0369a1] transition-colors">
                      Incumbent GMIS Plantilla Record
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide shrink-0">
                      GMIS Masterlist
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    For incumbent Guidance Counselors who have an active Plantilla Item Number registered in the DepEd GMIS central database.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-[#0369a1]">
                    <span>Verify Plantilla Item &rarr;</span>
                  </div>
                </div>
              </div>

              {/* Option 2: New Reclassification Application */}
              <div
                onClick={() => {
                  setShowCategoryModal(false);
                  setReclassRegType('new');
                  setReclassView('register');
                }}
                className="group border-2 border-indigo-200 hover:border-indigo-600 bg-indigo-50/40 hover:bg-indigo-50/70 rounded-2xl p-4 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-indigo-200 group-hover:border-indigo-600 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-all">
                  <UserPlus className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      New Reclassification Application
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wide shrink-0">
                      New Candidate Profile
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    For personnel filing a new reclassification application without an existing pre-loaded GMIS incumbent record. Create a fresh candidate profile.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    <span>Create New Application &rarr;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowCategoryModal(false);
                  setReclassView('login');
                }}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                Cancel and return to sign in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Onboarding Modal */}
      <div className={`welcome-overlay ${showWelcomeModal ? 'open' : ''}`}>
        {showWelcomeModal && (
          <div className="welcome-box">
            <div className="welcome-badge">
              {reclassView === 'register' ? (reclassRegType === 'new' ? 'New Application' : 'Incumbent Registration') : 'AGAP Portal'}
            </div>
            <h2>
              {reclassView === 'register'
                ? (reclassRegType === 'new' ? 'New Reclassification Application' : 'Incumbent Registration')
                : 'Welcome to the AGAP Portal'}
            </h2>
            <p>
              {reclassView === 'register'
                ? (reclassRegType === 'new'
                    ? 'Register your candidate profile, station, qualifications, and credentials to file a new reclassification application.'
                    : 'Register your official Plantilla Item Number, DepEd email, contact info, and create your credentials to start your reclassification process.')
                : 'Seamlessly access your portal, submit documentary requirements, and track your evaluation progress from verification through to appointment.'}
            </p>
            <div className="welcome-highlights">
              {reclassView === 'register' ? (
                reclassRegType === 'new' ? (
                  <>
                    <div className="welcome-hi">
                      <b>Plantilla Item</b>
                      <span>Verify available reclassification slot item number.</span>
                    </div>
                    <div className="welcome-hi">
                      <b>Profile &amp; Station</b>
                      <span>Candidate details, station, region, and division.</span>
                    </div>
                    <div className="welcome-hi">
                      <b>Qualifications</b>
                      <span>Education, eligibility, experience, and training hours.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="welcome-hi">
                      <b>Verify Plantilla</b>
                      <span>Connect to GMIS central records to auto-verify position.</span>
                    </div>
                    <div className="welcome-hi">
                      <b>Contact Info</b>
                      <span>Official DepEd email &amp; mobile for status alerts.</span>
                    </div>
                    <div className="welcome-hi">
                      <b>Credentials</b>
                      <span>Secure password &amp; 6-digit quick PIN passcode.</span>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="welcome-hi">
                    <b>Authenticate</b>
                    <span>Sign in with your Plantilla Item Number, DepEd email, or 6-digit PIN.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Submit Documents</b>
                    <span>Upload documentary requirements, CSC forms, and update profile.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Track Status</b>
                    <span>Real-time progress from SDO HRMO evaluation to DBM endorsement.</span>
                  </div>
                </>
              )}
            </div>
            <div className="welcome-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setShowWelcomeModal(false)}
              >
                Skip
              </button>
              <button
                type="button"
                className="gold"
                onClick={() => startTour(reclassView)}
              >
                {reclassView === 'register' ? 'Show Register Tutorial' : 'Show Login Tutorial'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tour Spotlight & Tooltip */}
      <div
        ref={highlightRef}
        className={`tour-highlight ${tourActive ? 'active' : ''}`}
      />
      {tourActive && (
        <div
          ref={tooltipRef}
          className="tour-tooltip active"
        >
          <button
            type="button"
            className="tour-skip"
            onClick={endTour}
            title="Close tutorial"
          >
            ✕
          </button>
          <div className="tour-step-label">
            {getActiveTourSteps()[tourIndex]?.label}
          </div>
          <h4>{getActiveTourSteps()[tourIndex]?.title}</h4>
          <p>{getActiveTourSteps()[tourIndex]?.body}</p>
          <div className="tour-footer">
            <div className="tour-progress">
              Step {tourIndex + 1} of {getActiveTourSteps().length}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="tour-btn secondary"
                onClick={tourPrev}
                disabled={tourIndex === 0}
              >
                Back
              </button>
              <button
                type="button"
                className="tour-btn"
                onClick={tourNext}
              >
                {tourIndex === getActiveTourSteps().length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
