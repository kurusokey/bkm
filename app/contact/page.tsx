import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Bô Kay Mwen : questions, commandes, partenariats. Nous serons ravis d\'échanger avec vous.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/contact' },
  openGraph: { url: 'https://blackbeard-umber.vercel.app/contact' },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen" style={{ background: '#060e07' }}>

      {/* ══════════════════════════
          FOND — coucher de soleil
      ══════════════════════════ */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/coucher-soleil-caraibes.jpg"
          alt="Coucher de soleil sur la mer des Caraïbes"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Voile sombre pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,8,16,0.55) 0%, rgba(6,10,20,0.45) 40%, rgba(4,8,16,0.65) 100%)',
          }}
        />
      </div>

      {/* ══════════════════════════
          CONTENU SCROLLABLE
      ══════════════════════════ */}
      <div className="relative" style={{ zIndex: 1, minHeight: '100vh' }}>

        {/* Espacement header */}
        <div style={{ paddingTop: '120px' }} />

        <div className="flex justify-center w-full px-6 pb-20">
          <div style={{ width: '100%', maxWidth: '480px' }}>

            {/* ── En-tête ── */}
            <ScrollReveal delay={100} direction="up" distance={30} duration={900}>
              <div className="text-center mb-10">
                <p
                  className="font-serif uppercase tracking-[0.42em] mb-4"
                  style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.5)' }}
                >
                  Parlons-nous
                </p>
                <h1
                  className="font-serif text-gold leading-tight mb-5"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}
                >
                  Nous contacter
                </h1>
                <div
                  className="mx-auto"
                  style={{
                    width: '50px', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.45), transparent)',
                  }}
                />
                <p
                  className="mt-5 leading-relaxed"
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(232,224,208,0.6)',
                    textAlign: 'center',
                  }}
                >
                  Une question, une commande ou simplement envie d&apos;échanger ?<br />
                  Nous serons ravis de vous répondre.
                </p>
              </div>
            </ScrollReveal>

            {/* ── Formulaire — encart glassmorphism ── */}
            <ScrollReveal delay={200} direction="up" distance={30} duration={900}>
              <div
                style={{
                  background: 'rgba(6,14,7,0.30)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  border: '1px solid rgba(200,162,77,0.16)',
                  borderRadius: '20px',
                  padding: '2rem 2rem 2.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* ── Coordonnées — 3 blocs ── */}
            <ScrollReveal delay={300} direction="up" distance={20} duration={900}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'Email',
                    value: '[À compléter]',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: 'Téléphone',
                    value: '[À compléter]',
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: 'Adresse',
                    value: '[À compléter]',
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="text-center py-4 px-2 rounded-xl"
                    style={{
                      background: 'rgba(6,14,7,0.28)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(200,162,77,0.10)',
                    }}
                  >
                    <div style={{ color: 'rgba(200,162,77,0.45)' }}>{icon}</div>
                    <p
                      className="font-serif uppercase tracking-[0.12em] mb-1"
                      style={{ fontSize: '0.52rem', color: 'rgba(200,162,77,0.45)' }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(232,224,208,0.45)' }}>{value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* ── Citation finale ── */}
            <ScrollReveal delay={400} direction="up" distance={20} duration={900}>
              <div className="text-center mt-12">
                <div
                  className="mx-auto mb-6"
                  style={{
                    width: '32px', height: '1px',
                    background: 'rgba(200,162,77,0.25)',
                  }}
                />
                <p
                  className="font-serif italic leading-[2.2]"
                  style={{ fontSize: '0.82rem', color: 'rgba(200,162,77,0.38)' }}
                >
                  Bô Kay Mwen, c&apos;est avant tout<br />
                  une histoire de partage.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* Mention légale */}
        <div
          className="text-center py-4 px-6"
          style={{ borderTop: '1px solid rgba(200,162,77,0.06)' }}
        >
          <p style={{ fontSize: '0.68rem', color: 'rgba(232,224,208,0.14)' }}>
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>

      </div>
    </div>
  );
}
