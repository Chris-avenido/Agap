import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, History, ArrowRight, ArrowLeft, Users, ChevronRight, Bookmark, Lock, Award, Upload, FileCheck2, Building2, Clock, Edit2, Check, X, Sparkles, MapPin, TrendingUp, AlertTriangle, Calendar, FileText, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateProfileProgress, parseProfileToState } from '../utils/profileProgress';
import Swal from 'sweetalert2';
import ApplicantHeader from '../components/ApplicantHeader';
import ApplicationModal from '../components/ApplicationModal';
import PlantillaGateModal from '../components/PlantillaGateModal';
import ReclassUploadModal from '../components/ReclassUploadModal';

const RECLASS_TARGET_OPTIONS = [
  { value: 'SCHOOL COUNSELOR I', label: 'School Counselor I (SG 11)' },
  { value: 'SCHOOL COUNSELOR II', label: 'School Counselor II (SG 13)' },
  { value: 'SCHOOL COUNSELOR III', label: 'School Counselor III (SG 16)' },
  { value: 'SCHOOL COUNSELOR IV', label: 'School Counselor IV (SG 19)' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE II', label: 'School Counselor Associate II (SG 12)' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE III', label: 'School Counselor Associate III (SG 13)' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE IV', label: 'School Counselor Associate IV (SG 14)' },
  { value: 'SCHOOL COUNSELOR ASSOCIATE V', label: 'School Counselor Associate V (SG 15)' },
];

function getPositionSalaryGrade(posName?: string | null): string {
  if (!posName) return '—';
  const clean = posName.toUpperCase().trim();

  // School Counselor Associate track
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE V')) return 'SG-15';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE IV')) return 'SG-14';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE III')) return 'SG-13';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE II')) return 'SG-12';
  if (clean.includes('SCHOOL COUNSELOR ASSOCIATE I')) return 'SG-11';

  // School Counselor track
  if (clean.includes('SCHOOL COUNSELOR IV')) return 'SG-19';
  if (clean.includes('SCHOOL COUNSELOR III')) return 'SG-16';
  if (clean.includes('SCHOOL COUNSELOR II')) return 'SG-13';
  if (clean.includes('SCHOOL COUNSELOR I')) return 'SG-11';

  // Incumbent Guidance track (for current position)
  if (clean.includes('GUIDANCE SERVICES SPECIALIST II')) return 'SG-18';
  if (clean.includes('GUIDANCE SERVICES SPECIALIST I')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR III')) return 'SG-16';
  if (clean.includes('GUIDANCE COORDINATOR II')) return 'SG-15';
  if (clean.includes('GUIDANCE COORDINATOR I')) return 'SG-14';
  if (clean.includes('GUIDANCE COUNSELOR III')) return 'SG-13';
  if (clean.includes('GUIDANCE COUNSELOR II')) return 'SG-12';
  if (clean.includes('GUIDANCE COUNSELOR I') || clean === 'GUIDANCE COUNSELOR') return 'SG-11';

  return '—';
}

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reclassData, setReclassData] = useState<any>(null);
  const [showGateModal, setShowGateModal] = useState(false);
  const [isReclassUploadModalOpen, setIsReclassUploadModalOpen] = useState(false);
  const [isEditingTargetPosition, setIsEditingTargetPosition] = useState(false);
  const [editTargetPositionValue, setEditTargetPositionValue] = useState('SCHOOL COUNSELOR II');
  const [isSavingTargetPosition, setIsSavingTargetPosition] = useState(false);

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

    setIsSavingTargetPosition(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/applicants/${session.id}/reclass-target-position`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_position: editTargetPositionValue }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setReclassData((prev: any) => ({
          ...prev,
          target_position: editTargetPositionValue,
          reclass_position: editTargetPositionValue,
          indicative_position: data.data?.indicative_position || editTargetPositionValue,
          indicative_salary_grade: data.data?.indicative_salary_grade || null,
        }));
        setIsEditingTargetPosition(false);
        Swal.fire({
          icon: 'success',
          title: 'Target Position Updated',
          text: `Your target reclassification position is now ${editTargetPositionValue}.`,
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'Unable to update target position.',
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to the server to update target position.',
      });
    } finally {
      setIsSavingTargetPosition(false);
    }
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
                ? 'Here is the status of your reclassification from Guidance Counselor to School Counselor.'
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
              <button
                onClick={() => setIsReclassUploadModalOpen(true)}
                className="bg-[#022851] hover:bg-[#033a76] text-white px-6 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px] flex items-center justify-center gap-2.5 group"
              >
                <Upload className="w-4 h-4" /> Upload Requirements
              </button>
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
                  <p className="text-xs text-sky-100">DepEd Guidance Counselor → School Counselor</p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-100">
                Incumbent Portal
              </span>
            </div>

            {reclassData ? (() => {
              const rawStatus = String(
                reclassData.stage_of_reclassification ||
                reclassData.qs_status ||
                reclassData.evaluation_status ||
                ''
              ).trim().toLowerCase();

              const initialAssessment =
                reclassData.initial_assessment_position ||
                reclassData.reclass_position ||
                'SCHOOL COUNSELOR II';
              const initialSalaryGrade =
                reclassData.initial_assessment_salary_grade
                  ? `SG-${reclassData.initial_assessment_salary_grade}`
                  : getPositionSalaryGrade(initialAssessment);

              const uploadedDocsCount = reclassDocs.length;
              const TOTAL_REQUIRED_DOCS = 8;
              const hasSubmittedAllDocs = uploadedDocsCount >= TOTAL_REQUIRED_DOCS;
              const submissionDeadline = reclassData.submission_deadline || 'October 31, 2026';

              const isReclassProper =
                rawStatus.includes('appointed') ||
                rawStatus.includes('reclass proper') ||
                rawStatus.includes('reclassification proper') ||
                rawStatus.includes('reclassified') ||
                Boolean(reclassData.nosca_serial_no && reclassData.new_item_no);

              const isEndorsedToDbm =
                !isReclassProper &&
                (rawStatus.includes('dbm') ||
                  rawStatus.includes('endorsed to dbm') ||
                  rawStatus.includes('endorsed to dbm ro'));

              const isEndorsedToRo =
                !isReclassProper &&
                !isEndorsedToDbm &&
                (rawStatus.includes('ro') ||
                  rawStatus.includes('endorsed to ro') ||
                  rawStatus.includes('endorsed'));

              const isEndorsedToRegional = isEndorsedToRo || isEndorsedToDbm || isReclassProper;

              // Step Calculation (4 Steps)
              let currentStep = 1;
              let currentLabel = 'Updating of Documents';
              let stepBadge = 'Step 1 of 4: Updating of Documents';
              let defaultRemarks =
                'Submit updated qualification documents if seeking re-assessment. Non-submission means your reclassification proceeds under your Initial Assessment.';

              if (isReclassProper) {
                currentStep = 4;
                currentLabel = 'Reclassification Proper';
                stepBadge = 'Step 4 of 4: Reclassification Proper';
                defaultRemarks =
                  'Your plantilla position has been officially reclassified with NOSCA allocation and salary adjustment.';
              } else if (isEndorsedToDbm) {
                currentStep = 3;
                currentLabel = 'Endorsed TO DBM RO';
                stepBadge = 'Step 3 of 4: DBM RO Endorsement';
                defaultRemarks =
                  'Your reclassification application has been endorsed to the Department of Budget and Management (DBM) Regional Office for NOSCA issuance.';
              } else if (isEndorsedToRo) {
                currentStep = 2;
                currentLabel = 'Endorsed To RO';
                stepBadge = 'Step 2 of 4: Endorsed to RO';
                defaultRemarks =
                  'Your documents have been verified and endorsed to the DepEd Regional Office for evaluation and transmittal.';
              } else if (hasSubmittedAllDocs) {
                currentStep = 2;
                currentLabel = 'For Review';
                stepBadge = 'Step 2 of 4: SDO Initial Review';
                defaultRemarks =
                  'All 8 required documents have been submitted. Your reclassification credentials and documents are currently being reviewed by your Division HRMO.';
              } else {
                currentStep = 1;
                currentLabel = 'Updating of Documents';
                stepBadge = 'Step 1 of 4: Updating of Documents';
                defaultRemarks =
                  uploadedDocsCount === 0
                    ? 'No updated documents have been submitted yet. Non-submission of updated documents means your reclassification proceeds under your Initial Assessment.'
                    : `${uploadedDocsCount} of 8 requirements uploaded. Your reclassification will proceed under your Initial Assessment if no additional documents are submitted.`;
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
                        <p className="text-[11px] text-gray-500">Current plantilla record, initial assessment, and target reclass intent</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
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

                      {/* Current Salary Grade */}
                      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Salary Grade</p>
                        <p className="text-[15px] font-extrabold text-[#022851] mt-0.5">
                          {reclassData.salary_grade ? `SG-${reclassData.salary_grade}` : getPositionSalaryGrade(reclassData.position_title || reclassData.current_position)}
                        </p>
                      </div>

                      {/* Initial Assessment (Tentative Reclass from Previous Assessment) */}
                      <div className="bg-gradient-to-br from-amber-50/70 to-sky-50/50 border-2 border-sky-300/80 rounded-xl p-3.5 shadow-xs relative">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <p className="text-[11px] font-bold text-[#0369a1] uppercase tracking-wider">Initial Assessment</p>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded font-mono">
                            Tentative
                          </span>
                        </div>
                        <p className="text-[14px] font-black text-[#022851] mt-0.5 break-words">
                          {initialAssessment}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[11px] font-bold text-[#0284c7]">{initialSalaryGrade}</span>
                          <span className="text-[10px] text-gray-500">• Previous evaluation</span>
                        </div>
                      </div>

                      {/* Target Reclass Position with Edit button and Dropdown */}
                      <div className={`border rounded-xl p-3.5 shadow-xs transition-all ${isEditingTargetPosition ? 'bg-sky-50/70 border-[#0284c7] ring-2 ring-[#0284c7]/20 sm:col-span-2 lg:col-span-1' : 'bg-white border-slate-200/90'}`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Target Reclass</p>
                          {!isEditingTargetPosition && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditTargetPositionValue(reclassData.target_position || reclassData.reclass_position || 'SCHOOL COUNSELOR II');
                                setIsEditingTargetPosition(true);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-[#0284c7] hover:text-[#0369a1] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md transition-colors cursor-pointer"
                              title="Update target reclassification position"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          )}
                        </div>

                        {isEditingTargetPosition ? (
                          <div className="mt-2 space-y-2.5">
                            <label className="block text-[11px] font-semibold text-gray-700">
                              Select target position:
                            </label>
                            <select
                              value={editTargetPositionValue}
                              onChange={(e) => setEditTargetPositionValue(e.target.value)}
                              className="w-full text-xs font-bold text-[#022851] bg-white border-2 border-[#0284c7] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 shadow-xs"
                            >
                              {RECLASS_TARGET_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>

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
                          <p className="text-[14px] font-extrabold text-[#0284c7] mt-0.5 break-words">
                            {reclassData.target_position || reclassData.reclass_position || '—'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. The Stages (Process Stepper) */}
                  <div className="bg-gradient-to-b from-sky-50/70 to-blue-50/40 border border-sky-200/90 rounded-2xl p-5 md:p-6 lg:p-7 shadow-sm space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0369a1]">Current Stage</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#022851] text-[#facc15]">
                            {stepBadge}
                          </span>
                        </div>
                        <p className="text-lg md:text-xl font-black text-[#022851] mt-0.5 tracking-tight">
                          {currentLabel}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {reclassData.remarks || defaultRemarks}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 rounded-xl bg-white/80 border border-sky-200 shadow-sm shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full ${isEndorsedToRegional ? 'bg-emerald-500' : 'bg-[#0284c7]'} animate-ping`}></div>
                        <span className="text-xs font-extrabold text-[#022851]">{currentLabel}</span>
                      </div>
                    </div>

                    {/* Notice Banner */}
                    <div className="bg-amber-50/90 border border-amber-300/80 rounded-xl px-4 py-3 text-amber-950 shadow-xs flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-900 font-medium leading-relaxed">
                        <strong>Important Notice:</strong> Non-submission of updated documents means <strong>no re-assessment will be initiated</strong>. Your reclassification will remain based on your <strong>Initial Assessment: {initialAssessment} ({initialSalaryGrade})</strong>.
                      </p>
                    </div>

                    {/* Process Steps Stepper (4 Steps) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 xl:gap-5 relative">
                      {/* Step 1: Updating of Documents */}
                      <div
                        className={`relative rounded-xl p-5 transition-all border flex flex-col justify-between ${
                          currentStep === 1
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                                hasSubmittedAllDocs
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
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                hasSubmittedAllDocs
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-sky-100 text-[#0284c7] animate-pulse'
                              }`}
                            >
                              {hasSubmittedAllDocs ? 'Completed' : 'Active Stage'}
                            </span>
                          </div>

                          <p className={`text-xs font-bold uppercase tracking-wider ${currentStep === 1 ? 'text-[#0284c7]' : hasSubmittedAllDocs ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 1 • Applicant Submission
                          </p>
                          <h4 className={`text-[15px] font-extrabold tracking-tight mt-0.5 ${currentStep === 1 ? 'text-[#022851]' : 'text-gray-800'}`}>
                            Updating of Documents
                          </h4>

                          {/* Submission Deadline */}
                          <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50/90 border border-amber-300/80 text-amber-950 text-[11px] mt-2 mb-1 w-full shadow-2xs">
                            <span className="flex items-center gap-1.5 font-bold text-amber-900">
                              <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              Deadline:
                            </span>
                            <span className="font-extrabold text-amber-900 font-mono">{submissionDeadline}</span>
                          </div>

                          {/* Tentative Initial Assessment highlight box */}
                          <div className="my-2.5 p-2.5 rounded-lg bg-sky-50/80 border border-sky-200/90 text-left">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-extrabold uppercase text-[#0369a1] tracking-wider">
                                Tentative Assessment
                              </span>
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                                Previous Evaluation
                              </span>
                            </div>
                            <p className="text-xs font-black text-[#022851] mt-0.5">
                              Initial Assessment: {initialAssessment} ({initialSalaryGrade})
                            </p>
                          </div>

                          {/* Submission Progress Bar */}
                          <div className="space-y-1.5 my-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-gray-500">Submission Progress</span>
                              <span className={`font-extrabold ${hasSubmittedAllDocs ? 'text-emerald-700' : 'text-[#022851]'}`}>
                                {uploadedDocsCount} of 8 Uploaded
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  hasSubmittedAllDocs ? 'bg-emerald-500' : 'bg-[#0284c7]'
                                }`}
                                style={{
                                  width: `${Math.min(100, Math.round((uploadedDocsCount / 8) * 100))}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsReclassUploadModalOpen(true)}
                          className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#022851] hover:bg-[#033b77] shadow-xs transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{hasSubmittedAllDocs ? 'Manage Requirements' : `Upload Requirements (${uploadedDocsCount}/8)`}</span>
                        </button>
                      </div>

                      {/* Step 2: SDO Division HRMO */}
                      <div
                        className={`relative rounded-xl p-5 transition-all border flex flex-col justify-between ${
                          currentStep === 2
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : isEndorsedToRo || isEndorsedToDbm || isReclassProper
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                            : 'bg-slate-50/70 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isEndorsedToRo || isEndorsedToDbm || isReclassProper
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : currentStep === 2
                                  ? 'bg-[#022851] text-[#facc15] shadow-sm'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isEndorsedToRo || isEndorsedToDbm || isReclassProper ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : currentStep === 2 ? (
                                <Building2 className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                isEndorsedToRo || isEndorsedToDbm || isReclassProper
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : currentStep === 2
                                  ? 'bg-sky-100 text-[#0284c7] animate-pulse'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {isEndorsedToRo || isEndorsedToDbm || isReclassProper
                                ? 'Completed'
                                : currentStep === 2
                                ? 'Active Stage'
                                : 'Locked'}
                            </span>
                          </div>

                          <p className={`text-xs font-bold uppercase tracking-wider ${currentStep === 2 ? 'text-[#0284c7]' : isEndorsedToRo || isEndorsedToDbm || isReclassProper ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 2 • SDO Division HRMO
                          </p>
                          <h4 className={`text-[15px] font-extrabold tracking-tight mt-0.5 ${currentStep === 2 ? 'text-[#0284c7]' : isEndorsedToRo || isEndorsedToDbm || isReclassProper ? 'text-gray-800' : 'text-gray-500'}`}>
                            For Review / SDO Re-assessment
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            {hasSubmittedAllDocs
                              ? 'SDO Division HRMO qualification verification & re-assessment.'
                              : 'SDO Division HRMO qualification verification and evaluation of submitted credentials.'}
                          </p>
                        </div>

                        {!hasSubmittedAllDocs && (
                          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200">
                            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            <span>Awaiting submission of requirements</span>
                          </div>
                        )}
                      </div>

                      {/* Step 3: DBM Regional Office */}
                      <div
                        className={`relative rounded-xl p-5 transition-all border flex flex-col justify-between ${
                          currentStep === 3
                            ? 'bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20'
                            : isReclassProper
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                            : 'bg-white/60 border-slate-200 text-gray-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isReclassProper
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : currentStep === 3
                                  ? 'bg-[#022851] text-[#facc15] shadow-sm'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isReclassProper ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Award className="w-4 h-4" />
                              )}
                            </div>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                isReclassProper
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : currentStep === 3
                                  ? 'bg-sky-100 text-[#0284c7] animate-pulse'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {isReclassProper ? 'Completed' : currentStep === 3 ? 'Active Stage' : 'Upcoming'}
                            </span>
                          </div>

                          <p className={`text-xs font-bold uppercase tracking-wider ${currentStep === 3 ? 'text-[#0284c7]' : isReclassProper ? 'text-emerald-800' : 'text-gray-400'}`}>
                            Step 3 • DBM Regional Office
                          </p>
                          <h4 className={`text-[15px] font-extrabold tracking-tight mt-0.5 ${currentStep === 3 ? 'text-[#022851]' : isReclassProper ? 'text-gray-800' : 'text-gray-500'}`}>
                            Endorsed TO DBM RO
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Budget allocation & Notice of Organization, Staffing and Compensation Action (NOSCA) issuance.
                          </p>
                        </div>
                      </div>

                      {/* Step 4: Reclassification Proper */}
                      <div
                        className={`relative rounded-xl p-5 transition-all border flex flex-col justify-between ${
                          isReclassProper
                            ? 'bg-gradient-to-br from-emerald-50/90 to-teal-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                            : 'bg-slate-50/70 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isReclassProper
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
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                isReclassProper
                                  ? 'bg-emerald-100 text-emerald-800 font-black'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {isReclassProper ? 'Official Placement' : 'Upcoming'}
                            </span>
                          </div>

                          <p className={`text-xs font-bold uppercase tracking-wider ${isReclassProper ? 'text-emerald-700' : 'text-slate-400'}`}>
                            Step 4 • Final Placement
                          </p>
                          <h4 className={`text-[15px] font-extrabold tracking-tight mt-0.5 ${isReclassProper ? 'text-[#022851]' : 'text-gray-500'}`}>
                            Reclassification Proper
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                            {isReclassProper
                              ? 'Official reclassification into approved plantilla position & salary grade.'
                              : 'Official reclassification and appointment to the position upon NOSCA issuance.'}
                          </p>

                          {/* Reclassified Position & Salary Grade Display Box */}
                          <div
                            className={`mt-3 p-3 rounded-xl border text-left transition-all ${
                              isReclassProper
                                ? 'bg-gradient-to-br from-emerald-50/90 to-sky-50/70 border-emerald-200/90 shadow-xs'
                                : 'bg-slate-100/80 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span
                                className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                  isReclassProper ? 'text-emerald-800' : 'text-slate-400'
                                }`}
                              >
                                Reclassified Position
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                                  isReclassProper
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {isReclassProper ? 'Official' : 'Pending Appointment'}
                              </span>
                            </div>
                            <p
                              className={`text-[13px] font-bold tracking-tight break-words ${
                                isReclassProper ? 'text-[#022851] font-black' : 'text-slate-600'
                              }`}
                            >
                              {reclassData.reclass_position || reclassData.indicative_position || reclassData.target_position || initialAssessment}
                            </p>
                            <div
                              className={`flex items-center gap-1.5 mt-1.5 pt-1.5 border-t ${
                                isReclassProper ? 'border-emerald-200/60' : 'border-slate-200'
                              }`}
                            >
                              <span
                                className={`text-xs font-bold ${
                                  isReclassProper ? 'text-emerald-700 font-black' : 'text-slate-500'
                                }`}
                              >
                                {getPositionSalaryGrade(reclassData.reclass_position || reclassData.indicative_position || reclassData.target_position || initialAssessment)}
                              </span>
                              <span className="text-[10px] text-slate-400">• {isReclassProper ? 'Approved Grade' : 'Projected Grade'}</span>
                            </div>
                          </div>

                          {/* Plantilla Item / NOSCA serial details if present */}
                          {(reclassData.new_item_no || reclassData.nosca_serial_no) ? (
                            <div className="mt-2 text-[10px] font-semibold text-gray-600 flex items-center justify-between">
                              {reclassData.new_item_no && (
                                <span>Item: <strong className="font-mono text-[#022851]">{reclassData.new_item_no}</strong></span>
                              )}
                              {reclassData.nosca_serial_no && (
                                <span>NOSCA: <strong className="font-mono text-[#022851]">{reclassData.nosca_serial_no}</strong></span>
                              )}
                            </div>
                          ) : (
                            <div className="mt-2.5 text-[10px] text-slate-400 flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
                          <strong>Indicative Reclassification Status:</strong> Will be unlocked and available for viewing once Step 2 (SDO Initial Review) is completed and endorsed to the Regional Office (RO).
                        </p>
                      </div>
                    )}
                  </div>

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
          }}
        />
      )}

      {isReclassUploadModalOpen && (
        <ReclassUploadModal
          isOpen={isReclassUploadModalOpen}
          applicantId={profile?.id || JSON.parse(localStorage.getItem('session_data') || '{}').id}
          onClose={() => {
            setIsReclassUploadModalOpen(false);
            refreshReclassData();
          }}
          onUploadSuccess={() => {
            refreshReclassData();
          }}
        />
      )}
    </div>
  );
}
