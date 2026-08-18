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
  referencesList?: any[];
  references?: any[];
  governmentId?: any;
  documentsConfirmed?: Record<string, boolean>;
  isSubsequentApplication?: boolean;
  uploadedDocumentUrls?: Record<string, string>;
  documents?: Record<string, any>;
  context?: 'my-profile' | 'apply-now';
  jobPosition?: any;
}) => {
  const steps: string[] = [];

  if (data.firstName?.trim() && data.lastName?.trim() && data.placeOfBirth?.trim() && data.sex && data.civilStatus && data.citizenship) steps.push('Personal Information');
  if (data.motherSurname?.trim() || data.motherFirst?.trim() || data.fatherSurname?.trim() || data.fatherFirst?.trim() || data.spouseSurname?.trim() || data.spouseFirst?.trim()) steps.push('Family Background');
  
  const ed = data.educationalDates || {};
  const isGeneralProfile = data.context === 'my-profile' && !data.jobPosition;
  if (isGeneralProfile) {
    // Boolean() treats both undefined and '' as false — requires an actual school name
    if (Object.values(ed).some((item: any) => Boolean(item?.school?.trim()))) {
      steps.push('Educational Background');
    }
  } else {
    // For job applications, require secondary AND college entries with actual school names
    const hasSecondary = Boolean(ed.secondary?.school?.trim());
    const hasCollege = Boolean(ed.college?.school?.trim());
    if (hasSecondary && hasCollege) {
      steps.push('Educational Background');
    }
  }

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

  // Legal Questionnaire Validation
  const qIds = ['34a', '34b', '35a', '35b', '36', '37', '38a', '38b', '39', '40a', '40b', '40c'];
  const q = data.questionnaire || {};
  const allQAnswered = qIds.every(id => {
    const item = q[id] !== undefined ? q[id] : q[`q${id}`];
    if (item === undefined || item === null || item === '') return false;
    const rawAns = typeof item === 'string' ? item : (typeof item === 'object' ? (item.answer || item.ans) : '');
    if (!rawAns) return false;
    const ans = String(rawAns).trim().toLowerCase();
    if (ans !== 'yes' && ans !== 'no') return false;
    if (ans === 'yes' && id !== '34a' && id !== '34b') {
      const details = typeof item === 'object' && item?.details !== undefined
        ? item.details 
        : (q[`q${id}_details`] ?? q[`${id}_details`] ?? '');
      if (details === null || details === undefined) return false;
      if (typeof details === 'string') {
        if (details.trim() === '') return false;
      } else if (typeof details === 'object') {
        const hasSomeValue = Object.values(details).some(v => v !== null && v !== undefined && String(v).trim() !== '');
        if (!hasSomeValue) return false;
      } else {
        if (String(details).trim() === '') return false;
      }
    }
    return true;
  });

  const refs = data.referencesList || data.references || [];
  const validRefs = Array.isArray(refs) && refs.length >= 3 && refs.slice(0, 3).every(r => String(r?.name || '').trim() && String(r?.address || '').trim() && (String(r?.telephone || '').trim() || String(r?.contact || '').trim() || String(r?.phone || '').trim() || String(r?.tel || '').trim()));

  const gov = data.governmentId || {};
  const validGovId = Boolean(String(gov.type || gov.idType || gov.gov_id_type || '').trim() && String(gov.idNo || gov.number || gov.gov_id_no || '').trim() && String(gov.datePlace || gov.datePlaceOfIssuance || gov.gov_id_issuance || '').trim());

  if (allQAnswered && validRefs && validGovId) {
    steps.push('Legal Questionnaire');
  }

  const requiredDocs = [
    'Notarized Personal Data Sheet',
    'Work Experience Sheet',
    'Certificate of Eligibility',
    'Transcript of Records'
  ];

  const isDocDone = (docName: string) => {
    if (Boolean(data.documentsConfirmed && data.documentsConfirmed[docName])) return true;
    if (Boolean(data.uploadedDocumentUrls && data.uploadedDocumentUrls[docName])) return true;
    if (Boolean(data.documents && data.documents[docName])) return true;
    if (docName === 'Notarized Personal Data Sheet') {
      if (Boolean(data.documentsConfirmed && data.documentsConfirmed['Personal Data Sheet'])) return true;
      if (Boolean(data.uploadedDocumentUrls && data.uploadedDocumentUrls['Personal Data Sheet'])) return true;
      if (Boolean(data.documents && data.documents['Personal Data Sheet'])) return true;
    }
    return false;
  };

  // Sidebar turns green when all 4 required docs are uploaded or confirmed
  const allRequiredDocsDone = requiredDocs.every(d => isDocDone(d));

  if (allRequiredDocsDone) {
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
    const refs: any[] = [];
    const govId = { type: '', idNo: '', datePlace: '' };

    for (const k in parsedQ) {
      const val = parsedQ[k];
      if (k.startsWith('ref')) {
        const match = k.match(/ref(\d+)_(name|address|tel|telephone|contact|phone|mobile|no)/i);
        if (match) {
          const idx = parseInt(match[1]) - 1;
          const fieldType = match[2].toLowerCase();
          const field = (fieldType === 'name' || fieldType === 'address') ? fieldType : 'telephone';
          while (refs.length <= idx) refs.push({ name: '', address: '', telephone: '' });
          refs[idx][field] = val || '';
        }
        continue;
      }
      if (k.startsWith('gov_id')) {
        if (k === 'gov_id_type') govId.type = val || '';
        if (k === 'gov_id_no') govId.idNo = val || '';
        if (k === 'gov_id_issuance') govId.datePlace = val || '';
        continue;
      }

      let mapKey = k;
      if (mapKey.startsWith('q')) mapKey = mapKey.substring(1);

      let normalizedVal = val;
      if (typeof val === 'string') {
        const upper = val.trim().toUpperCase();
        if (upper === 'YES') normalizedVal = 'Yes';
        else if (upper === 'NO') normalizedVal = 'No';
      } else if (val && typeof val === 'object' && val.answer) {
        const upper = String(val.answer).trim().toUpperCase();
        normalizedVal = {
          ...val,
          answer: upper === 'YES' ? 'Yes' : (upper === 'NO' ? 'No' : val.answer)
        };
      }

      normalizedQ[mapKey] = normalizedVal;
      normalizedQ[k] = normalizedVal;
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

    const finalRefs = (other.references && Array.isArray(other.references) && other.references.length >= 3) ? other.references : refs;
    const finalGovId = (other.governmentId && other.governmentId.type) ? other.governmentId : govId;

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
      referencesList: finalRefs,
      governmentId: finalGovId,
      documentsConfirmed: {},
      uploadedDocumentUrls: other.documents || {},
      documents: {}
    };
};
