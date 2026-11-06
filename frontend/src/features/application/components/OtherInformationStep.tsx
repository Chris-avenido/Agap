import type { SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

/** Step C8 of the application modal. State and handlers come from the parent via `ctx`. */
export interface OtherInformationStepCtx {
  activeTab: string;
  distinctionsList: any[];
  membershipsList: any[];
  setDistinctionsList: (value: SetStateAction<any[]>) => void;
  setMembershipsList: (value: SetStateAction<any[]>) => void;
  setSkillsList: (value: SetStateAction<any[]>) => void;
  skillsList: any[];
}

export default function OtherInformationStep({ ctx }: { ctx: OtherInformationStepCtx }) {
  const {
    activeTab,
    distinctionsList,
    membershipsList,
    setDistinctionsList,
    setMembershipsList,
    setSkillsList,
    skillsList,
  } = ctx;

  return (
    <div className={activeTab === 'C8' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <div className="text-center mb-10">
        <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
          Please list your special skills and hobbies, non-academic distinctions, and memberships. Write "N/A" if not applicable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">SPECIAL SKILLS & HOBBIES</h4>
          {skillsList.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="text" value={typeof skill === 'object' ? skill.value || '' : skill} onChange={(e: any) => { const n = [...skillsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setSkillsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter skill / hobby" />
              <button type="button" onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setSkillsList([...skillsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Skill / Hobby
          </button>
          <button type="button" onClick={() => setSkillsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
            N/A
          </button>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">NON-ACADEMIC DISTINCTIONS</h4>
          {distinctionsList.map((distinction, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="text" value={typeof distinction === 'object' ? distinction.value || '' : distinction} onChange={(e: any) => { const n = [...distinctionsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setDistinctionsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter distinction" />
              <button type="button" onClick={() => setDistinctionsList(distinctionsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setDistinctionsList([...distinctionsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Distinction
          </button>
          <button type="button" onClick={() => setDistinctionsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
            N/A
          </button>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">MEMBERSHIPS IN ASSOCIATIONS</h4>
          {membershipsList.map((membership, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="text" value={typeof membership === 'object' ? membership.value || '' : membership} onChange={(e: any) => { const n = [...membershipsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setMembershipsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter membership" />
              <button type="button" onClick={() => setMembershipsList(membershipsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setMembershipsList([...membershipsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Membership
          </button>
          <button type="button" onClick={() => setMembershipsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
            N/A
          </button>
        </div>
      </div>

      <input type="hidden" name="special_skills" value={JSON.stringify(skillsList.filter((s: any) => typeof s === 'string' ? s.trim() !== '' : (s?.value?.trim() !== '')))} />
      <input type="hidden" name="distinctions" value={JSON.stringify(distinctionsList.filter((d: any) => typeof d === 'string' ? d.trim() !== '' : (d?.value?.trim() !== '')))} />
      <input type="hidden" name="memberships" value={JSON.stringify(membershipsList.filter((m: any) => typeof m === 'string' ? m.trim() !== '' : (m?.value?.trim() !== '')))} />
    </div>
  );
}
