'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Error boundary]', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}
    >
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="#8B2F3A" strokeWidth="1.5" fill="rgba(139,47,58,0.06)" />
          <path d="M32 20 L32 34" stroke="#8B2F3A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="42" r="2" fill="#8B2F3A" />
        </svg>
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-crimson/60 font-serif mb-3">
        Une erreur est survenue
      </p>
      <h1 className="font-serif text-2xl text-gold tracking-wide mb-3">
        Oups, quelque chose a mal tourné
      </h1>
      <p className="text-cream-muted/60 text-sm leading-relaxed mb-10" style={{ maxWidth: '340px' }}>
        Une erreur inattendue s&apos;est produite. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button onClick={reset} className="btn-luxury-filled">
          Réessayer
        </button>
        <Link href="/" className="text-sm text-cream-muted/60 hover:text-gold transition-colors">
          Retour à l&apos;accueil
        </Link>
      </div>

      <p className="text-cream/15 text-xs mt-10">
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
