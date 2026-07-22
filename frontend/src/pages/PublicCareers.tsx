import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Search, Clock, Hash, MapPin, ChevronDown, ArrowRight, CalendarDays, Star, Building2, CircleDollarSign, X, EyeOff, Eye, Pen, HelpCircle, ArrowLeft, Briefcase, Trash2, LayoutGrid, List, Users } from 'lucide-react';
import modernLogo from '../assets/modern_logo.png';
import { JobCard, JobTableList } from '../components/JobCards';

export default function PublicCareers() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<any[]>([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('card');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [viewedJob, setViewedJob] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [filterDivision, setFilterDivision] = useState('All Divisions');
  const [filterPosition, setFilterPosition] = useState('All Positions');

  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [availableDivisions, setAvailableDivisions] = useState<string[]>([]);
  const availablePositions = useMemo(() => [...new Set(positions.map(p => p.title))].filter(Boolean), [positions]);

  const filteredPositions = useMemo(() => positions.filter(job => {
    const matchSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.itemNo && job.itemNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.division && job.division.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.office && job.office.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()));

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
    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies/locations`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAvailableRegions(data.data.regions);
          setAvailableDivisions(data.data.divisions);
        }
      })
      .catch(err => console.error('Error fetching locations:', err));

    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const formatted = data.data.map((v: any) => ({
            id: v.jobClusterId || v.id,
            jobClusterId: v.jobClusterId,
            positionId: v.position_id,
            title: v.positionTitle || v.title,
            office: v.division ? `${v.division}, ${v.region}` : 'Department of Education',
            division: v.division || '',
            type: 'Permanent',
            posted: v.posting_start ? new Date(v.posting_start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            deadline: v.posting_end ? new Date(v.posting_end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            sg: v.salaryGrade || v.salary_grade,
            itemNo: v.item_no || 'Multiple Items',
            location: v.region || '',
            vacancyCount: v.vacantItemCount || v.vacancy_count || 1,
            qsEducation: v.qualificationStandards?.requiredBachelorDegree || v.education || v.required_bachelor_degree || 'Details available in the full job posting.',
            qsExperience: v.qualificationStandards?.minYearsExperience || v.experience || v.required_experience,
            qsTraining: v.qualificationStandards?.minTrainingHours || v.training || v.required_training,
            qsEligibility: v.qualificationStandards?.eligibilityRequired || v.eligibility || v.required_eligibility,
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
          applicant_number: resData.data?.applicant_number,
          email: resData.data?.email_address || email,
          expiry: now.getTime() + 3 * 60 * 60 * 1000,
        };
        localStorage.setItem('session_data', JSON.stringify(item));
        Swal.fire('Success', `Registration successful! Your Applicant ID is ${resData.data?.applicant_number}`, 'success').then(() => {
          if (selectedJob) {
            navigate(`/applicant-jobs/${selectedJob.id}`);
          } else {
            navigate('/applicant-jobs');
          }
        });
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
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-[#022851] font-bold text-lg leading-tight tracking-tight">AGAP Portal</span>
              <span className="text-[#022851]/70 text-[10px] uppercase tracking-wider font-semibold mt-0.5">Agile Gateway for Application and Placement</span>
            </div>
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
                Building the Future of Education Starts<br className="hidden sm:block" />with <span className="text-[#facc15]">the Right People.</span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed font-light">
                Join the Department of Education through a fair, transparent, and competency-based recruitment process founded on merit, fitness, accountability, and equal opportunity. Together, let's place the right people in the right roles to transform education and serve every Filipino learner.
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl w-full mx-auto px-4 pb-24 flex-1 mt-12">
            {/* Search & Filter */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Search Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                  <Search className="w-5 h-5 text-[#2563eb] shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="Search position title, division, or location..."
                    value={searchQuery}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[15px] font-medium"
                  />
                </div>
                <button
                  onClick={handleClearFilters}
                  className="hidden sm:flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md active:scale-95 shrink-0"
                >
                  <Trash2 className="w-5 h-5 text-gray-500" /> Clear
                </button>
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mr-3" />
                  <select
                    value={filterRegion}
                    onChange={(e: any) => setFilterRegion(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                  >
                    <option value="All Regions">All Regions</option>
                    {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                  <Building2 className="w-5 h-5 text-violet-500 shrink-0 mr-3" />
                  <select
                    value={filterDivision}
                    onChange={(e: any) => setFilterDivision(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                  >
                    <option value="All Divisions">All Divisions</option>
                    {availableDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                  <Briefcase className="w-5 h-5 text-amber-500 shrink-0 mr-3" />
                  <select
                    value={filterPosition}
                    onChange={(e: any) => setFilterPosition(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                  >
                    <option value="All Positions">All Positions</option>
                    {availablePositions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-500">Show</span>
                <select
                  value={jobsPerPage}
                  onChange={(e: any) => setJobsPerPage(Number(e.target.value))}
                  className="border border-gray-200 rounded px-2 py-1 text-[13px] font-medium text-gray-700 outline-none focus:border-[#0a6fa6]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-[13px] font-semibold text-gray-500">entries</span>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-1 shrink-0">
                <button onClick={() => setViewMode('card')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <LayoutGrid className="w-4 h-4" /> Card View
                </button>
                <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <List className="w-4 h-4" /> Table View
                </button>
              </div>
            </div>

            {filteredPositions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-medium">
                No positions found matching your criteria.
              </div>
            ) : viewMode === 'table' ? (
              <JobTableList 
                jobs={currentJobs} 
                tab="job-board" 
                isPublic={true}
                onCardClick={setViewedJob}
                onApplyClick={(job: any) => handleApplyClick(job.id, job.title)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    tab="job-board" 
                    isPublic={true}
                    onCardClick={setViewedJob}
                    onApplyClick={(job: any) => handleApplyClick(job.id, job.title)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalJobPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 mt-6 border-t border-gray-100 gap-4">
                <div className="text-[13px] text-gray-500 font-medium">
                  Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, filteredPositions.length)} of {filteredPositions.length} entries
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar max-w-full">
                  <button
                    onClick={() => setCurrentJobPage(p => Math.max(1, p - 1))}
                    disabled={currentJobPage === 1}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalJobPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentJobPage(pageNum)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg flex items-center justify-center text-[13px] font-bold transition-colors ${currentJobPage === pageNum
                        ? 'bg-[#0a6fa6] text-white border border-[#0a6fa6]'
                        : 'text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentJobPage(p => Math.min(totalJobPages, p + 1))}
                    disabled={currentJobPage === totalJobPages}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
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
            <div className="bg-white rounded-[20px] shadow-[0_8px_25px_rgba(251,191,36,0.15)] border-[1.5px] border-[#fbbf24] p-8 md:p-12 min-h-[500px]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                <div>
                  <h1 className="text-[28px] font-bold text-[#2563eb] mb-2">{viewedJob.title}</h1>
                  <div className="text-[14px] text-gray-600 mb-1 font-medium">
                    Item No. <span className="font-bold text-gray-800">{viewedJob.itemNo || 'N/A'}</span>
                  </div>
                  <div className="text-[14px] text-gray-600 mb-2 font-medium">{viewedJob.division || viewedJob.office}</div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-600 font-medium">
                    Office of the Director
                    <span className={`inline-block px-3 py-1 text-white text-[10px] font-extrabold rounded-full uppercase tracking-widest ${viewedJob.type.toLowerCase() === 'permanent' ? 'bg-[#2e7d32]' : 'bg-[#eab308]'}`}>
                      {viewedJob.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleApplyClick(viewedJob.id, viewedJob.title)}
                  className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-3.5 rounded-xl text-[14px] font-bold tracking-wide transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Briefcase className="w-4 h-4" /> APPLY NOW
                </button>
              </div>

              <div className="text-[14px] text-gray-600 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                Posted on <span className="font-bold text-gray-800">{viewedJob.posted || 'Jul 08, 2026'}</span> and deadline is on <span className="font-bold text-red-500">{viewedJob.deadline || 'Jul 18, 2026'}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="flex items-center gap-4 px-6 py-4 bg-[#f0f4f8] rounded-2xl flex-1">
                  <CircleDollarSign className="w-8 h-8 text-blue-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">SALARY GRADE</span>
                    <span className="text-[20px] font-extrabold text-gray-800 leading-none">{viewedJob.sg || '4'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-[#f0fdf4] rounded-2xl flex-1">
                  <Users className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-1">VACANCIES</span>
                    <span className="text-[20px] font-extrabold text-gray-800 leading-none">{viewedJob.vacancyCount || 0}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-[18px] font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3 tracking-wide">CSC Prescribed Qualification Standard</h3>

              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-6 text-[15px] bg-white">
                <div className="font-bold text-gray-900 tracking-wide">Education:</div>
                <div className="text-gray-600 font-medium leading-relaxed">{viewedJob.qsEducation || 'Completion of two (2) years studies in college (prior to 2018), OR Completion of Grade 12/Senior High School (starting 2016)'}</div>

                <div className="font-bold text-gray-900 tracking-wide">Training:</div>
                <div className="text-gray-600 font-medium">{viewedJob.qsTraining || 'None required'}</div>

                <div className="font-bold text-gray-900 tracking-wide">Experience:</div>
                <div className="text-gray-600 font-medium">{viewedJob.qsExperience || 'None required'}</div>

                <div className="font-bold text-gray-900 tracking-wide">Eligibility:</div>
                <div className="text-gray-600 font-medium leading-relaxed">{viewedJob.qsEligibility || 'Career Service Sub Professional / First Level Eligibility'}</div>
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
