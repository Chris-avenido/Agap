export const RECLASS_LOGIN_TOUR_STEPS = [
  {
    sel: '#tour-login-identifier',
    label: 'Step 1 of 4: Account Identifier',
    title: 'Plantilla Item No. or DepEd Email',
    body: 'Enter your 28-character Plantilla Item Number or your official DepEd email address to identify your account.',
  },
  {
    sel: '#tour-login-credentials',
    label: 'Step 2 of 4: Authentication Mode',
    title: 'Password or 6-Digit Passcode',
    body: 'Choose between standard Password sign-in or use your 6-digit numeric PIN passcode for quick, secure authentication.',
  },
  {
    sel: '#tour-login-submit',
    label: 'Step 3 of 4: Access Account',
    title: 'Sign In to Dashboard',
    body: 'Click "Sign in" to access your applicant dashboard, upload requirements, and monitor real-time evaluation status.',
  },
  {
    sel: '#tour-login-register',
    label: 'Step 4 of 4: First-Time User',
    title: 'Register New Account',
    body: 'First time applicant? Click "Register" to verify your Plantilla Item Number in GMIS and create your profile.',
  },
];

export const RECLASS_REG_TOUR_STEPS = [
  {
    sel: '#tour-reg-plantilla',
    label: 'Step 1 of 5: Plantilla Verification',
    title: 'DepEd Plantilla Item Number',
    body: 'Enter your 28-character GMIS Plantilla Item Number and click "Verify" to validate against official DepEd central records.',
  },
  {
    sel: '#tour-reg-name',
    label: 'Step 2 of 5: Personal Details',
    title: 'Incumbent Full Name',
    body: 'Enter your legal First Name and Last Name as registered in official DepEd personnel records.',
  },
  {
    sel: '#tour-reg-contact',
    label: 'Step 3 of 5: DepEd Contact Info',
    title: 'Official DepEd Email & Mobile',
    body: 'Provide your official DepEd email (deped.gov.ph) for status updates and an 11-digit mobile number for SMS notifications.',
  },
  {
    sel: '#tour-reg-security',
    label: 'Step 4 of 5: Security Credentials',
    title: 'Password & 6-Digit Passcode',
    body: 'Create a secure password and a 6-digit numeric passcode for rapid and convenient sign-in.',
  },
  {
    sel: '#tour-reg-submit',
    label: 'Step 5 of 5: Account Submission',
    title: 'Submit Reclassification Account',
    body: 'Click "Register Account" to complete your registration and proceed directly to uploading your reclassification documents.',
  },
];

export const RECLASS_NEW_APP_TOUR_STEPS = [
  {
    sel: '#tour-newapp-plantilla',
    label: 'Step 1 of 6: Plantilla Verification',
    title: 'Plantilla Item Number',
    body: 'Enter your 28-character Plantilla Item Number and click "Verify" to validate available reclassification slots.',
  },
  {
    sel: '#tour-newapp-name',
    label: 'Step 2 of 6: Personal Details',
    title: 'Applicant Full Name',
    body: 'Enter your legal First Name, Middle Name, and Last Name as registered in official records.',
  },
  {
    sel: '#tour-newapp-contact',
    label: 'Step 3 of 6: Contact Information',
    title: 'Official DepEd Email & Mobile',
    body: 'Provide your official DepEd email (deped.gov.ph) for status updates and an 11-digit mobile number for SMS notifications.',
  },
  {
    sel: '#tour-newapp-station',
    label: 'Step 4 of 6: Current Position & Station',
    title: 'Designation, Region & Division',
    body: 'Specify your current position title, Region, Division, and School/Station name.',
  },
  {
    sel: '#tour-newapp-qualifications',
    label: 'Step 5 of 6: Qualifications & Experience',
    title: 'Degree, Eligibility, Experience & Training',
    body: 'Provide your educational degree, professional eligibility / license, years of experience, and hours of relevant training.',
  },
  {
    sel: '#tour-newapp-security',
    label: 'Step 6 of 6: Security & Submission',
    title: 'Password, Passcode & Submit',
    body: 'Set a secure password and 6-digit quick PIN passcode, then click "Register New Application" to complete registration.',
  },
];
