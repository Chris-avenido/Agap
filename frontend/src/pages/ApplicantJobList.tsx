import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Search, Clock, Hash, LogOut,
  Briefcase, ArrowRight, CalendarDays, Star,
  Building2, CircleDollarSign, MapPin,
  FileText, Bookmark, SlidersHorizontal,
  GraduationCap, ChevronLeft, ChevronRight, HelpCircle, Plus, Trash2
} from 'lucide-react';
import CustomDatePicker from '../components/CustomDatePicker';
// @ts-ignore
import { regions, provinces, city_mun, barangays } from 'phil-reg-prov-mun-brgy';

const positions = [
  {
    id: 1,
    title: 'Information Technology Officer I',
    office: 'Information and Communications Technology Service',
    division: 'ICTS - Applications Development',
    type: 'Temporary',
    posted: 'Jun 30, 2026',
    deadline: 'Jul 14, 2026',
    sg: 18,
    itemNo: 'ITO-18-7102',
    location: 'Pasig City',
    description: 'Develops and maintains web applications and information systems for the department. Provides technical support for ICT initiatives and digital transformation programs.',
    daysLeft: 6
  },
  {
    id: 2,
    title: 'Chief Education Program Specialist',
    office: 'Policy and Research Service',
    division: 'Office of the Secretary',
    type: 'Permanent',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 09, 2026',
    sg: 24,
    itemNo: 'CEPS-24-1998',
    location: 'Pasig City',
    description: 'Plans, develops, and implements education policies and programs. Provides technical leadership in research and policy development.',
    daysLeft: 2
  },
  {
    id: 3,
    title: 'Senior Education Program Specialist',
    office: 'Policy and Research Service',
    division: 'Office of the Secretary',
    type: 'Permanent',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 16, 2026',
    sg: 19,
    itemNo: 'SEPS-19-2005',
    location: 'Pasig City',
    description: 'Assists in planning, developing, and implementing education policies and programs. Conducts research and analysis on sector trends.',
    daysLeft: 9
  },
  {
    id: 4,
    title: 'Administrative Assistant III',
    office: 'Human Resources Division',
    division: 'Administrative Service',
    type: 'Permanent',
    posted: 'Jun 28, 2026',
    deadline: 'Jul 08, 2026',
    sg: 9,
    itemNo: 'ADAS3-12-2015',
    location: 'Pasig City',
    description: 'Provides administrative and clerical support to the division. Handles correspondence, records management, and scheduling of activities.',
    daysLeft: 1
  }
];

export default function ApplicantJobList() {
  const navigate = useNavigate();
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'job-board' | 'my-applications' | 'my-saved-jobs' | 'application-form'>('job-board');
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(new Date(1997, 7, 11)); // Default Aug 11, 1997 per reference
  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [currentStep, setCurrentStep] = useState('Personal Information');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Residential Address States
  const [resRegion, setResRegion] = useState('');
  const [resProvince, setResProvince] = useState('');
  const [resCity, setResCity] = useState('');
  const [resBarangay, setResBarangay] = useState('');

  // Permanent Address States
  const [permRegion, setPermRegion] = useState('');
  const [permProvince, setPermProvince] = useState('');
  const [permCity, setPermCity] = useState('');
  const [permBarangay, setPermBarangay] = useState('');

  // Derived location arrays
  const resProvincesList = resRegion ? provinces.filter((p: any) => p.reg_code === resRegion) : [];
  const resCitiesList = resProvince ? city_mun.filter((c: any) => c.prov_code === resProvince) : [];
  const resBarangaysList = resCity ? barangays.filter((b: any) => b.mun_code === resCity) : [];

  const permProvincesList = permRegion ? provinces.filter((p: any) => p.reg_code === permRegion) : [];
  const permCitiesList = permProvince ? city_mun.filter((c: any) => c.prov_code === permProvince) : [];
  const permBarangaysList = permCity ? barangays.filter((b: any) => b.mun_code === permCity) : [];

  const itemsPerPage = 5;

  const totalSteps = 13;
  const percentage = ((completedSteps.length / totalSteps) * 100).toFixed(2);

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Personal Information')) {
      setCompletedSteps(prev => [...prev, 'Personal Information']);
    }
    setCurrentStep('Family Background');
  };

  const [childrenList, setChildrenList] = useState<any[]>([{ name: '', dob: null }]);

  const handleFamilyBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Family Background')) {
      setCompletedSteps(prev => [...prev, 'Family Background']);
    }
    setCurrentStep('Educational Background');
  };

  const handleEducationalBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Educational Background')) {
      setCompletedSteps(prev => [...prev, 'Educational Background']);
    }
    setCurrentStep('Civil Service Eligibility');
  };

  const [civilServiceList, setCivilServiceList] = useState<any[]>([{ eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }]);

  const handleCivilServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Civil Service Eligibility')) {
      setCompletedSteps(prev => [...prev, 'Civil Service Eligibility']);
    }
    setCurrentStep('Work Experience');
  };

  const [workExperienceList, setWorkExperienceList] = useState<any[]>([{ fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }]);

  const handleWorkExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Work Experience')) {
      setCompletedSteps(prev => [...prev, 'Work Experience']);
    }
    setCurrentStep('Voluntary Work');
  };

  const [voluntaryWorkList, setVoluntaryWorkList] = useState<any[]>([{ nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }]);

  const handleVoluntaryWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Voluntary Work')) {
      setCompletedSteps(prev => [...prev, 'Voluntary Work']);
    }
    setCurrentStep('Learning & Development');
  };

  const [learningDevelopmentList, setLearningDevelopmentList] = useState<any[]>([{ title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }]);

  const handleLearningDevelopmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Learning & Development')) {
      setCompletedSteps(prev => [...prev, 'Learning & Development']);
    }
    setCurrentStep('Other Information');
  };

  const [skillsList, setSkillsList] = useState<{ value: string }[]>([{ value: '' }]);
  const [distinctionsList, setDistinctionsList] = useState<{ value: string }[]>([{ value: '' }]);
  const [membershipsList, setMembershipsList] = useState<{ value: string }[]>([{ value: '' }]);

  const handleOtherInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Other Information')) {
      setCompletedSteps(prev => [...prev, 'Other Information']);
    }
    setCurrentStep('Legal Questionnaire');
  };

  const [questionnaire, setQuestionnaire] = useState<Record<string, { answer: string, details: string }>>({});
  const [referencesList, setReferencesList] = useState<any[]>([{ name: '', address: '', telephone: '' }]);
  const [governmentId, setGovernmentId] = useState({ type: '', idNo: '', datePlace: '' });

  const handleLegalQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completedSteps.includes('Legal Questionnaire')) {
      setCompletedSteps(prev => [...prev, 'Legal Questionnaire']);
    }
    // Proceed to final submission or next step
  };

  const indexOfLastApp = currentPage * itemsPerPage;
  const indexOfFirstApp = indexOfLastApp - itemsPerPage;
  const currentApps = applications.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAppliedJobIds(data.data.map((app: any) => app.position_id));
          setApplications(data.data.map((app: any) => {
            const jobDetails = positions.find(p => p.id === app.position_id) || {} as any;
            return {
              id: app.id,
              positionId: app.position_id,
              position: app.job_title || jobDetails.title || 'Unknown Position',
              office: jobDetails.office || 'Department of Education',
              type: jobDetails.type || 'Permanent',
              posted: jobDetails.posted || 'N/A',
              deadline: jobDetails.deadline || 'N/A',
              sg: jobDetails.sg || 'N/A',
              itemNo: jobDetails.itemNo || 'N/A',
              date: new Date(app.created_at).toLocaleDateString(),
              stage: app.status || 'Applied',
              status: 'Active'
            };
          }));
        }
      })
      .catch(err => console.error('Error fetching applications:', err));

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/saved-jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSavedJobIds(data.data.map((job: any) => job.position_id));
        }
      })
      .catch(err => console.error('Error fetching saved jobs:', err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_data');
    navigate('/');
  };

  const handleApply = (job: any) => {
    setApplyingJob(job);
    setActiveTab('application-form');
  };

  const submitApplication = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!applyingJob) return;

    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        Swal.fire('Error', 'You must be logged in to apply.', 'error');
        navigate('/login');
        return;
      }

      const job = applyingJob;

      const session = JSON.parse(sessionStr);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/apply-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantId: session.id,
          positionId: job.id,
          jobTitle: job.title
        })
      });

      if (response.ok) {
        Swal.fire('Success', 'Successfully applied for ' + job.title + '!', 'success');
        setAppliedJobIds(prev => [...prev, job.id]);
        setApplications(prev => [...prev, {
          id: Date.now(),
          positionId: job.id,
          position: job.title,
          office: job.office,
          type: job.type,
          posted: job.posted,
          deadline: job.deadline,
          sg: job.sg,
          itemNo: job.itemNo,
          date: new Date().toLocaleDateString(),
          stage: 'Applied',
          status: 'Active'
        }]);
      } else {
        Swal.fire('Error', 'Failed to apply. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error applying for job.', 'error');
    }
  };

  const toggleSaveJob = async (jobId: number) => {
    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        navigate('/login');
        return;
      }
      const session = JSON.parse(sessionStr);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/save-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positionId: jobId })
      });
      const data = await response.json();

      if (data.success) {
        setSavedJobIds(prev =>
          prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to save job.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-[#003366] text-white px-6 py-4 flex justify-between items-center z-30 shadow-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/applicant-dashboard')}>
          <div className="w-10 h-10 bg-[#facc15] rounded-[10px] flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-[#003366]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-tight tracking-wide">DEPED</span>
            <span className="text-gray-300 text-[10px] uppercase tracking-wider font-semibold mt-0.5">DEPARTMENT OF EDUCATION</span>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-white hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Tabs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-100 px-2 sm:px-0">
            <div className="flex items-center overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab('job-board')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'job-board' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Briefcase className="w-[18px] h-[18px]" /> Job Board
              </button>
              <button
                onClick={() => setActiveTab('my-applications')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-applications' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FileText className="w-[18px] h-[18px]" /> My Applications
              </button>
              <button
                onClick={() => setActiveTab('my-saved-jobs')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-saved-jobs' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Bookmark className="w-[18px] h-[18px]" /> My Saved Jobs
              </button>
            </div>

            {activeTab === 'application-form' && (
              <div className="flex items-center gap-2 px-4 py-3 lg:py-0 overflow-x-auto hide-scrollbar w-full lg:w-auto border-t lg:border-t-0 border-gray-100">
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">View Profile</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">Print PDS</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">Work Experience Sheet</button>
                <button onClick={submitApplication} className="bg-gray-600 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-700 transition-colors shadow-sm border border-gray-700">Submit Application</button>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {activeTab === 'job-board' && (
              <>
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-gray-300 transition-colors focus-within:border-[#003366] focus-within:ring-1 focus-within:ring-[#003366]">
                    <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                    <input
                      type="text"
                      placeholder="Search position title, division, or location..."
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[15px]"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold text-[15px] hover:bg-gray-50 transition-colors shrink-0">
                    <SlidersHorizontal className="w-5 h-5" /> Filters
                  </button>
                </div>

                <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  SHOWING 1 TO {positions.length} OF {positions.length} ENTRIES
                </p>

                {/* Job List */}
                <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
                  {positions.map((job) => {
                    const isTemporary = job.type.toLowerCase() === 'temporary';
                    return (
                      <div key={job.id} className="py-8 flex flex-col lg:flex-row justify-between items-start gap-6 group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl">

                        {/* Left Content */}
                        <div
                          className="flex-1 space-y-3.5 cursor-pointer"
                          onClick={() => navigate(`/applicant-jobs/${job.id}`)}
                        >
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${isTemporary ? 'bg-[#fff8e1] text-[#eab308] border-[#fef08a]' : 'bg-[#e8f5e9] text-[#2e7d32] border-[#bbf7d0]'}`}>
                              {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-extrabold tracking-widest uppercase">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></div> OPEN
                            </span>
                            <span className="text-[13px] font-medium text-gray-500 ml-1">{job.office}</span>
                          </div>

                          {/* Title & Division */}
                          <div>
                            <h3 className="text-xl sm:text-[22px] font-bold text-[#003366] leading-tight mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <Building2 className="w-[18px] h-[18px] text-gray-400" />
                              <span>{job.division || job.office}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl line-clamp-2">
                            {job.description}
                          </p>

                          {/* Specs Row */}
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-gray-500 pt-2">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-gray-400" />
                              <span>Posted {job.posted} • Deadline {job.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CircleDollarSign className="w-4 h-4 text-gray-400" />
                              <span>Salary Grade {job.sg}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Hash className="w-4 h-4 text-gray-400" />
                              <span>Item No. {job.itemNo}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{job.location || 'Pasig City'}</span>
                            </div>
                          </div>

                          {/* Alert Row */}
                          <div className="flex items-center gap-1.5 text-[13px] font-bold text-red-500 pt-1">
                            <Clock className="w-4 h-4" />
                            Only {job.daysLeft} days left to apply!
                          </div>
                        </div>

                        {/* Right Buttons */}
                        <div className="flex flex-col gap-3 w-full lg:w-[160px] shrink-0 lg:mt-2">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-semibold transition-colors text-sm ${savedJobIds.includes(job.id)
                              ? 'border-[#3b82f6] text-[#3b82f6] bg-blue-50 hover:bg-blue-100'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                          >
                            <Star className={`w-[18px] h-[18px] ${savedJobIds.includes(job.id) ? 'fill-[#3b82f6]' : ''}`} />
                            {savedJobIds.includes(job.id) ? 'Saved' : 'Save'}
                          </button>
                          {appliedJobIds.includes(job.id) ? (
                            <button
                              disabled
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-400 text-white font-extrabold rounded-xl shadow-sm text-sm cursor-not-allowed"
                            >
                              Already Applied
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApply(job)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#facc15] hover:bg-[#eab308] text-[#003366] font-extrabold rounded-xl transition-colors shadow-sm group text-sm"
                            >
                              Apply Now
                              <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeTab === 'my-applications' && (
              <div className="space-y-4 max-w-4xl">
                {applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium border border-gray-200 rounded-xl">
                    You haven't applied for any positions yet.
                  </div>
                ) : (
                  currentApps.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-200 bg-white rounded-md p-5 hover:border-blue-300 transition-colors shadow-sm cursor-pointer"
                      onClick={() => navigate(`/applicant-jobs/${app.positionId}`)}
                    >
                      <div className="mb-2">
                        <span className="text-[#3b82f6] text-lg font-medium hover:underline">
                          {app.position} ({app.stage})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-600 text-sm">{app.office}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold text-white rounded ${app.type.toLowerCase() === 'permanent' ? 'bg-[#5cb85c]' : 'bg-[#f0ad4e]'} uppercase tracking-wider`}>
                          {app.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Posted on <strong>{app.posted}</strong> and deadline of application is on <strong>{app.deadline}</strong></span>
                      </div>
                      <div className="flex items-center gap-5 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CircleDollarSign className="w-4 h-4 text-[#5c7a99]" />
                          <span>Salary Grade : {app.sg}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-4 h-4 text-[#5c7a99]" />
                          <span>Item No : {app.itemNo}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {applications.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 text-gray-500 hover:text-[#3b82f6] disabled:opacity-50 disabled:hover:text-gray-500"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="bg-[#3b82f6] text-white w-8 h-8 flex items-center justify-center rounded-md font-medium text-sm">
                      {currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1 text-gray-500 hover:text-[#3b82f6] disabled:opacity-50 disabled:hover:text-gray-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'my-saved-jobs' && (
              <div className="max-w-[1200px]">
                <h3 className="text-xl font-bold text-[#003366] mb-6">My Saved Jobs</h3>
                {savedJobIds.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-xl shadow-sm border border-gray-200">
                    You haven't saved any jobs yet.
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100 bg-white px-6 rounded-xl shadow-sm border border-gray-200">
                    {positions.filter(job => savedJobIds.includes(job.id)).map((job) => {
                      const isTemporary = job.type.toLowerCase() === 'temporary';
                      return (
                        <div key={job.id} className="py-8 flex flex-col lg:flex-row justify-between items-start gap-6 group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl">
                          <div
                            className="flex-1 space-y-3.5 cursor-pointer"
                            onClick={() => navigate(`/applicant-jobs/${job.id}`)}
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${isTemporary ? 'bg-[#fff8e1] text-[#eab308] border-[#fef08a]' : 'bg-[#e8f5e9] text-[#2e7d32] border-[#bbf7d0]'}`}>
                                {job.type}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-extrabold tracking-widest uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></div> OPEN
                              </span>
                              <span className="text-[13px] font-medium text-gray-500 ml-1">{job.office}</span>
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-[22px] font-bold text-[#003366] leading-tight mb-2">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Building2 className="w-[18px] h-[18px] text-gray-400" />
                                <span>{job.division || job.office}</span>
                              </div>
                            </div>
                            <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl line-clamp-2">
                              {job.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-gray-500 pt-2">
                              <div className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                <span>Posted {job.posted} • Deadline {job.deadline}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <CircleDollarSign className="w-4 h-4 text-gray-400" />
                                <span>Salary Grade {job.sg}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 w-full lg:w-[160px] shrink-0 lg:mt-2">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-semibold transition-colors text-sm border-[#3b82f6] text-[#3b82f6] bg-blue-50 hover:bg-blue-100`}
                            >
                              <Star className={`w-[18px] h-[18px] fill-[#3b82f6]`} /> Saved
                            </button>
                            {appliedJobIds.includes(job.id) ? (
                              <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-400 text-white font-extrabold rounded-xl shadow-sm text-sm cursor-not-allowed">
                                Already Applied
                              </button>
                            ) : (
                              <button
                                onClick={() => handleApply(job)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#facc15] hover:bg-[#eab308] text-[#003366] font-extrabold rounded-xl transition-colors shadow-sm group text-sm"
                              >
                                Apply Now <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'application-form' && applyingJob && (
              <div className="flex flex-col md:flex-row gap-6 bg-[#eff3f8] p-6 -mx-6 -mb-8 mt-[-24px] min-h-[800px]">
                {/* Left Sidebar */}
                <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col bg-white shadow-sm shrink-0 h-fit border border-gray-100 rounded-sm overflow-hidden">
                  <div className="bg-[#1a73e8] p-5 flex items-center gap-4 border-b-4 border-red-500">
                    <div className="w-[60px] h-[60px] bg-white rounded-full flex flex-col items-center justify-center font-extrabold text-[11px] leading-none text-center text-black shrink-0 shadow-sm">
                      <span>UPLOAD</span>
                      <span>PHOTO</span>
                    </div>
                    <div className="flex flex-col text-white">
                      <span className="font-bold text-[16px] uppercase tracking-wide">CHRIS MENDOZA</span>
                      <span className="text-[13px] leading-snug mt-1 opacity-90">Applying for {applyingJob.title}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {[
                      { name: 'Personal Information', icon: FileText },
                      { name: 'Family Background', icon: FileText },
                      { name: 'Educational Background', icon: GraduationCap },
                      { name: 'Eligibility', icon: FileText },
                      { name: 'Work Experiences', icon: Briefcase },
                      { name: 'Voluntary Works', icon: FileText },
                      { name: 'Learning and Development Interventions', icon: FileText },
                      { name: 'Other Information', icon: FileText },
                      { name: 'Questionnaire', icon: FileText },
                      { name: 'References', icon: FileText },
                      { name: 'Government Issued IDs', icon: FileText },
                      { name: 'Supporting Document/s', icon: FileText },
                      { name: 'Specializations', icon: FileText }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = currentStep === item.name;
                      const isCompleted = completedSteps.includes(item.name);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentStep(item.name)}
                          className={`flex items-center justify-between px-5 py-3.5 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${isActive || isCompleted ? 'bg-[#34a853]' : 'bg-gray-100'}`}>
                              <Icon className={`w-4 h-4 ${isActive || isCompleted ? 'text-white' : 'text-gray-300'}`} />
                            </div>
                            <span className={`text-[14px] font-semibold tracking-wide ${isActive ? 'text-[#1a73e8]' : 'text-[#8599ad]'}`}>{item.name}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#34a853]' : (isActive ? 'bg-red-500' : 'bg-gray-200')}`}></div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex flex-col mt-4 border border-gray-200 rounded p-4 mx-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-[34px] h-[38px] bg-gray-100 flex flex-col items-center justify-center relative border border-gray-200 rounded-sm overflow-hidden shrink-0">
                        <div className="absolute top-1 text-orange-400 font-extrabold text-[14px]">↑</div>
                        <div className="w-full h-1.5 bg-blue-500 absolute bottom-0"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[13px] text-gray-700">Upload your Resume</span>
                          <HelpCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white rounded-full" />
                        </div>
                        <span className="text-[11px] text-gray-500">Upload your latest resume here.</span>
                      </div>
                    </div>
                    <button className="bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium w-fit hover:bg-gray-100 transition-colors">
                      Upload Now
                    </button>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Progress Box */}
                  <div className="bg-white p-10 border border-gray-200 shadow-sm flex flex-col items-center text-center rounded-sm">
                    <h2 className="text-[26px] font-normal text-gray-700 mb-4">Complete your Profile</h2>
                    <p className="text-gray-500 text-[15px] mb-8 max-w-3xl leading-relaxed font-light">
                      Welcome to AGAP Portal. Get started by filling in the rest of your profile below as it will improve your chances of getting accepted.
                    </p>

                    <div className="w-full max-w-4xl bg-gray-100 h-[10px] rounded-full mb-6 overflow-hidden">
                      <div className="bg-[#34a853] h-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p className="text-gray-500 text-[14px] mb-4">
                      Your profile is <span className="font-bold text-gray-700">{percentage}% complete</span>. In order to complete your profile, please provide us with the required information:
                    </p>
                    <p className="font-bold text-[13px] text-gray-700 leading-relaxed max-w-4xl tracking-wide">
                      Profile Photo, Personal Information, Family Background, Educational Background, Eligibility, Work Experiences, Voluntary Works, Learning and Development Interventions, Other Information, Questionnaire, References, Government Issued IDs, Supporting Document/s, Specializations
                    </p>
                  </div>

                  {/* Dynamic Content Box */}
                  <div className="bg-white p-10 border border-gray-200 shadow-sm flex flex-col items-center rounded-sm">
                    <h3 className="text-[18px] text-gray-500 uppercase tracking-widest mb-10 text-center font-light">{currentStep}</h3>

                    {currentStep === 'Personal Information' && (
                      <form className="w-full max-w-4xl space-y-7" onSubmit={handlePersonalInfoSubmit}>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Name <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col">
                              <input type="text" required defaultValue="CHRIS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">First Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Middle Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" required defaultValue="MENDOZA" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Last Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter extension name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Extension Name</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Birth Details <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-[35%] flex flex-col z-50">
                              <CustomDatePicker
                                value={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                placeholder="Select date of birth"
                              />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <input type="text" required placeholder="Enter place of birth" className="w-full border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">City, town, etc.</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px]">Sex <span className="text-red-500">*</span></label>
                          <div className="flex gap-4">
                            <button type="button" className="bg-[#3498db] text-white px-10 py-2.5 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px]">
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div> MALE
                            </button>
                            <button type="button" className="bg-gray-100 text-gray-500 px-10 py-2.5 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 border border-gray-200 min-w-[120px] hover:bg-gray-200 transition-colors">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div> FEMALE
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px]">Civil Status <span className="text-red-500">*</span></label>
                          <select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 min-w-[200px]">
                            <option value="">Select civil status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Separated">Separated</option>
                          </select>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                            Statistics <span className="text-red-500">*</span>
                            <div className="text-[10px] text-gray-400 font-normal mt-0.5 leading-tight">Specify your Height,<br />Weight, and Blood Type</div>
                          </label>
                          <div className="flex-1 flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/3 flex flex-col">
                              <div className="flex">
                                <input type="text" required placeholder="Enter height" className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">m</span>
                              </div>
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Height</span>
                            </div>
                            <div className="w-full sm:w-1/3 flex flex-col">
                              <div className="flex">
                                <input type="text" required placeholder="Enter weight" className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">kg</span>
                              </div>
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Weight</span>
                            </div>
                            <div className="w-full sm:w-1/3 flex flex-col">
                              <select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none">
                                <option value="">Select blood type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="Unknown">Unknown</option>
                              </select>
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Blood Type</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px]">
                            Agency Employee No.<br /><span className="text-[12px] text-gray-400 font-normal">(if any)</span>
                          </label>
                          <input type="text" placeholder="Enter agency employee number" className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px]">Citizenship <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
                            <select required className="w-full sm:w-[240px] border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none">
                              <option value="">Enter citizenship</option>
                              <option value="Filipino">Filipino</option>
                              <option value="Dual Citizenship">Dual Citizenship</option>
                            </select>
                            <div className="flex items-center gap-6">
                              <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                                <input type="radio" name="citizenship_type" className="w-3.5 h-3.5 text-blue-600 border-gray-300" />
                                by Birth
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                                <input type="radio" name="citizenship_type" className="w-3.5 h-3.5 text-blue-600 border-gray-300" />
                                by Naturalization
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Residential Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter house / block / lot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">House / Block / Lot No.</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Street</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Subdivision / Village</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">ZIP Code</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <div className="flex flex-col">
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none"
                                  value={resRegion}
                                  onChange={(e) => {
                                    setResRegion(e.target.value);
                                    setResProvince('');
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                >
                                  <option value="">Select region</option>
                                  {regions.map((r: any) => (
                                    <option key={r.reg_code} value={r.reg_code}>{r.name}</option>
                                  ))}
                                </select>
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Region</span>
                              </div>
                              <div className="flex flex-col">
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                  value={resProvince}
                                  onChange={(e) => {
                                    setResProvince(e.target.value);
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                  disabled={!resRegion}
                                >
                                  <option value="">Select province</option>
                                  {resProvincesList.map((p: any) => (
                                    <option key={p.prov_code} value={p.prov_code}>{p.name}</option>
                                  ))}
                                </select>
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Province</span>
                              </div>
                              <div className="flex flex-col">
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                  value={resCity}
                                  onChange={(e) => {
                                    setResCity(e.target.value);
                                    setResBarangay('');
                                  }}
                                  disabled={!resProvince}
                                >
                                  <option value="">Select city / municipality</option>
                                  {resCitiesList.map((c: any) => (
                                    <option key={c.mun_code} value={c.mun_code}>{c.name}</option>
                                  ))}
                                </select>
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">City / Municipality</span>
                              </div>
                              <div className="flex flex-col">
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                  value={resBarangay}
                                  onChange={(e) => setResBarangay(e.target.value)}
                                  disabled={!resCity}
                                >
                                  <option value="">Select barangay</option>
                                  {resBarangaysList.map((b: any, idx: number) => (
                                    <option key={idx} value={b.name}>{b.name}</option>
                                  ))}
                                </select>
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Barangay</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Permanent Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 mb-1">
                              <input
                                type="checkbox"
                                className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded"
                                checked={sameAsResidential}
                                onChange={(e) => setSameAsResidential(e.target.checked)}
                              />
                              <span className="font-bold">Same as Residential Address?</span> <span className="italic text-gray-400">(check if permanent address is same with the above address)</span>
                            </label>

                            {!sameAsResidential && (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                  <div className="flex flex-col">
                                    <input type="text" placeholder="Enter house / hlock / hot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">House / Block / Lot No.</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <input type="text" placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Street</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <input type="text" placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Subdivision / Village</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <input type="text" placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">ZIP Code</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                  <div className="flex flex-col">
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none"
                                      value={permRegion}
                                      onChange={(e) => {
                                        setPermRegion(e.target.value);
                                        setPermProvince('');
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                    >
                                      <option value="">Select region</option>
                                      {regions.map((r: any) => (
                                        <option key={r.reg_code} value={r.reg_code}>{r.name}</option>
                                      ))}
                                    </select>
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Region</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                      value={permProvince}
                                      onChange={(e) => {
                                        setPermProvince(e.target.value);
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                      disabled={!permRegion}
                                    >
                                      <option value="">Select province</option>
                                      {permProvincesList.map((p: any) => (
                                        <option key={p.prov_code} value={p.prov_code}>{p.name}</option>
                                      ))}
                                    </select>
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Province</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                      value={permCity}
                                      onChange={(e) => {
                                        setPermCity(e.target.value);
                                        setPermBarangay('');
                                      }}
                                      disabled={!permProvince}
                                    >
                                      <option value="">Select city / municipality</option>
                                      {permCitiesList.map((c: any) => (
                                        <option key={c.mun_code} value={c.mun_code}>{c.name}</option>
                                      ))}
                                    </select>
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">City / Municipality</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50"
                                      value={permBarangay}
                                      onChange={(e) => setPermBarangay(e.target.value)}
                                      disabled={!permCity}
                                    >
                                      <option value="">Select barangay</option>
                                      {permBarangaysList.map((b: any, idx: number) => (
                                        <option key={idx} value={b.name}>{b.name}</option>
                                      ))}
                                    </select>
                                    <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Barangay</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Contact Nos. <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <input type="text" required placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Telephone No.</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" required placeholder="Enter mobile no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Mobile No.</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Email Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <input type="email" required defaultValue="avenidochristop@gmail.com" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Primary</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="email" placeholder="Enter alternate" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Alternate</span>
                            </div>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Family Background' && (
                      <form className="w-full max-w-4xl space-y-7" onSubmit={handleFamilyBackgroundSubmit}>

                        {/* Spouse */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Surname</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">First Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Middle Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="e.g. JR., SR" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name Extension</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Details</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter occupation" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Occupation</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter employer / business name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Employer/Business Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter business address" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Business Address</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Telephone No.</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Father */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Father's Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Surname</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">First Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Middle Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="e.g. JR., SR" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name Extension</span>
                            </div>
                          </div>
                        </div>

                        {/* Mother */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Mother's Maiden Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Surname</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">First Name</span>
                            </div>
                            <div className="flex flex-col">
                              <input type="text" placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Middle Name</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Children Details */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[140px] lg:text-right font-bold text-gray-600 text-[14px] pt-2">Children Details <span className="text-[11px] font-normal text-gray-400 italic block leading-tight mt-0.5">(List all children)</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            {childrenList.map((child, idx) => (
                              <div key={idx} className="flex gap-4 items-start">
                                <div className="flex-1 flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter child's full name"
                                    value={child.name}
                                    onChange={(e) => {
                                      const newChildren = [...childrenList];
                                      newChildren[idx].name = e.target.value;
                                      setChildrenList(newChildren);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name of Child (Write full name)</span>
                                </div>
                                <div className="w-[200px] flex flex-col z-50">
                                  <CustomDatePicker
                                    value={child.dob}
                                    onChange={(date) => {
                                      const newChildren = [...childrenList];
                                      newChildren[idx].dob = date;
                                      setChildrenList(newChildren);
                                    }}
                                    placeholder="Select date of birth"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Date of Birth</span>
                                </div>
                                <div className="pt-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (childrenList.length > 1) {
                                        setChildrenList(childrenList.filter((_, i) => i !== idx));
                                      }
                                    }}
                                    className={`p-2.5 rounded border transition-colors ${childrenList.length > 1 ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
                                    disabled={childrenList.length === 1}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => setChildrenList([...childrenList, { name: '', dob: null }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Child
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Personal Information')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Educational Background' && (
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleEducationalBackgroundSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please fill in your educational background. Write "N/A" if not applicable.</p>
                        </div>
                        {[
                          { id: 'elementary', label: 'Elementary', required: true },
                          { id: 'secondary', label: 'Secondary', required: true },
                          { id: 'vocational', label: 'Vocational / Trade Course', required: false },
                          { id: 'college', label: 'College', required: true },
                          { id: 'graduate', label: 'Graduate Studies', required: false }
                        ].map((level) => (
                          <div key={level.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                              <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">{level.label} {level.required && <span className="text-red-500">*</span>}</h3>
                            </div>
                            <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                              <div className="flex flex-col lg:col-span-2">
                                <input type="text" required={level.required} placeholder="Enter name of school" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name of School (Write in full)</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" required={level.required} placeholder="Enter degree/course" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Basic Education/Degree/Course (Write in full)</span>
                              </div>

                              <div className="flex flex-col">
                                <div className="flex gap-3">
                                  <input type="text" required={level.required} placeholder="From (Year)" className="w-1/2 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                  <input type="text" required={level.required} placeholder="To (Year)" className="w-1/2 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                </div>
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Period of Attendance (From - To)</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter level/units" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Highest Level/Units Earned (if not graduated)</span>
                              </div>
                              <div className="flex flex-col">
                                <input type="text" placeholder="Enter year" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Year Graduated</span>
                              </div>

                              <div className="flex flex-col lg:col-span-3">
                                <input type="text" placeholder="Enter scholarship or academic honors" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50" />
                                <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Scholarship/Academic Honors Received</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Family Background')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Civil Service Eligibility' && (
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleCivilServiceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your civil service eligibility. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {civilServiceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Eligibility #{idx + 1}</h3>
                                {civilServiceList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCivilServiceList(civilServiceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter eligibility name"
                                    value={item.eligibility}
                                    onChange={(e) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].eligibility = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Career Service/RA 1080 (Board/Bar)/Under Special Laws/CES/CSEE</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter rating"
                                    value={item.rating}
                                    onChange={(e) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].rating = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Rating (if applicable)</span>
                                </div>

                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.date}
                                    onChange={(date) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].date = date;
                                      setCivilServiceList(newList);
                                    }}
                                    placeholder="Select date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Date of Examination / Conferment</span>
                                </div>
                                <div className="flex flex-col lg:col-span-2">
                                  <input
                                    type="text"
                                    placeholder="Enter place of examination"
                                    value={item.place}
                                    onChange={(e) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].place = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Place of Examination / Conferment</span>
                                </div>

                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter license number"
                                    value={item.licenseNo}
                                    onChange={(e) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].licenseNo = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">License Number (if applicable)</span>
                                </div>
                                <div className="flex flex-col z-40">
                                  <CustomDatePicker
                                    value={item.licenseDate}
                                    onChange={(date) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].licenseDate = date;
                                      setCivilServiceList(newList);
                                    }}
                                    placeholder="Select date of validity"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">License Date of Validity (if applicable)</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => setCivilServiceList([...civilServiceList, { eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Civil Service / Eligibility
                          </button>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Educational Background')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Work Experience' && (
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleWorkExperienceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your work experience from most recent to oldest. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {workExperienceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Work Experience #{idx + 1}</h3>
                                {workExperienceList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setWorkExperienceList(workExperienceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].fromDate = date;
                                      setWorkExperienceList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date (From)</span>
                                </div>
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].toDate = date;
                                      setWorkExperienceList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date (To)</span>
                                </div>
                                <div className="flex flex-col lg:col-span-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter position title"
                                    value={item.positionTitle}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].positionTitle = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Position Title (Write in full/Do not abbreviate)</span>
                                </div>

                                <div className="flex flex-col lg:col-span-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter department/agency/office/company"
                                    value={item.company}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].company = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Department/Agency/Office/Company</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter monthly salary"
                                    value={item.monthlySalary}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].monthlySalary = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Monthly Salary</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Format 00-0"
                                    value={item.salaryGrade}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].salaryGrade = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Salary/Job/Pay Grade & Step</span>
                                </div>

                                <div className="flex flex-col lg:col-span-2">
                                  <input
                                    type="text"
                                    placeholder="Enter status of appointment"
                                    value={item.statusOfAppointment}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].statusOfAppointment = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Status of Appointment</span>
                                </div>
                                <div className="flex flex-col lg:col-span-2">
                                  <select
                                    required={idx === 0}
                                    value={item.govtService}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].govtService = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none"
                                  >
                                    <option value="">Select Yes/No</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                  </select>
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Gov't Service (Y/N)</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => setWorkExperienceList([...workExperienceList, { fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Work Experience
                          </button>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Civil Service Eligibility')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Voluntary Work' && (
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleVoluntaryWorkSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your voluntary work or involvement in civic/non-government/people/voluntary organizations. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {voluntaryWorkList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Voluntary Work #{idx + 1}</h3>
                                {voluntaryWorkList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVoluntaryWorkList(voluntaryWorkList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-3">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter name & address of organization"
                                    value={item.nameAddress}
                                    onChange={(e) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].nameAddress = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name & Address of Organization (Write in full)</span>
                                </div>
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].fromDate = date;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date (From)</span>
                                </div>
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].toDate = date;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date (To)</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter number of hours"
                                    value={item.hours}
                                    onChange={(e) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].hours = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Number of Hours</span>
                                </div>
                                <div className="flex flex-col lg:col-span-3">
                                  <input
                                    type="text"
                                    placeholder="Enter position / nature of work"
                                    value={item.position}
                                    onChange={(e) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].position = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Position / Nature of Work</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => setVoluntaryWorkList([...voluntaryWorkList, { nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Voluntary Work
                          </button>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Work Experience')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Learning & Development' && (
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleLearningDevelopmentSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your learning and development (L&D) interventions/training programs attended. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {learningDevelopmentList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Training #{idx + 1}</h3>
                                {learningDevelopmentList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setLearningDevelopmentList(learningDevelopmentList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="flex flex-col lg:col-span-4">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter title of learning and development interventions/training programs"
                                    value={item.title}
                                    onChange={(e) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].title = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Title of Learning and Development Interventions/Training Programs (Write in full)</span>
                                </div>
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].fromDate = date;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date of Attendance (From)</span>
                                </div>
                                <div className="flex flex-col z-50">
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].toDate = date;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Inclusive Date of Attendance (To)</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Enter number of hours"
                                    value={item.hours}
                                    onChange={(e) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].hours = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Number of Hours</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    placeholder="Managerial/Supervisory/Technical/etc"
                                    value={item.type}
                                    onChange={(e) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].type = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Type of LD</span>
                                </div>
                                <div className="flex flex-col lg:col-span-4">
                                  <input
                                    type="text"
                                    placeholder="Enter sponsor / conducted by"
                                    value={item.sponsor}
                                    onChange={(e) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].sponsor = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Conducted/Sponsored By (Write in full)</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => setLearningDevelopmentList([...learningDevelopmentList, { title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Training Program
                          </button>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Voluntary Work')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Other Information' && (
                      <form className="w-full max-w-5xl space-y-8" onSubmit={handleOtherInformationSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your special skills and hobbies, non-academic distinctions, and memberships. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                          {/* Skills */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Special Skills & Hobbies</h3>
                            <div className="flex flex-col gap-3">
                              {skillsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter skill or hobby"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...skillsList];
                                      newList[idx].value = e.target.value;
                                      setSkillsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  {skillsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setSkillsList([...skillsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Skill / Hobby
                            </button>
                          </div>

                          {/* Distinctions */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Non-Academic Distinctions</h3>
                            <div className="flex flex-col gap-3">
                              {distinctionsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter distinction/recognition"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...distinctionsList];
                                      newList[idx].value = e.target.value;
                                      setDistinctionsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  {distinctionsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setDistinctionsList(distinctionsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setDistinctionsList([...distinctionsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Distinction
                            </button>
                          </div>

                          {/* Memberships */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Memberships in Associations</h3>
                            <div className="flex flex-col gap-3">
                              {membershipsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter association/organization"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...membershipsList];
                                      newList[idx].value = e.target.value;
                                      setMembershipsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  {membershipsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setMembershipsList(membershipsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setMembershipsList([...membershipsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Membership
                            </button>
                          </div>

                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Learning & Development')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {currentStep === 'Legal Questionnaire' && (
                      <form className="w-full max-w-5xl space-y-8" onSubmit={handleLegalQuestionnaireSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please answer the following questions truthfully. If "Yes", provide the necessary details.</p>
                        </div>

                        {/* Legal Questions */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">34 - 40 Questionnaire</h3>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {[
                              { id: '34a', text: '34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed, within the third degree?' },
                              { id: '34b', text: 'within the fourth degree (for Local Government Unit - Career Employees)?' },
                              { id: '35a', text: '35. a. Have you ever been found guilty of any administrative offense?' },
                              { id: '35b', text: 'b. Have you been criminally charged before any court?' },
                              { id: '36', text: '36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?' },
                              { id: '37', text: '37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?' },
                              { id: '38a', text: '38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?' },
                              { id: '38b', text: 'b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?' },
                              { id: '39', text: '39. Have you acquired the status of an immigrant or permanent resident of another country?' },
                              { id: '40a', text: '40. Pursuant to: (a) Indigenous People\'s Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items: a. Are you a member of any indigenous group?' },
                              { id: '40b', text: 'b. Are you a person with disability?' },
                              { id: '40c', text: 'c. Are you a solo parent?' }
                            ].map(q => (
                              <div key={q.id} className="flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <p className="text-[14px] text-gray-700 font-medium">{q.text}</p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value="Yes"
                                      checked={questionnaire[q.id]?.answer === 'Yes'}
                                      onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: questionnaire[q.id]?.details || '' } })}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      required
                                    />
                                    <span className="text-[14px] text-gray-600">Yes</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value="No"
                                      checked={questionnaire[q.id]?.answer === 'No'}
                                      onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: '' } })}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      required
                                    />
                                    <span className="text-[14px] text-gray-600">No</span>
                                  </label>
                                </div>
                                {questionnaire[q.id]?.answer === 'Yes' && (
                                  <input
                                    type="text"
                                    required
                                    placeholder="Please provide details"
                                    value={questionnaire[q.id]?.details || ''}
                                    onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: 'Yes', details: e.target.value } })}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 mt-1"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* References */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">41. References <span className="text-[11px] font-normal text-gray-500 normal-case ml-2">(Person not related by consanguinity or affinity to applicant /appointee)</span></h3>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {[1, 2, 3].map((_, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter full name"
                                    value={referencesList[idx]?.name || ''}
                                    onChange={(e) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].name = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Name</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter address"
                                    value={referencesList[idx]?.address || ''}
                                    onChange={(e) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].address = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Address</span>
                                </div>
                                <div className="flex flex-col">
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter telephone no."
                                    value={referencesList[idx]?.telephone || ''}
                                    onChange={(e) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].telephone = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                                  />
                                  <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Telephone No.</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Government ID */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">42. Government Issued ID</h3>
                          </div>
                          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex flex-col">
                              <input
                                type="text"
                                required
                                placeholder="e.g. Passport, GSIS, SSS"
                                value={governmentId.type}
                                onChange={(e) => setGovernmentId({ ...governmentId, type: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                              />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Government Issued ID</span>
                            </div>
                            <div className="flex flex-col">
                              <input
                                type="text"
                                required
                                placeholder="Enter ID/License/Passport No."
                                value={governmentId.idNo}
                                onChange={(e) => setGovernmentId({ ...governmentId, idNo: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                              />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">ID/License/Passport No.</span>
                            </div>
                            <div className="flex flex-col">
                              <input
                                type="text"
                                required
                                placeholder="Enter date/place of issuance"
                                value={governmentId.datePlace}
                                onChange={(e) => setGovernmentId({ ...governmentId, datePlace: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50"
                              />
                              <span className="text-[12px] text-gray-400 mt-1.5 font-medium">Date/Place of Issuance</span>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Other Information')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Submit Application <FileText className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
