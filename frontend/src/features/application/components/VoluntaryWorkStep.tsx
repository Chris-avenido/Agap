import type { SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";

/** Step C6 of the application modal. State and handlers come from the parent via `ctx`. */
export interface VoluntaryWorkStepCtx {
  activeTab: string;
  setVoluntaryWorkList: (value: SetStateAction<any[]>) => void;
  voluntaryWorkList: any[];
}

export default function VoluntaryWorkStep({ ctx }: { ctx: VoluntaryWorkStepCtx }) {
  const {
    activeTab,
    setVoluntaryWorkList,
    voluntaryWorkList,
  } = ctx;

  return (
    <div className={activeTab === 'C6' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <div className="text-center mb-8">

        <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
          Please list your voluntary work or involvement in civic/non-government/people/voluntary organizations. Write "N/A" if not applicable.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {voluntaryWorkList.map((item: any, idx: number) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h4 className="font-bold text-[14px] text-gray-700">VOLUNTARY WORK #{idx + 1}</h4>
              <button type="button" onClick={() => setVoluntaryWorkList(voluntaryWorkList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Name & Address of Organization (Write in full)</span>
                  <input type="text" value={item.nameAddress || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].nameAddress = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter name and address of organization" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                  <ModernDatePicker value={item.fromDate ? item.fromDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...voluntaryWorkList]; n[idx].fromDate = val; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                  <ModernDatePicker value={item.toDate ? item.toDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...voluntaryWorkList]; n[idx].toDate = val; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                </div>
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>
                  <input type="text" value={item.hours || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].hours = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter number of hours" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col justify-between">
                  <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Position / Nature of Work</span>
                  <input type="text" value={item.position || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].position = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter position / nature of work" />
                </div>
              </div>

            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 mt-2">
          <button type="button" onClick={() => setVoluntaryWorkList([...voluntaryWorkList, { nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Voluntary Work
          </button>
          <button type="button" onClick={() => setVoluntaryWorkList([{ nameAddress: 'N/A', fromDate: null, toDate: null, hours: 'N/A', position: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
            N/A
          </button>
        </div>
      </div>

      <input type="hidden" name="voluntary_work" value={JSON.stringify(voluntaryWorkList)} />
    </div>
  );
}
