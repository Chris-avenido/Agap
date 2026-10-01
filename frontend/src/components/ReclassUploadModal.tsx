import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  FileText,
  Eye,
  AlertCircle,
  Loader2,
  Award,
  Clock,
  RefreshCw,
  Trash2,
  FileCheck
} from 'lucide-react';
import Swal from 'sweetalert2';

export interface ReclassDocumentRequirement {
  key: string;
  title: string;
  description: string;
  required: boolean;
}

export const RECLASS_REQUIREMENTS: ReclassDocumentRequirement[] = [
  {
    key: 'reclass_form',
    title: 'Reclassification Form / RFTP',
    description: 'Duly accomplished reclassification and application forms.',
    required: true,
  },
  {
    key: 'pds',
    title: 'Personal Data Sheet',
    description: 'Updated Civil Service Commission (CSC) Form 212 with a work experience sheet.',
    required: true,
  },
  {
    key: 'service_records',
    title: 'Service Records & Appointment',
    description: 'Updated and signed service records and latest appointment papers.',
    required: true,
  },
  {
    key: 'academic_credentials',
    title: 'Academic Credentials',
    description: 'Authenticated Transcript of Records (TOR) and diploma.',
    required: true,
  },
  {
    key: 'training_certs',
    title: 'Training Certificates',
    description: 'Certificates of relevant specialized training and professional development not previously used in a past promotion.',
    required: true,
  },
  {
    key: 'performance_ratings',
    title: 'Performance Ratings',
    description: 'Signed Individual Performance Commitment and Review (IPCR) / OPCRF sheets for the required periods.',
    required: true,
  },
  {
    key: 'admin_support',
    title: 'Administrative Supporting Documents',
    description: 'Plantilla allocation list, approved class/teacher programs, school ranklist, and an omnibus sworn statement of certification.',
    required: true,
  },
];

export interface UploadedReclassDoc {
  id: string;
  category_key: string;
  category_title: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  uploaded_at: string;
}

interface ReclassUploadModalProps {
  isOpen: boolean;
  applicantId: number | string;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export const ReclassUploadModal: React.FC<ReclassUploadModalProps> = ({
  isOpen,
  applicantId,
  onClose,
  onUploadSuccess,
}) => {
  const [documents, setDocuments] = useState<UploadedReclassDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [stagedFiles, setStagedFiles] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0,
  });

  const fetchDocuments = async () => {
    if (!applicantId) return;
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-documents`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        setDocuments(data.data);
      }
    } catch (err) {
      console.error('Error fetching reclass documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && applicantId) {
      setStagedFiles({});
      fetchDocuments();
    }
  }, [isOpen, applicantId]);

  if (!isOpen) return null;

  const uploadedMap: Record<string, UploadedReclassDoc> = {};
  documents.forEach((doc) => {
    uploadedMap[doc.category_key] = doc;
  });

  const totalRequired = RECLASS_REQUIREMENTS.length;
  const uploadedCount = RECLASS_REQUIREMENTS.filter((req) => !!uploadedMap[req.key]).length;
  const stagedCount = Object.keys(stagedFiles).length;
  const progressPercent = Math.round((uploadedCount / totalRequired) * 100);

  const handleFileSelect = (req: ReclassDocumentRequirement, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      Swal.fire('Invalid File Type', 'Only PDF files (.pdf) are allowed for reclassification documents.', 'warning');
      e.target.value = '';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      Swal.fire('File Too Large', 'Please select a file smaller than 15MB.', 'warning');
      e.target.value = '';
      return;
    }

    setStagedFiles((prev) => ({
      ...prev,
      [req.key]: file,
    }));
    e.target.value = '';
  };

  const handleRemoveStagedFile = (key: string) => {
    setStagedFiles((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleDoneOrUpload = async () => {
    const stagedKeys = Object.keys(stagedFiles);
    if (stagedKeys.length === 0) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    setUploadProgress({ current: 0, total: stagedKeys.length });

    let successCount = 0;
    const failedTitles: string[] = [];

    for (let i = 0; i < stagedKeys.length; i++) {
      const key = stagedKeys[i];
      const file = stagedFiles[key];
      const req = RECLASS_REQUIREMENTS.find((r) => r.key === key);
      const categoryTitle = req?.title || key;
      const description = req?.description || '';

      setUploadProgress({ current: i + 1, total: stagedKeys.length });

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category_key', key);
        formData.append('category_title', categoryTitle);
        formData.append('description', description);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-documents`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success) {
          successCount++;
        } else {
          failedTitles.push(categoryTitle);
        }
      } catch (err) {
        console.error(`Error uploading ${key}:`, err);
        failedTitles.push(categoryTitle);
      }
    }

    setIsSubmitting(false);

    if (failedTitles.length === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Documents Uploaded',
        text: `${successCount} document(s) have been successfully uploaded and attached to your reclassification application.`,
        timer: 2500,
        showConfirmButton: false,
      });
      setStagedFiles({});
      await fetchDocuments();
      if (onUploadSuccess) onUploadSuccess();
      onClose();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Upload Notice',
        text: `${successCount} document(s) uploaded successfully. Failed: ${failedTitles.join(', ')}.`,
      });
      setStagedFiles((prev) => {
        const remaining: Record<string, File> = {};
        for (const [k, f] of Object.entries(prev)) {
          const r = RECLASS_REQUIREMENTS.find((item) => item.key === k);
          if (failedTitles.includes(r?.title || k)) {
            remaining[k] = f;
          }
        }
        return remaining;
      });
      await fetchDocuments();
      if (onUploadSuccess) onUploadSuccess();
    }
  };

  const handleViewFile = (fileUrl: string) => {
    if (!fileUrl) return;
    const sasUrl = fileUrl.startsWith('http')
      ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(fileUrl)}`
      : fileUrl;
    window.open(sasUrl, '_blank');
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden transform transition-all animate-scaleUp text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#022851] via-[#033b77] to-[#0a6fa6] px-6 py-5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#facc15] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight leading-tight">
                Reclassification Document Submission
              </h2>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                DepEd Guidance Counselor → School Counselor Requirements Folder
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Banner */}
        <div className="bg-slate-50/90 border-b border-gray-200 px-6 py-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Submission Progress</span>
              <span className="text-xs font-bold text-[#022851] bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                {uploadedCount} of {totalRequired} Uploaded
              </span>
              {stagedCount > 0 && (
                <span className="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-300 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                  <FileCheck className="w-3.5 h-3.5" /> {stagedCount} Selected (Ready to Upload)
                </span>
              )}
            </div>
            <span className="text-sm font-extrabold text-[#022851]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0284c7] to-[#22c55e] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Scrollable Document Checklist */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-xs text-gray-600 bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Select your PDF documents below (PDF only, max 15MB). All chosen files will be uploaded and attached to your reclassification application once you click <strong>Done / Close</strong>.
            </span>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#022851]" />
              <p className="text-sm font-medium">Loading documents...</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {RECLASS_REQUIREMENTS.map((req, index) => {
                const uploadedDoc = uploadedMap[req.key];
                const stagedFile = stagedFiles[req.key];

                return (
                  <div
                    key={req.key}
                    className={`border rounded-xl p-4 transition-all ${
                      stagedFile
                        ? 'bg-sky-50/60 border-sky-300 shadow-sm'
                        : uploadedDoc
                        ? 'bg-emerald-50/30 border-emerald-200/80 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                            stagedFile
                              ? 'bg-sky-100 text-sky-700'
                              : uploadedDoc
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {stagedFile ? (
                            <FileCheck className="w-5 h-5 text-sky-600" />
                          ) : uploadedDoc ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-[#022851] tracking-tight">{req.title}</h3>
                            {stagedFile ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                                <FileCheck className="w-3 h-3 text-sky-600" /> Selected (Pending Upload)
                              </span>
                            ) : uploadedDoc ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" /> Uploaded
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                <Clock className="w-3 h-3" /> Pending Selection
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{req.description}</p>

                          {/* Staged File Info */}
                          {stagedFile && (
                            <div className="flex items-center gap-3 mt-2 text-[11px] text-sky-800 font-semibold bg-sky-100/70 px-2.5 py-1 rounded-lg border border-sky-200 w-fit max-w-full">
                              <span className="truncate max-w-[220px] sm:max-w-xs flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5 text-sky-600 shrink-0" /> {stagedFile.name}
                              </span>
                              <span>&bull; {formatFileSize(stagedFile.size)}</span>
                            </div>
                          )}

                          {/* Uploaded File Info (if not overridden by staged file) */}
                          {!stagedFile && uploadedDoc && (
                            <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500 font-medium">
                              <span className="truncate max-w-[200px] sm:max-w-xs font-semibold text-gray-700 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {uploadedDoc.file_name}
                              </span>
                              {uploadedDoc.file_size && (
                                <span>&bull; {formatFileSize(uploadedDoc.file_size)}</span>
                              )}
                              {uploadedDoc.uploaded_at && (
                                <span className="hidden sm:inline">
                                  &bull; {new Date(uploadedDoc.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start mt-2 sm:mt-0">
                        {/* Staged File Actions */}
                        {stagedFile ? (
                          <>
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => handleRemoveStagedFile(req.key)}
                              className="px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors"
                              title="Cancel selection"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                            <label
                              className={`px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-1 ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-gray-500" /> Change
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                disabled={isSubmitting}
                                className="hidden"
                                onChange={(e) => handleFileSelect(req, e)}
                              />
                            </label>
                          </>
                        ) : (
                          <>
                            {uploadedDoc && (
                              <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => handleViewFile(uploadedDoc.file_url)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" /> View
                              </button>
                            )}

                            <label
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm ${
                                isSubmitting
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : uploadedDoc
                                  ? 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                                  : 'bg-[#022851] hover:bg-[#033a76] text-white'
                              }`}
                            >
                              {uploadedDoc ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" /> Replace
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" /> Select File
                                </>
                              )}
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                disabled={isSubmitting}
                                className="hidden"
                                onChange={(e) => handleFileSelect(req, e)}
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-500 font-medium">
            {stagedCount > 0
              ? `📄 ${stagedCount} file(s) selected and ready to upload.`
              : uploadedCount === totalRequired
              ? '🎉 All 7 required reclassification documents are uploaded.'
              : `${totalRequired - uploadedCount} document(s) pending.`}
          </span>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleDoneOrUpload}
            className="px-5 py-2.5 rounded-xl bg-[#022851] hover:bg-[#033a76] text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Uploading ({uploadProgress.current}/{uploadProgress.total})...</span>
              </>
            ) : (
              'Done / Close'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReclassUploadModal;
