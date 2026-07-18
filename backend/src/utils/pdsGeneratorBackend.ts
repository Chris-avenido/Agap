import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';
import path from 'path';

// Helper to check native Form Controls via zip XML modification
const toggleFormControl = async (workbook: any, ctrlPropId: number, isChecked: boolean) => {
  const xmlPath = `xl/ctrlProps/ctrlProp${ctrlPropId}.xml`;
  const file = workbook._zip.file(xmlPath);
  if (!file) return;
  let xml = await file.async('string');
  
  if (isChecked) {
      if (xml.includes('checked=')) {
          xml = xml.replace(/checked="[^"]*"/, 'checked="Checked"');
      } else {
          xml = xml.replace('<formControlPr ', '<formControlPr checked="Checked" ');
      }
  } else {
      // To prevent XML schema corruption, remove the attribute completely for unchecked state
      if (xml.includes('checked=')) {
          xml = xml.replace(/\s?checked="[^"]*"/, '');
      }
  }
  workbook._zip.file(xmlPath, xml);
};

const parseAddress = (addressStr: string | any) => {
  if (!addressStr) return {};
  if (typeof addressStr === 'object') return addressStr;
  try {
    const parsed = JSON.parse(addressStr);
    return typeof parsed === 'object' ? parsed : {};
  } catch(e) {
    return { house: addressStr }; 
  }
};

export const generatePDSBackend = async (applicantData: any) => {
  const templatePath = path.join(__dirname, '../../../frontend/src/assets/ANNEX H-1 - CS Form No. 212 Revised 2025 - Personal Data Sheet (2).xlsx');

  if (!fs.existsSync(templatePath)) {
    throw new Error("Excel template not found at: " + templatePath);
  }

  const workbook = await XlsxPopulate.fromFileAsync(templatePath);

  const sheetC1 = workbook.sheet('C1');
  const sheetC2 = workbook.sheet('C2');
  const sheetC3 = workbook.sheet('C3');
  const sheetC4 = workbook.sheet('C4');

  const logs = { populated: 0, missing: [] as string[] };
  const write = (sheet: any, cell: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      // Prevent writing raw objects/arrays which corrupts the cell value in xlsx-populate
      if (typeof value === 'object') {
        sheet.cell(cell).value(JSON.stringify(value));
      } else {
        sheet.cell(cell).value(value);
      }
      logs.populated++;
    }
  };

  // --- SHEET C1: PERSONAL INFORMATION ---
  write(sheetC1, 'D10', applicantData.surname || applicantData.last_name);
  write(sheetC1, 'D11', applicantData.firstName || applicantData.first_name);
  write(sheetC1, 'D12', applicantData.middleName || applicantData.middle_name);
  write(sheetC1, 'N11', applicantData.nameExtension || applicantData.name_extension);
  write(sheetC1, 'D13', applicantData.dateOfBirth || applicantData.date_of_birth);
  write(sheetC1, 'D15', applicantData.placeOfBirth || applicantData.place_of_birth);
  
  // Sex Form Controls
  const sex = (applicantData.sex || '').toUpperCase();
  await toggleFormControl(workbook, 4, sex === 'MALE');
  await toggleFormControl(workbook, 5, sex === 'FEMALE');

  // Civil Status Form Controls
  const civilStatus = applicantData.civilStatus || applicantData.civil_status || '';
  await toggleFormControl(workbook, 6, civilStatus === 'Single');
  await toggleFormControl(workbook, 7, civilStatus === 'Married');
  await toggleFormControl(workbook, 8, civilStatus === 'Widowed');
  await toggleFormControl(workbook, 10, civilStatus === 'Separated');
  await toggleFormControl(workbook, 9, civilStatus === 'Others');

  // Citizenship
  const citizenship = applicantData.citizenship || '';
  const citType = applicantData.citizenshipType || (applicantData.other_information && applicantData.other_information.citizenshipType) || '';
  await toggleFormControl(workbook, 2, citizenship === 'Filipino');
  await toggleFormControl(workbook, 3, citizenship === 'Dual Citizenship');
  await toggleFormControl(workbook, 11, citType === 'by birth');
  await toggleFormControl(workbook, 12, citType === 'by naturalization');
  
  write(sheetC1, 'D17', applicantData.civilStatus || applicantData.civil_status);
  const otherInfo = applicantData.other_information || {};
  write(sheetC1, 'D22', otherInfo.height || applicantData.height);
  write(sheetC1, 'D24', otherInfo.weight || applicantData.weight);
  write(sheetC1, 'D25', otherInfo.bloodType || applicantData.blood_type || applicantData.bloodType);
  
  write(sheetC1, 'D27', otherInfo.gsis || applicantData.gsis_id_no || applicantData.gsis);
  write(sheetC1, 'D29', otherInfo.pagibig || applicantData.pag_ibig_id_no || applicantData.pagibig);
  write(sheetC1, 'D31', otherInfo.philhealth || applicantData.philhealth_no || applicantData.philhealth);
  write(sheetC1, 'D32', otherInfo.sss || applicantData.sss_no || applicantData.sss);
  write(sheetC1, 'D33', otherInfo.tin || applicantData.tin_no || applicantData.tin);
  write(sheetC1, 'D34', otherInfo.agencyEmployeeNo || applicantData.agency_employee_no || applicantData.agencyEmployeeNo);

  const resAddr = parseAddress(applicantData.residential_address || applicantData.resAddress);
  write(sheetC1, 'I17', resAddr.house);
  write(sheetC1, 'L17', resAddr.street);
  write(sheetC1, 'I19', resAddr.subdivision);
  write(sheetC1, 'L19', resAddr.barangay);
  write(sheetC1, 'I22', resAddr.city);
  write(sheetC1, 'L22', resAddr.province);
  write(sheetC1, 'I24', resAddr.zip);

  const permAddr = parseAddress(applicantData.permanent_address || applicantData.permAddress);
  write(sheetC1, 'I25', permAddr.house);
  write(sheetC1, 'L25', permAddr.street);
  write(sheetC1, 'I27', permAddr.subdivision);
  write(sheetC1, 'L27', permAddr.barangay);
  write(sheetC1, 'I29', permAddr.city);
  write(sheetC1, 'L29', permAddr.province);
  write(sheetC1, 'I31', permAddr.zip);

  write(sheetC1, 'I32', applicantData.telephone || applicantData.telephone_no);
  write(sheetC1, 'I33', applicantData.mobile || applicantData.mobile_no);
  write(sheetC1, 'I34', applicantData.email || applicantData.email_address);

  // Family Background
  const family = applicantData.family_background || {};
  write(sheetC1, 'D36', family.spouse?.surname || family.spouseSurname);
  write(sheetC1, 'D37', family.spouse?.first_name || family.spouse?.firstName || family.spouseFirst);
  write(sheetC1, 'D38', family.spouse?.middle_name || family.spouse?.middleName || family.spouseMiddle);
  write(sheetC1, 'N37', family.spouse?.name_extension || family.spouse?.nameExtension || family.spouseExt);
  write(sheetC1, 'D39', family.spouse?.occupation || family.spouseOccupation);
  write(sheetC1, 'D40', family.spouse?.employer || family.spouse?.employer_business || family.spouseEmployer);
  write(sheetC1, 'D41', family.spouse?.business_address || family.spouseBusAddress);
  write(sheetC1, 'D42', family.spouse?.telephone || family.spouseTelephone);
  
  write(sheetC1, 'D43', family.father?.surname || family.fatherSurname);
  write(sheetC1, 'D44', family.father?.first_name || family.father?.firstName || family.fatherFirst);
  write(sheetC1, 'D45', family.father?.middle_name || family.father?.middleName || family.fatherMiddle);
  write(sheetC1, 'N44', family.father?.name_extension || family.father?.nameExtension || family.fatherExt);
  
  write(sheetC1, 'D47', family.mother?.maiden_surname || family.mother?.surname || family.motherSurname);
  write(sheetC1, 'D48', family.mother?.first_name || family.mother?.firstName || family.motherFirst);
  write(sheetC1, 'D49', family.mother?.middle_name || family.mother?.middleName || family.motherMiddle);

  // Educational Background
  let eduArray = applicantData.educational_background;
  if (!Array.isArray(eduArray)) eduArray = [];
  const getEdu = (lvl: string) => eduArray.find((e: any) => e.level && e.level.toUpperCase() === lvl) || (applicantData.educationalDates ? applicantData.educationalDates[lvl.toLowerCase()] : {}) || {};

  const mapEdu = (level: string, row: number) => {
    const data = getEdu(level);
    write(sheetC1, `D${row}`, data.schoolName || data.school);
    write(sheetC1, `G${row}`, data.degree);
    write(sheetC1, `J${row}`, data.from);
    write(sheetC1, `K${row}`, data.to);
    write(sheetC1, `L${row}`, data.highestLevel || data.units);
    write(sheetC1, `M${row}`, data.yearGraduated || data.year);
    write(sheetC1, `N${row}`, data.honorsReceived || data.honors);
  };
  mapEdu('ELEMENTARY', 54);
  mapEdu('SECONDARY', 55);
  mapEdu('VOCATIONAL', 56);
  mapEdu('COLLEGE', 57);
  mapEdu('GRADUATE', 58);

  const populateArray = (sheet: any, list: any[], config: any) => {
    if (!list || !Array.isArray(list)) return;
    let currentRow = config.startRow;
    for (const item of list) {
      if (currentRow > config.endRow) break;
      for (const [key, col] of Object.entries(config.columns)) {
        write(sheet, `${col}${currentRow}`, item[key]);
      }
      currentRow++;
    }
  };

  // Children
  const children = (applicantData.other_information && applicantData.other_information.children) || applicantData.children || [];
  populateArray(sheetC1, children, {
    startRow: 37, endRow: 48, columns: { name: 'I', dateOfBirth: 'M' }
  });

  // --- SHEET C2 ---
  populateArray(sheetC2, applicantData.civil_service_eligibility || applicantData.civilServiceList, {
    startRow: 5, endRow: 11, columns: { eligibility: 'A', rating: 'F', date: 'G', place: 'I', licenseNo: 'J', licenseDate: 'K' }
  });

  // NOTE: Salary Grade and Monthly Salary are omitted per instruction (and because the 2025 template shifted Status to J and Govt to K)
  populateArray(sheetC2, applicantData.work_experience || applicantData.workExperienceList, {
    startRow: 18, endRow: 45, columns: { fromDate: 'A', toDate: 'C', positionTitle: 'D', company: 'G', statusOfAppointment: 'J', govtService: 'K' }
  });

  // --- SHEET C3 ---
  populateArray(sheetC3, applicantData.voluntary_work || applicantData.voluntaryWorkList, {
    startRow: 6, endRow: 12, columns: { nameAddress: 'A', fromDate: 'E', toDate: 'F', hours: 'G', position: 'H' }
  });

  populateArray(sheetC3, applicantData.learning_and_development || applicantData.learningDevelopmentList, {
    startRow: 18, endRow: 38, columns: { title: 'A', fromDate: 'E', toDate: 'F', hours: 'G', type: 'H', sponsor: 'I' }
  });

  populateArray(sheetC3, otherInfo.skills || applicantData.skillsList, { startRow: 42, endRow: 48, columns: { value: 'A' } });
  populateArray(sheetC3, otherInfo.distinctions || applicantData.distinctionsList, { startRow: 42, endRow: 48, columns: { value: 'D' } });
  populateArray(sheetC3, otherInfo.memberships || applicantData.membershipsList, { startRow: 42, endRow: 48, columns: { value: 'J' } });

  // --- SHEET C4 ---
  populateArray(sheetC4, otherInfo.references || applicantData.referencesList, {
    startRow: 52, endRow: 54, columns: { name: 'A', address: 'F', telephone: 'G' }
  });

  // Government ID
  const govId = otherInfo.governmentId || {};
  write(sheetC4, 'D61', govId.type || '');
  write(sheetC4, 'D62', govId.idNo || '');
  write(sheetC4, 'D64', govId.datePlace || '');

  // Questionnaire Form Controls
  const q = applicantData.questionnaire_responses || applicantData.questionnaire || {};
  
  const isYes = (val: any) => {
    if (val && typeof val === 'object') val = val.answer;
    return val === true || val === 'Yes' || val === 'Y' || val === 'true' || val === 'YES';
  };
  const isNo = (val: any) => {
    if (val && typeof val === 'object') val = val.answer;
    return val === false || val === 'No' || val === 'N' || val === 'false' || val === 'NO';
  };

  await toggleFormControl(workbook, 13, isYes(q.q34a || q['34a']));
  await toggleFormControl(workbook, 14, isNo(q.q34a || q['34a']));

  await toggleFormControl(workbook, 15, isYes(q.q34b || q['34b']));
  await toggleFormControl(workbook, 16, isNo(q.q34b || q['34b']));

  await toggleFormControl(workbook, 17, isYes(q.q35a || q['35a']));
  await toggleFormControl(workbook, 18, isNo(q.q35a || q['35a']));
  write(sheetC4, 'G14', q.q35a_details || q['35a_details']);

  await toggleFormControl(workbook, 19, isYes(q.q35b || q['35b']));
  await toggleFormControl(workbook, 20, isNo(q.q35b || q['35b']));
  write(sheetC4, 'H20', q.q35b_date || q['35b_date']);
  write(sheetC4, 'G21', q.q35b_status || q['35b_status']);

  await toggleFormControl(workbook, 21, isYes(q.q36 || q['36']));
  await toggleFormControl(workbook, 22, isNo(q.q36 || q['36']));
  write(sheetC4, 'G24', q.q36_details || q['36_details']);

  await toggleFormControl(workbook, 23, isYes(q.q37 || q['37']));
  await toggleFormControl(workbook, 24, isNo(q.q37 || q['37']));
  write(sheetC4, 'G28', q.q37_details || q['37_details']);

  await toggleFormControl(workbook, 34, isYes(q.q38a || q['38a']));
  await toggleFormControl(workbook, 35, isNo(q.q38a || q['38a']));
  write(sheetC4, 'G32', q.q38a_details || q['38a_details']);

  await toggleFormControl(workbook, 36, isYes(q.q38b || q['38b']));
  await toggleFormControl(workbook, 37, isNo(q.q38b || q['38b']));
  write(sheetC4, 'G35', q.q38b_details || q['38b_details']);

  await toggleFormControl(workbook, 25, isYes(q.q39 || q['39']));
  await toggleFormControl(workbook, 26, isNo(q.q39 || q['39']));
  write(sheetC4, 'G38', q.q39_details || q['39_details']);

  await toggleFormControl(workbook, 27, isYes(q.q40a || q['40a']));
  await toggleFormControl(workbook, 30, isNo(q.q40a || q['40a']));
  write(sheetC4, 'G44', q.q40a_details || q['40a_details']);

  await toggleFormControl(workbook, 28, isYes(q.q40b || q['40b']));
  await toggleFormControl(workbook, 31, isNo(q.q40b || q['40b']));
  write(sheetC4, 'G46', q.q40b_details || q['40b_details']);

  await toggleFormControl(workbook, 29, isYes(q.q40c || q['40c']));
  await toggleFormControl(workbook, 32, isNo(q.q40c || q['40c']));
  write(sheetC4, 'G48', q.q40c_details || q['40c_details']);

  const outBuffer = await workbook.outputAsync();
  return { buffer: outBuffer, logs };
};
