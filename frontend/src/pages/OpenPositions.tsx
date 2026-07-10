import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';

const positions = [
  { id: 1, title: 'Administrative Officer V', office: 'Regional Office III', sg: 18, type: 'Permanent', location: 'City of San Fernando', applicants: 45, status: 'Open', deadline: 'Oct 15, 2026' },
  { id: 2, title: 'Information Technology Officer II', office: 'Central Office', sg: 22, type: 'Permanent', location: 'Quezon City', applicants: 12, status: 'Open', deadline: 'Oct 20, 2026' },
  { id: 3, title: 'Accountant III', office: 'Finance Division', sg: 19, type: 'Contract of Service', location: 'Quezon City', applicants: 89, status: 'Closing Soon', deadline: 'Oct 5, 2026' },
  { id: 4, title: 'Legal Assistant II', office: 'Legal Affairs', sg: 14, type: 'Permanent', location: 'Quezon City', applicants: 150, status: 'Closed', deadline: 'Sep 30, 2026' },
];

export default function OpenPositions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Open Positions</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view all current job vacancies.</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary-700">
          Create Manual Vacancy
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search position title or office..." className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500" />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white">
            <option>All Offices</option>
            <option>Central Office</option>
            <option>Regional Office III</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {positions.map((job) => (
          <div 
            key={job.id} 
            onClick={() => navigate(`/positions/${job.id}`)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{job.title}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                job.status === 'Open' ? 'bg-green-100 text-green-800' : 
                job.status === 'Closing Soon' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {job.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                {job.office} • SG-{job.sg}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {job.location} ({job.type})
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
              <div className="font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-md">
                {job.applicants} Applicants
              </div>
              <div className="text-gray-500">
                Closes: {job.deadline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
