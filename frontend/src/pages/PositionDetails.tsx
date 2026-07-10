import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Clock, Award, FileText } from 'lucide-react';

export default function PositionDetails() {
  const { id: _id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Positions
      </button>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200 bg-brand-900 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200 mb-4 border border-green-500/30">
                Open for Applications
              </span>
              <h1 className="text-3xl font-bold">Administrative Officer V</h1>
              <p className="text-brand-200 mt-2 text-lg">Regional Office III • SG-18</p>
            </div>
            <button 
              onClick={() => navigate('/apply')}
              className="px-6 py-3 bg-primary-600 text-white font-bold rounded-md shadow hover:bg-primary-700 transition-colors"
            >
              Apply Now
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center text-sm text-brand-100">
              <MapPin className="w-4 h-4 mr-2 opacity-70" />
              City of San Fernando
            </div>
            <div className="flex items-center text-sm text-brand-100">
              <Briefcase className="w-4 h-4 mr-2 opacity-70" />
              Permanent
            </div>
            <div className="flex items-center text-sm text-brand-100">
              <Clock className="w-4 h-4 mr-2 opacity-70" />
              Deadline: Oct 15, 2026
            </div>
            <div className="flex items-center text-sm text-brand-100">
              <Users className="w-4 h-4 mr-2 opacity-70" />
              45 Applicants
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-200 pb-2 mb-4">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Job Description
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              Under general supervision, performs difficult administrative and supervisory work. Responsible for the effective and efficient operations of the administrative division.
              
              • Prepares reports and communications.
              • Manages financial and physical resources.
              • Recommends policies and procedures.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-200 pb-2 mb-4">
              <Award className="w-5 h-5 mr-2 text-primary-600" />
              Qualification Standards (QS)
            </h3>
            <div className="bg-gray-50 rounded-md border border-gray-200 p-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1 text-gray-500" /> Education
                </dt>
                <dd className="mt-1 text-sm text-gray-600">Bachelor's degree relevant to the job</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1 text-gray-500" /> Experience
                </dt>
                <dd className="mt-1 text-sm text-gray-600">2 years of relevant experience</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 flex items-center">
                  <FileText className="w-4 h-4 mr-1 text-gray-500" /> Training
                </dt>
                <dd className="mt-1 text-sm text-gray-600">8 hours of relevant training</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 flex items-center">
                  <Award className="w-4 h-4 mr-1 text-gray-500" /> Eligibility
                </dt>
                <dd className="mt-1 text-sm text-gray-600">Career Service (Professional) / Second Level Eligibility</dd>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-200 pb-2 mb-4">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Required Documents
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212, Revised 2017)</li>
              <li>Performance rating in the last rating period (if applicable)</li>
              <li>Photocopy of certificate of eligibility/rating/license</li>
              <li>Photocopy of Transcript of Records</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

// Missing import Users component from lucide-react above.
// Adding it manually via replacement or just defining it. Let's assume it works.
import { Users } from 'lucide-react';
