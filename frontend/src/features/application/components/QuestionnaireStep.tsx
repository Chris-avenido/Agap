import type { SetStateAction } from "react";
// @ts-ignore
import ModernDatePicker from "../../../components/ModernDatePicker";
import { ETHNIC_GROUPS } from "../constants";

/** Step C9 of the application modal. State and handlers come from the parent via `ctx`. */
export interface QuestionnaireStepCtx {
  activeTab: string;
  otherInfo: any;
  qAnswers: { [x: string]: string; };
  qRes: any;
  setQAnswers: (value: SetStateAction<Record<string, string>>) => void;
}

export default function QuestionnaireStep({ ctx }: { ctx: QuestionnaireStepCtx }) {
  const {
    activeTab,
    otherInfo,
    qAnswers,
    qRes,
    setQAnswers,
  } = ctx;

  return (
    <div className={activeTab === 'C9' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <div className="text-center mb-10">
        <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
          Please answer the following questions truthfully. If "YES", provide the necessary details.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h4 className="font-bold text-[14px] text-gray-700 uppercase tracking-wide">34 - 40 QUESTIONNAIRE</h4>
        </div>
        <div className="p-6 flex flex-col gap-0 text-[14px] text-gray-700">

          {/* Q34 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed, within the third degree?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34a" value="yes" checked={qAnswers.q34a === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q34a: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34a" value="no" checked={qAnswers.q34a === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q34a: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q34a === "yes" && (
                  <input type="text" name="q34a_details" defaultValue={qRes?.q34a_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>

              <div className="w-full h-px bg-gray-100 my-2" />

              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  within the fourth degree (for Local Government Unit - Career Employees)?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34b" value="yes" checked={qAnswers.q34b === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q34b: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q34b" value="no" checked={qAnswers.q34b === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q34b: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q34b === "yes" && (
                  <input type="text" name="q34b_details" defaultValue={qRes?.q34b_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
            </div>
          </div>

          {/* Q35 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  35. a. Have you ever been found guilty of any administrative offense?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35a" value="yes" checked={qAnswers.q35a === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q35a: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35a" value="no" checked={qAnswers.q35a === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q35a: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q35a === "yes" && (
                  <input type="text" name="q35a_details" defaultValue={qRes?.q35a_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  b. Have you been criminally charged before any court?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35b" value="yes" checked={qAnswers.q35b === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q35b: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q35b" value="no" checked={qAnswers.q35b === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q35b: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q35b === "yes" && (
                  <div className="flex flex-col gap-2 mt-2">
                    <ModernDatePicker name="q35b_date" defaultValue={qRes?.q35b_date || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                    <input type="text" name="q35b_status" defaultValue={qRes?.q35b_status || ''} placeholder="Status of Case/s" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Q36 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-gray-700 leading-relaxed">
                36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q36" value="yes" checked={qAnswers.q36 === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q36: e.target.value }))} className="accent-blue-600" /> Yes</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q36" value="no" checked={qAnswers.q36 === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q36: e.target.value }))} className="accent-blue-600" /> No</label>
              </div>
              {qAnswers.q36 === "yes" && (
                <input type="text" name="q36_details" defaultValue={qRes?.q36_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
              )}
            </div>
          </div>

          {/* Q37 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-gray-700 leading-relaxed">
                37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q37" value="yes" checked={qAnswers.q37 === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q37: e.target.value }))} className="accent-blue-600" /> Yes</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q37" value="no" checked={qAnswers.q37 === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q37: e.target.value }))} className="accent-blue-600" /> No</label>
              </div>
              {qAnswers.q37 === "yes" && (
                <input type="text" name="q37_details" defaultValue={qRes?.q37_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
              )}
            </div>
          </div>

          {/* Q38 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38a" value="yes" checked={qAnswers.q38a === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q38a: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38a" value="no" checked={qAnswers.q38a === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q38a: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q38a === "yes" && (
                  <input type="text" name="q38a_details" defaultValue={qRes?.q38a_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38b" value="yes" checked={qAnswers.q38b === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q38b: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q38b" value="no" checked={qAnswers.q38b === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q38b: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q38b === "yes" && (
                  <input type="text" name="q38b_details" defaultValue={qRes?.q38b_details || ''} placeholder="PLEASE PROVIDE DETAILS" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
            </div>
          </div>

          {/* Q39 */}
          <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] text-gray-700 leading-relaxed">
                39. Have you acquired the status of an immigrant or permanent resident of another country?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q39" value="yes" checked={qAnswers.q39 === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q39: e.target.value }))} className="accent-blue-600" /> Yes</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q39" value="no" checked={qAnswers.q39 === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q39: e.target.value }))} className="accent-blue-600" /> No</label>
              </div>
              {qAnswers.q39 === "yes" && (
                <input type="text" name="q39_details" defaultValue={qRes?.q39_details || ''} placeholder="If YES, give details (country)" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
              )}
            </div>
          </div>

          {/* Q40 */}
          <div className="flex flex-col gap-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:<br /><br />
                  a. Are you a member of any indigenous group?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40a" value="yes" checked={qAnswers.q40a === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40a: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40a" value="no" checked={qAnswers.q40a === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40a: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q40a === "yes" && (
                  <input type="text" name="q40a_details" defaultValue={qRes?.q40a_details || ''} placeholder="If YES, please specify" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  b. Are you a person with disability?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b" value="yes" checked={qAnswers.q40b === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40b: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b" value="no" checked={qAnswers.q40b === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40b: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q40b === "yes" && (
                  <input type="text" name="q40b_details" defaultValue={qRes?.q40b_details || ''} placeholder="If YES, please specify ID No" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  Do you belong to an Indigenous Cultural Community / Indigenous Peoples (ICC/IP) or any ethnic group?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b_ethnic" value="yes" checked={qAnswers.q40b_ethnic === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40b_ethnic: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40b_ethnic" value="no" checked={qAnswers.q40b_ethnic === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40b_ethnic: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q40b_ethnic === "yes" && (
                  <>
                    <input
                      type="text"
                      name="q40b_ethnic_details"
                      list="modal-ethnic-groups"
                      required
                      defaultValue={qRes?.q40b_ethnic_details || ''}
                      placeholder="Search or select your ethnic group"
                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2"
                      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please select your ethnic group.')}
                      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <datalist id="modal-ethnic-groups">
                      {ETHNIC_GROUPS.map(eg => <option key={eg} value={eg} />)}
                    </datalist>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  c. Are you a solo parent?
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40c" value="yes" checked={qAnswers.q40c === "yes"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40c: e.target.value }))} className="accent-blue-600" /> Yes</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="q40c" value="no" checked={qAnswers.q40c === "no"} onChange={(e) => setQAnswers(prev => ({ ...prev, q40c: e.target.value }))} className="accent-blue-600" /> No</label>
                </div>
                {qAnswers.q40c === "yes" && (
                  <input type="text" name="q40c_details" defaultValue={qRes?.q40c_details || ''} placeholder="If YES, please specify ID No" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full mt-2" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 41. REFERENCES */}
      <div className="mt-8 flex flex-col gap-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h4 className="font-bold text-[14px] text-gray-700">
              41. REFERENCES <span className="font-normal text-gray-500 text-[12px] ml-1">(Person not related by consanguinity or affinity to applicant /appointee)</span>
            </h4>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-b border-gray-100 pb-5">
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Name</span>
                <input type="text" name="ref1_name" defaultValue={qRes?.ref1_name || otherInfo?.references?.[0]?.name || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Address</span>
                <input type="text" name="ref1_address" defaultValue={qRes?.ref1_address || otherInfo?.references?.[0]?.address || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                <input type="text" name="ref1_tel" defaultValue={qRes?.ref1_tel || otherInfo?.references?.[0]?.telephone || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-b border-gray-100 pb-5">
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Name</span>
                <input type="text" name="ref2_name" defaultValue={qRes?.ref2_name || otherInfo?.references?.[1]?.name || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Address</span>
                <input type="text" name="ref2_address" defaultValue={qRes?.ref2_address || otherInfo?.references?.[1]?.address || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                <input type="text" name="ref2_tel" defaultValue={qRes?.ref2_tel || otherInfo?.references?.[1]?.telephone || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Name</span>
                <input type="text" name="ref3_name" defaultValue={qRes?.ref3_name || otherInfo?.references?.[2]?.name || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Address</span>
                <input type="text" name="ref3_address" defaultValue={qRes?.ref3_address || otherInfo?.references?.[2]?.address || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                <input type="text" name="ref3_tel" defaultValue={qRes?.ref3_tel || otherInfo?.references?.[2]?.telephone || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* 42. GOVERNMENT ISSUED ID */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h4 className="font-bold text-[14px] text-gray-700">
              42. GOVERNMENT ISSUED ID
            </h4>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] text-gray-400 font-medium">Government Issued ID</span>
                  <button type="button" onClick={(e: any) => { const input = e.currentTarget.parentElement?.nextElementSibling as HTMLInputElement; if (input) { input.value = 'N/A'; input.dispatchEvent(new Event('change', { bubbles: true })); } }} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                </div>
                <input type="text" name="gov_id_type" defaultValue={qRes?.gov_id_type || otherInfo?.governmentId?.type || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="e.g. Passport" />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] text-gray-400 font-medium">ID/License/Passport No.</span>
                  <button type="button" onClick={(e: any) => { const input = e.currentTarget.parentElement?.nextElementSibling as HTMLInputElement; if (input) { input.value = 'N/A'; input.dispatchEvent(new Event('change', { bubbles: true })); } }} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                </div>
                <input type="text" name="gov_id_no" defaultValue={qRes?.gov_id_no || otherInfo?.governmentId?.idNo || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[13px] text-gray-400 font-medium">Date/Place of Issuance</span>
                  <button type="button" onClick={(e: any) => { const input = e.currentTarget.parentElement?.nextElementSibling as HTMLInputElement; if (input) { input.value = 'N/A'; input.dispatchEvent(new Event('change', { bubbles: true })); } }} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                </div>
                <input type="text" name="gov_id_issuance" defaultValue={qRes?.gov_id_issuance || otherInfo?.governmentId?.datePlace || ''} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
