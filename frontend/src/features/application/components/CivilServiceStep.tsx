import type { SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";

/** Step C4 of the application modal. State and handlers come from the parent via `ctx`. */
export interface CivilServiceStepCtx {
  activeTab: string;
  civilServiceList: any[];
  setCivilServiceList: (value: SetStateAction<any[]>) => void;
}

export default function CivilServiceStep({ ctx }: { ctx: CivilServiceStepCtx }) {
  const {
    activeTab,
    civilServiceList,
    setCivilServiceList,
  } = ctx;

  return (
    <div className={activeTab === 'C4' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <div className="text-center mb-8">
        <p className="text-[13px] text-gray-500 italic">
          Please list your civil service eligibility. Write "N/A" if not applicable.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {civilServiceList.map((item: any, idx: number) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h4 className="font-bold text-[14px] text-gray-700">ELIGIBILITY #{idx + 1}</h4>
              <button type="button" onClick={() => setCivilServiceList(civilServiceList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Career Service/RA 1080 (Board/Bar)/Under Special Laws/CES/CSEE</span>
                  <input
                    type="text"
                    value={item.eligibility !== undefined ? item.eligibility : (item.name || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, eligibility: val, name: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter eligibility"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Rating (if applicable)</span>
                  <input
                    type="text"
                    value={item.rating || ''}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, rating: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter rating"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Date of Examination / Conferment</span>
                  <ModernDatePicker
                    value={item.date ? (typeof item.date === 'string' ? item.date.split('T')[0] : '') : (item.date_of_exam ? item.date_of_exam.split('T')[0] : '')}
                    onChange={(val: any) => setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, date: val, date_of_exam: val } : it))}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Place of Examination / Conferment</span>
                  <input
                    type="text"
                    value={item.place !== undefined ? item.place : (item.place_of_exam || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, place: val, place_of_exam: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter place"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">License Number (if applicable)</span>
                  <input
                    type="text"
                    value={item.licenseNo !== undefined ? item.licenseNo : (item.license_number || '')}
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, licenseNo: val, license_number: val } : it));
                    }}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                    placeholder="Enter license no"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">License Date of Validity (if applicable)</span>
                  <ModernDatePicker
                    value={item.licenseDate ? (typeof item.licenseDate === 'string' ? item.licenseDate.split('T')[0] : '') : (item.license_validity ? item.license_validity.split('T')[0] : '')}
                    onChange={(val: any) => setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, licenseDate: val, license_validity: val } : it))}
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 mt-2">
          <button type="button" onClick={() => setCivilServiceList([...civilServiceList, { eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Eligibility
          </button>
          <button type="button" onClick={() => setCivilServiceList([{ eligibility: 'N/A', rating: 'N/A', date: null, place: 'N/A', licenseNo: 'N/A', licenseDate: null }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
            N/A
          </button>
        </div>
      </div>

      <input type="hidden" name="civil_service_eligibility" value={JSON.stringify(civilServiceList)} />
    </div>
  );
}
