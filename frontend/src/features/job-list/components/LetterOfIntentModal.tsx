import Swal from 'sweetalert2';

interface LetterOfIntentModalProps {
  loiUploading: boolean;
  setShowLoiModal: (v: boolean) => void;
  setLoiFile: (f: File | null) => void;
  loiFile: File | null;
  uploadedDocumentUrls: Record<string, string>;
  setUploadedDocumentUrls: (v: Record<string, string>) => void;
  setLoiUploading: (v: boolean) => void;
  applyingJob: any;
  setShowSwornDeclModal: (v: boolean) => void;
}

export default function LetterOfIntentModal({ loiUploading, setShowLoiModal, setLoiFile, loiFile, uploadedDocumentUrls, setUploadedDocumentUrls, setLoiUploading, applyingJob, setShowSwornDeclModal }: LetterOfIntentModalProps) {
  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => { if (!loiUploading) { setShowLoiModal(false); setLoiFile(null); } }}
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
              <h2 className="font-bold text-[16px] text-gray-800">Letter of Intent</h2>
              <p className="text-[12px] text-gray-500">Required before submitting your application</p>
            </div>
          </div>
          {!loiUploading && (
            <button
              type="button"
              onClick={() => { setShowLoiModal(false); setLoiFile(null); }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          <p className="text-[13px] text-gray-600 leading-relaxed">
            Please upload your <strong>Letter of Intent</strong> for the position you are applying for. This document is required to complete your application. Maximum file size: <strong>5MB</strong>.
          </p>

          {/* Existing LOI status */}
          {uploadedDocumentUrls?.['Letter of Intent'] && !loiFile && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[13px] font-semibold text-green-700">Letter of Intent already uploaded</span>
                <span className="text-[11px] text-green-600">You can replace it by choosing a new file below, or proceed to submit.</span>
              </div>
              <a
                href={`${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(uploadedDocumentUrls['Letter of Intent'])}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:underline font-semibold shrink-0"
              >
                View
              </a>
            </div>
          )}

          {/* File picker */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
              {uploadedDocumentUrls?.['Letter of Intent'] ? 'Replace Letter of Intent (optional)' : 'Upload Letter of Intent'}
            </label>
            <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-all ${loiFile ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40'}`}>
              {loiFile ? (
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span className="text-[13px] font-semibold text-green-700 text-center break-all">{loiFile.name}</span>
                  <span className="text-[11px] text-gray-400">{(loiFile.size / 1024 / 1024).toFixed(2)} MB</span>
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
                  if (f.size > 5 * 1024 * 1024) {
                    Swal.fire('File Too Large', 'Please select a PDF smaller than 5MB.', 'error');
                    return;
                  }
                  setLoiFile(f);
                }}
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            type="button"
            disabled={loiUploading}
            onClick={() => { setShowLoiModal(false); setLoiFile(null); }}
            className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loiUploading || (!loiFile && !uploadedDocumentUrls?.['Letter of Intent'])}
            onClick={async () => {
              setLoiUploading(true);
              try {
                // If a new file is chosen, upload it first
                if (loiFile) {
                  const sessionStr = localStorage.getItem('session_data');
                  if (!sessionStr) { Swal.fire('Error', 'Not logged in.', 'error'); return; }
                  const session = JSON.parse(sessionStr);
                  const formData = new FormData();
                  formData.append('files', loiFile);
                  formData.append('documentNames', 'Letter of Intent');
                  if (applyingJob) formData.append('jobClusterId', applyingJob.id.toString());
                  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`, {
                    method: 'POST',
                    body: formData
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setUploadedDocumentUrls(data.documents);
                  } else {
                    Swal.fire('Upload Failed', 'Could not upload Letter of Intent. Please try again.', 'error');
                    setLoiUploading(false);
                    return;
                  }
                }
                // Close modal and trigger actual form submit
                setShowLoiModal(false);
                setLoiFile(null);
                setLoiUploading(false);
                setShowSwornDeclModal(true);
              } catch {
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
                setLoiUploading(false);
              }
            }}
            className="flex items-center gap-2 text-[13px] font-bold text-white bg-[#1a73e8] hover:bg-blue-700 px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loiUploading ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Submitting...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                {loiFile ? 'Upload & Next' : 'Next'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
