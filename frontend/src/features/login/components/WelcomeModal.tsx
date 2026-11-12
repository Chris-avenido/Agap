interface WelcomeModalProps {
  open: boolean;
  reclassView: 'login' | 'register';
  reclassRegType: 'existing' | 'new';
  onSkip: () => void;
  onStartTour: (mode: 'login' | 'register') => void;
}

export default function WelcomeModal({ open, reclassView, reclassRegType, onSkip, onStartTour }: WelcomeModalProps) {
  return (
    <div className={`welcome-overlay ${open ? 'open' : ''}`}>
      {open && (
        <div className="welcome-box">
          <div className="welcome-badge">
            {reclassView === 'register' ? (reclassRegType === 'new' ? 'New Application' : 'Incumbent Registration') : 'AGAP Portal'}
          </div>
          <h2>
            {reclassView === 'register'
              ? (reclassRegType === 'new' ? 'New Reclassification Application' : 'Incumbent Registration')
              : 'Welcome to the AGAP Portal'}
          </h2>
          <p>
            {reclassView === 'register'
              ? (reclassRegType === 'new'
                ? 'Register your candidate profile, station, qualifications, and credentials to file a new reclassification application.'
                : 'Register your official Plantilla Item Number, DepEd email, contact info, and create your credentials to start your reclassification process.')
              : 'Seamlessly access your portal, submit documentary requirements, and track your evaluation progress from verification through to appointment.'}
          </p>
          <div className="welcome-highlights">
            {reclassView === 'register' ? (
              reclassRegType === 'new' ? (
                <>
                  <div className="welcome-hi">
                    <b>Plantilla Item</b>
                    <span>Verify available reclassification slot item number.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Profile &amp; Station</b>
                    <span>Candidate details, station, region, and division.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Qualifications</b>
                    <span>Education, eligibility, experience, and training hours.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="welcome-hi">
                    <b>Verify Plantilla</b>
                    <span>Connect to GMIS central records to auto-verify position.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Contact Info</b>
                    <span>Official DepEd email &amp; mobile for status alerts.</span>
                  </div>
                  <div className="welcome-hi">
                    <b>Credentials</b>
                    <span>Secure password &amp; 6-digit quick PIN passcode.</span>
                  </div>
                </>
              )
            ) : (
              <>
                <div className="welcome-hi">
                  <b>Authenticate</b>
                  <span>Sign in with your Plantilla Item Number, DepEd email, or 6-digit PIN.</span>
                </div>
                <div className="welcome-hi">
                  <b>Submit Documents</b>
                  <span>Upload documentary requirements, CSC forms, and update profile.</span>
                </div>
                <div className="welcome-hi">
                  <b>Track Status</b>
                  <span>Real-time progress from SDO HRMO evaluation to DBM endorsement.</span>
                </div>
              </>
            )}
          </div>
          <div className="welcome-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => onSkip()}
            >
              Skip
            </button>
            <button
              type="button"
              className="gold"
              onClick={() => onStartTour(reclassView)}
            >
              {reclassView === 'register' ? 'Show Register Tutorial' : 'Show Login Tutorial'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
