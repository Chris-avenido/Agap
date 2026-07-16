/* oxlint-disable react/only-export-components -- auth hook and provider intentionally share one context */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ApplicantUser = {
  id: number;
  applicant_number: string;
  email: string;
  role: 'Applicant';
};

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  status: AuthStatus;
  user: ApplicantUser | null;
  completeAuthentication: (accessToken: string, user: ApplicantUser) => void;
  clearAuthentication: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const SESSION_DURATION_MS = 3 * 60 * 60 * 1000;

function readStoredSession(): { status: AuthStatus; user: ApplicantUser | null } {
  if (localStorage.getItem('agap_token')) return { status: 'checking', user: null };
  try {
    const session = JSON.parse(localStorage.getItem('session_data') ?? 'null');
    if (session?.expiry > Date.now()) {
      return { status: 'authenticated', user: session as ApplicantUser };
    }
  } catch {
    // Invalid local state is cleared by the provider.
  }
  return { status: 'unauthenticated', user: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readStoredSession, []);
  const [status, setStatus] = useState<AuthStatus>(initial.status);
  const [user, setUser] = useState<ApplicantUser | null>(initial.user);

  const clearAuthentication = useCallback(() => {
    localStorage.removeItem('agap_token');
    localStorage.removeItem('agap_user');
    localStorage.removeItem('session_data');
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const completeAuthentication = useCallback((accessToken: string, nextUser: ApplicantUser) => {
    const session = {
      id: nextUser.id,
      applicant_number: nextUser.applicant_number,
      email: nextUser.email,
      expiry: Date.now() + SESSION_DURATION_MS,
    };
    localStorage.setItem('agap_token', accessToken);
    localStorage.setItem('agap_user', JSON.stringify(nextUser));
    localStorage.setItem('session_data', JSON.stringify(session));
    setUser(nextUser);
    setStatus('authenticated');
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('agap_token');
    if (!accessToken) {
      if (status === 'unauthenticated') localStorage.removeItem('session_data');
      return;
    }

    let active = true;
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Invalid session');
        const body = await response.json();
        if (active) completeAuthentication(accessToken, body.data as ApplicantUser);
      })
      .catch(() => {
        if (active) clearAuthentication();
      });
    return () => {
      active = false;
    };
  }, [clearAuthentication, completeAuthentication, status]);

  const value = useMemo(
    () => ({ status, user, completeAuthentication, clearAuthentication }),
    [status, user, completeAuthentication, clearAuthentication],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
