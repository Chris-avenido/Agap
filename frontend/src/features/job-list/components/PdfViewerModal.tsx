interface PdfViewerModalProps {
  pdfViewerUrl: string;
  setPdfViewerUrl: (url: string | null) => void;
}

export default function PdfViewerModal({ pdfViewerUrl, setPdfViewerUrl }: PdfViewerModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => setPdfViewerUrl(null)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#1a73e8]/5 to-transparent shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1a73e8]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <span className="font-bold text-[15px] text-gray-800">Document Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={pdfViewerUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1a73e8] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download
            </a>
            <button
              type="button"
              onClick={() => setPdfViewerUrl(null)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <iframe
            src={`${pdfViewerUrl}#view=FitH&toolbar=0`}
            className="w-full h-full border-0"
            title="Document Preview"
          />
        </div>
      </div>
    </div>
  );
}
