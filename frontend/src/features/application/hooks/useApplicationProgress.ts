import type { RefObject } from "react";
import { useMemo } from "react";
import { calculateProfileProgress, parseProfileToState } from "../../../utils/profileProgress";

export interface UseApplicationProgressInput {
  civilServiceList: any[];
  distinctionsList: any[];
  formRef: RefObject<HTMLFormElement | null>;
  formVersion: number;
  isRegistrationFlow: boolean;
  jobTitle: string;
  learningDevelopmentList: any[];
  membershipsList: any[];
  qAnswers: { [x: string]: string; };
  qRes: any;
  selectedFiles: { [x: string]: File; };
  sex: string;
  skillsList: any[];
  userData: any;
  voluntaryWorkList: any[];
  workExperienceList: any[];
}

export function useApplicationProgress({
  civilServiceList,
  distinctionsList,
  formRef,
  formVersion,
  isRegistrationFlow,
  jobTitle,
  learningDevelopmentList,
  membershipsList,
  qAnswers,
  qRes,
  selectedFiles,
  sex,
  skillsList,
  userData,
  voluntaryWorkList,
  workExperienceList,
}: UseApplicationProgressInput) {
  const requiredDocuments = useMemo(() => {
    const docs = [
      { label: 'Notarized Personal Data Sheet', inputName: 'doc_pds' },
      { label: 'Work Experience Sheet', inputName: 'doc_work_exp' },
      { label: 'Certificate of Eligibility', inputName: 'doc_eligibility' },
      { label: 'Transcript of Records', inputName: 'doc_tor' },
      { label: 'Updated PRC License/ID', inputName: 'doc_prc' },
    ];
    if (!isRegistrationFlow) {
      docs.push({ label: 'Letter of Intent', inputName: 'doc_loi' });
      docs.push({ label: 'Sworn Declaration', inputName: 'doc_sworn' });
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
      'Notarized Personal Data Sheet': Boolean(selectedFiles['Notarized Personal Data Sheet'] || selectedFiles['Personal Data Sheet'] || hasSelectedFile('doc_pds')),
      'Work Experience Sheet': Boolean(selectedFiles['Work Experience Sheet'] || hasSelectedFile('doc_work_exp')),
      'Certificate of Eligibility': Boolean(selectedFiles['Certificate of Eligibility'] || hasSelectedFile('doc_eligibility')),
      'Transcript of Records': Boolean(selectedFiles['Transcript of Records'] || hasSelectedFile('doc_tor')),
      'Updated PRC License/ID': Boolean(selectedFiles['Updated PRC License/ID'] || hasSelectedFile('doc_prc')),
      'Service Record / Certificate of Employment': Boolean(selectedFiles['Service Record / Certificate of Employment'] || hasSelectedFile('doc_service_record')),
      'Letter of Intent': Boolean(selectedFiles['Letter of Intent'] || hasSelectedFile('doc_loi')),
      'Sworn Declaration': Boolean(selectedFiles['Sworn Declaration'] || hasSelectedFile('doc_sworn'))
    };

    const liveRefs = [
      { name: getVal('ref1_name', parsedData.referencesList?.[0]?.name || ''), address: getVal('ref1_address', parsedData.referencesList?.[0]?.address || ''), telephone: getVal('ref1_tel', parsedData.referencesList?.[0]?.telephone || '') },
      { name: getVal('ref2_name', parsedData.referencesList?.[1]?.name || ''), address: getVal('ref2_address', parsedData.referencesList?.[1]?.address || ''), telephone: getVal('ref2_tel', parsedData.referencesList?.[1]?.telephone || '') },
      { name: getVal('ref3_name', parsedData.referencesList?.[2]?.name || ''), address: getVal('ref3_address', parsedData.referencesList?.[2]?.address || ''), telephone: getVal('ref3_tel', parsedData.referencesList?.[2]?.telephone || '') }
    ];
    const liveGovId = {
      type: getVal('gov_id_type', parsedData.governmentId?.type || ''),
      idNo: getVal('gov_id_no', parsedData.governmentId?.idNo || ''),
      datePlace: getVal('gov_id_issuance', parsedData.governmentId?.datePlace || '')
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
      questionnaire: qRes || parsedData.questionnaire,
      referencesList: liveRefs.some(r => r.name.length > 0) ? liveRefs : parsedData.referencesList,
      governmentId: liveGovId.type.length > 0 || liveGovId.idNo.length > 0 ? liveGovId : parsedData.governmentId,
      documents: localDocs,
      isSubsequentApplication: !isRegistrationFlow,
      context: (jobTitle === "Profile Update" ? "my-profile" : "apply-now") as "my-profile" | "apply-now"
    };

    const res = calculateProfileProgress(data);
    if ((jobTitle === "Profile Update" || data.context === "my-profile") && parseFloat(res.percentage) >= 90) {
      const forcedSteps = res.steps.includes('Essential Documents')
        ? res.steps
        : [...res.steps, 'Essential Documents'];
      return { ...res, steps: forcedSteps, percentage: '100' };
    }
    return res;
  }, [
    userData, isRegistrationFlow, formVersion, selectedFiles, sex, civilServiceList, workExperienceList, voluntaryWorkList, learningDevelopmentList, skillsList, distinctionsList, membershipsList, qRes, qAnswers
  ]);

  return { requiredDocuments, completedSteps, percentage, totalSteps };
}
