import annexCFile from '../../../assets/Annex C_Checklist of Requirements and Omnibus Sworn Statement.docx';
import Swal from 'sweetalert2';

interface SwornDeclarationModalProps {
  swornDeclUploading: boolean;
  setShowSwornDeclModal: (v: boolean) => void;
  setSwornDeclFile: (f: File | null) => void;
  swornDeclFile: File | null;
  applyingJob: any;
  setSwornDeclUploading: (v: boolean) => void;
  setUploadedDocumentUrls: (v: Record<string, string>) => void;
}

export default function SwornDeclarationModal({ swornDeclUploading, setShowSwornDeclModal, setSwornDeclFile, swornDeclFile, applyingJob, setSwornDeclUploading, setUploadedDocumentUrls }: SwornDeclarationModalProps) {
  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => { if (!swornDeclUploading) { setShowSwornDeclModal(false); setSwornDeclFile(null); } }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#1a73e8]/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a73e8]/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div>
              <h2 className="font-bold text-[14px] leading-tight text-gray-800">Checklist of Requirements and Omnibus Sworn Statement on the Certification on the Authenticity and Veracity (CAV) of the Documents Submitted and Data Privacy Consent Form</h2>
              <p className="text-[12px] text-gray-500">Required before submitting your application</p>
            </div>
          </div>
          {!swornDeclUploading && (
            <button
              type="button"
              onClick={() => { setShowSwornDeclModal(false); setSwornDeclFile(null); }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="text-[13px] text-gray-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            
            <p>
              <strong>Note:</strong> Download and accomplish the CAV Form, have it subscribed and sworn to before a Notary Public or any public officer authorized to administer oaths, and upload the duly accomplished form as one (1) of the required application documents.
            </p>
          </div>

          

          <div className="flex justify-start">
            <a 
              href={annexCFile} 
              download 
              className="flex items-center gap-2 text-[12px] font-bold text-[#1a73e8] bg-blue-50 border border-[#1a73e8] px-4 py-2 rounded-lg hover:bg-[#1a73e8] hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Template
            </a>
          </div>

          {/* File picker */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              Upload Sworn Declaration
            </label>
            <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-all ${swornDeclFile ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40'}`}>
              {swornDeclFile ? (
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span className="text-[13px] font-semibold text-green-700 text-center break-all">{swornDeclFile.name}</span>
                  <span className="text-[11px] text-gray-400">{(swornDeclFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span className="text-[13px] text-gray-500 font-medium">Click to choose a PDF file</span>
                  <span className="text-[11px] text-gray-400">PDF only · Max 5MB</span>
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const validTypes = ['application/pdf'];
                  if (!validTypes.includes(f.type)) {
                     Swal.fire('Invalid File', 'Please upload a PDF file only.', 'error');
                     return;
                  }
                  if (f.size > 5 * 1024 * 1024) {
                    Swal.fire('File Too Large', 'Please select a file smaller than 5MB.', 'error');
                    return;
                  }
                  setSwornDeclFile(f);
                }}
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            type="button"
            disabled={swornDeclUploading}
            onClick={() => { setShowSwornDeclModal(false); setSwornDeclFile(null); }}
            className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={swornDeclUploading}
            onClick={async () => {
              if (!swornDeclFile) {
                Swal.fire('Required', 'Please upload your Sworn Declaration.', 'warning');
                return;
              }
              
              setSwornDeclUploading(true);
              try {
                // Upload Sworn Declaration if new file is selected
                if (swornDeclFile) {
                  const sessionStr = localStorage.getItem('session_data');
                  if (!sessionStr) { Swal.fire('Error', 'Not logged in.', 'error'); return; }
                  const session = JSON.parse(sessionStr);
                  const formData = new FormData();
                  formData.append('files', swornDeclFile);
                  formData.append('documentNames', 'Sworn Declaration');
                  if (applyingJob) formData.append('jobClusterId', applyingJob.id.toString());
                  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`, {
                    method: 'POST',
                    body: formData
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setUploadedDocumentUrls(data.documents);
                  } else {
                    Swal.fire('Upload Failed', 'Could not upload Sworn Declaration. Please try again.', 'error');
                    setSwornDeclUploading(false);
                    return;
                  }
                }
                
                // Close modal and trigger actual form submit
                setShowSwornDeclModal(false);
                setSwornDeclFile(null);
                setSwornDeclUploading(false);
                setTimeout(() => {
                  const form = document.getElementById('form-Essential Documents') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }, 100);
              } catch {
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
                setSwornDeclUploading(false);
              }
            }}
            className="flex items-center gap-2 text-[13px] font-bold text-white bg-[#1a73e8] hover:bg-blue-700 px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {swornDeclUploading ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Submitting...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
