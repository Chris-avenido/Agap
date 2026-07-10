import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, GraduationCap } from 'lucide-react';

const positions = [
  {
    id: 1,
    title: 'Chief Economic Development Specialist',
    office: 'National Policy and Planning Staff',
    type: 'PERMANENT',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 09, 2026',
    sg: 24,
    itemNo: 'CEDS-35-1998',
    description: 'Directs the formulation and updating of the national/regional development plans and the preparation of socio-economic reports. Oversees the review and evaluation of major programs and projects. Coordinates with other agencies and LGUs on development initiatives.'
  },
  {
    id: 2,
    title: 'Chief Economic Development Specialist',
    office: 'National Policy and Planning Staff',
    type: 'PERMANENT',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 09, 2026',
    sg: 24,
    itemNo: 'CEDS-1-1998',
    description: 'Responsible for leading policy research, drafting economic advisories, and guiding junior staff in complex statistical analysis. Ensures alignment of departmental outputs with the overall strategic framework of the agency.'
  },
  {
    id: 3,
    title: 'Chief Economic Development Specialist',
    office: 'National Policy and Planning Staff',
    type: 'PERMANENT',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 09, 2026',
    sg: 24,
    itemNo: 'CEDS-24-1998',
    description: 'Manages inter-agency collaborations for economic policy implementation. Designs and conducts capability-building activities for local government units regarding economic planning and investment programming.'
  },
  {
    id: 4,
    title: 'Information Officer V',
    office: 'Development Information Staff',
    type: 'PERMANENT',
    posted: 'Jun 28, 2026',
    deadline: 'Jul 08, 2026',
    sg: 24,
    itemNo: 'INFO5-12-2005',
    description: 'Heads the public relations and communications team. Develops comprehensive communication plans, manages press relations, and oversees the production of all official publications, press releases, and digital content.'
  }
];

export default function ApplicantJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Check auth
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    const foundJob = positions.find(p => p.id === Number(id));
    if (foundJob) {
      setJob(foundJob);
      
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const applied = data.data.some((app: any) => app.position_id === foundJob.id);
            setHasApplied(applied);
          }
        })
        .catch(err => console.error('Error fetching applications:', err));
    } else {
      navigate('/applicant-jobs');
    }
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_data');
    navigate('/');
  };

  const handleApplyClick = async () => {
    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        Swal.fire('Error', 'You must be logged in to apply.', 'error');
        navigate('/login');
        return;
      }
      
      const session = JSON.parse(sessionStr);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/apply-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantId: session.id,
          positionId: job.id,
          jobTitle: job.title
        })
      });

      if (response.ok) {
        Swal.fire('Success', 'Successfully applied for ' + job.title + '!', 'success');
        setHasApplied(true);
      } else {
        Swal.fire('Error', 'Failed to apply. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error applying for job.', 'error');
    }
  };

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      <main className="flex-1 w-full flex flex-col bg-gray-50">
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
          <div className="bg-white rounded-[4px] shadow-sm border border-gray-100 p-8 md:p-12 min-h-[500px]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
              <div>
                <h1 className="text-[28px] font-normal text-[#00bcd4] mb-2">{job.title}</h1>
                <div className="text-[14px] text-gray-500 mb-1">
                  Item No. <span className="font-bold text-gray-700">{job.itemNo || 'N/A'}</span>
                </div>
                <div className="text-[14px] text-gray-500 mb-2">{job.division || job.office}</div>
                <div className="flex items-center gap-2 text-[14px] text-gray-500">
                  Office of the Director 
                  <span className={`inline-block px-2.5 py-0.5 text-white text-[10px] font-bold rounded uppercase tracking-wider ${job.type.toLowerCase() === 'permanent' ? 'bg-[#81c784]' : 'bg-[#eab308]'}`}>
                    {job.type}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleApplyClick}
                disabled={hasApplied}
                className={`px-8 py-3 rounded text-[13px] font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0 ${
                  hasApplied
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#e67e22] hover:bg-[#d35400] text-white'
                }`}
              >
                {hasApplied ? 'ALREADY APPLIED' : 'Apply Now'}
              </button>
            </div>

            <div className="text-[13px] text-gray-500 mb-10">
              Posted on <span className="font-bold text-gray-700">{job.posted || 'Jul 08, 2026'}</span> and deadline is on <span className="font-bold text-gray-700">{job.deadline || 'Jul 18, 2026'}</span>
            </div>

            <div className="flex items-center gap-8 text-[14px] text-gray-600 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-[#5c6bc0] flex items-center justify-center">
                  <span className="text-[#5c6bc0] text-[12px] font-bold">₱</span>
                </div>
                Salary Grade : {job.sg || '4'}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-[#5c6bc0] flex items-center justify-center">
                  <span className="text-[#5c6bc0] text-[12px] font-bold">₱</span>
                </div>
                Monthly Salary : PhP {job.sg === 4 ? '17,506.00' : job.sg === 9 ? '21,211.00' : job.sg === 18 ? '46,725.00' : job.sg === 19 ? '51,357.00' : job.sg === 24 ? '90,078.00' : 'Unknown'}
              </div>
            </div>

            <h3 className="text-[18px] font-bold text-gray-700 mb-6">CSC Prescribed Qualification Standard</h3>
            
            <div className="grid grid-cols-[120px_1fr] gap-y-5 text-[15px]">
              <div className="font-bold text-gray-700">Education:</div>
              <div className="text-gray-500 font-light leading-snug">Completion of two (2) years studies in college (prior to 2018), OR<br/>Completion of Grade 12/Senior High School (starting 2016)</div>
              
              <div className="font-bold text-gray-700">Training:</div>
              <div className="text-gray-500 font-light">None required</div>
              
              <div className="font-bold text-gray-700">Experience:</div>
              <div className="text-gray-500 font-light">None required</div>
              
              <div className="font-bold text-gray-700">Eligibility:</div>
              <div className="text-gray-500 font-light leading-snug">Career Service Sub Professional / First Level Eligibility</div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
