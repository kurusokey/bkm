'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: connecter à un service d'emailing (Mailchimp, Brevo, etc.)
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
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
        <p className="text-teal-light text-sm">Mèsi ! Inscription enregistrée.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ton email"
            className="flex-1 px-4 py-2.5 rounded-full text-sm bg-ink border border-gold-muted/20 text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold text-ink hover:bg-gold-light transition-colors"
          >
            OK
          </button>
        </form>
      )}
    </div>
  );
}
