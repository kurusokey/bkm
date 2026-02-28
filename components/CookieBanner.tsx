'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const saveConsent = (consent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }));
    setVisible(false);
  };

  const acceptAll = () => saveConsent({ analytics: true, marketing: true });
  const refuseAll = () => saveConsent({ analytics: false, marketing: false });
  const saveCustom = () => saveConsent(prefs);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(22, 26, 31, 0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(200, 162, 77, 0.15)',
        padding: '1.25rem 1.5rem',
      }}
    >
      {!showCustomize ? (
        /* Vue principale */
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ flex: 1, minWidth: '220px', color: '#9B9285', fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>
            Nous utilisons des cookies pour améliorer votre expérience.{' '}
            <Link href="/confidentialite" style={{ color: '#C8A24D', textDecoration: 'underline' }}>
              En savoir plus
            </Link>
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowCustomize(true)} style={btnSecondary}>
              Personnaliser
            </button>
            <button onClick={refuseAll} style={btnSecondary}>
              Tout refuser
            </button>
            <button onClick={acceptAll} style={btnPrimary}>
              Tout accepter
            </button>
          </div>
        </div>
      ) : (
        /* Vue personnalisation */
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: '#C8A24D', fontFamily: 'serif', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Personnaliser mes préférences
          </p>

          {/* Cookies essentiels */}
          <div style={rowStyle}>
            <div>
              <p style={labelStyle}>Cookies essentiels</p>
              <p style={descStyle}>Nécessaires au fonctionnement du site (panier, session). Toujours actifs.</p>
            </div>
            <span style={{ color: '#2A7C7B', fontSize: '0.7rem', fontWeight: 600 }}>Actifs</span>
          </div>

          {/* Cookies analytiques */}
          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <p style={labelStyle}>Cookies analytiques</p>
              <p style={descStyle}>Mesure d'audience anonyme pour améliorer le site.</p>
            </div>
            <Toggle checked={prefs.analytics} onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))} />
          </div>

          {/* Cookies marketing */}
          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <p style={labelStyle}>Cookies marketing</p>
              <p style={descStyle}>Publicités personnalisées selon vos centres d'intérêt.</p>
            </div>
            <Toggle checked={prefs.marketing} onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button onClick={() => setShowCustomize(false)} style={btnSecondary}>
              Retour
            </button>
            <button onClick={saveCustom} style={btnPrimary}>
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        border: 'none',
        cursor: 'pointer',
        background: checked ? '#C8A24D' : 'rgba(155,146,133,0.3)',
        position: 'relative',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '21px' : '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  background: '#C8A24D',
  color: '#0B0E11',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const btnSecondary: React.CSSProperties = {
  padding: '0.5rem 1.25rem',
  background: 'transparent',
  color: '#9B9285',
  border: '1px solid rgba(155,146,133,0.3)',
  borderRadius: '4px',
  fontSize: '0.72rem',
  fontWeight: 500,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.75rem 0',
  borderBottom: '1px solid rgba(155,146,133,0.1)',
};

const labelStyle: React.CSSProperties = {
  color: '#E8E0D0',
  fontSize: '0.78rem',
  fontWeight: 500,
  margin: '0 0 0.2rem',
};

const descStyle: React.CSSProperties = {
  color: '#9B9285',
  fontSize: '0.68rem',
  lineHeight: 1.5,
  margin: 0,
};
