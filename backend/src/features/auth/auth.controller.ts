import { Request, Response } from 'express';
import {
  AuthService,
  HttpError,
  SsoAuthenticationError,
  SsoConfigurationError,
  checkRateLimit,
  clearFailedAttempts,
  getAttemptKey,
  recordFailedAttempt,
} from './auth.service';

// POST /login
export async function login(req: Request, res: Response) {
  const { email_address, password, loginMethod } = req.body;
  try {
    const applicant = await AuthService.login(
      email_address,
      password,
      loginMethod,
    );
    if (!applicant) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const fullName =
      [applicant.first_name, applicant.middle_name, applicant.surname]
        .filter(Boolean)
        .join(' ') ||
      applicant.first_name ||
      'Applicant';
    res.json({
      success: true,
      data: {
        id: applicant.id,
        applicant_number: applicant.applicant_number,
        first_name: applicant.first_name,
        middle_name: applicant.middle_name,
        surname: applicant.surname,
        full_name: fullName,
        email: applicant.email_address,
        registrant_type: applicant.registrant_type || 'jobseeker',
        plantilla_item_number: applicant.plantilla_item_number || null,
      },
    });
  } catch (error: any) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
}

// POST /reclass-register
export async function reclassRegister(req: Request, res: Response) {
  try {
    const {
      item_number,
      first_name,
      middle_name,
      last_name,
      mobile_number,
      email,
      password,
      passcode,
      new_application,
      region,
      division,
      school_id,
      school_name,
      current_position,
      desired_position,
      reclass_position,
      education,
      years_experience,
      hours_of_training,
      eligibility,
    } = req.body;

    const isNewApp = Boolean(new_application);

    if (
      !item_number ||
      !first_name ||
      !last_name ||
      !mobile_number ||
      !email ||
      !password ||
      !passcode
    ) {
      return res
        .status(400)
        .json({ message: 'All required fields (including Plantilla Item Number, First Name, and Last Name) must be provided.' });
    }

    const cleanMobile = String(mobile_number).trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({
        message:
          'Mobile number must be an 11-digit Philippine mobile number starting with 09.',
      });
    }

    const rawEmail = String(email).trim();
    const checkEmail = rawEmail.toLowerCase();
    if (
      !checkEmail.endsWith('@deped.gov.ph') ||
      !/^[a-zA-Z0-9._%+-]+@deped\.gov\.ph$/.test(checkEmail)
    ) {
      return res.status(400).json({
        message:
          'Only official @deped.gov.ph email addresses are allowed for Reclassification.',
      });
    }

    if (!password || !String(password).trim()) {
      return res.status(400).json({
        message: 'Password is required.',
      });
    }

    const cleanPasscode = String(passcode).trim();
    if (!/^\d{6}$/.test(cleanPasscode)) {
      return res
        .status(400)
        .json({ message: 'Passcode must be exactly 6 numeric digits.' });
    }

    const regResult = await AuthService.registerReclassAccount({
      item_number: item_number ? String(item_number).trim().toUpperCase() : undefined,
      first_name: isNewApp ? String(first_name).trim().toUpperCase() : String(first_name),
      middle_name: middle_name ? (isNewApp ? String(middle_name).trim().toUpperCase() : String(middle_name)) : undefined,
      last_name: isNewApp ? String(last_name).trim().toUpperCase() : String(last_name),
      mobile_number: cleanMobile,
      email: checkEmail,
      password: String(password),
      passcode: cleanPasscode,
      new_application: isNewApp,
      region: region ? (isNewApp ? String(region).trim().toUpperCase() : String(region)) : undefined,
      division: division ? (isNewApp ? String(division).trim().toUpperCase() : String(division)) : undefined,
      school_id: school_id ? String(school_id) : undefined,
      school_name: school_name ? (isNewApp ? String(school_name).trim().toUpperCase() : String(school_name)) : undefined,
      current_position: current_position ? (isNewApp ? String(current_position).trim().toUpperCase() : String(current_position)) : undefined,
      desired_position: (desired_position || reclass_position) ? String(desired_position || reclass_position) : undefined,
      reclass_position: reclass_position ? String(reclass_position) : undefined,
      education: education !== undefined && education !== null ? (isNewApp ? String(education).trim().toUpperCase() : String(education).trim()) : undefined,
      years_experience: years_experience !== undefined && years_experience !== null && String(years_experience).trim() !== '' ? Number(years_experience) : undefined,
      hours_of_training: hours_of_training !== undefined && hours_of_training !== null && String(hours_of_training).trim() !== '' ? Number(hours_of_training) : undefined,
      eligibility: eligibility !== undefined && eligibility !== null ? (isNewApp ? String(eligibility).trim().toUpperCase() : String(eligibility).trim()) : undefined,
    });

    return res.status(201).json({
      success: true,
      token: regResult.token,
      user: regResult.user,
      data: regResult.user,
    });
  } catch (error: any) {
    console.error('Error in reclass-register:', error);
    const statusCode =
      error.statusCode || (error.code === '23505' ? 409 : 400);
    return res.status(statusCode).json({
      message: error.message || 'Registration failed.',
    });
  }
}

// POST /reclass-login
export async function reclassLogin(req: Request, res: Response) {
  const { email, loginMethod, password, passcode, plantilla_item_number } =
    req.body;

  // Legacy fallback if only plantilla_item_number is sent without email
  if (!email && plantilla_item_number) {
    try {
      const result = await AuthService.reclassLogin(
        plantilla_item_number.trim(),
        req.body.full_name,
        req.body.target_position,
        req.body.region,
        req.body.division,
        req.body.current_position,
        req.body.is_existing !== false && req.body.is_existing !== 'false',
      );
      return res.json({
        success: true,
        data: {
          id: result.session.id,
          applicant_number: result.session.applicant_number,
          first_name: result.session.first_name,
          middle_name: result.session.middle_name,
          surname: result.session.surname,
          full_name:
            result.reclass?.full_name ||
            [
              result.session.first_name,
              result.session.middle_name,
              result.session.surname,
            ]
              .filter(Boolean)
              .join(' ') ||
            'Applicant',
          email: result.session.email_address,
          registrant_type: 'reclass',
          plantilla_item_number:
            result.session.plantilla_item_number ||
            result.reclass?.plantilla_item_number ||
            plantilla_item_number.trim().toUpperCase(),
          current_position:
            result.reclass?.current_position || 'Guidance Counselor',
          target_position: result.reclass?.target_position || null,
          region: result.reclass?.region || null,
          division: result.reclass?.division || null,
          school_name: result.reclass?.school_name || null,
          application_number: result.reclass?.school_name || null,
          incumbent: result.reclass,
          reclass_application: result.reclass?.reclass_application || null,
        },
      });
    } catch (legacyErr: any) {
      return res
        .status(401)
        .json({ message: legacyErr.message || 'Invalid credentials' });
    }
  }

  if (!email || !String(email).trim()) {
    return res.status(400).json({ message: 'Email address is required.' });
  }

  const method = loginMethod === 'passcode' ? 'passcode' : 'password';
  const credential = method === 'passcode' ? passcode : password;

  if (!credential || !String(credential).trim()) {
    return res.status(400).json({
      message:
        method === 'passcode'
          ? '6-digit passcode is required.'
          : 'Password is required.',
    });
  }

  const attemptKey = getAttemptKey(email, req);
  const rateLimitStatus = checkRateLimit(attemptKey);
  if (rateLimitStatus.locked) {
    return res.status(429).json({
      message: `Account is temporarily locked due to repeated failed attempts. Please try again in ${rateLimitStatus.remainingMinutes || 15} minutes.`,
    });
  }

  try {
    const authResult = await AuthService.authenticateReclassAccount(
      String(email).trim(),
      String(credential).trim(),
      method,
    );

    if (!authResult) {
      recordFailedAttempt(attemptKey);
      const updatedStatus = checkRateLimit(attemptKey);
      if (updatedStatus.locked) {
        return res.status(429).json({
          message:
            'Too many failed login attempts. Your account is temporarily locked for 15 minutes.',
        });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    clearFailedAttempts(attemptKey);

    return res.json({
      success: true,
      token: authResult.token,
      user: authResult.user,
      data: authResult.user,
    });
  } catch (error: any) {
    console.error('Error in reclass-login:', error);
    recordFailedAttempt(attemptKey);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}

// POST /forgot-password
export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    // Always return success even if email is not found to prevent enumeration
    await AuthService.forgotPassword(email);
    res.json({
      success: true,
      message:
        'If that email is registered, a password reset link has been sent.',
    });
  } catch (error: any) {
    console.error('Error in forgot-password:', error);
    res
      .status(500)
      .json({ message: 'Error processing password reset request' });
  }
}

// POST /reset-password
export async function resetPassword(req: Request, res: Response) {
  const { token, new_password } = req.body;
  if (!token || !new_password) {
    return res
      .status(400)
      .json({ message: 'Token and new password are required' });
  }
  try {
    await AuthService.resetPassword(token, new_password);
    res.json({
      success: true,
      message: 'Password has been successfully reset',
    });
  } catch (error: any) {
    console.error('Error in reset-password:', error);
    res
      .status(400)
      .json({ message: error.message || 'Error resetting password' });
  }
}

// POST /sso-login
export async function ssoLogin(req: Request, res: Response) {
  const ssoToken =
    typeof req.body?.sso_token === 'string' ? req.body.sso_token.trim() : '';
  if (!ssoToken) {
    return res.status(400).json({ message: 'SSO token is missing' });
  }

  try {
    const data = await AuthService.exchangeSsoToken(ssoToken);
    res.json({ success: true, data });
  } catch (error: any) {
    if (error instanceof SsoConfigurationError) {
      console.error('AGAP SSO configuration error:', error.message);
      return res.status(500).json({ message: 'AGAP SSO is not configured' });
    }
    if (error instanceof SsoAuthenticationError) {
      return res.status(401).json({ message: error.message });
    }
    console.error('AGAP SSO exchange error:', error);
    return res.status(500).json({ message: 'Unable to complete HQ sign-in' });
  }
}

// POST /api/register-hr
export async function registerHr(req: Request, res: Response) {
  const data = req.body;
  try {
    const result = await AuthService.registerHr(data);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error('Error registering HR admin:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
