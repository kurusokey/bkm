import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'Notre Savoir-Faire — L\'Art de la Macération Créole',
  description: 'Découvrez l\'art de la macération créole de Bô Kay Mwen : ingrédients locaux, patience et passion pour des punchs artisanaux d\'exception.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/savoir-faire' },
  openGraph: {
    url: 'https://blackbeard-umber.vercel.app/savoir-faire',
    title: 'Notre Savoir-Faire | Bô Kay Mwen',
  },
};

const PILIERS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="#C8A24D" strokeWidth="1" fill="rgba(200,162,77,0.06)" />
        <path d="M20 10 C14 14 12 18 14 24 C16 28 20 30 20 30 C20 30 24 28 26 24 C28 18 26 14 20 10Z" stroke="#C8A24D" strokeWidth="1.2" fill="none" />
        <path d="M20 14 C17 17 16 20 17 24" stroke="#C8A24D" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: 'Macération lente',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="#C8A24D" strokeWidth="1" fill="rgba(200,162,77,0.06)" />
        <path d="M13 20 C13 14 17 11 20 11 C23 11 27 14 27 20 C27 26 23 29 20 29 C17 29 13 26 13 20Z" stroke="#C8A24D" strokeWidth="1.2" fill="none" />
        <path d="M17 20 C17 17 18.5 15.5 20 15.5" stroke="#C8A24D" strokeWidth="1" strokeLinecap="round" />
        <circle cx="27" cy="14" r="2" stroke="#C8A24D" strokeWidth="1" />
      </svg>
    ),
    title: '100 % Naturel',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="#C8A24D" strokeWidth="1" fill="rgba(200,162,77,0.06)" />
        <path d="M14 26 L20 12 L26 26" stroke="#C8A24D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22 L24 22" stroke="#C8A24D" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: 'Fait main',
  },
];

const ETAPES = [
  { step: '01', title: 'Sélection des fruits',    desc: 'Cueillis à pleine maturité, sourcés auprès d\'agriculteurs locaux des Antilles.' },
  { step: '02', title: 'Macération lente',         desc: 'Plusieurs semaines dans notre rhum agricole — le temps que les arômes s\'entrelacent.' },
  { step: '03', title: 'Filtration & équilibre',  desc: 'Un filtrage délicat pour affiner la texture sans dénaturer les arômes naturels.' },
  { step: '04', title: 'Mise en bouteille',        desc: 'Remplie, bouchée et étiquetée à la main. Avec tout le soleil des Antilles dedans.' },
];

export default function SavoirFairePage() {
  return (
    <div className="min-h-screen" style={{ background: '#060e07' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[560px] flex items-end justify-center overflow-hidden">
        <Image
          src="/images/distillerie-clement.jpg"
          alt="Ancienne distillerie de l'Habitation Clément, Martinique"
          fill priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(4,12,6,0.2) 0%, rgba(4,12,6,0.35) 50%, rgba(6,14,7,0.95) 100%)',
          }}
        />
        <div className="relative z-10 text-center px-6 pb-20 max-w-2xl mx-auto">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p
              className="font-serif uppercase tracking-[0.45em] mb-5"
              style={{ fontSize: '0.6rem', color: 'rgba(200,162,77,0.6)' }}
            >
              Artisanat &bull; Patience &bull; Terroir
            </p>
            <h1
              className="font-serif text-gold text-shadow-lg mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', whiteSpace: 'nowrap' }}
            >
              Notre savoir-faire
            </h1>
            <div
              className="mx-auto mb-6"
              style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.5), transparent)' }}
            />
            <p
              className="font-serif italic"
              style={{ fontSize: '0.85rem', color: 'rgba(232,224,208,0.6)', lineHeight: '1.9' }}
            >
              Au cœur des Antilles françaises,<br />
              chaque punch naît d&apos;un geste lent<br />
              et d&apos;un terroir d&apos;exception.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ② 3 PILIERS — compacts, centrés
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)',
          padding: '5rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '5rem' }}>
          {PILIERS.map(({ icon, title }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '90px' }}>
              {icon}
              <p
                className="font-serif text-gold tracking-wide"
                style={{ fontSize: '0.8rem', textAlign: 'center' }}
              >
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ③ L'ART DE LA MACÉRATION — image immersive
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        <Image
          src="/images/fermentation-antilles.jpg"
          alt="Cuves de fermentation — rhum agricole des Antilles"
          fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Voile plus chaud pour trancher avec l'image verte */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,8,4,0.82) 0%, rgba(10,18,6,0.65) 100%)' }}
        />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
            <ScrollReveal direction="up" distance={30}>
              <p className="font-serif uppercase tracking-[0.3em] mb-4"
                style={{ fontSize: '0.65rem', color: 'rgba(200,162,77,0.7)' }}>
                Notre savoir-faire
              </p>
              <h2
                className="font-serif text-gold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', whiteSpace: 'nowrap' }}
              >
                L&apos;art de la macération créole
              </h2>
              <div className="gold-line mx-auto mb-8" />
              <p style={{ color: 'rgba(240,232,215,0.90)', fontSize: '0.9rem', lineHeight: '2', marginBottom: '1.25rem' }}>
                Chaque punch commence par une sélection rigoureuse des fruits — cueillis à maturité, sourcés auprès d&apos;agriculteurs locaux des Antilles qui partagent notre passion pour une agriculture respectueuse.
              </p>
              <p style={{ color: 'rgba(240,232,215,0.90)', fontSize: '0.9rem', lineHeight: '2' }}>
                Ils infusent ensuite dans notre rhum agricole pendant plusieurs semaines, le temps que la magie opère et que les arômes s&apos;entrelacent. Rien d&apos;artificiel — seulement la patience et le terroir.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ④ DE LA TERRE À LA BOUTEILLE — épuré
      ══════════════════════════════════════════ */}
      <section
        style={{ background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)', padding: '6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <ScrollReveal direction="up" distance={30}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p className="font-serif uppercase tracking-[0.3em] mb-3"
                style={{ fontSize: '0.65rem', color: 'rgba(200,162,77,0.5)' }}>
                Notre processus
              </p>
              <h2
                className="font-serif text-gold tracking-wide mb-4"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', whiteSpace: 'nowrap' }}
              >
                De la terre à la bouteille
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute', left: '19px', top: '1rem', bottom: '1rem', width: '1px',
                background: 'linear-gradient(180deg, rgba(200,162,77,0.35), transparent)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {ETAPES.map(({ step, title, desc }, i) => (
                <ScrollReveal key={step} delay={i * 80} direction="up" distance={20}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0 }}>
                      <div
                        className="font-serif text-gold"
                        style={{
                          width: '40px', height: '40px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem',
                          background: 'rgba(200,162,77,0.06)',
                          border: '1px solid rgba(200,162,77,0.35)',
                        }}
                      >
                        {step}
                      </div>
                    </div>
                    <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                      <h3 className="font-serif text-gold tracking-wide" style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                        {title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'rgba(232,224,208,0.55)' }}>{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center"
        style={{ background: '#060e07', padding: '60px 24px 80px' }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            background: 'rgba(6,14,7,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(200,162,77,0.12)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
          }}
        >
          <Newsletter />
        </div>
      </section>

      {/* Mention légale */}
      <div className="text-center py-4 px-6" style={{ borderTop: '1px solid rgba(200,162,77,0.07)' }}>
        <p style={{ fontSize: '0.68rem', color: 'rgba(232,224,208,0.14)' }}>
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>

    </div>
  );
}
