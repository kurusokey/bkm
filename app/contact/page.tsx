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
    <div style={{ background: '#060e07' }}>

      {/* ══════════════════════════════════════════════════════════
          CONTACT — Inspiré de la page coffrets
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Fond : coucher de soleil */}
        <Image
          src="/images/coucher-soleil-caraibes.jpg"
          alt="Coucher de soleil sur la mer des Caraïbes"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: 'center 40%' }}
        />

        {/* Voile sombre */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'rgba(4,8,16,0.58)' }}
        />

        {/* Halo central */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(200,162,77,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Contenu — centré */}
        <div
          className="relative z-[5] w-full flex items-start md:items-center justify-center px-6 pt-[80px] md:pt-[120px] pb-12"
          style={{ minHeight: '100vh' }}
        >
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <ScrollReveal direction="up" distance={30} delay={60}>

              {/* Carte — glassmorphism, même style que coffrets */}
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
                  className="relative flex items-center justify-center"
                  style={{
                    height: '200px',
                    background:
                      'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
                  }}
                >
                  <Image
                    src="/images/bkm_logo_header.png"
                    alt="Bô Kay Mwen"
                    width={180}
                    height={180}
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))' }}
                  />
                </div>

                {/* Séparateur */}
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)',
                  }}
                />

                {/* Formulaire */}
                <div style={{ padding: '1.75rem 1.75rem 2rem' }}>
                  <p
                    className="font-serif uppercase tracking-[0.38em] mb-2"
                    style={{ fontSize: '0.58rem', color: '#C8A24D' }}
                  >
                    Parlons-nous
                  </p>
                  <div
                    style={{
                      height: '1px',
                      marginBottom: '1.5rem',
                      background: 'linear-gradient(90deg, rgba(200,162,77,0.15), transparent)',
                    }}
                  />

                  <ContactForm />
                </div>
              </div>

            </ScrollReveal>
          </div>
        </div>
      </section>

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
  );
}
