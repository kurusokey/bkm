import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accès refusé',
  robots: { index: false, follow: false },
};

export default function AccesRefusePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B0E11',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        style={{
          fontSize: '3rem',
          marginBottom: '1.5rem',
        }}
      >
        🔞
      </p>
      <h1
        style={{
          fontFamily: 'serif',
          color: '#C8A24D',
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 400,
          letterSpacing: '0.05em',
          marginBottom: '1rem',
        }}
      >
        Accès réservé aux majeurs
      </h1>
      <p
        style={{
          color: '#9B9285',
          fontSize: '0.9rem',
          lineHeight: 1.8,
          maxWidth: '420px',
        }}
      >
        Ce site propose la vente de boissons alcoolisées.
        <br />
        Son accès est strictement réservé aux personnes ayant l&apos;âge légal
        de consommer de l&apos;alcool dans leur pays de résidence.
      </p>
      <p
        style={{
          marginTop: '2.5rem',
          color: '#9B9285',
          fontSize: '0.75rem',
          opacity: 0.5,
        }}
      >
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
