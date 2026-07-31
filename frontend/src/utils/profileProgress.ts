export const calculateProfileProgress = (data: {
  firstName?: string;
  lastName?: string;
  placeOfBirth?: string;
  sex?: string;
  civilStatus?: string;
  citizenship?: string;
  motherSurname?: string;
  motherFirst?: string;
  fatherSurname?: string;
  fatherFirst?: string;
  spouseSurname?: string;
  spouseFirst?: string;
  educationalDates?: any;
  civilServiceList?: any[];
  workExperienceList?: any[];
  voluntaryWorkList?: any[];
  learningDevelopmentList?: any[];
  skillsList?: any[];
  distinctionsList?: any[];
  membershipsList?: any[];
  questionnaire?: any;
  documentsConfirmed?: Record<string, boolean>;
  isSubsequentApplication?: boolean;
  uploadedDocumentUrls?: Record<string, string>;
  documents?: Record<string, any>;
  context?: 'my-profile' | 'apply-now';
}) => {
  const steps: string[] = [];

  if (data.firstName?.trim() && data.lastName?.trim() && data.placeOfBirth?.trim() && data.sex && data.civilStatus && data.citizenship) steps.push('Personal Information');
  if (data.motherSurname?.trim() || data.motherFirst?.trim() || data.fatherSurname?.trim() || data.fatherFirst?.trim() || data.spouseSurname?.trim() || data.spouseFirst?.trim()) steps.push('Family Background');
  
  if (data.educationalDates && Object.values(data.educationalDates).some((ed: any) => ed?.school?.trim() !== '')) steps.push('Educational Background');
  if (data.civilServiceList?.some((cs: any) => (cs?.eligibility && String(cs.eligibility).trim() !== '') || (cs?.name && String(cs.name).trim() !== ''))) steps.push('Eligibility');
  if (data.workExperienceList?.some((we: any) => (we?.company && String(we.company).trim() !== '') || (we?.positionTitle && String(we.positionTitle).trim() !== '') || (we?.position && String(we.position).trim() !== ''))) steps.push('Work Experience');
  if (data.voluntaryWorkList?.some((vw: any) => (vw?.nameAddress && String(vw.nameAddress).trim() !== '') || (vw?.organization && String(vw.organization).trim() !== ''))) steps.push('Voluntary Work');
  if (data.learningDevelopmentList?.some((ld: any) => (ld?.title && String(ld.title).trim() !== ''))) steps.push('Learning & Development');
  const hasItemVal = (item: any) => {
    if (!item) return false;
    const val = typeof item === 'string' ? item : (item.value || item.name || '');
    return String(val).trim() !== '';
  };
  const parseList = (list: any) => {
    if (!list) return [];
    if (Array.isArray(list)) return list;
    if (typeof list === 'string') {
      try {
        const parsed = JSON.parse(list);
        if (Array.isArray(parsed)) return parsed;
        return [list];
      } catch {
        return [list];
      }
    }
    return [];
  };
  const sList = parseList(data.skillsList);
  const dList = parseList(data.distinctionsList);
  const mList = parseList(data.membershipsList);
  if (sList.some(hasItemVal) || dList.some(hasItemVal) || mList.some(hasItemVal)) steps.push('Other Information');
  const isQuestionnaireAnswered = (val: any) => {
    if (!val) return false;
    if (typeof val === 'string') return val.trim() !== '';
    if (typeof val === 'object') {
      const ans = val.answer || val.value || '';
      return typeof ans === 'string' && ans.trim() !== '';
    }
    return false;
  };
  if (data.questionnaire && Object.values(data.questionnaire).some(isQuestionnaireAnswered)) steps.push('Legal Questionnaire');

  const requiredDocs = [
    'Notarized Personal Data Sheet',
    'Work Experience Sheet',
    'Certificate of Eligibility',
    'Transcript of Records'
  ];

  // For sidebar: Essential Documents turns green only when all required docs are confirmed
  const isDocConfirmed = (docName: string) => {
    if (Boolean(data.documentsConfirmed && data.documentsConfirmed[docName])) return true;
    if (docName === 'Notarized Personal Data Sheet' && Boolean(data.documentsConfirmed && data.documentsConfirmed['Personal Data Sheet'])) return true;
    return false;
  };
  const isDocUploaded = (docName: string) => {
    if (Boolean(data.uploadedDocumentUrls && data.uploadedDocumentUrls[docName])) return true;
    if (Boolean(data.documents && data.documents[docName])) return true;
    if (docName === 'Notarized Personal Data Sheet') {
      if (Boolean(data.uploadedDocumentUrls && data.uploadedDocumentUrls['Personal Data Sheet'])) return true;
      if (Boolean(data.documents && data.documents['Personal Data Sheet'])) return true;
    }
    return false;
  };

  // Sidebar turns green ONLY when all 5 required docs are explicitly confirmed
  const allRequiredDocsConfirmed = requiredDocs.every(d => isDocConfirmed(d));

  if (allRequiredDocsConfirmed) {
    steps.push('Essential Documents');
  }

  const totalSteps = 10;
  const percentage = ((steps.length / totalSteps) * 100).toFixed(2);
  
  return { steps, percentage, totalSteps };
};
export const parseProfileToState = (profile: any) => {
    if (!profile) return {};
    const parseJSON = (val: any, fallback: any) => {
      if (!val) return fallback;
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return fallback; }
      }
      return val;
    };

    const family = parseJSON(profile.family_background, {});
    const edParsed = parseJSON(profile.educational_background, []);
    const newEd: any = {};
    if (Array.isArray(edParsed)) {
      edParsed.forEach((ed: any, idx: number) => {
        const levelMap: any = {
          'ELEMENTARY': 'elementary', 'SECONDARY': 'secondary',
          'VOCATIONAL / TRADE COURSE': 'vocational', 'VOCATIONAL': 'vocational',
          'COLLEGE': 'college', 'GRADUATE STUDIES': 'graduate', 'GRADUATE': 'graduate'
        };
        const fallbackLevels = ['elementary', 'secondary', 'vocational', 'college', 'graduate'];
        
        let matchedLevel = null;
        if (ed.level) {
          matchedLevel = levelMap[ed.level.toUpperCase()] || ed.level.toLowerCase();
        } else if (idx < fallbackLevels.length) {
          matchedLevel = fallbackLevels[idx];
        }

        if (matchedLevel) {
          newEd[matchedLevel] = {
            school: ed.school || ed.school_name || ''
          };
        }
      });
    }

    const other = parseJSON(profile.other_information, {});
    
    // Exact mapping for questionnaire as Job Board (excluding refs and gov_id)
    const parsedQ = parseJSON(profile.questionnaire_responses, {});
    const normalizedQ: any = {};
    for (const k in parsedQ) {
      if (k.startsWith('ref') || k.startsWith('gov_id')) continue;
      normalizedQ[k] = parsedQ[k];
    }

    // Exact mapping for skills
    const rawSkills = other.special_skills || other.skills;
    const formattedSkills = rawSkills 
      ? (Array.isArray(rawSkills) ? rawSkills.map((s: any) => typeof s === 'string' ? { value: s } : s) : [{ value: String(rawSkills) }])
      : [];

    const formattedDist = other.distinctions 
      ? (Array.isArray(other.distinctions) ? other.distinctions.map((d: any) => typeof d === 'string' ? { value: d } : d) : [{ value: String(other.distinctions) }])
      : [];

    const formattedMem = other.memberships 
      ? (Array.isArray(other.memberships) ? other.memberships.map((m: any) => typeof m === 'string' ? { value: m } : m) : [{ value: String(other.memberships) }])
      : [];

    return {
      firstName: profile.first_name,
      lastName: profile.surname,
      placeOfBirth: profile.place_of_birth,
      sex: profile.sex,
      civilStatus: profile.civil_status,
      citizenship: profile.citizenship,
      motherSurname: family.mother?.maiden_surname || profile.mother_maiden_surname || '',
      motherFirst: family.mother?.first_name || '',
      fatherSurname: family.father?.surname || '',
      fatherFirst: family.father?.first_name || '',
      spouseSurname: family.spouse?.surname || '',
      spouseFirst: family.spouse?.first_name || '',
      educationalDates: newEd,
      civilServiceList: parseJSON(profile.civil_service_eligibility, []),
      workExperienceList: parseJSON(profile.work_experience, []),
      voluntaryWorkList: parseJSON(profile.voluntary_work, []),
      learningDevelopmentList: parseJSON(profile.learning_and_development, []),
      skillsList: formattedSkills,
      distinctionsList: formattedDist,
      membershipsList: formattedMem,
      questionnaire: normalizedQ,
      documentsConfirmed: {},
      uploadedDocumentUrls: other.documents || {},
      documents: {}
    };
};
