import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, History, ArrowRight, ArrowLeft, Users, ChevronRight, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateProfileProgress, parseProfileToState } from '../utils/profileProgress';
import ApplicantHeader from '../components/ApplicantHeader';
import ApplicationModal from '../components/ApplicationModal';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'active' | 'history' | 'saved'>('active');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (filter: 'active' | 'history' | 'saved') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/saved-jobs`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`).then(res => res.json())
    ])
      .then(([appsData, savedData, profileData]) => {
        if (appsData.success && appsData.data) {
          setApplications(appsData.data.map((app: any) => ({
            id: app.id,
            position: app.job_title || 'Unknown Position',
            division: app.division || app.office || 'Department of Education',
            date: app.date_applied || app.created_at,
            applicationStatus: app.status || 'Pending',
            assessmentStatus: app.assessment_status || 'Pending Assessment',
            status: app.status === 'Hired' || app.status === 'Rejected' ? 'Past' : 'Active'
          })));
        }
        if (savedData.success && savedData.data) {
          setSavedJobs(savedData.data.map((job: any) => ({
            id: job.id,
            position: job.position_title || 'Unknown Position',
            office: job.office || 'Department of Education',
            date: 'N/A',
            stage: 'Saved',
            status: 'Saved'
          })));
        }
        if (profileData.success && profileData.data) {
          setProfile(profileData.data);
        }
      })
      .catch(err => console.error('Error fetching dashboard data:', err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const activeApps = applications.filter(app => app.status === 'Active');
  const historyApps = applications;
  const savedPositionsCount = savedJobs.length;

  const getFilteredData = () => {
    if (activeFilter === 'active') return activeApps;
    if (activeFilter === 'history') return historyApps;
    if (activeFilter === 'saved') return savedJobs;
    return [];
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  let photoUrl = null;
  if (profile?.other_information) {
     const otherInfo = typeof profile.other_information === 'string' ? JSON.parse(profile.other_information) : profile.other_information;
     photoUrl = otherInfo.photoUrl;
  }

  const { percentage: progressPercentage } = calculateProfileProgress({
    ...parseProfileToState(profile),
    isSubsequentApplication: applications.length > 0,
    context: 'my-profile'
  });

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
      <ApplicantHeader 
        firstName={profile?.first_name || ''} 
        lastName={profile?.surname || ''} 
        photoUrl={photoUrl ? `${import.meta.env.VITE_API_URL}/api/applicants/proxy-blob?url=${encodeURIComponent(photoUrl)}` : null} 
      />

      <main className="max-w-6xl mx-auto py-8 px-4 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2 mt-4">
          <div>
            <h1 className="text-[32px] font-extrabold text-[#022851] tracking-tight">Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! 👋</h1>
            <p className="text-gray-500 font-medium text-[15px] mt-1">Here's a quick overview of your application activity.</p>
          </div>
          <button
            onClick={() => navigate('/applicant-jobs')}
            className="bg-[#022851] hover:bg-[#033a76] text-white px-6 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px] flex items-center justify-center gap-2.5 group"
          >
            <Briefcase className="w-4 h-4" /> Go to Job Board <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Profile Completion Card */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-white border-[1.5px] border-[#22c55e]/30 shadow-[0_8px_25px_rgba(34,197,94,0.15)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl hover:shadow-[0_12px_35px_rgba(34,197,94,0.25)] hover:border-[#22c55e]/50 transition-all focus:outline-none"
        >
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center shrink-0 border-[4px] border-white shadow-[0_0_20px_rgba(34,197,94,0.15)] relative">
              <Users className="w-8 h-8 text-[#22c55e]" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-white" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-[18px] font-bold text-[#022851] mb-1.5">Profile Completion</h2>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-xs">
                Complete your profile to unlock all features and improve your chances.
              </p>
            </div>
          </div>
          <div className="w-full md:w-[450px] shrink-0 mt-4 md:mt-0 flex items-center gap-6">
            <span className="text-[36px] font-extrabold text-[#22c55e] tracking-tight">{progressPercentage}%</span>
            <div className="flex-1">
              <div className="w-full bg-[#f0fdf4] h-3.5 rounded-full overflow-hidden">
                <div className="bg-[#22c55e] h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <span className="text-[11px] font-bold text-gray-400">0%</span>
                <span className="text-[11px] font-bold text-gray-400">50%</span>
                <span className="text-[11px] font-bold text-gray-400">100%</span>
              </div>
            </div>
          </div>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => handleFilterChange('active')}
            className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'active' ? 'border-[#9333ea] shadow-[0_8px_25px_rgba(147,51,234,0.2)] ring-1 ring-[#9333ea]' : 'border-[#9333ea]/20 shadow-[0_4px_15px_rgba(147,51,234,0.05)] hover:shadow-[0_8px_25px_rgba(147,51,234,0.15)] hover:border-[#9333ea]/40'}`}
          >
            <div className="flex items-center gap-5">
              <div className="w-[68px] h-[68px] bg-[#f3e8ff] rounded-[20px] flex items-center justify-center shrink-0">
                <Briefcase className="w-8 h-8 text-[#9333ea]" />
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-bold mb-1">Active Applications</p>
                <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{activeApps.length}</p>
                <p className="text-[12px] text-gray-400 font-medium">Applications in progress</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <button 
            onClick={() => handleFilterChange('history')}
            className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'history' ? 'border-[#3b82f6] shadow-[0_8px_25px_rgba(59,130,246,0.2)] ring-1 ring-[#3b82f6]' : 'border-[#3b82f6]/20 shadow-[0_4px_15px_rgba(59,130,246,0.05)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/40'}`}
          >
            <div className="flex items-center gap-5">
              <div className="w-[68px] h-[68px] bg-[#eff6ff] rounded-[20px] flex items-center justify-center shrink-0">
                <History className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-bold mb-1">Application History</p>
                <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{historyApps.length}</p>
                <p className="text-[12px] text-gray-400 font-medium">All your applications</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <button 
            onClick={() => handleFilterChange('saved')}
            className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'saved' ? 'border-[#22c55e] shadow-[0_8px_25px_rgba(34,197,94,0.2)] ring-1 ring-[#22c55e]' : 'border-[#22c55e]/20 shadow-[0_4px_15px_rgba(34,197,94,0.05)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.15)] hover:border-[#22c55e]/40'}`}
          >
            <div className="flex items-center gap-5">
              <div className="w-[68px] h-[68px] bg-[#f0fdf4] rounded-[20px] flex items-center justify-center shrink-0">
                <Bookmark className="w-8 h-8 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-bold mb-1">Saved Positions</p>
                <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{savedPositionsCount}</p>
                <p className="text-[12px] text-gray-400 font-medium">Jobs you've saved</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(2,40,81,0.08)] border-[1.5px] border-[#022851]/10 overflow-hidden mt-2">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#eff6ff] p-2.5 rounded-xl">
                <Briefcase className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#022851]">
                {activeFilter === 'active' && 'Active Applications'}
                {activeFilter === 'history' && 'Application History'}
                {activeFilter === 'saved' && 'Saved Positions'}
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Division</th>
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Date Applied</th>
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Application Status</th>
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Assessment Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">
                      Loading your data...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">
                      {activeFilter === 'active' && "You don't have any active applications."}
                      {activeFilter === 'history' && "You don't have any applications yet."}
                      {activeFilter === 'saved' && "You haven't saved any positions yet."}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#eff6ff] rounded-full flex items-center justify-center shrink-0">
                            <Briefcase className="w-6 h-6 text-[#3b82f6]" />
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-[#022851]">{app.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-[13px] text-gray-500 font-medium">{app.division}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-[13px] text-gray-600 font-medium">
                          {app.date !== 'N/A' && app.date ? new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-200">
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-purple-50 text-purple-700 uppercase tracking-wide border border-purple-200">
                          {app.assessmentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
              <div className="text-[13px] text-gray-500 font-medium">
                Showing <span className="font-bold text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-700">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-gray-700">{filteredData.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded-lg text-[13px] font-bold transition-colors ${
                        currentPage === idx + 1
                          ? 'bg-[#022851] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobTitle="Profile Update"
        />
      )}
    </div>
  );
}
