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
      <p className="font-serif text-gold text-sm tracking-wider mb-2">
        Resté branché
      </p>
      <p className="text-cream-muted/60 text-xs leading-relaxed mb-5">
        Nouveautés, recettes et offres exclusives directement dans ta boîte mail.
      </p>

      {status === 'success' ? (
        <p className="text-teal-light text-sm">Mèsi ! Ton inscription a bien été enregistrée.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ton email"
            disabled={status === 'loading'}
            className="flex-1 px-4 py-2.5 rounded-full text-sm bg-ink border border-gold-muted/20 text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-ink hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '…' : 'OK'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-crimson-light text-xs mt-3">{errorMsg}</p>
      )}

      <p className="text-cream-muted/30 text-[10px] mt-4 leading-relaxed">
        En t&apos;inscrivant, tu acceptes de recevoir nos communications. Désinscription possible à tout moment.
      </p>
    </div>
  );
}
