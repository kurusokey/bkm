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
          src="/images/distillerie-depaz.jpg"
          alt="Habitation Depaz — distillerie de rhum agricole, Martinique"
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
        className="px-6 py-20"
        style={{ background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {PILIERS.map(({ icon, title }, i) => (
              <ScrollReveal key={title} delay={i * 120} direction="up" distance={20}>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  {icon}
                  <p
                    className="font-serif text-gold tracking-wide"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {title}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

        <div className="relative z-10 flex items-center min-h-[90vh] px-6 py-24">
          <div className="max-w-xl mx-auto w-full">
            <ScrollReveal direction="up" distance={30}>
              <p className="text-xs uppercase tracking-[0.3em] font-serif mb-4"
                style={{ color: 'rgba(200,162,77,0.7)' }}>
                Notre savoir-faire
              </p>
              <h2
                className="font-serif text-gold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', whiteSpace: 'nowrap' }}
              >
                L&apos;art de la macération créole
              </h2>
              <div className="gold-line mb-8" />
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
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Notre processus
              </p>
              <h2
                className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4"
                style={{ whiteSpace: 'nowrap' }}
              >
                De la terre à la bouteille
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="relative">
            <div
              className="absolute left-[19px] top-4 bottom-4 w-[1px] hidden sm:block"
              style={{ background: 'linear-gradient(180deg, rgba(200,162,77,0.35), transparent)' }}
            />
            <div className="space-y-8">
              {ETAPES.map(({ step, title, desc }, i) => (
                <ScrollReveal key={step} delay={i * 80} direction="up" distance={20}>
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-gold text-xs"
                        style={{ background: 'rgba(200,162,77,0.06)', border: '1px solid rgba(200,162,77,0.35)' }}
                      >
                        {step}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-serif text-gold tracking-wide mb-1" style={{ fontSize: '0.95rem' }}>
                        {title}
                      </h3>
                      <p className="text-cream-muted/65 text-sm leading-relaxed">{desc}</p>
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
