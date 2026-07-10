import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

const initialColumns = [
  { id: 'submitted', title: 'Submitted', count: 12 },
  { id: 'screening', title: 'Initial Screening', count: 8 },
  { id: 'qualified', title: 'Qualified', count: 5 },
  { id: 'interview', title: 'Interview', count: 3 },
  { id: 'hired', title: 'Hired', count: 1 }
];

const mockCards = {
  'screening': [
    { id: 1, name: 'Maria Santos', position: 'Admin Officer V', match: 95, score: 88 },
    { id: 2, name: 'Jose Rizal', position: 'Admin Officer V', match: 90, score: 82 },
  ],
  'interview': [
    { id: 3, name: 'Juan Dela Cruz', position: 'IT Officer II', match: 100, score: 92 },
  ]
};

export default function RecruitmentPipeline() {
  const [columns] = useState(initialColumns);
  const [cards] = useState<Record<string, any[]>>(mockCards);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment Pipeline</h1>
          <p className="mt-1 text-sm text-gray-500">Drag and drop applicants through the hiring stages.</p>
        </div>
        <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 bg-white shadow-sm">
          <option>All Positions</option>
          <option>Admin Officer V</option>
          <option>IT Officer II</option>
        </select>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="inline-flex h-full items-start space-x-4">
          {columns.map((col) => (
            <div key={col.id} className="w-80 flex-shrink-0 flex flex-col bg-gray-100 rounded-lg max-h-full">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-100 rounded-t-lg">
                <h3 className="font-semibold text-gray-700 text-sm">{col.title} <span className="ml-2 text-gray-400 font-normal">{col.count}</span></h3>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4"/></button>
              </div>
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {(cards[col.id] || []).map((card) => (
                  <div key={card.id} className="bg-white p-4 rounded shadow-sm border border-gray-200 cursor-grab hover:border-primary-400 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-gray-900">{card.name}</h4>
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                        {card.name.charAt(0)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{card.position}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">Match: {card.match}%</span>
                      <span className="text-gray-500 font-medium">Score: {card.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
