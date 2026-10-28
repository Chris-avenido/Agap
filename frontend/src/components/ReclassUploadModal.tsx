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
    key: 'letter_of_updating_records',
    title: 'Letter of Updating Records',
    description: 'Letter of updating records addressed to the Schools Division Superintendent (SDS).',
    required: true,
  },
  {
    key: 'pds',
    title: 'Personal Data Sheet (PDS)',
    description: 'Duly accomplished Personal Data Sheet (CSC Form 212, Revised 2026) with Work Experience Sheet.',
    required: true,
  },
  {
    key: 'proof_of_eligibility',
    title: 'Proof of Eligibility',
    description: 'Valid Certificate of Board Rating / PRC License or applicable Certificate of Eligibility.',
    required: true,
  },
  {
    key: 'academic_record',
    title: 'Scholastic / Academic Record',
    description: 'Special Orders, Transcript of Records (TOR), and Diploma, including completion of graduate and post-graduate units/degrees, if available.',
    required: true,
  },
  {
    key: 'service_record',
    title: 'Updated Service Record',
    description: 'Copy of updated duly signed Service Record.',
    required: true,
  },
  {
    key: 'training_certs',
    title: 'Certificate/s of Relevant Training',
    description: 'Certificates of relevant specialized training and professional development (Optional).',
    required: false,
  },
  {
    key: 'omnibus_sworn_statement',
    title: 'Checklist of Requirements & Omnibus Sworn Statement',
    description: 'Omnibus Sworn Statement on the Certification on the Authenticity and Veracity (CAV) of documents submitted and Data Privacy Consent Form pursuant to RA No. 10173 (Data Privacy Act of 2012).',
    required: true,
  },
  {
    key: 'performance_rating',
    title: 'Performance Rating',
    description: 'Performance Rating in the last rating period covering one (1) complete performance cycle in the current position.',
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
  updated_at?: string;
}

function matchesRequirementDoc(reqKey: string, doc: any): boolean {
  if (!doc) return false;
  const rk = reqKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dk = String(doc.key || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const did = String(doc.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const dt = String(doc.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (rk === dk || rk === did) return true;
  if (rk && dk && (rk.includes(dk) || dk.includes(rk))) return true;
  if (rk && did && (rk.includes(did) || did.includes(rk))) return true;

  if (
    (rk === 'letterofupdatingrecords' || rk === 'letterofintent') &&
    (did === 'loi' ||
      did === 'updatingrecords' ||
      did === 'letterofupdatingrecords' ||
      dt.includes('updating') ||
      dt.includes('intent') ||
      dt.includes('records') ||
      dk.includes('updating') ||
      dk.includes('intent'))
  )
    return true;
  if (rk === 'pds' && (did === 'pds' || dt.includes('personaldata') || dt.includes('pds'))) return true;
  if (rk === 'proofofeligibility' && (did === 'eligibility' || dt.includes('eligibility') || dt.includes('prc') || dt.includes('license'))) return true;
  if (rk === 'academicrecord' && (did === 'tor' || dt.includes('tor') || dt.includes('academic') || dt.includes('transcript') || dt.includes('diploma'))) return true;
  if (rk === 'servicerecord' && (did === 'employment' || did === 'appointment' || dt.includes('service') || dt.includes('employment') || dt.includes('appointment'))) return true;
  if (rk === 'trainingcerts' && (did === 'training' || dt.includes('training'))) return true;
  if (rk === 'omnibusswornstatement' && (did === 'cav' || dt.includes('omnibus') || dt.includes('sworn') || dt.includes('cav'))) return true;
  if (rk === 'performancerating' && (did === 'performance' || dt.includes('performance') || dt.includes('ipcrf') || dt.includes('rating'))) return true;

  return false;
}

interface ReclassUploadModalProps {
  isOpen: boolean;
  applicantId: number | string;
  qualificationData?: {
    education?: string;
    years_experience?: number;
    hours_of_training?: number;
    eligibility?: string;
  } | null;
  onClose: () => void;
  onUploadSuccess?: () => void;
  onSubmissionComplete?: () => void;
  revisionDocuments?: any[];
  checklistDocuments?: any[];
}

export const ReclassUploadModal: React.FC<ReclassUploadModalProps> = ({
  isOpen,
  applicantId,
  qualificationData,
  onClose,
  onUploadSuccess,
  onSubmissionComplete,
  revisionDocuments = [],
  checklistDocuments = [],
}) => {
  const [documents, setDocuments] = useState<UploadedReclassDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [stagedFiles, setStagedFiles] = useState<Record<string, File>>({});
  const [recentlySubmittedKeys, setRecentlySubmittedKeys] = useState<string[]>([]);
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
    if (doc.category_key === 'letter_of_intent') {
      uploadedMap['letter_of_updating_records'] = doc;
    }
    if (doc.category_key === 'letter_of_updating_records') {
      uploadedMap['letter_of_intent'] = doc;
    }
  });

  const mandatoryRequirements = RECLASS_REQUIREMENTS.filter((req) => req.required);
  const totalMandatory = mandatoryRequirements.length;
  const uploadedMandatoryCount = mandatoryRequirements.filter((req) => !!uploadedMap[req.key]).length;
  const totalUploadedCount = RECLASS_REQUIREMENTS.filter((req) => !!uploadedMap[req.key]).length;
  const stagedCount = Object.keys(stagedFiles).length;
  const progressPercent = Math.min(100, Math.round((uploadedMandatoryCount / totalMandatory) * 100));

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

  const handleUploadSingle = async (key: string) => {
    const file = stagedFiles[key];
    if (!file) return;

    setIsSubmitting(true);
    try {
      const req = RECLASS_REQUIREMENTS.find((r) => r.key === key);
      const categoryTitle = req?.title || key;
      const description = req?.description || '';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category_key', key);
      formData.append('category_title', categoryTitle);
      formData.append('description', description);
      if (qualificationData) {
        if (qualificationData.education !== undefined) formData.append('education', qualificationData.education);
        if (qualificationData.years_experience !== undefined) formData.append('years_experience', String(qualificationData.years_experience));
        if (qualificationData.hours_of_training !== undefined) formData.append('hours_of_training', String(qualificationData.hours_of_training));
        if (qualificationData.eligibility !== undefined) formData.append('eligibility', qualificationData.eligibility);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-documents`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRecentlySubmittedKeys((prev) => Array.from(new Set([...prev, key])));
        setStagedFiles((prev) => {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        });
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-set-new-application`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              new_application: true,
              ...(qualificationData || {}),
            }),
          });
        } catch (e) {
          console.warn('Could not set new_application:', e);
        }
        await fetchDocuments();
        if (onUploadSuccess) onUploadSuccess();
        Swal.fire({
          icon: 'success',
          title: 'Document Resubmitted',
          text: `"${categoryTitle}" has been successfully uploaded and marked as Resubmit.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: data.message || `Failed to upload "${categoryTitle}".`,
        });
      }
    } catch (err) {
      console.error(`Error uploading ${key}:`, err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'An unexpected error occurred while uploading. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDoneOrUpload = async () => {
    const stagedKeys = Object.keys(stagedFiles);
    if (stagedKeys.length === 0) {
      if (documents.length > 0) {
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-set-new-application`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              new_application: true,
              ...(qualificationData || {}),
            }),
          });
          if (onUploadSuccess) onUploadSuccess();
          if (onSubmissionComplete) onSubmissionComplete();
        } catch (e) {
          console.warn('Could not set new_application:', e);
        }
      }
      onClose();
      return;
    }

    setIsSubmitting(true);
    setUploadProgress({ current: 0, total: stagedKeys.length });

    let successCount = 0;
    const uploadedSuccessKeys: string[] = [];
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
        if (qualificationData) {
          if (qualificationData.education !== undefined) formData.append('education', qualificationData.education);
          if (qualificationData.years_experience !== undefined) formData.append('years_experience', String(qualificationData.years_experience));
          if (qualificationData.hours_of_training !== undefined) formData.append('hours_of_training', String(qualificationData.hours_of_training));
          if (qualificationData.eligibility !== undefined) formData.append('eligibility', qualificationData.eligibility);
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-documents`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success) {
          successCount++;
          uploadedSuccessKeys.push(key);
        } else {
          failedTitles.push(categoryTitle);
        }
      } catch (err) {
        console.error(`Error uploading ${key}:`, err);
        failedTitles.push(categoryTitle);
      }
    }

    setIsSubmitting(false);

    if (uploadedSuccessKeys.length > 0) {
      setRecentlySubmittedKeys((prev) => Array.from(new Set([...prev, ...uploadedSuccessKeys])));
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/reclass-set-new-application`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            new_application: true,
            ...(qualificationData || {}),
          }),
        });
      } catch (e) {
        console.warn('Could not set new_application:', e);
      }
    }

    if (failedTitles.length === 0) {
      const isNewApp = Boolean(qualificationData) || revisionDocuments.length === 0;
      Swal.fire({
        icon: 'success',
        title: isNewApp ? 'Documents Submitted' : 'Documents Resubmitted',
        text: isNewApp
          ? `${successCount} document(s) have been successfully uploaded and attached to your application.`
          : `${successCount} document(s) have been successfully uploaded and marked as Resubmit.`,
        timer: 2000,
        showConfirmButton: false,
      });
      setStagedFiles({});
      await fetchDocuments();
      if (onUploadSuccess) onUploadSuccess();
      if (onSubmissionComplete) onSubmissionComplete();
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
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-extrabold tracking-tight leading-tight">
                  Reclassification Document Submission
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#facc15] text-[#022851] shadow-2xs">
                  For Updating
                </span>
              </div>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                DepEd Incumbent → School Counselor Requirements Folder
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
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                For Updating
              </span>
              <span className="text-xs font-bold text-[#022851] bg-white border border-gray-200 px-2.5 py-0.5 rounded-full">
                {totalUploadedCount} of {RECLASS_REQUIREMENTS.length} Uploaded ({uploadedMandatoryCount}/{totalMandatory} Mandatory)
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
          {revisionDocuments.length > 0 && (
            <div className="text-xs text-rose-950 bg-rose-50/90 border-2 border-rose-300 rounded-xl p-3.5 flex items-start gap-2.5 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-900 block font-black uppercase text-[11px] mb-0.5">
                  Action Required: {revisionDocuments.length} Document(s) Flagged for Revision
                </strong>
                <span className="leading-relaxed">
                  The Division HRMO has requested revisions on the highlighted requirements below. Please review the evaluator remarks and re-upload the updated PDF files.
                </span>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-600 bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Select your PDF documents below (PDF only, max 15MB). All chosen files will be uploaded and attached to your reclassification application once you click <strong>Done / Close</strong>. Note: Training certificates are optional.
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
                const hasUploadedDoc = Boolean(uploadedDoc && uploadedDoc.file_url);
                const stagedFile = stagedFiles[req.key];
                const checklistDoc = (checklistDocuments || []).find((cd: any) => matchesRequirementDoc(req.key, cd));
                const revDoc = (revisionDocuments || []).find((rd: any) => matchesRequirementDoc(req.key, rd));

                const rawStatus = String(
                  revDoc?.status || checklistDoc?.rawStatus || checklistDoc?.status || ''
                ).trim().toLowerCase().replace(/[\s-]/g, '_');

                const isRecentlySubmitted = recentlySubmittedKeys.includes(req.key);
                const isForRevision = !isRecentlySubmitted && (rawStatus === 'for_revision' || rawStatus.includes('revision'));
                const isSubmitted = (!stagedFile && isRecentlySubmitted) || (hasUploadedDoc && (rawStatus === 'submitted' || rawStatus.includes('submit')));
                const hasChecklistStatus = Boolean(checklistDoc?.status && String(checklistDoc.status).trim().toLowerCase() !== 'null');
                const evaluatorRemarks = revDoc?.remarks || checklistDoc?.remarks;

                return (
                  <div
                    key={req.key}
                    className={`border rounded-xl p-4 transition-all ${
                      isForRevision && stagedFile
                        ? 'border-sky-300 bg-sky-50/50 shadow-sm ring-2 ring-sky-200'
                        : isForRevision
                        ? 'border-rose-400 bg-rose-50/30 shadow-sm ring-2 ring-rose-300/40'
                        : isSubmitted
                        ? 'bg-amber-50/40 border-amber-300/80 shadow-xs ring-1 ring-amber-200/50'
                        : rawStatus === 'approved' || rawStatus === 'verified'
                        ? 'bg-emerald-50/30 border-emerald-200/90 shadow-sm'
                        : rawStatus === 'under_review' || rawStatus === 'pending' || rawStatus === 'for_review'
                        ? 'bg-amber-50/30 border-amber-200 shadow-sm'
                        : stagedFile
                        ? 'bg-sky-50/60 border-sky-300 shadow-sm'
                        : hasUploadedDoc
                        ? 'bg-emerald-50/30 border-emerald-200/80 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                            isForRevision && stagedFile
                              ? 'bg-sky-100 text-sky-700 border border-sky-300 shadow-2xs'
                              : isForRevision
                              ? 'bg-rose-600 text-white shadow-xs'
                              : isSubmitted
                              ? 'bg-amber-100 text-amber-800 border border-amber-300/80 shadow-2xs'
                              : rawStatus === 'approved' || rawStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-700'
                              : rawStatus === 'under_review' || rawStatus === 'pending' || rawStatus === 'for_review'
                              ? 'bg-amber-100 text-amber-700'
                              : stagedFile
                              ? 'bg-sky-100 text-sky-700'
                              : hasUploadedDoc
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {isForRevision && stagedFile ? (
                            <FileCheck className="w-5 h-5 text-sky-600" />
                          ) : isForRevision ? (
                            <AlertCircle className="w-5 h-5 text-white" />
                          ) : isSubmitted || hasUploadedDoc ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : rawStatus === 'approved' || rawStatus === 'verified' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : rawStatus === 'under_review' || rawStatus === 'pending' || rawStatus === 'for_review' ? (
                            <Clock className="w-5 h-5 text-amber-600" />
                          ) : stagedFile ? (
                            <FileCheck className="w-5 h-5 text-sky-600" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-[#022851] tracking-tight">{req.title}</h3>
                            {!req.required && (
                              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                                Optional
                              </span>
                            )}
                            {isForRevision && stagedFile ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300 shadow-2xs animate-pulse">
                                <FileCheck className="w-3 h-3 text-sky-600" /> Replacement Selected (Ready to Resubmit)
                              </span>
                            ) : isForRevision ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-2xs">
                                <AlertCircle className="w-3 h-3" /> Action Required: For Revision
                              </span>
                            ) : null}

                            {/* "Updated" Tag for uploaded / submitted documents */}
                            {(hasUploadedDoc || isSubmitted) && !isForRevision && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Updated
                              </span>
                            )}

                            {/* Evaluator Review Status Tag if evaluated by HRMO */}
                            {hasChecklistStatus && !isForRevision && !isRecentlySubmitted && (
                              rawStatus === 'approved' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Approved
                                </span>
                              ) : rawStatus === 'verified' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                                </span>
                              ) : rawStatus === 'under_review' || rawStatus === 'for_review' || rawStatus === 'pending' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  <Clock className="w-3 h-3 text-amber-600" /> Under Review
                                </span>
                              ) : null
                            )}

                            {/* Pending upload / optional if no file attached yet */}
                            {!hasUploadedDoc && !isSubmitted && !stagedFile && !isForRevision && (
                              req.required ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  <Clock className="w-3 h-3" /> Pending Upload (For Updating)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                  <Clock className="w-3 h-3 text-slate-400" /> Optional (For Updating)
                                </span>
                              )
                            )}

                            {/* Staged file badge */}
                            {stagedFile && !isForRevision && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                                <FileCheck className="w-3 h-3 text-sky-600" /> {hasUploadedDoc ? 'New File Selected (For Updating)' : 'Selected for Updating'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{req.description}</p>

                          {/* HRMO Evaluator Remarks if flagged for revision or general feedback */}
                          {evaluatorRemarks && (
                            <div className={`mt-2.5 p-2 rounded-lg text-[11px] ${
                              isForRevision
                                ? 'bg-amber-50/90 border border-amber-300 text-amber-950'
                                : isSubmitted
                                ? 'bg-slate-50 border border-slate-200 text-slate-700'
                                : 'bg-slate-50 border border-slate-200 text-slate-800'
                            }`}>
                              <span className="font-black uppercase text-[9px] block tracking-wider mb-0.5 text-gray-700">
                                {isForRevision
                                  ? 'HRMO Remarks / Required Action:'
                                  : isSubmitted
                                  ? 'Previous HRMO Remarks (Resubmit):'
                                  : 'HRMO Remarks / Feedback:'}
                              </span>
                              <p className="italic font-medium leading-relaxed">
                                "{evaluatorRemarks}"
                              </p>
                            </div>
                          )}
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
                          {!stagedFile && hasUploadedDoc && uploadedDoc && (
                            <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500 font-medium">
                              <span className="truncate max-w-[200px] sm:max-w-xs font-semibold text-gray-700 flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {uploadedDoc.file_name}
                              </span>
                              {uploadedDoc.file_size && (
                                <span>&bull; {formatFileSize(uploadedDoc.file_size)}</span>
                              )}
                              {(uploadedDoc.updated_at || uploadedDoc.uploaded_at) && (
                                <span className="hidden sm:inline">
                                  &bull; Updated {new Date(uploadedDoc.updated_at || uploadedDoc.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0 self-end sm:self-start mt-2 sm:mt-0">
                        {/* Staged File Actions */}
                        {stagedFile ? (
                          <>
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => handleRemoveStagedFile(req.key)}
                              className="px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
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
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={() => handleUploadSingle(req.key)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#022851] hover:bg-[#033a76] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                              title={isForRevision || hasUploadedDoc ? 'Submit re-uploaded document now' : 'Upload document now'}
                            >
                              {isSubmitting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              <span>{isForRevision || hasUploadedDoc ? 'Resubmit' : 'Upload'}</span>
                            </button>
                          </>
                        ) : hasUploadedDoc && uploadedDoc ? (
                          <>
                            {uploadedDoc.file_url && (
                              <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => handleViewFile(uploadedDoc.file_url)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" /> View
                              </button>
                            )}

                            <label
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm ${
                                isSubmitting
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : isForRevision
                                  ? 'bg-rose-600 hover:bg-rose-700 text-white font-black'
                                  : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              {isForRevision ? (
                                <>
                                  <Upload className="w-3.5 h-3.5" /> Re-upload
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" /> Replace
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
                        ) : (
                          <label
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm ${
                              isSubmitting
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-[#022851] hover:bg-[#033a76] text-white active:scale-95'
                            }`}
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload for Updating</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              disabled={isSubmitting}
                              className="hidden"
                              onChange={(e) => handleFileSelect(req, e)}
                            />
                          </label>
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
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-gray-500 font-medium text-center sm:text-left">
            {stagedCount > 0
              ? `📄 ${stagedCount} file(s) selected and ready to upload.`
              : uploadedMandatoryCount === totalMandatory
              ? '🎉 All 7 mandatory reclassification documents are uploaded.'
              : `${totalMandatory - uploadedMandatoryCount} mandatory document(s) pending.`}
          </span>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleDoneOrUpload}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#022851] hover:bg-[#033a76] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Uploading ({uploadProgress.current}/{uploadProgress.total})...</span>
              </>
            ) : stagedCount > 0 ? (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload & Submit ({stagedCount})</span>
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
