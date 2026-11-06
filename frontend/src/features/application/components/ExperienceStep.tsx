import type { SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";
import { formatCurrencyValue } from "../constants";

/** Step C5 of the application modal. State and handlers come from the parent via `ctx`. */
export interface ExperienceStepCtx {
  activeTab: string;
  setWorkExperienceList: (value: SetStateAction<any[]>) => void;
  workExperienceList: any[];
}

export default function ExperienceStep({ ctx }: { ctx: ExperienceStepCtx }) {
  const {
    activeTab,
    setWorkExperienceList,
    workExperienceList,
  } = ctx;

  return (
    <div className={activeTab === 'C5' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <div className="text-center mb-8">
        <p className="text-[13px] text-gray-500 italic">
          Please list your work experience from most recent to oldest. Write "N/A" if not applicable.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {workExperienceList.map((item: any, idx: number) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h4 className="font-bold text-[14px] text-gray-700">WORK EXPERIENCE #{idx + 1}</h4>
              <button type="button" onClick={() => setWorkExperienceList(workExperienceList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                  <ModernDatePicker value={item.fromDate ? item.fromDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...workExperienceList]; n[idx].fromDate = val; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                  <ModernDatePicker value={item.toDate ? item.toDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...workExperienceList]; n[idx].toDate = val; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Position Title (Write in full/Do not abbreviate)</span>
                  <input type="text" value={item.positionTitle || ''} onChange={(e: any) => { const n = [...workExperienceList]; n[idx].positionTitle = e.target.value; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter position title" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Department/Agency/Office/Company</span>
                  <input type="text" value={item.company || ''} onChange={(e: any) => { const n = [...workExperienceList]; n[idx].company = e.target.value; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter department/agency/office/company" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-[15px] pointer-events-none select-none">₱</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={item.monthlySalary !== undefined ? formatCurrencyValue(item.monthlySalary) : formatCurrencyValue(item.salary || '')}
                      onChange={(e: any) => {
                        const val = formatCurrencyValue(e.target.value);
                        setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, monthlySalary: val, salary: val } : it));
                      }}
                      onBlur={(e: any) => {
                        const raw = e.target.value.replace(/,/g, '');
                        if (raw && !isNaN(Number(raw))) {
                          const formatted = Number(raw).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                          setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, monthlySalary: formatted, salary: formatted } : it));
                        }
                      }}
                      className="border border-gray-300 rounded p-2.5 pl-8 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full font-medium"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade & Step</span>
                  <input
                    type="text"
                    value={item.salaryGrade !== undefined ? item.salaryGrade : (item.pay_grade || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, salaryGrade: val, pay_grade: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter salary/job/pay grade & step"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Status of Appointment</span>
                  <input
                    type="text"
                    value={item.statusOfAppointment !== undefined ? item.statusOfAppointment : (item.status || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, statusOfAppointment: val, status: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter status of appointment"
                  />
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Gov't Service (Y/N)</span>
                  <select
                    value={item.govtService !== undefined ? item.govtService : (item.govt_service || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, govtService: val, govt_service: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                  >
                    <option value="">Select option</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 mt-2">
          <button type="button" onClick={() => setWorkExperienceList([...workExperienceList, { fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Work Experience
          </button>
          <button type="button" onClick={() => setWorkExperienceList([{ fromDate: null, toDate: null, positionTitle: 'N/A', company: 'N/A', monthlySalary: 'N/A', salaryGrade: 'N/A', statusOfAppointment: 'N/A', govtService: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
            N/A
          </button>
        </div>
      </div>

      <input type="hidden" name="work_experience" value={JSON.stringify(workExperienceList)} />
    </div>
  );
}
