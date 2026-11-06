import { devLogger, initDevDiagnostics } from './dev-logger';

initDevDiagnostics();

devLogger.setContextProvider(() => {
  try {
    const raw = localStorage.getItem('session_data');
    if (!raw) return { user: null };
    const session = JSON.parse(raw);
    if (!session || !session.id) return { user: null };
    return {
      user: {
        id: String(session.id),
        role: String(session.role ?? 'applicant'),
      },
    };
  } catch {
    return { user: null };
  }
});
