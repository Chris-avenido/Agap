import { useState, useEffect, useMemo } from 'react';
import { Briefcase, CheckCircle2, History, ArrowRight, ArrowLeft, Users, ChevronRight, Bookmark, Lock, Award, Upload, FileCheck, FileCheck2, Building2, Clock, Edit2, Check, X, Sparkles, MapPin, TrendingUp, AlertTriangle, AlertCircle, Calendar, FileText, Info, Send, Landmark, HelpCircle, BookOpen, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateProfileProgress, parseProfileToState } from '../utils/profileProgress';
import Swal from 'sweetalert2';
import ApplicantHeader from '../components/ApplicantHeader';
import ApplicationModal from '../components/ApplicationModal';
import PlantillaGateModal from '../components/PlantillaGateModal';
import ReclassUploadModal from '../components/ReclassUploadModal';
import ReclassUpdateModal from '../components/ReclassUpdateModal';

const NOT_REGISTERED_TARGET_OPTIONS = [
  { value: 'SCHOOL COUNSELOR ASSOCIATE I', label: 'School Counselor Associate I', sg: 'SG-11' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE II', label: 'School Counselor Associate II', sg: 'SG-12' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE III', label: 'School Counselor Associate III', sg: 'SG-13' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE IV', label: 'School Counselor Associate IV', sg: 'SG-14' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE V', label: 'School Counselor Associate V', sg: 'SG-15' },
];

const REGISTERED_TARGET_OPTIONS = [
  { value: 'SCHOOL COUNSELOR I', label: 'School Counselor I', sg: 'SG-16' },
  { value: 'SCHOOL COUNSELOR II', label: 'School Counselor II', sg: 'SG-18' },
  { value: 'SCHOOL COUNSELOR III', label: 'School Counselor III', sg: 'SG-20' },
  { value: 'SCHOOL COUNSELOR IV', label: 'School Counselor IV', sg: 'SG-22' },
];

const TARGET_POSITION_OPTIONS = [
  ...NOT_REGISTERED_TARGET_OPTIONS,
  ...REGISTERED_TARGET_OPTIONS,
];

const RECLASS_TARGET_OPTIONS = TARGET_POSITION_OPTIONS;

function isRegisteredPosition(pos?: string | null): boolean {
  if (!pos) return false;
  const clean = pos.toUpperCase();
  return !clean.includes('ASSOCIATE') && (clean.includes('COUNSELOR') || clean.includes('SPECIALIST'));
}

export function isAssessedSCIV(pos?: string | null): boolean {
  if (!pos) return false;
  const clean = pos.toUpperCase().trim();
  if (clean.includes('ASSOCIATE')) return false;
  return (
    clean.includes('SCHOOL COUNSELOR IV') ||
    clean.includes('SC IV') ||
    clean === 'SC 4' ||
    clean.includes('COUNSELOR IV')
  );
}

function getPositionSalaryGrade(posName?: string | null): string {
  if (!posName) return '—';
  const clean = posName.toUpperCase().trim();

  // Schools Division Counselor track
  if (clean.includes('SCHOOLS DIVISION COUNSELOR') || clean.includes('SCHOOL DIVISION COUNSELOR') || clean.includes('DIVISION COUNSELOR')) return 'SG-24';

  // School Counselor Associate track
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE V')) return 'SG-15';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE IV')) return 'SG-14';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE III')) return 'SG-13';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE II')) return 'SG-12';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE I') || clean === 'SCHOOL COUNSELOR ASSOCIATE') return 'SG-11';

  // School Counselor track
  if (clean.includes('SCHOOL COUNSELOR IV')) return 'SG-22';
  if (clean.includes('SCHOOL COUNSELOR III')) return 'SG-20';
  if (clean.includes('SCHOOL COUNSELOR II')) return 'SG-18';
  if (clean.includes('SCHOOL COUNSELOR I') || clean === 'SCHOOL COUNSELOR') return 'SG-16';

  // Incumbent Guidance track (for current position)
  if (clean.includes('GUIDANCE SERVICES SPECIALIST II')) return 'SG-18';
  if (clean.includes('GUIDANCE SERVICES SPECIALIST I') || clean.includes('GUIDANCE SERVICES SPECIALIST')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR III')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR II')) return 'SG-15';
  if (clean.includes('GUIDANCE COORDINATOR I') || clean.includes('GUIDANCE COORDINATOR')) return 'SG-14';
  if (clean.includes('GUIDANCE COUNSELOR III')) return 'SG-13';
  if (clean.includes('GUIDANCE COUNSELOR II')) return 'SG-12';
  if (clean.includes('GUIDANCE COUNSELOR I') || clean === 'GUIDANCE COUNSELOR' || clean.includes('GUIDANCE COUNSELOR')) return 'SG-11';

  return '—';
}

export interface ChecklistDocumentItem {
  id?: string;
  key?: string;
  title: string;
  status: string;
  rawStatus: string;
  remarks?: string;
  required?: boolean;
  fileName?: string;
  fileUrl?: string;
}

export type RevisionDocumentItem = ChecklistDocumentItem;

function normalizeRequirementKey(item: any): string {
  const rawKey = String(item.key || item.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const title = String(item.shortTitle || item.label || item.title || item.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (rawKey === 'pds' || rawKey.includes('personaldata') || title.includes('personaldata') || title.includes('pds')) return 'pds';
  if (
    rawKey === 'loi' ||
    rawKey === 'letter_of_updating_records' ||
    rawKey === 'letter_of_intent' ||
    rawKey.includes('intent') ||
    rawKey.includes('updatingrecord') ||
    rawKey.includes('updating') ||
    title.includes('intent') ||
    title.includes('updating') ||
    title.includes('records')
  )
    return 'letter_of_updating_records';
  if (
    rawKey === 'eligibility' ||
    rawKey.includes('prc') ||
    rawKey.includes('license') ||
    rawKey.includes('eligib') ||
    title.includes('eligib') ||
    title.includes('prc')
  ) {
    if (!title.includes('performance') && !rawKey.includes('performance') && !rawKey.includes('ipcrf')) {
      return 'proof_of_eligibility';
    }
  }
  if (
    rawKey === 'tor' ||
    rawKey.includes('academic') ||
    rawKey.includes('transcript') ||
    rawKey.includes('diploma') ||
    title.includes('transcript') ||
    title.includes('diploma') ||
    title.includes('tor')
  )
    return 'academic_record';
  if (
    rawKey === 'service' ||
    rawKey.includes('servicerecord') ||
    rawKey.includes('employment') ||
    rawKey.includes('appointment') ||
    title.includes('servicerecord') ||
    title.includes('appointment')
  )
    return 'service_record';
  if (rawKey === 'training' || rawKey.includes('certificate') || title.includes('training')) return 'training_certs';
  if (
    rawKey === 'cav' ||
    rawKey.includes('omnibus') ||
    rawKey.includes('sworn') ||
    title.includes('omnibus') ||
    title.includes('sworn') ||
    title.includes('cav')
  )
    return 'omnibus_sworn_statement';
  if (
    rawKey === 'performance' ||
    rawKey.includes('ipcrf') ||
    rawKey.includes('rating') ||
    title.includes('performance') ||
    title.includes('ipcrf') ||
    title.includes('rating')
  )
    return 'performance_rating';

  return rawKey || title || String(item.id || item.key || '');
}

export function parseChecklistDocuments(checklist: any): ChecklistDocumentItem[] {
  if (!checklist) return [];

  let list: any[] = [];
  if (Array.isArray(checklist)) {
    list = checklist;
  } else if (typeof checklist === 'string') {
    const trimmed = checklist.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          list = parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          list = Object.entries(parsed).map(([key, val]) => {
            if (typeof val === 'object' && val !== null) {
              return { key, ...val };
            }
            return { key, status: val };
          });
        }
      } catch {
        list = [];
      }
    } else {
      list = [];
    }
  } else if (typeof checklist === 'object' && checklist !== null) {
    list = Object.entries(checklist).map(([key, val]) => {
      if (typeof val === 'object' && val !== null) {
        return { key, ...val };
      }
      return { key, status: val };
    });
  }

  if (!list || list.length === 0) return [];

  const itemMap = new Map<string, ChecklistDocumentItem>();

  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx];
    if (!item || typeof item !== 'object') continue;

    // Display all status except for null / undefined / empty string / 'null'
    const itemStatusVal =
      item.status !== null && item.status !== undefined && item.status !== ''
        ? item.status
        : item.submitted
        ? 'submitted'
        : null;
    if (!itemStatusVal) continue;

    const rawStatusStr = String(itemStatusVal).trim();
    if (rawStatusStr.toLowerCase() === 'null') continue;

    const rawStatus = rawStatusStr.toLowerCase().replace(/[\s-]/g, '_');
    const title =
      item.shortTitle ||
      item.label ||
      item.title ||
      item.name ||
      item.id ||
      item.key ||
      `Document ${idx + 1}`;
    const remarks = item.remarks || item.comment || item.reason || '';

    const docItem: ChecklistDocumentItem = {
      id: item.id || item.key || `chk-${idx}`,
      key: item.key || item.id || '',
      title,
      status: rawStatusStr,
      rawStatus,
      remarks,
      required: Boolean(item.required),
      fileName: item.file_name || item.fileName,
      fileUrl: item.file_url || item.url,
    };

    const normKey = normalizeRequirementKey(item);
    if (!itemMap.has(normKey)) {
      itemMap.set(normKey, docItem);
    } else {
      const existing = itemMap.get(normKey)!;
      const isCurrentRev = docItem.rawStatus === 'for_revision' || docItem.rawStatus.includes('revision');
      const isExistingRev = existing.rawStatus === 'for_revision' || existing.rawStatus.includes('revision');

      // Prioritize revision item if any duplicate has for_revision
      if (isCurrentRev && !isExistingRev) {
        itemMap.set(normKey, { ...existing, ...docItem });
      } else if (docItem.fileUrl && !existing.fileUrl) {
        itemMap.set(normKey, { ...existing, fileUrl: docItem.fileUrl, fileName: docItem.fileName || existing.fileName });
      } else if (docItem.remarks && !existing.remarks) {
        itemMap.set(normKey, { ...existing, remarks: docItem.remarks });
      }
    }
  }

  return Array.from(itemMap.values());
}

export function parseRevisionDocuments(checklist: any): ChecklistDocumentItem[] {
  const allDocs = parseChecklistDocuments(checklist);
  return allDocs.filter((doc) => doc.rawStatus === 'for_revision' || doc.rawStatus.includes('revision'));
}

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reclassData, setReclassData] = useState<any>(null);

  const checklistDocuments = useMemo(() => {
    if (!reclassData) return [];
    const rawChecklist = reclassData.documents_checklist || reclassData.document_checklist;
    return parseChecklistDocuments(rawChecklist);
  }, [reclassData]);

  const revisionDocuments = useMemo(() => {
    return checklistDocuments.filter((doc) => doc.rawStatus === 'for_revision');
  }, [checklistDocuments]);
  const revisionDocsCount = revisionDocuments.length;
  const [showGateModal, setShowGateModal] = useState(false);
  const [isReclassUploadModalOpen, setIsReclassUploadModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateModalInitialStep, setUpdateModalInitialStep] = useState<1 | 2>(1);
  const [showInitialPrompt, setShowInitialPrompt] = useState(false);
  const [initialPromptType, setInitialPromptType] = useState<'apply' | 'update'>('apply');
  const [reclassApplyStep, setReclassApplyStep] = useState<'prompt' | 'form'>('prompt');
  const [applyEducation, setApplyEducation] = useState('');
  const [applyYearsExperience, setApplyYearsExperience] = useState('');
  const [applyHoursTraining, setApplyHoursTraining] = useState('');
  const [applyEligibility, setApplyEligibility] = useState('');
  const [isSubmittingReclassApply, setIsSubmittingReclassApply] = useState(false);
  const [isSavingPreference, setIsSavingPreference] = useState(false);
  const [isEditingTargetPosition, setIsEditingTargetPosition] = useState(false);
  const [editTargetPositionValue, setEditTargetPositionValue] = useState('SCHOOL COUNSELOR ASSOCIATE I');
  const [isSavingTargetPosition, setIsSavingTargetPosition] = useState(false);
  const [pendingQualificationData, setPendingQualificationData] = useState<{
    education: string;
    years_experience: number;
    hours_of_training: number;
    eligibility: string;
  } | null>(null);

  useEffect(() => {
    if (reclassData) {
      if (reclassData.education) setApplyEducation(reclassData.education);
      if (reclassData.years_experience !== null && reclassData.years_experience !== undefined) {
        setApplyYearsExperience(String(reclassData.years_experience));
      }
      if (reclassData.hours_of_training !== null && reclassData.hours_of_training !== undefined) {
        setApplyHoursTraining(String(reclassData.hours_of_training));
      }
      if (reclassData.eligibility) setApplyEligibility(reclassData.eligibility);
    }
  }, [reclassData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'active' | 'history' | 'saved'>('active');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [reclassDocs, setReclassDocs] = useState<any[]>([]);

  const refreshReclassData = async (applicantId?: number | string) => {
    const sessionStr = localStorage.getItem('session_data');
    const targetId = applicantId || (sessionStr ? JSON.parse(sessionStr).id : null);
    if (!targetId) return;

    try {
      const [reclassRes, docsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/applicants/${targetId}/reclass-details`).then(res => res.json()).catch(() => ({ success: false })),
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/applicants/${targetId}/reclass-documents`).then(res => res.json()).catch(() => ({ success: false, data: [] })),
      ]);
      if (reclassRes && reclassRes.success && reclassRes.data) {
        setReclassData(reclassRes.data);
        if (reclassRes.data.target_position || reclassRes.data.reclass_position) {
          setEditTargetPositionValue(reclassRes.data.target_position || reclassRes.data.reclass_position);
        }
      }
      if (docsRes && docsRes.success && Array.isArray(docsRes.data)) {
        setReclassDocs(docsRes.data);
      }
    } catch (e) {
      console.error('Error refreshing reclass data:', e);
    }
  };

  const handleSaveTargetPosition = async () => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return;
    const session = JSON.parse(sessionStr);

    const userInitial =
      reclassData?.initial_assessment_position ||
      reclassData?.initial_assessment ||
      reclassData?.reclass_position;
    if (isAssessedSCIV(userInitial)) {
      setIsEditingTargetPosition(false);
      Swal.fire({
        icon: 'info',
        title: 'Update Disabled',
        text: 'You are already assessed as School Counselor IV (SC IV), the maximum reclassification role. Further updates are disabled.',
      });
      return;
    }

    setIsSavingTargetPosition(true);
    const isReg = isRegisteredPosition(editTargetPositionValue);
    const regTrack = isReg ? 'registered' : 'not_registered';

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/applicants/${session.id}/reclass-target-position`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            target_position: editTargetPositionValue,
            desired_position: editTargetPositionValue,
            update_application: true,
            is_registered: isReg,
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        const newSG = getPositionSalaryGrade(editTargetPositionValue).replace('SG-', '');
        setReclassData((prev: any) => ({
          ...prev,
          target_position: editTargetPositionValue,
          desired_position: editTargetPositionValue,
          reclass_position: editTargetPositionValue,
          salary_grade: newSG,
          indicative_position: data.data?.indicative_position || editTargetPositionValue,
          indicative_salary_grade: data.data?.indicative_salary_grade || newSG,
          update_application: true,
          is_registered: isReg,
        }));
        setIsEditingTargetPosition(false);
        const selectedOpt = TARGET_POSITION_OPTIONS.find((opt) => opt.value === editTargetPositionValue);
        const positionLabel = selectedOpt ? selectedOpt.label : editTargetPositionValue;
        Swal.fire({
          icon: 'success',
          title: 'Desired Position Updated',
          text: `Your desired position is now ${positionLabel} (${getPositionSalaryGrade(editTargetPositionValue)}).`,
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'Unable to update desired position.',
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to the server to update desired position.',
      });
    } finally {
      setIsSavingTargetPosition(false);
    }
  };

  const handleUpdateApplicationAnswer = async (answer: 'yes' | 'no') => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return;
    const session = JSON.parse(sessionStr);



    setIsSavingPreference(true);
    try {
      if (answer === 'yes') {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applicants/${session.id}/reclass-update-preference`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update_application: true }),
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setReclassData((prev: any) => ({
            ...prev,
            update_application: true,
          }));
        }
        setShowInitialPrompt(false);
        // Show Reclassification Application modal after selecting Yes
        setIsUpdateModalOpen(true);
        setUpdateModalInitialStep(1);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/applicants/${session.id}/reclass-update-preference`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update_application: false }),
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setReclassData((prev: any) => ({
            ...prev,
            update_application: false,
          }));
          Swal.fire({
            icon: 'info',
            title: 'Preference Saved',
            text: 'Your application will proceed under your current plantilla record and initial assessment.',
            timer: 2500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
          });
        }
        setShowInitialPrompt(false);
      }
    } catch (err) {
      console.error('Error saving update preference:', err);
      if (answer === 'yes') {
        setShowInitialPrompt(false);
        setIsUpdateModalOpen(true);
        setUpdateModalInitialStep(1);
      }
    } finally {
      setIsSavingPreference(false);
    }
  };

  const handleReclassApplySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return;
    const session = JSON.parse(sessionStr);

    const cleanEdu = applyEducation.trim().toUpperCase();
    const cleanElig = applyEligibility.trim().toUpperCase();
    const cleanExp = applyYearsExperience.trim();
    const cleanTraining = applyHoursTraining.trim();

    if (!cleanEdu) {
      Swal.fire({
        icon: 'warning',
        title: 'Education Required',
        text: 'Please enter your education or degree attained.',
      });
      return;
    }

    if (cleanExp === '' || isNaN(Number(cleanExp)) || Number(cleanExp) < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Valid Experience Required',
        text: 'Please enter your years of experience (or enter 0 if none).',
      });
      return;
    }

    if (cleanTraining === '' || isNaN(Number(cleanTraining)) || Number(cleanTraining) < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Valid Training Required',
        text: 'Please enter your hours of relevant training (or enter 0 if none).',
      });
      return;
    }

    if (!cleanElig) {
      Swal.fire({
        icon: 'warning',
        title: 'Eligibility Required',
        text: 'Please enter your eligibility or professional license.',
      });
      return;
    }

    // Do not insert immediately; include in saving documents per user instructions
    const qsData = {
      education: cleanEdu,
      years_experience: Number(cleanExp),
      hours_of_training: Number(cleanTraining),
      eligibility: cleanElig,
    };
    setPendingQualificationData(qsData);
    setShowInitialPrompt(false);
    setReclassApplyStep('prompt');

    // Immediately open the Reclassification Document Submission upload modal
    setIsReclassUploadModalOpen(true);

    Swal.fire({
      icon: 'info',
      title: 'Qualifications Recorded',
      text: 'Please upload the necessary documents. Your qualification details will be saved together with your submitted documents.',
      timer: 3500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  };

  const handleReclassSubmissionComplete = async () => {
    setIsReclassUploadModalOpen(false);
    await refreshReclassData();
    // After success "Reclassification Document Submission", show modal "Reclassification Application"
    setUpdateModalInitialStep(1);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalSuccess = (updatedData: any) => {
    if (updatedData) {
      setReclassData(updatedData);
      if (updatedData.target_position || updatedData.reclass_position) {
        setEditTargetPositionValue(updatedData.target_position || updatedData.reclass_position);
      }
    }
    refreshReclassData();
  };

  const handleFilterChange = (filter: 'active' | 'history' | 'saved') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSetPasscode = async () => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return;
    const session = JSON.parse(sessionStr);

    const { value: passcode } = await Swal.fire({
      title: 'Set Login Passcode',
      input: 'text',
      inputLabel: 'Enter a 6-digit passcode',
      inputPlaceholder: 'e.g., 123456',
      inputAttributes: {
        maxlength: '6',
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        if (!/^\d{6}$/.test(value)) {
          return 'Passcode must be exactly 6 digits!'
        }
      }
    });

    if (passcode) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/passcode`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode })
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire('Success', data.message, 'success');
        } else {
          Swal.fire('Error', data.message || 'Failed to update passcode', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Unable to reach the server', 'error');
      }
    }
  };

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/saved-jobs`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/reclass-details`).then(res => res.json()).catch(() => ({ success: false })),
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/reclass-documents`).then(res => res.json()).catch(() => ({ success: false, data: [] })),
    ])
      .then(([appsData, savedData, profileData, reclassRes, reclassDocsRes]) => {
        if (appsData.success && appsData.data) {
          setApplications(appsData.data.map((app: any) => ({
            id: app.id,
            position: app.job_title || 'Unknown Position',
            division: app.division || app.office || 'Department of Education',
            date: app.date_applied || app.created_at,
            applicationStatus: app.status || 'Pending',
            assessmentStatus: app.assessment_status || 'Pending Assessment',
            status: app.status === 'Hired' || app.status === 'Rejected' ? 'Past' : 'Active',
            letterOfIntent: app.letter_of_intent || null,
            swornDocument: app.sworn_document || null,
            rawStatus: app.status
          })));
        }
        if (savedData.success && savedData.data) {
          setSavedJobs(savedData.data.map((job: any) => ({
            id: job.id,
            position: job.position_title || 'Unknown Position',
            office: job.office || 'Department of Education',
            date: 'N/A',
            stage: 'Saved',
            status: 'Saved'
          })));
        }
        if (reclassDocsRes && reclassDocsRes.success && Array.isArray(reclassDocsRes.data)) {
          setReclassDocs(reclassDocsRes.data);
        }
        if (profileData.success && profileData.data) {
          const userProfile = profileData.data;
          setProfile(userProfile);

          const registrantType = userProfile.registrant_type || session.registrant_type || 'jobseeker';
          if (registrantType === 'reclass') {
            const hasVerifiedItem = !!(userProfile.plantilla_item_number || session.plantilla_item_number);
            if (!hasVerifiedItem) {
              setShowGateModal(true);
            } else {
              if (reclassRes && reclassRes.success && reclassRes.data) {
                setReclassData(reclassRes.data);
                if (reclassRes.data.target_position || reclassRes.data.reclass_position) {
                  setEditTargetPositionValue(reclassRes.data.target_position || reclassRes.data.reclass_position);
                }
                const assessedPos =
                  reclassRes.data.initial_assessment_position ||
                  reclassRes.data.initial_assessment ||
                  reclassRes.data.reclass_position;
                const isSCIV = isAssessedSCIV(assessedPos);

                const hasInitialAssessment =
                  !!reclassRes.data.initial_assessment &&
                  String(reclassRes.data.initial_assessment).trim() !== '' &&
                  String(reclassRes.data.initial_assessment).toUpperCase() !== 'N/A';

                const isInitialNull =
                  !hasInitialAssessment && reclassRes.data.new_application !== true;

                const isUpdateAppNotBool =
                  reclassRes.data.update_application !== true &&
                  reclassRes.data.update_application !== false;

                if (!isSCIV && isInitialNull) {
                  setShowInitialPrompt(true);
                  setInitialPromptType('apply');
                  setReclassApplyStep('prompt');
                } else if (hasInitialAssessment && isUpdateAppNotBool) {
                  setShowInitialPrompt(true);
                  setInitialPromptType('update');
                } else {
                  setShowInitialPrompt(false);
                }
              }
            }
          }
        }
      })
      .catch(err => console.error('Error fetching dashboard data:', err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleViewDocument = async (docType: 'Letter of Intent' | 'Sworn Declaration', defaultUrl?: string | null, targetAppId?: string) => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      if (defaultUrl) {
        const sasUrl = defaultUrl.startsWith('http')
          ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(defaultUrl)}`
          : defaultUrl;
        window.open(sasUrl, '_blank');
      }
      return;
    }
    const session = JSON.parse(sessionStr);

    Swal.fire({
      title: 'Loading your applied jobs...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    let userApplications: any[] = [];
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        userApplications = data.data;
      }
    } catch (e) {
      console.error('Error fetching applications for view:', e);
    }

    const fieldKey = docType === 'Letter of Intent' ? 'letter_of_intent' : 'sworn_document';
    const appsWithDoc = userApplications.filter(app => Boolean(app[fieldKey]));

    if (appsWithDoc.length === 0) {
      if (defaultUrl) {
        const sasUrl = defaultUrl.startsWith('http')
          ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(defaultUrl)}`
          : defaultUrl;
        window.open(sasUrl, '_blank');
        Swal.close();
        return;
      }
      Swal.fire('No Document Found', `No ${docType} has been attached to any of your applications yet.`, 'info');
      return;
    }

    const appRadioHtml = appsWithDoc.map((app, index) => {
      const positionTitle = app.job_title || app.position || 'Position Applied';
      const divisionName = app.division || app.office || 'Department of Education';
      const dateApplied = app.date_applied || app.created_at;
      const formattedDate = dateApplied ? new Date(dateApplied).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A';
      const docUrl = app[fieldKey];
      const isChecked = targetAppId ? String(app.id) === String(targetAppId) : index === 0;

      return `
        <label style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
          <input type="radio" name="swal-view-doc" class="swal-view-radio" value="${encodeURIComponent(docUrl)}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; flex-shrink: 0;" />
          <div style="display: flex; flex-direction: column; flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span style="font-weight: 700; font-size: 13.5px; color: #022851; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${positionTitle}</span>
              <span style="font-size: 10px; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; flex-shrink: 0;">${app.status || 'Applied'}</span>
            </div>
            <span style="font-size: 11px; color: #64748b; margin-top: 2px;">${divisionName} &bull; Applied: ${formattedDate}</span>
          </div>
        </label>
      `;
    }).join('');

    const htmlContent = `
      <div style="font-family: inherit; font-size: 14px; text-align: left; max-height: 420px; overflow-y: auto; padding-right: 4px;">
        <p style="margin-bottom: 12px; font-size: 13px; color: #475569; font-weight: 500;">
          Select which job application's <strong>${docType}</strong> you want to view:
        </p>

        <div id="swal-view-list" style="display: flex; flex-direction: column;">
          ${appRadioHtml}
        </div>
      </div>
    `;

    const { value: selectedDocUrl } = await Swal.fire({
      title: `View ${docType}`,
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: 'View Selected Document',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
      focusConfirm: false,
      preConfirm: () => {
        const checkedRadio = document.querySelector('.swal-view-radio:checked') as HTMLInputElement;
        if (!checkedRadio) {
          Swal.showValidationMessage('Please select an applied position to view its document!');
          return false;
        }
        return decodeURIComponent(checkedRadio.value);
      }
    });

    if (!selectedDocUrl) return;

    const sasUrl = selectedDocUrl.startsWith('http')
      ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(selectedDocUrl)}`
      : selectedDocUrl;
    window.open(sasUrl, '_blank');
  };

  const handleReplaceDocument = async (docType: 'Letter of Intent' | 'Sworn Declaration', preselectAppId?: string) => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) return;
    const session = JSON.parse(sessionStr);

    Swal.fire({
      title: 'Loading your applied jobs...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    let userApplications: any[] = [];
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        userApplications = data.data;
      }
    } catch (e) {
      console.error('Error fetching applications:', e);
    }

    if (userApplications.length === 0) {
      Swal.fire('No Applications Found', 'You do not have any job applications to update.', 'info');
      return;
    }

    const activeApps = userApplications.filter(app => {
      const status = app.status || '';
      return !['Hired', 'Archived', 'Cancelled', 'Rejected'].includes(status);
    });

    if (activeApps.length === 0) {
      Swal.fire('No Editable Applications', 'All your applied positions are finalized and cannot be updated.', 'info');
      return;
    }

    const isVacancyClosed = (app: any) => {
      const vStatus = String(app.vacancy_status || '').toLowerCase().trim();
      return vStatus === 'closed';
    };

    const openApps = activeApps.filter(app => !isVacancyClosed(app));

    const appCheckboxesHtml = activeApps.map(app => {
      const positionTitle = app.job_title || app.position || 'Position Applied';
      const divisionName = app.division || app.office || 'Department of Education';
      const dateApplied = app.date_applied || app.created_at;
      const formattedDate = dateApplied ? new Date(dateApplied).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A';
      const closed = isVacancyClosed(app);

      if (closed) {
        return `
          <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 8px; opacity: 0.65; cursor: not-allowed; text-align: left;">
            <div style="width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: #94a3b8; flex-shrink: 0;">
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
            </div>
            <div style="display: flex; flex-direction: column; flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <span style="font-weight: 700; font-size: 13.5px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${positionTitle}</span>
                <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                  <span style="font-size: 10px; font-weight: 700; background: #fee2e2; color: #b91c1c; padding: 2px 6px; border-radius: 4px; border: 1px solid #fca5a5;">Vacancy Closed</span>
                  <span style="font-size: 10px; font-weight: 700; background: #e2e8f0; color: #475569; padding: 2px 6px; border-radius: 4px;">${app.status || 'Closed'}</span>
                </div>
              </div>
              <span style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${divisionName} &bull; Applied: ${formattedDate} (Closed &bull; Disabled)</span>
            </div>
          </div>
        `;
      }

      const isChecked = preselectAppId ? String(app.id) === String(preselectAppId) : false;

      return `
        <label style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
          <input type="checkbox" class="swal-app-checkbox" value="${app.id}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; flex-shrink: 0;" />
          <div style="display: flex; flex-direction: column; flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span style="font-weight: 700; font-size: 13.5px; color: #022851; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${positionTitle}</span>
              <span style="font-size: 10px; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; flex-shrink: 0;">${app.status || 'Pending'}</span>
            </div>
            <span style="font-size: 11px; color: #64748b; margin-top: 2px;">${divisionName} &bull; Applied: ${formattedDate}</span>
          </div>
        </label>
      `;
    }).join('');

    const htmlContent = `
      <div style="font-family: inherit; font-size: 14px; text-align: left; max-height: 440px; overflow-y: auto; padding-right: 4px;">
        <p style="margin-bottom: 12px; font-size: 13px; color: #475569; font-weight: 500;">
          Select the applied job position(s) where you want to update your <strong>${docType}</strong>:
        </p>

        <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; padding: 8px 12px; border-radius: 6px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #2563eb; cursor: pointer; user-select: none;">
            <input type="checkbox" id="swal-toggle-all" style="width: 16px; height: 16px; accent-color: #2563eb; cursor: pointer;" />
            Select / Deselect All Applied Jobs (${openApps.length})
          </label>
        </div>

        <div id="swal-app-list" style="display: flex; flex-direction: column;">
          ${appCheckboxesHtml}
        </div>

        <div style="margin-top: 16px; padding-top: 14px; border-top: 1.5px solid #e2e8f0;">
          <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 6px; color: #022851;">
            Choose New PDF Document (Max 5MB):
          </label>
          <input type="file" id="swal-replacement-file" accept=".pdf,image/*" style="display: block; width: 100%; font-size: 12px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer;" />
        </div>
      </div>
    `;

    const { value: formValues } = await Swal.fire({
      title: `Replace ${docType}`,
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: 'Upload & Update Selected Jobs',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
      focusConfirm: false,
      didOpen: () => {
        const toggleAll = document.getElementById('swal-toggle-all') as HTMLInputElement;
        const checkboxes = document.querySelectorAll('.swal-app-checkbox') as NodeListOf<HTMLInputElement>;

        if (toggleAll) {
          toggleAll.addEventListener('change', () => {
            checkboxes.forEach(cb => { cb.checked = toggleAll.checked; });
          });
          checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
              const allChecked = Array.from(checkboxes).every(c => c.checked);
              const someChecked = Array.from(checkboxes).some(c => c.checked);
              if (allChecked) {
                toggleAll.checked = true;
                toggleAll.indeterminate = false;
              } else if (!someChecked) {
                toggleAll.checked = false;
                toggleAll.indeterminate = false;
              } else {
                toggleAll.checked = false;
                toggleAll.indeterminate = true;
              }
            });
          });
        }
      },
      preConfirm: () => {
        const checkboxes = document.querySelectorAll('.swal-app-checkbox:checked') as NodeListOf<HTMLInputElement>;
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);
        const fileInput = document.getElementById('swal-replacement-file') as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (openApps.length > 0 && selectedIds.length === 0) {
          Swal.showValidationMessage('Please select at least one applied job position to update!');
          return false;
        }
        if (!file) {
          Swal.showValidationMessage('Please select a replacement PDF file to upload!');
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          Swal.showValidationMessage('File size must be less than 5MB!');
          return false;
        }

        return { selectedIds, file };
      }
    });

    if (!formValues) return;

    const { selectedIds, file } = formValues;

    Swal.fire({
      title: `Uploading new ${docType}...`,
      text: `Updating ${selectedIds.length} selected job application(s)...`,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', docType);
      formData.append('applicationIds', JSON.stringify(selectedIds));

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/replace-document`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const [appsRes, profileRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`).then(r => r.json()),
          fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`).then(r => r.json())
        ]);

        if (appsRes.success && appsRes.data) {
          setApplications(appsRes.data.map((app: any) => ({
            id: app.id,
            position: app.job_title || 'Unknown Position',
            division: app.division || app.office || 'Department of Education',
            date: app.date_applied || app.created_at,
            applicationStatus: app.status || 'Pending',
            assessmentStatus: app.assessment_status || 'Pending Assessment',
            status: app.status === 'Hired' || app.status === 'Rejected' ? 'Past' : 'Active',
            letterOfIntent: app.letter_of_intent || null,
            swornDocument: app.sworn_document || null,
            rawStatus: app.status
          })));
        }

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }

        Swal.fire({
          icon: 'success',
          title: 'Document Updated Successfully!',
          text: `Your ${docType} was updated across ${data.affectedApplications} applied job position(s).`,
          timer: 3500
        });
      } else {
        Swal.fire('Error', data.message || 'Failed to replace document.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while uploading the document.', 'error');
    }
  };

  const activeApps = applications.filter(app => app.status === 'Active');
  const historyApps = applications;
  const savedPositionsCount = savedJobs.length;

  const getFilteredData = () => {
    if (activeFilter === 'active') return activeApps;
    if (activeFilter === 'history') return historyApps;
    if (activeFilter === 'saved') return savedJobs;
    return [];
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  let photoUrl = null;
  if (profile?.other_information) {
    const otherInfo = typeof profile.other_information === 'string' ? JSON.parse(profile.other_information) : profile.other_information;
    photoUrl = otherInfo.photoUrl;
  }

  const { percentage: rawProgressPercentage } = calculateProfileProgress({
    ...parseProfileToState(profile),
    isSubsequentApplication: applications.length > 0,
    context: 'my-profile'
  });
  const progressPercentage = parseFloat(rawProgressPercentage) >= 90 ? 100 : parseFloat(rawProgressPercentage);

  const sessionData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('session_data') || '{}') : {};
  const isReclass = profile?.registrant_type === 'reclass' || sessionData?.registrant_type === 'reclass';

  return (
    <div
      className="min-h-screen font-sans flex flex-col relative"
      style={{
        background: `
        radial-gradient(circle at 78% 14%, rgba(253,186,34,.30), transparent 32%),
        radial-gradient(circle at 70% 86%, rgba(10,111,166,.18), transparent 34%),
        linear-gradient(135deg, #EAF7FC 0%, #F8FCFF 52%, #FFF2C6 100%)
        `
      }}
    >
      <ApplicantHeader
        firstName={profile?.first_name || ''}
        lastName={profile?.surname || ''}
        photoUrl={photoUrl ? `${import.meta.env.VITE_API_URL}/api/applicants/proxy-blob?url=${encodeURIComponent(photoUrl)}` : null}
        isReclass={isReclass}
      />

      <main className={`mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 w-full ${isReclass ? 'max-w-[1440px]' : 'max-w-6xl'}`}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2 mt-4">
          <div>
            <h1 className="text-[32px] font-extrabold text-[#022851] tracking-tight">Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! 👋</h1>
            <p className="text-gray-500 font-medium text-[15px] mt-1">
              {isReclass
                ? 'Here is the status of your reclassification to School Counselor.'
                : "Here's a quick overview of your application activity."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isReclass && (
              <button
                onClick={handleSetPasscode}
                className="bg-white border-2 border-[#022851]/20 hover:border-[#022851] text-[#022851] px-5 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-[14px] flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Set Passcode
              </button>
            )}
            {!isReclass && (
              <button
                onClick={() => navigate('/applicant-jobs')}
                className="bg-[#022851] hover:bg-[#033a76] text-white px-6 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px] flex items-center justify-center gap-2.5 group"
              >
                <Briefcase className="w-4 h-4" /> Go to Job Board <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            {isReclass && (
              <div className="flex flex-col items-start sm:items-end gap-1">
                <button
                  onClick={() => setIsReclassUploadModalOpen(true)}
                  className={`px-5 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px] flex items-center justify-center gap-2.5 group cursor-pointer ${revisionDocsCount > 0
                      ? 'bg-[#022851] hover:bg-[#033a76] text-white ring-2 ring-rose-500 shadow-rose-200'
                      : 'bg-[#022851] hover:bg-[#033a76] text-white'
                    }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Requirements</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-sky-400/20 text-sky-200 border border-sky-300/30">
                    For Updating
                  </span>
                  {revisionDocsCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white shadow-xs animate-pulse tracking-wide">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{revisionDocsCount} For Revision</span>
                    </span>
                  )}
                </button>
                {revisionDocsCount > 0 && (
                  <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pr-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping shrink-0"></span>
                    Documents need to be re-uploaded
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion Card */}
        {!isReclass && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white border-[1.5px] border-[#22c55e]/30 shadow-[0_8px_25px_rgba(34,197,94,0.15)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl hover:shadow-[0_12px_35px_rgba(34,197,94,0.25)] hover:border-[#22c55e]/50 transition-all focus:outline-none"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center shrink-0 border-[4px] border-white shadow-[0_0_20px_rgba(34,197,94,0.15)] relative">
                <Users className="w-8 h-8 text-[#22c55e]" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-white" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <h2 className="text-[18px] font-bold text-[#022851] mb-1.5">Profile Completion</h2>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-xs">
                  Complete your profile to unlock all features and improve your chances.
                </p>
              </div>
            </div>
            <div className="w-full md:w-[450px] shrink-0 mt-4 md:mt-0 flex items-center gap-6">
              <span className="text-[36px] font-extrabold text-[#22c55e] tracking-tight">{progressPercentage}%</span>
              <div className="flex-1">
                <div className="w-full bg-[#f0fdf4] h-3.5 rounded-full overflow-hidden">
                  <div className="bg-[#22c55e] h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="text-[11px] font-bold text-gray-400">0%</span>
                  <span className="text-[11px] font-bold text-gray-400">50%</span>
                  <span className="text-[11px] font-bold text-gray-400">100%</span>
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Reclassification Status Card — only shown to reclass registrants */}
        {isReclass && (
          <div className="bg-white border-2 border-[#0369a1]/20 rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-[#022851] to-[#0369a1] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Award className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">Reclassification Status</h2>
                  <p className="text-xs text-sky-100">DepEd Incumbent → School Counselor</p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-100">
                Incumbent Portal
              </span>
            </div>

            {reclassData ? (() => {
              const rawInitial =
                reclassData.initial_assessment_position ||
                reclassData.initial_assessment ||
                reclassData.reclass_position ||
                '';
              const initialAssessment =
                rawInitial && rawInitial.toUpperCase() !== 'N/A' && rawInitial.trim() !== ''
                  ? rawInitial.trim()
                  : '';
              const isUserSCIV = isAssessedSCIV(initialAssessment || reclassData.reclass_position);
              const isInitialAssessmentNull =
                (!reclassData.initial_assessment ||
                  String(reclassData.initial_assessment).trim() === '' ||
                  String(reclassData.initial_assessment).toUpperCase() === 'N/A') &&
                reclassData.new_application !== true;

              const initialSalaryGrade =
                initialAssessment
                  ? (reclassData.initial_assessment_salary_grade && reclassData.initial_assessment_salary_grade !== 'N/A'
                    ? (reclassData.initial_assessment_salary_grade.startsWith('SG-')
                      ? reclassData.initial_assessment_salary_grade
                      : `SG-${reclassData.initial_assessment_salary_grade}`)
                    : getPositionSalaryGrade(initialAssessment))
                  : '';

              const uploadedDocsCount = reclassDocs.length;
              const TOTAL_MANDATORY_DOCS = 7;
              const submissionDeadline = reclassData.submission_deadline || 'October 31, 2026';

              // Normalize database fields from reclass_gc
              const docStatus = String(
                reclassData.documents_status ||
                reclassData.document_status ||
                ''
              ).trim().toUpperCase();

              const stageOfReclass = String(
                reclassData.staging_of_reclassification ||
                reclassData.stage_of_reclassification ||
                ''
              ).trim().toUpperCase();

              const qsStatus = String(reclassData.qs_status || '').trim();
              const isQsExcluded =
                qsStatus.toUpperCase().includes('EXCLUDED') ||
                qsStatus.toUpperCase().includes('DISQUALIFIED') ||
                qsStatus.toUpperCase().includes('NOT QUALIFIED');
              const isQsQualified =
                qsStatus.toUpperCase().includes('QUALIFIED') && !isQsExcluded;

              const newItemNo = reclassData.new_item_no
                ? String(reclassData.new_item_no).trim()
                : '';
              const hasNewItemNo = Boolean(
                newItemNo &&
                newItemNo.toUpperCase() !== 'NULL' &&
                newItemNo !== ''
              );

              // Revision Upload Documents: reclass_gc.documents_checklist
              const rawChecklist = reclassData.documents_checklist || reclassData.document_checklist;
              const revisionDocuments = parseRevisionDocuments(rawChecklist);
              const hasRevisionDocuments = revisionDocuments.length > 0;
              const isRevision =
                hasRevisionDocuments ||
                docStatus === 'FOR REVISION' ||
                docStatus === 'FOR_REVISION' ||
                docStatus.includes('REVISION') ||
                checklistDocuments.some(
                  (d) => d.rawStatus === 'for_revision' || d.rawStatus.includes('revision')
                );

              const isAllDocReviewed = docStatus === 'ALL DOCUMENT REVIEWED';
              const hasAnyDocSubmitted = checklistDocuments.some(
                (d) => d.rawStatus === 'submitted' || d.rawStatus.includes('submit')
              );
              const hasSubmittedStatus =
                docStatus === 'DOCUMENTS SUBMITTED' ||
                docStatus === 'SUBMITTED' ||
                docStatus.includes('SUBMIT') ||
                hasAnyDocSubmitted;

              const isDocsSubmitted =
                hasSubmittedStatus ||
                isAllDocReviewed;

              const hasSubmittedAllDocs =
                uploadedDocsCount >= TOTAL_MANDATORY_DOCS ||
                hasSubmittedStatus ||
                isDocsSubmitted;

              // 5 Explicit Stages:
              // Stage 5: Appointment / Reclass Proper = reclass_gc.new_item_no is not null
              const isReclassProper =
                hasNewItemNo ||
                stageOfReclass === 'APPOINTMENT' ||
                stageOfReclass === 'RECLASS PROPER' ||
                stageOfReclass.includes('RECLASSIFIED') ||
                Boolean(reclassData.nosca_serial_no && hasNewItemNo);

              // Stage 4: Endorsed to DBM RO = reclass_gc.staging_of_reclassification = 'ENDORSED TO DBM RO'
              const isEndorsedToDbm =
                !isReclassProper &&
                (stageOfReclass === 'ENDORSED TO DBM RO' ||
                  stageOfReclass.includes('DBM'));

              // Stage 3: Endorsed to RO (Final Eval) = reclass_gc.staging_of_reclassification = 'ENDORSED TO RO'
              const isEndorsedToRo =
                !isReclassProper &&
                !isEndorsedToDbm &&
                (stageOfReclass === 'ENDORSED TO RO' ||
                  stageOfReclass.includes('RO') ||
                  stageOfReclass.includes('REGIONAL'));

              // Stage 2: HRMO Review & Evaluation = reclass_gc.documents_status = "DOCUMENTS SUBMITTED"
              // (or if documents_status = "ALL DOCUMENT REVIEWED", display reclass_gc.qs_status)
              const isHrmoReview =
                !isInitialAssessmentNull &&
                !isReclassProper &&
                !isEndorsedToDbm &&
                !isEndorsedToRo &&
                (isRevision ||
                  hasSubmittedStatus ||
                  isDocsSubmitted ||
                  stageOfReclass === 'FOR REVIEW' ||
                  hasSubmittedAllDocs);

              const isEndorsedToRegional = isEndorsedToRo || isEndorsedToDbm || isReclassProper;

              // Step Calculation & Display Mapping
              let currentStep = 1;
              let currentLabel = 'Updating of Documents';
              let stepBadge = 'Step 1 of 5: Updating of Documents';
              let defaultRemarks =
                'Submit updated qualification documents if seeking re-assessment. Non-submission means your reclassification proceeds under your current plantilla record.';

              if (isReclassProper) {
                currentStep = 5;
                currentLabel = 'Appointment / Reclass Proper';
                stepBadge = 'Step 5 of 5: Appointment / Reclass Proper';
                defaultRemarks = hasNewItemNo
                  ? `Your plantilla position has been officially reclassified and appointed under Item No. ${newItemNo}.`
                  : 'Your plantilla position has been officially reclassified and appointed with NOSCA allocation and salary adjustment.';
              } else if (isEndorsedToDbm) {
                currentStep = 4;
                currentLabel = 'Endorsed to DBM RO';
                stepBadge = 'Step 4 of 5: Endorsed to DBM RO';
                defaultRemarks =
                  'Your reclassification application has been endorsed to the Department of Budget and Management (DBM) Regional Office for NOSCA issuance.';
              } else if (isEndorsedToRo) {
                currentStep = 3;
                currentLabel = 'RO Evaluation';
                stepBadge = 'Step 3 of 5: RO Evaluation';
                defaultRemarks =
                  'Your reclassification documents have been verified and endorsed to the DepEd Regional Office for final evaluation and regional consolidation.';
              } else if (isHrmoReview) {
                currentStep = 2;
                if (isRevision) {
                  currentLabel = 'HRMO Review & Evaluation';
                  stepBadge = 'Step 2 of 5: Revision Required';
                  defaultRemarks = revisionDocuments.length > 0
                    ? `The Division HRMO has requested revisions on ${revisionDocuments.length} requirement(s). Please review the evaluator remarks below and re-upload the updated documents.`
                    : 'The Division HRMO has requested document revisions. Please review the evaluator remarks and re-upload the updated documents.';
                } else if (isAllDocReviewed) {
                  currentLabel = qsStatus ? `${qsStatus}` : 'ALL DOCUMENT REVIEWED';
                  stepBadge = isQsExcluded
                    ? `Step 2 of 5: ${qsStatus || 'EXCLUDED'}`
                    : `Step 2 of 5: ${qsStatus || 'ALL DOCUMENT REVIEWED'}`;
                  defaultRemarks = isQsExcluded
                    ? 'All qualification documents have been evaluated by Division HRMO. Based on the Qualification Standards (QS) evaluation, the evaluation status is EXCLUDED.'
                    : isQsQualified
                      ? 'All qualification documents have been evaluated by Division HRMO. You are evaluated as QUALIFIED for reclassification.'
                      : 'All qualification documents have been evaluated by Division HRMO. Qualification Standards (QS) evaluation has been concluded.';
                } else {
                  currentLabel = 'HRMO Review & Evaluation';
                  stepBadge = hasSubmittedStatus
                    ? 'Step 2 of 5: Resubmit'
                    : 'Step 2 of 5: HRMO Review & Evaluation';
                  defaultRemarks =
                    'All mandatory qualification documents have been submitted. Your reclassification credentials and documents are currently being reviewed by your Division HRMO.';
                }
              } else {
                currentStep = 1;
                currentLabel = 'Updating of Documents';
                stepBadge = 'Step 1 of 5: Updating of Documents';
                defaultRemarks = uploadedDocsCount === 0
                  ? 'No updated documents have been submitted yet. Non-submission of updated documents means your reclassification proceeds under your current plantilla record.'
                  : `${uploadedDocsCount} of 8 requirements uploaded (${Math.min(uploadedDocsCount, 7)}/7 mandatory). Your reclassification will proceed under your current plantilla record if no additional documents are submitted.`;
              }

              return (
                <div className="p-6 space-y-6">
                  {/* 1. Location Details Card */}
                  <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-slate-200">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-[#022851] tracking-wider uppercase">
                          Location Details
                        </h3>
                        <p className="text-[11px] text-gray-500">Official DepEd station and assignment</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {/* Region */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Region</p>
                        <p className="text-[15px] font-extrabold text-[#022851] mt-0.5">
                          {reclassData.region || '—'}
                        </p>
                      </div>

                      {/* Division */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Division</p>
                        <p className="text-[15px] font-extrabold text-[#022851] mt-0.5">
                          {reclassData.division || '—'}
                        </p>
                      </div>

                      {/* School Station */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">School Station</p>
                        <p className="text-[15px] font-extrabold text-[#022851] mt-0.5 break-words">
                          {reclassData.school_name || reclassData.application_number || reclassData.school_station || '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Reclassification Info Card */}
                  <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-slate-200">
                      <div className="w-7 h-7 rounded-lg bg-[#0284c7]/10 flex items-center justify-center text-[#0284c7]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-[#022851] tracking-wider uppercase">
                          Reclassification Info
                        </h3>
                        <p className="text-[11px] text-gray-500">Current plantilla record, initial assessment, desired position, and QS-based assessed position</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {/* Plantilla Item No. */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Plantilla Item No.</p>
                        <p className="text-[15px] font-black text-[#022851] mt-0.5 tracking-tight font-mono">
                          {reclassData.plantilla_item_number || reclassData.item_no || profile?.plantilla_item_number || '—'}
                        </p>
                      </div>

                      {/* Current Position Title */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Position Title</p>
                        <p className="text-[14px] font-bold text-[#022851] mt-0.5 break-words">
                          {reclassData.position_title || reclassData.current_position || '—'}
                        </p>
                      </div>

                      {/* Salary Grade (Matches Desired / Assessed Position) */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Salary Grade</p>
                        <p className="text-[15px] font-extrabold text-[#022851] mt-0.5">
                          {getPositionSalaryGrade(
                            isEditingTargetPosition
                              ? editTargetPositionValue
                              : (reclassData.target_position || reclassData.reclass_position || reclassData.indicative_position || initialAssessment || 'SCHOOL COUNSELOR ASSOCIATE I')
                          )}
                        </p>
                      </div>

                      {/* Initial Assessment */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs relative flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Initial Assessment</p>
                          </div>
                          <p className="text-[14px] font-bold text-[#022851] mt-0.5 break-words min-h-[22px]">
                            {initialAssessment || '—'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 min-h-[18px]">
                          {initialSalaryGrade ? (
                            <>
                              <span className="text-[11px] font-bold text-[#0284c7]">{initialSalaryGrade}</span>
                              <span className="text-[10px] text-gray-500">• Previous evaluation</span>
                            </>
                          ) : null}
                        </div>
                      </div>

                      {/* Desired Position (Editable with Dropdown and Register Track) */}
                      <div className={`border rounded-xl p-3.5 shadow-xs transition-all flex flex-col justify-between ${isEditingTargetPosition ? 'bg-sky-50/70 border-[#0284c7] ring-2 ring-[#0284c7]/20' : 'bg-white border-slate-200/90'}`}>
                        <div>
                          <div className="flex items-start justify-between gap-1.5 mb-1.5">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                              Desired Position
                            </p>
                            {!isEditingTargetPosition && !isInitialAssessmentNull && (
                              <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUpdateModalInitialStep(2);
                                    setIsUpdateModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-[#0284c7] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                                  title="View Qualification Standards (QS) for this role"
                                >
                                  <GraduationCap className="w-3 h-3" />
                                  <span>View QS</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowInitialPrompt(true);
                                    setInitialPromptType('update');
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-md transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                                  title="Edit reclassification application update preference (Yes or No)"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  <span>Change</span>
                                </button>
                              </div>
                            )}
                          </div>

                          {isEditingTargetPosition ? (
                            <div className="mt-2 space-y-2.5">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                                  Track (Register or Not):
                                </label>
                                <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditTargetPositionValue(NOT_REGISTERED_TARGET_OPTIONS[0].value);
                                    }}
                                    className={`py-1 px-2 text-[11px] font-bold rounded-md transition-all ${
                                      !isRegisteredPosition(editTargetPositionValue)
                                        ? 'bg-white text-[#022851] shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                  >
                                    Not Registered
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditTargetPositionValue(REGISTERED_TARGET_OPTIONS[0].value);
                                    }}
                                    className={`py-1 px-2 text-[11px] font-bold rounded-md transition-all ${
                                      isRegisteredPosition(editTargetPositionValue)
                                        ? 'bg-white text-[#022851] shadow-xs'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                  >
                                    Registered (RA 1080)
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                                  Select desired position:
                                </label>
                                <select
                                  value={editTargetPositionValue}
                                  onChange={(e) => setEditTargetPositionValue(e.target.value)}
                                  className="w-full text-xs font-bold text-[#022851] bg-white border-2 border-[#0284c7] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 shadow-xs cursor-pointer"
                                >
                                  {(isRegisteredPosition(editTargetPositionValue) ? REGISTERED_TARGET_OPTIONS : NOT_REGISTERED_TARGET_OPTIONS).map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label} ({opt.sg})
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={handleSaveTargetPosition}
                                  disabled={isSavingTargetPosition}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
                                >
                                  {isSavingTargetPosition ? (
                                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                  <span>Save</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsEditingTargetPosition(false)}
                                  disabled={isSavingTargetPosition}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-[14px] font-extrabold text-[#0284c7] mt-0.5 break-words min-h-[22px]">
                              {(() => {
                                const current = (reclassData?.target_position || reclassData?.reclass_position || '').toUpperCase().trim();
                                const matched = TARGET_POSITION_OPTIONS.find(
                                  (opt) => opt.value === current || opt.label.toUpperCase() === current
                                );
                                return matched ? matched.label : (reclassData?.target_position || reclassData?.reclass_position || '—');
                              })()}
                            </p>
                          )}
                        </div>

                        {!isEditingTargetPosition && (
                          <div className="flex items-center gap-1.5 mt-2 min-h-[18px] flex-wrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              (reclassData?.is_registered === true || isRegisteredPosition(reclassData?.target_position || reclassData?.reclass_position))
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-sky-100 text-sky-800 border border-sky-200'
                            }`}>
                              {(reclassData?.is_registered === true || isRegisteredPosition(reclassData?.target_position || reclassData?.reclass_position))
                                ? 'Registered'
                                : 'Not Registered'}
                            </span>
                            {reclassData?.update_application !== undefined && reclassData?.update_application !== null && (
                              <button
                                type="button"
                                onClick={() => {
                                  setShowInitialPrompt(true);
                                  setInitialPromptType('update');
                                }}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                  reclassData?.update_application === true
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200'
                                    : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                                }`}
                                title="Click to edit reclassification application preference (Yes or No)"
                              >
                                <span>Update App: {reclassData?.update_application === true ? 'Yes' : 'No'}</span>
                                <Edit2 className="w-2.5 h-2.5 opacity-70" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* QS-Based Assessed Position */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">QS-Based Assessed Position</p>
                          </div>
                          <p className="text-[14px] font-bold text-[#022851] mt-0.5 break-words min-h-[22px]">
                            {reclassData.reclass_position || '—'}
                          </p>
                        </div>
                        <div className="mt-1 min-h-[18px]" />
                      </div>
                    </div>
                  </div>

                  {/* 3. The Stages (Process Stepper) */}
                  {!isInitialAssessmentNull && (
                    <div className="bg-gradient-to-b from-sky-50/70 to-blue-50/40 border border-sky-200/90 rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0369a1]">Current Stage</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isAllDocReviewed && isQsExcluded
                              ? 'bg-rose-700 text-white shadow-2xs'
                              : 'bg-[#022851] text-[#facc15]'
                            }`}>
                            {stepBadge}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5 mt-1.5">
                          <p
                            onClick={() => {
                              if (isRevision || hasSubmittedStatus || hasSubmittedAllDocs) {
                                setIsReclassUploadModalOpen(true);
                              }
                            }}
                            className={`text-lg md:text-xl font-black tracking-tight ${isAllDocReviewed && isQsExcluded
                                ? 'text-rose-700'
                                : 'text-[#022851]'
                              } ${isRevision || hasSubmittedStatus || hasSubmittedAllDocs ? 'cursor-pointer hover:text-sky-700 transition-colors' : ''
                              }`}
                            title={isRevision ? 'Click to open Reclassification Document Submission' : (hasSubmittedStatus || hasSubmittedAllDocs) ? 'Click to view submitted documents' : undefined}
                          >
                            {currentLabel}
                          </p>

                          {/* When Submitted / Resubmit and in HRMO Review stage (and not all reviewed / not revision): show Resubmit badge */}
                          {hasSubmittedStatus && !isRevision && !isAllDocReviewed && currentStep <= 2 && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50/90 text-amber-900 border border-amber-300/80 shadow-2xs">
                              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                              <span>Resubmit</span>
                            </span>
                          )}

                          {/* When ALL DOCUMENT REVIEWED: display both ALL DOCUMENT REVIEWED and qs_status (red if excluded) */}
                          {isAllDocReviewed && currentStep <= 2 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>ALL DOCUMENT REVIEWED</span>
                              </span>

                              {qsStatus && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${isQsExcluded
                                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                                    : isQsQualified
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                      : 'bg-amber-100 text-amber-800 border-amber-300'
                                  }`}>
                                  {isQsExcluded ? (
                                    <AlertCircle className="w-3.5 h-3.5 text-white" />
                                  ) : isQsQualified ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                  )}
                                  <span>{qsStatus}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {reclassData.remarks || defaultRemarks}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-xl bg-white/80 border border-sky-200 shadow-sm shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full ${isAllDocReviewed && isQsExcluded
                            ? 'bg-rose-500'
                            : isEndorsedToRegional || isAllDocReviewed
                              ? 'bg-emerald-500'
                              : 'bg-[#0284c7]'
                          } animate-ping`}></div>
                        <span className={`text-xs font-extrabold ${isAllDocReviewed && isQsExcluded
                            ? 'text-rose-700'
                            : 'text-[#022851]'
                          }`}>{currentLabel}</span>
                      </div>
                    </div>

                    {/* Notice Banner */}
                    <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl px-4 py-3 text-amber-950 shadow-xs flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-900 font-medium leading-relaxed">
                        <strong>Important Notice:</strong> Non-submission of updated documents means <strong>no re-assessment will be initiated</strong>.
                        {initialAssessment ? (
                          <> Your reclassification will remain based on your <strong>Initial Assessment: {initialAssessment} {initialSalaryGrade ? `(${initialSalaryGrade})` : ''}</strong>.</>
                        ) : (
                          <> Your reclassification will proceed under your current plantilla record.</>
                        )}
                      </p>
                    </div>

                    {/* Process Steps Stepper (5 Steps: Updating of Docs -> SDO HRMO Review -> DepEd RO Final Eval -> DBM RO Endorsement -> Appointment) */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isInitialAssessmentNull ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} gap-4 relative`}>
                      {/* Step 1: Updating of Documents */}
                      <div
                        className={`relative rounded-xl p-4.5 transition-all border flex flex-col justify-between ${currentStep === 1
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div
                              className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs ${hasSubmittedAllDocs
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-[#022851] text-[#facc15] shadow-sm'
                                }`}
                            >
                              {hasSubmittedAllDocs ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <FileCheck2 className="w-4 h-4" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${hasSubmittedAllDocs
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-sky-100 text-[#0284c7] animate-pulse'
                                }`}
                            >
                              {hasSubmittedAllDocs ? 'Completed' : 'Active Stage'}
                            </span>
                          </div>

                          <p className={`text-[11px] font-bold uppercase tracking-wider ${currentStep === 1 ? 'text-[#0284c7]' : hasSubmittedAllDocs ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 1 • Applicant
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <h4 className={`text-[14px] font-extrabold tracking-tight ${currentStep === 1 ? 'text-[#022851]' : 'text-gray-800'}`}>
                              Updating of Documents
                            </h4>
                            <span className="inline-flex items-center px-2 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-sky-100 text-[#0284c7] border border-sky-200">
                              For Updating
                            </span>
                          </div>

                          {/* Submission Deadline */}
                          <div className="flex items-center justify-between gap-1 px-2 py-1.5 rounded-lg bg-amber-50/90 border border-amber-300/80 text-amber-950 text-[10px] mt-2 mb-1 w-full shadow-2xs">
                            <span className="flex items-center gap-1 font-bold text-amber-900">
                              <Calendar className="w-3 h-3 text-amber-600 shrink-0" />
                              Deadline:
                            </span>
                            <span className="font-extrabold text-amber-900 font-mono text-[10px]">{submissionDeadline}</span>
                          </div>

                          {/* Initial Assessment highlight box */}
                          <div className="my-2 p-2 rounded-lg bg-sky-50/80 border border-sky-200/90 text-left">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[9px] font-extrabold uppercase text-[#0369a1] tracking-wider">
                                Initial Assessment
                              </span>
                              {initialAssessment ? (
                                <span className="text-[8px] font-bold text-sky-800 bg-sky-100 px-1 py-0.2 rounded">
                                  Previous Eval
                                </span>
                              ) : null}
                            </div>
                            <p className="text-[11px] font-black text-[#022851] mt-0.5 min-h-[16px] truncate" title={initialAssessment}>
                              {initialAssessment ? `${initialAssessment} ${initialSalaryGrade ? `(${initialSalaryGrade})` : ''}` : ''}
                            </p>
                          </div>

                          {/* Submission Progress Bar */}
                          <div className="space-y-1 my-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-gray-500">Progress</span>
                              <span className={`font-extrabold ${hasSubmittedAllDocs ? 'text-emerald-700' : 'text-[#022851]'}`}>
                                {uploadedDocsCount}/8 ({Math.min(uploadedDocsCount, 7)}/7 Req)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${hasSubmittedAllDocs ? 'bg-emerald-500' : 'bg-[#0284c7]'
                                  }`}
                                style={{
                                  width: `${Math.min(100, Math.round((Math.min(uploadedDocsCount, 7) / 7) * 100))}%`,
                                }}
                              />
                            </div>
                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() => setIsReclassUploadModalOpen(true)}
                          className="mt-2 w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-xs transition-all cursor-pointer bg-[#022851] hover:bg-[#033b77]"
                        >
                          <Upload className="w-3 h-3" />
                          <span>
                            {hasSubmittedAllDocs
                              ? 'Manage Updated Docs'
                              : `Upload for Updating (${uploadedDocsCount}/8)`}
                          </span>
                        </button>
                      </div>

                      {/* Step 2: SDO Division HRMO */}
                      <div
                          onClick={() => {
                            if (isRevision || hasSubmittedAllDocs) {
                              setIsReclassUploadModalOpen(true);
                            }
                          }}
                          className={`relative rounded-xl p-4.5 transition-all border flex flex-col justify-between ${currentStep === 2
                              ? isAllDocReviewed && isQsExcluded
                                ? 'bg-white border-rose-400 shadow-md ring-2 ring-rose-200'
                                : 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                              : currentStep > 2
                                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                                : 'bg-slate-50/70 border-slate-200 text-slate-400'
                            } ${isRevision
                              ? 'cursor-pointer hover:border-rose-400 hover:ring-2 hover:ring-rose-200 shadow-sm'
                              : hasSubmittedAllDocs
                                ? 'cursor-pointer hover:border-sky-300 shadow-xs'
                                : ''
                            }`}
                          title={
                            isRevision
                              ? 'Click to open Reclassification Document Submission'
                              : hasSubmittedAllDocs
                                ? 'Click to view submitted documents'
                                : undefined
                          }
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div
                                className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs ${currentStep > 2
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : currentStep === 2
                                      ? isAllDocReviewed && isQsExcluded
                                        ? 'bg-rose-600 text-white shadow-sm'
                                        : 'bg-[#022851] text-[#facc15] shadow-sm'
                                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                                  }`}
                              >
                                {currentStep > 2 ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : currentStep === 2 ? (
                                  isAllDocReviewed && isQsExcluded ? (
                                    <AlertCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <Building2 className="w-4 h-4" />
                                  )
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${currentStep > 2
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : currentStep === 2
                                      ? isAllDocReviewed
                                        ? isQsExcluded
                                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                          : 'bg-emerald-100 text-emerald-800'
                                        : (isDocsSubmitted || hasSubmittedStatus)
                                          ? 'bg-amber-100/90 text-amber-900 border border-amber-300/80'
                                          : 'bg-sky-100 text-[#0284c7] animate-pulse'
                                      : 'bg-slate-100 text-slate-400'
                                  }`}
                              >
                                {currentStep > 2
                                  ? 'Completed'
                                  : currentStep === 2
                                    ? isAllDocReviewed
                                      ? isQsExcluded
                                        ? 'Excluded'
                                        : 'Reviewed'
                                      : (isDocsSubmitted || hasSubmittedStatus)
                                        ? 'Resubmit'
                                        : 'Active Stage'
                                    : 'Locked'}
                              </span>
                            </div>

                            <p className={`text-[11px] font-bold uppercase tracking-wider ${currentStep === 2
                                ? isAllDocReviewed && isQsExcluded
                                  ? 'text-rose-700'
                                  : 'text-[#022851]'
                                : currentStep > 2
                                  ? 'text-emerald-800'
                                  : 'text-gray-400'
                              }`}>
                              Step 2 • SDO Division HRMO
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                              <h4
                                onClick={(e) => {
                                  if (isRevision || hasSubmittedAllDocs || hasSubmittedStatus) {
                                    e.stopPropagation();
                                    setIsReclassUploadModalOpen(true);
                                  }
                                }}
                                className={`text-[14px] font-extrabold tracking-tight ${currentStep === 2 ? 'text-[#022851]' : currentStep > 2 ? 'text-gray-800' : 'text-gray-500'
                                  } ${isRevision
                                    ? 'cursor-pointer hover:text-rose-700 transition-colors underline decoration-rose-300 underline-offset-2'
                                    : (hasSubmittedAllDocs || hasSubmittedStatus)
                                      ? 'cursor-pointer hover:text-sky-700 transition-colors'
                                      : ''
                                  }`}
                              >
                                HRMO Review & Evaluation
                              </h4>
                              {hasSubmittedStatus && !isRevision && !isAllDocReviewed && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50/90 text-amber-900 border border-amber-300/80 shadow-2xs">
                                  <FileCheck className="w-3 h-3 text-amber-600" /> Resubmit
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                              {hasSubmittedAllDocs
                                ? 'SDO Division HRMO qualification verification & re-assessment.'
                                : 'SDO Division HRMO qualification verification and evaluation of submitted credentials.'}
                            </p>
                          </div>

                          {/* Status / QS Evaluation Display */}
                          {isRevision ? (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsReclassUploadModalOpen(true);
                              }}
                              className="mt-3 p-2.5 rounded-xl bg-rose-50/90 border border-rose-300 text-rose-950 shadow-2xs cursor-pointer hover:bg-rose-100/90 transition-colors group"
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-800">
                                  Document Review
                                </span>
                                <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white">
                                  Needs Revision
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] font-black text-rose-900">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>{revisionDocuments.length > 0 ? `${revisionDocuments.length} Document(s) Returned` : 'Documents For Revision'}</span>
                              </div>
                              <p className="text-[10px] text-rose-800/90 mt-1 leading-tight">
                                Please re-upload revised copies.
                              </p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsReclassUploadModalOpen(true);
                                }}
                                className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-all cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Submit Revisions</span>
                              </button>
                            </div>
                          ) : isAllDocReviewed ? (
                            <div className="mt-3 space-y-2">
                              {/* 1. Document Review Status Card (Verified) */}
                              <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-200/90 shadow-2xs">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-800">
                                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>Document Review</span>
                                  </div>
                                  <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white shrink-0 shadow-2xs">
                                    Verified
                                  </span>
                                </div>
                                <p className="text-[11px] font-black text-emerald-950 tracking-tight leading-snug">
                                  ALL DOCUMENT REVIEWED
                                </p>
                              </div>

                              {/* 2. QS Evaluation Status Card (Qualified / Excluded) */}
                              <div className={`p-2.5 rounded-xl border shadow-2xs ${isQsExcluded
                                  ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                                  : 'bg-white/95 border-emerald-200/90 text-emerald-950'
                                }`}>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <div className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider ${isQsExcluded ? 'text-rose-800' : 'text-emerald-800'
                                    }`}>
                                    {isQsExcluded ? (
                                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                    ) : (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    )}
                                    <span>HRMO QS Evaluation</span>
                                  </div>
                                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded shrink-0 shadow-2xs ${isQsExcluded ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                                    }`}>
                                    {isQsExcluded ? 'Excluded' : 'Qualified'}
                                  </span>
                                </div>
                                <p className={`text-[11px] font-black tracking-tight leading-snug uppercase ${isQsExcluded ? 'text-rose-700' : 'text-[#022851]'
                                  }`}>
                                  {qsStatus || (isQsExcluded ? 'EXCLUDED' : 'QUALIFIED FOR RECLASSIFICATION')}
                                </p>
                                <p className={`text-[9.5px] mt-1 leading-snug ${isQsExcluded ? 'text-rose-800/90 font-medium' : 'text-gray-500'
                                  }`}>
                                  {isQsExcluded
                                    ? 'Evaluation Result: Excluded from reclassification based on Division HRMO Qualification Standards (QS).'
                                    : 'Qualification Standards verified and evaluated by Division HRMO.'}
                                </p>
                              </div>
                            </div>
                          ) : (isDocsSubmitted || hasSubmittedStatus) ? (
                            <div className="mt-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-300/80 text-amber-950 shadow-2xs">
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                                  <FileCheck className="w-3 h-3 text-amber-600" /> Document Review
                                </span>
                                <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-2xs">
                                  Resubmit
                                </span>
                              </div>
                              <p className="text-[10.5px] font-semibold text-amber-950/90 leading-tight">
                                Verification in progress.
                              </p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsReclassUploadModalOpen(true);
                                }}
                                className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-950 bg-white hover:bg-amber-100/60 border border-amber-300/80 shadow-2xs transition-all cursor-pointer"
                              >
                                <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                                <span>View Documents</span>
                              </button>
                            </div>
                          ) : (
                            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-100/80 px-2 py-1.5 rounded-lg border border-slate-200">
                              <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                              <span>Awaiting submission of requirements</span>
                            </div>
                          )}
                        </div>

                      {/* Step 3: DepEd Regional Office (RO) */}
                      <div
                        className={`relative rounded-xl p-4.5 transition-all border flex flex-col justify-between ${currentStep === 3
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : currentStep > 3
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : 'bg-slate-50/70 border-slate-200 text-slate-400'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div
                              className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs ${currentStep > 3
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : currentStep === 3
                                    ? 'bg-[#022851] text-[#facc15] shadow-sm'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                            >
                              {currentStep > 3 ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : currentStep === 3 ? (
                                <Send className="w-4 h-4 text-[#facc15]" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${currentStep > 3
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : currentStep === 3
                                    ? 'bg-sky-100 text-[#0284c7] animate-pulse'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                              {currentStep > 3 ? 'Completed' : currentStep === 3 ? 'Active Stage' : 'Upcoming'}
                            </span>
                          </div>

                          <p className={`text-[11px] font-bold uppercase tracking-wider ${currentStep === 3 ? 'text-[#0284c7]' : currentStep > 3 ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 3 • Regional Office
                          </p>
                          <h4 className={`text-[14px] font-extrabold tracking-tight mt-0.5 ${currentStep === 3 ? 'text-[#022851]' : currentStep > 3 ? 'text-gray-800' : 'text-gray-500'}`}>
                            RO Evaluation
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Final evaluation and endorsement to DBM.
                          </p>
                        </div>

                        {currentStep === 3 && (
                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-[#0369a1] bg-sky-50 px-2 py-1.5 rounded-lg border border-sky-200">
                            <Send className="w-3 h-3 shrink-0 text-[#0284c7]" />
                            <span>Under RO Evaluation</span>
                          </div>
                        )}
                      </div>

                      {/* Step 4: DBM Regional Office */}
                      <div
                        className={`relative rounded-xl p-4.5 transition-all border flex flex-col justify-between ${currentStep === 4
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : currentStep > 4
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : 'bg-slate-50/70 border-slate-200 text-slate-400'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div
                              className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs ${currentStep > 4
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : currentStep === 4
                                    ? 'bg-[#022851] text-[#facc15] shadow-sm'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                            >
                              {currentStep > 4 ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : currentStep === 4 ? (
                                <Landmark className="w-4 h-4 text-[#facc15]" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${currentStep > 4
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : currentStep === 4
                                    ? 'bg-sky-100 text-[#0284c7] animate-pulse'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                              {currentStep > 4 ? 'Completed' : currentStep === 4 ? 'Active Stage' : 'Upcoming'}
                            </span>
                          </div>

                          <p className={`text-[11px] font-bold uppercase tracking-wider ${currentStep === 4 ? 'text-[#0284c7]' : currentStep > 4 ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 4 • DBM Regional Office
                          </p>
                          <h4 className={`text-[14px] font-extrabold tracking-tight mt-0.5 ${currentStep === 4 ? 'text-[#022851]' : currentStep > 4 ? 'text-gray-800' : 'text-gray-500'}`}>
                            Endorsed to DBM RO
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Budget allocation & Notice of Organization, Staffing and Compensation Action (NOSCA) issuance.
                          </p>
                        </div>

                        {currentStep === 4 && (
                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-[#0369a1] bg-sky-50 px-2 py-1.5 rounded-lg border border-sky-200">
                            <Landmark className="w-3 h-3 shrink-0 text-[#0284c7]" />
                            <span>Awaiting NOSCA Issuance from DBM</span>
                          </div>
                        )}
                      </div>

                      {/* Step 5: Appointment */}
                      <div
                        className={`relative rounded-xl p-4.5 transition-all border flex flex-col justify-between ${isReclassProper
                            ? 'bg-gradient-to-br from-emerald-50/90 to-teal-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-slate-50/70 border-slate-200 text-slate-400'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div
                              className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-bold text-xs ${isReclassProper
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                            >
                              {isReclassProper ? (
                                <Sparkles className="w-4 h-4 text-[#facc15]" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${isReclassProper
                                  ? 'bg-emerald-100 text-emerald-800 font-black'
                                  : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                              {isReclassProper ? 'Official Appointment' : 'Upcoming'}
                            </span>
                          </div>

                          <p className={`text-[11px] font-bold uppercase tracking-wider ${isReclassProper ? 'text-emerald-700' : 'text-slate-400'}`}>
                            Step 5 • Official Appointment
                          </p>
                          <h4 className={`text-[14px] font-extrabold tracking-tight mt-0.5 ${isReclassProper ? 'text-[#022851]' : 'text-gray-500'}`}>
                            Appointment / Reclass Proper
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                            {isReclassProper
                              ? 'Official appointment and reclassification into approved plantilla position & salary grade.'
                              : 'Official appointment and placement to the position upon DBM NOSCA issuance.'}
                          </p>

                          {/* Reclassified Position & Salary Grade Display Box */}
                          <div
                            className={`mt-2.5 p-2.5 rounded-xl border text-left transition-all ${isReclassProper
                                ? 'bg-gradient-to-br from-emerald-50/90 to-sky-50/70 border-emerald-200/90 shadow-xs'
                                : 'bg-slate-100/80 border-slate-200'
                              }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span
                                className={`text-[9px] font-extrabold uppercase tracking-wider ${isReclassProper ? 'text-emerald-800' : 'text-slate-400'
                                  }`}
                              >
                                Reclassified Position
                              </span>
                              <span
                                className={`text-[8px] font-bold px-1 py-0.2 rounded font-mono ${isReclassProper
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                  }`}
                              >
                                {isReclassProper ? 'Official' : 'Pending'}
                              </span>
                            </div>
                            <p
                              className={`text-[12px] font-bold tracking-tight break-words ${isReclassProper ? 'text-[#022851] font-black' : 'text-slate-600'
                                }`}
                            >
                              {reclassData.reclass_position || reclassData.indicative_position || reclassData.target_position || (initialAssessment !== 'N/A' ? initialAssessment : '—')}
                            </p>
                            <div
                              className={`flex items-center gap-1.5 mt-1 pt-1 border-t ${isReclassProper ? 'border-emerald-200/60' : 'border-slate-200'
                                }`}
                            >
                              <span
                                className={`text-[11px] font-bold ${isReclassProper ? 'text-emerald-700 font-black' : 'text-slate-500'
                                  }`}
                              >
                                {getPositionSalaryGrade(reclassData.reclass_position || reclassData.indicative_position || reclassData.target_position || initialAssessment)}
                              </span>
                              <span className="text-[9px] text-slate-400">• {isReclassProper ? 'Approved' : 'Projected'}</span>
                            </div>
                          </div>

                          {/* Plantilla Item / NOSCA serial details if present */}
                          {(hasNewItemNo || reclassData.nosca_serial_no) ? (
                            <div className="mt-2.5 p-2 rounded-lg bg-emerald-100/70 border border-emerald-300 text-[10px] space-y-1">
                              {hasNewItemNo && (
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-emerald-950 uppercase tracking-wider text-[9px]">New Item No:</span>
                                  <strong className="font-mono text-[#022851] bg-white px-2 py-0.5 rounded border border-emerald-300 text-[11px] shadow-2xs font-extrabold">{newItemNo}</strong>
                                </div>
                              )}
                              {reclassData.nosca_serial_no && (
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-emerald-950 uppercase tracking-wider text-[9px]">NOSCA Serial:</span>
                                  <strong className="font-mono text-[#022851] bg-white px-2 py-0.5 rounded border border-emerald-300 text-[11px] shadow-2xs font-extrabold">{reclassData.nosca_serial_no}</strong>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="mt-2 text-[9px] text-slate-400 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>Locked until official appointment</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Notice when RO endorsement is not yet reached */}
                    {!isEndorsedToRegional && (
                      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/80 border border-sky-200 text-xs text-sky-900 shadow-xs">
                        <Clock className="w-4 h-4 text-[#0284c7] shrink-0" />
                        <p>
                          <strong>Indicative Reclassification Status:</strong> Will be unlocked and available for viewing once Step 2 (HRMO Review & Evaluation) is completed and endorsed to the DepEd Regional Office (RO).
                        </p>
                      </div>
                    )}
                  </div>
                  )}

                  {/* 4. Indicative Reclassification Results — Available when endorsed to RO */}
                  {isEndorsedToRegional && (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#022851] via-[#034478] to-[#0284c7] p-5 md:p-6 text-white shadow-md border-2 border-sky-400/40">
                      {/* Background decorative glow */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/15">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-xs">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-xs font-black tracking-widest uppercase text-sky-200">
                                Indicative Reclassification Results
                              </h3>
                              <p className="text-[11px] text-sky-100/80">
                                Official DepEd career progression outcome endorsed to Regional Office
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider">Evaluation Status:</span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 shadow-xs">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              {reclassData.evaluation_status ? reclassData.evaluation_status.replace(/_/g, ' ').toUpperCase() : 'QUALIFIED'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Indicative Position */}
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4.5 transition-all hover:bg-white/15 shadow-sm">
                            <div className="flex items-center gap-2 text-sky-200 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                              <Award className="w-4 h-4 text-amber-300" />
                              <span>Indicative Reclass Position</span>
                            </div>
                            <p className="text-xl md:text-2xl font-black text-amber-300 tracking-tight break-words">
                              {reclassData.indicative_position || reclassData.target_position || 'SCHOOL COUNSELOR II'}
                            </p>
                            <p className="text-[11px] text-sky-100/75 mt-1.5 leading-snug">
                              Validated placement upon regional evaluation & NOSCA issuance
                            </p>
                          </div>

                          {/* Indicative Salary Grade */}
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4.5 transition-all hover:bg-white/15 shadow-sm">
                            <div className="flex items-center gap-2 text-sky-200 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                              <TrendingUp className="w-4 h-4 text-emerald-300" />
                              <span>Indicative Salary Grade</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <p className="text-xl md:text-2xl font-black text-white tracking-tight">
                                {reclassData.indicative_salary_grade ? `SG-${reclassData.indicative_salary_grade}` : getPositionSalaryGrade(reclassData.indicative_position || reclassData.target_position || 'SCHOOL COUNSELOR II')}
                              </p>
                              <span className="text-xs font-semibold text-sky-200">
                                (National Plantilla Scale)
                              </span>
                            </div>
                            <p className="text-[11px] text-sky-100/75 mt-1.5 leading-snug">
                              Compensation grade corresponding to indicative reclass position
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })() : (
              <div className="p-8 text-center text-gray-500 text-sm">
                <div className="w-8 h-8 border-2 border-[#0369a1] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p>Loading your reclassification record…</p>
              </div>
            )}
          </div>
        )}

        {profile?.registrant_type !== 'reclass' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleFilterChange('active')}
              className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'active' ? 'border-[#9333ea] shadow-[0_8px_25px_rgba(147,51,234,0.2)] ring-1 ring-[#9333ea]' : 'border-[#9333ea]/20 shadow-[0_4px_15px_rgba(147,51,234,0.05)] hover:shadow-[0_8px_25px_rgba(147,51,234,0.15)] hover:border-[#9333ea]/40'}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-[68px] h-[68px] bg-[#f3e8ff] rounded-[20px] flex items-center justify-center shrink-0">
                  <Briefcase className="w-8 h-8 text-[#9333ea]" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-500 font-bold mb-1">Active Applications</p>
                  <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{activeApps.length}</p>
                  <p className="text-[12px] text-gray-400 font-medium">Applications in progress</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => handleFilterChange('history')}
              className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'history' ? 'border-[#3b82f6] shadow-[0_8px_25px_rgba(59,130,246,0.2)] ring-1 ring-[#3b82f6]' : 'border-[#3b82f6]/20 shadow-[0_4px_15px_rgba(59,130,246,0.05)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/40'}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-[68px] h-[68px] bg-[#eff6ff] rounded-[20px] flex items-center justify-center shrink-0">
                  <History className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-500 font-bold mb-1">Application History</p>
                  <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{historyApps.length}</p>
                  <p className="text-[12px] text-gray-400 font-medium">All your applications</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => handleFilterChange('saved')}
              className={`bg-white p-6 rounded-2xl flex items-center justify-between text-left transition-all focus:outline-none border-[1.5px] ${activeFilter === 'saved' ? 'border-[#22c55e] shadow-[0_8px_25px_rgba(34,197,94,0.2)] ring-1 ring-[#22c55e]' : 'border-[#22c55e]/20 shadow-[0_4px_15px_rgba(34,197,94,0.05)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.15)] hover:border-[#22c55e]/40'}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-[68px] h-[68px] bg-[#f0fdf4] rounded-[20px] flex items-center justify-center shrink-0">
                  <Bookmark className="w-8 h-8 text-[#22c55e]" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-500 font-bold mb-1">Saved Vacancies</p>
                  <p className="text-[32px] font-extrabold text-[#022851] leading-none mb-1">{savedJobs.length}</p>
                  <p className="text-[12px] text-gray-400 font-medium">Bookmarked positions</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center shrink-0">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        )}

        {!isReclass && (
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(2,40,81,0.08)] border-[1.5px] border-[#022851]/10 overflow-hidden mt-2">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#eff6ff] p-2.5 rounded-xl">
                  <Briefcase className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <h3 className="text-[16px] font-bold text-[#022851]">
                  {activeFilter === 'active' && 'Active Applications'}
                  {activeFilter === 'history' && 'Application History'}
                  {activeFilter === 'saved' && 'Saved Positions'}
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Division</th>
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Date Applied</th>
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Application Status</th>
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Assessment Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">
                        Loading your data...
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">
                        {activeFilter === 'active' && "You don't have any active applications."}
                        {activeFilter === 'history' && "You don't have any applications yet."}
                        {activeFilter === 'saved' && "You haven't saved any positions yet."}
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#eff6ff] rounded-full flex items-center justify-center shrink-0">
                              <Briefcase className="w-6 h-6 text-[#3b82f6]" />
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[#022851]">{app.position}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-[13px] text-gray-500 font-medium">{app.division}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-[13px] text-gray-600 font-medium">
                            {app.date !== 'N/A' && app.date ? new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-blue-50 text-blue-700 uppercase tracking-wide border border-blue-200">
                            {app.applicationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-purple-50 text-purple-700 uppercase tracking-wide border border-purple-200">
                            {app.assessmentStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
                <div className="text-[13px] text-gray-500 font-medium">
                  Showing <span className="font-bold text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-700">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-bold text-gray-700">{filteredData.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-8 h-8 rounded-lg text-[13px] font-bold transition-colors ${currentPage === idx + 1
                          ? 'bg-[#022851] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {isModalOpen && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobTitle="Profile Update"
        />
      )}

      {showGateModal && (
        <PlantillaGateModal
          applicantId={profile?.id || JSON.parse(localStorage.getItem('session_data') || '{}').id}
          onVerified={(incumbentRecord) => {
            setShowGateModal(false);
            setReclassData(incumbentRecord);
            const assessedPos =
              incumbentRecord?.initial_assessment_position ||
              incumbentRecord?.initial_assessment ||
              incumbentRecord?.reclass_position;
            const isSCIV = isAssessedSCIV(assessedPos);

            const hasInitialAssessment =
              !!incumbentRecord?.initial_assessment &&
              String(incumbentRecord?.initial_assessment).trim() !== '' &&
              String(incumbentRecord?.initial_assessment).toUpperCase() !== 'N/A';

            const isInitialNull =
              !hasInitialAssessment && incumbentRecord?.new_application !== true;

            const isUpdateAppNotBool =
              incumbentRecord?.update_application !== true &&
              incumbentRecord?.update_application !== false;

            if (!isSCIV && isInitialNull) {
              setShowInitialPrompt(true);
              setInitialPromptType('apply');
              setReclassApplyStep('prompt');
            } else if (hasInitialAssessment && isUpdateAppNotBool) {
              setShowInitialPrompt(true);
              setInitialPromptType('update');
            }
          }}
        />
      )}

      {isReclassUploadModalOpen && (
        <ReclassUploadModal
          isOpen={isReclassUploadModalOpen}
          applicantId={profile?.id || JSON.parse(localStorage.getItem('session_data') || '{}').id}
          qualificationData={pendingQualificationData}
          onClose={() => {
            setIsReclassUploadModalOpen(false);
            refreshReclassData();
          }}
          onUploadSuccess={() => {
            refreshReclassData();
          }}
          onSubmissionComplete={handleReclassSubmissionComplete}
          revisionDocuments={revisionDocuments}
          checklistDocuments={checklistDocuments}
        />
      )}

      {/* "Do you want to apply for reclassification?" Prompt & Application Modal */}
      {showInitialPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-[#022851] to-[#034078] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
                  {reclassApplyStep === 'form' ? <FileText className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    {reclassApplyStep === 'form' ? 'Reclassification Application' : 'Application for Reclassification'}
                  </h3>
                  <p className="text-xs text-sky-200 font-medium">DepEd Order No. 004, s. 2026 Process</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowInitialPrompt(false);
                  setReclassApplyStep('prompt');
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Prompt Question */}
            {initialPromptType === 'update' ? (
              <div className="p-6 space-y-5">
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-black text-[#022851]">
                    Do you want to update your application for reclassification?
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                    Your plantilla record has an existing initial assessment. You can edit your choice below to update your application or proceed under your current record.
                  </p>
                </div>

                {/* Two Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* YES Option */}
                  <button
                    type="button"
                    onClick={() => handleUpdateApplicationAnswer('yes')}
                    disabled={isSavingPreference}
                    className={`group relative p-4 rounded-xl border-2 text-left flex flex-col justify-between cursor-pointer transition-all disabled:opacity-50 ${
                      reclassData?.update_application === true
                        ? 'border-[#0284c7] bg-sky-50/80 ring-2 ring-[#0284c7]/30 shadow-md'
                        : 'border-[#0284c7]/50 bg-sky-50/30 hover:bg-sky-50 hover:border-[#0284c7] hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        {reclassData?.update_application === true && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0284c7] text-white shadow-2xs">
                            Current Choice
                          </span>
                        )}
                      </div>
                      <span className="block text-base font-black text-[#022851] group-hover:text-[#0284c7] transition-colors">
                        Yes
                      </span>
                      <p className="text-[11px] text-gray-600 leading-normal">
                        Update application for reclassification (choose registration track and desired position).
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-sky-200/60 flex items-center justify-between text-xs font-bold text-[#0284c7]">
                      <span>{isSavingPreference ? 'Saving...' : reclassData?.update_application === true ? 'Selected • Click to open application' : 'Select Yes'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  {/* NO Option */}
                  <button
                    type="button"
                    onClick={() => handleUpdateApplicationAnswer('no')}
                    disabled={isSavingPreference}
                    className={`group relative p-4 rounded-xl border-2 text-left flex flex-col justify-between cursor-pointer transition-all disabled:opacity-50 ${
                      reclassData?.update_application === false
                        ? 'border-slate-400 bg-slate-100/90 ring-2 ring-slate-400/30 shadow-md'
                        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs">
                          <X className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        {reclassData?.update_application === false && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-600 text-white shadow-2xs">
                            Current Choice
                          </span>
                        )}
                      </div>
                      <span className="block text-base font-black text-[#022851] group-hover:text-slate-700 transition-colors">
                        No
                      </span>
                      <p className="text-[11px] text-gray-600 leading-normal">
                        Proceed with your current plantilla position and initial assessment without changes.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-gray-500">
                      <span>{isSavingPreference ? 'Saving...' : reclassData?.update_application === false ? 'Selected • Keep current record' : 'Select No'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    You can change your response at any time by clicking Change in your Desired Position card.
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowInitialPrompt(false)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : reclassApplyStep === 'prompt' ? (
              <div className="p-6 space-y-5">
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-black text-[#022851]">
                    Do you want to apply for reclassification?
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                    Your plantilla record currently has no initial assessment. Please choose whether you would like to apply for reclassification to the School Counselor career track by submitting your qualification details.
                  </p>
                </div>

                {/* Two Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* YES Option */}
                  <button
                    type="button"
                    onClick={() => setReclassApplyStep('form')}
                    className="group relative p-4 rounded-xl border-2 border-[#0284c7] bg-sky-50/50 hover:bg-sky-50 hover:border-[#0284c7] hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="block text-sm font-extrabold text-[#022851] group-hover:text-[#0284c7] transition-colors">
                        Yes, Apply for Reclassification
                      </span>
                      <p className="text-[11px] text-gray-600 leading-normal">
                        Provide your education, year of experience, hours of training, and eligibility.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-sky-200/60 flex items-center justify-between text-xs font-bold text-[#0284c7]">
                      <span>Enter details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  {/* NO Option */}
                  <button
                    type="button"
                    onClick={() => setShowInitialPrompt(false)}
                    className="group relative p-4 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs">
                        <X className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="block text-sm font-extrabold text-[#022851] group-hover:text-slate-700 transition-colors">
                        No, Not Now
                      </span>
                      <p className="text-[11px] text-gray-600 leading-normal">
                        Proceed to dashboard without applying at this time. You can apply later from your dashboard.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-gray-500">
                      <span>Decide later</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    This prompt will display whenever your initial reclassification assessment is pending.
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowInitialPrompt(false)}
                    className="text-xs font-bold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Decide Later
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Form to input Education, Year of Experience, Hours of Training, Eligibility */
              <form onSubmit={handleReclassApplySubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-black text-[#022851]">
                    Qualification Standards Details
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Please provide your qualification details to be evaluated and inserted into your incumbent reclassification record.
                  </p>
                </div>

                <div className="space-y-3.5 pt-1 text-left">
                  {/* 1. Education */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Education / Degree Attained <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applyEducation}
                      onChange={(e) => setApplyEducation(e.target.value.toUpperCase())}
                      placeholder="E.G. BACHELOR / MASTER IN GUIDANCE & COUNSELING"
                      className="w-full text-xs font-medium border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#0284c7] uppercase transition-all bg-white"
                    />
                  </div>

                  {/* 2. Year of Experience & 3. Hours of Training */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          Year of Experience <span className="text-red-500">*</span>
                        </label>
                        {applyYearsExperience !== '' && Number(applyYearsExperience) === 0 && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            None Required
                          </span>
                        )}
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        value={applyYearsExperience}
                        onChange={(e) => setApplyYearsExperience(e.target.value)}
                        placeholder="e.g. 5 (or 0)"
                        className="w-full text-xs font-mono border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#0284c7] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-gray-700">
                          Hours of Training <span className="text-red-500">*</span>
                        </label>
                        {applyHoursTraining !== '' && Number(applyHoursTraining) === 0 && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            None Required
                          </span>
                        )}
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        value={applyHoursTraining}
                        onChange={(e) => setApplyHoursTraining(e.target.value)}
                        placeholder="e.g. 40 (or 0)"
                        className="w-full text-xs font-mono border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#0284c7] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* 4. Eligibility */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Eligibility / Professional License <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applyEligibility}
                      onChange={(e) => setApplyEligibility(e.target.value.toUpperCase())}
                      placeholder="E.G. RA 1080 (REGISTERED GUIDANCE COUNSELOR)"
                      className="w-full text-xs font-medium border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#0284c7] uppercase transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Form Footer Action Buttons */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setReclassApplyStep('prompt')}
                    disabled={isSubmittingReclassApply}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingReclassApply}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingReclassApply ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit & Proceed to Document Upload</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Reclass Update Modal (Register or Not, Target Position & QS) */}
      {isUpdateModalOpen && (
        <ReclassUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          applicantId={profile?.id || JSON.parse(localStorage.getItem('session_data') || '{}').id}
          initialIsRegistered={
            reclassData?.is_registered !== undefined
              ? !!reclassData.is_registered
              : (pendingQualificationData?.eligibility?.toUpperCase().includes('1080') ||
                 pendingQualificationData?.eligibility?.toUpperCase().includes('REGISTERED') ||
                 applyEligibility?.toUpperCase().includes('1080') ||
                 applyEligibility?.toUpperCase().includes('REGISTERED') ||
                 isRegisteredPosition(reclassData?.desired_position || reclassData?.desire_position || reclassData?.target_position || reclassData?.reclass_position))
          }
          initialTargetPosition={reclassData?.desired_position || reclassData?.desire_position || reclassData?.target_position || reclassData?.reclass_position || editTargetPositionValue}
          initialStep={updateModalInitialStep}
          isAlreadySCIV={isAssessedSCIV(reclassData?.initial_assessment_position || reclassData?.initial_assessment || reclassData?.reclass_position)}
          onSuccess={handleUpdateModalSuccess}
        />
      )}
    </div>
  );
}
