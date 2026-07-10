import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreVertical } from 'lucide-react';

interface Applicant {
  id: number;
  first_name: string;
  surname: string;
  position: string;
  status: string;
  created_at: string;
}

export default function ApplicantsManagement() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/applicants`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplicants(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch applicants:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applicants Management</h1>
          <p className="mt-1 text-sm text-gray-500">Review and manage all applicants across positions.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search applicant name..." className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:ring-1 focus:ring-primary-500" />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-md py-2 px-3 bg-white">
            <option>All Positions</option>
            <option>Admin Officer V</option>
          </select>
          <select className="border border-gray-300 rounded-md py-2 px-3 bg-white">
            <option>All Stages</option>
            <option>Interview</option>
            <option>Shortlisted</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">QS Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">Loading applicants...</td>
              </tr>
            ) : applicants.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No applicants found.</td>
              </tr>
            ) : (
              applicants.map((app: any) => {
                const name = `${app.first_name || ''} ${app.surname || ''}`.trim();
                const position = app.job_applications && app.job_applications.length > 0 
                  ? app.job_applications[0].job_title 
                  : 'Unspecified';
                // Mock some fields for now if they don't exist in DB
                const match = Math.floor(Math.random() * 40) + 60; // 60-100%
                const score = Math.floor(Math.random() * 30) + 70; // 70-100
                const stage = app.job_applications && app.job_applications.length > 0 
                  ? app.job_applications[0].status 
                  : 'Submitted';
                const status = 'Active';

                return (
                  <tr 
                    key={app.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/applicants/${app.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                          {name.charAt(0) || '?'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{status}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{match}%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className={`h-2 rounded-full ${match >= 80 ? 'bg-green-500' : match >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${match}%`}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{score} / 100</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200 text-xs font-medium">
                        {stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5"/></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
        {/* Pagination mock */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="text-sm text-gray-700">Showing 1 to 5 of 97 results</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
