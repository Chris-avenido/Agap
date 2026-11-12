import { NextFunction, Request, Response } from 'express';
import { ApplicantsService } from '../../applicants/applicants.service';

export async function parseResume(req: Request, res: Response) {
  const file = (req as any).file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const data = await ApplicantsService.parseResume(file);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Parse endpoint error:', error);
    res.status(500).json({ message: error.message || 'Error parsing resume' });
  }
}

export async function getApplicant(req: Request, res: Response, next: NextFunction) {
  if (
    [
      'parse-resume',
      'login',
      'apply-job',
      'proxy-blob',
      'get-sas-url',
    ].includes(req.params.id as string)
  ) {
    return next(); // Let other routes handle it
  }
  const id = Number(req.params.id);
  if (isNaN(id)) return next();

  try {
    const applicant = await ApplicantsService.findOne(id);
    if (!applicant)
      return res.status(404).json({ message: 'Applicant not found' });
    res.json({ success: true, data: applicant });
  } catch (error: any) {
    console.error('Error fetching applicant:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error fetching applicant profile' });
  }
}

export async function createApplicant(req: Request, res: Response) {
  try {
    const applicant = await ApplicantsService.create(req.body);
    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: applicant,
    });
  } catch (error: any) {
    console.error('Error saving applicant:', error);
    const statusCode =
      error.statusCode ||
      (error.message?.includes('already registered') ||
      error.message?.includes('already exists')
        ? 409
        : 500);
    res
      .status(statusCode)
      .json({ message: error.message || 'Error submitting application' });
  }
}

export async function setPasscode(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const { passcode } = req.body;
    await ApplicantsService.setPasscode(id, passcode);
    res.json({ success: true, message: 'Passcode updated successfully' });
  } catch (error: any) {
    console.error('Error setting passcode:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error setting passcode' });
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const { currentPassword, newPassword } = req.body;
    await ApplicantsService.changePassword(id, currentPassword, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error changing password:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error changing password' });
  }
}

export async function updateApplicant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id)) return next();
  try {
    const applicant = await ApplicantsService.update(id, req.body);
    res.json({
      success: true,
      message: 'Applicant profile updated successfully',
      data: applicant,
    });
  } catch (error: any) {
    console.error('Error updating applicant:', error);
    res
      .status(500)
      .json({ message: error.message || 'Error updating profile' });
  }
}


