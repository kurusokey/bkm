import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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

const ENGAGEMENTS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="#C8A24D" strokeWidth="1" fill="rgba(200,162,77,0.06)" />
        <path d="M20 10 C14 14 12 18 14 24 C16 28 20 30 20 30 C20 30 24 28 26 24 C28 18 26 14 20 10Z" stroke="#C8A24D" strokeWidth="1.2" fill="none" />
        <path d="M20 14 C17 17 16 20 17 24" stroke="#C8A24D" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: 'Macération lente',
    desc: 'Chaque punch repose plusieurs semaines pour extraire toute l\'essence des fruits.',
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
    desc: 'Aucun conservateur, aucun colorant artificiel. Seulement des ingrédients locaux.',
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
    desc: 'Chaque bouteille est préparée, contrôlée et mise en main à la main avec soin.',
  },
];

const TEMOIGNAGES = [
  {
    quote: 'Le punch coco-gingembre m\'a rappelé exactement les saveurs de mes étés en Martinique. Exceptionnel.',
    name: 'Marie-Claire B.',
    location: 'Paris',
    stars: 5,
  },
  {
    quote: 'J\'ai offert le Coffret Découverte pour les fêtes. Toute la famille a été bluffée. On recommande !',
    name: 'Frédéric M.',
    location: 'Lyon',
    stars: 5,
  },
  {
    quote: 'Le punch pili-pili est une révélation — épicé mais équilibré. Une bouteille vide en deux jours.',
    name: 'Sandrine K.',
    location: 'Guadeloupe',
    stars: 5,
  },
];

export default function SavoirFairePage() {
  return (
    <div className="min-h-screen bg-ink">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative h-[65vh] min-h-[420px] flex items-end justify-center overflow-hidden">
        <Image
          src="/images/barrels.jpg"
          alt="Notre savoir-faire"
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink z-[1]" />

        <div className="relative z-10 text-center px-6 pb-16 max-w-lg mx-auto">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p
              className="font-serif uppercase tracking-[0.45em] mb-5"
              style={{ fontSize: '0.6rem', color: 'rgba(200,162,77,0.5)' }}
            >
              Artisanat &bull; Patience &bull; Terroir
            </p>
            <h1
              className="font-serif text-gold text-shadow-lg leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              Notre savoir-faire
            </h1>
            <div
              className="mx-auto"
              style={{
                width: '50px', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.45), transparent)',
              }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════ CE QUI NOUS DÉFINIT ══════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Notre promesse
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
                Ce qui nous définit
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {ENGAGEMENTS.map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 150} direction="up" distance={30}>
                <div className="text-center flex flex-col items-center gap-5">
                  {icon}
                  <h3 className="font-serif text-gold tracking-wide" style={{ fontSize: '1rem' }}>
                    {title}
                  </h3>
                  <p className="text-cream-muted/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ L'ART DE LA MACÉRATION CRÉOLE ══════════════════ */}
      <section className="bg-ink py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" distance={50}>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-4">
                Notre savoir-faire
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-6 leading-snug">
                L&apos;art de la<br />macération créole
              </h2>
              <div className="gold-line mb-8" />
              <p className="text-cream-muted/80 text-sm leading-relaxed mb-6">
                Chaque punch commence par une sélection rigoureuse des fruits — cueillis à maturité, sourcés auprès d&apos;agriculteurs locaux des Antilles qui partagent notre passion pour une agriculture respectueuse.
              </p>
              <p className="text-cream-muted/80 text-sm leading-relaxed mb-8">
                Ils infusent ensuite dans notre rhum agricole pendant plusieurs semaines, le temps que la magie opère et que les arômes s&apos;entrelacent. Rien d&apos;artificiel — seulement la patience et le terroir.
              </p>
              <Link href="/a-propos" className="btn-luxury">
                Istwa an nou &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={50} delay={200}>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/images/craft.jpg"
                alt="Préparation artisanale des punchs Bô Kay Mwen"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════ ILS ONT GOÛTÉ ══════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Ils nous font confiance
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
                Ils ont goûté
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEMOIGNAGES.map(({ quote, name, location, stars }, i) => (
              <ScrollReveal key={name} delay={i * 120} direction="up" distance={30}>
                <div
                  className="flex flex-col gap-4 p-6 rounded-xl"
                  style={{ background: 'rgba(200,162,77,0.04)', border: '1px solid rgba(200,162,77,0.12)' }}
                >
                  <div className="flex gap-1" aria-label={`${stars} étoiles sur 5`}>
                    {Array.from({ length: stars }).map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-cream-muted/80 text-sm leading-relaxed italic flex-1">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-gold font-serif text-sm">{name}</p>
                    <p className="text-cream-muted/50 text-xs">{location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ══════════════════ */}
      <section className="bg-ink py-20 px-6">
        <div className="max-w-xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-8">
              <div className="gold-line mx-auto mb-6" />
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Restez connectés
              </p>
              <h2 className="font-serif text-gold text-xl tracking-wide mb-8">
                Nouveautés &amp; offres exclusives
              </h2>
              <Newsletter />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mention légale */}
      <div className="bg-ink border-t border-gold-muted/10 text-center py-4 px-6">
        <p className="text-cream/20 text-xs">
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>

    </div>
  );
}
