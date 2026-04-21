import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Commande reçue',
  robots: { index: false, follow: false },
};

export default async function ConfirmationEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const orderRef = ref ?? '—';

  return (
    <div style={{ background: '#060e07', minHeight: '100vh' }}>
      {/* Fond marché créole */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/marche-creole.jpg"
          alt="Marché créole des Antilles"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(4,12,6,0.78)' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(200,162,77,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        className="relative"
        style={{
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 48px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div
            style={{
              background: 'rgba(6,14,7,0.28)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(200,162,77,0.18)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {/* Zone logo */}
            <div
              style={{
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
              }}
            >
              <Link href="/" aria-label="Accueil" style={{ display: 'block' }}>
                <Image
                  src="/images/bkm_logo_header.png"
                  alt="Bô Kay Mwen"
                  width={150}
                  height={150}
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))' }}
                />
              </Link>
            </div>

            <div
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)',
              }}
            />

            {/* Contenu */}
            <div style={{ padding: '2rem 1.75rem 2.25rem', textAlign: 'center' }}>
              {/* Icône succès */}
              <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <circle cx="32" cy="32" r="30" stroke="#C8A24D" strokeWidth="1.5" fill="rgba(200,162,77,0.06)" />
                  <path d="M20 32 L28 40 L44 24" stroke="#C8A24D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p
                className="font-serif uppercase tracking-[0.38em]"
                style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.55)', marginBottom: '0.75rem' }}
              >
                Commande reçue
              </p>

              <h1
                className="font-serif text-gold tracking-wide"
                style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}
              >
                Mèsi anpil !
              </h1>
              <p
                className="font-serif italic"
                style={{ fontSize: '0.82rem', color: 'rgba(232,224,208,0.5)', marginBottom: '1.5rem' }}
              >
                Votre demande a bien été enregistrée
              </p>

              <div
                style={{
                  height: '1px',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.2), transparent)',
                }}
              />

              {/* Référence */}
              <div
                style={{
                  background: 'rgba(200,162,77,0.05)',
                  border: '1px solid rgba(200,162,77,0.18)',
                  borderRadius: '8px',
                  padding: '14px 20px',
                  marginBottom: '1.5rem',
                }}
              >
                <p
                  className="font-serif uppercase tracking-[0.25em]"
                  style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.5)', marginBottom: '0.3rem' }}
                >
                  Référence
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: '1.05rem', color: '#C8A24D', letterSpacing: '0.1em' }}
                >
                  #{orderRef}
                </p>
              </div>

              {/* Prochaines étapes */}
              <div
                style={{
                  background: 'rgba(42,124,123,0.07)',
                  border: '1px solid rgba(42,124,123,0.22)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  marginBottom: '1.75rem',
                  textAlign: 'left',
                }}
              >
                <p
                  className="font-serif uppercase tracking-[0.25em]"
                  style={{ fontSize: '0.58rem', color: '#C8A24D', marginBottom: '0.6rem' }}
                >
                  Prochaine étape
                </p>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'rgba(232,224,208,0.75)',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  Un email de confirmation vient d'arriver. Nous vous recontactons sous
                  24-48h pour confirmer la disponibilité, organiser le paiement et
                  la livraison de votre punch.
                </p>
              </div>

              <Link href="/boutique" className="btn-luxury-filled" style={{ display: 'inline-block' }}>
                An nou allé
              </Link>

              <p
                style={{
                  fontSize: '0.62rem',
                  color: 'rgba(232,224,208,0.12)',
                  textAlign: 'center',
                  marginTop: '1.5rem',
                }}
              >
                L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
