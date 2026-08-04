import annexCFile from '../assets/Annex C_Checklist of Requirements and Omnibus Sworn Statement.docx';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Search, LayoutGrid, List,
  Briefcase, ArrowRight, CalendarDays, Star,
  Building2, CircleDollarSign, MapPin,
  FileText, Bookmark,
  GraduationCap, ChevronLeft, ChevronRight, HelpCircle, Plus, Trash2, ArrowLeft
} from 'lucide-react';
import CustomDatePicker from '../components/CustomDatePicker';
import ApplicantHeader from '../components/ApplicantHeader';
const ADDRESS_API = `${import.meta.env.VITE_API_URL}/api/address`;

import { JobCard, JobTableList } from '../components/JobCards';
// @ts-ignore
import ModernDatePicker from "../components/ModernDatePicker";
import { calculateProfileProgress } from '../utils/profileProgress';

const ETHNIC_GROUPS = [
  "ABELING", "ABELLEN", "ABELLING", "ABERLING", "ABIYAN (AETA)", "ADASEN", "AETA", "AGTA-AGAY", "AGTA-CIMARON", "AGTA-DUMAGAT", "AGTA-TABANGNON", "AGTA-TABOY", "AGUTAYNON", "AKEANON", "ALAB", "ALANGAN", "ALANGAN MANGYAN", "AMBALA", "APAYAO", "AROMANEN-MANOBO", "AROMANON", "ATA", "ATA-MANOBO", "ATI", "BADJAO", "BADJAO, SAMA LAUT", "BAGKALOT", "BAGO", "BAGOBO", "BAGOBO-TAGABAWA", "BALATOC", "BALIWON", "BALUGA", "BANAO", "BANGON", "BANTOANON", "BANWAON", "BARLIG", "BASAO", "BATAK", "BATANGAN", "BATANGAN MANGYAN", "BELWANG", "BIKOL/BICOL", "BINONGAN", "BISAYA/BINISAYA", "BLAAN", "BOHOLANO", "BONTOK", "BUGKALOT", "BUHID", "BUHID MANGYAN", "BUKIDNON", "BUTBUT", "CAGALUAN", "CAGAYANEN", "CALINGA", "CAPIZEÑO", "CAVITEÑO", "CEBUANO", "CHAVACANO", "CHINESE", "CIMARON", "COTABATEÑO", "COTABATEÑO-CHAVACANO", "CUYONEN", "CUYUNON", "DACALAN", "DAGAYNEN", "DANAK", "DANANAO", "DAVAO-CHAVACANO", "DAVAWEÑO", "DIANGAN", "DIBABAWON", "DIBABEEN MULITAAN", "DIBABEN", "DIRERAYAAN", "DULANGAN", "DUMAGAT-ALTA", "DUMAGAT-REMONTADO", "ESCAYA", "GADDANG", "GUBANG", "GUBATNON", "GUBATNON MANGYAN", "GUIANGAN", "GUILAYON", "GUINAANG", "HALAWODNON", "HANUNUO", "HANUNUO MANGYAN", "HENANGA", "HIGAONON", "HILIGAYNON/LLONGGO", "IABANAG", "IBALOY", "IBATAN", "IFUGAO", "IKALAHAN", "ILAUD", "ILIANEN", "ILOCANO", "IRANON", "IRAYA", "IRAYA MANGYAN", "ISAROG", "ISINAI", "ISOROKEN", "ITAWES", "ITAWIA", "ITNEG", "ITOM", "IVATAN", "JAMA MAPON", "KABAYUKAN", "KABIHUG", "KADAKLAN/KACHAKRAN", "KAILAWAN/KAYLAWAN", "KALAGAN", "KALANGUYA", "KALIBUGAN", "KALIBUGAN/KOLIBUGAN", "KALINGA", "KAMAYO", "KAMIGIN", "KAMIGUIN", "KANKANAEY", "KANKANAEY IBENGUET", "KANKANAEY IYAPLAY", "KAPAMPANGAN", "KARINTIK", "KARULANO", "KAUNANA", "KEN-EY", "KIRENTEKEN", "KLATA", "KONGKING", "KOROLANON", "LAHITANEN", "LAMBANGIAN", "LAMBANGLAN", "LANGILAN", "LIVUNGANEN", "LLONGOT", "LUBO", "LUBUAGAN", "MABAKA", "MAENG", "MAG-ANTI", "MAG-ANTSI", "MAG-INDI", "MAGAHAT", "MAGBEKIN", "MAGBUKON", "MAGKUNANA", "MAGUINDANAO", "MAJOKAYONG", "MALAWEG/MALAUEG", "MALBONG", "MAMANWA", "MANDAYA", "MANDEK-EY", "MANDUKAYAN", "MANGALI", "MANGGUANGAN", "MANOBO", "MANOBO B\"LIT", "MANOBO-DULANGAN", "MANOBO-UBO", "MANSAKA", "MARANAO", "MASADIIT", "MASBATEÑO/MASBATENON", "MATIGSALOG", "MAYUDAN", "MOLBOG", "NANENG", "NEGRITO", "OBU-MANUVU", "PALA WAN", "PALAWAN-O", "PALAWANI", "PALAWANON", "PAN-AYANON", "PANAY-BUKIDNON", "PANGASINAN/PANGGALATO", "PARANANUM", "PUGOT", "PULANGIEN", "PULANGIYEN", "PULLON", "RATAGNON", "RATAGNON MANGYAN", "REMONTADO", "SADANGA", "SAKKI", "SALEGSEG", "SAMA", "SAMA BADJAO", "SAMA BANGINGI", "SAMA LAUT", "SAMAL", "SANGIL", "SIBUYAN MANGYAN-TAGABUKID", "SUBANEN", "SULOD/BUDIKNON", "SUMADEL", "T-BOLI", "TABANGON", "TADYAWAN", "TADYAWAN MANGYAN", "TAGABAWA", "TAGAKAOLO", "TAGALOG", "TAGANUA", "TAGAWAHANON", "TAGBANUA", "TAGBANUA/KALAMIANEN", "TALAANDIG", "TALAINGOD", "TALAINGOD, LANGILAN", "TALOCTOK", "TAO'T BATO", "TAU-BUID", "TAUSUG", "TAUT-BATO", "TBOLI", "TEDURAY", "TIGWAHANON", "TINANANEN", "TINGGLAN", "TINGGUIAN", "TINGLAYAN", "TIRURAY", "TONGLAYAN", "TULGAO", "UBO MANOBO", "UBO-MANOBO", "UMAYAMNON", "WARAY", "YAKAN", "YAPAYAO", "YBANAG", "YOGAD", "ZAMBAL"
];

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

export default function ApplicantJobList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [positions, setPositions] = useState<any[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<any[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'job-board' | 'my-applications' | 'my-saved-jobs' | 'application-form'>('job-board');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(new Date(1997, 7, 11)); // Default Aug 11, 1997 per reference
  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [currentStep, setCurrentStep] = useState('Personal Information');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [filterDivision, setFilterDivision] = useState('All Divisions');
  const [filterPosition, setFilterPosition] = useState('All Positions');
  const [highlightDocs, setHighlightDocs] = useState(false);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [pendingApplyJob, setPendingApplyJob] = useState<any>(null);

  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const [availableDivisions, setAvailableDivisions] = useState<string[]>([]);
  const [divisionsByRegion, setDivisionsByRegion] = useState<Record<string, string[]>>({});
  const availablePositions = useMemo(() => [...new Set(positions.map(p => p.title))].filter(Boolean), [positions]);

  const filteredAvailableDivisions = useMemo(() => {
    if (filterRegion === 'All Regions') {
      return availableDivisions;
    }
    const set = new Set<string>();
    if (divisionsByRegion && divisionsByRegion[filterRegion]) {
      divisionsByRegion[filterRegion].forEach(d => set.add(d));
    }
    positions.forEach(job => {
      if ((job.location || 'Unknown') === filterRegion) {
        const div = job.division || job.office;
        if (div) set.add(div);
      }
    });
    return set.size > 0 ? Array.from(set).sort() : availableDivisions;
  }, [filterRegion, availableDivisions, divisionsByRegion, positions]);

  const handleRegionChange = (newRegion: string) => {
    setFilterRegion(newRegion);
    if (newRegion !== 'All Regions') {
      const set = new Set<string>();
      if (divisionsByRegion && divisionsByRegion[newRegion]) {
        divisionsByRegion[newRegion].forEach(d => set.add(d));
      }
      positions.forEach(job => {
        if ((job.location || 'Unknown') === newRegion) {
          const div = job.division || job.office;
          if (div) set.add(div);
        }
      });
      if (filterDivision !== 'All Divisions' && !set.has(filterDivision)) {
        setFilterDivision('All Divisions');
      }
    }
  };

  const filteredPositions = useMemo(() => positions.filter(job => {
    const matchSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.itemNo && job.itemNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.division && job.division.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.office && job.office.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRegion = filterRegion === 'All Regions' || (job.location || 'Unknown') === filterRegion;
    const matchDivision = filterDivision === 'All Divisions' || (job.division || job.office) === filterDivision;
    const matchPosition = filterPosition === 'All Positions' || job.title === filterPosition;

    return matchSearch && matchRegion && matchDivision && matchPosition;
  }), [searchQuery, filterRegion, filterDivision, filterPosition, positions]);

  useEffect(() => {
    setCurrentJobPage(1);
  }, [searchQuery, filterRegion, filterDivision, filterPosition, jobsPerPage]);

  const totalJobPages = Math.ceil(filteredPositions.length / jobsPerPage);
  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredPositions.slice(indexOfFirstJob, indexOfLastJob);

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterRegion('All Regions');
    setFilterDivision('All Divisions');
    setFilterPosition('All Positions');
  };

  // Personal Info States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [extensionName, setExtensionName] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [religion, setReligion] = useState('');
  const [agencyEmployeeNo, setAgencyEmployeeNo] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [citizenshipType, setCitizenshipType] = useState('');

  // Residential Address States
  const [resRegion, setResRegion] = useState('');
  const [resProvince, setResProvince] = useState('');
  const [resCity, setResCity] = useState('');
  const [resBarangay, setResBarangay] = useState('');

  // Permanent Address States
  const [permRegion, setPermRegion] = useState('');
  const [permProvince, setPermProvince] = useState('');
  const [permCity, setPermCity] = useState('');
  const [permBarangay, setPermBarangay] = useState('');

  // ─── API-driven cascading address data ───
  const [regionsList, setRegionsList] = useState<any[]>([]);
  const [resProvincesList, setResProvincesList] = useState<any[]>([]);
  const [resCitiesList, setResCitiesList] = useState<any[]>([]);
  const [resBarangaysList, setResBarangaysList] = useState<any[]>([]);
  const [permProvincesList, setPermProvincesList] = useState<any[]>([]);
  const [permCitiesList, setPermCitiesList] = useState<any[]>([]);
  const [permBarangaysList, setPermBarangaysList] = useState<any[]>([]);

  // Fetch regions on mount
  useEffect(() => {
    fetch(`${ADDRESS_API}/regions`).then(r => r.json()).then(d => {
      if (d.success) setRegionsList(d.data);
    }).catch(console.error);
  }, []);

  // Residential: fetch provinces when region changes
  useEffect(() => {
    if (!resRegion) { setResProvincesList([]); return; }
    fetch(`${ADDRESS_API}/provinces?region=${encodeURIComponent(resRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setResProvincesList(d.data);
    }).catch(console.error);
  }, [resRegion]);

  // Residential: fetch cities when province changes
  useEffect(() => {
    if (!resProvince) { setResCitiesList([]); return; }
    fetch(`${ADDRESS_API}/municipalities?province=${encodeURIComponent(resProvince)}&region=${encodeURIComponent(resRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setResCitiesList(d.data);
    }).catch(console.error);
  }, [resProvince, resRegion]);

  // Residential: fetch barangays when city changes
  useEffect(() => {
    if (!resCity) { setResBarangaysList([]); return; }
    fetch(`${ADDRESS_API}/barangays?municipality=${encodeURIComponent(resCity)}&province=${encodeURIComponent(resProvince)}`).then(r => r.json()).then(d => {
      if (d.success) setResBarangaysList(d.data);
    }).catch(console.error);
  }, [resCity, resProvince]);

  // Permanent: fetch provinces when region changes
  useEffect(() => {
    if (!permRegion) { setPermProvincesList([]); return; }
    fetch(`${ADDRESS_API}/provinces?region=${encodeURIComponent(permRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setPermProvincesList(d.data);
    }).catch(console.error);
  }, [permRegion]);

  // Permanent: fetch cities when province changes
  useEffect(() => {
    if (!permProvince) { setPermCitiesList([]); return; }
    fetch(`${ADDRESS_API}/municipalities?province=${encodeURIComponent(permProvince)}&region=${encodeURIComponent(permRegion)}`).then(r => r.json()).then(d => {
      if (d.success) setPermCitiesList(d.data);
    }).catch(console.error);
  }, [permProvince, permRegion]);

  // Permanent: fetch barangays when city changes
  useEffect(() => {
    if (!permCity) { setPermBarangaysList([]); return; }
    fetch(`${ADDRESS_API}/barangays?municipality=${encodeURIComponent(permCity)}&province=${encodeURIComponent(permProvince)}`).then(r => r.json()).then(d => {
      if (d.success) setPermBarangaysList(d.data);
    }).catch(console.error);
  }, [permCity, permProvince]);

  const isResBarangayOther = resBarangay === 'OTHER' || (resBarangay && resBarangaysList.length > 0 && !resBarangaysList.some((b: any) => b.name.toUpperCase() === resBarangay.toUpperCase()));
  const isPermBarangayOther = permBarangay === 'OTHER' || (permBarangay && permBarangaysList.length > 0 && !permBarangaysList.some((b: any) => b.name.toUpperCase() === permBarangay.toUpperCase()));

  // Normalize uppercase barangays from database to match proper casing in options
  useEffect(() => {
    if (resBarangay && resBarangaysList.length > 0) {
      const match = resBarangaysList.find((b: any) => b.name.toUpperCase() === resBarangay.toUpperCase());
      if (match && match.name !== resBarangay) setResBarangay(match.name);
    }
  }, [resBarangay, resBarangaysList]);

  useEffect(() => {
    if (permBarangay && permBarangaysList.length > 0) {
      const match = permBarangaysList.find((b: any) => b.name.toUpperCase() === permBarangay.toUpperCase());
      if (match && match.name !== permBarangay) setPermBarangay(match.name);
    }
  }, [permBarangay, permBarangaysList]);
  const [resHouse, setResHouse] = useState('');
  const [resStreet, setResStreet] = useState('');
  const [resSubdivision, setResSubdivision] = useState('');
  const [resZip, setResZip] = useState('');
  const [permHouse, setPermHouse] = useState('');
  const [permStreet, setPermStreet] = useState('');
  const [permSubdivision, setPermSubdivision] = useState('');
  const [permZip, setPermZip] = useState('');

  useEffect(() => {
    if (sameAsResidential) {
      setPermHouse(resHouse);
      setPermStreet(resStreet);
      setPermSubdivision(resSubdivision);
      setPermZip(resZip);
      setPermRegion(resRegion);
      setPermProvince(resProvince);
      setPermCity(resCity);
      setPermBarangay(resBarangay);
    }
  }, [sameAsResidential, resHouse, resStreet, resSubdivision, resZip, resRegion, resProvince, resCity, resBarangay]);
  const [telephoneNo, setTelephoneNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const [spouseSurname, setSpouseSurname] = useState('');
  const [spouseFirst, setSpouseFirst] = useState('');
  const [spouseMiddle, setSpouseMiddle] = useState('');
  const [spouseExt, setSpouseExt] = useState('');
  const [spouseOccupation, setSpouseOccupation] = useState('');
  const [spouseEmployer, setSpouseEmployer] = useState('');
  const [spouseBusAddress, setSpouseBusAddress] = useState('');
  const [spouseTelephone, setSpouseTelephone] = useState('');

  const [fatherSurname, setFatherSurname] = useState('');
  const [fatherFirst, setFatherFirst] = useState('');
  const [fatherMiddle, setFatherMiddle] = useState('');
  const [fatherExt, setFatherExt] = useState('');

  const [motherSurname, setMotherSurname] = useState('');
  const [motherFirst, setMotherFirst] = useState('');
  const [motherMiddle, setMotherMiddle] = useState('');

  const itemsPerPage = 5;

  const isSubsequentApplication = applications.length > 0;
  const totalSteps = isSubsequentApplication ? 11 : 10; // +1 for Letter of Intent


  const handleTabClick = (targetStep: string) => {
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Family Background');
  };

  const [childrenList, setChildrenList] = useState<any[]>([{ name: '', dob: null }]);
  const [debugRawEdu, setDebugRawEdu] = useState<any>(null);
  const [educationalDates, setEducationalDates] = useState<Record<string, { school: string, degree: string, from: Date | null, to: Date | null, units: string, year: string, honors: string }>>({});

  const handleFamilyBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Educational Background');
  };

  const handleEducationalBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Eligibility');
  };

  const [civilServiceList, setCivilServiceList] = useState<any[]>([{ eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }]);

  const handleCivilServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Work Experience');
  };

  const [workExperienceList, setWorkExperienceList] = useState<any[]>([{ fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }]);

  const handleWorkExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Voluntary Work');
  };

  const [voluntaryWorkList, setVoluntaryWorkList] = useState<any[]>([{ nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }]);

  const handleVoluntaryWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Learning & Development');
  };

  const [learningDevelopmentList, setLearningDevelopmentList] = useState<any[]>([{ title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }]);

  const handleLearningDevelopmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Other Information');
  };

  const [skillsList, setSkillsList] = useState<{ value: string }[]>([{ value: '' }]);
  const [distinctionsList, setDistinctionsList] = useState<{ value: string }[]>([{ value: '' }]);
  const [membershipsList, setMembershipsList] = useState<{ value: string }[]>([{ value: '' }]);

  const handleOtherInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Legal Questionnaire');
  };

  const handleLegalQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Essential Documents');
  };

  const [documents, setDocuments] = useState<Record<string, File | null>>({});
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploadedDocumentUrls, setUploadedDocumentUrls] = useState<Record<string, string>>({});
  const [editingDocs, setEditingDocs] = useState<Record<string, boolean>>({});
  const [documentsConfirmed, setDocumentsConfirmed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, activeTab]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire('Error', 'Image size should be less than 2MB', 'error');
      return;
    }

    try {
      Swal.fire({
        title: 'Uploading Photo...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) throw new Error('Not logged in');
      const session = JSON.parse(sessionStr);

      const formData = new FormData();
      formData.append('files', file);
      formData.append('documentNames', 'profile_photo');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const uploadedUrl = result.documents.profile_photo;

        // Also update the applicant's other_information with the new photoUrl
        const pResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`);
        if (pResponse.ok) {
          const pData = await pResponse.json();
          const applicant = pData.data;
          const oi = typeof applicant.other_information === 'string' ? JSON.parse(applicant.other_information) : (applicant.other_information || {});
          oi.photoUrl = uploadedUrl;
          await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ other_information: oi })
          });
        }

        setPhotoUrl(uploadedUrl);
        Swal.fire('Success', 'Photo uploaded successfully!', 'success');
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to upload photo', 'error');
    }
  };
  const [questionnaire, setQuestionnaire] = useState<Record<string, { answer: string, details: string }>>({});
  const [referencesList, setReferencesList] = useState<any[]>([{ name: '', address: '', telephone: '' }]);
  const [governmentId, setGovernmentId] = useState({ type: '', idNo: '', datePlace: '' });
  const [pdfViewerUrl, setPdfViewerUrl] = useState<string | null>(null);
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [loiFile, setLoiFile] = useState<File | null>(null);
  const [loiUploading, setLoiUploading] = useState(false);
  const [showSwornDeclModal, setShowSwornDeclModal] = useState(false);
  const [swornDeclFile, setSwornDeclFile] = useState<File | null>(null);
  const [swornDeclUploading, setSwornDeclUploading] = useState(false);

  const { steps: completedSteps, percentage, totalSteps: progressTotalSteps } = useMemo(() => {
    return calculateProfileProgress({
      firstName, lastName, placeOfBirth, sex, civilStatus, citizenship,
      motherSurname, motherFirst, fatherSurname, fatherFirst, spouseSurname, spouseFirst,
      educationalDates, civilServiceList, workExperienceList, voluntaryWorkList, learningDevelopmentList,
      skillsList, distinctionsList, membershipsList, questionnaire, referencesList, governmentId, documentsConfirmed,
      isSubsequentApplication, uploadedDocumentUrls, documents, context: 'apply-now'
    });
  }, [
    firstName, lastName, placeOfBirth, sex, civilStatus, citizenship,
    motherSurname, motherFirst, fatherSurname, fatherFirst, spouseSurname, spouseFirst,
    educationalDates, civilServiceList, workExperienceList, voluntaryWorkList, learningDevelopmentList,
    skillsList, distinctionsList, membershipsList, questionnaire, referencesList, governmentId, isSubsequentApplication, documentsConfirmed,
    uploadedDocumentUrls, documents
  ]);

  const handleLetterOfIntentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire('Error', 'File size must be less than 5MB', 'error');
      return;
    }

    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) return;
      const session = JSON.parse(sessionStr);

      Swal.fire({
        title: 'Uploading Letter of Intent...',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const formData = new FormData();
      formData.append('files', file);
      formData.append('documentNames', 'Letter of Intent');
      if (applyingJob) {
        formData.append('jobClusterId', applyingJob.id.toString());
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedDocumentUrls(data.documents);
        Swal.fire('Success', 'Letter of Intent uploaded successfully!', 'success');
      } else {
        Swal.fire('Error', 'Failed to upload Letter of Intent.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'An error occurred during upload.', 'error');
    }
  };
  const handleEssentialDocumentsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const REQUIRED_DOCS = [
      'Notarized Personal Data Sheet',
      'Work Experience Sheet',
      'Certificate of Eligibility',
      'Transcript of Records'
    ];
    const isConfirmed = (doc: string) => documentsConfirmed[doc] || (doc === 'Notarized Personal Data Sheet' && documentsConfirmed['Personal Data Sheet']);
    const allDocumentsConfirmed = REQUIRED_DOCS.every(doc => isConfirmed(doc));
    if (!allDocumentsConfirmed) {
      Swal.fire(
        'Documents Not Confirmed',
        'Please review and check the confirmation box for each required document before submitting.',
        'warning'
      );
      setCurrentStep('Essential Documents');
      return;
    }

    // 1. Global Validation: Check all tabs for required fields before submitting
    const allTabs = [
      'Personal Information',
      'Family Background',
      'Educational Background',
      'Eligibility',
      'Work Experience',
      'Voluntary Work',
      'Learning & Development',
      'Other Information',
      'Legal Questionnaire',
      'Essential Documents'
    ];

    for (const tab of allTabs) {
      const form = document.getElementById(`form-${tab}`) as HTMLFormElement;
      if (form && !form.checkValidity()) {
        Swal.fire(
          'Incomplete Profile',
          `Please fill in all required fields in the "${tab}" tab.`,
          'warning'
        );
        setCurrentStep(tab);
        setTimeout(() => {
          const f = document.getElementById(`form-${tab}`) as HTMLFormElement;
          if (f) f.reportValidity();
        }, 300);
        return;
      }
    }


    // 2. Vercel Limit Validation
    const docEntries = Object.entries(documents).filter(([_, file]) => file !== null);
    if (docEntries.length > 0) {
      const totalSize = docEntries.reduce((sum, [_, file]) => sum + (file as File).size, 0);
      if (totalSize > 20 * 1024 * 1024) {
        Swal.fire(
          'Total File Size Too Large',
          'The total size of the documents you are uploading exceeds the 20MB limit. Please upload them one by one or compress your files.',
          'error'
        );
        return;
      }
    }

    // 3. Confirm Documents Modal removed



    // 4. Proceed with original upload and submission logic
    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        Swal.fire('Error', 'You must be logged in to apply.', 'error');
        navigate('/login');
        return;
      }

      const session = JSON.parse(sessionStr);

      let currentUploadedDocs = { ...uploadedDocumentUrls };

      // Upload Documents to Azure first
      if (docEntries.length > 0) {
        Swal.fire({
          title: 'Processing and Uploading Documents...',
          text: 'Compressing PDFs. Please wait...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const formData = new FormData();
        docEntries.forEach(([name, file]) => {
          formData.append('files', file as File);
          formData.append('documentNames', name);
        });
        if (applyingJob) {
          formData.append('jobClusterId', applyingJob.id.toString());
        }

        const docUploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/documents`, {
          method: 'POST',
          body: formData
        });

        if (docUploadRes.ok) {
          const result = await docUploadRes.json();
          currentUploadedDocs = { ...currentUploadedDocs, ...result.documents };
          setUploadedDocumentUrls(currentUploadedDocs);
        } else {
          Swal.fire('Error', 'Failed to upload one or more documents.', 'error');
          return;
        }
      }

      Swal.fire({
        title: 'Updating Profile...',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const toUpper = (val: any, keyName?: string): any => {
        if (keyName && ['sex', 'civil_status', 'citizenship', 'citizenshipType', 'barangay', 'city', 'province', 'region', 'date_of_birth', 'documents', 'photoUrl'].includes(keyName)) {
          return val;
        }
        if (keyName && ['hours', 'years_experience', 'training_hours'].includes(keyName)) {
          const num = Number(val);
          return isNaN(num) ? val : num;
        }
        if (typeof val === 'string') return val.toUpperCase();
        if (Array.isArray(val)) return val.map(v => toUpper(v));
        if (val !== null && typeof val === 'object') {
          if (val instanceof Date) return val;
          const newVal: any = {};
          for (const key in val) {
            newVal[key] = toUpper(val[key], key);
          }
          return newVal;
        }
        return val;
      };

      const applicantData = toUpper({
        surname: lastName,
        first_name: firstName,
        middle_name: middleName,
        place_of_birth: placeOfBirth,
        sex: sex,
        civil_status: civilStatus,
        citizenship: citizenship,
        blood_type: bloodType,
        religion: religion,
        date_of_birth: birthDate,
        residential_address: {
          house: resHouse,
          street: resStreet,
          subdivision: resSubdivision,
          zip: resZip,
          region: resRegion,
          province: resProvince,
          city: resCity,
          barangay: resBarangay,
        },
        permanent_address: {
          same_as_res: sameAsResidential,
          house: sameAsResidential ? resHouse : permHouse,
          street: sameAsResidential ? resStreet : permStreet,
          subdivision: sameAsResidential ? resSubdivision : permSubdivision,
          zip: sameAsResidential ? resZip : permZip,
          region: sameAsResidential ? resRegion : permRegion,
          province: sameAsResidential ? resProvince : permProvince,
          city: sameAsResidential ? resCity : permCity,
          barangay: sameAsResidential ? resBarangay : permBarangay,
        },
        telephone_no: telephoneNo,
        mobile_no: mobileNo,
        family_background: {
          spouse: {
            surname: spouseSurname,
            first_name: spouseFirst,
            middle_name: spouseMiddle,
            name_extension: spouseExt,
            occupation: spouseOccupation,
            employer: spouseEmployer,
            business_address: spouseBusAddress,
            telephone: spouseTelephone
          },
          father: {
            surname: fatherSurname,
            first_name: fatherFirst,
            middle_name: fatherMiddle,
            name_extension: fatherExt,
          },
          mother: {
            surname: motherSurname,
            first_name: motherFirst,
            middle_name: motherMiddle,
          }
        },
        educational_background: Object.entries(educationalDates).map(([level, dates]) => ({ level, ...dates })),
        civil_service_eligibility: civilServiceList,
        work_experience: workExperienceList,
        voluntary_work: voluntaryWorkList,
        learning_and_development: learningDevelopmentList,
        other_information: {
          extensionName,
          height,
          weight,
          agencyEmployeeNo,
          citizenshipType,
          skills: skillsList,
          distinctions: distinctionsList,
          memberships: membershipsList,
          references: referencesList,
          governmentId: governmentId,
          children: childrenList,
          documents: currentUploadedDocs,
          photoUrl: photoUrl
        },
        questionnaire_responses: questionnaire,
        disability: questionnaire['40b']?.answer === 'Yes' ? (questionnaire['40b']?.details || '') : 'No',
        ethnic_group: questionnaire['40b_ethnic']?.answer === 'Yes' ? (questionnaire['40b_ethnic']?.details || '') : 'No'
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicantData)
      });

      if (response.ok) {
        if (applyingJob) {
          const applyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/apply-job`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              applicantId: session.id,
              positionId: applyingJob.id,
              jobTitle: applyingJob.title
            })
          });

          if (applyResponse.ok) {
            const applyData = await applyResponse.json();
            Swal.fire('Success', 'Profile updated and applied to ' + applyingJob.title + ' successfully!', 'success');
            setAppliedJobIds(prev => [...prev, applyingJob.id]);

            const newApp = {
              id: applyData?.data?.id || Date.now(),
              positionId: applyingJob.id,
              position: applyingJob.title,
              office: applyingJob.office || 'Department of Education',
              division: applyingJob.division || 'N/A',
              location: applyingJob.location || applyingJob.region || 'N/A',
              type: applyingJob.type || 'Permanent',
              posted: applyingJob.posted || 'N/A',
              deadline: applyingJob.deadline || 'N/A',
              sg: applyingJob.sg || 'N/A',
              itemNo: applyingJob.itemNo || 'N/A',
              date: new Date().toLocaleDateString(),
              stage: 'Applied',
              assessmentStatus: 'Pending Assessment',
              appointmentStatus: 'Pending Appointment',
              status: 'Active'
            };
            setApplications(prev => {
              if (prev.some(app => app.positionId === applyingJob.id)) return prev;
              return [newApp, ...prev];
            });
          } else {
            Swal.fire('Error', 'Profile updated but failed to apply for the job.', 'error');
          }
        } else {
          Swal.fire('Success', 'Profile updated successfully!', 'success');
        }

        setActiveTab('job-board');
        setApplyingJob(null);
        setDocumentsConfirmed({});
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'Failed to update profile.', 'error');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const indexOfLastApp = currentPage * itemsPerPage;
  const indexOfFirstApp = indexOfLastApp - itemsPerPage;
  const currentApps = applications.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(applications.length / itemsPerPage);

  useEffect(() => {
    if (location.state?.applyingJob) {
      setApplyingJob(location.state.applyingJob);
      setActiveTab('application-form');
      setPendingApplyJob(location.state.applyingJob);
      // clear the state so it doesn't reopen if the user refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const sessionStr = localStorage.getItem('session_data');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    const session = JSON.parse(sessionStr);

    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies/locations`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAvailableRegions(data.data.regions || []);
          setAvailableDivisions(data.data.divisions || []);
          setDivisionsByRegion(data.data.divisionsByRegion || {});
        }
      })
      .catch(err => console.error('Error fetching locations:', err));

    fetch(`${import.meta.env.VITE_API_URL}/api/vacancies`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const formatted = data.data.map((v: any) => ({
            id: v.jobClusterId,
            jobClusterId: v.jobClusterId,
            positionId: v.position_id,
            title: v.positionTitle,
            office: v.division ? `${v.division}, ${v.region}` : 'Department of Education',
            division: v.division || '',
            type: 'Permanent', // Defaulting as DB doesn't have it
            posted: v.posting_start ? new Date(v.posting_start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            deadline: v.posting_end ? new Date(v.posting_end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
            sg: v.salaryGrade,
            itemNo: 'Multiple Items',
            location: v.region || '',
            vacancyCount: v.vacantItemCount,
            qsEducation: v.qualificationStandards?.requiredBachelorDegree,
            qsExperience: v.qualificationStandards?.minYearsExperience,
            qsTraining: v.qualificationStandards?.minTrainingHours,
            qsEligibility: v.qualificationStandards?.eligibilityRequired,
            description: 'Details available in the full job posting.',
            daysLeft: v.posting_end ? Math.ceil((new Date(v.posting_end).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0
          }));
          setPositions(formatted);

          fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`)
            .then(res => res.json())
            .then(appData => {
              if (appData.success && appData.data) {
                setAppliedJobIds(appData.data.map((app: any) => app.position_id));
                setApplications(appData.data.map((app: any) => {
                  const jobDetails = formatted.find((p: any) => p.id === app.position_id) || {} as any;
                  return {
                    id: app.id,
                    positionId: app.position_id,
                    position: app.job_title || jobDetails.title || 'Unknown Position',
                    office: app.office || jobDetails.office || 'Department of Education',
                    division: app.division || jobDetails.division || 'N/A',
                    location: app.region || jobDetails.location || 'N/A',
                    type: jobDetails.type || 'Permanent',
                    posted: app.posting_start ? new Date(app.posting_start).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : (jobDetails.posted || 'N/A'),
                    deadline: app.posting_end ? new Date(app.posting_end).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : (jobDetails.deadline || 'N/A'),
                    sg: app.salary_grade || jobDetails.sg || 'N/A',
                    itemNo: app.item_no || jobDetails.itemNo || 'N/A',
                    date: new Date(app.created_at).toLocaleDateString(),
                    stage: app.application_status || 'Applied',
                    assessmentStatus: app.assessment_status || 'Pending Assessment',
                    appointmentStatus: app.appointment_status || 'Pending Appointment',
                    comparativeAssessmentScores: app.comparative_assessment_scores || '',
                    overallFit: app.overall_fit || '',
                    vacancyStatus: app.vacancy_status || jobDetails.status || 'Unknown',
                    status: 'Active',
                    vacancyCount: app.vacancy_count || jobDetails.vacancyCount || 0,
                    qsEducation: jobDetails.qsEducation,
                    qsExperience: jobDetails.qsExperience,
                    qsTraining: jobDetails.qsTraining,
                    qsEligibility: jobDetails.qsEligibility,
                    description: jobDetails.description,
                    daysLeft: jobDetails.daysLeft
                  };
                }));
              }
            })
            .catch(err => console.error('Error fetching applications:', err));
        }
      })
      .catch(err => console.error('Error fetching vacancies:', err));

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const p = data.data;
          setFirstName(p.first_name || '');
          setLastName(p.surname || '');
          setMiddleName(p.middle_name || '');
          setPlaceOfBirth(p.place_of_birth || '');
          setSex(p.sex || '');
          setCivilStatus(p.civil_status || '');
          setCitizenship(p.citizenship || '');
          setBloodType(p.blood_type || '');
          setReligion(p.religion || '');
          if (p.date_of_birth) {
            const dateStr = p.date_of_birth.split("T")[0];
            if (dateStr) {
              const [year, month, day] = dateStr.split("-").map(Number);
              setBirthDate(new Date(year, month - 1, day));
            } else {
              setBirthDate(null);
            }
          } else {
            setBirthDate(null);
          }
          setTelephoneNo(p.telephone_no || '');
          setMobileNo(p.mobile_no || '');
          setAlternateEmail(p.alternate_email || '');
          setEmailAddress(p.email_address || '');

          if (p.residential_address) {
            const ra = typeof p.residential_address === 'string' ? JSON.parse(p.residential_address) : p.residential_address;
            setResHouse(ra.house || '');
            setResStreet(ra.street || '');
            setResSubdivision(ra.subdivision || '');
            setResZip(ra.zip || '');
            setResRegion(ra.region || '');
            setResProvince(ra.province || '');
            setResCity(ra.city || '');
            setResBarangay(ra.barangay || '');
          }

          if (p.permanent_address) {
            const pa = typeof p.permanent_address === 'string' ? JSON.parse(p.permanent_address) : p.permanent_address;
            setPermHouse(pa.house || '');
            setPermStreet(pa.street || '');
            setPermSubdivision(pa.subdivision || '');
            setPermZip(pa.zip || '');
            setPermRegion(pa.region || '');
            setPermProvince(pa.province || '');
            setPermCity(pa.city || '');
            setPermBarangay(pa.barangay || '');

            const ra = p.residential_address ? (typeof p.residential_address === 'string' ? JSON.parse(p.residential_address) : p.residential_address) : {};
            const isSame = Boolean(
              pa.same_as_res ||
              pa.sameAsResidential ||
              pa.same_as_residential ||
              (ra && ra.region && ra.region === pa.region && ra.city === pa.city && ra.barangay === pa.barangay && ra.house === pa.house)
            );
            if (isSame) {
              setSameAsResidential(true);
            }
          }

          if (p.family_background) {
            const fb = typeof p.family_background === 'string' ? JSON.parse(p.family_background) : p.family_background;
            if (fb.spouse) {
              setSpouseSurname(fb.spouse.surname || '');
              setSpouseFirst(fb.spouse.first_name || '');
              setSpouseMiddle(fb.spouse.middle_name || '');
              setSpouseExt(fb.spouse.name_extension || '');
              setSpouseOccupation(fb.spouse.occupation || '');
              setSpouseEmployer(fb.spouse.employer_business_name || fb.spouse.employer || p.spouse_employer_business || '');
              setSpouseBusAddress(fb.spouse.business_address || '');
              setSpouseTelephone(fb.spouse.telephone_no || fb.spouse.telephone || p.spouse_telephone || '');
            }
            if (fb.father) {
              setFatherSurname(fb.father.surname || '');
              setFatherFirst(fb.father.first_name || '');
              setFatherMiddle(fb.father.middle_name || '');
              setFatherExt(fb.father.name_extension || '');
            }
            if (fb.mother) {
              setMotherSurname(fb.mother.maiden_surname || fb.mother.surname || p.mother_maiden_surname || '');
              setMotherFirst(fb.mother.first_name || '');
              setMotherMiddle(fb.mother.middle_name || '');
            }
            if (fb.children && Array.isArray(fb.children) && fb.children.length > 0) {
              setChildrenList(fb.children);
            } else if (p.children_details && Array.isArray(p.children_details) && p.children_details.length > 0) {
              setChildrenList(p.children_details);
            }
          }

          if (p.educational_background) {
            try {
              let edParsed = Array.isArray(p.educational_background) ? p.educational_background : (typeof p.educational_background === 'string' ? JSON.parse(p.educational_background) : p.educational_background);
              const newEd = { ...educationalDates };
              if (Array.isArray(edParsed)) {
                console.log("Parsing Educational Background:", edParsed);
                edParsed.forEach((ed: any, idx: number) => {
                  const levelMap: any = {
                    'ELEMENTARY': 'elementary',
                    'SECONDARY': 'secondary',
                    'VOCATIONAL / TRADE COURSE': 'vocational',
                    'VOCATIONAL': 'vocational',
                    'COLLEGE': 'college',
                    'GRADUATE STUDIES': 'graduate',
                    'GRADUATE': 'graduate'
                  };
                  const fallbackLevels = ['elementary', 'secondary', 'vocational', 'college', 'graduate'];

                  // Extract level or use fallback
                  let matchedLevel = null;
                  if (ed.level) {
                    matchedLevel = levelMap[ed.level.toUpperCase()] || ed.level.toLowerCase();
                  } else if (idx < fallbackLevels.length) {
                    matchedLevel = fallbackLevels[idx];
                  }

                  if (matchedLevel) {
                    newEd[matchedLevel] = {
                      school: ed.school || ed.school_name || '',
                      degree: ed.degree || ed.degree_course || '',
                      from: ed.from || ed.period_from || ed.attendance_from || '',
                      to: ed.to || ed.period_to || ed.attendance_to || '',
                      units: ed.units || ed.highest_level || '',
                      year: ed.year || ed.year_graduated || '',
                      honors: ed.honors || ed.honors_received || ''
                    };
                  }
                });
                console.log("Parsed result:", newEd);
                setEducationalDates(newEd);
                setDebugRawEdu(edParsed);
              }
            } catch (e) {
              console.error("Failed to parse educational background", e);
            }
          }
          if (p.civil_service_eligibility) setCivilServiceList(Array.isArray(p.civil_service_eligibility) ? p.civil_service_eligibility : (typeof p.civil_service_eligibility === 'string' ? JSON.parse(p.civil_service_eligibility) : p.civil_service_eligibility));
          if (p.work_experience) {
            let we = Array.isArray(p.work_experience) ? p.work_experience : (typeof p.work_experience === 'string' ? JSON.parse(p.work_experience) : p.work_experience);
            we = we.map((w: any) => ({
              company: w.company || '',
              positionTitle: w.positionTitle || w.position || '',
              fromDate: w.fromDate || w.from_date || '',
              toDate: w.toDate || w.to_date || '',
              monthlySalary: w.monthlySalary || w.salary || '',
              salaryGrade: w.salaryGrade || w.pay_grade || '',
              statusOfAppointment: w.statusOfAppointment || w.status || '',
              govtService: w.govtService || w.govt_service || ''
            }));
            setWorkExperienceList(we);
          }
          if (p.voluntary_work) {
            let vw = Array.isArray(p.voluntary_work) ? p.voluntary_work : (typeof p.voluntary_work === 'string' ? JSON.parse(p.voluntary_work) : p.voluntary_work);
            vw = vw.map((v: any) => ({
              nameAddress: v.nameAddress || v.organization || '',
              fromDate: v.fromDate || v.from_date || '',
              toDate: v.toDate || v.to_date || '',
              hours: v.hours || '',
              position: v.position || ''
            }));
            setVoluntaryWorkList(vw);
          }
          if (p.learning_and_development) {
            let ld = Array.isArray(p.learning_and_development) ? p.learning_and_development : (typeof p.learning_and_development === 'string' ? JSON.parse(p.learning_and_development) : p.learning_and_development);
            ld = ld.map((l: any) => ({
              title: l.title || '',
              fromDate: l.fromDate || l.from_date || '',
              toDate: l.toDate || l.to_date || '',
              hours: l.hours || '',
              type: l.type || '',
              sponsor: l.sponsor || l.conducted_by || ''
            }));
            setLearningDevelopmentList(ld);
          }

          if (p.other_information) {
            const oi = typeof p.other_information === 'string' ? JSON.parse(p.other_information) : p.other_information;
            if (oi.extensionName || oi.extension_name) setExtensionName(oi.extensionName || oi.extension_name);
            if (oi.height) setHeight(oi.height);
            if (oi.weight) setWeight(oi.weight);
            if (oi.agencyEmployeeNo || oi.agency_employee_no) setAgencyEmployeeNo(oi.agencyEmployeeNo || oi.agency_employee_no);
            if (oi.citizenshipType || oi.citizenship_type) setCitizenshipType(oi.citizenshipType || oi.citizenship_type);
            // Handle skills, mapping from both legacy 'skills' and current 'special_skills'
            const rawSkills = oi.special_skills || oi.skills;
            if (rawSkills) {
              const formattedSkills = Array.isArray(rawSkills)
                ? rawSkills.map((s: any) => typeof s === 'string' ? { value: s } : s)
                : [{ value: String(rawSkills) }];
              setSkillsList(formattedSkills);
            }

            if (oi.distinctions) {
              const formattedDist = Array.isArray(oi.distinctions)
                ? oi.distinctions.map((d: any) => typeof d === 'string' ? { value: d } : d)
                : [{ value: String(oi.distinctions) }];
              setDistinctionsList(formattedDist);
            }

            if (oi.memberships) {
              const formattedMem = Array.isArray(oi.memberships)
                ? oi.memberships.map((m: any) => typeof m === 'string' ? { value: m } : m)
                : [{ value: String(oi.memberships) }];
              setMembershipsList(formattedMem);
            }
            if (oi.references) setReferencesList(oi.references);
            if (oi.governmentId) setGovernmentId(oi.governmentId);
            if (oi.children) setChildrenList(oi.children);
            if (oi.documents) setUploadedDocumentUrls(oi.documents);
            if (oi.photoUrl) setPhotoUrl(oi.photoUrl);
          }
          if (p.questionnaire_responses) {
            const parsedQ = typeof p.questionnaire_responses === 'string' ? JSON.parse(p.questionnaire_responses) : p.questionnaire_responses;
            const normalizedQ: any = {};

            // Extract references and gov ID if they exist inside questionnaire_responses
            const refs: any[] = [];
            const newGovId = { type: '', idNo: '', datePlace: '' };
            let foundRefs = false;
            let foundGov = false;

            for (const k in parsedQ) {
              const val = parsedQ[k];

              if (k.startsWith('ref')) {
                foundRefs = true;
                const match = k.match(/ref(\d+)_(name|address|tel)/);
                if (match) {
                  const idx = parseInt(match[1]) - 1;
                  const field = match[2] === 'tel' ? 'telephone' : match[2];
                  while (refs.length <= idx) refs.push({ name: '', address: '', telephone: '' });
                  refs[idx][field] = val || '';
                }
                continue;
              }

              if (k.startsWith('gov_id')) {
                foundGov = true;
                if (k === 'gov_id_type') newGovId.type = val || '';
                if (k === 'gov_id_no') newGovId.idNo = val || '';
                if (k === 'gov_id_issuance') newGovId.datePlace = val || '';
                continue;
              }

              let ans = val;
              let details = '';
              if (val && typeof val === 'object') {
                ans = val.answer;
                details = val.details || '';
              }

              if (ans === null || ans === undefined) {
                ans = '';
              }

              let mapKey = k;
              if (mapKey.startsWith('q')) mapKey = mapKey.substring(1);

              normalizedQ[mapKey] = {
                answer: String(ans).toUpperCase() === 'YES' ? 'Yes' : (String(ans).toUpperCase() === 'NO' ? 'No' : ans),
                details: details
              };
            }

            if (!normalizedQ['40b_ethnic'] && p.ethnic_group && p.ethnic_group !== 'No') {
              normalizedQ['40b_ethnic'] = {
                answer: 'Yes',
                details: p.ethnic_group
              };
            }

            setQuestionnaire(normalizedQ);
            if (foundRefs && refs.length > 0) setReferencesList(refs);
            if (foundGov) setGovernmentId(newGovId);
          }
          setIsProfileLoaded(true);
        }
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setIsProfileLoaded(true); // set it true even on error to avoid hanging
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/saved-jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSavedJobIds(data.data.map((job: any) => job.position_id));
        }
      })
      .catch(err => console.error('Error fetching saved jobs:', err));
  }, [navigate]);

  const handleApply = (job: any) => {
    setApplyingJob(job);
    setActiveTab('application-form');
    if (Number(percentage) >= 90) {
      setCurrentStep('Essential Documents');
    } else {
      setCurrentStep('Personal Information');
    }
  };

  useEffect(() => {
    if (location.state?.applyJob && isProfileLoaded) {
      handleApply(location.state.applyJob);
      // Clear the state so it doesn't re-trigger on reload
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, isProfileLoaded, navigate, percentage]);



  const toggleSaveJob = async (jobId: string | number) => {
    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        Swal.fire({
          title: 'Authentication Required',
          text: 'You must be logged in to save jobs.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Log In',
          cancelButtonText: 'Create an account',
          confirmButtonColor: '#0a6fa6',
          cancelButtonColor: '#f59e0b'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate('/apply');
          }
        });
        return;
      }
      const session = JSON.parse(sessionStr);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/save-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positionId: jobId })
      });
      const data = await response.json();

      if (data.success) {
        setSavedJobIds(prev =>
          prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to save job.', 'error');
    }
  };

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
      {/* Header */}
      <ApplicantHeader firstName={firstName} lastName={lastName} photoUrl={photoUrl ? `${import.meta.env.VITE_API_URL}/api/applicants/proxy-blob?url=${encodeURIComponent(photoUrl)}` : null} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Tabs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-100 px-2 sm:px-0">
            <div className="flex items-center overflow-x-auto hide-scrollbar">
              <button
                onClick={() => navigate('/applicant-dashboard')}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px] flex items-center justify-center gap-2 group shrink-0 my-2 ml-4 sm:ml-6 mr-3"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
              </button>
              <button
                onClick={() => setActiveTab('job-board')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[14px] font-bold whitespace-nowrap transition-colors ${activeTab === 'job-board' ? 'text-[#2563eb] border-b-[3px] border-[#2563eb]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Briefcase className="w-[18px] h-[18px]" /> Job Board
              </button>
              <button
                onClick={() => setActiveTab('my-applications')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[14px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-applications' ? 'text-[#2563eb] border-b-[3px] border-[#2563eb]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <FileText className="w-[18px] h-[18px]" /> My Applications
              </button>
              <button
                onClick={() => setActiveTab('my-saved-jobs')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[14px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-saved-jobs' ? 'text-[#2563eb] border-b-[3px] border-[#2563eb]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Bookmark className="w-[18px] h-[18px]" /> My Saved Jobs
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-6 lg:px-0 lg:pr-6 pb-4 lg:pb-0 lg:py-3 w-full lg:w-auto">
              {parseFloat(percentage) >= 90 ? (
                <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Download PDS?',
                        text: 'Do you want to download your Personal Data Sheet (PDS)?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, download it!'
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          try {
                            const session = JSON.parse(localStorage.getItem('session_data') || '{}');
                        if (!session.id) return;
                        
                        Swal.fire({
                          title: 'Generating PDS...',
                          text: 'Please wait while we generate your Personal Data Sheet.',
                          allowOutsideClick: false,
                          didOpen: () => Swal.showLoading()
                        });
                        
                        const resDb = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`);
                        const dataDb = await resDb.json();
                          let applicant = Array.isArray(dataDb) ? dataDb[0] : dataDb;
                          if (applicant && applicant.success && applicant.data) {
                            applicant = Array.isArray(applicant.data) ? applicant.data[0] : applicant.data;
                          }
                        
                        let oi = applicant.other_information || {};
                        if (typeof oi === 'string') oi = JSON.parse(oi);
                        let fb = applicant.family_background || {};
                        if (typeof fb === 'string') fb = JSON.parse(fb);
                        
                        let edParsed = applicant.educational_background || [];
                        if (typeof edParsed === 'string') edParsed = JSON.parse(edParsed);
                        const newEd: any = {};
                        if (Array.isArray(edParsed)) {
                          edParsed.forEach((ed: any, idx: number) => {
                            const levelMap: any = { 'ELEMENTARY': 'elementary', 'SECONDARY': 'secondary', 'VOCATIONAL': 'vocational', 'COLLEGE': 'college', 'GRADUATE': 'graduate' };
                            const fallbackLevels = ['elementary', 'secondary', 'vocational', 'college', 'graduate'];
                            let matchedLevel = '';
                            if (ed.level && levelMap[ed.level.toUpperCase()]) matchedLevel = levelMap[ed.level.toUpperCase()];
                            else if (idx < fallbackLevels.length) matchedLevel = fallbackLevels[idx];
                            if (matchedLevel) {
                              newEd[matchedLevel] = {
                                school: ed.school || ed.school_name || '',
                                degree: ed.degree || ed.degree_course || '',
                                from: ed.from || ed.period_from || ed.attendance_from || '',
                                to: ed.to || ed.period_to || ed.attendance_to || '',
                                units: ed.units || ed.highest_level || '',
                                year: ed.year || ed.year_graduated || '',
                                honors: ed.honors || ed.honors_received || ''
                              };
                            }
                          });
                        }
                        
                        const payload: any = {
                          ...applicant,
                          surname: applicant.surname,
                          firstName: applicant.first_name,
                          middleName: applicant.middle_name,
                          nameExtension: applicant.name_extension,
                          dateOfBirth: applicant.date_of_birth,
                          emailAddress: applicant.email_address,
                          ...oi,
                          ...fb,
                          familyBackground: { children: fb.children || [] },
                          educationalDates: newEd,
                          civilServiceList: typeof applicant.civil_service_eligibility === 'string' ? JSON.parse(applicant.civil_service_eligibility) : applicant.civil_service_eligibility || [],
                          workExperienceList: typeof applicant.work_experience === 'string' ? JSON.parse(applicant.work_experience) : applicant.work_experience || [],
                          voluntaryWorkList: typeof applicant.voluntary_work === 'string' ? JSON.parse(applicant.voluntary_work) : applicant.voluntary_work || [],
                          learningDevelopmentList: typeof applicant.training_programs === 'string' ? JSON.parse(applicant.training_programs) : applicant.training_programs || [],
                        };
                        
                        if (oi.special_skills) payload.skillsList = oi.special_skills;
                        if (oi.distinctions) payload.distinctionsList = oi.distinctions;
                        if (oi.memberships) payload.membershipsList = oi.memberships;
                        if (oi.references) payload.referencesList = oi.references;
                        if (oi.government_id) payload.governmentId = oi.government_id;
                        
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/convert-pds-v2`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(payload)
                        });
                        
                        if (!res.ok) throw new Error('Failed to generate PDS');
                        
                        const contentType = res.headers.get('Content-Type');
                        const ext = contentType?.includes('pdf') ? 'pdf' : 'xlsx';
                        
                        const blob = await res.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        const cleanFirstName = (applicant.first_name || 'Applicant').replace(/[^a-zA-Z0-9]/g, '');
                        const cleanLastName = (applicant.surname || 'Name').replace(/[^a-zA-Z0-9]/g, '');
                        a.download = `PDS_${cleanFirstName}_${cleanLastName}.${ext}`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                        Swal.close();
                      } catch (err) {
                        console.error(err);
                        Swal.fire('Error', 'Failed to generate PDS', 'error');
                      }
                        }
                      });
                    }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl text-[11px] transition-colors tracking-wide uppercase shadow-sm border border-gray-200"
                >
                  PRINT PDS
                </button>
              ) : (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Profile Incomplete',
                      text: 'Your profile must be at least 90% complete before you can print your Personal Data Sheet.',
                      icon: 'warning',
                      confirmButtonColor: '#3085d6'
                    });
                  }}
                  className="bg-gray-50 text-gray-400 font-bold py-2.5 px-4 rounded-xl text-[11px] cursor-not-allowed tracking-wide uppercase shadow-sm border border-gray-100"
                >
                  PRINT PDS
                </button>
              )}
              <button 
                onClick={() => {
                  Swal.fire({
                    title: 'Download Experience Sheet?',
                    text: 'Do you want to download your Work Experience Sheet?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, download it!'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        const session = JSON.parse(localStorage.getItem('session_data') || '{}');
                        if (!session.id) return;
                        
                        Swal.fire({
                          title: 'Generating Experience Sheet...',
                          text: 'Please wait while we generate your document.',
                          allowOutsideClick: false,
                          didOpen: () => Swal.showLoading()
                        });
                        
                        const resDb = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}`);
                        const dataDb = await resDb.json();
                        let applicant = Array.isArray(dataDb) ? dataDb[0] : dataDb;
                        if (applicant && applicant.success && applicant.data) {
                          applicant = Array.isArray(applicant.data) ? applicant.data[0] : applicant.data;
                        }

                        const payload = {
                          workExperienceList: typeof applicant.work_experience === 'string' ? JSON.parse(applicant.work_experience) : applicant.work_experience || []
                        };

                        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applicants/convert-experience`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(payload)
                        });
                        
                        if (!res.ok) throw new Error('Failed to generate Experience Sheet');
                        
                        const blob = await res.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        const cleanFirstName = (applicant.first_name || 'Applicant').replace(/[^a-zA-Z0-9]/g, '');
                        const cleanLastName = (applicant.surname || 'Name').replace(/[^a-zA-Z0-9]/g, '');
                        a.download = `Work_Experience_${cleanFirstName}_${cleanLastName}.xlsx`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                        Swal.close();
                      } catch (err) {
                        console.error(err);
                        Swal.fire('Error', 'Failed to generate Experience Sheet', 'error');
                      }
                    }
                  });
                }}
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-2.5 px-4 rounded-xl text-[11px] transition-colors tracking-wide uppercase shadow-sm"
              >
                WORK EXPERIENCE SHEET
              </button>
            </div>

          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {activeTab === 'job-board' && (
              <>
                {/* Search & Filter */}
                <div className="flex flex-col gap-4 mb-8">
                  {/* Search Row */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <Search className="w-5 h-5 text-[#2563eb] shrink-0 mr-3" />
                      <input
                        type="text"
                        placeholder="Search position title, division, or location..."
                        value={searchQuery}
                        onChange={(e: any) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[15px] font-medium"
                      />
                    </div>
                    <button
                      onClick={handleClearFilters}
                      className="hidden sm:flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md active:scale-95 shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-gray-500" /> Clear
                    </button>
                  </div>

                  {/* Filters Row */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <MapPin className="w-5 h-5 text-rose-500 shrink-0 mr-3" />
                      <select
                        value={filterRegion}
                        onChange={(e: any) => handleRegionChange(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Regions">All Regions</option>
                        {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <Building2 className="w-5 h-5 text-violet-500 shrink-0 mr-3" />
                      <select
                        value={filterDivision}
                        onChange={(e: any) => setFilterDivision(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Divisions">All Divisions</option>
                        {filteredAvailableDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <Briefcase className="w-5 h-5 text-amber-500 shrink-0 mr-3" />
                      <select
                        value={filterPosition}
                        onChange={(e: any) => setFilterPosition(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Positions">All Positions</option>
                        {availablePositions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-gray-500">Show</span>
                    <select
                      value={jobsPerPage}
                      onChange={(e: any) => setJobsPerPage(Number(e.target.value))}
                      className="border border-gray-200 rounded px-2 py-1 text-[13px] font-medium text-gray-700 outline-none focus:border-[#0a6fa6]"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100000}>All</option>
                    </select>
                    <span className="text-[13px] font-semibold text-gray-500">entries</span>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('card')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <LayoutGrid className="w-4 h-4" /> Card View
                    </button>
                    <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <List className="w-4 h-4" /> Table View
                    </button>
                  </div>
                </div>

                {/* Job List */}
                {viewMode === 'table' ? (
                  <JobTableList
                    jobs={currentJobs}
                    tab={activeTab}
                    appliedJobIds={appliedJobIds}
                    savedJobIds={savedJobIds}
                    toggleSaveJob={toggleSaveJob}
                    handleApply={handleApply}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                    {currentJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        tab={activeTab}
                        appliedJobIds={appliedJobIds}
                        savedJobIds={savedJobIds}
                        toggleSaveJob={toggleSaveJob}
                        handleApply={handleApply}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                  <div className="text-[13px] text-gray-500 font-bold uppercase tracking-wider">
                    SHOWING {filteredPositions.length > 0 ? indexOfFirstJob + 1 : 0} TO {Math.min(indexOfLastJob, filteredPositions.length)} OF {filteredPositions.length} ENTRIES
                  </div>
                  {totalJobPages > 1 && (
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar max-w-full">
                      <button
                        onClick={() => setCurrentJobPage(p => Math.max(1, p - 1))}
                        disabled={currentJobPage === 1}
                        className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalJobPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentJobPage(pageNum)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-lg flex items-center justify-center text-[13px] font-bold transition-colors ${currentJobPage === pageNum
                            ? 'bg-[#0a6fa6] text-white border border-[#0a6fa6]'
                            : 'text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentJobPage(p => Math.min(totalJobPages, p + 1))}
                        disabled={currentJobPage === totalJobPages}
                        className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'my-applications' && (
              <div className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-xl font-bold text-[#003366]">My Applications</h3>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('card')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <LayoutGrid className="w-4 h-4" /> Card View
                    </button>
                    <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <List className="w-4 h-4" /> Table View
                    </button>
                  </div>
                </div>
                {applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium border border-gray-200 rounded-xl">
                    You haven't applied for any positions yet.
                  </div>
                ) : viewMode === 'table' ? (
                  <JobTableList
                    jobs={currentApps}
                    tab={activeTab}
                    appliedJobIds={appliedJobIds}
                    savedJobIds={savedJobIds}
                    toggleSaveJob={toggleSaveJob}
                    handleApply={handleApply}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentApps.map((app) => (
                      <JobCard
                        key={app.id}
                        job={app}
                        tab={activeTab}
                        appliedJobIds={appliedJobIds}
                        savedJobIds={savedJobIds}
                        toggleSaveJob={toggleSaveJob}
                        handleApply={handleApply}
                      />
                    ))}
                  </div>
                )}

                {applications.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 text-gray-500 hover:text-[#3b82f6] disabled:opacity-50 disabled:hover:text-gray-500"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="bg-[#3b82f6] text-white w-8 h-8 flex items-center justify-center rounded-md font-medium text-sm">
                      {currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1 text-gray-500 hover:text-[#3b82f6] disabled:opacity-50 disabled:hover:text-gray-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'my-saved-jobs' && (
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-xl font-bold text-[#003366]">My Saved Jobs</h3>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('card')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <LayoutGrid className="w-4 h-4" /> Card View
                    </button>
                    <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <List className="w-4 h-4" /> Table View
                    </button>
                  </div>
                </div>
                {savedJobIds.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-xl shadow-sm border border-gray-200">
                    You haven't saved any jobs yet.
                  </div>
                ) : viewMode === 'table' ? (
                  <JobTableList
                    jobs={positions.filter(job => savedJobIds.includes(job.id))}
                    tab={activeTab}
                    appliedJobIds={appliedJobIds}
                    savedJobIds={savedJobIds}
                    toggleSaveJob={toggleSaveJob}
                    handleApply={handleApply}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {positions.filter(job => savedJobIds.includes(job.id)).map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        tab={activeTab}
                        appliedJobIds={appliedJobIds}
                        savedJobIds={savedJobIds}
                        toggleSaveJob={toggleSaveJob}
                        handleApply={handleApply}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'application-form' && applyingJob && (
              <div className="flex flex-col md:flex-row gap-6 bg-[#eff3f8] p-6 -mx-6 -mb-8 mt-[-24px] min-h-[800px]">
                {/* Left Sidebar */}
                <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col bg-white shadow-sm shrink-0 h-fit border border-gray-100 rounded-sm overflow-hidden">
                  <div className="bg-[#1a73e8] p-5 flex items-center gap-4 border-b-4 border-red-500">
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className="w-[60px] h-[60px] bg-white rounded-full flex flex-col items-center justify-center font-extrabold text-[11px] leading-none text-center text-black shrink-0 shadow-sm cursor-pointer hover:bg-gray-100 overflow-hidden transition-colors"
                    >
                      {photoUrl ? (
                        <img src={photoUrl.startsWith('http') ? `${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(photoUrl)}` : photoUrl} alt="Profile" className="w-full h-full object-cover" />
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
                    />
                    <div className="flex flex-col text-white">
                      <span className="font-bold text-[16px] uppercase tracking-wide">{firstName} {lastName}</span>
                      <span className="text-[13px] leading-snug mt-1 opacity-90">Applying for {applyingJob.title}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {[
                      { name: 'Personal Information', icon: FileText },
                      { name: 'Family Background', icon: FileText },
                      { name: 'Educational Background', icon: GraduationCap },
                      { name: 'Eligibility', icon: FileText },
                      { name: 'Work Experience', icon: Briefcase },
                      { name: 'Voluntary Work', icon: FileText },
                      { name: 'Learning & Development', icon: FileText },
                      { name: 'Other Information', icon: FileText },
                      { name: 'Legal Questionnaire', icon: FileText },
                      { name: 'Essential Documents', icon: FileText }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = currentStep === item.name;
                      const isCompleted = completedSteps.includes(item.name);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleTabClick(item.name)}
                          className={`flex items-center justify-between px-5 py-3.5 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${isCompleted ? 'bg-[#34a853]' : (isActive ? 'bg-[#1a73e8]' : 'bg-gray-100')}`}>
                              <Icon className={`w-4 h-4 ${isCompleted || isActive ? 'text-white' : 'text-gray-300'}`} />
                            </div>
                            <span className={`text-[14px] font-semibold tracking-wide ${isActive ? 'text-[#1a73e8]' : 'text-[#8599ad]'}`}>{item.name}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#34a853]' : (isActive ? 'bg-red-500' : 'bg-gray-200')}`}></div>
                        </button>
                      );
                    })}
                  </div>

                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Progress Alert */}
                  <div className="bg-[#e8f5e9] border border-[#bbf7d0] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-[15px] font-bold text-[#1b5e20]">
                          {parseFloat(percentage) >= 100 ? "Ready to Submit" : "Complete your Profile"}
                        </h2>
                        <p className="text-sm text-[#2e7d32] font-medium leading-snug">
                          {parseFloat(percentage) >= 100
                            ? "Your profile is fully complete! You can now submit your application."
                            : `Your profile is ${percentage}% complete. Fill in the missing information below to improve your chances.`}
                        </p>
                      </div>
                    </div>

                    {parseFloat(percentage) >= 100 ? (
                      <button
                        type="button"
                        onClick={() => setShowLoiModal(true)}
                        className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-extrabold text-[13px] py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap uppercase tracking-wider shrink-0"
                      >
                        Submit Application
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </button>
                    ) : (
                      <div className="w-full sm:w-64 shrink-0">
                        <div className="flex items-center justify-between mb-1.5 px-1">
                          <span className="text-[11px] font-extrabold text-[#1b5e20] tracking-wider uppercase">Progress</span>
                          <span className="text-[11px] font-extrabold text-[#1b5e20]">{percentage}%</span>
                        </div>
                        <div className="w-full bg-[#bbf7d0] h-2.5 rounded-full overflow-hidden">
                          <div className="bg-[#2e7d32] h-full transition-all duration-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Content Box */}
                  <div className="bg-white p-10 border border-gray-200 shadow-sm flex flex-col items-center rounded-sm [&_input[type='text']]:uppercase [&_textarea]:uppercase">
                    <h3 className="text-[18px] text-gray-500 uppercase tracking-widest mb-10 text-center font-light">{currentStep}</h3>

                    <div className={currentStep === 'Personal Information' ? 'block' : 'hidden'}>
                      <form id="form-Personal Information" className="w-full space-y-8" onSubmit={handlePersonalInfoSubmit}>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Name <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                              <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                              <input type="text" placeholder="Enter middle name" value={middleName} onChange={e => setMiddleName(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Last Name</span>
                              <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Extension Name</span>
                              <input type="text" placeholder="Enter extension name" value={extensionName} onChange={e => setExtensionName(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Birth Details <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-[35%] flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Birth</span>
                              <CustomDatePicker
                                value={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                placeholder="Select date of birth"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">City, town, etc.</span>
                              <input type="text" required placeholder="Enter place of birth" value={placeOfBirth} onChange={e => setPlaceOfBirth(e.target.value)} className="w-full border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px]" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Sex <span className="text-red-500">*</span></label>
                          <div className="flex gap-4">
                            <button type="button" onClick={() => setSex('MALE')} className={`${sex?.toUpperCase() === 'MALE' ? 'bg-[#3498db] text-white' : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === 'MALE' ? 'bg-white' : 'bg-gray-400'}`}></div> MALE
                            </button>
                            <button type="button" onClick={() => setSex('FEMALE')} className={`${sex?.toUpperCase() === 'FEMALE' ? 'bg-[#3498db] text-white' : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${sex?.toUpperCase() === 'FEMALE' ? 'bg-white' : 'bg-gray-400'}`}></div> FEMALE
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Civil Status <span className="text-red-500">*</span></label>
                          <select required value={civilStatus} onChange={e => setCivilStatus(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 min-w-[200px] h-[42px] ">
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
                            <div className="text-[10px] text-gray-400 font-normal mt-0.5 leading-tight">Specify your Height,<br />Weight, and Blood Type</div>
                          </label>
                          <div className="flex-1 flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Height</span>
                              <div className="flex">
                                <input type="text" required placeholder="Enter height" value={height} onChange={e => setHeight(e.target.value)} className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" />
                                <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">m</span>
                              </div>
                            </div>
                            <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Weight</span>
                              <div className="flex">
                                <input type="text" required placeholder="Enter weight" value={weight} onChange={e => setWeight(e.target.value)} className="w-full border border-gray-300 rounded-l p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" />
                                <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2.5 text-[13px] text-gray-500 flex items-center justify-center bg-gray-200 font-medium">kg</span>
                              </div>
                            </div>
                            <div className="w-full sm:w-1/3 flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Blood Type</span>
                              <select required value={bloodType} onChange={e => setBloodType(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full">
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
                            Agency Employee No.<br /><span className="text-[12px] text-gray-400 font-normal">(if any)</span>
                          </label>
                          <input type="text" placeholder="Enter agency employee number" value={agencyEmployeeNo} onChange={e => setAgencyEmployeeNo(e.target.value)} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Religion</label>
                          <input type="text" placeholder="Enter religion" value={religion} onChange={e => setReligion(e.target.value)} className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]" />
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px]">Citizenship <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
                            <select required value={citizenship} onChange={e => setCitizenship(e.target.value)} className="w-full sm:w-[240px] border border-gray-300 rounded p-2.5 text-[14px] text-gray-500 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px]">
                              <option value="">Enter citizenship</option>
                              <option value="Filipino">Filipino</option>
                              <option value="Dual Citizenship">Dual Citizenship</option>
                            </select>
                            <div className="flex items-center gap-6">
                              <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                                <input type="radio" name="citizenship_type" checked={citizenshipType === 'by Birth'} onChange={() => setCitizenshipType('by Birth')} className="w-3.5 h-3.5 text-blue-600 border-gray-300" />
                                by Birth
                              </label>
                              <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-600">
                                <input type="radio" name="citizenship_type" checked={citizenshipType === 'by Naturalization'} onChange={() => setCitizenshipType('by Naturalization')} className="w-3.5 h-3.5 text-blue-600 border-gray-300" />
                                by Naturalization
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Residential Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">House / Block / Lot No.</span>
                                <input type="text" value={resHouse} onChange={e => setResHouse(e.target.value)} placeholder="Enter house / block / lot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Street</span>
                                <input type="text" value={resStreet} onChange={e => setResStreet(e.target.value)} placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Subdivision / Village</span>
                                <input type="text" value={resSubdivision} onChange={e => setResSubdivision(e.target.value)} placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">ZIP Code</span>
                                <input type="text" value={resZip} onChange={e => setResZip(e.target.value)} placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Region</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                                  value={resRegion}
                                  onChange={(e: any) => {
                                    setResRegion(e.target.value);
                                    setResProvince('');
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                >
                                  <option value="">Select region</option>
                                  {regionsList.map((r: any, idx: number) => (
                                    <option key={`${r.name}-${idx}`} value={r.name}>{r.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={resProvince}
                                  onChange={(e: any) => {
                                    setResProvince(e.target.value);
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                  disabled={!resRegion}
                                >
                                  <option value="">Select province</option>
                                  {resProvincesList.map((p: any, idx: number) => (
                                    <option key={`${p.name}-${idx}`} value={p.name}>{p.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={resCity}
                                  onChange={(e: any) => {
                                    setResCity(e.target.value);
                                    setResBarangay('');
                                  }}
                                  disabled={!resProvince}
                                >
                                  <option value="">Select city / municipality</option>
                                  {resCitiesList.map((c: any, idx: number) => (
                                    <option key={`${c.name}-${idx}`} value={c.name}>{c.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={isResBarangayOther ? 'OTHER' : resBarangay}
                                  onChange={(e: any) => setResBarangay(e.target.value)}
                                  disabled={!resCity}
                                >
                                  <option value="">Select barangay</option>
                                  {resBarangaysList.map((b: any, idx: number) => (
                                    <option key={idx} value={b.name}>{b.name}</option>
                                  ))}
                                  <option value="OTHER">Other</option>
                                </select>
                                {isResBarangayOther && (
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      required
                                      placeholder="Type your barangay"
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                                      value={resBarangay === 'OTHER' ? '' : resBarangay}
                                      onChange={(e: any) => setResBarangay(e.target.value)}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Permanent Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600 mb-1">
                              <input
                                type="checkbox"
                                className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded"
                                checked={sameAsResidential}
                                onChange={(e: any) => setSameAsResidential(e.target.checked)}
                              />
                              <span className="font-bold">Same as Residential Address?</span> <span className="italic text-gray-400">(check if permanent address is same with the above address)</span>
                            </label>

                            {!sameAsResidential && (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">House / Block / Lot No.</span>
                                    <input type="text" value={permHouse} onChange={e => setPermHouse(e.target.value)} placeholder="Enter house / block / lot No." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Street</span>
                                    <input type="text" value={permStreet} onChange={e => setPermStreet(e.target.value)} placeholder="Enter street" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Subdivision / Village</span>
                                    <input type="text" value={permSubdivision} onChange={e => setPermSubdivision(e.target.value)} placeholder="Enter subdivision / village" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">ZIP Code</span>
                                    <input type="text" value={permZip} onChange={e => setPermZip(e.target.value)} placeholder="Enter ZIP code" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Region</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                                      value={permRegion}
                                      onChange={(e: any) => {
                                        setPermRegion(e.target.value);
                                        setPermProvince('');
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                    >
                                      <option value="">Select region</option>
                                      {regionsList.map((r: any, idx: number) => (
                                        <option key={`${r.name}-${idx}`} value={r.name}>{r.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={permProvince}
                                      onChange={(e: any) => {
                                        setPermProvince(e.target.value);
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                      disabled={!permRegion}
                                    >
                                      <option value="">Select province</option>
                                      {permProvincesList.map((p: any, idx: number) => (
                                        <option key={`${p.name}-${idx}`} value={p.name}>{p.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={permCity}
                                      onChange={(e: any) => {
                                        setPermCity(e.target.value);
                                        setPermBarangay('');
                                      }}
                                      disabled={!permProvince}
                                    >
                                      <option value="">Select city / municipality</option>
                                      {permCitiesList.map((c: any, idx: number) => (
                                        <option key={`${c.name}-${idx}`} value={c.name}>{c.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={isPermBarangayOther ? 'OTHER' : permBarangay}
                                      onChange={(e: any) => setPermBarangay(e.target.value)}
                                      disabled={!permCity}
                                    >
                                      <option value="">Select barangay</option>
                                      {permBarangaysList.map((b: any, idx: number) => (
                                        <option key={idx} value={b.name}>{b.name}</option>
                                      ))}
                                      <option value="OTHER">Other</option>
                                    </select>
                                    {isPermBarangayOther && (
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          required={!sameAsResidential}
                                          placeholder="Type your barangay"
                                          className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full"
                                          value={permBarangay === 'OTHER' ? '' : permBarangay}
                                          onChange={(e: any) => setPermBarangay(e.target.value)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Contact Nos.</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No. <span className="text-gray-400 font-normal italic text-[10px]">(Optional)</span></span>
                              <input type="text" value={telephoneNo} onChange={e => setTelephoneNo(e.target.value)} placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Mobile No.</span>
                              <input type="text" value={mobileNo} onChange={e => { const val = e.target.value.replace(/\D/g, ''); if (val.length <= 11) setMobileNo(val); }} maxLength={11} required placeholder="Enter mobile no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Email Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Primary</span>
                              <input type="email" required value={emailAddress} onChange={e => setEmailAddress(e.target.value)} className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Alternate</span>
                              <input type="email" value={alternateEmail} onChange={e => setAlternateEmail(e.target.value)} placeholder="Enter alternate email" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Family Background' ? 'block' : 'hidden'}>
                      <form id="form-Family Background" className="w-full space-y-8" onSubmit={handleFamilyBackgroundSubmit}>

                        {/* Spouse */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                              <input type="text" value={spouseSurname} onChange={e => setSpouseSurname(e.target.value)} placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                              <input type="text" value={spouseFirst} onChange={e => setSpouseFirst(e.target.value)} placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                              <input type="text" value={spouseMiddle} onChange={e => setSpouseMiddle(e.target.value)} placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
                              <input type="text" value={spouseExt} onChange={e => setSpouseExt(e.target.value)} placeholder="e.g. JR., SR" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Spouse's Details</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Occupation</span>
                              <input type="text" value={spouseOccupation} onChange={e => setSpouseOccupation(e.target.value)} placeholder="Enter occupation" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Employer/Business Name</span>
                              <input type="text" value={spouseEmployer} onChange={e => setSpouseEmployer(e.target.value)} placeholder="Enter employer / business name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Business Address</span>
                              <input type="text" value={spouseBusAddress} onChange={e => setSpouseBusAddress(e.target.value)} placeholder="Enter business address" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                              <input type="text" value={spouseTelephone} onChange={e => setSpouseTelephone(e.target.value)} placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Father */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Father's Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                              <input type="text" value={fatherSurname} onChange={e => setFatherSurname(e.target.value)} placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                              <input type="text" value={fatherFirst} onChange={e => setFatherFirst(e.target.value)} placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                              <input type="text" value={fatherMiddle} onChange={e => setFatherMiddle(e.target.value)} placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name Extension</span>
                              <input type="text" value={fatherExt} onChange={e => setFatherExt(e.target.value)} placeholder="e.g. JR., SR" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        {/* Mother */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Mother's Maiden Name</label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Surname</span>
                              <input type="text" value={motherSurname} onChange={e => setMotherSurname(e.target.value)} placeholder="Enter surname" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">First Name</span>
                              <input type="text" value={motherFirst} onChange={e => setMotherFirst(e.target.value)} placeholder="Enter first name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Middle Name</span>
                              <input type="text" value={motherMiddle} onChange={e => setMotherMiddle(e.target.value)} placeholder="Enter middle name" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Children Details */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Children Details <span className="text-[11px] font-normal text-gray-400 italic block leading-tight mt-0.5">(List all children)</span></label>
                          <div className="flex-1 flex flex-col gap-4">
                            {childrenList.map((child, idx) => (
                              <div key={idx} className="flex gap-4 items-start">
                                <div className="flex-1 flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of Child (Write full name)</span>
                                  <input
                                    type="text"
                                    placeholder="Enter child's full name"
                                    value={child.name}
                                    onChange={(e: any) => {
                                      const newChildren = [...childrenList];
                                      newChildren[idx].name = e.target.value;
                                      setChildrenList(newChildren);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="w-[200px] flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Birth</span>
                                  <CustomDatePicker
                                    value={child.dob}
                                    onChange={(date) => {
                                      const newChildren = [...childrenList];
                                      newChildren[idx].dob = date;
                                      setChildrenList(newChildren);
                                    }}
                                    placeholder="Select date of birth"
                                  />
                                </div>
                                <div className="pt-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setChildrenList(childrenList.filter((_, i) => i !== idx));
                                    }}
                                    className="p-2.5 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => setChildrenList([...childrenList, { name: '', dob: null }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Child
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Personal Information')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Educational Background' ? 'block' : 'hidden'}>
                      <form id="form-Educational Background" className="w-full max-w-5xl space-y-6" onSubmit={handleEducationalBackgroundSubmit}>

                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please fill in your educational background. Write "N/A" if not applicable.</p>
                        </div>
                        {[
                          { id: 'elementary', label: 'Elementary', required: true },
                          { id: 'secondary', label: 'Secondary', required: true },
                          { id: 'vocational', label: 'Vocational / Trade Course', required: false },
                          { id: 'college', label: 'College', required: true },
                          { id: 'graduate', label: 'Graduate Studies', required: false }
                        ].map((level) => (
                          <div key={level.id} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm">
                            <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 rounded-t-lg">
                              <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">{level.label} {level.required && <span className="text-red-500">*</span>}</h3>
                            </div>
                            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>
                                <input type="text" value={educationalDates[level.id]?.school || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), school: e.target.value } })} required={level.required} placeholder="Enter name of school" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full min-w-0" />
                              </div>

                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course (Write in full)</span>
                                <input type="text" value={educationalDates[level.id]?.degree || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), degree: e.target.value } })} required={level.required} placeholder="Enter degree/course" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full min-w-0" />
                              </div>

                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>
                                <div className="grid grid-cols-2 gap-3 relative">
                                  <ModernDatePicker required={level.required}
                                    value={educationalDates[level.id]?.from ? new Date(educationalDates[level.id].from as any).toISOString().split('T')[0] : ''}
                                    onChange={(dateStr: any) => setEducationalDates(prev => ({ ...prev, [level.id]: { ...(prev[level.id] || {}), from: dateStr ? new Date(dateStr) : null } }))}
                                    className="w-full min-w-0 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                  <ModernDatePicker required={level.required}
                                    value={educationalDates[level.id]?.to ? new Date(educationalDates[level.id].to as any).toISOString().split('T')[0] : ''}
                                    onChange={(dateStr: any) => setEducationalDates(prev => ({ ...prev, [level.id]: { ...(prev[level.id] || {}), to: dateStr ? new Date(dateStr) : null } }))}
                                    className="w-full min-w-0 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned (if not graduated)</span>
                                <input type="text" value={educationalDates[level.id]?.units || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), units: e.target.value } })} required={level.required} placeholder="Enter level/units" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full min-w-0" />
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>
                                <input type="text" value={educationalDates[level.id]?.year || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), year: e.target.value } })} required={level.required} placeholder="Enter year" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full min-w-0" />
                              </div>

                              <div className="flex flex-col md:col-span-2 justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Scholarship/Academic Honors Received</span>
                                <input type="text" value={educationalDates[level.id]?.honors || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), honors: e.target.value } })} placeholder="Enter scholarship or academic honors" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full min-w-0" />
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Family Background')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Eligibility' ? 'block' : 'hidden'}>
                      <form id="form-Eligibility" className="w-full max-w-5xl space-y-6" onSubmit={handleCivilServiceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your civil service eligibility. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {civilServiceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Eligibility #{idx + 1}</h3>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCivilServiceList(civilServiceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Career Service/RA 1080 (Board/Bar)/Under Special Laws/CES/CSEE</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter eligibility name"
                                    value={item.eligibility}
                                    onChange={(e: any) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].eligibility = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Rating (if applicable)</span>
                                  <input
                                    type="text"
                                    placeholder="Enter rating"
                                    value={item.rating}
                                    onChange={(e: any) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].rating = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>

                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date of Examination / Conferment</span>
                                  <CustomDatePicker
                                    value={item.date}
                                    onChange={(date) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].date = date;
                                      setCivilServiceList(newList);
                                    }}
                                    placeholder="Select date"
                                  />
                                </div>
                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Place of Examination / Conferment</span>
                                  <input
                                    type="text"
                                    placeholder="Enter place of examination"
                                    value={item.place}
                                    onChange={(e: any) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].place = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>

                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Number (if applicable)</span>
                                  <input
                                    type="text"
                                    placeholder="Enter license number"
                                    value={item.licenseNo}
                                    onChange={(e: any) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].licenseNo = e.target.value;
                                      setCivilServiceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col z-40 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">License Date of Validity (if applicable)</span>
                                  <CustomDatePicker
                                    value={item.licenseDate}
                                    onChange={(date) => {
                                      const newList = [...civilServiceList];
                                      newList[idx].licenseDate = date;
                                      setCivilServiceList(newList);
                                    }}
                                    placeholder="Select date of validity"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setCivilServiceList([...civilServiceList, { eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Eligibility
                            </button>
                            <button type="button" onClick={() => setCivilServiceList([{ eligibility: 'N/A', rating: 'N/A', date: null, place: 'N/A', licenseNo: 'N/A', licenseDate: null }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                              N/A
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-between items-center mt-10 border-t border-gray-100 pt-6">
                          <button type="button" onClick={() => setCurrentStep('Educational Background')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Work Experience' ? 'block' : 'hidden'}>
                      <form id="form-Work Experience" className="w-full max-w-5xl space-y-6" onSubmit={handleWorkExperienceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your work experience from most recent to oldest. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {workExperienceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Work Experience #{idx + 1}</h3>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setWorkExperienceList(workExperienceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].fromDate = date;
                                      setWorkExperienceList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].toDate = date;
                                      setWorkExperienceList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                </div>
                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Position Title (Write in full/Do not abbreviate)</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter position title"
                                    value={item.positionTitle}
                                    onChange={(e: any) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].positionTitle = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>

                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Department/Agency/Office/Company</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter department/agency/office/company"
                                    value={item.company}
                                    onChange={(e: any) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].company = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>
                                  <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-[15px] pointer-events-none select-none">₱</span>
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      placeholder="0.00"
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
                                      className="border border-gray-300 rounded p-2.5 pl-8 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full font-medium"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade & Step</span>
                                  <input
                                    type="text"
                                    placeholder="Format 00-0"
                                    value={item.salaryGrade}
                                    onChange={(e: any) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].salaryGrade = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>

                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Status of Appointment</span>
                                  <input
                                    type="text"
                                    placeholder="Enter status of appointment"
                                    value={item.statusOfAppointment}
                                    onChange={(e: any) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].statusOfAppointment = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Gov't Service (Y/N)</span>
                                  <select
                                    required={idx === 0}
                                    value={item.govtService}
                                    onChange={(e: any) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].govtService = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none h-[42px] w-full"
                                  >
                                    <option value="">Select Yes/No</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setWorkExperienceList([...workExperienceList, { fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Work Experience
                            </button>
                            <button type="button" onClick={() => setWorkExperienceList([{ fromDate: null, toDate: null, positionTitle: 'N/A', company: 'N/A', monthlySalary: 'N/A', salaryGrade: 'N/A', statusOfAppointment: 'N/A', govtService: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                              N/A
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-between items-center mt-10 border-t border-gray-100 pt-6">
                          <button type="button" onClick={() => setCurrentStep('Eligibility')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Voluntary Work' ? 'block' : 'hidden'}>
                      <form id="form-Voluntary Work" className="w-full max-w-5xl space-y-6" onSubmit={handleVoluntaryWorkSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your voluntary work or involvement in civic/non-government/people/voluntary organizations. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {voluntaryWorkList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Voluntary Work #{idx + 1}</h3>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVoluntaryWorkList(voluntaryWorkList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-3 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name & Address of Organization (Write in full)</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter name & address of organization"
                                    value={item.nameAddress}
                                    onChange={(e: any) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].nameAddress = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date (From)</span>
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].fromDate = date;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date (To)</span>
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].toDate = date;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>
                                  <input
                                    type="text"
                                    placeholder="Enter number of hours"
                                    value={item.hours}
                                    onChange={(e: any) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].hours = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col lg:col-span-3 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Position / Nature of Work</span>
                                  <input
                                    type="text"
                                    placeholder="Enter position / nature of work"
                                    value={item.position}
                                    onChange={(e: any) => {
                                      const newList = [...voluntaryWorkList];
                                      newList[idx].position = e.target.value;
                                      setVoluntaryWorkList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setVoluntaryWorkList([...voluntaryWorkList, { nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Voluntary Work
                            </button>
                            <button type="button" onClick={() => setVoluntaryWorkList([{ nameAddress: 'N/A', fromDate: null, toDate: null, hours: 'N/A', position: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                              N/A
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Work Experience')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Learning & Development' ? 'block' : 'hidden'}>
                      <form id="form-Learning & Development" className="w-full max-w-5xl space-y-6" onSubmit={handleLearningDevelopmentSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your learning and development (L&D) interventions/training programs attended. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {learningDevelopmentList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Training #{idx + 1}</h3>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setLearningDevelopmentList(learningDevelopmentList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                                <div className="flex flex-col lg:col-span-4 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Title of Learning and Development Interventions/Training Programs (Write in full)</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter title of learning and development interventions/training programs"
                                    value={item.title}
                                    onChange={(e: any) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].title = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date of Attendance (From)</span>
                                  <CustomDatePicker
                                    value={item.fromDate}
                                    onChange={(date) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].fromDate = date;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    placeholder="From Date"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Inclusive Date of Attendance (To)</span>
                                  <CustomDatePicker
                                    value={item.toDate}
                                    onChange={(date) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].toDate = date;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    placeholder="To Date"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Number of Hours</span>
                                  <input
                                    type="text"
                                    placeholder="Enter number of hours"
                                    value={item.hours}
                                    onChange={(e: any) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].hours = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Type of LD</span>
                                  <input
                                    type="text"
                                    placeholder="Managerial/Supervisory/Technical/etc"
                                    value={item.type}
                                    onChange={(e: any) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].type = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col lg:col-span-4 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Conducted/Sponsored By (Write in full)</span>
                                  <input
                                    type="text"
                                    placeholder="Enter sponsor / conducted by"
                                    value={item.sponsor}
                                    onChange={(e: any) => {
                                      const newList = [...learningDevelopmentList];
                                      newList[idx].sponsor = e.target.value;
                                      setLearningDevelopmentList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setLearningDevelopmentList([...learningDevelopmentList, { title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                            >
                              <Plus className="w-4 h-4" /> Add Training Program
                            </button>
                            <button type="button" onClick={() => setLearningDevelopmentList([{ title: 'N/A', fromDate: null, toDate: null, hours: 'N/A', type: 'N/A', sponsor: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 px-5 py-2.5 rounded border border-gray-200 transition-colors">
                              N/A
                            </button>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Voluntary Work')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Other Information' ? 'block' : 'hidden'}>
                      <form id="form-Other Information" className="w-full space-y-8" onSubmit={handleOtherInformationSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your special skills and hobbies, non-academic distinctions, and memberships. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                          {/* Skills */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2 min-h-[48px] flex items-end">Special Skills & Hobbies</h3>
                            <div className="flex flex-col gap-3">
                              {skillsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter skill or hobby"
                                    value={item.value}
                                    onChange={(e: any) => {
                                      const newList = [...skillsList];
                                      newList[idx].value = e.target.value;
                                      setSkillsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                    <button
                                      type="button"
                                      onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setSkillsList([...skillsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Skill / Hobby
                            </button>
                            <button type="button" onClick={() => setSkillsList([{ value: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                              N/A
                            </button>
                          </div>

                          {/* Distinctions */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2 min-h-[48px] flex items-end">Non-Academic Distinctions</h3>
                            <div className="flex flex-col gap-3">
                              {distinctionsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter distinction/recognition"
                                    value={item.value}
                                    onChange={(e: any) => {
                                      const newList = [...distinctionsList];
                                      newList[idx].value = e.target.value;
                                      setDistinctionsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                    <button
                                      type="button"
                                      onClick={() => setDistinctionsList(distinctionsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setDistinctionsList([...distinctionsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Distinction
                            </button>
                            <button type="button" onClick={() => setDistinctionsList([{ value: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                              N/A
                            </button>
                          </div>

                          {/* Memberships */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2 min-h-[48px] flex items-end">Memberships in Associations</h3>
                            <div className="flex flex-col gap-3">
                              {membershipsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter association/organization"
                                    value={item.value}
                                    onChange={(e: any) => {
                                      const newList = [...membershipsList];
                                      newList[idx].value = e.target.value;
                                      setMembershipsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                    <button
                                      type="button"
                                      onClick={() => setMembershipsList(membershipsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={() => setMembershipsList([...membershipsList, { value: '' }])}
                              className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-full"
                            >
                              <Plus className="w-4 h-4" /> Add Membership
                            </button>
                            <button type="button" onClick={() => setMembershipsList([{ value: 'N/A' }])} className="text-gray-500 text-[13px] font-medium flex items-center justify-center hover:bg-gray-100 w-full py-2 rounded border border-gray-200 transition-colors mt-2">
                              N/A
                            </button>
                          </div>

                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Learning & Development')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Legal Questionnaire' ? 'block' : 'hidden'}>
                      <form id="form-Legal Questionnaire" className="w-full space-y-8" onSubmit={handleLegalQuestionnaireSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please answer the following questions truthfully. If "Yes", provide the necessary details.</p>
                        </div>

                        {/* Legal Questions */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">34 - 40 Questionnaire</h3>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {[
                              { id: '34a', text: '34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed, within the third degree?' },
                              { id: '34b', text: 'within the fourth degree (for Local Government Unit - Career Employees)?' },
                              { id: '35a', text: '35. a. Have you ever been found guilty of any administrative offense?' },
                              { id: '35b', text: 'b. Have you been criminally charged before any court?' },
                              { id: '36', text: '36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?' },
                              { id: '37', text: '37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?' },
                              { id: '38a', text: '38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?' },
                              { id: '38b', text: 'b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?' },
                              { id: '39', text: '39. Have you acquired the status of an immigrant or permanent resident of another country?' },
                              { id: '40a', text: '40. Pursuant to: (a) Indigenous People\'s Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items: a. Are you a member of any indigenous group?' },
                              { id: '40b', text: 'b. Are you a person with disability?' },
                              { id: '40b_ethnic', text: 'Do you belong to an Indigenous Cultural Community / Indigenous Peoples (ICC/IP) or any ethnic group?' },
                              { id: '40c', text: 'c. Are you a solo parent?' }
                            ].map(q => (
                              <div key={q.id} className="flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <p className="text-[14px] text-gray-700 font-medium">{q.text}</p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value="Yes"
                                      checked={questionnaire[q.id]?.answer === 'Yes'}
                                      onChange={(e: any) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: questionnaire[q.id]?.details || '' } })}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      required
                                    />
                                    <span className="text-[14px] text-gray-600">Yes</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={q.id}
                                      value="No"
                                      checked={questionnaire[q.id]?.answer === 'No'}
                                      onChange={(e: any) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: '' } })}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      required
                                    />
                                    <span className="text-[14px] text-gray-600">No</span>
                                  </label>
                                </div>
                                {questionnaire[q.id]?.answer === 'Yes' && (
                                  q.id === '40b_ethnic' ? (
                                    <>
                                      <input
                                        type="text"
                                        list="ethnic-groups"
                                        required
                                        placeholder="Search or select your ethnic group"
                                        value={questionnaire[q.id]?.details || ''}
                                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please select your ethnic group.')}
                                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                                        onChange={(e: any) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: 'Yes', details: e.target.value } })}
                                        className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 mt-1 h-[42px] w-full"
                                      />
                                      <datalist id="ethnic-groups">
                                        {ETHNIC_GROUPS.map(eg => <option key={eg} value={eg} />)}
                                      </datalist>
                                    </>
                                  ) : (
                                    <input
                                      type="text"
                                      required
                                      placeholder={q.id === '40b' ? 'If YES, please specify ID No' : 'Please provide details'}
                                      value={questionnaire[q.id]?.details || ''}
                                      onChange={(e: any) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: 'Yes', details: e.target.value } })}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 mt-1 h-[42px] w-full"
                                    />
                                  )
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* References */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">41. References <span className="text-[11px] font-normal text-gray-500 normal-case ml-2">(Person not related by consanguinity or affinity to applicant /appointee)</span></h3>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {[1, 2, 3].map((_, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name</span>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter full name"
                                    value={referencesList[idx]?.name || ''}
                                    onChange={(e: any) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].name = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Address</span>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter address"
                                    value={referencesList[idx]?.address || ''}
                                    onChange={(e: any) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].address = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter telephone no."
                                    value={referencesList[idx]?.telephone || ''}
                                    onChange={(e: any) => {
                                      const newRefs = [...referencesList];
                                      if (!newRefs[idx]) newRefs[idx] = { name: '', address: '', telephone: '' };
                                      newRefs[idx].telephone = e.target.value;
                                      setReferencesList(newRefs);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Government ID */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">42. Government Issued ID</h3>
                          </div>
                          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex flex-col justify-between h-full">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[12px] text-gray-400 font-medium">Government Issued ID</span>
                                <button type="button" onClick={() => setGovernmentId({ ...governmentId, type: 'N/A' })} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                              </div>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Passport, GSIS, SSS"
                                value={governmentId.type}
                                onChange={(e: any) => setGovernmentId({ ...governmentId, type: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[12px] text-gray-400 font-medium">ID/License/Passport No.</span>
                                <button type="button" onClick={() => setGovernmentId({ ...governmentId, idNo: 'N/A' })} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                              </div>
                              <input
                                type="text"
                                required
                                placeholder="Enter ID/License/Passport No."
                                value={governmentId.idNo}
                                onChange={(e: any) => setGovernmentId({ ...governmentId, idNo: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[12px] text-gray-400 font-medium">Date/Place of Issuance</span>
                                <button type="button" onClick={() => setGovernmentId({ ...governmentId, datePlace: 'N/A' })} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors border border-gray-200 font-medium">N/A</button>
                              </div>
                              <input
                                type="text"
                                required
                                placeholder="Enter date/place of issuance"
                                value={governmentId.datePlace}
                                onChange={(e: any) => setGovernmentId({ ...governmentId, datePlace: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Other Information')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Next <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className={currentStep === 'Essential Documents' ? 'block' : 'hidden'}>
                      <form id="form-Essential Documents" className="w-full space-y-8" onSubmit={handleEssentialDocumentsSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please upload the required essential documents for your application. (Max file size: 5MB per document)</p>
                        </div>

                        {(() => {
                          const REQUIRED_DOCS = ['Notarized Personal Data Sheet', 'Work Experience Sheet', 'Certificate of Eligibility', 'Transcript of Records'];
                          const confirmedCount = REQUIRED_DOCS.filter(d => documentsConfirmed[d] || (d === 'Notarized Personal Data Sheet' && documentsConfirmed['Personal Data Sheet'])).length;
                          const docsPct = Math.round((confirmedCount / REQUIRED_DOCS.length) * 100);
                          const docsAllDone = confirmedCount === REQUIRED_DOCS.length;
                          return (
                        <div
                          className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-500 ${highlightDocs ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                            }`}
                          onClick={() => setHighlightDocs(false)}
                        >
                          <div className={`border-b px-5 py-3.5 transition-colors duration-500 ${highlightDocs ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                            }`}>
                            <div className="flex items-center justify-between">
                              <h3 className={`font-bold text-[14px] uppercase tracking-wide ${highlightDocs ? 'text-red-700' : 'text-gray-700'
                                }`}>
                                Essential Documents {highlightDocs && <span className="text-red-500 lowercase normal-case font-normal ml-2">(Action Required)</span>}
                              </h3>
                              <div className="flex items-center gap-3">
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-bold border transition-all duration-300 ${
                                  docsAllDone
                                    ? 'bg-green-50 border-green-200 text-green-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-500'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${ docsAllDone ? 'bg-green-500' : 'bg-gray-300' }`} />
                                  {confirmedCount}/{REQUIRED_DOCS.length} confirmed &nbsp;·&nbsp; {docsPct}%
                                </div>
                                <button
                                  type="button"
                                  disabled={!docsAllDone}
                                  onClick={(e) => { e.preventDefault(); if (docsAllDone) setShowLoiModal(true); }}
                                  className={`font-bold py-1.5 px-5 rounded flex items-center gap-2 transition-colors text-sm ${
                                    docsAllDone
                                      ? 'bg-[#3b82f6] hover:bg-blue-600 text-white cursor-pointer'
                                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  Submit Application <FileText className="w-4 h-4 ml-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {([ 'Notarized Personal Data Sheet', 'Work Experience Sheet', 'Certificate of Eligibility', 'Transcript of Records', 'Updated PRC License/ID', 'Diploma (optional)', 'Resume', 'Performance Rating', 'Training Certificates', 'Application of Education', 'Application of Learning and Development', 'Outstanding Accomplishments' ]).map(doc => { const existingUrl = uploadedDocumentUrls[doc] || (doc === 'Notarized Personal Data Sheet' ? uploadedDocumentUrls['Personal Data Sheet'] : undefined); const isEditing = editingDocs[doc] || false; const isOptionalList = ['Updated PRC License/ID', 'Diploma (optional)', 'Resume', 'Performance Rating', 'Training Certificates', 'Application of Education', 'Application of Learning and Development', 'Outstanding Accomplishments']; const isRequired = !isOptionalList.includes(doc); const isComplete = !!existingUrl || !!documents[doc] || (doc === 'Notarized Personal Data Sheet' && !!documents['Personal Data Sheet']);

                              return (
                                <div key={doc} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                      {documentsConfirmed[doc] || (doc === 'Notarized Personal Data Sheet' && documentsConfirmed['Personal Data Sheet']) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                      ) : (
                                        isRequired ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ) : (
                                          <div className="w-4 h-4"></div>
                                        )
                                      )}
                                      <span className="text-[14px] font-medium text-gray-700 flex items-center gap-2">
                                        {doc === 'Training Certificates' ? (
                                          <span>Training Certificates <span className="text-gray-400 font-normal italic text-[10px]">(optional but mandatory for positions with training requirement)</span></span>
                                        ) : doc === 'Performance Rating' ? (
                                          <span>Performance Rating <span className="text-gray-400 font-normal italic text-[10px]">(Mandatory for positions with experience requirement)</span></span>
                                        ) : doc === 'Outstanding Accomplishments' ? (
                                          <span>Outstanding Accomplishments <span className="text-gray-400 font-normal italic text-[10px]">(Optional)</span></span>
                                        ) : doc === 'Transcript of Records' ? (
                                          <span className="flex flex-col">
                                            <span>Transcript of Records {isRequired && <span className="text-red-500">*</span>}</span>
                                            <span className="text-gray-400 font-normal italic text-[10.5px] mt-0.5 max-w-[500px] leading-relaxed">
                                              Note: Applicants may upload, together with their TOR in a single merged file, the official document or certification confirming completion of at least 200 hours of supervised practicum or internship experience in guidance and counseling
                                            </span>
                                          </span>
                                        ) : (
                                          doc
                                        )} {doc !== 'Transcript of Records' && isRequired && <span className="text-red-500">*</span>}
                                        {isSubsequentApplication && isRequired && (
                                          <span className="text-[10px] text-gray-400 font-normal normal-case">(Check to confirm)</span>
                                        )}
                                      </span>
                                    </div>
                                    {existingUrl && (
                                      <div className="flex items-center gap-3 ml-6 mt-1">
                                        <a
                                          href={`${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(existingUrl)}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          download={doc + ".pdf"}
                                          className="text-[12px] text-blue-600 hover:underline font-medium flex items-center gap-1"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download File
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => setPdfViewerUrl(`${import.meta.env.VITE_API_URL}/api/applicants/get-sas-url?url=${encodeURIComponent(existingUrl)}`)}
                                          className="text-[12px] text-emerald-600 hover:underline font-medium flex items-center gap-1"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> View
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex flex-col md:items-end gap-2">
                                    {existingUrl && !isEditing ? (
                                      <div className="flex items-center gap-2">
                                        {!documentsConfirmed[doc] && (
                                          <button
                                            type="button"
                                            onClick={() => setDocumentsConfirmed(prev => ({ ...prev, [doc]: true }))}
                                            className="text-[12px] font-bold text-white bg-green-600 hover:bg-green-700 border border-green-700 px-3 py-1.5 rounded transition-colors self-start md:self-auto flex items-center gap-1"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            CONFIRM
                                          </button>
                                        )}
                                        {documentsConfirmed[doc] && (
                                          <button
                                            type="button"
                                            onClick={() => setDocumentsConfirmed(prev => ({ ...prev, [doc]: false }))}
                                            className="text-[12px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded transition-colors self-start md:self-auto flex items-center gap-1 cursor-default"
                                            title="Click to unconfirm"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            CONFIRMED
                                          </button>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => setEditingDocs(prev => ({ ...prev, [doc]: true }))}
                                          className="text-[12px] font-bold text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 px-3 py-1.5 rounded transition-colors self-start md:self-auto"
                                        >
                                          UPDATE
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="file"
                                          accept=".pdf"
                                          required={isRequired && !existingUrl && !documents[doc]}
                                          onChange={(e: any) => {
                                            if (e.target.files && e.target.files[0]) {
                                              setDocuments({ ...documents, [doc]: e.target.files[0] });
                                            }
                                          }}
                                          className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-semibold file:bg-blue-50 file:text-[#1a73e8] hover:file:bg-blue-100 file:transition-colors file:cursor-pointer outline-none w-full md:w-auto"
                                        />
                                        {existingUrl && isEditing && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setEditingDocs(prev => ({ ...prev, [doc]: false }));
                                              setDocuments(prev => {
                                                const newDocs = { ...prev };
                                                delete newDocs[doc];
                                                return newDocs;
                                              });
                                            }}
                                            className="text-[12px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded transition-colors"
                                          >
                                            CANCEL
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                          );
                        })()}


                        {/* Navigation / Back Button */}
                        <div className="flex justify-start pt-6 mt-4 border-t border-gray-100">
                          <button type="button" onClick={() => setCurrentStep('Legal Questionnaire')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* PDF Viewer Modal */}
      {pdfViewerUrl && (
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
      )}

      {/* Letter of Intent Modal */}
      {showLoiModal && (
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
      )}
    
      {/* Sworn Declaration Modal */}
      {showSwornDeclModal && (
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
      )}

</div>
  );
}

