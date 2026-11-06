import type { ChangeEvent } from "react";


/** Step C10 of the application modal. State and handlers come from the parent via `ctx`. */
export interface DocumentsStepCtx {
  activeTab: string;
  getDocUrl: (docName: string) => any;
  handleDirectReplace: (docType: "Letter of Intent" | "Sworn Declaration", e?: ChangeEvent<HTMLInputElement, Element> | undefined) => Promise<void>;
  handleDirectView: (docType: "Letter of Intent" | "Sworn Declaration") => Promise<void>;
  handleDocumentSelection: (documentLabel: string) => (e: any) => void;
  isRegistrationFlow: boolean;
  selectedDocumentNames: { [x: string]: string; };
  selectedDocumentUrls: { [x: string]: string; };
}

export default function DocumentsStep({ ctx }: { ctx: DocumentsStepCtx }) {
  const {
    activeTab,
    getDocUrl,
    handleDirectReplace,
    handleDirectView,
    handleDocumentSelection,
    isRegistrationFlow,
    selectedDocumentNames,
    selectedDocumentUrls,
  } = ctx;

  return (
    <div className={activeTab === "C10" ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
      <style>{`
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pop-in {
          0% { transform: scale(0.97); opacity: 0; }
          70% { transform: scale(1.01); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.1s;
        }
        .animate-pop {
          animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
      <div className="text-center mb-10">
        <p className="text-[14px] text-gray-500 italic max-w-3xl mx-auto leading-relaxed mt-4">
          Please upload the required essential documents for your application. (Max file size: 5MB per document)
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm mb-6">
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <h4 className="font-bold text-[14px] text-gray-700 uppercase tracking-wide">ESSENTIAL DOCUMENTS</h4>
        </div>

        <div className="flex flex-col text-[14px] text-gray-700">
          {/* Item 1 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Notarized Personal Data Sheet <span className="text-red-500">*</span></span>
            </div>
            {getDocUrl("Notarized Personal Data Sheet") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Notarized Personal Data Sheet"] || selectedDocumentNames["Personal Data Sheet"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Notarized Personal Data Sheet"] || selectedDocumentNames["Personal Data Sheet"]}>
                      {selectedDocumentNames["Notarized Personal Data Sheet"] || selectedDocumentNames["Personal Data Sheet"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Notarized Personal Data Sheet"] || selectedDocumentUrls["Personal Data Sheet"] || getDocUrl("Notarized Personal Data Sheet")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_pds" accept=".pdf" onChange={handleDocumentSelection("Notarized Personal Data Sheet")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_pds" accept=".pdf" required onChange={handleDocumentSelection("Notarized Personal Data Sheet")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 2 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Work Experience Sheet <span className="text-red-500">*</span></span>
            </div>
            {getDocUrl("Work Experience Sheet") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Work Experience Sheet"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Work Experience Sheet"]}>
                      {selectedDocumentNames["Work Experience Sheet"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Work Experience Sheet"] || getDocUrl("Work Experience Sheet")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_work_exp" accept=".pdf" onChange={handleDocumentSelection("Work Experience Sheet")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_work_exp" accept=".pdf" required onChange={handleDocumentSelection("Work Experience Sheet")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 3 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Certificate of Eligibility <span className="text-red-500">*</span></span>
            </div>
            {getDocUrl("Certificate of Eligibility") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Certificate of Eligibility"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Certificate of Eligibility"]}>
                      {selectedDocumentNames["Certificate of Eligibility"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Certificate of Eligibility"] || getDocUrl("Certificate of Eligibility")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_eligibility" accept=".pdf" onChange={handleDocumentSelection("Certificate of Eligibility")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_eligibility" accept=".pdf" required onChange={handleDocumentSelection("Certificate of Eligibility")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 4 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Transcript of Records <span className="text-red-500">*</span></span>
              <span className="text-gray-400 font-normal italic text-[10.5px] mt-1 leading-relaxed">
                Note: Applicants may upload, together with their TOR in a single merged file, the official document or certification confirming completion of at least 200 hours of supervised practicum or internship experience in guidance and counseling
              </span>
            </div>
            {getDocUrl("Transcript of Records") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Transcript of Records"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Transcript of Records"]}>
                      {selectedDocumentNames["Transcript of Records"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Transcript of Records"] || getDocUrl("Transcript of Records")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_tor" accept=".pdf" onChange={handleDocumentSelection("Transcript of Records")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_tor" accept=".pdf" required onChange={handleDocumentSelection("Transcript of Records")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 5 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Updated PRC License/ID (optional)</span>
            </div>
            {getDocUrl("Updated PRC License/ID") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Updated PRC License/ID"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Updated PRC License/ID"]}>
                      {selectedDocumentNames["Updated PRC License/ID"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Updated PRC License/ID"] || getDocUrl("Updated PRC License/ID")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_prc" accept=".pdf" onChange={handleDocumentSelection("Updated PRC License/ID")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_prc" accept=".pdf" onChange={handleDocumentSelection("Updated PRC License/ID")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>


          {/* Item 6 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Diploma (optional)</span>
            </div>
            {getDocUrl("Diploma (optional)") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Diploma (optional)"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Diploma (optional)"]}>
                      {selectedDocumentNames["Diploma (optional)"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Diploma (optional)"] || getDocUrl("Diploma (optional)")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_diploma" accept=".pdf" onChange={handleDocumentSelection("Diploma (optional)")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_diploma" accept=".pdf" onChange={handleDocumentSelection("Diploma (optional)")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 7 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Resume</span>
            </div>
            {getDocUrl("Resume") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Resume"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Resume"]}>
                      {selectedDocumentNames["Resume"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Resume"] || getDocUrl("Resume")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_resume" accept=".pdf" onChange={handleDocumentSelection("Resume")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_resume" accept=".pdf" onChange={handleDocumentSelection("Resume")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>
          {/* Item 8 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Performance Rating <span className="text-gray-400 font-normal italic text-[10px]"><br />covering one (1) year of complete performance cycle acquired in the current or latest position prior to the date of submission (Mandatory for positions with experience requirement)</span></span>
            </div>
            {getDocUrl("Performance Rating") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Performance Rating"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Performance Rating"]}>
                      {selectedDocumentNames["Performance Rating"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Performance Rating"] || getDocUrl("Performance Rating")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_performance_rating" accept=".pdf" onChange={handleDocumentSelection("Performance Rating")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_performance_rating" accept=".pdf" onChange={handleDocumentSelection("Performance Rating")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 9 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Training Certificates <span className="text-gray-400 font-normal italic text-[10px]"><br />(optional but mandatory for positions with training requirement)</span></span>
            </div>
            {getDocUrl("Training Certificates") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Training Certificates"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Training Certificates"]}>
                      {selectedDocumentNames["Training Certificates"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Training Certificates"] || getDocUrl("Training Certificates")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_training_certificates" accept=".pdf" onChange={handleDocumentSelection("Training Certificates")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_training_certificates" accept=".pdf" onChange={handleDocumentSelection("Training Certificates")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 10 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Application of Education</span>
            </div>
            {getDocUrl("Application of Education") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Application of Education"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Application of Education"]}>
                      {selectedDocumentNames["Application of Education"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Application of Education"] || getDocUrl("Application of Education")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_application_of_education" accept=".pdf" onChange={handleDocumentSelection("Application of Education")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_application_of_education" accept=".pdf" onChange={handleDocumentSelection("Application of Education")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 11 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Application of Learning and Development</span>
            </div>
            {getDocUrl("Application of Learning and Development") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Application of Learning and Development"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Application of Learning and Development"]}>
                      {selectedDocumentNames["Application of Learning and Development"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Application of Learning and Development"] || getDocUrl("Application of Learning and Development")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_application_of_learning" accept=".pdf" onChange={handleDocumentSelection("Application of Learning and Development")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_application_of_learning" accept=".pdf" onChange={handleDocumentSelection("Application of Learning and Development")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 12 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Outstanding Accomplishments <span className="text-gray-400 font-normal italic text-[10px]"><br />(Optional)</span></span>
            </div>
            {getDocUrl("Outstanding Accomplishments") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Outstanding Accomplishments"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Outstanding Accomplishments"]}>
                      {selectedDocumentNames["Outstanding Accomplishments"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Outstanding Accomplishments"] || getDocUrl("Outstanding Accomplishments")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_outstanding_accomplishments" accept=".pdf" onChange={handleDocumentSelection("Outstanding Accomplishments")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_outstanding_accomplishments" accept=".pdf" onChange={handleDocumentSelection("Outstanding Accomplishments")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {/* Item 13 - Service Record / Certificate of Employment */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-b border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">Service Record / Certificate of Employment <span className="text-gray-400 font-normal italic text-[10px]"><br />(Optional)</span></span>
            </div>
            {getDocUrl("Service Record / Certificate of Employment") ? (
              <div className="flex flex-col gap-2 w-full mt-2">
                {selectedDocumentNames["Service Record / Certificate of Employment"] ? (
                  <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span className="shrink-0">Selected:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Service Record / Certificate of Employment"]}>
                      {selectedDocumentNames["Service Record / Certificate of Employment"]}
                    </span>
                    <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                  </span>
                ) : (
                  <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                    </svg>
                    <span>Uploaded</span>
                  </span>
                )}
                <div className="flex gap-2 w-full">
                  <a href={(selectedDocumentUrls["Service Record / Certificate of Employment"] || getDocUrl("Service Record / Certificate of Employment")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                    View File
                  </a>
                  <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                    Replace File
                    <input type="file" name="doc_service_record" accept=".pdf" onChange={handleDocumentSelection("Service Record / Certificate of Employment")} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <input type="file" name="doc_service_record" accept=".pdf" onChange={handleDocumentSelection("Service Record / Certificate of Employment")} className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
            )}
          </div>

          {!isRegistrationFlow && (
            <>
              {/* Item 13 - Letter of Intent */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">Letter of Intent <span className="text-gray-400 font-normal italic text-[10px]"><br />(Uploaded / Replaced across active applications)</span></span>
                </div>
                {getDocUrl("Letter of Intent") ? (
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {selectedDocumentNames["Letter of Intent"] ? (
                      <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                        </svg>
                        <span className="shrink-0">Selected:</span>
                        <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Letter of Intent"]}>
                          {selectedDocumentNames["Letter of Intent"]}
                        </span>
                        <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                      </span>
                    ) : (
                      <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                        </svg>
                        <span>Uploaded</span>
                      </span>
                    )}
                    <div className="flex gap-2 w-full">
                      <button type="button" onClick={() => handleDirectView("Letter of Intent")} className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                        View File
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectReplace("Letter of Intent")}
                        className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center"
                      >
                        Replace File
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDirectReplace("Letter of Intent")}
                    className="cursor-pointer bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded text-[13px] font-medium hover:bg-blue-100 transition-colors text-center w-full"
                  >
                    Upload Letter of Intent (.pdf)
                  </button>
                )}
              </div>

              {/* Item 14 - Sworn Declaration / CAV */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">CAV / Sworn Declaration <span className="text-gray-400 font-normal italic text-[10px]"><br />(Uploaded / Replaced across active applications)</span></span>
                </div>
                {getDocUrl("Sworn Declaration") ? (
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {selectedDocumentNames["Sworn Declaration"] ? (
                      <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                        </svg>
                        <span className="shrink-0">Selected:</span>
                        <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Sworn Declaration"]}>
                          {selectedDocumentNames["Sworn Declaration"]}
                        </span>
                        <span className="shrink-0 font-normal opacity-90">(Ready to replace)</span>
                      </span>
                    ) : (
                      <span className="text-[12px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded text-center border border-green-200 flex items-center justify-center gap-1.5 animate-pop">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                        </svg>
                        <span>Uploaded</span>
                      </span>
                    )}
                    <div className="flex gap-2 w-full">
                      <button type="button" onClick={() => handleDirectView("Sworn Declaration")} className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                        View File
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDirectReplace("Sworn Declaration")}
                        className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center"
                      >
                        Replace File
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDirectReplace("Sworn Declaration")}
                    className="cursor-pointer bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded text-[13px] font-medium hover:bg-blue-100 transition-colors text-center w-full"
                  >
                    Upload CAV / Sworn Declaration (.pdf)
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
