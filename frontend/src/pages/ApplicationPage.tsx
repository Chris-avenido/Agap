import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChevronRight, ChevronLeft, UploadCloud, GraduationCap, ArrowLeft } from 'lucide-react';
// @ts-ignore
import ModernDatePicker from "../components/ModernDatePicker";

export default function ApplicationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { jobId?: number; jobTitle?: string } | null;

  const jobId = state?.jobId;
  const jobTitle = state?.jobTitle || 'Unknown Position';

  const [activeTab, setActiveTab] = useState('C1');
  const [isParsing, setIsParsing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!jobId && !jobTitle) {
      navigate('/');
    }
  }, [jobId, jobTitle, navigate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      Swal.fire('Error', 'Please upload a PDF or DOCX file.', 'error');
      return;
    }

    setIsParsing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/parse-resume`, {
        method: 'POST',
        body: formData,
      });
      const resData = await response.json();

      if (response.ok && resData.success && resData.data && formRef.current) {
        const data = resData.data;
        const form = formRef.current;

        if (data.surname) (form.elements.namedItem('surname') as HTMLInputElement).value = data.surname;
        if (data.first_name) (form.elements.namedItem('first_name') as HTMLInputElement).value = data.first_name;
        if (data.middle_name) (form.elements.namedItem('middle_name') as HTMLInputElement).value = data.middle_name;
        if (data.email_address) (form.elements.namedItem('email_address') as HTMLInputElement).value = data.email_address;
        if (data.mobile_no) (form.elements.namedItem('mobile_no') as HTMLInputElement).value = data.mobile_no;
        if (data.residential_address) (form.elements.namedItem('residential_address') as HTMLInputElement).value = data.residential_address;
        if (data.sex) (form.elements.namedItem('sex') as HTMLSelectElement).value = data.sex;

        if (data.work_experience && Array.isArray(data.work_experience)) {
          data.work_experience.forEach((work: any, index: number) => {
            const row = index + 1;
            if (row <= 4) {
              const posInput = form.elements.namedItem(`work_position_${row}`) as HTMLInputElement;
              const compInput = form.elements.namedItem(`work_company_${row}`) as HTMLInputElement;
              if (posInput && work.position) posInput.value = work.position;
              if (compInput && work.company) compInput.value = work.company;
            }
          });
        }

        Swal.fire('Success', 'Resume parsed! Fields have been auto-filled.', 'success');
      } else {
        Swal.fire('Error', resData.message || 'Failed to parse resume.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Server error while parsing resume.', 'error');
    } finally {
      setIsParsing(false);
      e.target.value = '';
    }
  };

  const tabs = [
    { id: 'C1', label: 'C1 - Personal Info' },
    { id: 'C2', label: 'C2 - Eligibility & Work' },
    { id: 'C3', label: 'C3 - Training & Others' },
    { id: 'C4', label: 'C4 - Questionnaire' }
  ];

  const handleSubmit = async () => {
    const form = formRef.current;
    if (form) {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const formData = new FormData(form);
      const rawData = Object.fromEntries(formData.entries());
      const data: any = { ...rawData };
      data.jobTitle = jobTitle;
      if (jobId) {
        data.positionId = jobId.toString();
      }

      // Structure Family Background
      data.family_background = {
        spouse: {
          surname: rawData["spouse_surname"] || "",
          first_name: rawData["spouse_first_name"] || "",
          occupation: rawData["spouse_occupation"] || "",
        },
        father: {
          surname: rawData["father_surname"] || "",
          first_name: rawData["father_first_name"] || "",
        },
        mother: {
          maiden_surname: rawData["mother_maiden_surname"] || "",
        }
      };

      // Structure Educational Background
      data.educational_background = [];
      ['Elementary', 'Secondary', 'Vocational / Trade', 'College', 'Graduate Studies'].forEach((level, idx) => {
        const schoolName = rawData[`edu_${idx}_school_name`];
        if (schoolName) {
          data.educational_background.push({
            level: level,
            school_name: schoolName,
            degree_course: rawData[`edu_${idx}_degree_course`] || "",
            attendance_from: rawData[`edu_${idx}_attendance_from`] || "",
            highest_level: rawData[`edu_${idx}_highest_level`] || "",
            year_graduated: rawData[`edu_${idx}_year_graduated`] || "",
          });
        }
      });

      // Structure Civil Service Eligibility
      data.civil_service_eligibility = [];
      [1, 2, 3].forEach((_, idx) => {
        const name = rawData[`elig_${idx}_name`];
        if (name) {
          data.civil_service_eligibility.push({
            name: name,
            rating: rawData[`elig_${idx}_rating`] || "",
            date_of_exam: rawData[`elig_${idx}_date_exam`] || "",
            place_of_exam: rawData[`elig_${idx}_place_exam`] || "",
            license_number: rawData[`elig_${idx}_license_number`] || "",
            license_validity: rawData[`elig_${idx}_license_validity`] || "",
          });
        }
      });

      // Structure Work Experience
      data.work_experience = [];
      [1, 2, 3, 4].forEach((row) => {
        const company = rawData[`work_company_${row}`];
        if (company) {
          data.work_experience.push({
            company: company,
            position: rawData[`work_position_${row}`] || "",
            from_date: rawData[`work_from_${row}`] || "",
            to_date: rawData[`work_to_${row}`] || "",
            salary: rawData[`work_salary_${row}`] || "",
            pay_grade: rawData[`work_pay_grade_${row}`] || "",
            status: rawData[`work_status_${row}`] || "",
            govt_service: rawData[`work_govt_${row}`] || "",
          });
        }
      });

      // Structure Voluntary Work
      data.voluntary_work = [];
      [1, 2].forEach((_, idx) => {
        const org = rawData[`vol_${idx}_organization`];
        if (org) {
          data.voluntary_work.push({
            organization: org,
            from_date: rawData[`vol_${idx}_from`] || "",
            to_date: rawData[`vol_${idx}_to`] || "",
            hours: rawData[`vol_${idx}_hours`] || "",
            position: rawData[`vol_${idx}_position`] || "",
          });
        }
      });

      // Structure L&D
      data.learning_and_development = [];
      [1, 2, 3].forEach((_, idx) => {
        const title = rawData[`ld_${idx}_title`];
        if (title) {
          data.learning_and_development.push({
            title: title,
            from_date: rawData[`ld_${idx}_from`] || "",
            to_date: rawData[`ld_${idx}_to`] || "",
            hours: rawData[`ld_${idx}_hours`] || "",
            type: rawData[`ld_${idx}_type`] || "",
            conducted_by: rawData[`ld_${idx}_conducted`] || "",
          });
        }
      });

      // Structure Other Information
      data.other_information = {
        special_skills: rawData["special_skills"] ? [rawData["special_skills"]] : [],
        distinctions: rawData["distinctions"] ? [rawData["distinctions"]] : [],
        memberships: rawData["memberships"] ? [rawData["memberships"]] : [],
      };

      // Structure Questionnaire
      data.questionnaire_responses = {
        q34a: rawData["q34a"],
        q34b: rawData["q34b"],
        q34b_details: rawData["q34b_details"],
        q35a: rawData["q35a"],
        q35a_details: rawData["q35a_details"],
        q35b: rawData["q35b"],
        q35b_date: rawData["q35b_date"],
        q35b_status: rawData["q35b_status"],
        q36: rawData["q36"],
        q36_details: rawData["q36_details"],
        q37: rawData["q37"],
        q37_details: rawData["q37_details"],
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const resData = await response.json();
          const now = new Date();
          const item = {
            id: resData.data.id,
            applicant_number: resData.data.applicant_number,
            email: resData.data.email_address,
            expiry: now.getTime() + 3 * 60 * 60 * 1000,
          };
          localStorage.setItem('session_data', JSON.stringify(item));

          Swal.fire('Success', `Application submitted successfully! Your Applicant ID is ${resData.data.applicant_number}`, 'success').then(() => {
            navigate('/applicant-jobs');
          });
        } else {
          const errorData = await response.json();
          Swal.fire('Error', errorData.message || 'Application submission failed', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Warning', 'Data collected but backend is unreachable. Please ensure the backend server is running and accessible.', 'warning').then(() => {
          navigate('/');
        });
      }
    }
  };

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
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#022851] rounded-full flex items-center justify-center shadow-inner shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#022851] font-bold text-lg leading-tight tracking-tight">AGAP Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-[#022851] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(8,43,76,0.1)] border border-gray-200/60 flex flex-col gap-8 flex-1">

          <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#022851] tracking-tight mb-2">CS Form No. 212 Application</h1>
              <p className="text-gray-500 font-medium">Applying for: <span className="text-[#022851] font-bold">{jobTitle}</span></p>
            </div>
          </div>

          {/* AI Resume Upload Zone */}
          <div className="p-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/50 text-center hover:bg-blue-50 transition-colors relative group">
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileUpload}
              disabled={isParsing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <UploadCloud className={`w-8 h-8 text-[#0a6fa6] ${isParsing ? 'animate-bounce' : ''}`} />
              </div>
              {isParsing ? (
                <p className="font-bold text-[#022851] text-lg">Scanning Resume with AI...</p>
              ) : (
                <>
                  <p className="font-bold text-[#022851] text-lg">Drag & Drop Resume to Auto-Fill (AI)</p>
                  <p className="text-sm font-medium text-gray-500">Supports PDF and DOCX</p>
                </>
              )}
            </div>
          </div>

          {/* Stepper */}
          <div className="flex border-b border-gray-100 overflow-x-auto hide-scrollbar gap-2 sm:gap-6 pb-2">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const isPast = tabs.findIndex(t => t.id === activeTab) > idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${isActive
                    ? 'border-[#0a6fa6] text-[#022851]'
                    : isPast ? 'border-transparent text-gray-600 hover:text-[#022851]' : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${isActive ? 'bg-[#0a6fa6] text-white' : isPast ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-400'}`}>
                    {idx + 1}
                  </span>
                  {tab.label.split('- ')[1]}
                </button>
              );
            })}
          </div>

          <form id="application-form" ref={formRef} className="space-y-8 pb-10">
            {/* C1: Personal Information */}
            <div className={activeTab === 'C1' ? "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>

              {/* Section I */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">I. Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">SURNAME</label>
                      <input name="surname" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">FIRST NAME</label>
                      <input name="first_name" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">MIDDLE NAME</label>
                      <input name="middle_name" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">DATE OF BIRTH</label>
                    <ModernDatePicker required name="date_of_birth" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">PLACE OF BIRTH</label>
                    <input required name="place_of_birth" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">SEX</label>
                    <select name="sex" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all text-gray-700">
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">CIVIL STATUS</label>
                    <select name="civil_status" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all text-gray-700">
                      <option value="">Select...</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">CITIZENSHIP</label>
                    <input name="citizenship" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" defaultValue="Filipino" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">BLOOD TYPE</label>
                    <input name="blood_type" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>

                  <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-5 mt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">GSIS ID NO.</label>
                      <input name="gsis_id_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">PAG-IBIG ID NO.</label>
                      <input name="pag_ibig_id_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">PHILHEALTH NO.</label>
                      <input name="philhealth_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">SSS NO.</label>
                      <input name="sss_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-3 mt-4 border-t border-gray-100 pt-6">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">RESIDENTIAL ADDRESS</label>
                    <textarea name="residential_address" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all resize-none" rows={2}></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">PERMANENT ADDRESS</label>
                    <textarea name="permanent_address" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all resize-none" rows={2}></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">TELEPHONE NO.</label>
                    <input name="telephone_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">MOBILE NO.</label>
                    <input name="mobile_no" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">E-MAIL ADDRESS</label>
                    <input name="email_address" type="email" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                  </div>
                  <div className="col-span-1 md:col-span-3 border-t border-gray-100 pt-6 mt-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">PASSWORD <span className="text-[#0a6fa6]">(For Applicant Portal Access)</span></label>
                    <input name="password" type="password" className="w-full md:w-1/3 p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" required minLength={8} />
                  </div>
                </div>
              </div>

              {/* Section II */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">II. Family Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <h4 className="font-bold text-[#0a6fa6] text-sm">Spouse Information</h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">SPOUSE'S SURNAME</label>
                      <input name="spouse_surname" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">FIRST NAME</label>
                      <input name="spouse_first_name" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">OCCUPATION</label>
                      <input name="spouse_occupation" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h4 className="font-bold text-[#0a6fa6] text-sm">Parents Information</h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">FATHER'S SURNAME</label>
                      <input name="father_surname" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">FATHER'S FIRST NAME</label>
                      <input name="father_first_name" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">MOTHER'S MAIDEN SURNAME</label>
                      <input name="mother_maiden_surname" type="text" className="w-full p-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section III */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">III. Educational Background</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs font-bold text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 border-r border-gray-200">Level</th>
                        <th className="px-4 py-3 border-r border-gray-200">Name of School (Write in full)</th>
                        <th className="px-4 py-3 border-r border-gray-200">Basic Education/Degree/Course</th>
                        <th className="px-4 py-3 border-r border-gray-200">Period of Attendance</th>
                        <th className="px-4 py-3 border-r border-gray-200">Highest Level/Units Earned</th>
                        <th className="px-4 py-3">Year Graduated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {['Elementary', 'Secondary', 'Vocational / Trade', 'College', 'Graduate Studies'].map((level, idx) => (
                        <tr key={level} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 border-r border-gray-100 font-bold text-gray-700 whitespace-nowrap">{level}</td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`edu_${idx}_school_name`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`edu_${idx}_degree_course`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`edu_${idx}_attendance_from`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" placeholder="From - To" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`edu_${idx}_highest_level`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1"><input name={`edu_${idx}_year_graduated`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* C2: Eligibility & Work Experience */}
            <div className={activeTab === 'C2' ? "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
              {/* Section IV */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">IV. Eligibility</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs font-bold text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 border-r border-gray-200">Career Service/ RA 1080 (Board/ Bar) / Under Special Laws / CES / Driver's License</th>
                        <th className="px-4 py-3 border-r border-gray-200">Rating</th>
                        <th className="px-4 py-3 border-r border-gray-200">Date of Exam/Conferment</th>
                        <th className="px-4 py-3 border-r border-gray-200">Place of Exam / Conferment</th>
                        <th className="px-4 py-3 border-r border-gray-200">License Number</th>
                        <th className="px-4 py-3">License Date of Validity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[1, 2, 3].map((row, idx) => (
                        <tr key={row} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`elig_${idx}_name`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`elig_${idx}_rating`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`elig_${idx}_date_exam`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`elig_${idx}_place_exam`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`elig_${idx}_license_number`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1"><ModernDatePicker name={`elig_${idx}_license_validity`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section V */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">V. Work Experience</h3>
                <p className="text-[13px] font-medium text-gray-500">(Include private employment. Start from your recent work) Description of duties should be indicated in the attached Work Experience Sheet.</p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left min-w-[900px]">
                    <thead className="bg-gray-50 text-[11px] font-bold text-gray-600 border-b border-gray-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-r border-gray-200 text-center" colSpan={2}>Inclusive Dates</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Position Title</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Department/Agency/Office/Company</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Monthly Salary</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Salary Grade</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Status of Appointment</th>
                        <th className="px-4 py-3" rowSpan={2}>Gov't (Y/N)</th>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50/50">
                        <th className="px-4 py-2 border-r border-gray-200">From</th>
                        <th className="px-4 py-2 border-r border-gray-200">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[1, 2, 3, 4].map(row => (
                        <tr key={row} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`work_from_${row}`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`work_to_${row}`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`work_position_${row}`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`work_company_${row}`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`work_salary_${row}`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`work_pay_grade_${row}`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`work_status_${row}`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1">
                            <select name={`work_govt_${row}`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-700 font-bold">
                              <option value="">-</option>
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* C3: Training & Others */}
            <div className={activeTab === 'C3' ? "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
              {/* Section VI */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">VI. Voluntary Work or Involvement in Civic / Non-Government Organizations</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-[11px] font-bold text-gray-600 border-b border-gray-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Name & Address of Organization</th>
                        <th className="px-4 py-3 border-r border-gray-200 text-center" colSpan={2}>Inclusive Dates</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Number of Hours</th>
                        <th className="px-4 py-3" rowSpan={2}>Position / Nature of Work</th>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50/50">
                        <th className="px-4 py-2 border-r border-gray-200">From</th>
                        <th className="px-4 py-2 border-r border-gray-200">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[1, 2].map((row, idx) => (
                        <tr key={row} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`vol_${idx}_organization`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`vol_${idx}_from`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`vol_${idx}_to`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`vol_${idx}_hours`} type="number" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1"><input name={`vol_${idx}_position`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section VII */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">VII. Learning and Development (L&D) Interventions / Training Programs Attended</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-[11px] font-bold text-gray-600 border-b border-gray-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Title of L&D Interventions/Training Programs</th>
                        <th className="px-4 py-3 border-r border-gray-200 text-center" colSpan={2}>Inclusive Dates</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Number of Hours</th>
                        <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Type of L&D (Managerial/ Supervisory/ Technical/ etc)</th>
                        <th className="px-4 py-3" rowSpan={2}>Conducted/Sponsored By</th>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50/50">
                        <th className="px-4 py-2 border-r border-gray-200">From</th>
                        <th className="px-4 py-2 border-r border-gray-200">To</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[1, 2, 3].map((row, idx) => (
                        <tr key={row} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`ld_${idx}_title`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`ld_${idx}_from`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><ModernDatePicker name={`ld_${idx}_to`} className="w-full p-2 bg-transparent outline-none focus:bg-white rounded text-gray-600" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`ld_${idx}_hours`} type="number" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1 border-r border-gray-100"><input name={`ld_${idx}_type`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                          <td className="px-2 py-1"><input name={`ld_${idx}_conducted`} type="text" className="w-full p-2 bg-transparent outline-none focus:bg-white rounded" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section VIII */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-[15px] font-extrabold text-[#022851] border-b border-gray-100 pb-3 uppercase tracking-wider">VIII. Other Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#0a6fa6] text-sm">Special Skills and Hobbies</h4>
                    <textarea name="special_skills" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all resize-none" rows={4} placeholder="Enter Special Skills"></textarea>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#0a6fa6] text-sm">Non-Academic Distinctions / Recognition</h4>
                    <textarea name="distinctions" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all resize-none" rows={4} placeholder="Enter Non-Academic Distinctions"></textarea>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#0a6fa6] text-sm">Membership in Association/Organization</h4>
                    <textarea name="memberships" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none focus:border-[#0a6fa6] focus:ring-1 focus:ring-[#0a6fa6] transition-all resize-none" rows={4} placeholder="Enter Memberships in Organizations"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* C4: Questionnaire & References */}
            <div className={activeTab === 'C4' ? "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
              <div className="bg-yellow-50/80 border border-yellow-200 rounded-xl p-5 mb-8 text-sm text-yellow-800 shadow-sm flex flex-col gap-1">
                <p className="font-extrabold uppercase tracking-widest text-xs text-yellow-600">Declaration</p>
                <p className="font-medium">Please answer the following questions truthfully. Misrepresentation of any information is a ground for administrative/criminal cases.</p>
              </div>

              <div className="space-y-5">
                {/* Q34 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <p className="font-bold text-[15px] text-[#022851] leading-relaxed">
                    34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed,
                  </p>
                  <div className="pl-6 space-y-5 text-[15px] text-gray-700 font-medium">
                    <div className="flex flex-col gap-2.5">
                      <p>a. within the third degree?</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q34a" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q34a" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p>b. within the fourth degree (for Local Government Unit - Career Employees)?</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q34b" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q34b" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                      </div>
                      <input name="q34b_details" type="text" placeholder="If YES, give details" className="mt-2 p-2.5 border border-gray-200 rounded-xl w-full bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                    </div>
                  </div>
                </div>

                {/* Q35 */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="space-y-5 text-[15px] text-gray-700 font-medium">
                    <div className="flex flex-col gap-2.5">
                      <p className="font-bold text-[#022851]">35. a. Have you ever been found guilty of any administrative offense?</p>
                      <div className="flex gap-6 pl-6">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q35a" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q35a" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                      </div>
                      <input name="q35a_details" type="text" placeholder="If YES, give details" className="ml-6 mt-1 p-2.5 border border-gray-200 rounded-xl w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <p className="font-bold text-[#022851]">b. Have you been criminally charged before any court?</p>
                      <div className="flex gap-6 pl-6">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q35b" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q35b" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                      </div>
                      <div className="ml-6 flex flex-col gap-3 mt-1">
                        <input name="q35b_date" type="text" placeholder="If YES, give details (Date Filed)" className="p-2.5 border border-gray-200 rounded-xl w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                        <input name="q35b_status" type="text" placeholder="Status of Case/s" className="p-2.5 border border-gray-200 rounded-xl w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional questions formatted similarly */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <p className="font-bold text-[15px] text-[#022851] leading-relaxed">
                    36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?
                  </p>
                  <div className="flex gap-6 pl-6 text-[15px] font-medium text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q36" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q36" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                  </div>
                  <input name="q36_details" type="text" placeholder="If YES, give details" className="ml-6 mt-2 p-2.5 border border-gray-200 rounded-xl w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <p className="font-bold text-[15px] text-[#022851] leading-relaxed">
                    37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?
                  </p>
                  <div className="flex gap-6 pl-6 text-[15px] font-medium text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q37" value="yes" className="w-4 h-4 accent-[#0a6fa6]" /> Yes</label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#0a6fa6]"><input type="radio" name="q37" value="no" className="w-4 h-4 accent-[#0a6fa6]" /> No</label>
                  </div>
                  <input name="q37_details" type="text" placeholder="If YES, give details" className="ml-6 mt-2 p-2.5 border border-gray-200 rounded-xl w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-[#0a6fa6] transition-all" />
                </div>
              </div>
            </div>

          </form>

          {/* Sticky Action Bar */}
          <div className="mt-auto border-t border-gray-100 pt-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky bottom-0 z-20">
            <div className="text-[15px] text-gray-500 font-bold">
              Step <span className="text-[#0a6fa6] text-lg mx-0.5">{tabs.findIndex(t => t.id === activeTab) + 1}</span> of 4
            </div>
            <div className="flex gap-3">
              {activeTab !== 'C1' && (
                <button
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    setActiveTab(tabs[currentIndex - 1].id);
                  }}
                  className="px-6 py-3 flex items-center gap-2 text-[15px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              )}

              {activeTab !== 'C4' ? (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(t => t.id === activeTab);
                    setActiveTab(tabs[currentIndex + 1].id);
                  }}
                  className="px-8 py-3 flex items-center gap-2 text-[15px] font-bold text-white bg-[#022851] hover:bg-[#033a76] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-10 py-3 text-[15px] font-bold text-white bg-[#0a6fa6] hover:bg-[#085a87] rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl active:scale-95"
                >
                  SUBMIT APPLICATION
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
