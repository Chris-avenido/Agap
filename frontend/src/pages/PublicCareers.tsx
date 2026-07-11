import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Search, Clock, Hash, MapPin, ChevronDown, GraduationCap, ArrowRight, CalendarDays, Star, Building2, CircleDollarSign, X, EyeOff, Eye, Pen, HelpCircle, ArrowLeft, Briefcase, Trash2 } from 'lucide-react';
import modernLogo from '../assets/modern_logo.png';

// Removed mock positions array

export default function PublicCareers() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<any[]>([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [viewedJob, setViewedJob] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [filterDivision, setFilterDivision] = useState('All Divisions');
  const [filterPosition, setFilterPosition] = useState('All Positions');

  const availableRegions = useMemo(() => [...new Set(positions.map(p => p.location || 'Unknown'))].filter(Boolean), [positions]);
  const availableDivisions = useMemo(() => [...new Set(positions.map(p => p.division || p.office))].filter(Boolean), [positions]);
  const availablePositions = useMemo(() => [...new Set(positions.map(p => p.title))].filter(Boolean), [positions]);

  const filteredPositions = useMemo(() => positions.filter(job => {
    const matchSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (job.itemNo && job.itemNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.division && job.division.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.office && job.office.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRegion = filterRegion === 'All Regions' || (job.location || 'Unknown') === filterRegion;
    const matchDivision = filterDivision === 'All Divisions' || (job.division || job.office) === filterDivision;
    const matchPosition = filterPosition === 'All Positions' || job.title === filterPosition;
    
    return matchSearch && matchRegion && matchDivision && matchPosition;
  }), [searchQuery, filterRegion, filterDivision, filterPosition, positions]);

  useEffect(() => {
    setCurrentJobPage(1);
  }, [searchQuery, filterRegion, filterDivision, filterPosition, jobsPerPage]);

  const totalJobPages = Math.ceil(filteredPositions.length / jobsPerPage);
  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredPositions.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const formatted = data.data.map((v: any) => ({
            id: v.id,
            title: v.title,
            office: v.school || 'Department of Education',
            division: v.region || '',
            type: 'Permanent',
            posted: v.posting_start ? new Date(v.posting_start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            deadline: v.posting_end ? new Date(v.posting_end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            sg: v.salary_grade,
            itemNo: v.item_no,
            location: v.location || '',
            description: 'Details available in the full job posting.',
            daysLeft: v.posting_end ? Math.ceil((new Date(v.posting_end).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0
          }));
          setPositions(formatted);
        }
      })
      .catch(err => console.error('Error fetching vacancies:', err));
  }, []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterRegion('All Regions');
    setFilterDivision('All Divisions');
    setFilterPosition('All Positions');
  };

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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('surname') as string;
    const email = formData.get('email_address') as string;
    const password = formData.get('password') as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    const data = {
      first_name: firstName,
      surname: lastName,
      email_address: email,
      password: password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const resData = await response.json();
        const now = new Date();
        const item = {
          id: resData.data?.id,
          email: resData.data?.email_address || email,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(item));
        if (selectedJob) {
          navigate(`/applicant-jobs/${selectedJob.id}`);
        } else {
          navigate('/applicant-jobs');
        }
      } else {
        const errorData = await response.json();
        if (errorData.message === 'Email address already exists') {
          Swal.fire('Email Exists', 'This email address is already registered. Please log in instead.', 'error');
        } else {
          Swal.fire('Registration Failed', errorData.message || 'An error occurred during registration.', 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Registration failed. Backend unreachable.', 'error');
    }
  };

  const handleApplyClick = (jobId: number, jobTitle: string) => {
    const job = positions.find(p => p.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowApplyModal(true);
    } else {
      setSelectedJob({ id: jobId, title: jobTitle, itemNo: 'Unknown', type: 'Unknown', sg: 0 });
      setShowApplyModal(true);
    }
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col relative"
      style={{
        background: `
          radial-gradient(circle at 78% 14%, rgba(253,186,34,.30), transparent 32%),
          radial-gradient(circle at 70% 86%, rgba(10,111,166,.18), transparent 34%),
          linear-gradient(135deg, #EAF7FC 0%, #F8FCFF 52%, #FFF2C6 100%)
        `
      }}
    >
      {/* Top Navbar */}
      <nav className="bg-white px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#022851] rounded-full flex items-center justify-center shadow-inner shrink-0 overflow-hidden border border-[#022851]">
            <img src={modernLogo} alt="AGAP Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#022851] font-bold text-lg leading-tight tracking-tight">AGAP Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm shrink-0">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-[#022851] hover:bg-[#033a76] text-white font-semibold rounded-full shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            Login
          </button>
        </div>
      </nav>

      {!viewedJob ? (
        <>
          {/* Hero Banner Section */}
          <div
            className="relative w-full overflow-hidden py-20 sm:py-24 px-6 md:px-12 flex-shrink-0"
            style={{
              background: 'linear-gradient(160deg, #05233F 0%, #06345F 58%, #0A6FA6 100%)'
            }}
          >
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#004b93] rounded-full mix-blend-screen filter blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#004b93] rounded-full mix-blend-screen filter blur-[120px] opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                <span className="text-white text-[11px] font-bold tracking-widest uppercase">CAREERS IN DEPARTMENT OF EDUCATION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white leading-[1.1] mb-6 max-w-4xl tracking-tight">
                Build a meaningful career<br className="hidden sm:block" /> in <span className="text-[#facc15]">public service.</span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed font-light">
                The DEPDev adheres to the existing general policy of no discrimination based on gender identity, sexual orientation, disabilities, religion and/or indigenous group membership in the implementation of its recruitment, selection and placement.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-6xl w-full mx-auto px-4 relative z-20 -mt-8 mb-12">
            <div className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col items-stretch gap-2 border border-gray-100">
              
              {/* Text Search Row */}
              <div className="w-full flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-gray-200">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search position title, item number, or division..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-400 font-medium text-sm sm:text-base ml-3"
                />
              </div>

              {/* Dropdowns Row */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full sm:flex-1 flex items-center px-4 py-2 sm:py-0 gap-2 sm:border-r border-gray-200 shrink-0">
                <MapPin className="w-5 h-5 text-gray-400" />
                <select 
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none pr-8 text-sm sm:text-base"
                >
                  <option value="All Regions">All Regions</option>
                  {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 -ml-6 pointer-events-none" />
              </div>

              <div className="w-full sm:flex-1 flex items-center px-4 py-2 sm:py-0 gap-2 sm:border-r border-gray-200 shrink-0">
                <Building2 className="w-5 h-5 text-gray-400" />
                <select 
                  value={filterDivision}
                  onChange={(e) => setFilterDivision(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none pr-8 text-sm sm:text-base"
                >
                  <option value="All Divisions">All Divisions</option>
                  {availableDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 -ml-6 pointer-events-none" />
              </div>

              <div className="w-full sm:flex-1 flex items-center px-4 py-2 sm:py-0 gap-2 shrink-0">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <select 
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none pr-8 text-sm sm:text-base"
                >
                  <option value="All Positions">All Positions</option>
                  {availablePositions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 -ml-6 pointer-events-none" />
              </div>

              <button 
                onClick={handleClearFilters}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-semibold transition-all hover:shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
              
              <button className="w-full sm:w-auto bg-[#022851] hover:bg-[#033a76] text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0">
                <Search className="w-4 h-4 sm:hidden" />
                Search
              </button>
              
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="max-w-6xl w-full mx-auto px-4 pb-24 flex-1">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Latest Vacancies</h2>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Showing {filteredPositions.length} Positions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentJobs.map((job, index) => {
                const isFeatured = index < 2;
                const isTemporary = job.type.toLowerCase() === 'temporary';

                return (
                  <div key={job.id} className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 relative flex flex-col group">

                    {/* Badges Row 1 */}
                    <div className="flex items-center gap-2 mb-3">
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff8e1] text-[#eab308] text-[11px] font-bold tracking-widest uppercase">
                          <Star className="w-3.5 h-3.5 fill-[#eab308]" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Badges Row 2 */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-bold ${isTemporary
                        ? 'bg-gray-200/60 text-orange-500'
                        : 'bg-[#e8f5e9] text-[#2e7d32]'
                        }`}>
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-extrabold tracking-widest uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></div>
                        OPEN
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#022851] mb-2 leading-tight">
                      {job.title}
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Building2 className="w-4 h-4 shrink-0 text-gray-400" />
                        <span className="text-[15px] font-medium">{job.office}</span>
                      </div>
                      {job.division && (
                        <div className="text-sm text-gray-400 font-medium ml-6">
                          {job.division}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[15px] text-gray-500 leading-relaxed mb-6 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Grid Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                          <CircleDollarSign className="w-3.5 h-3.5" />
                          SALARY GRADE
                        </div>
                        <div className="text-[15px] font-bold text-gray-800">SG-{job.sg}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                          <Hash className="w-3.5 h-3.5" />
                          ITEM NO.
                        </div>
                        <div className="text-[15px] font-bold text-gray-800">{job.itemNo}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                          <MapPin className="w-3.5 h-3.5" />
                          LOCATION
                        </div>
                        <div className="text-[15px] font-bold text-gray-800">{job.location || 'Pasig City'}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                          <CalendarDays className="w-3.5 h-3.5" />
                          DEADLINE
                        </div>
                        <div className="text-[15px] font-bold text-red-500">{job.deadline}</div>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="mb-6">
                      <h4 className="text-[15px] font-bold text-gray-800 mb-1">Key Qualifications:</h4>
                      <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2">
                        {job.qualifications}
                      </p>
                    </div>

                    {/* Days left */}
                    <div className="flex items-center gap-1.5 text-[15px] font-bold text-red-500 mb-6 mt-auto">
                      <Clock className="w-4 h-4" />
                      Only {job.daysLeft || 2} days left to apply!
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
                      <button
                        onClick={() => setViewedJob(job)}
                        className="sm:col-span-2 text-[15px] font-semibold text-[#022851] bg-white border border-[#022851]/20 hover:bg-gray-50 py-2.5 rounded-xl transition-colors flex items-center justify-center"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleApplyClick(job.id, job.title)}
                        className="sm:col-span-3 text-[15px] font-semibold text-white bg-[#022851] hover:bg-[#033a76] py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 group"
                      >
                        Apply Now
                        <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 gap-4">
              <div className="text-[13px] text-gray-500 font-bold uppercase tracking-wider bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                SHOWING {filteredPositions.length > 0 ? indexOfFirstJob + 1 : 0} TO {Math.min(indexOfLastJob, filteredPositions.length)} OF {filteredPositions.length} ENTRIES
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar max-w-full">
                <button
                  onClick={() => setCurrentJobPage(p => Math.max(1, p - 1))}
                  disabled={currentJobPage === 1}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-white border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.max(1, totalJobPages) }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentJobPage(pageNum)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg flex items-center justify-center text-[13px] font-bold transition-colors shadow-sm ${
                      currentJobPage === pageNum 
                        ? 'bg-[#0a6fa6] text-white border border-[#0a6fa6]' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentJobPage(p => Math.min(totalJobPages, p + 1))}
                  disabled={currentJobPage === totalJobPages || totalJobPages <= 1}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-white border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Details Hero Banner Section */}
          <div
            className="relative w-full overflow-hidden py-12 sm:py-16 px-6 md:px-12 flex-shrink-0"
            style={{
              background: 'linear-gradient(160deg, #05233F 0%, #06345F 58%, #0A6FA6 100%)'
            }}
          >
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#004b93] rounded-full mix-blend-screen filter blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10 flex items-center">
              <button
                onClick={() => setViewedJob(null)}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-[15px]"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Job List
              </button>
            </div>
          </div>

          <div className="max-w-5xl w-full mx-auto px-4 relative z-20 -mt-8 mb-24">
            <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 p-8 md:p-12 min-h-[500px]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
                <div>
                  <h1 className="text-[28px] font-normal text-[#00bcd4] mb-2">{viewedJob.title}</h1>
                  <div className="text-[14px] text-gray-500 mb-1">
                    Item No. <span className="font-bold text-gray-700">{viewedJob.itemNo || 'N/A'}</span>
                  </div>
                  <div className="text-[14px] text-gray-500 mb-2">{viewedJob.division || viewedJob.office}</div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-500">
                    Office of the Director
                    <span className={`inline-block px-2.5 py-0.5 text-white text-[10px] font-bold rounded uppercase tracking-wider ${viewedJob.type.toLowerCase() === 'permanent' ? 'bg-[#81c784]' : 'bg-[#eab308]'}`}>
                      {viewedJob.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleApplyClick(viewedJob.id, viewedJob.title)}
                  className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-3 rounded text-[13px] font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0"
                >
                  Apply Now
                </button>
              </div>

              <div className="text-[13px] text-gray-500 mb-10">
                Posted on <span className="font-bold text-gray-700">{viewedJob.posted || 'Jul 08, 2026'}</span> and deadline is on <span className="font-bold text-gray-700">{viewedJob.deadline || 'Jul 18, 2026'}</span>
              </div>

              <div className="flex items-center gap-8 text-[14px] text-gray-600 mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#5c6bc0] flex items-center justify-center">
                    <span className="text-[#5c6bc0] text-[12px] font-bold">₱</span>
                  </div>
                  Salary Grade : {viewedJob.sg || '4'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#5c6bc0] flex items-center justify-center">
                    <span className="text-[#5c6bc0] text-[12px] font-bold">₱</span>
                  </div>
                  Monthly Salary : PhP {viewedJob.sg === 4 ? '17,506.00' : viewedJob.sg === 9 ? '21,211.00' : viewedJob.sg === 18 ? '46,725.00' : viewedJob.sg === 19 ? '51,357.00' : viewedJob.sg === 24 ? '90,078.00' : 'Unknown'}
                </div>
              </div>

              <h3 className="text-[18px] font-bold text-gray-700 mb-6">CSC Prescribed Qualification Standard</h3>

              <div className="grid grid-cols-[120px_1fr] gap-y-5 text-[15px]">
                <div className="font-bold text-gray-700">Education:</div>
                <div className="text-gray-500 font-light leading-snug">Completion of two (2) years studies in college (prior to 2018), OR<br />Completion of Grade 12/Senior High School (starting 2016)</div>

                <div className="font-bold text-gray-700">Training:</div>
                <div className="text-gray-500 font-light">None required</div>

                <div className="font-bold text-gray-700">Experience:</div>
                <div className="text-gray-500 font-light">None required</div>

                <div className="font-bold text-gray-700">Eligibility:</div>
                <div className="text-gray-500 font-light leading-snug">Career Service Sub Professional / First Level Eligibility</div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#022851]/40 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white w-full max-w-5xl rounded-[20px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative max-h-[95vh] border border-gray-100">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors bg-white/80 rounded-full p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Panel: Job Description */}
            <div className="w-full md:w-[45%] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
              <h2 className="text-[26px] font-bold text-[#022851] mb-1 leading-tight">{selectedJob.title}</h2>
              <div className="text-[14px] text-gray-500 mb-1">
                Item No. <span className="font-bold text-[#0a6fa6]">{selectedJob.itemNo || 'N/A'}</span>
              </div>
              <div className="text-[14px] text-gray-500 mb-1">{selectedJob.division || selectedJob.office}</div>
              <div className="flex items-center gap-2 mb-6 text-[14px] text-gray-500">
                Office of the Director
                <span className="inline-block px-3 py-1 bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-extrabold rounded-full uppercase tracking-widest">
                  {selectedJob.type}
                </span>
              </div>

              <div className="text-[13px] text-gray-500 mb-10 bg-gray-50 p-3 rounded-xl border border-gray-100">
                Posted on <span className="font-bold text-[#022851]">{selectedJob.posted || 'Jul 08, 2026'}</span> and deadline is on <span className="font-bold text-red-500">{selectedJob.deadline || 'Jul 18, 2026'}</span>
              </div>

              <h3 className="text-[15px] font-extrabold text-[#022851] mb-6 uppercase tracking-wider border-b border-gray-100 pb-2">Job Description</h3>

              <div className="flex flex-col gap-3 mb-10">
                <div className="flex items-center gap-2 text-[14px] text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-[#facc15]/20 flex items-center justify-center">
                    <CircleDollarSign className="w-3.5 h-3.5 text-[#eab308]" />
                  </div>
                  Salary Grade : <span className="font-bold text-gray-800">{selectedJob.sg || '4'}</span>

                  <div className="w-6 h-6 rounded-full bg-[#facc15]/20 flex items-center justify-center ml-4">
                    <CircleDollarSign className="w-3.5 h-3.5 text-[#eab308]" />
                  </div>
                  Monthly Salary : <span className="font-bold text-gray-800">PhP {selectedJob.sg === 4 ? '17,506.00' : selectedJob.sg === 9 ? '21,211.00' : selectedJob.sg === 18 ? '46,725.00' : selectedJob.sg === 19 ? '51,357.00' : selectedJob.sg === 24 ? '90,078.00' : 'Unknown'}</span>
                </div>
              </div>

              <h3 className="text-[15px] font-extrabold text-[#022851] mb-5 border-b border-gray-100 pb-2">CSC Prescribed Qualification Standard</h3>

              <div className="grid grid-cols-[110px_1fr] gap-y-4 text-[14px]">
                <div className="font-bold text-gray-500">Education:</div>
                <div className="text-gray-700 font-medium leading-snug">Completion of two (2) years studies in college (prior to 2018), OR Completion of Grade 12/Senior High School (starting 2016)</div>

                <div className="font-bold text-gray-500">Training:</div>
                <div className="text-gray-700 font-medium">None required</div>

                <div className="font-bold text-gray-500">Experience:</div>
                <div className="text-gray-700 font-medium">None required</div>

                <div className="font-bold text-gray-500">Eligibility:</div>
                <div className="text-gray-700 font-medium leading-snug">Career Service Sub Professional / First Level Eligibility</div>
              </div>
            </div>

            {/* Right Panel: Account Creation */}
            <div className="w-full md:w-[55%] p-8 md:p-10 bg-gray-50/50 flex flex-col overflow-y-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#022851] rounded-full flex items-center justify-center shadow-inner">
                  <Pen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-[24px] font-extrabold text-[#022851]">Account Creation</h2>
              </div>

              <form className="space-y-5" onSubmit={handleSignUp}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">First name</label>
                    <input name="first_name" type="text" placeholder="First name" className="w-full p-3 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] bg-white transition-all shadow-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Last name</label>
                    <input name="surname" type="text" placeholder="Last name" className="w-full p-3 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] bg-white transition-all shadow-sm" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email address</label>
                  <input name="email_address" type="email" placeholder="Email address" className="w-full p-3 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] bg-white transition-all shadow-sm" required />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    <HelpCircle className="w-[14px] h-[14px] text-[#0a6fa6]" />
                  </div>
                  <div className="relative">
                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-3 pr-10 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] bg-white transition-all shadow-sm" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a6fa6] transition-colors">
                      {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#022851] hover:bg-[#033a76] text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 mt-8 transition-all tracking-wide text-[14px] flex items-center justify-center gap-2 group">
                  SIGN UP
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center mt-6 text-[14px] text-gray-500 font-medium">
                  Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-[#0a6fa6] font-bold hover:text-[#022851] hover:underline ml-1 transition-colors">LOG IN.</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
