import { useEffect, useState } from 'react';

const saveAuthenticatedUser = (data: { uid: string; email: string; role: string }) => {
  localStorage.setItem('agap_user', JSON.stringify(data));
  // Keep current dashboard components compatible while they migrate to agap_user.
  localStorage.setItem('session_data', JSON.stringify({ id: data.uid, uid: data.uid, email: data.email, role: data.role, expiry: Date.now() + 3 * 60 * 60 * 1000 }));
};

export default function HqSsoCallback() {
  const [message, setMessage] = useState('Completing secure sign-in…');

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
    if (!token) return setMessage('The sign-in response did not contain a token.');

    localStorage.setItem('agap_token', token);
    window.history.replaceState(null, '', window.location.pathname);
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        if (!response.ok) throw new Error('Token validation failed');
        return response.json();
      })
      .then(({ data, landingRoute }) => {
        saveAuthenticatedUser({ uid: data.uid, email: data.email, role: data.role });
        window.location.replace(landingRoute);
      })
      .catch(() => {
        localStorage.removeItem('agap_token');
        localStorage.removeItem('agap_user');
        localStorage.removeItem('session_data');
        setMessage('Your sign-in token is invalid or expired. Please return to InsightED HQ and try again.');
      });
  }, []);

  return <main className="min-h-screen grid place-items-center p-6"><p>{message}</p></main>;
}
