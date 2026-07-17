import XlsxPopulate from 'xlsx-populate';
import { pdsMapping, pdsRepeatingConfig } from './pdsMappingBackend';
import fs from 'fs';
import path from 'path';

export const generatePDSBackend = async (applicantData: any) => {
  // Go up from dist/utils to frontend/src/assets
  const templatePath = path.join(__dirname, '../../../frontend/src/assets/ANNEX H-1 - CS Form No. 212 Revised 2025 - Personal Data Sheet (2).xlsx');

  if (!fs.existsSync(templatePath)) {
    throw new Error("Excel template not found at: " + templatePath);
  }

  const workbook = await XlsxPopulate.fromFileAsync(templatePath);

  const logs = {
    totalApplicantFields: Object.keys(applicantData).length,
    totalMappedFields: Object.keys(pdsMapping).length,
    totalPopulatedFields: 0,
    unmappedFields: [] as string[],
    missingRequiredValues: [] as string[],
    overflowHandling: {} as any
  };

  // 1. Flatten Educational Background
  if (applicantData.educationalDates) {
    const levels = ['elementary', 'secondary', 'vocational', 'college', 'graduate'];
    const prefixMap: any = { elementary: 'eduElem', secondary: 'eduSec', vocational: 'eduVoc', college: 'eduCol', graduate: 'eduGrad' };
    for (const level of levels) {
      if (applicantData.educationalDates[level]) {
        const ed = applicantData.educationalDates[level];
        const pfx = prefixMap[level];
        applicantData[`${pfx}School`] = ed.school;
        applicantData[`${pfx}Degree`] = ed.degree;
        applicantData[`${pfx}From`] = ed.from;
        applicantData[`${pfx}To`] = ed.to;
        applicantData[`${pfx}Units`] = ed.units;
        applicantData[`${pfx}Year`] = ed.year;
        applicantData[`${pfx}Honors`] = ed.honors;
      }
    }
  }

  // 2. Populate simple mapped fields
  for (const [key, fieldConfig] of Object.entries(pdsMapping)) {
    const sheet = workbook.sheet(fieldConfig.sheet);
    if (sheet) {
      if (applicantData[key] !== undefined && applicantData[key] !== null && applicantData[key] !== '') {
        sheet.cell(fieldConfig.cell).value(applicantData[key]);
        logs.totalPopulatedFields++;
      } else {
        logs.missingRequiredValues.push(key);
      }
    }
  }

  // Find unmapped fields
  for (const key of Object.keys(applicantData)) {
    if (!pdsMapping[key] && !key.endsWith('List') && key !== 'educationalDates' && key !== 'questionnaire') {
      logs.unmappedFields.push(key);
    }
  }

  // 3. Populate Arrays
  const populateArray = (list: any[], configKey: keyof typeof pdsRepeatingConfig) => {
    if (list && Array.isArray(list)) {
      const config = pdsRepeatingConfig[configKey];
      const sheet = workbook.sheet(config.sheet);
      if (sheet) {
        let currentRow = config.startRow;
        logs.overflowHandling[configKey] = {
           itemsProvided: list.length,
           itemsPopulated: 0,
           overflowed: false
        };
        for (const item of list) {
          if (currentRow >= config.startRow + config.maxRows) {
            logs.overflowHandling[configKey].overflowed = true;
            break;
          }
          let populatedAny = false;
          for (const [key, col] of Object.entries(config.columns)) {
            if (item[key] !== undefined && item[key] !== null) {
              sheet.cell(`${col}${currentRow}`).value(item[key]);
              populatedAny = true;
            }
          }
          if (populatedAny) {
             logs.overflowHandling[configKey].itemsPopulated++;
             logs.totalPopulatedFields++;
          }
          currentRow++;
        }
      }
    }
  };

  populateArray(applicantData.workExperienceList, 'workExperience');
  populateArray(applicantData.civilServiceList, 'eligibility');
  populateArray(applicantData.voluntaryWorkList, 'voluntaryWork');
  populateArray(applicantData.learningDevelopmentList, 'learningAndDevelopment');
  populateArray(applicantData.childrenList, 'children');
  populateArray(applicantData.skillsList, 'skills');
  populateArray(applicantData.distinctionsList, 'distinctions');
  populateArray(applicantData.membershipsList, 'memberships');
  populateArray(applicantData.referencesList, 'references');

  const outBuffer = await workbook.outputAsync();
  return { buffer: outBuffer, logs };
};
