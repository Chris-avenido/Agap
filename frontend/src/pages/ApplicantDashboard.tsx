import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, FileText, LogOut, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          setApplications(data.data.map((app: any) => ({
            id: app.id,
            position: app.job_title || 'Unknown Position',
            office: 'Department of Education',
            date: new Date(app.created_at).toLocaleDateString(),
            stage: app.status || 'Applied',
            status: 'Active'
          })));
        }
      })
      .catch(err => console.error('Error fetching applications:', err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_data');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-6xl mx-auto py-8 px-4 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Maria!</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-md mr-4"><FileText /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Profile Completion</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-md mr-4"><Briefcase /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <div className="p-3 bg-green-100 text-green-600 rounded-md mr-4"><CheckCircle2 /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Saved Positions</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">My Applications</h3>
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
                    Loading your applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    You haven't applied for any positions yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.position}</div>
                      <div className="text-sm text-gray-500">{app.office}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.stage}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
