import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.stage}</td>
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
