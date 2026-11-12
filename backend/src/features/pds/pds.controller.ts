import { NextFunction, Request, Response } from 'express';
import { ApplicantsService } from '../../applicants/applicants.service';
import { PdsService, PDS_TEMPLATE_PATH, XLSX_MIME } from './pds.service';

// POST /convert-pds-to-pdf
export async function convertPdsToPdf(req: Request, res: Response) {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const pdfBuf = await PdsService.convertToPdf(file.buffer, '.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=PDS.pdf');
    res.send(pdfBuf);
  } catch (error: any) {
    console.error('Error converting PDS to PDF:', error);
    // Fallback: If libreoffice is not installed, return the XLSX file so it doesn't just crash in dev.
    // In production, libreoffice would be installed.
    const file = (req as any).file;
    res.setHeader('Content-Type', XLSX_MIME);
    res.send(file.buffer);
  }
}

// POST /convert-pds-v2
export async function convertPdsV2(req: Request, res: Response) {
  try {
    const applicantData = req.body;
    if (!applicantData) {
      return res.status(400).json({ message: 'No applicant data provided' });
    }

    // Generate XLSX buffer using xlsx-populate
    const { buffer, logs } = await PdsService.generatePds(applicantData);

    // Log validation metrics to console instead of writing to disk (fixes EROFS on Vercel)
    console.log('PDS Validation Report:', JSON.stringify(logs, null, 2));

    // Always return XLSX so user can edit missing data after download
    res.setHeader('Content-Type', XLSX_MIME);
    res.setHeader('Content-Disposition', 'attachment; filename=PDS.xlsx');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating PDS v2:', error);
    res.status(500).json({ message: error.message || 'Error generating PDS' });
  }
}

// POST /convert-experience
export async function convertExperience(req: Request, res: Response) {
  try {
    const applicantData = req.body;
    if (!applicantData) {
      return res.status(400).json({ message: 'No applicant data provided' });
    }

    const { buffer } = await PdsService.generateExperience(applicantData);

    res.setHeader('Content-Type', XLSX_MIME);
    res.setHeader('Content-Disposition', 'attachment; filename=experience.xlsx');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating Experience Sheet:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error generating Experience Sheet' });
  }
}

// GET /:id/print-pds
export async function printPds(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) return next();
  try {
    const applicant = await ApplicantsService.findOne(id);
    if (!applicant) {
      return res.status(404).send('Applicant not found');
    }

    if (!PdsService.templateExists()) {
      return res
        .status(500)
        .send('Excel template not found at: ' + PDS_TEMPLATE_PATH);
    }

    res.download(PDS_TEMPLATE_PATH, PdsService.buildDownloadFileName(applicant));
  } catch (error: any) {
    console.error('Error generating PDS:', error);
    res
      .status(500)
      .send(
        `Error generating Personal Data Sheet: ${error.message} - ${error.stack}`,
      );
  }
}
