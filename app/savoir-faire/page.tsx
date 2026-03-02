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
  },
  {
    quote: 'J\'ai offert le Coffret Découverte pour les fêtes. Toute la famille a été bluffée. On recommande !',
    name: 'Frédéric M.',
    location: 'Lyon',
  },
  {
    quote: 'Le punch pili-pili est une révélation — épicé mais équilibré. Une bouteille vide en deux jours.',
    name: 'Sandrine K.',
    location: 'Guadeloupe',
  },
];

export default function SavoirFairePage() {
  return (
    <div className="min-h-screen" style={{ background: '#060e07' }}>

      {/* ══════════════════════════════════════════
          HERO — Distillerie des Antilles, plein écran
      ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[560px] flex items-end justify-center overflow-hidden">
        <Image
          src="/images/distillerie-antilles.jpg"
          alt="Distillerie artisanale des Antilles françaises"
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,12,6,0.2) 0%, rgba(4,12,6,0.35) 50%, rgba(6,14,7,0.95) 100%)',
          }}
        />

        <div className="relative z-10 text-center px-6 pb-20 max-w-xl mx-auto">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p
              className="font-serif uppercase tracking-[0.45em] mb-5"
              style={{ fontSize: '0.6rem', color: 'rgba(200,162,77,0.6)' }}
            >
              Artisanat &bull; Patience &bull; Terroir
            </p>
            <h1
              className="font-serif text-gold text-shadow-lg leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
            >
              Notre savoir-faire
            </h1>
            <div
              className="mx-auto mb-6"
              style={{
                width: '50px', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.5), transparent)',
              }}
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
          1. CE QUI NOUS DÉFINIT
      ══════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)' }}
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

      {/* ══════════════════════════════════════════
          2. DE LA TERRE À LA BOUTEILLE
      ══════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Notre processus
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
                De la terre à la bouteille
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="relative">
            <div
              className="absolute left-[19px] top-4 bottom-4 w-[1px] hidden sm:block"
              style={{ background: 'linear-gradient(180deg, rgba(200,162,77,0.5), rgba(200,162,77,0.05))' }}
            />
            <div className="space-y-10">
              {[
                {
                  step: '01',
                  title: 'Sélection des fruits',
                  desc: "Nous choisissons des fruits cueillis à pleine maturité, sourcés auprès d'agriculteurs locaux des Antilles. Ananas, goyave, mangue, litchis — chaque ingrédient est sélectionné pour sa qualité et son arôme.",
                },
                {
                  step: '02',
                  title: 'Macération lente',
                  desc: "Les fruits sont mis à macérer dans notre rhum agricole pendant plusieurs semaines. C'est là que la magie opère — les arômes s'entrelacent, la couleur se forme, le caractère se révèle.",
                },
                {
                  step: '03',
                  title: 'Filtration & équilibre',
                  desc: "Un filtrage délicat permet d'affiner la texture du punch sans en dénaturer les arômes naturels. On goûte, on ajuste, on vérifie que chaque lot correspond à notre standard de qualité.",
                },
                {
                  step: '04',
                  title: 'Mise en bouteille artisanale',
                  desc: "Chaque bouteille est remplie, bouchée et étiquetée à la main. Un dernier contrôle avant qu'elle prenne la route vers votre table — avec tout le soleil des Antilles dedans.",
                },
              ].map(({ step, title, desc }, i) => (
                <ScrollReveal key={step} delay={i * 100} direction="up" distance={30}>
                  <div className="flex gap-6 items-start">
                    <div className="shrink-0 relative">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-gold text-xs z-10 relative"
                        style={{ background: '#0B0E11', border: '1px solid rgba(200,162,77,0.4)' }}
                      >
                        {step}
                      </div>
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-serif text-gold tracking-wide mb-2" style={{ fontSize: '1rem' }}>
                        {title}
                      </h3>
                      <p className="text-cream-muted/75 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. L'ART DE LA MACÉRATION — image immersive
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        <Image
          src="/images/fermentation-antilles.jpg"
          alt="Cuves de fermentation — rhum agricole des Antilles"
          fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(4,12,6,0.62)' }}
        />

        <div className="relative z-10 flex items-center min-h-[85vh] px-6 py-20">
          <div className="max-w-2xl mx-auto w-full">
            <ScrollReveal direction="up" distance={30}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/55 font-serif mb-4">
                  Notre savoir-faire
                </p>
                <h2
                  className="font-serif text-gold leading-snug mb-6"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                >
                  L&apos;art de la<br />macération créole
                </h2>
                <div className="gold-line mb-8" />
                <p className="text-cream-muted/85 text-sm leading-relaxed mb-5">
                  Chaque punch commence par une sélection rigoureuse des fruits — cueillis à maturité, sourcés auprès d&apos;agriculteurs locaux des Antilles qui partagent notre passion pour une agriculture respectueuse.
                </p>
                <p className="text-cream-muted/85 text-sm leading-relaxed mb-8">
                  Ils infusent ensuite dans notre rhum agricole pendant plusieurs semaines, le temps que la magie opère et que les arômes s&apos;entrelacent. Rien d&apos;artificiel — seulement la patience et le terroir.
                </p>
                <Link href="/a-propos" className="btn-luxury">
                  Istwa an nou &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. NOS VALEURS
      ══════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: '#060e07' }}
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Ce qui nous guide
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
                Nos valeurs
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { label: 'Authenticité', desc: "Des recettes transmises avec passion, fidèles aux traditions créoles des Antilles.", color: '#C8A24D' },
              { label: 'Terroir', desc: "100 % d'ingrédients locaux, cultivés par des agriculteurs des Caraïbes qui partagent nos valeurs.", color: '#2A7C7B' },
              { label: 'Artisanat', desc: "Fait main, bouteille par bouteille, avec le soin qu'on réserve aux choses qui comptent vraiment.", color: '#8B2F3A' },
            ].map(({ label, desc, color }, i) => (
              <ScrollReveal key={label} delay={i * 120} direction="up" distance={30}>
                <div className="text-center">
                  <div className="w-8 h-[2px] mx-auto mb-5" style={{ background: color }} />
                  <h3 className="font-serif tracking-wide mb-3" style={{ fontSize: '1rem', color }}>
                    {label}
                  </h3>
                  <p className="text-cream-muted/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. ILS ONT GOÛTÉ
      ══════════════════════════════════════════ */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #060e07 0%, #0D1A0D 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Ils nous font confiance
              </p>
              <h2 className="font-serif text-gold text-2xl tracking-wide mb-4">
                Ils ont goûté
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="flex flex-col" style={{ gap: '48px' }}>
            {TEMOIGNAGES.map(({ quote, name, location }, i) => (
              <ScrollReveal key={name} delay={i * 150} direction="up" distance={25}>
                <div className="text-center">
                  <p
                    className="font-serif text-gold/20 leading-none mb-4 select-none"
                    style={{ fontSize: '4rem' }}
                  >
                    &ldquo;
                  </p>
                  <p
                    className="font-serif italic leading-relaxed mb-5 mx-auto"
                    style={{
                      fontSize: '0.95rem',
                      color: 'rgba(232,224,208,0.75)',
                      maxWidth: '520px',
                      lineHeight: '1.9',
                    }}
                  >
                    {quote}
                  </p>
                  <div
                    className="mx-auto mb-4"
                    style={{ width: '24px', height: '1px', background: 'rgba(200,162,77,0.3)' }}
                  />
                  <p className="font-serif text-gold/70" style={{ fontSize: '0.8rem' }}>
                    {name}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(232,224,208,0.35)' }}>
                    {location}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center px-6"
        style={{ background: '#060e07', padding: '80px 24px' }}
      >
        <ScrollReveal direction="up" distance={30}>
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
        </ScrollReveal>
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
