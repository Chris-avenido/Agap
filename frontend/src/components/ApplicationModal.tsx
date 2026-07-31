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
import { regions, provinces, city_mun, barangays } from "phil-reg-prov-mun-brgy";
// @ts-ignore
import ModernDatePicker from "./ModernDatePicker";
import { calculateProfileProgress, parseProfileToState } from "../utils/profileProgress";

const ETHNIC_GROUPS = [
  "ABELING", "ABELLEN", "ABELLING", "ABERLING", "ABIYAN (AETA)", "ADASEN", "AETA", "AGTA-AGAY", "AGTA-CIMARON", "AGTA-DUMAGAT", "AGTA-TABANGNON", "AGTA-TABOY", "AGUTAYNON", "AKEANON", "ALAB", "ALANGAN", "ALANGAN MANGYAN", "AMBALA", "APAYAO", "AROMANEN-MANOBO", "AROMANON", "ATA", "ATA-MANOBO", "ATI", "BADJAO", "BADJAO, SAMA LAUT", "BAGKALOT", "BAGO", "BAGOBO", "BAGOBO-TAGABAWA", "BALATOC", "BALIWON", "BALUGA", "BANAO", "BANGON", "BANTOANON", "BANWAON", "BARLIG", "BASAO", "BATAK", "BATANGAN", "BATANGAN MANGYAN", "BELWANG", "BIKOL/BICOL", "BINONGAN", "BISAYA/BINISAYA", "BLAAN", "BOHOLANO", "BONTOK", "BUGKALOT", "BUHID", "BUHID MANGYAN", "BUKIDNON", "BUTBUT", "CAGALUAN", "CAGAYANEN", "CALINGA", "CAPIZEÑO", "CAVITEÑO", "CEBUANO", "CHAVACANO", "CHINESE", "CIMARON", "COTABATEÑO", "COTABATEÑO-CHAVACANO", "CUYONEN", "CUYUNON", "DACALAN", "DAGAYNEN", "DANAK", "DANANAO", "DAVAO-CHAVACANO", "DAVAWEÑO", "DIANGAN", "DIBABAWON", "DIBABEEN MULITAAN", "DIBABEN", "DIRERAYAAN", "DULANGAN", "DUMAGAT-ALTA", "DUMAGAT-REMONTADO", "ESCAYA", "GADDANG", "GUBANG", "GUBATNON", "GUBATNON MANGYAN", "GUIANGAN", "GUILAYON", "GUINAANG", "HALAWODNON", "HANUNUO", "HANUNUO MANGYAN", "HENANGA", "HIGAONON", "HILIGAYNON/LLONGGO", "IABANAG", "IBALOY", "IBATAN", "IFUGAO", "IKALAHAN", "ILAUD", "ILIANEN", "ILOCANO", "IRANON", "IRAYA", "IRAYA MANGYAN", "ISAROG", "ISINAI", "ISOROKEN", "ITAWES", "ITAWIA", "ITNEG", "ITOM", "IVATAN", "JAMA MAPON", "KABAYUKAN", "KABIHUG", "KADAKLAN/KACHAKRAN", "KAILAWAN/KAYLAWAN", "KALAGAN", "KALANGUYA", "KALIBUGAN", "KALIBUGAN/KOLIBUGAN", "KALINGA", "KAMAYO", "KAMIGIN", "KAMIGUIN", "KANKANAEY", "KANKANAEY IBENGUET", "KANKANAEY IYAPLAY", "KAPAMPANGAN", "KARINTIK", "KARULANO", "KAUNANA", "KEN-EY", "KIRENTEKEN", "KLATA", "KONGKING", "KOROLANON", "LAHITANEN", "LAMBANGIAN", "LAMBANGLAN", "LANGILAN", "LIVUNGANEN", "LLONGOT", "LUBO", "LUBUAGAN", "MABAKA", "MAENG", "MAG-ANTI", "MAG-ANTSI", "MAG-INDI", "MAGAHAT", "MAGBEKIN", "MAGBUKON", "MAGKUNANA", "MAGUINDANAO", "MAJOKAYONG", "MALAWEG/MALAUEG", "MALBONG", "MAMANWA", "MANDAYA", "MANDEK-EY", "MANDUKAYAN", "MANGALI", "MANGGUANGAN", "MANOBO", "MANOBO B\"LIT", "MANOBO-DULANGAN", "MANOBO-UBO", "MANSAKA", "MARANAO", "MASADIIT", "MASBATEÑO/MASBATENON", "MATIGSALOG", "MAYUDAN", "MOLBOG", "NANENG", "NEGRITO", "OBU-MANUVU", "PALA WAN", "PALAWAN-O", "PALAWANI", "PALAWANON", "PAN-AYANON", "PANAY-BUKIDNON", "PANGASINAN/PANGGALATO", "PARANANUM", "PUGOT", "PULANGIEN", "PULANGIYEN", "PULLON", "RATAGNON", "RATAGNON MANGYAN", "REMONTADO", "SADANGA", "SAKKI", "SALEGSEG", "SAMA", "SAMA BADJAO", "SAMA BANGINGI", "SAMA LAUT", "SAMAL", "SANGIL", "SIBUYAN MANGYAN-TAGABUKID", "SUBANEN", "SULOD/BUDIKNON", "SUMADEL", "T-BOLI", "TABANGON", "TADYAWAN", "TADYAWAN MANGYAN", "TAGABAWA", "TAGAKAOLO", "TAGALOG", "TAGANUA", "TAGAWAHANON", "TAGBANUA", "TAGBANUA/KALAMIANEN", "TALAANDIG", "TALAINGOD", "TALAINGOD, LANGILAN", "TALOCTOK", "TAO'T BATO", "TAU-BUID", "TAUSUG", "TAUT-BATO", "TBOLI", "TEDURAY", "TIGWAHANON", "TINANANEN", "TINGGLAN", "TINGGUIAN", "TINGLAYAN", "TIRURAY", "TONGLAYAN", "TULGAO", "UBO MANOBO", "UBO-MANOBO", "UMAYAMNON", "WARAY", "YAKAN", "YAPAYAO", "YBANAG", "YOGAD", "ZAMBAL"
];

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: number | null;
  viewMode?: 'pds' | 'vacancy-details';
  jobData?: any;
}

const formatCurrencyValue = (val: any) => {
  if (val === null || val === undefined) return '';
  const strVal = String(val);
  if (!strVal) return '';
  
  const clean = strVal.replace(/[^0-9.]/g, '');
  if (!clean) return '';
  
  const parts = clean.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  if (parts.length > 1) {
    const decimalPart = parts[1].slice(0, 2);
    return `${integerPart}.${decimalPart}`;
  }
  
  return integerPart;
};

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
          "doc_pds": "Personal Data Sheet",
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
          "profile_photo": "profile_photo"
        };

        for (const key of Object.keys(docMapping)) {
          const docLabel = docMapping[key];
          let file = formData.get(key) as File;
          if (selectedFiles[docLabel] && selectedFiles[docLabel].size > 0) {
            file = selectedFiles[docLabel];
          }
          if (file && file.size > 0) {
            const singleUploadFormData = new FormData();
            singleUploadFormData.append("files", file);
            singleUploadFormData.append("documentNames", docLabel);
            await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${sessionId}/documents`, {
              method: 'POST',
              body: singleUploadFormData
            }).catch(() => {});
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

  const resProvincesList = useMemo(
    () => (resRegion ? provinces.filter((p: any) => p.reg_code === resRegion) : []),
    [resRegion],
  );
  const resCitiesList = useMemo(
    () => (resProvince ? city_mun.filter((c: any) => c.prov_code === resProvince) : []),
    [resProvince],
  );
  const resBarangaysList = useMemo(
    () => (resCity ? barangays.filter((b: any) => b.mun_code === resCity) : []),
    [resCity],
  );

  const permProvincesList = useMemo(
    () => (permRegion ? provinces.filter((p: any) => p.reg_code === permRegion) : []),
    [permRegion],
  );
  const permCitiesList = useMemo(
    () => (permProvince ? city_mun.filter((c: any) => c.prov_code === permProvince) : []),
    [permProvince],
  );
  const permBarangaysList = useMemo(
    () => (permCity ? barangays.filter((b: any) => b.mun_code === permCity) : []),
    [permCity],
  );

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
        if (typeof flatVal === 'string') return flatVal.toLowerCase();
        if (qRes[id] && qRes[id].answer) return qRes[id].answer.toLowerCase();
        if (qRes[keyWithQ] && qRes[keyWithQ].answer) return qRes[keyWithQ].answer.toLowerCase();
        return '';
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
        
        if (id === '40b_ethnic' && !a && userData?.ethnic_group) {
          a = userData.ethnic_group !== 'No' ? 'yes' : 'no';
          d = userData.ethnic_group !== 'No' ? userData.ethnic_group : '';
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
  delete storedDocuments['Letter of Intent'];

  const getDocUrl = (docName: string) => {
    const url = storedDocuments?.[docName];
    if (!url) return null;
    if (url.startsWith("http")) {
      return `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const getStoredDocFileName = (docName: string) => {
    const url = storedDocuments?.[docName];
    if (!url || typeof url !== "string") return "";

    const rawFileName = url.split("?")[0].split("/").pop() || "";
    try {
      return decodeURIComponent(rawFileName);
    } catch {
      return rawFileName;
    }
  };

  const requiredDocuments = useMemo(() => {
    const docs = [
      { label: 'Personal Data Sheet', inputName: 'doc_pds' },
      { label: 'Work Experience Sheet', inputName: 'doc_work_exp' },
      { label: 'Certificate of Eligibility', inputName: 'doc_eligibility' },
      { label: 'Transcript of Records', inputName: 'doc_tor' },
      { label: 'Updated PRC License/ID', inputName: 'doc_prc' },
    ];
    if (!isRegistrationFlow) {
      docs.push({ label: 'Letter of Intent', inputName: 'doc_loi' });
    }
    return docs;
  }, [isRegistrationFlow]);

  const { steps: completedSteps, percentage, totalSteps } = useMemo(() => {
    const _v = formVersion;

    const fd = formRef.current ? new FormData(formRef.current) : null;
    const getVal = (name: string, fallback: any) => {
      if (fd && fd.has(name)) {
        const val = fd.get(name) as string;
        if (val && val.trim()) return val.trim();
      }
      return fallback;
    };

    const hasSelectedFile = (inputName: string) => {
      const file = fd?.get(inputName);
      return file instanceof File && file.size > 0;
    };

    const parsedData = parseProfileToState(userData);

    const liveFirstName = getVal('first_name', parsedData.firstName);
    const liveLastName = getVal('surname', getVal('last_name', parsedData.lastName));
    const livePlaceOfBirth = getVal('place_of_birth', parsedData.placeOfBirth);
    const liveSex = sex || getVal('sex', parsedData.sex);
    const liveCivilStatus = getVal('civil_status', parsedData.civilStatus);
    const liveCitizenship = getVal('citizenship', parsedData.citizenship);

    const liveMotherSurname = getVal('mother_surname', parsedData.motherSurname);
    const liveMotherFirst = getVal('mother_first_name', parsedData.motherFirst);
    const liveFatherSurname = getVal('father_surname', parsedData.fatherSurname);
    const liveFatherFirst = getVal('father_first_name', parsedData.fatherFirst);
    const liveSpouseSurname = getVal('spouse_surname', parsedData.spouseSurname);
    const liveSpouseFirst = getVal('spouse_first_name', parsedData.spouseFirst);

    const liveEdSchools = [
      getVal('edu_0_school_name', ''),
      getVal('edu_1_school_name', ''),
      getVal('edu_2_school_name', ''),
      getVal('edu_3_school_name', ''),
      getVal('edu_4_school_name', '')
    ];
    const liveEdDates = { ...parsedData.educationalDates };
    if (liveEdSchools.some(s => s.length > 0)) {
      liveEdDates['elementary'] = { school: liveEdSchools.find(s => s.length > 0) };
    }

    const localDocs: Record<string, boolean> = {
      'Personal Data Sheet': Boolean(selectedFiles['Personal Data Sheet'] || hasSelectedFile('doc_pds')),
      'Work Experience Sheet': Boolean(selectedFiles['Work Experience Sheet'] || hasSelectedFile('doc_work_exp')),
      'Certificate of Eligibility': Boolean(selectedFiles['Certificate of Eligibility'] || hasSelectedFile('doc_eligibility')),
      'Transcript of Records': Boolean(selectedFiles['Transcript of Records'] || hasSelectedFile('doc_tor')),
      'Updated PRC License/ID': Boolean(selectedFiles['Updated PRC License/ID'] || hasSelectedFile('doc_prc')),
      'Letter of Intent': Boolean(selectedFiles['Letter of Intent'] || hasSelectedFile('doc_loi'))
    };

    const data = {
      ...parsedData,
      firstName: liveFirstName,
      lastName: liveLastName,
      placeOfBirth: livePlaceOfBirth,
      sex: liveSex,
      civilStatus: liveCivilStatus,
      citizenship: liveCitizenship,
      motherSurname: liveMotherSurname,
      motherFirst: liveMotherFirst,
      fatherSurname: liveFatherSurname,
      fatherFirst: liveFatherFirst,
      spouseSurname: liveSpouseSurname,
      spouseFirst: liveSpouseFirst,
      educationalDates: liveEdDates,
      civilServiceList: (civilServiceList && civilServiceList.length > 0) ? civilServiceList : parsedData.civilServiceList,
      workExperienceList: (workExperienceList && workExperienceList.length > 0) ? workExperienceList : parsedData.workExperienceList,
      voluntaryWorkList: (voluntaryWorkList && voluntaryWorkList.length > 0) ? voluntaryWorkList : parsedData.voluntaryWorkList,
      learningDevelopmentList: (learningDevelopmentList && learningDevelopmentList.length > 0) ? learningDevelopmentList : parsedData.learningDevelopmentList,
      skillsList: (skillsList && skillsList.some((s: any) => typeof s === 'string' ? s.trim() !== '' : Boolean(s?.value))) ? skillsList : parsedData.skillsList,
      distinctionsList: (distinctionsList && distinctionsList.some((d: any) => typeof d === 'string' ? d.trim() !== '' : Boolean(d?.value))) ? distinctionsList : parsedData.distinctionsList,
      membershipsList: (membershipsList && membershipsList.some((m: any) => typeof m === 'string' ? m.trim() !== '' : Boolean(m?.value))) ? membershipsList : parsedData.membershipsList,
      questionnaire: (qAnswers && Object.values(qAnswers).some((v: any) => typeof v === 'string' && v.trim() !== '')) ? qAnswers : (qRes || parsedData.questionnaire),
      documents: localDocs,
      isSubsequentApplication: !isRegistrationFlow,
      context: (jobTitle === "Profile Update" ? "my-profile" : "apply-now") as "my-profile" | "apply-now"
    };

    return calculateProfileProgress(data);
  }, [
    userData, isRegistrationFlow, formVersion, selectedFiles, sex, civilServiceList, workExperienceList, voluntaryWorkList, learningDevelopmentList, skillsList, distinctionsList, membershipsList, qRes, qAnswers
  ]);

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
                      className={`w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full flex items-center justify-center shrink-0 ${isActive || isCompleted ? "bg-[#34a853]" : "bg-gray-100"}`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive || isCompleted ? "text-white" : "text-gray-300"}`}
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
              <div
                className={
                  activeTab === "C1"
                    ? "space-y-8 animate-in fade-in slide-in-from-bottom-2"
                    : "hidden"
                }
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        First Name <span className="text-red-500">*</span>
                      </span>
                      <input name="first_name"
                        required
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        type="text"
                        defaultValue={userData?.first_name || ""}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Middle Name
                      </span>
                      <input
                        placeholder="Enter middle name"
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                        type="text"
                        name="middle_name"
                        defaultValue={userData?.middle_name || ""}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </span>
                      <input
                        required
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        type="text"
                        name="surname"
                        defaultValue={userData?.surname || ""}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Extension Name
                      </span>
                      <input
                        placeholder="Enter extension name"
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                        type="text"
                        name="extension_name"
                        defaultValue={otherInfo?.extension_name || otherInfo?.extensionName || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Birth Details <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-[35%] flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Date of Birth <span className="text-red-500">*</span>
                      </span>
                      <ModernDatePicker
                        required
                        placeholder="Select date of birth"
                        className="w-full border border-gray-300 bg-white rounded p-2.5 text-[14px] outline-none cursor-pointer focus:border-blue-500 text-gray-700 " name="date_of_birth"
                        defaultValue={
                          userData?.date_of_birth
                            ? userData.date_of_birth.split("T")[0]
                            : ""
                        }
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        City, town, etc. <span className="text-red-500">*</span>
                      </span>
                      <input name="place_of_birth"
                        required
                        placeholder="Enter place of birth"
                        className="w-full border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]"
                        type="text"
                        defaultValue={userData?.place_of_birth || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
                    Sex <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setSex("MALE")}
                      className={`${sex?.toUpperCase() === "MALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500"} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === "MALE" ? "bg-white" : "bg-gray-400"}`}
                      ></div>{" "}
                      MALE
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex("FEMALE")}
                      className={`${sex?.toUpperCase() === "FEMALE" ? "bg-[#3498db] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"} border border-gray-200 px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === "FEMALE" ? "bg-white" : "bg-gray-400"}`}
                      ></div>{" "}
                      FEMALE
                    </button>
                    <input type="hidden" name="sex" value={sex} />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
                    Civil Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="civil_status"
                    defaultValue={userData?.civil_status || ""}
                    required
                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 min-w-[200px] h-[42px] "
                  >
                    <option value="">Select civil status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Statistics <span className="text-red-500">*</span>
                    <div className="text-[10px] text-gray-400 font-normal mt-0.5 leading-tight">
                      Specify your Height,
                      <br />
                      Weight, and Blood Type
                    </div>
                  </label>
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Height <span className="text-red-500">*</span>
                      </span>
                      <div className="flex">
                        <input
                          required
                          placeholder="Enter height"
                          className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                          type="text"
                          name="height"
                          defaultValue={otherInfo?.height || ""}
                        />
                        <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">
                          m
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Weight <span className="text-red-500">*</span>
                      </span>
                      <div className="flex">
                        <input
                          required
                          placeholder="Enter weight"
                          className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                          type="text"
                          name="weight"
                          defaultValue={otherInfo?.weight || ""}
                        />
                        <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">
                          kg
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Blood Type <span className="text-red-500">*</span>
                      </span>
                      <select
                        name="blood_type"
                        defaultValue={userData?.blood_type || ""}
                        required
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
                    Agency Employee No.
                    <br />
                    <span className="text-[12px] text-gray-400 font-normal">
                      (if any)
                    </span>
                  </label>
                  <input
                    name="agency_employee_no"
                    placeholder="Enter agency employee number"
                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                    type="text"
                    defaultValue={otherInfo?.agency_employee_no || otherInfo?.agencyEmployeeNo || ""}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
                    Religion
                  </label>
                  <input
                    name="religion"
                    placeholder="Enter religion"
                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                    type="text"
                    defaultValue={userData?.religion || ""}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">
                    Citizenship <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
                    <select
                      name="citizenship"
                      defaultValue={userData?.citizenship || ""}
                      required
                      className="w-full sm:w-[240px] border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px]"
                    >
                      <option value="">Enter citizenship</option>
                      <option value="Filipino">Filipino</option>
                      <option value="Dual Citizenship">Dual Citizenship</option>
                    </select>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                        <input
                          className="w-3.5 h-3.5 text-blue-600 border-gray-300"
                          type="radio"
                          name="citizenship_type"
                          value="by Birth"
                          defaultChecked={
                            otherInfo?.citizenship_type?.toLowerCase() === "by birth" ||
                            otherInfo?.citizenshipType?.toLowerCase() === "by birth"
                          }
                        />
                        by Birth
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                        <input
                          className="w-3.5 h-3.5 text-blue-600 border-gray-300"
                          type="radio"
                          name="citizenship_type"
                          value="by Naturalization"
                          defaultChecked={
                            otherInfo?.citizenship_type?.toLowerCase() === "by naturalization" ||
                            otherInfo?.citizenshipType?.toLowerCase() === "by naturalization"
                          }
                        />
                        by Naturalization
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            House / Block / Lot No.
                          </span>
                          <input
                            placeholder="Enter house / block / lot No."
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                            type="text"
                            name="res_house"
                            defaultValue={resAddress?.house || ""}
                          />
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            Street
                          </span>
                          <input
                            placeholder="Enter street"
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                            type="text"
                            name="res_street"
                            defaultValue={resAddress?.street || ""}
                          />
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            Subdivision / Village
                          </span>
                          <input
                            name="res_subdivision"
                            placeholder="Enter subdivision / village"
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                            type="text"
                            defaultValue={resAddress?.subdivision || ""}
                          />
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            ZIP Code
                          </span>
                          <input
                            placeholder="Enter ZIP code"
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                            type="text"
                            name="res_zip"
                            defaultValue={resAddress?.zip || ""}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            Region
                          </span>
                          <select
                            name="res_region"
                            value={resRegion}
                            onChange={(e: any) => {
                              setResRegion(e.target.value);
                              setResProvince("");
                              setResCity("");
                            }}
                            required
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                          >
                            <option value="">Select region</option>
                            {regions.map((r: any, idx: number) => (
                              <option
                                key={`${r.reg_code}-${idx}`}
                                value={r.reg_code}
                              >
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            Province
                          </span>
                          <select
                            name="res_province"
                            value={resProvince}
                            onChange={(e: any) => {
                              setResProvince(e.target.value);
                              setResCity("");
                            }}
                            required
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                            disabled={!resRegion}
                          >
                            <option value="">Select province</option>
                            {resProvincesList.map((p: any, idx: number) => (
                              <option
                                key={`${p.prov_code}-${idx}`}
                                value={p.prov_code}
                              >
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            City / Municipality
                          </span>
                          <select
                            name="res_city"
                            value={resCity}
                            onChange={(e: any) => {
                              setResCity(e.target.value);
                              setResBarangay("");
                            }}
                            required
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                            disabled={!resProvince}
                          >
                            <option value="">Select city / municipality</option>
                            {resCitiesList.map((c: any, idx: number) => (
                              <option
                                key={`${c.mun_code}-${idx}`}
                                value={c.mun_code}
                              >
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                            Barangay
                          </span>
                          <select
                            name={isResBarangayOther ? undefined : "res_barangay"}
                            value={isResBarangayOther ? "OTHER" : resBarangay}
                            onChange={(e) => setResBarangay(e.target.value)}
                            required
                            className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                            disabled={!resCity}
                          >
                            <option value="">Select barangay</option>
                            {resBarangaysList.map((b: any, idx: number) => (
                              <option key={`${b.name}-${idx}`} value={b.name}>
                                {b.name}
                              </option>
                            ))}
                            <option value="OTHER">Other</option>
                          </select>
                          {isResBarangayOther && (
                            <div className="mt-2">
                              <input
                                type="text"
                                name={isResBarangayOther ? "res_barangay" : undefined}
                                required
                                placeholder="Type your barangay"
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                value={resBarangay === "OTHER" ? "" : resBarangay}
                                onChange={(e) => setResBarangay(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Permanent Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex flex-col gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 mb-1">
                      <input
                        className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded"
                        type="checkbox"
                        checked={sameAsRes}
                        onChange={(e) => setSameAsRes(e.target.checked)}
                        name="same_as_res"
                      />
                      <span className="font-bold">
                        Same as Residential Address?
                      </span>{" "}
                      <span className="italic text-gray-400">
                        (check if permanent address is same with the above
                        address)
                      </span>
                    </label>
                    {!sameAsRes && (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              House / Block / Lot No.
                            </span>
                            <input
                              name="perm_house"
                              placeholder="Enter house / block / lot No."
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              type="text"
                              defaultValue={permAddress?.house || ""}
                            />
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              Street
                            </span>
                            <input
                              name="perm_street"
                              placeholder="Enter street"
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              type="text"
                              defaultValue={permAddress?.street || ""}
                            />
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              Subdivision / Village
                            </span>
                            <input
                              name="perm_subdivision"
                              placeholder="Enter subdivision / village"
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              type="text"
                              defaultValue={permAddress?.subdivision || ""}
                            />
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              ZIP Code
                            </span>
                            <input
                              name="perm_zip"
                              placeholder="Enter ZIP code"
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              type="text"
                              defaultValue={permAddress?.zip || ""}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              Region
                            </span>
                            <select
                              name="perm_region"
                              value={permRegion}
                              onChange={(e: any) => {
                                setPermRegion(e.target.value);
                                setPermProvince("");
                                setPermCity("");
                              }}
                              required
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                            >
                              <option value="">Select region</option>
                              {regions.map((r: any, idx: number) => (
                                <option
                                  key={`${r.reg_code}-${idx}`}
                                  value={r.reg_code}
                                >
                                  {r.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              Province
                            </span>
                            <select
                              name="perm_province"
                              value={permProvince}
                              onChange={(e: any) => {
                                setPermProvince(e.target.value);
                                setPermCity("");
                              }}
                              required
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                              disabled={!permRegion}
                            >
                              <option value="">Select province</option>
                              {permProvincesList.map((p: any, idx: number) => (
                                <option
                                  key={`${p.prov_code}-${idx}`}
                                  value={p.prov_code}
                                >
                                  {p.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              City / Municipality
                            </span>
                            <select
                              name="perm_city"
                              value={permCity}
                              onChange={(e: any) => {
                                setPermCity(e.target.value);
                                setPermBarangay("");
                              }}
                              required
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                              disabled={!permProvince}
                            >
                              <option value="">
                                Select city / municipality
                              </option>
                              {permCitiesList.map((c: any, idx: number) => (
                                <option
                                  key={`${c.mun_code}-${idx}`}
                                  value={c.mun_code}
                                >
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col justify-between h-full">
                            <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                              Barangay
                            </span>
                            <select
                              name={isPermBarangayOther ? undefined : "perm_barangay"}
                              value={isPermBarangayOther ? "OTHER" : permBarangay}
                              onChange={(e) => setPermBarangay(e.target.value)}
                              required
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                              disabled={!permCity}
                            >
                              <option value="">Select barangay</option>
                              {permBarangaysList.map((b: any, idx: number) => (
                                <option key={`${b.name}-${idx}`} value={b.name}>
                                  {b.name}
                                </option>
                              ))}
                              <option value="OTHER">Other</option>
                            </select>
                            {isPermBarangayOther && (
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name={isPermBarangayOther ? "perm_barangay" : undefined}
                                  required
                                  placeholder="Type your barangay"
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  value={permBarangay === "OTHER" ? "" : permBarangay}
                                  onChange={(e) => setPermBarangay(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Contact Nos.
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Telephone No. <span className="text-gray-400 font-normal italic text-[10px]">(Optional)</span>
                      </span>
                      <input name="telephone_no"
                        placeholder="Enter telephone no."
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        type="text"
                        defaultValue={userData?.telephone_no || ""}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Mobile No. <span className="text-red-500">*</span>
                      </span>
                      <input
                        required
                        placeholder="Enter mobile no."
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        type="text"
                        name="mobile_no"
                        defaultValue={userData?.mobile_no || ""}
                        maxLength={11}
                        onInput={(e: any) => { e.target.value = e.target.value.replace(/\D/g, '') }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Primary <span className="text-red-500">*</span>
                      </span>
                      <input
                        name="email"
                        required
                        autoComplete="email"
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                        type="email"
                        defaultValue={
                          userData?.email_address || userData?.email || ""
                        }
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Alternate
                      </span>
                      <input name="alternate_email"
                        placeholder="Enter alternate email"
                        autoComplete="email"
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        type="email"
                        defaultValue={userData?.alternate_email || ""}
                      />
                    </div>
                  </div>
                </div>
                {jobTitle === "General Registration" && (
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                    <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                          Create Password <span className="text-red-500">*</span>
                        </span>
                        <input
                          name="password"
                          required
                          autoComplete="new-password"
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full normal-case"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                          Confirm Password <span className="text-red-500">*</span>
                        </span>
                        <input
                          name="confirm_password"
                          required
                          autoComplete="new-password"
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full normal-case"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* C2: Family Background */}
              <div className={activeTab === 'C2' ? "space-y-8 animate-in fade-in slide-in-from-bottom-2" : "hidden"}>

                {/* Spouse's Name Row */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Name</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                      <input name="spouse_surname" defaultValue={familyBackground?.spouse?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                      <input name="spouse_first_name" defaultValue={familyBackground?.spouse?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                      <input name="spouse_middle_name" defaultValue={familyBackground?.spouse?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
                      <input name="spouse_name_extension" defaultValue={familyBackground?.spouse?.name_extension || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="E.G. JR., SR" />
                    </div>
                  </div>
                </div>

                {/* Spouse's Details Row */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Details</label>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Occupation</span>
                        <input name="spouse_occupation" defaultValue={familyBackground?.spouse?.occupation || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER OCCUPATION" />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Employer/Business Name</span>
                        <input name="spouse_employer_business_name" defaultValue={familyBackground?.spouse?.employer_business_name || familyBackground?.spouse?.employer || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER EMPLOYER/BUSINESS NAME" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Business Address</span>
                        <input name="spouse_business_address" defaultValue={familyBackground?.spouse?.business_address || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER BUSINESS ADDRESS" />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                        <input name="spouse_telephone_no" defaultValue={familyBackground?.spouse?.telephone_no || familyBackground?.spouse?.telephone || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER TELEPHONE NO." />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Father's Name Row */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Father's Name</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                      <input name="father_surname" defaultValue={familyBackground?.father?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                      <input name="father_first_name" defaultValue={familyBackground?.father?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                      <input name="father_middle_name" defaultValue={familyBackground?.father?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
                      <input name="father_name_extension" defaultValue={familyBackground?.father?.name_extension || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="E.G. JR., SR" />
                    </div>
                  </div>
                </div>

                {/* Mother's Maiden Name Row */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Mother's Maiden Name</label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                      <input name="mother_surname" defaultValue={familyBackground?.mother?.maiden_surname || familyBackground?.mother?.surname || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" type="text" placeholder="ENTER SURNAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                      <input name="mother_first_name" defaultValue={familyBackground?.mother?.first_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER FIRST NAME" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                      <input name="mother_middle_name" defaultValue={familyBackground?.mother?.middle_name || ""} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER MIDDLE NAME" />
                    </div>
                  </div>
                </div>

                {/* Children Details Row */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2 flex flex-col">
                    Children Details
                    <span className="text-[10px] text-gray-400 font-normal italic mt-0.5">(List all children)</span>
                  </label>
                  <div className="flex-1 flex flex-col gap-4">
                    {childrenList.map((child: any, idx: number) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of Child (Write full name)</span>
                          <input value={child.name || ''} onChange={(e: any) => { const n = [...childrenList]; n[idx].name = e.target.value; setChildrenList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" type="text" placeholder="ENTER CHILD'S FULL NAME" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Birth</span>
                          <ModernDatePicker value={typeof child.dob === 'string' && child.dob.includes('T') ? child.dob.split('T')[0] : (child.dob || '')} onChange={(val: any) => { const n = [...childrenList]; n[idx].dob = val; setChildrenList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                        </div>
                        <button type="button" onClick={() => setChildrenList(childrenList.filter((_: any, i: number) => i !== idx))} className="h-[42px] px-4 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 rounded flex items-center justify-center transition-colors bg-white shadow-sm shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setChildrenList([...childrenList, { name: '', dob: null }])} className="mt-2 text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-4 py-2 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Child
                    </button>
                  </div>
                </div>

                {/* Hidden Input to store children array for form submission */}
                <input type="hidden" name="children_list" value={JSON.stringify(childrenList)} />

              </div>

              {/* C3: Educational Background */}
              <div
                className={
                  activeTab === "C3"
                    ? "w-full animate-in fade-in slide-in-from-bottom-2"
                    : "hidden"
                }
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Elementary
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Name of School (Write in full)
                      </span>

                      <input
                        type="text"
                        name="edu_0_school_name" defaultValue={eduBg[0]?.school_name || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Basic Education/Degree/Course
                      </span>

                      <input
                        type="text"
                        name="edu_0_degree_course" defaultValue={eduBg[0]?.degree_course || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Period of Attendance (From - To)
                      </span>

                      <div className="flex items-center gap-2">
                        <ModernDatePicker name="edu_0_period_from" defaultValue={eduBg[0]?.period_from || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                        <span className="text-gray-400">-</span>
                        <ModernDatePicker name="edu_0_period_to" defaultValue={eduBg[0]?.period_to || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Highest Level/Units Earned
                      </span>

                      <input
                        type="text"
                        name="edu_0_highest_level" defaultValue={eduBg[0]?.highest_level || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Year Graduated
                      </span>

                      <input
                        type="text"
                        name="edu_0_year_graduated" defaultValue={eduBg[0]?.year_graduated || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Secondary
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Name of School (Write in full)
                      </span>

                      <input
                        type="text"
                        name="edu_1_school_name" defaultValue={eduBg[1]?.school_name || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Basic Education/Degree/Course
                      </span>

                      <input
                        type="text"
                        name="edu_1_degree_course" defaultValue={eduBg[1]?.degree_course || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Period of Attendance (From - To)
                      </span>

                      <div className="flex items-center gap-2">
                        <ModernDatePicker name="edu_1_period_from" defaultValue={eduBg[1]?.period_from || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                        <span className="text-gray-400">-</span>
                        <ModernDatePicker name="edu_1_period_to" defaultValue={eduBg[1]?.period_to || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Highest Level/Units Earned
                      </span>

                      <input
                        type="text"
                        name="edu_1_highest_level" defaultValue={eduBg[1]?.highest_level || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Year Graduated
                      </span>

                      <input
                        type="text"
                        name="edu_1_year_graduated" defaultValue={eduBg[1]?.year_graduated || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Vocational / Trade Course
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Name of School (Write in full)
                      </span>

                      <input
                        type="text"
                        name="edu_2_school_name" defaultValue={eduBg[2]?.school_name || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Basic Education/Degree/Course
                      </span>

                      <input
                        type="text"
                        name="edu_2_degree_course" defaultValue={eduBg[2]?.degree_course || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Period of Attendance (From - To)
                      </span>

                      <div className="flex items-center gap-2">
                        <ModernDatePicker name="edu_2_period_from" defaultValue={eduBg[2]?.period_from || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                        <span className="text-gray-400">-</span>
                        <ModernDatePicker name="edu_2_period_to" defaultValue={eduBg[2]?.period_to || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Highest Level/Units Earned
                      </span>

                      <input
                        type="text"
                        name="edu_2_highest_level" defaultValue={eduBg[2]?.highest_level || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Year Graduated
                      </span>

                      <input
                        type="text"
                        name="edu_2_year_graduated" defaultValue={eduBg[2]?.year_graduated || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    College
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Name of School (Write in full)
                      </span>

                      <input
                        type="text"
                        name="edu_3_school_name" defaultValue={eduBg[3]?.school_name || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Basic Education/Degree/Course
                      </span>

                      <input
                        type="text"
                        name="edu_3_degree_course" defaultValue={eduBg[3]?.degree_course || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Period of Attendance (From - To)
                      </span>

                      <div className="flex items-center gap-2">
                        <ModernDatePicker name="edu_3_period_from" defaultValue={eduBg[3]?.period_from || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                        <span className="text-gray-400">-</span>
                        <ModernDatePicker name="edu_3_period_to" defaultValue={eduBg[3]?.period_to || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Highest Level/Units Earned
                      </span>

                      <input
                        type="text"
                        name="edu_3_highest_level" defaultValue={eduBg[3]?.highest_level || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Year Graduated
                      </span>

                      <input
                        type="text"
                        name="edu_3_year_graduated" defaultValue={eduBg[3]?.year_graduated || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 border-b border-gray-100 pb-6 last:border-0">
                  <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">
                    Graduate Studies
                  </label>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Name of School (Write in full)
                      </span>

                      <input
                        type="text"
                        name="edu_4_school_name" defaultValue={eduBg[4]?.school_name || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Basic Education/Degree/Course
                      </span>

                      <input
                        type="text"
                        name="edu_4_degree_course" defaultValue={eduBg[4]?.degree_course || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full lg:col-span-2 sm:col-span-2">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Period of Attendance (From - To)
                      </span>

                      <div className="flex items-center gap-2">
                        <ModernDatePicker name="edu_4_period_from" defaultValue={eduBg[4]?.period_from || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                        <span className="text-gray-400">-</span>
                        <ModernDatePicker name="edu_4_period_to" defaultValue={eduBg[4]?.period_to || ""}
                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Highest Level/Units Earned
                      </span>

                      <input
                        type="text"
                        name="edu_4_highest_level" defaultValue={eduBg[4]?.highest_level || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <span className="text-[12px] text-gray-400 mb-1.5 font-medium">
                        Year Graduated
                      </span>

                      <input
                        type="text"
                        name="edu_4_year_graduated" defaultValue={eduBg[4]?.year_graduated || ""}
                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* C4: Civil Service Eligibility */}
              <div className={activeTab === 'C4' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="text-center mb-8">
                  <p className="text-[13px] text-gray-500 italic">
                    Please list your civil service eligibility. Write "N/A" if not applicable.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {civilServiceList.map((item: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                      {/* Header */}
                      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h4 className="font-bold text-[14px] text-gray-700">ELIGIBILITY #{idx + 1}</h4>
                        <button type="button" onClick={() => setCivilServiceList(civilServiceList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col gap-5">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="md:col-span-2 flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Career Service/RA 1080 (Board/Bar)/Under Special Laws/CES/CSEE</span>
                            <input
                              type="text"
                              value={item.eligibility !== undefined ? item.eligibility : (item.name || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, eligibility: val, name: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter eligibility"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Rating (if applicable)</span>
                            <input
                              type="text"
                              value={item.rating || ''}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, rating: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter rating"
                            />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Date of Examination / Conferment</span>
                            <ModernDatePicker
                              value={item.date ? (typeof item.date === 'string' ? item.date.split('T')[0] : '') : (item.date_of_exam ? item.date_of_exam.split('T')[0] : '')}
                              onChange={(val: any) => setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, date: val, date_of_exam: val } : it))}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Place of Examination / Conferment</span>
                            <input
                              type="text"
                              value={item.place !== undefined ? item.place : (item.place_of_exam || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, place: val, place_of_exam: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter place"
                            />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">License Number (if applicable)</span>
                            <input
                              type="text"
                              value={item.licenseNo !== undefined ? item.licenseNo : (item.license_number || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, licenseNo: val, license_number: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter license no"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">License Date of Validity (if applicable)</span>
                            <ModernDatePicker
                              value={item.licenseDate ? (typeof item.licenseDate === 'string' ? item.licenseDate.split('T')[0] : '') : (item.license_validity ? item.license_validity.split('T')[0] : '')}
                              onChange={(val: any) => setCivilServiceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, licenseDate: val, license_validity: val } : it))}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 mt-2">
                    <button type="button" onClick={() => setCivilServiceList([...civilServiceList, { eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Eligibility
                    </button>
                    <button type="button" onClick={() => setCivilServiceList([{ eligibility: 'N/A', rating: 'N/A', date: null, place: 'N/A', licenseNo: 'N/A', licenseDate: null }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                      N/A
                    </button>
                  </div>
                </div>

                <input type="hidden" name="civil_service_eligibility" value={JSON.stringify(civilServiceList)} />
              </div>

              {/* C5: Work Experience */}
              <div className={activeTab === 'C5' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="text-center mb-8">
                  <p className="text-[13px] text-gray-500 italic">
                    Please list your work experience from most recent to oldest. Write "N/A" if not applicable.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {workExperienceList.map((item: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                      {/* Header */}
                      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h4 className="font-bold text-[14px] text-gray-700">WORK EXPERIENCE #{idx + 1}</h4>
                        <button type="button" onClick={() => setWorkExperienceList(workExperienceList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col gap-5">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                            <ModernDatePicker value={item.fromDate ? item.fromDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...workExperienceList]; n[idx].fromDate = val; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                            <ModernDatePicker value={item.toDate ? item.toDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...workExperienceList]; n[idx].toDate = val; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Position Title (Write in full/Do not abbreviate)</span>
                            <input type="text" value={item.positionTitle || ''} onChange={(e: any) => { const n = [...workExperienceList]; n[idx].positionTitle = e.target.value; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter position title" />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Department/Agency/Office/Company</span>
                            <input type="text" value={item.company || ''} onChange={(e: any) => { const n = [...workExperienceList]; n[idx].company = e.target.value; setWorkExperienceList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter department/agency/office/company" />
                          </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>
                            <div className="relative w-full">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-[15px] pointer-events-none select-none">₱</span>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={item.monthlySalary !== undefined ? formatCurrencyValue(item.monthlySalary) : formatCurrencyValue(item.salary || '')}
                                onChange={(e: any) => {
                                  const val = formatCurrencyValue(e.target.value);
                                  setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, monthlySalary: val, salary: val } : it));
                                }}
                                onBlur={(e: any) => {
                                  const raw = e.target.value.replace(/,/g, '');
                                  if (raw && !isNaN(Number(raw))) {
                                    const formatted = Number(raw).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                    setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, monthlySalary: formatted, salary: formatted } : it));
                                  }
                                }}
                                className="border border-gray-300 rounded p-2.5 pl-8 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full font-medium"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade & Step</span>
                            <input
                              type="text"
                              value={item.salaryGrade !== undefined ? item.salaryGrade : (item.pay_grade || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, salaryGrade: val, pay_grade: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter salary/job/pay grade & step"
                            />
                          </div>
                        </div>

                        {/* Row 5 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Status of Appointment</span>
                            <input
                              type="text"
                              value={item.statusOfAppointment !== undefined ? item.statusOfAppointment : (item.status || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, statusOfAppointment: val, status: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                              placeholder="Enter status of appointment"
                            />
                          </div>
                        </div>

                        {/* Row 6 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Gov't Service (Y/N)</span>
                            <select
                              value={item.govtService !== undefined ? item.govtService : (item.govt_service || '')}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setWorkExperienceList(prev => prev.map((it: any, i: number) => i === idx ? { ...it, govtService: val, govt_service: val } : it));
                              }}
                              className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white"
                            >
                              <option value="">Select option</option>
                              <option value="Y">Yes</option>
                              <option value="N">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 mt-2">
                    <button type="button" onClick={() => setWorkExperienceList([...workExperienceList, { fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 w-fit px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Work Experience
                    </button>
                    <button type="button" onClick={() => setWorkExperienceList([{ fromDate: null, toDate: null, positionTitle: 'N/A', company: 'N/A', monthlySalary: 'N/A', salaryGrade: 'N/A', statusOfAppointment: 'N/A', govtService: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                      N/A
                    </button>
                  </div>
                </div>

                <input type="hidden" name="work_experience" value={JSON.stringify(workExperienceList)} />
              </div>

              {/* C6: Voluntary Work */}
              <div className={activeTab === 'C6' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="text-center mb-8">

                  <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
                    Please list your voluntary work or involvement in civic/non-government/people/voluntary organizations. Write "N/A" if not applicable.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {voluntaryWorkList.map((item: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                      {/* Header */}
                      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h4 className="font-bold text-[14px] text-gray-700">VOLUNTARY WORK #{idx + 1}</h4>
                        <button type="button" onClick={() => setVoluntaryWorkList(voluntaryWorkList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col gap-5">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Name & Address of Organization (Write in full)</span>
                            <input type="text" value={item.nameAddress || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].nameAddress = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter name and address of organization" />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                            <ModernDatePicker value={item.fromDate ? item.fromDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...voluntaryWorkList]; n[idx].fromDate = val; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                            <ModernDatePicker value={item.toDate ? item.toDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...voluntaryWorkList]; n[idx].toDate = val; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>
                            <input type="text" value={item.hours || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].hours = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter number of hours" />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Position / Nature of Work</span>
                            <input type="text" value={item.position || ''} onChange={(e: any) => { const n = [...voluntaryWorkList]; n[idx].position = e.target.value; setVoluntaryWorkList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter position / nature of work" />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 mt-2">
                    <button type="button" onClick={() => setVoluntaryWorkList([...voluntaryWorkList, { nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Voluntary Work
                    </button>
                    <button type="button" onClick={() => setVoluntaryWorkList([{ nameAddress: 'N/A', fromDate: null, toDate: null, hours: 'N/A', position: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                      N/A
                    </button>
                  </div>
                </div>

                <input type="hidden" name="voluntary_work" value={JSON.stringify(voluntaryWorkList)} />
              </div>

              {/* C7: Learning and Development */}
              <div className={activeTab === 'C7' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="text-center mb-8">
                  <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
                    Please list your learning and development (L&D) interventions/training programs attended. Write "N/A" if not applicable.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {learningDevelopmentList.map((item: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                      {/* Header */}
                      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h4 className="font-bold text-[14px] text-gray-700">TRAINING #{idx + 1}</h4>
                        <button type="button" onClick={() => setLearningDevelopmentList(learningDevelopmentList.filter((_: any, i: number) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col gap-5">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Title of Learning and Development Interventions/Training Programs (Write in full)</span>
                            <input type="text" value={item.title || ''} onChange={(e: any) => { const n = [...learningDevelopmentList]; n[idx].title = e.target.value; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter title of learning and development" />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date of Attendance (From)</span>
                            <ModernDatePicker value={item.fromDate ? item.fromDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...learningDevelopmentList]; n[idx].fromDate = val; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Inclusive Date of Attendance (To)</span>
                            <ModernDatePicker value={item.toDate ? item.toDate.split('T')[0] : ''} onChange={(val: any) => { const n = [...learningDevelopmentList]; n[idx].toDate = val; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full bg-white" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>
                            <input type="text" value={item.hours || ''} onChange={(e: any) => { const n = [...learningDevelopmentList]; n[idx].hours = e.target.value; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter number of hours" />
                          </div>
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Type of LD</span>
                            <input type="text" value={item.type || ''} onChange={(e: any) => { const n = [...learningDevelopmentList]; n[idx].type = e.target.value; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter type of LD" />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col justify-between">
                            <span className="text-[13px] text-gray-400 mb-1.5 font-medium">Conducted/Sponsored By (Write in full)</span>
                            <input type="text" value={item.sponsor || ''} onChange={(e: any) => { const n = [...learningDevelopmentList]; n[idx].sponsor = e.target.value; setLearningDevelopmentList(n); }} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" placeholder="Enter sponsor" />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 mt-2">
                    <button type="button" onClick={() => setLearningDevelopmentList([...learningDevelopmentList, { title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }])} className="text-blue-600 text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 px-5 py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Training Program
                    </button>
                    <button type="button" onClick={() => setLearningDevelopmentList([{ title: 'N/A', fromDate: null, toDate: null, hours: 'N/A', type: 'N/A', sponsor: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                      N/A
                    </button>
                  </div>
                </div>

                <input type="hidden" name="learning_and_development" value={JSON.stringify(learningDevelopmentList)} />
              </div>

              {/* C8: Other Information */}
              <div className={activeTab === 'C8' ? "w-full animate-in fade-in slide-in-from-bottom-2" : "hidden"}>
                <div className="text-center mb-10">
                  <p className="text-[13px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed mt-4">
                    Please list your special skills and hobbies, non-academic distinctions, and memberships. Write "N/A" if not applicable.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">SPECIAL SKILLS & HOBBIES</h4>
                    {skillsList.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={typeof skill === 'object' ? skill.value || '' : skill} onChange={(e: any) => { const n = [...skillsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setSkillsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter skill / hobby" />
                        <button type="button" onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setSkillsList([...skillsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Skill / Hobby
                    </button>
                    <button type="button" onClick={() => setSkillsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                      N/A
                    </button>
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">NON-ACADEMIC DISTINCTIONS</h4>
                    {distinctionsList.map((distinction, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={typeof distinction === 'object' ? distinction.value || '' : distinction} onChange={(e: any) => { const n = [...distinctionsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setDistinctionsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter distinction" />
                        <button type="button" onClick={() => setDistinctionsList(distinctionsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setDistinctionsList([...distinctionsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Distinction
                    </button>
                    <button type="button" onClick={() => setDistinctionsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                      N/A
                    </button>
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-[14px] text-gray-700 border-b border-gray-100 pb-2 uppercase tracking-wide">MEMBERSHIPS IN ASSOCIATIONS</h4>
                    {membershipsList.map((membership, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={typeof membership === 'object' ? membership.value || '' : membership} onChange={(e: any) => { const n = [...membershipsList]; n[idx] = typeof n[idx] === 'object' ? { ...n[idx], value: e.target.value } : e.target.value; setMembershipsList(n); }} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" placeholder="Enter membership" />
                        <button type="button" onClick={() => setMembershipsList(membershipsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setMembershipsList([...membershipsList, ''])} className="text-blue-600 text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 w-full py-2.5 rounded border border-dashed border-blue-300 transition-colors">
                      <Plus className="w-4 h-4" /> Add Membership
                    </button>
                    <button type="button" onClick={() => setMembershipsList(['N/A'])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                      N/A
                    </button>
                  </div>
                </div>

                <input type="hidden" name="special_skills" value={JSON.stringify(skillsList.filter((s: any) => typeof s === 'string' ? s.trim() !== '' : (s?.value?.trim() !== '')))} />
                <input type="hidden" name="distinctions" value={JSON.stringify(distinctionsList.filter((d: any) => typeof d === 'string' ? d.trim() !== '' : (d?.value?.trim() !== '')))} />
                <input type="hidden" name="memberships" value={JSON.stringify(membershipsList.filter((m: any) => typeof m === 'string' ? m.trim() !== '' : (m?.value?.trim() !== '')))} />
              </div>

              {/* C9: Legal Questionnaire */}
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

              {/* C10: Essential Documents */}
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
                        <span className="font-medium text-gray-700">Personal Data Sheet <span className="text-red-500">*</span></span>
                      </div>
                      {getDocUrl("Personal Data Sheet") ? (
                        <div className="flex flex-col gap-2 w-full mt-2">
                          {selectedDocumentNames["Personal Data Sheet"] ? (
                            <span className="text-[12px] text-blue-600 font-bold bg-blue-50 px-3 py-1.5 rounded text-center border border-blue-200 flex items-center justify-center gap-1.5 max-w-full overflow-hidden animate-pop">
                              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" className="animate-checkmark" />
                              </svg>
                              <span className="shrink-0">Selected:</span>
                              <span className="truncate max-w-[120px] sm:max-w-[220px] md:max-w-[280px] text-left" title={selectedDocumentNames["Personal Data Sheet"]}>
                                {selectedDocumentNames["Personal Data Sheet"]}
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
                            <a href={(selectedDocumentUrls["Personal Data Sheet"] || getDocUrl("Personal Data Sheet")) as string} target="_blank" rel="noreferrer" className="cursor-pointer bg-blue-600 text-white border border-blue-700 px-4 py-1.5 rounded-[3px] text-[12px] font-bold hover:bg-blue-700 transition-colors h-[32px] flex-1 flex items-center justify-center text-center" style={{ color: 'white' }}>
                              View File
                            </a>
                            <label className="cursor-pointer bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium hover:bg-gray-100 transition-colors h-[32px] flex-1 flex items-center justify-center text-center">
                              Replace File
                              <input type="file" name="doc_pds" accept=".pdf" onChange={handleDocumentSelection("Personal Data Sheet")} className="hidden" />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <input type="file" name="doc_pds" accept=".pdf" required className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_work_exp" accept=".pdf" required className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_eligibility" accept=".pdf" required className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_tor" accept=".pdf" required className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_prc" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_diploma" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_resume" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
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
                        <input type="file" name="doc_performance_rating" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
                      )}
                    </div>

                    {/* Item 9 */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
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
                        <input type="file" name="doc_training_certificates" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
                      )}
                    </div>

                    {/* Item 10 */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
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
                        <input type="file" name="doc_application_of_education" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
                      )}
                    </div>

                    {/* Item 11 */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
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
                        <input type="file" name="doc_application_of_learning" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
                      )}
                    </div>

                    {/* Item 12 */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 items-center px-6 py-5 border-t border-gray-100">
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
                        <input type="file" name="doc_outstanding_accomplishments" accept=".pdf" className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer focus:outline-none w-full" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
                              "doc_pds": "Personal Data Sheet",
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
                              "profile_photo": "profile_photo"
                            };

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
                                const singleUploadFormData = new FormData();
                                singleUploadFormData.append("files", file);
                                singleUploadFormData.append("documentNames", docLabel);
                                if (docLabel === 'Letter of Intent' && jobId) {
                                  singleUploadFormData.append('jobClusterId', jobId.toString());
                                }

                                const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${applicantId}/documents`, {
                                  method: 'POST',
                                  body: singleUploadFormData
                                });

                                if (!uploadRes.ok) {
                                  const errData = await uploadRes.json();
                                  console.error(`Failed to upload ${docLabel}:`, errData);
                                  Swal.fire("Warning", `Failed to upload ${docLabel}: ${errData.message || 'Unknown error'}`, "warning");
                                }
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










