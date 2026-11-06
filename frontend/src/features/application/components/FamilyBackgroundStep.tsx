import type { SetStateAction } from "react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";
import { Plus, Trash2 } from "lucide-react";

/** Step C2 of the application modal. State and handlers come from the parent via `ctx`. */
export interface FamilyBackgroundStepCtx {
  activeTab: string;
  childrenList: any[];
  familyBackground: any;
  setChildrenList: (value: SetStateAction<any[]>) => void;
}

export default function FamilyBackgroundStep({ ctx }: { ctx: FamilyBackgroundStepCtx }) {
  const {
    activeTab,
    childrenList,
    familyBackground,
    setChildrenList,
  } = ctx;

  return (
    <div className={activeTab === 'C2' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>

      {/* Spouse's Name Row */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Name</label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
            <input name="spouse_surname" defaultValue={familyBackground?.spouse?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
            <input name="spouse_first_name" defaultValue={familyBackground?.spouse?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
            <input name="spouse_middle_name" defaultValue={familyBackground?.spouse?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
            <input name="spouse_name_extension" defaultValue={familyBackground?.spouse?.name_extension || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="E.G. JR., SR" />
          </div>
        </div>
      </div>

      {/* Spouse's Details Row */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Details</label>
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Occupation</span>
              <input name="spouse_occupation" defaultValue={familyBackground?.spouse?.occupation || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER OCCUPATION" />
            </div>
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Employer/Business Name</span>
              <input name="spouse_employer_business_name" defaultValue={familyBackground?.spouse?.employer_business_name || familyBackground?.spouse?.employer || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER EMPLOYER/BUSINESS NAME" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Business Address</span>
              <input name="spouse_business_address" defaultValue={familyBackground?.spouse?.business_address || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER BUSINESS ADDRESS" />
            </div>
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
              <input name="spouse_telephone_no" defaultValue={familyBackground?.spouse?.telephone_no || familyBackground?.spouse?.telephone || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER TELEPHONE NO." />
            </div>
          </div>
        </div>
      </div>

      {/* Father's Name Row */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Father's Name</label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
            <input name="father_surname" defaultValue={familyBackground?.father?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
            <input name="father_first_name" defaultValue={familyBackground?.father?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
            <input name="father_middle_name" defaultValue={familyBackground?.father?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
            <input name="father_name_extension" defaultValue={familyBackground?.father?.name_extension || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="E.G. JR., SR" />
          </div>
        </div>
      </div>

      {/* Mother's Maiden Name Row */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Mother's Maiden Name</label>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
            <input name="mother_surname" defaultValue={familyBackground?.mother?.maiden_surname || familyBackground?.mother?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
            <input name="mother_first_name" defaultValue={familyBackground?.mother?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
            <input name="mother_middle_name" defaultValue={familyBackground?.mother?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
          </div>
        </div>
      </div>

      {/* Children Details Row */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 pb-6">
        <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2 flex flex-col">
          Children Details
          <span className="text-[10px] text-gray-400 font-normal italic mt-0.5">(List all children)</span>
        </label>
        <div className="flex-1 flex flex-col gap-4">
          {childrenList.map((child: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of Child (Write full name)</span>
                <input value={child.name || ''} onChange={(e: any) => { const n = [...childrenList]; n[idx].name = e.target.value; setChildrenList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER CHILD'S FULL NAME" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Birth</span>
                <ModernDatePicker value={typeof child.dob === 'string' && child.dob.includes('T') ? child.dob.split('T')[0] : (child.dob || '')} onChange={(val: any) => { const n = [...childrenList]; n[idx].dob = val; setChildrenList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
              </div>
              <button type="button" onClick={() => setChildrenList(childrenList.filter((_: any, i: number) => i !== idx))} className="h-[42px] px-4 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 rounded flex items-center justify-center transition-colors bg-white shadow-sm shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setChildrenList([...childrenList, { name: '', dob: null }])} className="mt-2 text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-4 py-2 rounded border border-dashed border-blue-300 transition-colors">
            <Plus className="w-4 h-4" /> Add Child
          </button>
        </div>
      </div>

      {/* Hidden Input to store children array for form submission */}
      <input type="hidden" name="children_list" value={JSON.stringify(childrenList)} />

    </div>
  );
}
