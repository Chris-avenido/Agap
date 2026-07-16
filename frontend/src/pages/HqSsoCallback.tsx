import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type ApplicantUser } from '../auth/AuthContext';

const HQ_URL = import.meta.env.VITE_HQ_URL || 'https://insighted-hq.vercel.app/';

export default function HqSsoCallback() {
  const navigate = useNavigate();
  const { completeAuthentication, clearAuthentication } = useAuth();
  const started = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    if (!token) {
      setError('The secure sign-in response did not contain a token. Please return to InsightED HQ and try again.');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/hq/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const body = await response.json().catch(() => null);
        if (!response.ok || !body?.success) {
          throw new Error(body?.message || 'The HQ sign-in token is invalid or expired.');
        }
        return body.data as {
          accessToken: string;
          user: ApplicantUser;
          landingRoute: '/applicant-dashboard';
        };
      })
      .then(({ accessToken, user }) => {
        completeAuthentication(accessToken, user);
        navigate('/applicant-dashboard', { replace: true });
      })
      .catch((reason: unknown) => {
        clearAuthentication();
        setError(
          reason instanceof Error
            ? reason.message
            : 'Secure sign-in could not be completed. Please return to InsightED HQ and try again.',
        );
      });
  }, [clearAuthentication, completeAuthentication, navigate]);

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <section className="max-w-lg text-center">
        {!error ? (
          <p>Completing secure sign-in…</p>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-red-700">Secure sign-in failed</h1>
            <p className="mt-3 text-gray-700">{error}</p>
            <a className="mt-5 inline-block font-semibold text-blue-700 underline" href={HQ_URL}>
              Return to InsightED HQ
            </a>
          </>
        )}
      </section>
    </main>
  );
}
