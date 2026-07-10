import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function ApplicantScoring() {
  const { id: _id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Profile
        </button>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-primary-700">
          <Save className="w-4 h-4 mr-2" />
          Save Evaluation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col - Overall Score */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Overall Score</h3>
            
            {/* Fake Circular Gauge using CSS */}
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary-600"
                  strokeDasharray="88, 100"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-gray-900">88</span>
                <span className="text-sm text-gray-500 font-medium">Out of 100</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">Highly Recommended</p>
          </div>
        </div>

        {/* Right Col - Criteria Breakdown */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 mb-6">Evaluation Criteria</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-medium text-gray-700">Education (20%)</label>
                  <span className="text-sm font-bold text-gray-900">18 / 20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-medium text-gray-700">Work Experience (30%)</label>
                  <span className="text-sm font-bold text-gray-900">25 / 30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-medium text-gray-700">Training (10%)</label>
                  <span className="text-sm font-bold text-gray-900">10 / 10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-medium text-gray-700">Eligibility (10%)</label>
                  <span className="text-sm font-bold text-gray-900">10 / 10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-medium text-gray-700">Interview / Exam (30%)</label>
                  <span className="text-sm font-bold text-gray-900">25 / 30</span>
                </div>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" defaultValue="83" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">HRMO Remarks / Notes</label>
              <textarea 
                rows={4} 
                className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                placeholder="Add evaluation notes here..."
                defaultValue="Applicant shows strong potential and has complete documentary requirements. Performed well during the initial screening."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
