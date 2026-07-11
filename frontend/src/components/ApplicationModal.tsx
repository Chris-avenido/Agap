import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { X, ChevronRight, ChevronLeft, UploadCloud, Eye, EyeOff } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: number | null;
}

export default function ApplicationModal({ isOpen, onClose, jobTitle, jobId }: ApplicationModalProps) {
  const [activeTab, setActiveTab] = useState('C1');
  const [isParsing, setIsParsing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
      // Reset input so they can upload again if needed
      e.target.value = '';
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'C1', label: 'C1 - Personal Info' },
    { id: 'C2', label: 'C2 - Eligibility & Work' },
    { id: 'C3', label: 'C3 - Training & Others' },
    { id: 'C4', label: 'C4 - Questionnaire' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-brand-700 text-white rounded-t-lg">
          <div>
            <h2 className="text-xl font-semibold">CS Form No. 212 Application</h2>
            <p className="text-sm opacity-90 text-gray-200">Applying for: {jobTitle}</p>
          </div>
          <button onClick={onClose} className="hover:bg-brand-600 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-brand-600 text-brand-700 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          
          {/* AI Resume Upload Zone */}
          <div className="mb-6 p-6 border-2 border-dashed border-brand-300 rounded-lg bg-brand-50 text-center hover:bg-brand-100 transition-colors relative">
            <input 
              type="file" 
              accept=".pdf,.docx,.doc" 
              onChange={handleFileUpload} 
              disabled={isParsing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <UploadCloud className={`w-10 h-10 text-brand-600 ${isParsing ? 'animate-bounce' : ''}`} />
              {isParsing ? (
                <p className="font-semibold text-brand-700">Scanning Resume with AI...</p>
              ) : (
                <>
                  <p className="font-semibold text-brand-700">Drag & Drop Resume to Auto-Fill (AI)</p>
                  <p className="text-sm text-brand-600/80">Supports PDF and DOCX</p>
                </>
              )}
            </div>
          </div>

          <form id="application-form" ref={formRef} className="space-y-6">
            
            {/* C1: Personal Information */}
            <div className={activeTab === 'C1' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                
                {/* Section I */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">I. Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SURNAME</label>
                        <input name="surname" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">FIRST NAME</label>
                        <input name="first_name" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">MIDDLE NAME</label>
                        <input name="middle_name" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">DATE OF BIRTH (mm/dd/yyyy)</label>
                      <input name="date_of_birth" type="date" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">PLACE OF BIRTH</label>
                      <input name="place_of_birth" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">SEX</label>
                      <select name="sex" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500">
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">CIVIL STATUS</label>
                      <select name="civil_status" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500">
                        <option value="">Select...</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">CITIZENSHIP</label>
                      <input name="citizenship" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" defaultValue="Filipino" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">BLOOD TYPE</label>
                      <input name="blood_type" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>

                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">GSIS ID NO.</label>
                        <input name="gsis_id_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">PAG-IBIG ID NO.</label>
                        <input name="pag_ibig_id_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">PHILHEALTH NO.</label>
                        <input name="philhealth_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SSS NO.</label>
                        <input name="sss_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                    </div>
                    
                    <div className="col-span-3 mt-2 border-t pt-4">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">RESIDENTIAL ADDRESS</label>
                      <textarea name="residential_address" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" rows={2}></textarea>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">PERMANENT ADDRESS</label>
                      <textarea name="permanent_address" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" rows={2}></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">TELEPHONE NO.</label>
                      <input name="telephone_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">MOBILE NO.</label>
                      <input name="mobile_no" type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">E-MAIL ADDRESS</label>
                      <input name="email_address" type="email" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">PASSWORD (For Portal Access)</label>
                      <div className="relative">
                        <input name="password" type={showPassword ? "text" : "password"} className="w-full p-2 pr-10 border rounded bg-gray-50 focus:bg-white outline-brand-500" required minLength={8} />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section II */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">II. Family Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 text-sm">Spouse Information</h4>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SPOUSE'S SURNAME</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">FIRST NAME</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">OCCUPATION</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 text-sm">Parents Information</h4>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">FATHER'S SURNAME</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">FATHER'S FIRST NAME</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">MOTHER'S MAIDEN SURNAME</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section III */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">III. Educational Background</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                      <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-2 border">Level</th>
                          <th className="px-4 py-2 border">Name of School (Write in full)</th>
                          <th className="px-4 py-2 border">Basic Education/Degree/Course (Write in full)</th>
                          <th className="px-4 py-2 border">Period of Attendance (From - To)</th>
                          <th className="px-4 py-2 border">Highest Level/Units Earned (if not graduated)</th>
                          <th className="px-4 py-2 border">Year Graduated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['Elementary', 'Secondary', 'Vocational / Trade Course', 'College', 'Graduate Studies'].map(level => (
                          <tr key={level}>
                            <td className="px-4 py-2 border font-medium">{level}</td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border">
                              <div className="flex items-center gap-1">
                                <input type="date" className="w-full p-1 bg-transparent outline-none text-xs" />
                                <span className="text-gray-400 text-xs">-</span>
                                <input type="date" className="w-full p-1 bg-transparent outline-none text-xs" />
                              </div>
                            </td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            {/* C2: Eligibility & Work Experience */}
            <div className={activeTab === 'C2' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                {/* Section IV */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">IV. Eligibility</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                      <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-2 border">Career Service/ RA 1080 (Board/ Bar) / Under Special Laws / CES / CSEE / Barangay Eligibility / Driver's License</th>
                          <th className="px-4 py-2 border">Rating (If Applicable)</th>
                          <th className="px-4 py-2 border">Date of Examination/Conferment</th>
                          <th className="px-4 py-2 border">Place of Examination / Conferment</th>
                          <th className="px-4 py-2 border">License Number</th>
                          <th className="px-4 py-2 border">License Date of Validity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map(row => (
                          <tr key={row}>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section V */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">V. Work Experience</h3>
                  <p className="text-xs text-gray-500">(Include private employment. Start from your recent work) Description of duties should be indicated in the attached Work Experience Sheet.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border min-w-[800px]">
                      <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-2 border text-center" colSpan={2}>Inclusive Dates (mm/dd/yyyy)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Position Title (Write in full/Do not abbreviate)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Department/Agency/Office/Company (Write in full/Do not abbreviate)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Monthly Salary</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Salary/ Job/ Pay Grade</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Status of Appointment</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Gov't Service (Y/N)</th>
                        </tr>
                        <tr>
                          <th className="px-4 py-2 border">From</th>
                          <th className="px-4 py-2 border">To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4].map(row => (
                          <tr key={row}>
                            <td className="px-2 py-1 border"><input name={`work_from_${row}`} type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_to_${row}`} type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_position_${row}`} type="text" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_company_${row}`} type="text" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_salary_${row}`} type="text" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_pay_grade_${row}`} type="text" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input name={`work_status_${row}`} type="text" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border">
                              <select name={`work_govt_${row}`} className="w-full p-1 bg-transparent outline-none text-xs">
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
            <div className={activeTab === 'C3' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                {/* Section VI */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">VI. Voluntary Work or Involvement in Civic/Non-Government / People / Voluntary Organizations</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                      <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-2 border" rowSpan={2}>Name & Address of Organization (Write in full)</th>
                          <th className="px-4 py-2 border text-center" colSpan={2}>Inclusive Dates (mm/dd/yyyy)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Number of Hours</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Position / Nature of Work</th>
                        </tr>
                        <tr>
                          <th className="px-4 py-2 border">From</th>
                          <th className="px-4 py-2 border">To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2].map(row => (
                          <tr key={row}>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input type="number" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section VII */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">VII. Learning and Development (L&D) Interventions/Training Programs Attended</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                      <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-2 border" rowSpan={2}>Title of L&D Interventions/Training Programs (Write in full)</th>
                          <th className="px-4 py-2 border text-center" colSpan={2}>Inclusive Dates of Attendance (mm/dd/yyyy)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Number of Hours</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Type of L&D (Managerial/ Supervisory/ Technical/ etc)</th>
                          <th className="px-4 py-2 border" rowSpan={2}>Conducted/Sponsored By (Write in full)</th>
                        </tr>
                        <tr>
                          <th className="px-4 py-2 border">From</th>
                          <th className="px-4 py-2 border">To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map(row => (
                          <tr key={row}>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input type="date" className="w-full p-1 bg-transparent outline-none text-xs" /></td>
                            <td className="px-2 py-1 border"><input type="number" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                            <td className="px-2 py-1 border"><input type="text" className="w-full p-1 bg-transparent outline-none" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section VIII */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">VIII. Other Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm">Special Skills and Hobbies</h4>
                      <textarea className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" rows={4}></textarea>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm">Non-Academic Distinctions / Recognition</h4>
                      <textarea className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" rows={4}></textarea>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 text-sm">Membership in Association/Organization</h4>
                      <textarea className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" rows={4}></textarea>
                    </div>
                  </div>
                </div>
              </div>

            {/* C4: Questionnaire & References */}
            <div className={activeTab === 'C4' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-sm text-yellow-800">
                  <p className="font-bold mb-1">DECLARATION</p>
                  <p>Please answer the following questions truthfully. Misrepresentation of any information is a ground for administrative/criminal cases.</p>
                </div>

                {/* Q34 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-4">
                  <p className="font-medium text-sm text-gray-800">
                    34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed,
                  </p>
                  
                  <div className="pl-6 space-y-4 text-sm text-gray-700">
                    <div className="flex flex-col gap-2">
                      <p>a. within the third degree?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="q34a" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q34a" value="no" className="accent-brand-600" /> No</label>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p>b. within the fourth degree (for Local Government Unit - Career Employees)?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="q34b" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q34b" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, give details" className="mt-2 p-2 border rounded w-full bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                  </div>
                </div>

                {/* Q35 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-4">
                  <div className="space-y-4 text-sm text-gray-800">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">35. a. Have you ever been found guilty of any administrative offense?</p>
                      <div className="flex gap-4 pl-6">
                        <label className="flex items-center gap-2"><input type="radio" name="q35a" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q35a" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, give details" className="ml-6 mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">b. Have you been criminally charged before any court?</p>
                      <div className="flex gap-4 pl-6">
                        <label className="flex items-center gap-2"><input type="radio" name="q35b" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q35b" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <div className="ml-6 flex flex-col gap-2">
                        <input type="text" placeholder="If YES, give details (Date Filed)" className="p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                        <input type="text" placeholder="Status of Case/s" className="p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q36 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-3">
                  <p className="font-medium text-sm text-gray-800">
                    36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?
                  </p>
                  <div className="flex gap-4 pl-6 text-sm">
                    <label className="flex items-center gap-2"><input type="radio" name="q36" value="yes" className="accent-brand-600" /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="q36" value="no" className="accent-brand-600" /> No</label>
                  </div>
                  <input type="text" placeholder="If YES, give details" className="ml-6 mt-2 p-2 border rounded w-full md:w-2/3 text-sm bg-gray-50 focus:bg-white focus:outline-brand-500" />
                </div>

                {/* Q37 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-3">
                  <p className="font-medium text-sm text-gray-800">
                    37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?
                  </p>
                  <div className="flex gap-4 pl-6 text-sm">
                    <label className="flex items-center gap-2"><input type="radio" name="q37" value="yes" className="accent-brand-600" /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="q37" value="no" className="accent-brand-600" /> No</label>
                  </div>
                  <input type="text" placeholder="If YES, give details" className="ml-6 mt-2 p-2 border rounded w-full md:w-2/3 text-sm bg-gray-50 focus:bg-white focus:outline-brand-500" />
                </div>

                {/* Q38 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-4">
                  <div className="space-y-4 text-sm text-gray-800">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</p>
                      <div className="flex gap-4 pl-6">
                        <label className="flex items-center gap-2"><input type="radio" name="q38a" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q38a" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, give details" className="ml-6 mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</p>
                      <div className="flex gap-4 pl-6">
                        <label className="flex items-center gap-2"><input type="radio" name="q38b" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q38b" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, give details" className="ml-6 mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                  </div>
                </div>

                {/* Q39 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-3">
                  <p className="font-medium text-sm text-gray-800">
                    39. Have you acquired the status of an immigrant or permanent resident of another country?
                  </p>
                  <div className="flex gap-4 pl-6 text-sm">
                    <label className="flex items-center gap-2"><input type="radio" name="q39" value="yes" className="accent-brand-600" /> Yes</label>
                    <label className="flex items-center gap-2"><input type="radio" name="q39" value="no" className="accent-brand-600" /> No</label>
                  </div>
                  <input type="text" placeholder="If YES, give details (country)" className="ml-6 mt-2 p-2 border rounded w-full md:w-2/3 text-sm bg-gray-50 focus:bg-white focus:outline-brand-500" />
                </div>

                {/* Q40 */}
                <div className="bg-white p-5 rounded border shadow-sm space-y-4">
                  <p className="font-medium text-sm text-gray-800">
                    40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:
                  </p>
                  
                  <div className="pl-6 space-y-4 text-sm text-gray-700">
                    <div className="flex flex-col gap-2">
                      <p>a. Are you a member of any indigenous group?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="q40a" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q40a" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, please specify" className="mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p>b. Are you a person with disability?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="q40b" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q40b" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, please specify ID No" className="mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p>c. Are you a solo parent?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="q40c" value="yes" className="accent-brand-600" /> Yes</label>
                        <label className="flex items-center gap-2"><input type="radio" name="q40c" value="no" className="accent-brand-600" /> No</label>
                      </div>
                      <input type="text" placeholder="If YES, please specify ID No" className="mt-1 p-2 border rounded w-full md:w-2/3 bg-gray-50 focus:bg-white focus:outline-brand-500" />
                    </div>
                  </div>
                </div>

            </div>
            
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white flex justify-between items-center rounded-b-lg">
          <div className="text-sm text-gray-500 font-medium">
            Step {tabs.findIndex(t => t.id === activeTab) + 1} of 4
          </div>
          <div className="flex gap-3">
            {activeTab !== 'C1' && (
              <button 
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[currentIndex - 1].id);
                }}
                className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> BACK
              </button>
            )}
            
            {activeTab !== 'C4' ? (
              <button 
                type="button"
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[currentIndex + 1].id);
                }}
                className="px-6 py-2 flex items-center gap-1 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded transition-colors shadow-sm"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={async () => {
                  const form = document.getElementById('application-form') as HTMLFormElement;
                  if (form) {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    data.jobTitle = jobTitle; // append jobTitle
                    if (jobId) {
                      data.positionId = jobId.toString(); // append positionId
                    } 

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
                          email: resData.data.email_address,
                          expiry: now.getTime() + 3 * 60 * 60 * 1000,
                        };
                        localStorage.setItem('session_data', JSON.stringify(item));

                        Swal.fire('Success', 'Application submitted successfully!', 'success');
                        onClose();
                        window.location.href = '/applicant-jobs';
                      } else {
                        const errorData = await response.json();
                        Swal.fire('Error', errorData.message || 'Application submission failed', 'error');
                      }
                    } catch (error) {
                      console.error('Error:', error);
                      Swal.fire('Warning', 'Data collected but backend is unreachable. Start the NestJS backend to fully save to DB.', 'warning');
                      onClose();
                    }
                  }
                }}
                className="px-8 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded transition-colors shadow-sm"
              >
                SUBMIT APPLICATION
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
