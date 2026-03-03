'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? 'Une erreur est survenue.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Impossible de contacter le serveur.');
      setStatus('error');
    }
  };

  return (
    <div className="text-center">

      <p className="text-cream-muted/60 text-xs leading-relaxed" style={{ marginBottom: '1.5rem' }}>
        Nouveautés et offres exclusives directement dans ta boîte mail.
      </p>

      {status === 'success' ? (
        <p className="text-teal-light text-sm">Mèsi ! Ton inscription a bien été enregistrée.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '320px', margin: '0 auto' }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ton email"
            disabled={status === 'loading'}
            className="flex-1 text-sm focus:outline-none transition-colors disabled:opacity-50"
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(6,14,7,0.55)',
              border: '1px solid rgba(200,162,77,0.65)',
              color: 'rgba(232,224,208,0.9)',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              background: '#C8A24D',
              color: '#060e07',
              flexShrink: 0,
            }}
          >
            {status === 'loading' ? '…' : 'OK'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-crimson-light text-xs mt-3">{errorMsg}</p>
      )}

      <p className="text-cream-muted/30 text-[10px] leading-relaxed" style={{ marginTop: '1.5rem' }}>
        En t&apos;inscrivant, tu acceptes de recevoir nos communications. Désinscription possible à tout moment.
      </p>
    </div>
  );
}
