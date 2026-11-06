import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Swal from "sweetalert2";
import {
  X,
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Trash2,
  Plus,
  Save
} from "lucide-react";
// @ts-ignore
import ModernDatePicker from "./ModernDatePicker";
import { calculateProfileProgress, parseProfileToState } from "../utils/profileProgress";
import PersonalInfoStep from "../features/application/components/PersonalInfoStep";
import FamilyBackgroundStep from "../features/application/components/FamilyBackgroundStep";
import EducationStep from "../features/application/components/EducationStep";
import CivilServiceStep from "../features/application/components/CivilServiceStep";
import ExperienceStep from "../features/application/components/ExperienceStep";
import VoluntaryWorkStep from "../features/application/components/VoluntaryWorkStep";
import LearningDevelopmentStep from "../features/application/components/LearningDevelopmentStep";
import OtherInformationStep from "../features/application/components/OtherInformationStep";
import QuestionnaireStep from "../features/application/components/QuestionnaireStep";
import DocumentsStep from "../features/application/components/DocumentsStep";
import { useAddressLists } from "../features/application/hooks/useAddressLists";
import { useApplicationProgress } from "../features/application/hooks/useApplicationProgress";
import { ETHNIC_GROUPS, formatCurrencyValue, ADDRESS_API } from "../features/application/constants";


interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: number | null;
  viewMode?: 'pds' | 'vacancy-details';
  jobData?: any;
}


export default function ApplicationModal({
  isOpen,
  onClose,
  jobTitle,
  jobId,
  viewMode = 'pds',
  jobData
}: ApplicationModalProps) {
  const isRegistrationFlow = jobTitle === "General Registration";
  const [activeTab, setActiveTab] = useState("C1");
  const [userData, setUserData] = useState<any>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightContentRef.current) {
      rightContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    if (!isOpen) return;
    if (isRegistrationFlow) {
      setUserData(null);
      return;
    }

    const sessionStr = localStorage.getItem("session_data");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.data);
          }
        });
    }
  }, [isOpen, isRegistrationFlow]);

  const formRef = useRef<HTMLFormElement>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [selectedDocumentNames, setSelectedDocumentNames] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [selectedDocumentUrls, setSelectedDocumentUrls] = useState<Record<string, string>>({});
  const formProgressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFormProgressRefresh = useCallback(() => {
    if (formProgressTimerRef.current) {
      clearTimeout(formProgressTimerRef.current);
    }

    formProgressTimerRef.current = setTimeout(() => {
      setFormVersion((v) => v + 1);
      formProgressTimerRef.current = null;
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      if (formProgressTimerRef.current) {
        clearTimeout(formProgressTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("C1");
      setSelectedDocumentNames({});
      setSelectedFiles({});
      setSelectedDocumentUrls({});
      scheduleFormProgressRefresh();
    }
  }, [isOpen, scheduleFormProgressRefresh]);

  useEffect(() => {
    scheduleFormProgressRefresh();
  }, [userData, scheduleFormProgressRefresh]);

  const handleSaveProgress = async (showToast = true) => {
    const form = document.getElementById("application-form") as HTMLFormElement;
    if (!form) return false;

    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());
    const data: any = { ...rawData };

    data.residential_address = {
      house: rawData["res_house"],
      street: rawData["res_street"],
      subdivision: rawData["res_subdivision"],
      zip: rawData["res_zip"],
      region: rawData["res_region"],
      province: rawData["res_province"],
      city: rawData["res_city"],
      barangay: rawData["res_barangay"],
    };

    data.permanent_address = {
      same_as_res: rawData["same_as_res"] === "on",
      house: rawData["perm_house"],
      street: rawData["perm_street"],
      subdivision: rawData["perm_subdivision"],
      zip: rawData["perm_zip"],
      region: rawData["perm_region"],
      province: rawData["perm_province"],
      city: rawData["perm_city"],
      barangay: rawData["perm_barangay"],
    };

    data.questionnaire_responses = {
      "34a": { answer: rawData["q34a"] === "yes" ? "Yes" : (rawData["q34a"] === "no" ? "No" : ""), details: "" },
      "34b": { answer: rawData["q34b"] === "yes" ? "Yes" : (rawData["q34b"] === "no" ? "No" : ""), details: rawData["q34b_details"] || "" },
      "35a": { answer: rawData["q35a"] === "yes" ? "Yes" : (rawData["q35a"] === "no" ? "No" : ""), details: rawData["q35a_details"] || "" },
      "35b": { answer: rawData["q35b"] === "yes" ? "Yes" : (rawData["q35b"] === "no" ? "No" : ""), details: rawData["q35b_date"] ? `${rawData["q35b_date"]} - ${rawData["q35b_status"]}` : "" },
      "36": { answer: rawData["q36"] === "yes" ? "Yes" : (rawData["q36"] === "no" ? "No" : ""), details: rawData["q36_details"] || "" },
      "37": { answer: rawData["q37"] === "yes" ? "Yes" : (rawData["q37"] === "no" ? "No" : ""), details: rawData["q37_details"] || "" },
      "38a": { answer: rawData["q38a"] === "yes" ? "Yes" : (rawData["q38a"] === "no" ? "No" : ""), details: rawData["q38a_details"] || "" },
      "38b": { answer: rawData["q38b"] === "yes" ? "Yes" : (rawData["q38b"] === "no" ? "No" : ""), details: rawData["q38b_details"] || "" },
      "39": { answer: rawData["q39"] === "yes" ? "Yes" : (rawData["q39"] === "no" ? "No" : ""), details: rawData["q39_details"] || "" },
      "40a": { answer: rawData["q40a"] === "yes" ? "Yes" : (rawData["q40a"] === "no" ? "No" : ""), details: rawData["q40a_details"] || "" },
      "40b": { answer: rawData["q40b"] === "yes" ? "Yes" : (rawData["q40b"] === "no" ? "No" : ""), details: rawData["q40b_details"] || "" },
      "40b_ethnic": { answer: rawData["q40b_ethnic"] === "yes" ? "Yes" : (rawData["q40b_ethnic"] === "no" ? "No" : ""), details: rawData["q40b_ethnic_details"] || "" },
      "40c": { answer: rawData["q40c"] === "yes" ? "Yes" : (rawData["q40c"] === "no" ? "No" : ""), details: rawData["q40c_details"] || "" },
      ref1_name: rawData["ref1_name"], ref1_address: rawData["ref1_address"], ref1_tel: rawData["ref1_tel"],
      ref2_name: rawData["ref2_name"], ref2_address: rawData["ref2_address"], ref2_tel: rawData["ref2_tel"],
      ref3_name: rawData["ref3_name"], ref3_address: rawData["ref3_address"], ref3_tel: rawData["ref3_tel"],
      gov_id_type: rawData["gov_id_type"], gov_id_no: rawData["gov_id_no"], gov_id_issuance: rawData["gov_id_issuance"],
    };

    data.family_background = {
      spouse: {
        surname: rawData["spouse_surname"],
        first_name: rawData["spouse_first_name"],
        middle_name: rawData["spouse_middle_name"],
        name_extension: rawData["spouse_name_extension"],
        occupation: rawData["spouse_occupation"],
        employer_business_name: rawData["spouse_employer_business_name"],
        business_address: rawData["spouse_business_address"],
        telephone_no: rawData["spouse_telephone_no"],
      },
      father: {
        surname: rawData["father_surname"],
        first_name: rawData["father_first_name"],
        middle_name: rawData["father_middle_name"],
        name_extension: rawData["father_name_extension"],
      },
      mother: {
        maiden_surname: rawData["mother_surname"],
        first_name: rawData["mother_first_name"],
        middle_name: rawData["mother_middle_name"],
      },
      children: rawData["children_list"] ? JSON.parse(rawData["children_list"] as string) : [],
    };

    const existingOtherInfo = userData?.other_information ? (typeof userData.other_information === 'string' ? JSON.parse(userData.other_information) : userData.other_information) : {};
    const parseListToObjects = (rawStr: any) => {
      if (!rawStr) return [];
      const parsed = JSON.parse(rawStr as string);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item: any) => typeof item === 'string' ? { value: item } : item);
    };

    data.other_information = {
      ...existingOtherInfo,
      height: rawData["height"],
      weight: rawData["weight"],
      agency_employee_no: rawData["agency_employee_no"],
      citizenship_type: rawData["citizenship_type"],
      extension_name: rawData["extension_name"],
      special_skills: parseListToObjects(rawData["special_skills"]),
      skills: parseListToObjects(rawData["special_skills"]),
      distinctions: parseListToObjects(rawData["distinctions"]),
      memberships: parseListToObjects(rawData["memberships"]),
    };

    const edBg = [];
    const levels = ["elementary", "secondary", "vocational", "college", "graduate"];
    for (let i = 0; i < 5; i++) {
      edBg.push({
        level: levels[i],
        school_name: rawData[`edu_${i}_school_name`] || "",
        school: rawData[`edu_${i}_school_name`] || "",
        degree_course: rawData[`edu_${i}_degree_course`] || "",
        degree: rawData[`edu_${i}_degree_course`] || "",
        period_from: rawData[`edu_${i}_period_from`] || "",
        from: rawData[`edu_${i}_period_from`] || "",
        period_to: rawData[`edu_${i}_period_to`] || "",
        to: rawData[`edu_${i}_period_to`] || "",
        highest_level: rawData[`edu_${i}_highest_level`] || "",
        units: rawData[`edu_${i}_highest_level`] || "",
        year_graduated: rawData[`edu_${i}_year_graduated`] || "",
        year: rawData[`edu_${i}_year_graduated`] || "",
        honors_received: rawData[`edu_${i}_honors_received`] || "",
        honors: rawData[`edu_${i}_honors_received`] || ""
      });
    }
    data.educational_background = edBg;

    if (rawData["civil_service_eligibility"]) {
      data.civil_service_eligibility = JSON.parse(rawData["civil_service_eligibility"] as string);
    }
    if (rawData["work_experience"]) {
      data.work_experience = JSON.parse(rawData["work_experience"] as string);
    }
    if (rawData["voluntary_work"]) {
      data.voluntary_work = JSON.parse(rawData["voluntary_work"] as string);
    }
    if (rawData["learning_and_development"]) {
      data.learning_and_development = JSON.parse(rawData["learning_and_development"] as string);
    }

    if (!data.sex && userData?.sex) data.sex = userData.sex;
    data.email_address = rawData["email"] || userData?.email_address;

    const sessionStr = localStorage.getItem("session_data");
    let sessionId = null;
    if (sessionStr) {
      try {
        sessionId = JSON.parse(sessionStr).id;
      } catch (e) { }
    }

    if (!sessionId && isRegistrationFlow) {
      if (showToast) {
        Swal.fire("Note", "Please complete registration at the final step to create your account.", "info");
      }
      return false;
    }

    if (sessionId) {
      data.disability = rawData["q40b"] === "yes" ? rawData["q40b_details"] || "" : "No";
      data.ethnic_group = rawData["q40b_ethnic"] === "yes" ? rawData["q40b_ethnic_details"] || "" : "No";
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${sessionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const docMapping: Record<string, string> = {
          "doc_loi": "Letter of Intent",
          "doc_sworn": "Sworn Declaration",
          "doc_pds": "Notarized Personal Data Sheet",
          "doc_work_exp": "Work Experience Sheet",
          "doc_eligibility": "Certificate of Eligibility",
          "doc_tor": "Transcript of Records",
          "doc_prc": "Updated PRC License/ID",
          "doc_diploma": "Diploma (optional)",
          "doc_resume": "Resume",
          "doc_performance_rating": "Performance Rating",
          "doc_training_certificates": "Training Certificates",
          "doc_application_of_education": "Application of Education",
          "doc_application_of_learning": "Application of Learning and Development",
          "doc_outstanding_accomplishments": "Outstanding Accomplishments",
          "doc_service_record": "Service Record / Certificate of Employment",
          "profile_photo": "profile_photo"
        };

        const changedFiles: Array<{ docLabel: string; file: File }> = [];
        for (const key of Object.keys(docMapping)) {
          const docLabel = docMapping[key];
          let file: File | null = null;
          if (selectedFiles[docLabel] && selectedFiles[docLabel].size > 0) {
            file = selectedFiles[docLabel];
          } else {
            const formVal = formData.get(key);
            if (formVal instanceof File && formVal.size > 0) {
              file = formVal;
            }
          }
          if (file && file.size > 0) {
            changedFiles.push({ docLabel, file });
          }
        }

        if (changedFiles.length > 0) {
          const batchUploadFormData = new FormData();
          for (const item of changedFiles) {
            batchUploadFormData.append("files", item.file);
            batchUploadFormData.append("documentNames", item.docLabel);
          }
          const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${sessionId}/documents`, {
            method: 'POST',
            body: batchUploadFormData
          });

          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json().catch(() => ({}));
            if (uploadResult.documents) {
              if (userData && userData.other_information) {
                if (typeof userData.other_information === 'string') {
                  try {
                    const parsed = JSON.parse(userData.other_information);
                    parsed.documents = { ...(parsed.documents || {}), ...uploadResult.documents };
                    userData.other_information = parsed;
                  } catch { }
                } else {
                  userData.other_information.documents = { ...(userData.other_information.documents || {}), ...uploadResult.documents };
                }
              }
              if (otherInfo) {
                otherInfo.documents = { ...(otherInfo.documents || {}), ...uploadResult.documents };
              }
            }
            setSelectedFiles({});
            setSelectedDocumentNames({});
            setSelectedDocumentUrls({});
            const fileInputs = form.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
            fileInputs.forEach((input) => { input.value = ''; });
          }
        }

        if (response.ok) {
          if (showToast) {
            Swal.fire({
              icon: "success",
              title: "Progress Saved",
              text: "Your information has been saved to the database.",
              timer: 2000,
              showConfirmButton: false
            });
          }
          return true;
        }
      } catch (err) {
        console.error("Save progress error:", err);
        if (showToast) {
          Swal.fire("Error", "Failed to save progress to database.", "error");
        }
      }
    }
    return false;
  };

  const handleDocumentSelection = useCallback((documentLabel: string) => (e: any) => {
    const file = e.target.files?.[0];

    setSelectedDocumentNames((prev) => {
      const next = { ...prev };
      if (file) {
        next[documentLabel] = file.name;
      } else {
        delete next[documentLabel];
      }
      return next;
    });

    setSelectedFiles((prev) => {
      const next = { ...prev };
      if (file) {
        next[documentLabel] = file;
      } else {
        delete next[documentLabel];
      }
      return next;
    });

    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedDocumentUrls((prev) => ({
        ...prev,
        [documentLabel]: url,
      }));
    }

    scheduleFormProgressRefresh();
  }, [scheduleFormProgressRefresh]);

  const [resRegion, setResRegion] = useState("");
  const [resProvince, setResProvince] = useState("");
  const [resCity, setResCity] = useState("");
  const [resBarangay, setResBarangay] = useState("");

  const [permRegion, setPermRegion] = useState("");
  const [permProvince, setPermProvince] = useState("");
  const [permCity, setPermCity] = useState("");
  const [sameAsRes, setSameAsRes] = useState(false);
  const [permBarangay, setPermBarangay] = useState("");
  const [sex, setSex] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("Error", "Image size should be less than 2MB", "error");
      return;
    }

    try {
      const sessionStr = localStorage.getItem("session_data");
      if (!sessionStr) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        return;
      }

      Swal.fire({
        title: "Uploading Photo...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const session = JSON.parse(sessionStr);

      const formData = new FormData();
      formData.append("files", file);
      formData.append("documentNames", "profile_photo");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        const uploadedUrl = result.documents.profile_photo;

        // Also update the applicant's other_information with the new photoUrl
        if (userData) {
          const oi =
            typeof userData.other_information === "string"
              ? JSON.parse(userData.other_information)
              : userData.other_information || {};
          oi.photoUrl = uploadedUrl;
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ other_information: oi }),
            },
          );
        }

        setPhotoUrl(uploadedUrl);
        Swal.fire("Success", "Photo uploaded successfully!", "success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload photo", "error");
    }
  };

  const handleDirectReplace = async (docType: 'Letter of Intent' | 'Sworn Declaration', e?: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (err) {
      console.error(err);
    }

    const activeApps = userApplications.filter(app => {
      const status = app.status || '';
      return !['Hired', 'Archived', 'Cancelled', 'Rejected'].includes(status);
    });

    let selectedIds: string[] = [];

    // Helper to identify if vacancy is closed (directly sourced from vacancies.status)
    const isVacancyClosed = (app: any) => {
      const vStatus = String(app.vacancy_status || '').toLowerCase().trim();
      return vStatus === 'closed';
    };

    const openApps = activeApps.filter(app => !isVacancyClosed(app));

    if (activeApps.length > 0) {
      const appCheckboxesHtml = activeApps.map(app => {
        const positionTitle = app.job_title || app.position || 'Position Applied';
        const divisionName = app.division || app.office || 'Department of Education';
        const dateApplied = app.date_applied || app.created_at;
        const formattedDate = dateApplied ? new Date(dateApplied).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A';
        const closed = isVacancyClosed(app);

        if (closed) {
          return `
            <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f1f5f9; border: 1.5px solid #cbd5e1; border-radius: 8px; opacity: 0.65; cursor: not-allowed; text-align: left; transition: all 0.2s;">
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

        return `
          <label style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
            <input type="checkbox" class="swal-app-checkbox" value="${app.id}" style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; flex-shrink: 0;" />
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
        <div style="font-family: inherit; font-size: 14px; text-align: left; max-height: 400px; overflow-y: auto; padding-right: 4px;">
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
        </div>
      `;

      const confirmResult = await Swal.fire({
        title: `Confirm Update for ${docType}`,
        html: htmlContent,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm & Select File',
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
          const ids = Array.from(checkboxes).map(cb => cb.value);
          if (openApps.length > 0 && ids.length === 0) {
            Swal.showValidationMessage('Please select at least one applied job position to update!');
            return false;
          }
          return ids;
        }
      });

      if (!confirmResult.isConfirmed || !confirmResult.value) {
        if (e && e.target) e.target.value = '';
        return;
      }

      selectedIds = confirmResult.value;
    }

    // Prompt user to select replacement PDF file from explorer
    let file: File | null = null;
    if (e?.target?.files?.[0]) {
      file = e.target.files[0];
    } else {
      file = await new Promise<File | null>((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf';
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = () => {
          const selectedFile = input.files?.[0] || null;
          if (document.body.contains(input)) {
            document.body.removeChild(input);
          }
          resolve(selectedFile);
        };

        input.addEventListener('cancel', () => {
          if (document.body.contains(input)) {
            document.body.removeChild(input);
          }
          resolve(null);
        });

        window.addEventListener(
          'focus',
          () => {
            setTimeout(() => {
              if (document.body.contains(input)) {
                document.body.removeChild(input);
                resolve(null);
              }
            }, 1000);
          },
          { once: true }
        );

        input.click();
      });
    }

    if (!file) {
      if (e && e.target) e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire('Error', 'File size must be less than 5MB', 'error');
      if (e && e.target) e.target.value = '';
      return;
    }

    Swal.fire({
      title: `Uploading new ${docType}...`,
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', docType);
      if (selectedIds.length > 0) {
        formData.append('applicationIds', JSON.stringify(selectedIds));
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/replace-document`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (otherInfo) {
          otherInfo.documents = data.documents;
        }
        if (userData && userData.other_information) {
          userData.other_information.documents = data.documents;
        }
        setUserData((prev: any) => {
          if (!prev) return prev;
          const oi = typeof prev.other_information === 'string' ? JSON.parse(prev.other_information) : (prev.other_information || {});
          return {
            ...prev,
            other_information: {
              ...oi,
              documents: data.documents
            }
          };
        });
        Swal.fire({
          icon: 'success',
          title: 'Document Updated!',
          text: `Your ${docType} has been updated across ${data.affectedApplications} applied job position(s).`,
          timer: 3500
        });
      } else {
        Swal.fire('Error', data.message || 'Failed to replace document.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred while uploading.', 'error');
    } finally {
      if (e && e.target) e.target.value = '';
    }
  };

  const handleDirectView = async (docType: 'Letter of Intent' | 'Sworn Declaration') => {
    const sessionStr = localStorage.getItem('session_data');
    const defaultUrl = getDocUrl(docType);
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
      console.error(e);
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

      return `
        <label style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
          <input type="radio" name="swal-view-doc" class="swal-view-radio" value="${encodeURIComponent(docUrl)}" ${index === 0 ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; flex-shrink: 0;" />
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

  const { permBarangaysList, permCitiesList, permProvincesList, regionsList, resBarangaysList, resCitiesList, resProvincesList } = useAddressLists({ permCity, permProvince, permRegion, resCity, resProvince, resRegion });

  const isResBarangayOther = resBarangay === 'OTHER' || (resBarangay && resBarangaysList.length > 0 && !resBarangaysList.some((b: any) => b.name.toUpperCase() === resBarangay.toUpperCase()));
  const isPermBarangayOther = permBarangay === 'OTHER' || (permBarangay && permBarangaysList.length > 0 && !permBarangaysList.some((b: any) => b.name.toUpperCase() === permBarangay.toUpperCase()));

  useEffect(() => {
    if (userData) {
      const rAddr = userData.residential_address
        ? typeof userData.residential_address === "string"
          ? JSON.parse(userData.residential_address)
          : userData.residential_address
        : {};
      if (rAddr.region) setResRegion(rAddr.region);
      if (rAddr.province) setResProvince(rAddr.province);
      if (rAddr.city) setResCity(rAddr.city);
      if (rAddr.barangay) setResBarangay(rAddr.barangay);

      const pAddr = userData.permanent_address
        ? typeof userData.permanent_address === "string"
          ? JSON.parse(userData.permanent_address)
          : userData.permanent_address
        : {};
      if (pAddr.region) setPermRegion(pAddr.region);
      if (pAddr.province) setPermProvince(pAddr.province);
      if (pAddr.city) setPermCity(pAddr.city);
      if (pAddr.same_as_res || pAddr.sameAsResidential || pAddr.same_as_residential || (rAddr && rAddr.region && rAddr.region === pAddr.region && rAddr.city === pAddr.city && rAddr.barangay === pAddr.barangay && rAddr.house === pAddr.house)) {
        setSameAsRes(true);
      }
      if (pAddr.barangay) setPermBarangay(pAddr.barangay);
      if (userData.sex) setSex(userData.sex);

      if (userData.photo_url) {
        setPhotoUrl(userData.photo_url);
      } else if (userData.other_information) {
        const oi =
          typeof userData.other_information === "string"
            ? JSON.parse(userData.other_information)
            : userData.other_information;
        if (oi.photoUrl) setPhotoUrl(oi.photoUrl);
      }
    }
  }, [userData]);

  const otherInfo = userData?.other_information
    ? typeof userData.other_information === "string"
      ? JSON.parse(userData.other_information)
      : userData.other_information
    : {};

  const [childrenList, setChildrenList] = useState<any[]>([{ name: '', dob: null }]);
  useEffect(() => {
    let loadedChildren = false;
    if (userData?.family_background) {
      const fb = typeof userData.family_background === 'string' ? JSON.parse(userData.family_background) : userData.family_background;
      if (fb.children && Array.isArray(fb.children) && fb.children.length > 0) {
        setChildrenList(fb.children);
        loadedChildren = true;
      }
    }
    if (!loadedChildren && otherInfo?.children && Array.isArray(otherInfo.children) && otherInfo.children.length > 0) {
      setChildrenList(otherInfo.children);
    }
  }, [userData, otherInfo]);

  const resAddress = userData?.residential_address
    ? typeof userData.residential_address === "string"
      ? JSON.parse(userData.residential_address)
      : userData.residential_address
    : {};
  const permAddress = userData?.permanent_address
    ? typeof userData.permanent_address === "string"
      ? JSON.parse(userData.permanent_address)
      : userData.permanent_address
    : {};
  const familyBackground = userData?.family_background
    ? typeof userData.family_background === "string"
      ? JSON.parse(userData.family_background)
      : userData.family_background
    : {};
  const rawEduBg = userData?.educational_background
    ? typeof userData.educational_background === "string"
      ? JSON.parse(userData.educational_background)
      : userData.educational_background
    : [];

  const eduBg = new Array(5).fill({});

  rawEduBg.forEach((eb: any, idx: number) => {
    let targetIdx = idx;
    if (eb.level) {
      const lvl = eb.level.toLowerCase();
      if (lvl.includes('elementary')) targetIdx = 0;
      else if (lvl.includes('secondary')) targetIdx = 1;
      else if (lvl.includes('vocational')) targetIdx = 2;
      else if (lvl.includes('college')) targetIdx = 3;
      else if (lvl.includes('graduate')) targetIdx = 4;
    }

    if (targetIdx >= 0 && targetIdx < 5) {
      eduBg[targetIdx] = {
        ...eb,
        school_name: eb.school_name || eb.school || '',
        degree_course: eb.degree_course || eb.degree || '',
        period_from: eb.period_from || eb.from || '',
        period_to: eb.period_to || eb.to || '',
        highest_level: eb.highest_level || eb.units || '',
        year_graduated: eb.year_graduated || eb.year || '',
        honors_received: eb.honors_received || eb.honors || ''
      };
    }
  });

  const [civilServiceList, setCivilServiceList] = useState<any[]>([{ eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }]);
  useEffect(() => {
    if (userData?.civil_service_eligibility) {
      const cse_data = typeof userData.civil_service_eligibility === 'string' ? JSON.parse(userData.civil_service_eligibility) : userData.civil_service_eligibility;
      if (cse_data && Array.isArray(cse_data) && cse_data.length > 0) {
        setCivilServiceList(cse_data);
      }
    }
  }, [userData]);

  const cse = userData?.civil_service_eligibility
    ? typeof userData.civil_service_eligibility === "string"
      ? JSON.parse(userData.civil_service_eligibility)
      : userData.civil_service_eligibility
    : [];

  const [workExperienceList, setWorkExperienceList] = useState<any[]>([{ fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }]);
  useEffect(() => {
    if (userData?.work_experience) {
      const we_data = typeof userData.work_experience === 'string' ? JSON.parse(userData.work_experience) : userData.work_experience;
      if (we_data && Array.isArray(we_data) && we_data.length > 0) {
        setWorkExperienceList(we_data);
      }
    }
  }, [userData]);

  const workExp = userData?.work_experience
    ? typeof userData.work_experience === "string"
      ? JSON.parse(userData.work_experience)
      : userData.work_experience
    : [];

  const [voluntaryWorkList, setVoluntaryWorkList] = useState<any[]>([{ nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }]);
  useEffect(() => {
    if (userData?.voluntary_work) {
      const vol_data = typeof userData.voluntary_work === 'string' ? JSON.parse(userData.voluntary_work) : userData.voluntary_work;
      if (vol_data && Array.isArray(vol_data) && vol_data.length > 0) {
        setVoluntaryWorkList(vol_data);
      }
    }
  }, [userData]);

  const volWork = userData?.voluntary_work
    ? typeof userData.voluntary_work === "string"
      ? JSON.parse(userData.voluntary_work)
      : userData.voluntary_work
    : [];

  const [learningDevelopmentList, setLearningDevelopmentList] = useState<any[]>([{ title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }]);
  useEffect(() => {
    if (userData?.learning_and_development) {
      const ld_data = typeof userData.learning_and_development === 'string' ? JSON.parse(userData.learning_and_development) : userData.learning_and_development;
      if (ld_data && Array.isArray(ld_data) && ld_data.length > 0) {
        setLearningDevelopmentList(ld_data);
      }
    }
  }, [userData]);

  const lnd = userData?.learning_and_development
    ? typeof userData.learning_and_development === "string"
      ? JSON.parse(userData.learning_and_development)
      : userData.learning_and_development
    : [];
  const qRes = userData?.questionnaire_responses
    ? typeof userData.questionnaire_responses === "string"
      ? JSON.parse(userData.questionnaire_responses)
      : userData.questionnaire_responses
    : {};

  const [skillsList, setSkillsList] = useState<any[]>(['']);
  const [distinctionsList, setDistinctionsList] = useState<any[]>(['']);
  const [membershipsList, setMembershipsList] = useState<any[]>(['']);

  const [qAnswers, setQAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userData?.other_information) {
      const oi = typeof userData.other_information === 'string' ? JSON.parse(userData.other_information) : userData.other_information;
      const skillsData = oi.skills || oi.special_skills;
      if (skillsData && Array.isArray(skillsData) && skillsData.length > 0) setSkillsList(skillsData);
      if (oi.distinctions && Array.isArray(oi.distinctions) && oi.distinctions.length > 0) setDistinctionsList(oi.distinctions);
      if (oi.memberships && Array.isArray(oi.memberships) && oi.memberships.length > 0) setMembershipsList(oi.memberships);
    }

    if (qRes) {
      const getA = (id: string) => {
        const keyWithQ = `q${id}`;
        const flatVal = qRes[keyWithQ] || qRes[id];
        if (typeof flatVal === 'string' && flatVal.trim() !== '') return flatVal.toLowerCase();
        if (qRes[id] && qRes[id].answer && String(qRes[id].answer).trim() !== '') return String(qRes[id].answer).toLowerCase();
        if (qRes[keyWithQ] && qRes[keyWithQ].answer && String(qRes[keyWithQ].answer).trim() !== '') return String(qRes[keyWithQ].answer).toLowerCase();
        return 'no';
      };

      const getD = (id: string) => {
        const detailsKey = `q${id}_details`;
        if (qRes[detailsKey]) return qRes[detailsKey];
        if (qRes[id] && qRes[id].details) return qRes[id].details;
        const keyWithQ = `q${id}`;
        if (qRes[keyWithQ] && qRes[keyWithQ].details) return qRes[keyWithQ].details;
        return '';
      };

      // Ensure that qRes has all properties populated in a flat way for the render methods to consume directly
      const ids = ['34a', '34b', '35a', '35b', '36', '37', '38a', '38b', '39', '40a', '40b', '40b_ethnic', '40c'];
      ids.forEach(id => {
        let a = getA(id);
        let d = getD(id);

        if (id === '40b_ethnic' && !a && userData?.ethnic_group && userData.ethnic_group !== 'No') {
          a = 'yes';
          d = userData.ethnic_group;
        }

        qRes[`q${id}`] = a;
        qRes[`q${id}_details`] = d;
      });

      setQAnswers({
        q34a: getA('34a'),
        q34b: getA('34b'),
        q35a: getA('35a'),
        q35b: getA('35b'),
        q36: getA('36'),
        q37: getA('37'),
        q38a: getA('38a'),
        q38b: getA('38b'),
        q39: getA('39'),
        q40a: getA('40a'),
        q40b: getA('40b'),
        q40b_ethnic: getA('40b_ethnic'),
        q40c: getA('40c'),
      });
    }
  }, [userData]);



  const storedDocuments = isRegistrationFlow ? {} : { ...(otherInfo?.documents || {}) };

  const getDocUrl = (docName: string) => {
    let url = storedDocuments?.[docName];
    if (!url && docName === "Notarized Personal Data Sheet") {
      url = storedDocuments?.["Personal Data Sheet"];
    }
    if (!url) return null;
    if (url.startsWith("http")) {
      return `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const getStoredDocFileName = (docName: string) => {
    let url = storedDocuments?.[docName];
    if (!url && docName === "Notarized Personal Data Sheet") {
      url = storedDocuments?.["Personal Data Sheet"];
    }
    if (!url || typeof url !== "string") return "";

    const rawFileName = url.split("?")[0].split("/").pop() || "";
    try {
      return decodeURIComponent(rawFileName);
    } catch {
      return rawFileName;
    }
  };

  const { requiredDocuments, completedSteps, percentage, totalSteps } = useApplicationProgress({ civilServiceList, distinctionsList, formRef, formVersion, isRegistrationFlow, jobTitle, learningDevelopmentList, membershipsList, qAnswers, qRes, selectedFiles, sex, skillsList, userData, voluntaryWorkList, workExperienceList });

  if (!isOpen) return null;

  if (viewMode === 'vacancy-details' && jobData) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#022851]/40 backdrop-blur-sm p-4 sm:p-6">
        <div className="bg-white w-full max-w-2xl rounded-[20px] shadow-2xl flex flex-col overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-1.5"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-10 border-b border-gray-100">
            <h2 className="text-[28px] font-bold text-[#3b82f6] tracking-tight leading-tight mb-2">{jobData.title}</h2>
            <div className="text-[15px] text-gray-500 font-medium">
              {[jobData.location, jobData.division].filter(Boolean).join(' - ') || jobData.office || 'Department of Education'}
            </div>
            {jobData.school && (
              <div className="text-[14px] text-gray-500 mt-1">
                Place of Assignment: <span className="font-semibold">{jobData.school}</span>
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 bg-gray-50/50 flex-1">
            <div className="text-[14px] text-gray-600 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              Posted on <span className="font-bold text-gray-800">{jobData.posted || 'N/A'}</span> and deadline is on <span className="font-bold text-red-500">{jobData.deadline || 'N/A'}</span>
            </div>

            <h3 className="text-[16px] font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2 tracking-wide uppercase">Qualification Standards</h3>

            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-5 text-[14px]">
              {jobData.qsEducation && (
                <>
                  <div className="font-bold text-gray-700">Education:</div>
                  <div className="text-gray-600 font-medium leading-relaxed">{jobData.qsEducation}</div>
                </>
              )}
              {jobData.qsTraining !== undefined && jobData.qsTraining !== null && jobData.qsTraining !== '' && (
                <>
                  <div className="font-bold text-gray-700">Training:</div>
                  <div className="text-gray-600 font-medium leading-relaxed">{(jobData.qsTraining === 0 || jobData.qsTraining === '0') ? 'None Required' : jobData.qsTraining}</div>
                </>
              )}
              {jobData.qsExperience !== undefined && jobData.qsExperience !== null && jobData.qsExperience !== '' && (
                <>
                  <div className="font-bold text-gray-700">Experience:</div>
                  <div className="text-gray-600 font-medium leading-relaxed">{(jobData.qsExperience === 0 || jobData.qsExperience === '0') ? 'None Required' : jobData.qsExperience}</div>
                </>
              )}
              {jobData.qsEligibility && (
                <>
                  <div className="font-bold text-gray-700">Eligibility:</div>
                  <div className="text-gray-600 font-medium leading-relaxed">{jobData.qsEligibility}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "C1", label: "Personal Information", icon: User },
    { id: "C2", label: "Family Background", icon: FileText },
    { id: "C3", label: "Educational Background", icon: GraduationCap },
    { id: "C4", label: "Eligibility", icon: FileText },
    { id: "C5", label: "Work Experience", icon: Briefcase },
    { id: "C6", label: "Voluntary Work", icon: FileText },
    { id: "C7", label: "Learning & Development", icon: FileText },
    { id: "C8", label: "Other Information", icon: FileText },
    { id: "C9", label: "Legal Questionnaire", icon: FileText },
    { id: "C10", label: "Essential Documents", icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 md:p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-[#eff3f8] p-4 md:p-6 w-full max-w-7xl h-[95vh] md:h-[90vh] max-h-[1000px] overflow-hidden rounded-lg shadow-2xl relative">
        {/* Close Button Absolute */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500 bg-white shadow-sm z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Sidebar */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col bg-white shadow-sm shrink-0 md:h-fit h-auto max-h-[40vh] md:max-h-full border border-gray-100 rounded-sm overflow-hidden md:overflow-y-auto scrollbar-thin z-10">
          <div className="bg-[#1a73e8] p-4 md:p-5 flex items-center gap-3 md:gap-4 border-b-4 border-red-500 rounded-none shrink-0">
            <div
              onClick={() => photoInputRef.current?.click()}
              className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] bg-white rounded-full flex flex-col items-center justify-center font-extrabold text-[9px] md:text-[11px] leading-none text-center text-black shrink-0 shadow-sm overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {photoUrl ? (
                <img
                  src={
                    photoUrl.startsWith("http")
                      ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(photoUrl)}`
                      : photoUrl
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <span>UPLOAD</span>
                  <span>PHOTO</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              name="profile_photo"
              form="application-form"
            />
            <div className="flex flex-col text-white">
              <span className="font-bold text-[14px] md:text-[16px] uppercase tracking-wide">
                {userData
                  ? `${userData.first_name || ""} ${userData.surname || ""}`.trim()
                  : "APPLICANT"}
              </span>
              <span className="text-[12px] md:text-[13px] leading-snug mt-0.5 md:mt-1 opacity-90">
                Applying for {jobTitle}
              </span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide border-b md:border-b-0 border-gray-100 shrink-0">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isMyProfile = jobTitle === "Profile Update";
              const isCompleted = tab.id === 'C10'
                ? completedSteps.includes('Essential Documents')
                : completedSteps.includes(tab.label);

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (rightContentRef.current) {
                      rightContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 text-left border-r md:border-r-0 md:border-b border-gray-50 hover:bg-gray-50 transition-colors whitespace-nowrap min-w-max md:min-w-0 ${isActive ? "bg-blue-50/30" : ""}`}
                >
                  <div className="flex items-center gap-2 md:gap-3.5">
                    <div
                      className={`w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full flex items-center justify-center shrink-0 ${isCompleted ? "bg-[#34a853]" : isActive ? "bg-[#1a73e8]" : "bg-gray-100"}`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isCompleted || isActive ? "text-white" : "text-gray-300"}`}
                      />
                    </div>
                    <span
                      className={`text-[13px] md:text-[14px] font-semibold tracking-wide ${isActive ? "text-[#1a73e8]" : "text-[#8599ad]"}`}
                    >
                      {tab.label}
                    </span>
                  </div>
                  <div
                    className={`hidden md:block w-2 h-2 rounded-full shrink-0 ml-4 ${isCompleted ? "bg-[#34a853]" : isActive ? "bg-[#1a73e8]" : "bg-gray-200"}`}
                  ></div>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-gray-100 hidden md:block">
            <button
              type="button"
              onClick={() => handleSaveProgress(true)}
              className="w-full py-2.5 px-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Progress
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div ref={rightContentRef} className="flex-1 flex flex-col gap-4 md:gap-6 overflow-y-auto max-h-full pr-1 md:pr-2 scrollbar-thin pb-10">
          {/* Progress Alert */}
          <div className="bg-[#e8f5e9] border border-[#bbf7d0] p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl shadow-sm shrink-0">
            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2e7d32] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[14px] md:text-[15px] font-bold text-[#1b5e20]">
                  {parseFloat(percentage) >= 100 ? "Ready to Submit" : "Complete your Profile"}
                </h2>
                <p className="text-xs md:text-sm text-[#2e7d32] font-medium leading-snug">
                  {parseFloat(percentage) >= 100
                    ? "Your profile is fully complete! You can now save or submit your application."
                    : "Please fill out all required fields and upload all necessary documents."}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64 shrink-0">
              <div className="flex items-center justify-between mb-1.5 px-1">
                <span className="text-[11px] font-extrabold text-[#1b5e20] tracking-wider uppercase">
                  Progress
                </span>
                <span className="text-[11px] font-extrabold text-[#1b5e20]">
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-[#bbf7d0] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2e7d32] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Box */}
          <div className="bg-white p-4 md:p-10 border border-gray-200 shadow-sm flex flex-col items-center rounded-sm [&_input[type='text']]:uppercase  [&_textarea]:uppercase">
            <h3 className="text-[16px] md:text-[18px] text-gray-500 uppercase tracking-widest mb-6 md:mb-10 text-center font-light">
              {tabs.find((t) => t.id === activeTab)?.label ||
                "PERSONAL INFORMATION"}
            </h3>
            <form
              key={userData ? "loaded" : "loading"}
              id="application-form"
              ref={formRef}
              onChange={scheduleFormProgressRefresh}
              className="space-y-4 md:space-y-6 w-full"
            >
              {/* C1: Personal Information */}
              <PersonalInfoStep ctx={{ activeTab, isPermBarangayOther, isResBarangayOther, jobTitle, otherInfo, permAddress, permBarangay, permBarangaysList, permCitiesList, permCity, permProvince, permProvincesList, permRegion, regionsList, resAddress, resBarangay, resBarangaysList, resCitiesList, resCity, resProvince, resProvincesList, resRegion, sameAsRes, setPermBarangay, setPermCity, setPermProvince, setPermRegion, setResBarangay, setResCity, setResProvince, setResRegion, setSameAsRes, setSex, sex, userData }} />

              {/* C2: Family Background */}
              <FamilyBackgroundStep ctx={{ activeTab, childrenList, familyBackground, setChildrenList }} />

              {/* C3: Educational Background */}
              <EducationStep ctx={{ activeTab, eduBg }} />

              {/* C4: Civil Service Eligibility */}
              <CivilServiceStep ctx={{ activeTab, civilServiceList, setCivilServiceList }} />

              {/* C5: Work Experience */}
              <ExperienceStep ctx={{ activeTab, setWorkExperienceList, workExperienceList }} />

              {/* C6: Voluntary Work */}
              <VoluntaryWorkStep ctx={{ activeTab, setVoluntaryWorkList, voluntaryWorkList }} />

              {/* C7: Learning and Development */}
              <LearningDevelopmentStep ctx={{ activeTab, learningDevelopmentList, setLearningDevelopmentList }} />

              {/* C8: Other Information */}
              <OtherInformationStep ctx={{ activeTab, distinctionsList, membershipsList, setDistinctionsList, setMembershipsList, setSkillsList, skillsList }} />

              {/* C9: Legal Questionnaire */}
              <QuestionnaireStep ctx={{ activeTab, otherInfo, qAnswers, qRes, setQAnswers }} />

              {/* C10: Essential Documents */}
              <DocumentsStep ctx={{ activeTab, getDocUrl, handleDirectReplace, handleDirectView, handleDocumentSelection, isRegistrationFlow, selectedDocumentNames, selectedDocumentUrls }} />
            </form>
          </div>

          {/* Footer */}
          <div className="mt-4 bg-white p-4 border border-gray-200 flex justify-between items-center rounded-sm shadow-sm w-full">
            <div className="text-sm text-gray-500 font-medium">
              Step {tabs.findIndex((t) => t.id === activeTab) + 1} of 10
            </div>
            <div className="flex items-center gap-3">
              {activeTab !== "C1" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(
                      (t) => t.id === activeTab,
                    );
                    setActiveTab(tabs[currentIndex - 1].id);
                  }}
                  className="px-4 py-2 flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> BACK
                </button>
              )}

              <button
                type="button"
                onClick={() => handleSaveProgress(true)}
                className="px-5 py-2 flex items-center gap-1.5 text-sm font-bold text-white bg-[#16a34a] hover:bg-[#15803d] rounded transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> SAVE
              </button>

              {activeTab !== "C10" ? (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(
                      (t) => t.id === activeTab,
                    );
                    setActiveTab(tabs[currentIndex + 1].id);
                  }}
                  className="px-6 py-2 flex items-center gap-1 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded transition-colors shadow-sm"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const form = document.getElementById(
                      "application-form",
                    ) as HTMLFormElement;
                    if (form) {
                      const formData = new FormData(form);
                      const rawData = Object.fromEntries(formData.entries());
                      const data: any = { ...rawData };

                      if (jobTitle === "General Registration" && !data.password) {
                        Swal.fire("Error", "Password is required!", "error");
                        return;
                      }
                      if (jobTitle === "General Registration" && !data.date_of_birth) {
                        Swal.fire("Error", "Date of Birth is required!", "error");
                        return;
                      }
                      if (data.password && data.password !== data.confirm_password) {
                        Swal.fire("Error", "Passwords do not match!", "error");
                        return;
                      }
                      data.residential_address = {
                        house: rawData["res_house"],
                        street: rawData["res_street"],
                        subdivision: rawData["res_subdivision"],
                        zip: rawData["res_zip"],
                        region: rawData["res_region"],
                        province: rawData["res_province"],
                        city: rawData["res_city"],
                        barangay: rawData["res_barangay"],
                      };

                      const isSameAsRes = rawData["same_as_res"] === "on";
                      data.permanent_address = isSameAsRes ? {
                        same_as_res: true,
                        house: rawData["res_house"],
                        street: rawData["res_street"],
                        subdivision: rawData["res_subdivision"],
                        zip: rawData["res_zip"],
                        region: rawData["res_region"],
                        province: rawData["res_province"],
                        city: rawData["res_city"],
                        barangay: rawData["res_barangay"],
                      } : {
                        same_as_res: false,
                        house: rawData["perm_house"],
                        street: rawData["perm_street"],
                        subdivision: rawData["perm_subdivision"],
                        zip: rawData["perm_zip"],
                        region: rawData["perm_region"],
                        province: rawData["perm_province"],
                        city: rawData["perm_city"],
                        barangay: rawData["perm_barangay"],
                      };

                      data.questionnaire_responses = {
                        q34a: rawData["q34a"], q34b: rawData["q34b"], q34b_details: rawData["q34b_details"],
                        q35a: rawData["q35a"], q35a_details: rawData["q35a_details"],
                        q35b: rawData["q35b"], q35b_date: rawData["q35b_date"], q35b_status: rawData["q35b_status"],
                        q36: rawData["q36"], q36_details: rawData["q36_details"],
                        q37: rawData["q37"], q37_details: rawData["q37_details"],
                        q38a: rawData["q38a"], q38a_details: rawData["q38a_details"],
                        q38b: rawData["q38b"], q38b_details: rawData["q38b_details"],
                        q39: rawData["q39"], q39_details: rawData["q39_details"],
                        q40a: rawData["q40a"], q40a_details: rawData["q40a_details"],
                        q40b: rawData["q40b"], q40b_details: rawData["q40b_details"],
                        q40c: rawData["q40c"], q40c_details: rawData["q40c_details"],
                        ref1_name: rawData["ref1_name"], ref1_address: rawData["ref1_address"], ref1_tel: rawData["ref1_tel"],
                        ref2_name: rawData["ref2_name"], ref2_address: rawData["ref2_address"], ref2_tel: rawData["ref2_tel"],
                        ref3_name: rawData["ref3_name"], ref3_address: rawData["ref3_address"], ref3_tel: rawData["ref3_tel"],
                        gov_id_type: rawData["gov_id_type"], gov_id_no: rawData["gov_id_no"], gov_id_issuance: rawData["gov_id_issuance"],
                      };

                      data.family_background = {
                        spouse: {
                          surname: rawData["spouse_surname"],
                          first_name: rawData["spouse_first_name"],
                          middle_name: rawData["spouse_middle_name"],
                          name_extension: rawData["spouse_name_extension"],
                          occupation: rawData["spouse_occupation"],
                          employer_business_name: rawData["spouse_employer_business_name"],
                          business_address: rawData["spouse_business_address"],
                          telephone_no: rawData["spouse_telephone_no"],
                        },
                        father: {
                          surname: rawData["father_surname"],
                          first_name: rawData["father_first_name"],
                          middle_name: rawData["father_middle_name"],
                          name_extension: rawData["father_name_extension"],
                        },
                        mother: {
                          maiden_surname: rawData["mother_surname"],
                          first_name: rawData["mother_first_name"],
                          middle_name: rawData["mother_middle_name"],
                        },
                        children: rawData["children_list"] ? JSON.parse(rawData["children_list"] as string) : [],
                      };

                      const existingOtherInfo = userData?.other_information ? (typeof userData.other_information === 'string' ? JSON.parse(userData.other_information) : userData.other_information) : {};
                      data.other_information = {
                        ...existingOtherInfo,
                        height: rawData["height"],
                        weight: rawData["weight"],
                        agency_employee_no: rawData["agency_employee_no"],
                        citizenship_type: rawData["citizenship_type"],
                        extension_name: rawData["extension_name"],
                        special_skills: rawData["special_skills"] ? JSON.parse(rawData["special_skills"] as string) : [],
                        distinctions: rawData["distinctions"] ? JSON.parse(rawData["distinctions"] as string) : [],
                        memberships: rawData["memberships"] ? JSON.parse(rawData["memberships"] as string) : [],
                      };


                      // --- Educational Background ---
                      const edBg = [];
                      for (let i = 0; i < 5; i++) {
                        edBg.push({
                          school_name: rawData[`edu_${i}_school_name`] || "",
                          degree_course: rawData[`edu_${i}_degree_course`] || "",
                          period_from: rawData[`edu_${i}_period_from`] || "",
                          period_to: rawData[`edu_${i}_period_to`] || "",
                          highest_level: rawData[`edu_${i}_highest_level`] || "",
                          year_graduated: rawData[`edu_${i}_year_graduated`] || "",
                          honors_received: rawData[`edu_${i}_honors_received`] || ""
                        });
                      }
                      data.educational_background = edBg;

                      if (rawData["civil_service_eligibility"]) {
                        data.civil_service_eligibility = JSON.parse(rawData["civil_service_eligibility"] as string);
                      }

                      if (rawData["work_experience"]) {
                        data.work_experience = JSON.parse(rawData["work_experience"] as string);
                      }

                      if (rawData["voluntary_work"]) {
                        data.voluntary_work = JSON.parse(rawData["voluntary_work"] as string);
                      }

                      if (rawData["learning_and_development"]) {
                        data.learning_and_development = JSON.parse(rawData["learning_and_development"] as string);
                      }

                      // Default values for buttons if missing from rawData
                      if (!data.sex && userData?.sex) data.sex = userData.sex;

                      data.email_address = rawData["email"];
                      data.jobTitle = jobTitle;
                      if (jobId) {
                        data.positionId = jobId.toString();
                      }

                      data.disability = rawData["q40b"] === "yes" ? rawData["q40b_details"] || "" : "No";
                      data.ethnic_group = rawData["q40b_ethnic"] === "yes" ? rawData["q40b_ethnic_details"] || "" : "No";

                      try {
                        const sessionStr = localStorage.getItem("session_data");
                        let sessionId = null;
                        if (sessionStr) {
                          try {
                            sessionId = JSON.parse(sessionStr).id;
                          } catch (e) { }
                        }

                        let method = "POST";
                        let url = `${import.meta.env.VITE_API_URL}/api/applicants`;

                        if (sessionId) {
                          method = "PUT";
                          url = `${import.meta.env.VITE_API_URL}/api/applicants/${sessionId}`;
                        }

                        const response = await fetch(url, {
                          method: method,
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data),
                        });

                        if (response.ok) {
                          const resData = await response.json();
                          let applySuccess = true;
                          let applicantId = sessionId;

                          if (method === "POST") {
                            const now = new Date();
                            applicantId = resData.data.id;
                            const item = {
                              id: resData.data.id,
                              applicant_number: resData.data.applicant_number,
                              email: resData.data.email_address,
                              expiry: now.getTime() + 3 * 60 * 60 * 1000,
                            };
                            localStorage.setItem(
                              "session_data",
                              JSON.stringify(item),
                            );
                          }

                          // Upload documents
                          try {
                            const docMapping: Record<string, string> = {
                              "doc_loi": "Letter of Intent",
                              "doc_sworn": "Sworn Declaration",
                              "doc_pds": "Notarized Personal Data Sheet",
                              "doc_work_exp": "Work Experience Sheet",
                              "doc_eligibility": "Certificate of Eligibility",
                              "doc_tor": "Transcript of Records",
                              "doc_prc": "Updated PRC License/ID",
                              "doc_diploma": "Diploma (optional)",
                              "doc_resume": "Resume",
                              "doc_performance_rating": "Performance Rating",
                              "doc_training_certificates": "Training Certificates",
                              "doc_application_of_education": "Application of Education",
                              "doc_application_of_learning": "Application of Learning and Development",
                              "doc_outstanding_accomplishments": "Outstanding Accomplishments",
                              "doc_service_record": "Service Record / Certificate of Employment",
                              "profile_photo": "profile_photo"
                            };

                            const changedFiles: Array<{ docLabel: string; file: File }> = [];
                            let attachJobId = false;

                            for (const key of Object.keys(docMapping)) {
                              const docLabel = docMapping[key];
                              let file = formData.get(key) as File;

                              if (selectedFiles[docLabel] && selectedFiles[docLabel].size > 0) {
                                file = selectedFiles[docLabel];
                              } else if (!file || file.size === 0) {
                                const inputs = document.querySelectorAll(`input[name="${key}"]`) as NodeListOf<HTMLInputElement>;
                                for (let i = 0; i < inputs.length; i++) {
                                  if (inputs[i].files && inputs[i].files!.length > 0) {
                                    file = inputs[i].files![0];
                                    break;
                                  }
                                }
                              }

                              if (file && file.size > 0) {
                                changedFiles.push({ docLabel, file });
                                if (docLabel === 'Letter of Intent' && jobId) {
                                  attachJobId = true;
                                }
                              }
                            }

                            if (changedFiles.length > 0) {
                              const batchUploadFormData = new FormData();
                              for (const item of changedFiles) {
                                batchUploadFormData.append("files", item.file);
                                batchUploadFormData.append("documentNames", item.docLabel);
                              }
                              if (attachJobId && jobId) {
                                batchUploadFormData.append('jobClusterId', jobId.toString());
                              }

                              const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/documents`, {
                                method: 'POST',
                                body: batchUploadFormData
                              });

                              if (uploadRes.ok) {
                                const uploadResult = await uploadRes.json().catch(() => ({}));
                                if (uploadResult.documents) {
                                  if (userData && userData.other_information) {
                                    if (typeof userData.other_information === 'string') {
                                      try {
                                        const parsed = JSON.parse(userData.other_information);
                                        parsed.documents = { ...(parsed.documents || {}), ...uploadResult.documents };
                                        userData.other_information = parsed;
                                      } catch { }
                                    } else {
                                      userData.other_information.documents = { ...(userData.other_information.documents || {}), ...uploadResult.documents };
                                    }
                                  }
                                  if (otherInfo) {
                                    otherInfo.documents = { ...(otherInfo.documents || {}), ...uploadResult.documents };
                                  }
                                }
                                setSelectedFiles({});
                                setSelectedDocumentNames({});
                                setSelectedDocumentUrls({});
                                const fileInputs = form.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
                                fileInputs.forEach((input) => { input.value = ''; });
                              } else {
                                const errData = await uploadRes.json().catch(() => ({}));
                                console.error('Failed to upload documents:', errData);
                                Swal.fire("Warning", `Failed to upload documents: ${errData.message || 'Unknown error'}`, "warning");
                              }
                            }
                          } catch (e) {
                            console.error("Document upload failed", e);
                            Swal.fire("Error", "An unexpected error occurred while uploading documents.", "error");
                          }

                          // If they are applying for a job, hit apply-job
                          if (
                            jobId &&
                            jobTitle !== "Profile Update" &&
                            applicantId
                          ) {
                            try {
                              const applyResponse = await fetch(
                                `${import.meta.env.VITE_API_URL}/api/applicants/apply-job`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    applicantId: applicantId,
                                    positionId: jobId,
                                    jobTitle: jobTitle,
                                  }),
                                },
                              );
                              if (!applyResponse.ok) {
                                applySuccess = false;
                                const err = await applyResponse.json();
                                Swal.fire(
                                  "Error",
                                  err.message ||
                                  "Failed to submit application.",
                                  "error",
                                );
                              }
                            } catch (e) {
                              applySuccess = false;
                              Swal.fire(
                                "Error",
                                "Failed to submit application.",
                                "error",
                              );
                            }
                          }

                          if (applySuccess) {
                            if (jobId && jobTitle !== "Profile Update") {
                              Swal.fire(

                                "Success",
                                "Application submitted successfully!",
                                "success",
                              ).then(() => {
                                const basePath = import.meta.env.VITE_BASE_PATH || '/';
                                window.location.href = basePath.endsWith('/') ? basePath + "applicant-dashboard" : basePath + "/applicant-dashboard";
                              });
                            } else if (method === "POST") {
                              Swal.fire(
                                "Success",
                                `Profile created successfully! Your Applicant ID is ${resData.data.applicant_number}`,
                                "success",
                              ).then(() => {
                                const basePath = import.meta.env.VITE_BASE_PATH || '/';
                                window.location.href = basePath.endsWith('/') ? basePath + "applicant-dashboard" : basePath + "/applicant-dashboard";
                              });
                            } else {
                              Swal.fire(
                                "Success",
                                "Profile updated successfully!",
                                "success",
                              ).then(() => {
                                window.location.reload();
                              });
                            }
                            onClose();
                          }
                        } else {
                          const errorData = await response.json();
                          Swal.fire(
                            "Error",
                            errorData.message || "Operation failed",
                            "error",
                          );
                        }
                      } catch (error) {
                        console.error("Error:", error);
                        Swal.fire(
                          "Warning",
                          "Data collected but backend is unreachable. Please ensure the backend server is running and accessible.",
                          "warning",
                        );
                        onClose();
                      }
                    }
                  }}
                  className="px-8 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded transition-colors shadow-sm"
                >
                  {jobTitle === "General Registration"
                    ? "REGISTER"
                    : jobTitle === "Profile Update"
                      ? "SAVE PROFILE"
                      : "SUBMIT APPLICATION"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}










