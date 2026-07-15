import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { X, ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, FileText } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: number | null;
}

export default function ApplicationModal({ isOpen, onClose, jobTitle, jobId }: ApplicationModalProps) {
  const [activeTab, setActiveTab] = useState('C1');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserData(data.data);
          }
        });
    }
  }, []);

      const formRef = useRef<HTMLFormElement>(null);



  const resAddress = userData?.residential_address ? (typeof userData.residential_address === 'string' ? JSON.parse(userData.residential_address) : userData.residential_address) : {};
  const permAddress = userData?.permanent_address ? (typeof userData.permanent_address === 'string' ? JSON.parse(userData.permanent_address) : userData.permanent_address) : {};
  const familyBackground = userData?.family_background ? (typeof userData.family_background === 'string' ? JSON.parse(userData.family_background) : userData.family_background) : {};
  const otherInfo = userData?.other_information ? (typeof userData.other_information === 'string' ? JSON.parse(userData.other_information) : userData.other_information) : {};

  if (!isOpen) return null;

  const tabs = [
    { id: 'C1', label: 'Personal Information', icon: User },
    { id: 'C2', label: 'Family Background', icon: FileText },
    { id: 'C3', label: 'Educational Background', icon: GraduationCap },
    { id: 'C4', label: 'Eligibility', icon: FileText },
    { id: 'C5', label: 'Work Experience', icon: Briefcase },
    { id: 'C6', label: 'Voluntary Work', icon: FileText },
    { id: 'C7', label: 'Learning & Development', icon: FileText },
    { id: 'C8', label: 'Other Information', icon: FileText },
    { id: 'C9', label: 'Legal Questionnaire', icon: FileText },
    { id: 'C10', label: 'Essential Documents', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 md:p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-[#eff3f8] p-4 md:p-6 w-full max-w-7xl h-[95vh] md:h-[90vh] max-h-[1000px] overflow-hidden rounded-lg shadow-2xl relative">
        
        {/* Close Button Absolute */}
        <button onClick={onClose} className="absolute top-2 right-2 md:top-4 md:right-4 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500 bg-white shadow-sm z-50">
          <X className="w-5 h-5" />
        </button>

        {/* Left Sidebar */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col bg-white shadow-sm shrink-0 md:h-fit h-auto max-h-[40vh] md:max-h-full border border-gray-100 rounded-sm overflow-hidden md:overflow-y-auto scrollbar-thin z-10">
          <div className="bg-[#1a73e8] p-4 md:p-5 flex items-center gap-3 md:gap-4 border-b-4 border-red-500 rounded-none shrink-0">
            <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] bg-white rounded-full flex flex-col items-center justify-center font-extrabold text-[9px] md:text-[11px] leading-none text-center text-black shrink-0 shadow-sm overflow-hidden">
              {userData?.photo_url ? (
                <img src={userData.photo_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <>
                  <span>UPLOAD</span>
                  <span>PHOTO</span>
                </>
              )}
            </div>
            <div className="flex flex-col text-white">
              <span className="font-bold text-[14px] md:text-[16px] uppercase tracking-wide">
                {userData ? `${userData.first_name || ''} ${userData.surname || ''}`.trim() : 'APPLICANT'}
              </span>
              <span className="text-[12px] md:text-[13px] leading-snug mt-0.5 md:mt-1 opacity-90">Applying for {jobTitle}</span>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide border-b md:border-b-0 border-gray-100 shrink-0">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              // We can determine 'completed' visually if it's before the active tab roughly
              const currentIndex = tabs.findIndex(t => t.id === activeTab);
              const isCompleted = idx < currentIndex;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 text-left border-r md:border-r-0 md:border-b border-gray-50 hover:bg-gray-50 transition-colors whitespace-nowrap min-w-max md:min-w-0 ${isActive ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-center gap-2 md:gap-3.5">
                    <div className={`w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full flex items-center justify-center shrink-0 ${isActive || isCompleted ? 'bg-[#34a853]' : 'bg-gray-100'}`}>
                      <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive || isCompleted ? 'text-white' : 'text-gray-300'}`} />
                    </div>
                    <span className={`text-[13px] md:text-[14px] font-semibold tracking-wide ${isActive ? 'text-[#1a73e8]' : 'text-[#8599ad]'}`}>{tab.label}</span>
                  </div>
                  <div className={`hidden md:block w-2 h-2 rounded-full shrink-0 ml-4 ${isCompleted ? 'bg-[#34a853]' : (isActive ? 'bg-red-500' : 'bg-gray-200')}`}></div>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex flex-col mt-4 border border-gray-200 rounded p-4 mx-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-[34px] h-[38px] bg-gray-100 flex flex-col items-center justify-center relative border border-gray-200 rounded-sm overflow-hidden shrink-0">
                <div className="absolute top-1 text-orange-400 font-extrabold text-[14px]">↑</div>
                <div className="w-full h-1.5 bg-blue-500 absolute bottom-0"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] text-gray-700">Upload Letter of Intent</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">?</div>
                </div>
                <span className="text-[11px] text-gray-500">For this position.</span>
              </div>
            </div>
            <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[42px] w-full flex items-center justify-center text-center">
              Upload Now
              <input className="hidden" type="file" />
            </label>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 overflow-y-auto max-h-full pr-1 md:pr-2 scrollbar-thin pb-10">

          {/* Progress Alert */}
          <div className="bg-[#e8f5e9] border border-[#bbf7d0] p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl shadow-sm shrink-0">
            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2e7d32] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[14px] md:text-[15px] font-bold text-[#1b5e20]">Complete your Profile</h2>
                <p className="text-xs md:text-sm text-[#2e7d32] font-medium leading-snug">
                  Your profile is 100.00% complete. Fill in the missing information below to improve your chances.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64 shrink-0">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-[11px] font-extrabold text-[#1b5e20] tracking-wider uppercase">Progress</span>
                <span className="text-[11px] font-extrabold text-[#1b5e20]">100.00%</span>
              </div>
              <div className="w-full bg-[#bbf7d0] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2e7d32] h-full transition-all duration-500 rounded-full" style={{ width: `100%` }}></div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Box */}
          <div className="bg-white p-4 md:p-10 border border-gray-200 shadow-sm flex flex-col items-center rounded-sm [&_input[type='text']]:uppercase [&_input[type='email']]:uppercase [&_textarea]:uppercase">
            <h3 className="text-[16px] md:text-[18px] text-gray-500 uppercase tracking-widest mb-6 md:mb-10 text-center font-light">
              {tabs.find(t => t.id === activeTab)?.label || 'PERSONAL INFORMATION'}
            </h3>
          <form id="application-form" ref={formRef} className="space-y-4 md:space-y-6 w-full">
            
            {/* C1: Personal Information */}
            <div className={activeTab === 'C1' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
<div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Name <span className="text-red-500">*</span></label><div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span><input required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={userData?.first_name || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span><input  placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"  type="text"   name="middle_name" defaultValue={userData?.middle_name || ''} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Last Name</span><input  required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"  type="text"   name="surname" defaultValue={userData?.surname || ''} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Extension Name</span><input  placeholder="Enter extension name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"  type="text"   name="extension_name" defaultValue={otherInfo?.extension_name || ''} /></div></div></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Birth Details <span className="text-red-500">*</span></label><div className="flex-1 flex flex-col sm:flex-row gap-4"><div className="w-full sm:w-[35%] flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Birth</span><input  placeholder="Select date of birth" className="w-full border border-gray-300 bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer focus:border-blue-500 text-gray-700 "  type="date"   name="date_of_birth" defaultValue={userData?.date_of_birth ? userData.date_of_birth.split('T')[0] : ''} /></div><div className="flex-1 flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">City, town, etc.</span><input required placeholder="Enter place of birth" className="w-full border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" type="text" defaultValue={userData?.place_of_birth || ""} /></div></div></div><div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Sex <span className="text-red-500">*</span></label><div className="flex gap-4"><button type="button" className={`${userData?.sex === "MALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500"} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}><div className={`w-2.5 h-2.5 rounded-full ${userData?.sex === "MALE" ? "bg-white" : "bg-gray-400"}`}></div> MALE</button><button type="button" className={`${userData?.sex === "FEMALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"} border border-gray-200 px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}><div className={`w-2.5 h-2.5 rounded-full ${userData?.sex === "FEMALE" ? "bg-white" : "bg-gray-400"}`}></div> FEMALE</button></div></div><div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Civil Status <span className="text-red-500">*</span></label><select name="civil_status" defaultValue={userData?.civil_status || ""} required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 min-w-[200px] h-[42px] "><option value="">Select civil status</option><option value="Single">Single</option><option value="Married">Married</option><option value="Widowed">Widowed</option><option value="Separated">Separated</option></select></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Statistics <span className="text-red-500">*</span><div className="text-[10px] text-gray-400 font-normal mt-0.5 leading-tight">Specify your Height,<br />Weight, and Blood Type</div></label><div className="flex-1 flex flex-col sm:flex-row gap-4"><div className="w-full sm:w-1/3 flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Height</span><div className="flex"><input required placeholder="Enter height" className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" type="text" name="height" defaultValue={otherInfo?.height || ""} /><span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">m</span></div></div><div className="w-full sm:w-1/3 flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Weight</span><div className="flex"><input required placeholder="Enter weight" className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" type="text" name="weight" defaultValue={otherInfo?.weight || ""} /><span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">kg</span></div></div><div className="w-full sm:w-1/3 flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Blood Type</span><select name="blood_type" defaultValue={userData?.blood_type || ""} required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"><option value="">Select blood type</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option><option value="Unknown">Unknown</option></select></div></div></div><div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Agency Employee No.<br /><span className="text-[12px] text-gray-400 font-normal">(if any)</span></label><input name="agency_employee_no" placeholder="Enter agency employee number" className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" type="text" defaultValue={otherInfo?.agency_employee_no || ""} /></div><div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Citizenship <span className="text-red-500">*</span></label><div className="flex-1 flex flex-col sm:flex-row items-center gap-6"><select name="citizenship" defaultValue={userData?.citizenship || ""} required className="w-full sm:w-[240px] border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px]"><option value="">Enter citizenship</option><option value="Filipino">Filipino</option><option value="Dual Citizenship">Dual Citizenship</option></select><div className="flex items-center gap-6"><label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600"><input className="w-3.5 h-3.5 text-blue-600 border-gray-300" type="radio" name="citizenship_type" value="by Birth" defaultChecked={otherInfo?.citizenship_type === "by Birth"} />by Birth</label><label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600"><input className="w-3.5 h-3.5 text-blue-600 border-gray-300" type="radio" name="citizenship_type" value="by Naturalization" defaultChecked={otherInfo?.citizenship_type === "by Naturalization"} />by Naturalization</label></div></div></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Residential Address <span className="text-red-500">*</span></label><div className="flex-1 flex flex-col gap-4"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">House / Block / Lot No.</span><input placeholder="Enter house / block / lot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" type="text" name="res_house" defaultValue={resAddress?.house || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Street</span><input placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" type="text" name="res_street" defaultValue={resAddress?.street || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Subdivision / Village</span><input name="res_subdivision" placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" type="text" defaultValue={resAddress?.subdivision || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">ZIP Code</span><input placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" name="res_zip" defaultValue={resAddress?.zip || ""} /></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Region</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"><option value="">Select region</option><option value="01">REGION I (ILOCOS REGION)</option><option value="02">REGION II (CAGAYAN VALLEY)</option><option value="03">REGION III (CENTRAL LUZON)</option><option value="04">REGION IV-A (CALABARZON)</option><option value="17">REGION IV-B (MIMAROPA)</option><option value="05">REGION V (BICOL REGION)</option><option value="06">REGION VI (WESTERN VISAYAS)</option><option value="07">REGION VII (CENTRAL VISAYAS)</option><option value="08">REGION VIII (EASTERN VISAYAS)</option><option value="09">REGION IX (ZAMBOANGA PENINSULA)</option><option value="10">REGION X (NORTHERN MINDANAO)</option><option value="11">REGION XI (DAVAO REGION)</option><option value="12">REGION XII (SOCCSKSARGEN)</option><option value="13">NATIONAL CAPITAL REGION (NCR)</option><option value="14">CORDILLERA ADMINISTRATIVE REGION (CAR)</option><option value="15">AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)</option><option value="16">REGION XIII (Caraga)</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"><option value="">Select province</option><option value="1602">AGUSAN DEL NORTE</option><option value="1603">AGUSAN DEL SUR</option><option value="1667">SURIGAO DEL NORTE</option><option value="1668">SURIGAO DEL SUR</option><option value="1685">DINAGAT ISLANDS</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"><option value="">Select city / municipality</option><option value="160301">CITY OF BAYUGAN</option><option value="160302">BUNAWAN</option><option value="160303">ESPERANZA</option><option value="160304">LA PAZ</option><option value="160305">LORETO</option><option value="160306">PROSPERIDAD (Capital)</option><option value="160307">ROSARIO</option><option value="160308">SAN FRANCISCO</option><option value="160309">SAN LUIS</option><option value="160310">SANTA JOSEFA</option><option value="160311">TALACOGON</option><option value="160312">TRENTO</option><option value="160313">VERUELA</option><option value="160314">SIBAGAT</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"><option value="">Select barangay</option><option value="BuenaGracia">BuenaGracia</option><option value="Causwagan">Causwagan</option><option value="Culi">Culi</option><option value="Del Monte">Del Monte</option><option value="Desamparados">Desamparados</option><option value="Labnig">Labnig</option><option value="Sabang Gibung">Sabang Gibung</option><option value="San Agustin (Pob.)">San Agustin (Pob.)</option><option value="San Isidro (Pob.)">San Isidro (Pob.)</option><option value="San Nicolas (Pob.)">San Nicolas (Pob.)</option><option value="Zamora">Zamora</option><option value="Zillovia">Zillovia</option><option value="La Flora">La Flora</option><option value="Maharlika">Maharlika</option><option value="Marbon">Marbon</option><option value="Batucan">Batucan</option></select></div></div></div></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Permanent Address <span className="text-red-500">*</span></label><div className="flex-1 flex flex-col gap-4"><label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 mb-1"><input className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded" type="checkbox" /><span className="font-bold">Same as Residential Address?</span> <span className="italic text-gray-400">(check if permanent address is same with the above address)</span></label><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">House / Block / Lot No.</span><input name="perm_house" placeholder="Enter house / block / lot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={permAddress?.house || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Street</span><input name="perm_street" placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={permAddress?.street || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Subdivision / Village</span><input name="perm_subdivision" placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={permAddress?.subdivision || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">ZIP Code</span><input name="perm_zip" placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={permAddress?.zip || ""} /></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Region</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"><option value="">Select region</option><option value="01">REGION I (ILOCOS REGION)</option><option value="02">REGION II (CAGAYAN VALLEY)</option><option value="03">REGION III (CENTRAL LUZON)</option><option value="04">REGION IV-A (CALABARZON)</option><option value="17">REGION IV-B (MIMAROPA)</option><option value="05">REGION V (BICOL REGION)</option><option value="06">REGION VI (WESTERN VISAYAS)</option><option value="07">REGION VII (CENTRAL VISAYAS)</option><option value="08">REGION VIII (EASTERN VISAYAS)</option><option value="09">REGION IX (ZAMBOANGA PENINSULA)</option><option value="10">REGION X (NORTHERN MINDANAO)</option><option value="11">REGION XI (DAVAO REGION)</option><option value="12">REGION XII (SOCCSKSARGEN)</option><option value="13">NATIONAL CAPITAL REGION (NCR)</option><option value="14">CORDILLERA ADMINISTRATIVE REGION (CAR)</option><option value="15">AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)</option><option value="16">REGION XIII (Caraga)</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full" disabled><option value="">Select province</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full" disabled><option value="">Select city / municipality</option></select></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span><select required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full" disabled><option value="">Select barangay</option></select></div></div></div></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Contact Nos. <span className="text-red-500">*</span></label><div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span><input required placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" defaultValue={userData?.telephone_no || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Mobile No.</span><input  required placeholder="Enter mobile no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"  type="text"   name="mobile_no" defaultValue={userData?.mobile_no || ''} /></div></div></div><div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8"><label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Email Address <span className="text-red-500">*</span></label><div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Primary</span><input required className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" type="email" defaultValue={userData?.email || ""} /></div><div className="flex flex-col justify-between h-full"><span className="text-[12px] text-gray-400 mb-1.5 font-medium">Alternate</span><input placeholder="Enter alternate email" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="email" defaultValue="" /></div></div></div>
              </div>

            {/* C2: Family Background */}
            <div className={activeTab === 'C2' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                {/* Section II */}
                <div className="bg-white p-6 rounded border shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase text-brand-700">II. Family Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 text-sm">Spouse Information</h4>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SPOUSE'S SURNAME</label>
                        <input type="text" name="spouse_surname" defaultValue={familyBackground?.spouse?.surname || ""} className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">FIRST NAME</label>
                        <input type="text" name="spouse_first_name" defaultValue={familyBackground?.spouse?.first_name || ""} className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">OCCUPATION</label>
                        <input type="text" name="spouse_occupation" defaultValue={familyBackground?.spouse?.occupation || ""} className="w-full p-2 border rounded bg-gray-50 focus:bg-white outline-brand-500" />
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
              </div>

            
            {/* C3: Educational Background */}
            <div className={activeTab === 'C3' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Elementary</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Secondary</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Vocational / Trade Course</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">College</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Graduate Studies</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                

              
            </div>

            {/* C4: Civil Service Eligibility */}
            <div className={activeTab === 'C4' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #1</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Career Service/ RA 1080 / Under Special Laws / CES / CSEE</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Rating (If Applicable)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Examination/Conferment</span>

                      <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Place of Examination / Conferment</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Number</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Date of Validity</span>

                      <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #2</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Career Service/ RA 1080 / Under Special Laws / CES / CSEE</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Rating (If Applicable)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Examination/Conferment</span>

                      <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Place of Examination / Conferment</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Number</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Date of Validity</span>

                      <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg> 
                    Add Eligibility
                  </button>
                </div>

                

              
            </div>

            {/* C5: Work Experience */}
            <div className={activeTab === 'C5' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #1</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Position Title</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Department / Agency / Office / Company</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Dates (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade (if applicable)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Status of Appointment</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Govt Service? (Yes / No)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #2</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Position Title</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Department / Agency / Office / Company</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Dates (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade (if applicable)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Status of Appointment</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Govt Service? (Yes / No)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg> 
                    Add Work Experience
                  </button>
                </div>

                

              
            </div>

            {/* C6: Voluntary Work */}
            <div className={activeTab === 'C6' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #1</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name & Address of Organization</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Dates (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Position / Nature of Work</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg> 
                    Add Voluntary Work
                  </button>
                </div>

                

              
            </div>

            {/* C7: Learning and Development */}
            <div className={activeTab === 'C7' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #1</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Title of Learning and Development Interventions</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Dates (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Type of L&D (Managerial/Supervisory/Technical/etc)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Conducted/Sponsored By</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #2</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full lg:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Title of Learning and Development Interventions</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Dates (From - To)</span>

                      <div className="flex items-center gap-2">
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <span className="text-gray-400">-</span>
                        <input type="date" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Type of L&D (Managerial/Supervisory/Technical/etc)</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Conducted/Sponsored By</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="button" className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg> 
                    Add L&D
                  </button>
                </div>

                

              
            </div>

            {/* C8: Other Information */}
            <div className={activeTab === 'C8' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Record #1</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Special Skills and Hobbies</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Non-Academic Distinctions / Recognition</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Membership in Association/Organization</span>

                      <input type="text" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />

                    </div>

                  </div>
                </div>

                

              
            </div>

            {/* C9: Legal Questionnaire */}
            <div className={activeTab === 'C9' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-sm text-yellow-800 rounded">
                  <p className="font-bold mb-1">DECLARATION</p>
                  <p>Please answer the following questions truthfully. Misrepresentation of any information is a ground for administrative/criminal cases.</p>
                </div>
                
                
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q34. Consanguinity</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <p className="font-medium text-gray-800">Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed,</p>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>a. within the third degree?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34a" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34a" value="no" className="accent-blue-600" /> No</label>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>b. within the fourth degree (for Local Government Unit - Career Employees)?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34b" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34b" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q35. Offenses & Charges</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>a. Have you ever been found guilty of any administrative offense?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35a" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35a" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>b. Have you been criminally charged before any court?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35b" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35b" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details (Date Filed)" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                        <input type="text" placeholder="Status of Case/s" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q36. Conviction</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q36" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q36" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q37. Separation</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q37" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q37" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q38. Elections</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38a" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38a" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38b" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38b" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q39. Immigrant Status</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>Have you acquired the status of an immigrant or permanent resident of another country?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q39" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q39" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, give details (country)" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Q40. Special Groups</label>
                  <div className="flex-1 space-y-4 text-gray-700 text-[14px]">
                    <p className="font-medium text-gray-800">Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:</p>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <p>a. Are you a member of any indigenous group?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40a" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40a" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, please specify" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>b. Are you a person with disability?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, please specify ID No" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p>c. Are you a solo parent?</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40c" value="yes" className="accent-blue-600" /> Yes</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40c" value="no" className="accent-blue-600" /> No</label>
                        </div>
                        <input type="text" placeholder="If YES, please specify ID No" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                
              
            </div>

            {/* C10: Essential Documents */}
            <div className={activeTab === 'C10' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
              
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Upload Files</label>
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                      <span className="text-gray-600 font-medium mb-1">Click to upload or drag and drop</span>
                      <span className="text-gray-400 text-sm">PDF, DOC, or DOCX (max. 10MB)</span>
                    </div>
                  </div>
                </div>
              
            </div>



            </form>
          </div>

        {/* Footer */}
        <div className="mt-4 bg-white p-4 border border-gray-200 flex justify-between items-center rounded-sm shadow-sm w-full">
          <div className="text-sm text-gray-500 font-medium">
            Step {tabs.findIndex(t => t.id === activeTab) + 1} of 10
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
            
            {activeTab !== 'C10' ? (
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
                    const rawData = Object.fromEntries(formData.entries());
                    const data: any = { ...rawData };
                    
                    data.residential_address = {
                      house: rawData['res_house'],
                      street: rawData['res_street'],
                      subdivision: rawData['res_subdivision'],
                      zip: rawData['res_zip']
                    };
                    
                    data.permanent_address = {
                      house: rawData['perm_house'],
                      street: rawData['perm_street'],
                      subdivision: rawData['perm_subdivision'],
                      zip: rawData['perm_zip']
                    };
                    
                    data.family_background = {
                      spouse: {
                        surname: rawData['spouse_surname'],
                        first_name: rawData['spouse_first_name'],
                        occupation: rawData['spouse_occupation']
                      }
                    };
                    
                    data.other_information = {
                      height: rawData['height'],
                      weight: rawData['weight'],
                      agency_employee_no: rawData['agency_employee_no'],
                      citizenship_type: rawData['citizenship_type'],
                      extension_name: rawData['extension_name']
                    };
                    
                    // Default values for buttons if missing from rawData
                    if (!data.sex && userData?.sex) data.sex = userData.sex;
                    
                    
                    data.jobTitle = jobTitle;
                    if (jobId) {
                      data.positionId = jobId.toString();
                    }

                    try {
                      const sessionStr = localStorage.getItem('session_data');
                      let sessionId = null;
                      if (sessionStr) {
                        try { sessionId = JSON.parse(sessionStr).id; } catch (e) {}
                      }

                      const isProfileUpdate = jobTitle === 'Profile Update';
                      const method = isProfileUpdate && sessionId ? 'PUT' : 'POST';
                      const url = method === 'PUT' ? `${import.meta.env.VITE_API_URL}/api/applicants/${sessionId}` : `${import.meta.env.VITE_API_URL}/api/applicants`;

                      const response = await fetch(url, {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      
                      if (response.ok) {
                        const resData = await response.json();
                        
                        if (method === 'POST') {
                          const now = new Date();
                          const item = {
                            id: resData.data.id,
                            applicant_number: resData.data.applicant_number,
                            email: resData.data.email_address,
                            expiry: now.getTime() + 3 * 60 * 60 * 1000,
                          };
                          localStorage.setItem('session_data', JSON.stringify(item));
                          Swal.fire('Success', `Application submitted successfully! Your Applicant ID is ${resData.data.applicant_number}`, 'success');
                          onClose();
                          window.location.href = '/applicant-jobs';
                        } else {
                          Swal.fire('Success', 'Profile updated successfully!', 'success');
                          onClose();
                          // No reload needed for profile update, but we can if we want to reflect changes
                          window.location.reload();
                        }
                      } else {
                        const errorData = await response.json();
                        Swal.fire('Error', errorData.message || 'Operation failed', 'error');
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
                {jobTitle === 'Profile Update' ? 'SAVE PROFILE' : 'SUBMIT APPLICATION'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
