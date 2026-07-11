import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Search, Clock, Hash, LogOut,
  Briefcase, ArrowRight, CalendarDays, Star,
  Building2, CircleDollarSign, MapPin,
  FileText, Bookmark,
  GraduationCap, ChevronLeft, ChevronRight, HelpCircle, Plus, Trash2, ChevronDown
} from 'lucide-react';
import CustomDatePicker from '../components/CustomDatePicker';
import ApplicantHeader from '../components/ApplicantHeader';
// @ts-ignore
import { regions, provinces, city_mun, barangays } from 'phil-reg-prov-mun-brgy';

const positions = [
  {
    id: 1,
    title: 'Information Technology Officer I',
    office: 'Information and Communications Technology Service',
    division: 'ICTS - Applications Development',
    type: 'Temporary',
    posted: 'Jun 30, 2026',
    deadline: 'Jul 14, 2026',
    sg: 18,
    itemNo: 'ITO-18-7102',
    location: 'Pasig City',
    description: 'Develops and maintains web applications and information systems for the department. Provides technical support for ICT initiatives and digital transformation programs.',
    daysLeft: 6
  },
  {
    id: 2,
    title: 'Chief Education Program Specialist',
    office: 'Policy and Research Service',
    division: 'Office of the Secretary',
    type: 'Permanent',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 09, 2026',
    sg: 24,
    itemNo: 'CEPS-24-1998',
    location: 'Pasig City',
    description: 'Plans, develops, and implements education policies and programs. Provides technical leadership in research and policy development.',
    daysLeft: 2
  },
  {
    id: 3,
    title: 'Senior Education Program Specialist',
    office: 'Policy and Research Service',
    division: 'Office of the Secretary',
    type: 'Permanent',
    posted: 'Jun 29, 2026',
    deadline: 'Jul 16, 2026',
    sg: 19,
    itemNo: 'SEPS-19-2005',
    location: 'Pasig City',
    description: 'Assists in planning, developing, and implementing education policies and programs. Conducts research and analysis on sector trends.',
    daysLeft: 9
  },
  {
    id: 4,
    title: 'Administrative Assistant III',
    office: 'Human Resources Division',
    division: 'Administrative Service',
    type: 'Permanent',
    posted: 'Jun 28, 2026',
    deadline: 'Jul 08, 2026',
    sg: 9,
    itemNo: 'ADAS3-12-2015',
    location: 'Pasig City',
    description: 'Provides administrative and clerical support to the division. Handles correspondence, records management, and scheduling of activities.',
    daysLeft: 1
  }
];

export default function ApplicantJobList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'job-board' | 'my-applications' | 'my-saved-jobs' | 'application-form'>('job-board');
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(new Date(1997, 7, 11)); // Default Aug 11, 1997 per reference
  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [currentStep, setCurrentStep] = useState('Personal Information');
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [filterDivision, setFilterDivision] = useState('All Divisions');
  const [filterPosition, setFilterPosition] = useState('All Positions');

  const availableRegions = useMemo(() => [...new Set(positions.map(p => p.location || 'Unknown'))].filter(Boolean), []);
  const availableDivisions = useMemo(() => [...new Set(positions.map(p => p.division || p.office))].filter(Boolean), []);
  const availablePositions = useMemo(() => [...new Set(positions.map(p => p.title))].filter(Boolean), []);

  const filteredPositions = useMemo(() => positions.filter(job => {
    const matchSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.itemNo && job.itemNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.division && job.division.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.office && job.office.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRegion = filterRegion === 'All Regions' || (job.location || 'Unknown') === filterRegion;
    const matchDivision = filterDivision === 'All Divisions' || (job.division || job.office) === filterDivision;
    const matchPosition = filterPosition === 'All Positions' || job.title === filterPosition;

    return matchSearch && matchRegion && matchDivision && matchPosition;
  }), [searchQuery, filterRegion, filterDivision, filterPosition]);

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

  // Derived location arrays
  const resProvincesList = resRegion ? provinces.filter((p: any) => p.reg_code === resRegion) : [];
  const resCitiesList = resProvince ? city_mun.filter((c: any) => c.prov_code === resProvince) : [];
  const resBarangaysList = resCity ? barangays.filter((b: any) => b.mun_code === resCity) : [];

  const permProvincesList = permRegion ? provinces.filter((p: any) => p.reg_code === permRegion) : [];
  const permCitiesList = permProvince ? city_mun.filter((c: any) => c.prov_code === permProvince) : [];
  const permBarangaysList = permCity ? barangays.filter((b: any) => b.mun_code === permCity) : [];
  const [resHouse, setResHouse] = useState('');
  const [resStreet, setResStreet] = useState('');
  const [resSubdivision, setResSubdivision] = useState('');
  const [resZip, setResZip] = useState('');
  const [permHouse, setPermHouse] = useState('');
  const [permStreet, setPermStreet] = useState('');
  const [permSubdivision, setPermSubdivision] = useState('');
  const [permZip, setPermZip] = useState('');
  const [telephoneNo, setTelephoneNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');

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

  const totalSteps = 9;

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('Family Background');
  };

  const [childrenList, setChildrenList] = useState<any[]>([{ name: '', dob: null }]);
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

  const [questionnaire, setQuestionnaire] = useState<Record<string, { answer: string, details: string }>>({});
  const [referencesList, setReferencesList] = useState<any[]>([{ name: '', address: '', telephone: '' }]);
  const [governmentId, setGovernmentId] = useState({ type: '', idNo: '', datePlace: '' });

  const completedSteps = useMemo(() => {
    const steps: string[] = [];
    if (firstName.trim() && lastName.trim() && placeOfBirth.trim() && sex && civilStatus && citizenship) steps.push('Personal Information');
    if (motherSurname.trim() || motherFirst.trim() || fatherSurname.trim() || fatherFirst.trim() || spouseSurname.trim() || spouseFirst.trim()) steps.push('Family Background');
    if (Object.values(educationalDates).some(ed => ed.school.trim() !== '')) steps.push('Educational Background');
    if (civilServiceList.some(cs => cs.eligibility.trim() !== '')) steps.push('Eligibility');
    if (workExperienceList.some(we => we.company.trim() !== '' || we.positionTitle.trim() !== '')) steps.push('Work Experience');
    if (voluntaryWorkList.some(vw => vw.nameAddress.trim() !== '')) steps.push('Voluntary Work');
    if (learningDevelopmentList.some(ld => ld.title.trim() !== '')) steps.push('Learning & Development');
    if (skillsList.some(s => s.value.trim() !== '') || distinctionsList.some(d => d.value.trim() !== '') || membershipsList.some(m => m.value.trim() !== '')) steps.push('Other Information');
    if (Object.keys(questionnaire).length > 0) steps.push('Legal Questionnaire');
    return steps;
  }, [
    firstName, lastName, placeOfBirth, sex, civilStatus, citizenship,
    motherSurname, motherFirst, fatherSurname, fatherFirst, spouseSurname, spouseFirst,
    educationalDates, civilServiceList, workExperienceList, voluntaryWorkList, learningDevelopmentList,
    skillsList, distinctionsList, membershipsList, questionnaire
  ]);

  const percentage = ((completedSteps.length / totalSteps) * 100).toFixed(2);

  const handleEssentialDocumentsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        Swal.fire('Error', 'You must be logged in to apply.', 'error');
        navigate('/login');
        return;
      }

      const session = JSON.parse(sessionStr);

      const applicantData = {
        surname: lastName,
        first_name: firstName,
        middle_name: middleName,
        place_of_birth: placeOfBirth,
        sex: sex,
        civil_status: civilStatus,
        citizenship: citizenship,
        blood_type: bloodType,
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
          house: permHouse,
          street: permStreet,
          subdivision: permSubdivision,
          zip: permZip,
          region: permRegion,
          province: permProvince,
          city: permCity,
          barangay: permBarangay,
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
          children: childrenList
        },
        questionnaire_responses: questionnaire
      };

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
              type: applyingJob.type || 'Permanent',
              posted: applyingJob.posted || 'N/A',
              deadline: applyingJob.deadline || 'N/A',
              sg: applyingJob.sg || 'N/A',
              itemNo: applyingJob.itemNo || 'N/A',
              date: new Date().toLocaleDateString(),
              stage: 'Applied',
              status: 'Active'
            };
            setApplications(prev => [newApp, ...prev]);
          } else {
            Swal.fire('Error', 'Profile updated but failed to apply for the job.', 'error');
          }
        } else {
          Swal.fire('Success', 'Profile updated successfully!', 'success');
        }

        setActiveTab('job-board');
        setApplyingJob(null);
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

    fetch(`${import.meta.env.VITE_API_URL}/api/applicants/${session.id}/applications`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAppliedJobIds(data.data.map((app: any) => app.position_id));
          setApplications(data.data.map((app: any) => {
            const jobDetails = positions.find(p => p.id === app.position_id) || {} as any;
            return {
              id: app.id,
              positionId: app.position_id,
              position: app.job_title || jobDetails.title || 'Unknown Position',
              office: jobDetails.office || 'Department of Education',
              type: jobDetails.type || 'Permanent',
              posted: jobDetails.posted || 'N/A',
              deadline: jobDetails.deadline || 'N/A',
              sg: jobDetails.sg || 'N/A',
              itemNo: jobDetails.itemNo || 'N/A',
              date: new Date(app.created_at).toLocaleDateString(),
              stage: app.status || 'Applied',
              status: 'Active'
            };
          }));
        }
      })
      .catch(err => console.error('Error fetching applications:', err));

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
          setBirthDate(p.date_of_birth ? new Date(p.date_of_birth) : null);
          setTelephoneNo(p.telephone_no || '');
          setMobileNo(p.mobile_no || '');

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
          }

          if (p.family_background) {
            const fb = typeof p.family_background === 'string' ? JSON.parse(p.family_background) : p.family_background;
            if (fb.spouse) {
              setSpouseSurname(fb.spouse.surname || '');
              setSpouseFirst(fb.spouse.first_name || '');
              setSpouseMiddle(fb.spouse.middle_name || '');
              setSpouseExt(fb.spouse.name_extension || '');
              setSpouseOccupation(fb.spouse.occupation || '');
              setSpouseEmployer(fb.spouse.employer || '');
              setSpouseBusAddress(fb.spouse.business_address || '');
              setSpouseTelephone(fb.spouse.telephone || '');
            }
            if (fb.father) {
              setFatherSurname(fb.father.surname || '');
              setFatherFirst(fb.father.first_name || '');
              setFatherMiddle(fb.father.middle_name || '');
              setFatherExt(fb.father.name_extension || '');
            }
            if (fb.mother) {
              setMotherSurname(fb.mother.surname || '');
              setMotherFirst(fb.mother.first_name || '');
              setMotherMiddle(fb.mother.middle_name || '');
            }
          }

          if (p.educational_background) {
            let edParsed = Array.isArray(p.educational_background) ? p.educational_background : (typeof p.educational_background === 'string' ? JSON.parse(p.educational_background) : p.educational_background);
            const newEd = { ...educationalDates };
            if (Array.isArray(edParsed)) {
              edParsed.forEach((ed: any) => {
                if (ed.level) {
                  newEd[ed.level] = {
                    school: ed.school || '',
                    degree: ed.degree || '',
                    from: ed.from || '',
                    to: ed.to || '',
                    units: ed.units || '',
                    year: ed.year || '',
                    honors: ed.honors || ''
                  };
                }
              });
              setEducationalDates(newEd);
            }
          }
          if (p.civil_service_eligibility) setCivilServiceList(Array.isArray(p.civil_service_eligibility) ? p.civil_service_eligibility : (typeof p.civil_service_eligibility === 'string' ? JSON.parse(p.civil_service_eligibility) : p.civil_service_eligibility));
          if (p.work_experience) setWorkExperienceList(Array.isArray(p.work_experience) ? p.work_experience : (typeof p.work_experience === 'string' ? JSON.parse(p.work_experience) : p.work_experience));
          if (p.voluntary_work) setVoluntaryWorkList(Array.isArray(p.voluntary_work) ? p.voluntary_work : (typeof p.voluntary_work === 'string' ? JSON.parse(p.voluntary_work) : p.voluntary_work));
          if (p.learning_and_development) setLearningDevelopmentList(Array.isArray(p.learning_and_development) ? p.learning_and_development : (typeof p.learning_and_development === 'string' ? JSON.parse(p.learning_and_development) : p.learning_and_development));

          if (p.other_information) {
            const oi = typeof p.other_information === 'string' ? JSON.parse(p.other_information) : p.other_information;
            if (oi.extensionName) setExtensionName(oi.extensionName);
            if (oi.height) setHeight(oi.height);
            if (oi.weight) setWeight(oi.weight);
            if (oi.agencyEmployeeNo) setAgencyEmployeeNo(oi.agencyEmployeeNo);
            if (oi.citizenshipType) setCitizenshipType(oi.citizenshipType);
            if (oi.skills) setSkillsList(oi.skills);
            if (oi.distinctions) setDistinctionsList(oi.distinctions);
            if (oi.memberships) setMembershipsList(oi.memberships);
            if (oi.references) setReferencesList(oi.references);
            if (oi.governmentId) setGovernmentId(oi.governmentId);
            if (oi.children) setChildrenList(oi.children);
          }
          if (p.questionnaire_responses) {
            setQuestionnaire(typeof p.questionnaire_responses === 'string' ? JSON.parse(p.questionnaire_responses) : p.questionnaire_responses);
          }

        }
      })
      .catch(err => console.error('Error fetching profile:', err));

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
    Swal.fire({
      title: 'Confirm Documents',
      text: 'Are you sure your documents are up to date?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#022851',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        setApplyingJob(job);
        setActiveTab('application-form');
      }
    });
  };


  const toggleSaveJob = async (jobId: number) => {
    try {
      const sessionStr = localStorage.getItem('session_data');
      if (!sessionStr) {
        navigate('/login');
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
      <ApplicantHeader percentage={percentage} firstName={firstName} lastName={lastName} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Tabs */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-100 px-2 sm:px-0">
            <div className="flex items-center overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab('job-board')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'job-board' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Briefcase className="w-[18px] h-[18px]" /> Job Board
              </button>
              <button
                onClick={() => setActiveTab('my-applications')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-applications' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FileText className="w-[18px] h-[18px]" /> My Applications
              </button>
              <button
                onClick={() => setActiveTab('my-saved-jobs')}
                className={`flex items-center gap-2 px-6 sm:px-8 py-5 text-[15px] font-bold whitespace-nowrap transition-colors ${activeTab === 'my-saved-jobs' ? 'text-[#003366] border-b-[3px] border-[#003366]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Bookmark className="w-[18px] h-[18px]" /> My Saved Jobs
              </button>
            </div>

            {activeTab === 'application-form' && (
              <div className="flex items-center gap-2 px-4 py-3 lg:py-0 overflow-x-auto hide-scrollbar w-full lg:w-auto border-t lg:border-t-0 border-gray-100">
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">View Profile</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">Print PDS</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded text-[11px] font-bold uppercase whitespace-nowrap hover:bg-gray-600 transition-colors shadow-sm">Work Experience Sheet</button>
              </div>
            )}
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
                      <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                      <input
                        type="text"
                        placeholder="Search position title, division, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                      <select
                        value={filterRegion}
                        onChange={(e) => setFilterRegion(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Regions">All Regions</option>
                        {availableRegions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <Building2 className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                      <select
                        value={filterDivision}
                        onChange={(e) => setFilterDivision(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Divisions">All Divisions</option>
                        {availableDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="flex-1 relative flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white hover:border-[#0a6fa6] transition-colors focus-within:border-[#0a6fa6] focus-within:ring-1 focus-within:ring-[#0a6fa6]">
                      <Briefcase className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
                      <select
                        value={filterPosition}
                        onChange={(e) => setFilterPosition(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 font-medium cursor-pointer appearance-none text-[15px]"
                      >
                        <option value="All Positions">All Positions</option>
                        {availablePositions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  SHOWING 1 TO {filteredPositions.length} OF {filteredPositions.length} ENTRIES
                </p>

                {/* Job List */}
                <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
                  {filteredPositions.map((job) => {
                    const isTemporary = job.type.toLowerCase() === 'temporary';
                    return (
                      <div key={job.id} className="py-8 flex flex-col lg:flex-row justify-between items-start gap-6 group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl">

                        {/* Left Content */}
                        <div
                          className="flex-1 space-y-3.5 cursor-pointer"
                          onClick={() => navigate(`/applicant-jobs/${job.id}`)}
                        >
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-bold ${isTemporary ? 'bg-gray-200/60 text-orange-500' : 'bg-[#e8f5e9] text-[#2e7d32]'}`}>
                              {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-extrabold tracking-widest uppercase">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></div>
                              OPEN
                            </span>
                          </div>

                          {/* Title & Division */}
                          <div>
                            <h3 className="text-xl sm:text-[22px] font-bold text-[#022851] leading-tight mb-2">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-500 text-[15px] font-medium">
                              <Building2 className="w-4 h-4 shrink-0 text-gray-400" />
                              <span>{job.office}</span>
                            </div>
                            {job.division && (
                              <div className="text-sm text-gray-400 font-medium ml-6">
                                {job.division}
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl line-clamp-2">
                            {job.description}
                          </p>

                          {/* Specs Row */}
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-gray-500 pt-2">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-gray-400" />
                              <span>Posted {job.posted} • Deadline {job.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CircleDollarSign className="w-4 h-4 text-gray-400" />
                              <span>Salary Grade {job.sg}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Hash className="w-4 h-4 text-gray-400" />
                              <span>Item No. {job.itemNo}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{job.location || 'Pasig City'}</span>
                            </div>
                          </div>

                          {/* Alert Row */}
                          <div className="flex items-center gap-1.5 text-[13px] font-bold text-red-500 pt-1">
                            <Clock className="w-4 h-4" />
                            Only {job.daysLeft} days left to apply!
                          </div>
                        </div>

                        {/* Right Buttons */}
                        <div className="flex flex-col gap-3 w-full lg:w-[160px] shrink-0 lg:mt-2">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-semibold transition-colors text-[15px] ${savedJobIds.includes(job.id)
                              ? 'border-[#3b82f6] text-[#3b82f6] bg-blue-50 hover:bg-blue-100'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                          >
                            <Star className={`w-[18px] h-[18px] ${savedJobIds.includes(job.id) ? 'fill-[#3b82f6]' : ''}`} />
                            {savedJobIds.includes(job.id) ? 'Saved' : 'Save'}
                          </button>
                          {appliedJobIds.includes(job.id) ? (
                            <button
                              disabled
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-400 text-white font-semibold rounded-xl shadow-sm text-[15px] cursor-not-allowed"
                            >
                              Already Applied
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApply(job)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#022851] hover:bg-[#033a76] text-white font-semibold rounded-xl transition-all shadow-sm group text-[15px]"
                            >
                              Apply Now
                              <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeTab === 'my-applications' && (
              <div className="space-y-4 max-w-4xl">
                {applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium border border-gray-200 rounded-xl">
                    You haven't applied for any positions yet.
                  </div>
                ) : (
                  currentApps.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-200 bg-white rounded-md p-5 hover:border-blue-300 transition-colors shadow-sm cursor-pointer"
                      onClick={() => navigate(`/applicant-jobs/${app.positionId}`)}
                    >
                      <div className="mb-2">
                        <span className="text-[#3b82f6] text-lg font-medium hover:underline">
                          {app.position} ({app.stage})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-600 text-sm">{app.office}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold text-white rounded ${app.type.toLowerCase() === 'permanent' ? 'bg-[#5cb85c]' : 'bg-[#f0ad4e]'} uppercase tracking-wider`}>
                          {app.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Posted on <strong>{app.posted}</strong> and deadline of application is on <strong>{app.deadline}</strong></span>
                      </div>
                      <div className="flex items-center gap-5 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CircleDollarSign className="w-4 h-4 text-[#5c7a99]" />
                          <span>Salary Grade : {app.sg}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Hash className="w-4 h-4 text-[#5c7a99]" />
                          <span>Item No : {app.itemNo}</span>
                        </div>
                      </div>
                    </div>
                  ))
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
              <div className="max-w-[1200px]">
                <h3 className="text-xl font-bold text-[#003366] mb-6">My Saved Jobs</h3>
                {savedJobIds.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-xl shadow-sm border border-gray-200">
                    You haven't saved any jobs yet.
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100 bg-white px-6 rounded-xl shadow-sm border border-gray-200">
                    {positions.filter(job => savedJobIds.includes(job.id)).map((job) => {
                      const isTemporary = job.type.toLowerCase() === 'temporary';
                      return (
                        <div key={job.id} className="py-8 flex flex-col lg:flex-row justify-between items-start gap-6 group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl">
                          <div
                            className="flex-1 space-y-3.5 cursor-pointer"
                            onClick={() => navigate(`/applicant-jobs/${job.id}`)}
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${isTemporary ? 'bg-[#fff8e1] text-[#eab308] border-[#fef08a]' : 'bg-[#e8f5e9] text-[#2e7d32] border-[#bbf7d0]'}`}>
                                {job.type}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-extrabold tracking-widest uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></div> OPEN
                              </span>
                              <span className="text-[13px] font-medium text-gray-500 ml-1">{job.office}</span>
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-[22px] font-bold text-[#003366] leading-tight mb-2">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Building2 className="w-[18px] h-[18px] text-gray-400" />
                                <span>{job.division || job.office}</span>
                              </div>
                            </div>
                            <p className="text-gray-500 text-[15px] leading-relaxed max-w-4xl line-clamp-2">
                              {job.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-gray-500 pt-2">
                              <div className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                <span>Posted {job.posted} • Deadline {job.deadline}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <CircleDollarSign className="w-4 h-4 text-gray-400" />
                                <span>Salary Grade {job.sg}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 w-full lg:w-[160px] shrink-0 lg:mt-2">
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl font-semibold transition-colors text-sm border-[#3b82f6] text-[#3b82f6] bg-blue-50 hover:bg-blue-100`}
                            >
                              <Star className={`w-[18px] h-[18px] fill-[#3b82f6]`} /> Saved
                            </button>
                            {appliedJobIds.includes(job.id) ? (
                              <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-400 text-white font-extrabold rounded-xl shadow-sm text-sm cursor-not-allowed">
                                Already Applied
                              </button>
                            ) : (
                              <button
                                onClick={() => handleApply(job)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#facc15] hover:bg-[#eab308] text-[#003366] font-extrabold rounded-xl transition-colors shadow-sm group text-sm"
                              >
                                Apply Now <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'application-form' && applyingJob && (
              <div className="flex flex-col md:flex-row gap-6 bg-[#eff3f8] p-6 -mx-6 -mb-8 mt-[-24px] min-h-[800px]">
                {/* Left Sidebar */}
                <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col bg-white shadow-sm shrink-0 h-fit border border-gray-100 rounded-sm overflow-hidden">
                  <div className="bg-[#1a73e8] p-5 flex items-center gap-4 border-b-4 border-red-500">
                    <div className="w-[60px] h-[60px] bg-white rounded-full flex flex-col items-center justify-center font-extrabold text-[11px] leading-none text-center text-black shrink-0 shadow-sm">
                      <span>UPLOAD</span>
                      <span>PHOTO</span>
                    </div>
                    <div className="flex flex-col text-white">
                      <span className="font-bold text-[16px] uppercase tracking-wide">CHRIS MENDOZA</span>
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
                          onClick={() => setCurrentStep(item.name)}
                          className={`flex items-center justify-between px-5 py-3.5 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${isActive || isCompleted ? 'bg-[#34a853]' : 'bg-gray-100'}`}>
                              <Icon className={`w-4 h-4 ${isActive || isCompleted ? 'text-white' : 'text-gray-300'}`} />
                            </div>
                            <span className={`text-[14px] font-semibold tracking-wide ${isActive ? 'text-[#1a73e8]' : 'text-[#8599ad]'}`}>{item.name}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[#34a853]' : (isActive ? 'bg-red-500' : 'bg-gray-200')}`}></div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex flex-col mt-4 border border-gray-200 rounded p-4 mx-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-[34px] h-[38px] bg-gray-100 flex flex-col items-center justify-center relative border border-gray-200 rounded-sm overflow-hidden shrink-0">
                        <div className="absolute top-1 text-orange-400 font-extrabold text-[14px]">↑</div>
                        <div className="w-full h-1.5 bg-blue-500 absolute bottom-0"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[13px] text-gray-700">Upload Letter of Intent</span>
                          <HelpCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white rounded-full" />
                        </div>
                        <span className="text-[11px] text-gray-500">For this position.</span>
                      </div>
                    </div>
                    <button className="bg-gray-50 text-gray-600 border border-gray-300 px-4 py-1.5 rounded-[3px] text-[12px] font-medium w-fit hover:bg-gray-100 transition-colors h-[42px] w-full">
                      Upload Now
                    </button>
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
                        <h2 className="text-[15px] font-bold text-[#1b5e20]">Complete your Profile</h2>
                        <p className="text-sm text-[#2e7d32] font-medium leading-snug">
                          Your profile is {percentage}% complete. Fill in the missing information below to improve your chances.
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-64 shrink-0">
                      <div className="flex items-center justify-between mb-1.5 px-1">
                        <span className="text-[11px] font-extrabold text-[#1b5e20] tracking-wider uppercase">Progress</span>
                        <span className="text-[11px] font-extrabold text-[#1b5e20]">{percentage}%</span>
                      </div>
                      <div className="w-full bg-[#bbf7d0] h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#2e7d32] h-full transition-all duration-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Content Box */}
                  <div className="bg-white p-10 border border-gray-200 shadow-sm flex flex-col items-center rounded-sm">
                    <h3 className="text-[18px] text-gray-500 uppercase tracking-widest mb-10 text-center font-light">{currentStep}</h3>

                    <div className={currentStep === 'Personal Information' ? 'block' : 'hidden'}>
                      <form className="w-full space-y-8" onSubmit={handlePersonalInfoSubmit}>
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
                            <div className="w-full sm:w-[35%] flex flex-col ">
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
                            <button type="button" onClick={() => setSex('Male')} className={`${sex === 'Male' ? 'bg-[#3498db] text-white' : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${sex === 'Male' ? 'bg-white' : 'bg-gray-400'}`}></div> MALE
                            </button>
                            <button type="button" onClick={() => setSex('Female')} className={`${sex === 'Female' ? 'bg-[#3498db] text-white' : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'} px-10 rounded text-[13px] font-bold flex items-center justify-center gap-2.5 shadow-sm min-w-[120px] transition-colors h-[42px]`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${sex === 'Female' ? 'bg-white' : 'bg-gray-400'}`}></div> FEMALE
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
                                  onChange={(e) => {
                                    setResRegion(e.target.value);
                                    setResProvince('');
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                >
                                  <option value="">Select region</option>
                                  {regions.map((r: any) => (
                                    <option key={r.reg_code} value={r.reg_code}>{r.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={resProvince}
                                  onChange={(e) => {
                                    setResProvince(e.target.value);
                                    setResCity('');
                                    setResBarangay('');
                                  }}
                                  disabled={!resRegion}
                                >
                                  <option value="">Select province</option>
                                  {resProvincesList.map((p: any) => (
                                    <option key={p.prov_code} value={p.prov_code}>{p.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={resCity}
                                  onChange={(e) => {
                                    setResCity(e.target.value);
                                    setResBarangay('');
                                  }}
                                  disabled={!resProvince}
                                >
                                  <option value="">Select city / municipality</option>
                                  {resCitiesList.map((c: any) => (
                                    <option key={c.mun_code} value={c.mun_code}>{c.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span>
                                <select
                                  required
                                  className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                  value={resBarangay}
                                  onChange={(e) => setResBarangay(e.target.value)}
                                  disabled={!resCity}
                                >
                                  <option value="">Select barangay</option>
                                  {resBarangaysList.map((b: any, idx: number) => (
                                    <option key={idx} value={b.name}>{b.name}</option>
                                  ))}
                                </select>
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
                                onChange={(e) => setSameAsResidential(e.target.checked)}
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
                                      onChange={(e) => {
                                        setPermRegion(e.target.value);
                                        setPermProvince('');
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                    >
                                      <option value="">Select region</option>
                                      {regions.map((r: any) => (
                                        <option key={r.reg_code} value={r.reg_code}>{r.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Province</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={permProvince}
                                      onChange={(e) => {
                                        setPermProvince(e.target.value);
                                        setPermCity('');
                                        setPermBarangay('');
                                      }}
                                      disabled={!permRegion}
                                    >
                                      <option value="">Select province</option>
                                      {permProvincesList.map((p: any) => (
                                        <option key={p.prov_code} value={p.prov_code}>{p.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">City / Municipality</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={permCity}
                                      onChange={(e) => {
                                        setPermCity(e.target.value);
                                        setPermBarangay('');
                                      }}
                                      disabled={!permProvince}
                                    >
                                      <option value="">Select city / municipality</option>
                                      {permCitiesList.map((c: any) => (
                                        <option key={c.mun_code} value={c.mun_code}>{c.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Barangay</span>
                                    <select
                                      required={!sameAsResidential}
                                      className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 appearance-none disabled:opacity-50 h-[42px] w-full"
                                      value={permBarangay}
                                      onChange={(e) => setPermBarangay(e.target.value)}
                                      disabled={!permCity}
                                    >
                                      <option value="">Select barangay</option>
                                      {permBarangaysList.map((b: any, idx: number) => (
                                        <option key={idx} value={b.name}>{b.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Contact Nos. <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Telephone No.</span>
                              <input type="text" value={telephoneNo} onChange={e => setTelephoneNo(e.target.value)} required placeholder="Enter telephone no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Mobile No.</span>
                              <input type="text" value={mobileNo} onChange={e => setMobileNo(e.target.value)} required placeholder="Enter mobile no." className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                          <label className="lg:w-[180px] shrink-0 lg:text-right font-bold text-gray-600 text-[14px] pt-2">Email Address <span className="text-red-500">*</span></label>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Primary</span>
                              <input type="email" required defaultValue="avenidochristop@gmail.com" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 h-[42px] w-full" />
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
                      <form className="w-full space-y-8" onSubmit={handleFamilyBackgroundSubmit}>

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
                                    onChange={(e) => {
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
                                      if (childrenList.length > 1) {
                                        setChildrenList(childrenList.filter((_, i) => i !== idx));
                                      }
                                    }}
                                    className={`p-2.5 rounded border transition-colors ${childrenList.length > 1 ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
                                    disabled={childrenList.length === 1}
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
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleEducationalBackgroundSubmit}>
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
                            <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                              <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name of School (Write in full)</span>
                                <input type="text" value={educationalDates[level.id]?.school || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), school: e.target.value } })} required={level.required} placeholder="Enter name of school" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                              </div>

                              {['vocational', 'college', 'graduate'].includes(level.id) && (
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Basic Education/Degree/Course (Write in full)</span>
                                  <input type="text" value={educationalDates[level.id]?.degree || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), degree: e.target.value } })} required={level.required} placeholder="Enter degree/course" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                </div>
                              )}

                              <div className="flex flex-col justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Period of Attendance (From - To)</span>
                                <div className="flex gap-3 relative">
                                  <input
                                    type="date"
                                    required={level.required}
                                    value={educationalDates[level.id]?.from ? new Date(educationalDates[level.id].from as any).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEducationalDates(prev => ({ ...prev, [level.id]: { ...(prev[level.id] || {}), from: e.target.value ? new Date(e.target.value) : null } }))}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] "
                                  />
                                  <input
                                    type="date"
                                    required={level.required}
                                    value={educationalDates[level.id]?.to ? new Date(educationalDates[level.id].to as any).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEducationalDates(prev => ({ ...prev, [level.id]: { ...(prev[level.id] || {}), to: e.target.value ? new Date(e.target.value) : null } }))}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] "
                                  />
                                </div>
                              </div>

                              {['vocational', 'college', 'graduate'].includes(level.id) && (
                                <>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Highest Level/Units Earned (if not graduated)</span>
                                    <input type="text" value={educationalDates[level.id]?.units || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), units: e.target.value } })} placeholder="Enter level/units" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                  <div className="flex flex-col justify-between h-full">
                                    <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Year Graduated</span>
                                    <input type="text" value={educationalDates[level.id]?.year || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), year: e.target.value } })} placeholder="Enter year" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
                                  </div>
                                </>
                              )}

                              <div className="flex flex-col lg:col-span-3 justify-between h-full">
                                <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Scholarship/Academic Honors Received</span>
                                <input type="text" value={educationalDates[level.id]?.honors || ''} onChange={e => setEducationalDates({ ...educationalDates, [level.id]: { ...(educationalDates[level.id] || {}), honors: e.target.value } })} placeholder="Enter scholarship or academic honors" className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full" />
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
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleCivilServiceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your civil service eligibility. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {civilServiceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Eligibility #{idx + 1}</h3>
                                {civilServiceList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCivilServiceList(civilServiceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-2 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Career Service/RA 1080 (Board/Bar)/Under Special Laws/CES/CSEE</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter eligibility name"
                                    value={item.eligibility}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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

                          <button
                            type="button"
                            onClick={() => setCivilServiceList([...civilServiceList, { eligibility: '', rating: '', date: null, place: '', licenseNo: '', licenseDate: null }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Eligibility
                          </button>
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
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleWorkExperienceSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your work experience from most recent to oldest. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {workExperienceList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Work Experience #{idx + 1}</h3>
                                {workExperienceList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setWorkExperienceList(workExperienceList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].company = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Monthly Salary</span>
                                  <input
                                    type="text"
                                    placeholder="Enter monthly salary"
                                    value={item.monthlySalary}
                                    onChange={(e) => {
                                      const newList = [...workExperienceList];
                                      newList[idx].monthlySalary = e.target.value;
                                      setWorkExperienceList(newList);
                                    }}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Salary/Job/Pay Grade & Step</span>
                                  <input
                                    type="text"
                                    placeholder="Format 00-0"
                                    value={item.salaryGrade}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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

                          <button
                            type="button"
                            onClick={() => setWorkExperienceList([...workExperienceList, { fromDate: null, toDate: null, positionTitle: '', company: '', monthlySalary: '', salaryGrade: '', statusOfAppointment: '', govtService: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Work Experience
                          </button>
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
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleVoluntaryWorkSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your voluntary work or involvement in civic/non-government/people/voluntary organizations. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {voluntaryWorkList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-visible bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center rounded-t-lg">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Voluntary Work #{idx + 1}</h3>
                                {voluntaryWorkList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVoluntaryWorkList(voluntaryWorkList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col lg:col-span-3 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Name & Address of Organization (Write in full)</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter name & address of organization"
                                    value={item.nameAddress}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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

                          <button
                            type="button"
                            onClick={() => setVoluntaryWorkList([...voluntaryWorkList, { nameAddress: '', fromDate: null, toDate: null, hours: '', position: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Voluntary Work
                          </button>
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
                      <form className="w-full max-w-5xl space-y-6" onSubmit={handleLearningDevelopmentSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your learning and development (L&D) interventions/training programs attended. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="flex flex-col gap-6">
                          {learningDevelopmentList.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Training #{idx + 1}</h3>
                                {learningDevelopmentList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setLearningDevelopmentList(learningDevelopmentList.filter((_, i) => i !== idx));
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                                <div className="flex flex-col lg:col-span-4 justify-between h-full">
                                  <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Title of Learning and Development Interventions/Training Programs (Write in full)</span>
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter title of learning and development interventions/training programs"
                                    value={item.title}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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

                          <button
                            type="button"
                            onClick={() => setLearningDevelopmentList([...learningDevelopmentList, { title: '', fromDate: null, toDate: null, hours: '', type: '', sponsor: '' }])}
                            className="text-[#3b82f6] font-medium text-[13px] hover:bg-blue-50 py-2.5 px-4 rounded border border-dashed border-blue-200 flex items-center justify-center gap-2 transition-colors w-fit"
                          >
                            <Plus className="w-4 h-4" /> Add Training Program
                          </button>
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
                      <form className="w-full space-y-8" onSubmit={handleOtherInformationSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please list your special skills and hobbies, non-academic distinctions, and memberships. Write "N/A" if not applicable.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                          {/* Skills */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Special Skills & Hobbies</h3>
                            <div className="flex flex-col gap-3">
                              {skillsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter skill or hobby"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...skillsList];
                                      newList[idx].value = e.target.value;
                                      setSkillsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                  {skillsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
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
                          </div>

                          {/* Distinctions */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Non-Academic Distinctions</h3>
                            <div className="flex flex-col gap-3">
                              {distinctionsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter distinction/recognition"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...distinctionsList];
                                      newList[idx].value = e.target.value;
                                      setDistinctionsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                  {distinctionsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setDistinctionsList(distinctionsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
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
                          </div>

                          {/* Memberships */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide border-b border-gray-200 pb-2">Memberships in Associations</h3>
                            <div className="flex flex-col gap-3">
                              {membershipsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    required={idx === 0}
                                    placeholder="Enter association/organization"
                                    value={item.value}
                                    onChange={(e) => {
                                      const newList = [...membershipsList];
                                      newList[idx].value = e.target.value;
                                      setMembershipsList(newList);
                                    }}
                                    className="flex-1 border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px]"
                                  />
                                  {membershipsList.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => setMembershipsList(membershipsList.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
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
                      <form className="w-full space-y-8" onSubmit={handleLegalQuestionnaireSubmit}>
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
                                      onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: questionnaire[q.id]?.details || '' } })}
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
                                      onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: e.target.value, details: '' } })}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      required
                                    />
                                    <span className="text-[14px] text-gray-600">No</span>
                                  </label>
                                </div>
                                {questionnaire[q.id]?.answer === 'Yes' && (
                                  <input
                                    type="text"
                                    required
                                    placeholder="Please provide details"
                                    value={questionnaire[q.id]?.details || ''}
                                    onChange={(e) => setQuestionnaire({ ...questionnaire, [q.id]: { answer: 'Yes', details: e.target.value } })}
                                    className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 mt-1 h-[42px] w-full"
                                  />
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Government Issued ID</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Passport, GSIS, SSS"
                                value={governmentId.type}
                                onChange={(e) => setGovernmentId({ ...governmentId, type: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">ID/License/Passport No.</span>
                              <input
                                type="text"
                                required
                                placeholder="Enter ID/License/Passport No."
                                value={governmentId.idNo}
                                onChange={(e) => setGovernmentId({ ...governmentId, idNo: e.target.value })}
                                className="border border-gray-300 rounded p-2.5 text-[14px] text-gray-700 outline-none focus:border-blue-500 bg-gray-50/50 h-[42px] w-full"
                              />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <span className="text-[12px] text-gray-400 mb-1.5 font-medium">Date/Place of Issuance</span>
                              <input
                                type="text"
                                required
                                placeholder="Enter date/place of issuance"
                                value={governmentId.datePlace}
                                onChange={(e) => setGovernmentId({ ...governmentId, datePlace: e.target.value })}
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
                      <form className="w-full space-y-8" onSubmit={handleEssentialDocumentsSubmit}>
                        <div className="mb-6">
                          <p className="text-[13px] text-gray-500 italic">Please upload the required essential documents for your application. (Max file size: 5MB per document)</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3.5">
                            <h3 className="font-bold text-gray-700 text-[14px] uppercase tracking-wide">Essential Documents</h3>
                          </div>
                          <div className="p-5 flex flex-col gap-6">
                            {[
                              'Personal Data Sheet',
                              'Work Experience Sheet',
                              'Certificate of Eligibility',
                              'Transcript of Records',
                              'Updated PRC License/ID',
                              'Diploma (optional)',
                              'Resume'
                            ].map(doc => (
                              <div key={doc} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <span className="text-[14px] font-medium text-gray-700">{doc} {doc.includes('optional') ? '' : <span className="text-red-500">*</span>}</span>
                                <input
                                  type="file"
                                  required={!doc.includes('optional')}
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setDocuments({ ...documents, [doc]: e.target.files[0] });
                                    }
                                  }}
                                  className="text-[13px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[13px] file:font-semibold file:bg-blue-50 file:text-[#1a73e8] hover:file:bg-blue-100 file:transition-colors file:cursor-pointer outline-none w-full md:w-auto"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 mt-4 border-t border-gray-100 gap-4">
                          <button type="button" onClick={() => setCurrentStep('Legal Questionnaire')} className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                          </button>
                          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2.5 px-8 rounded flex items-center gap-2 transition-colors">
                            Submit Application <FileText className="w-4 h-4 ml-1" />
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
    </div>
  );
}
