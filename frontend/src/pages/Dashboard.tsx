import { Users, Briefcase, FileCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const statCards = [
  { name: 'Open Positions', value: '24', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'Total Applicants', value: '1,482', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { name: 'Under Review', value: '385', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { name: 'Shortlisted', value: '142', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Hired', value: '56', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
  { name: 'Closed Positions', value: '12', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
];

const trendData = [
  { name: 'Jan', applicants: 400 },
  { name: 'Feb', applicants: 300 },
  { name: 'Mar', applicants: 550 },
  { name: 'Apr', applicants: 480 },
  { name: 'May', applicants: 700 },
  { name: 'Jun', applicants: 850 },
];

const pipelineData = [
  { name: 'Submitted', count: 800 },
  { name: 'Screening', count: 400 },
  { name: 'Interview', count: 200 },
  { name: 'Offer', count: 80 },
  { name: 'Hired', count: 56 },
];

const recentActivity = [
  { action: 'NOSCA Uploaded', details: 'DepEd Regional Office III batch uploaded.', time: '2 hours ago', icon: Briefcase },
  { action: 'New Applicant', details: 'Maria Santos applied for Admin Officer V.', time: '3 hours ago', icon: Users },
  { action: 'Interview Scheduled', details: 'Juan Dela Cruz for IT Officer II.', time: '5 hours ago', icon: Clock },
  { action: 'Applicant Hired', details: 'Ana Reyes accepted offer for Clerk III.', time: '1 day ago', icon: CheckCircle2 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of recruitment activities and statistics.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${item.bg}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{item.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="applicants" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hiring Pipeline Drop-off</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== recentActivity.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center ring-8 ring-white">
                          <event.icon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-900 font-medium">{event.action}</p>
                          <p className="text-sm text-gray-500">{event.details}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time>{event.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
