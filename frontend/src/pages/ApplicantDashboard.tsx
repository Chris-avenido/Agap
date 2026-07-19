import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, History } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState<'active' | 'past' | 'saved'>('active');

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
            office: app.office || 'Department of Education',
            date: new Date(app.created_at).toLocaleDateString(),
            stage: app.status || 'Pending',
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
  const pastApps = applications.filter(app => app.status === 'Past');
  const savedPositionsCount = savedJobs.length;

  const getFilteredData = () => {
    if (activeFilter === 'active') return activeApps;
    if (activeFilter === 'past') return pastApps;
    if (activeFilter === 'saved') return savedJobs;
    return [];
  };

  const filteredData = getFilteredData();

  let photoUrl = null;
  if (profile?.other_information) {
     const otherInfo = typeof profile.other_information === 'string' ? JSON.parse(profile.other_information) : profile.other_information;
     photoUrl = otherInfo.photoUrl;
  }

  const { percentage: progressPercentage } = calculateProfileProgress({
    ...parseProfileToState(profile),
    isSubsequentApplication: applications.length > 0
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}!</h1>
          <button
            onClick={() => navigate('/applicant-jobs')}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors text-sm"
          >
            Go to Job Board
          </button>
        </div>

        {/* Profile Completion Card */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#e8f5e9] border border-[#bbf7d0] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left focus:outline-none"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[15px] font-bold text-[#1b5e20]">Profile Completion</h2>
              <p className="text-sm text-[#2e7d32] font-medium leading-snug">
                Click here to view or update your profile information.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64 shrink-0 mt-2 sm:mt-0">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[11px] font-extrabold text-[#1b5e20] tracking-wider uppercase">Progress</span>
              <span className="text-[11px] font-extrabold text-[#1b5e20]">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-[#bbf7d0] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#2e7d32] h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </button>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button 
            onClick={() => setActiveFilter('active')}
            className={`bg-white p-6 rounded-lg shadow-sm border flex items-center text-left hover:shadow-md transition-all focus:outline-none ${activeFilter === 'active' ? 'border-[#003366] ring-1 ring-[#003366]' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="p-3 bg-purple-100 text-purple-600 rounded-md mr-4 shrink-0"><Briefcase /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium leading-tight mb-1">Active Applications</p>
              <p className="text-2xl font-bold text-gray-900">{activeApps.length}</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveFilter('past')}
            className={`bg-white p-6 rounded-lg shadow-sm border flex items-center text-left hover:shadow-md transition-all focus:outline-none ${activeFilter === 'past' ? 'border-[#003366] ring-1 ring-[#003366]' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="p-3 bg-gray-100 text-gray-600 rounded-md mr-4 shrink-0"><History /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium leading-tight mb-1">Past Applications</p>
              <p className="text-2xl font-bold text-gray-900">{pastApps.length}</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveFilter('saved')}
            className={`bg-white p-6 rounded-lg shadow-sm border flex items-center text-left hover:shadow-md transition-all focus:outline-none ${activeFilter === 'saved' ? 'border-[#003366] ring-1 ring-[#003366]' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="p-3 bg-green-100 text-green-600 rounded-md mr-4 shrink-0"><CheckCircle2 /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium leading-tight mb-1">Saved Positions</p>
              <p className="text-2xl font-bold text-gray-900">{savedPositionsCount}</p>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {activeFilter === 'active' && 'Active Applications'}
              {activeFilter === 'past' && 'Past Applications'}
              {activeFilter === 'saved' && 'Saved Positions'}
            </h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading your data...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {activeFilter === 'active' && "You don't have any active applications."}
                    {activeFilter === 'past' && "You don't have any past applications."}
                    {activeFilter === 'saved' && "You haven't saved any positions yet."}
                  </td>
                </tr>
              ) : (
                filteredData.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.position}</div>
                      <div className="text-sm text-gray-500">{app.office}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 w-[200px]">
                        {['Received', 'Reviewing', 'Finalizing'].map((s, i) => {
                          let currentIndex = 0;
                          const stageLower = (app.stage || 'Pending').toLowerCase();
                          if (stageLower === 'pending' || stageLower === 'received') currentIndex = 0;
                          else if (stageLower === 'reviewing' || stageLower === 'initial evaluation') currentIndex = 1;
                          else if (stageLower === 'interview' || stageLower === 'final interview' || stageLower === 'finalizing') currentIndex = 2;
                          else currentIndex = 0;

                          const isActive = i <= currentIndex;
                          return (
                            <div key={s} className="flex flex-col items-center gap-1 flex-1">
                               <div className={`h-1.5 w-full rounded-full ${isActive ? 'bg-[#003366]' : 'bg-gray-200'}`}></div>
                               <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? 'text-[#003366]' : 'text-gray-400'}`}>{s}</span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#003366] hover:underline focus:outline-none">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
