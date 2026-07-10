import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';

export default function ApplicantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate('/applicants')}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Applicants
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-32 bg-brand-800"></div>
            <div className="px-6 pb-6 relative">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-brand-100 flex items-center justify-center text-4xl font-bold text-brand-700 absolute -top-12">
                M
              </div>
              <div className="pt-14 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Maria Santos</h1>
                  <p className="text-lg text-primary-600 font-medium mt-1">Applicant for Administrative Officer V</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" /> City of San Fernando, Pampanga
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" /> m.santos@example.com
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" /> +63 917 123 4567
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/scoring/${id}`)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-primary-700"
                >
                  View Score & Evaluate
                </button>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">Qualifications</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-900">Bachelor of Science in Public Administration</h4>
                  <p className="text-sm text-gray-600">University of the Philippines • 2018 - 2022</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-900">Administrative Assistant III</h4>
                  <p className="text-sm text-gray-600">Department of Education • 2023 - Present</p>
                  <p className="text-sm text-gray-500 mt-1">Handled document routing, basic HR tasks, and records management.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <Award className="w-5 h-5 text-gray-400" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-900">Career Service Professional Eligibility</h4>
                  <p className="text-sm text-gray-600">Civil Service Commission • Rating: 86.45% • Aug 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Current Status</h3>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-500">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold text-gray-900">Initial Screening</p>
                <p className="text-sm text-gray-500">Updated 2 days ago</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">System Match</h3>
            <div className="mb-2 flex justify-between items-end">
              <span className="text-3xl font-extrabold text-primary-600">95%</span>
              <span className="text-sm text-gray-500 mb-1">QS Match</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50">
                Move to Next Stage
              </button>
              <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-700 rounded-md text-sm font-medium shadow-sm hover:bg-red-50">
                Reject Applicant
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Attached Documents</h3>
             <ul className="space-y-3">
               <li className="flex justify-between items-center text-sm">
                 <span className="text-blue-600 font-medium cursor-pointer hover:underline">PDS_Maria_Santos.pdf</span>
                 <span className="text-gray-400">2.4 MB</span>
               </li>
               <li className="flex justify-between items-center text-sm">
                 <span className="text-blue-600 font-medium cursor-pointer hover:underline">TOR_Certified.pdf</span>
                 <span className="text-gray-400">1.1 MB</span>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
