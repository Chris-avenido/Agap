import libre from 'libreoffice-convert';
import * as path from 'path';
import * as fs from 'fs';

export const PDS_TEMPLATE_PATH = path.join(
  // features/pds -> backend/src (or dist) -> backend -> repo root
  __dirname,
  '../../../../frontend/src/assets/ANNEX H-1 - CS Form No. 212 Revised 2025 - Personal Data Sheet (2).xlsx',
);

export const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const PdsService = {
  convertToPdf(fileBuf: any, ext: string): Promise<any> {
    return new Promise((resolve, reject) => {
      libre.convert(fileBuf, ext, undefined, (err, done) => {
        if (err) reject(err);
        else resolve(done);
      });
    });
  },

  templateExists(): boolean {
    return fs.existsSync(PDS_TEMPLATE_PATH);
  },

  buildDownloadFileName(applicant: any): string {
    const cleanFirstName = (applicant.first_name || 'Applicant').replace(
      /[^a-zA-Z0-9]/g,
      '',
    );
    const cleanLastName = (
      applicant.surname ||
      applicant.last_name ||
      'Name'
    ).replace(/[^a-zA-Z0-9]/g, '');
    return `PDS_${cleanFirstName}_${cleanLastName}.xlsx`;
  },

  generatePds(applicantData: any) {
    const { generatePDSBackend } = require('../../utils/pdsGeneratorBackend');
    return generatePDSBackend(applicantData);
  },

  generateExperience(applicantData: any) {
    const {
      generateExperienceBackend,
    } = require('../../utils/pdsGeneratorBackend');
    return generateExperienceBackend(applicantData);
  },
};
