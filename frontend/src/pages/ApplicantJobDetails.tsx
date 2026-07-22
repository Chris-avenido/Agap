import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, GraduationCap, ArrowRight, CircleDollarSign, Users, Briefcase } from 'lucide-react';
import ApplicantHeader from '../components/ApplicantHeader';
import ApplicationModal from '../components/ApplicationModal';

// Hardcoded positions removed, fetching dynamically

export default function ApplicantJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Check auth
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const v = data.data.find((vac: any) => String(vac.jobClusterId) === String(id) || String(vac.id) === String(id));
          if (v) {
            const foundJob = {
              id: v.jobClusterId || v.id,
              jobClusterId: v.jobClusterId,
              positionId: v.position_id,
              title: v.positionTitle || v.title,
              office: v.division ? `${v.division}, ${v.region}` : 'Department of Education',
              division: v.division || '',
              type: 'Permanent',
              posted: v.posting_start ? new Date(v.posting_start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
              deadline: v.posting_end ? new Date(v.posting_end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
              sg: v.salaryGrade || v.salary_grade,
              itemNo: v.item_no || 'Multiple Items',
              location: v.region || '',
              vacancyCount: v.vacantItemCount || v.vacancy_count || 1,
              qsEducation: v.qualificationStandards?.requiredBachelorDegree || v.education || v.required_bachelor_degree || 'Completion of two (2) years studies in college (prior to 2018), OR Completion of Grade 12/Senior High School (starting 2016)',
              qsEligibility: v.qualificationStandards?.eligibilityRequired || v.eligibility || v.required_eligibility || 'Career Service Sub Professional / First Level Eligibility',
              description: 'Details available in the full job posting.'
            };
            setJob(foundJob);

            fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`)
              .then(res => res.json())
              .then(appData => {
                if (appData.success && appData.data) {
                  const applied = appData.data.some((app: any) => (app.vacancy_id === foundJob.id) || (app.position_id === foundJob.id));
                  setHasApplied(applied);
                }
              })
              .catch(err => console.error('Error fetching applications:', err));
          } else {
            navigate('/applicant-jobs');
          }
        }
      })
      .catch(err => {
        console.error('Error fetching vacancies:', err);
        navigate('/applicant-jobs');
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`)
      .then(res => res.json())
      .then(profileData => {
         if (profileData.success && profileData.data) {
           setProfile(profileData.data);
         }
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, [id, navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = () => {
    navigate('/applicant-jobs', { state: { applyingJob: job } });
  };

  if (!job) return null;

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

      <main className="flex-1 w-full flex flex-col">
        {/* Details Hero Banner Section */}
        <div
          className="relative w-full overflow-hidden py-12 sm:py-16 px-6 md:px-12 flex-shrink-0"
          style={{
            background: 'linear-gradient(160deg, #05233F 0%, #06345F 58%, #0A6FA6 100%)'
          }}
        >
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#004b93] rounded-full mix-blend-screen filter blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="max-w-5xl mx-auto relative z-10 flex items-center">
            <button
              onClick={() => navigate('/applicant-jobs')}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-[15px]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Job List
            </button>
          </div>
        </div>

        <div className="max-w-5xl w-full mx-auto px-4 relative z-20 -mt-8 mb-24">
          <div className="bg-white rounded-[20px] shadow-[0_8px_25px_rgba(251,191,36,0.15)] border-[1.5px] border-[#fbbf24] p-8 md:p-12 min-h-[500px]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
              <div>
                <h1 className="text-[28px] font-bold text-[#2563eb] mb-2">{job.title}</h1>
                <div className="text-[14px] text-gray-600 mb-2 font-medium">
                  {job.location || 'N/A'} - {job.division || job.office || 'N/A'}
                </div>
              </div>
              <button
                onClick={handleApplyClick}
                disabled={hasApplied}
                className={`px-8 py-3.5 rounded-xl text-[14px] font-bold tracking-wide transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm ${hasApplied
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
                  }`}
              >
                {hasApplied ? (
                  'ALREADY APPLIED'
                ) : (
                  <>
                    <Briefcase className="w-4 h-4" /> APPLY NOW
                  </>
                )}
              </button>
            </div>

            <div className="text-[14px] text-gray-600 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
              Posted on <span className="font-bold text-gray-800">{job.posted || 'Jul 08, 2026'}</span> and deadline is on <span className="font-bold text-red-500">{job.deadline || 'Jul 18, 2026'}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center gap-4 px-6 py-4 bg-[#f0f4f8] rounded-2xl flex-1">
                <CircleDollarSign className="w-8 h-8 text-blue-600 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">SALARY GRADE</span>
                  <span className="text-[20px] font-extrabold text-gray-800 leading-none">{job.sg || '4'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-4 bg-[#f0fdf4] rounded-2xl flex-1">
                <Users className="w-8 h-8 text-emerald-600 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-1">VACANCIES</span>
                  <span className="text-[20px] font-extrabold text-gray-800 leading-none">{job.vacancyCount || 0}</span>
                </div>
              </div>
            </div>

            <h3 className="text-[18px] font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3 tracking-wide">QS:</h3>

            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-y-6 text-[15px] bg-white">
              <div className="font-bold text-gray-900 tracking-wide">Education:</div>
              <div className="text-gray-600 font-medium leading-relaxed">{job.qsEducation}</div>

              <div className="font-bold text-gray-900 tracking-wide">Eligibility:</div>
              <div className="text-gray-600 font-medium leading-relaxed">{job.qsEligibility}</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
