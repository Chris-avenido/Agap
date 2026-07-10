import { Download } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const dataStatus = [
  { name: 'Hired', value: 45, color: '#10b981' },
  { name: 'Shortlisted', value: 120, color: '#3b82f6' },
  { name: 'Qualified', value: 300, color: '#f59e0b' },
  { name: 'Disqualified', value: 400, color: '#ef4444' },
];

const dataOffice = [
  { name: 'Central', applicants: 400 },
  { name: 'Region I', applicants: 150 },
  { name: 'Region II', applicants: 120 },
  { name: 'Region III', applicants: 350 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Generate insights from recruitment data.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-primary-700">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Applicant Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            {dataStatus.map(d => (
              <div key={d.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: d.color }}></div>
                <span className="text-gray-600">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Applications by Office</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataOffice} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <RechartsTooltip />
                <Bar dataKey="applicants" fill="#60a5fa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
