'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DesinscriptionPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
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
    <div style={{ background: '#060e07' }}>
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: '100vh' }}
      >
        <Image
          src="/images/hero-rum.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(4,12,6,0.65)' }} />

        <div
          className="relative z-[5] w-full flex items-start md:items-center justify-center px-6 pt-[80px] md:pt-[120px] pb-12"
          style={{ minHeight: '100vh' }}
        >
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <div
              style={{
                background: 'rgba(6,14,7,0.28)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(200,162,77,0.75)',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              {/* Zone logo */}
              <div
                style={{
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
                }}
              >
                <Link href="/" aria-label="Accueil" style={{ display: 'block' }}>
                  <Image
                    src="/images/bkm_logo_header.png"
                    alt="Bô Kay Mwen"
                    width={140}
                    height={140}
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))' }}
                  />
                </Link>
              </div>

              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)' }} />

              <div style={{ padding: '1.75rem 1.75rem 2rem' }}>
                <p className="font-serif uppercase tracking-[0.38em] mb-2" style={{ fontSize: '0.58rem', color: '#C8A24D' }}>
                  Désinscription
                </p>
                <div style={{ height: '1px', marginBottom: '1.5rem', background: 'linear-gradient(90deg, rgba(200,162,77,0.15), transparent)' }} />

                {status === 'success' ? (
                  <div className="text-center py-6">
                    <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="18" stroke="#2A7C7B" strokeWidth="1.5" fill="rgba(42,124,123,0.06)" />
                      <path d="M12 20 L17 25 L28 14" stroke="#2A7C7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-serif text-teal-light text-base mb-2">Désinscription effectuée</p>
                    <p className="text-cream-muted/60 text-sm mb-6">Tu ne recevras plus nos communications.</p>
                    <Link href="/" className="text-xs text-gold/60 hover:text-gold transition-colors">
                      Retour à l&apos;accueil
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-cream-muted/60 text-sm mb-6 leading-relaxed">
                      Saisis ton adresse email pour te désinscrire de la newsletter Bô Kay Mwen.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ton email"
                        disabled={status === 'loading'}
                        className="w-full text-sm focus:outline-none transition-colors disabled:opacity-50"
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          background: 'rgba(6,14,7,0.55)',
                          border: '1px solid rgba(200,162,77,0.65)',
                          color: 'rgba(232,224,208,0.9)',
                        }}
                      />
                      {status === 'error' && (
                        <p className="text-crimson-light text-sm">{errorMsg}</p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-luxury-filled w-full disabled:opacity-50"
                      >
                        {status === 'loading' ? 'Traitement…' : 'Se désinscrire'}
                      </button>
                    </form>
                    <p className="text-center mt-4">
                      <Link href="/newsletter" className="text-xs text-gold/40 hover:text-gold/70 transition-colors">
                        ← Retour à la newsletter
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
