import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import Newsletter from '@/components/Newsletter';
import { getFeaturedProducts } from '@/lib/products';
import { getProductImage } from '@/lib/productImages';

export const metadata: Metadata = {
  title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
  description: 'Punchs artisanaux macérés avec des fruits tropicaux des Caraïbes. Ananas-passion, coco, goyave, pili-pili — 100 % local, 100 % fait maison.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app' },
  openGraph: {
    url: 'https://blackbeard-umber.vercel.app',
    title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
    description: 'Punchs artisanaux macérés avec des fruits tropicaux des Caraïbes.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bô Kay Mwen',
  url: 'https://blackbeard-umber.vercel.app',
  logo: 'https://blackbeard-umber.vercel.app/og-image.jpg',
  description: 'Punchs artisanaux des Caraïbes — 100 % local, 100 % fait maison.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bô Kay Mwen',
  url: 'https://blackbeard-umber.vercel.app',
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

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main className="min-h-screen">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      {/* ======== HERO — FULL SCREEN ======== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-rum.jpg"
          alt=""
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent z-[2]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal delay={200} direction="none" duration={1000}>
            <div className="gold-line-wide mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={400} direction="up" distance={50} duration={1200}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gold font-semibold mb-8 tracking-wide text-shadow-lg leading-[0.95]">
              Bô Kay Mwen
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={800} direction="up" distance={30} duration={1000}>
            <p className="text-base md:text-lg lg:text-xl text-cream/90 mx-auto mb-12 text-shadow-sm font-light whitespace-nowrap">
              Le goût des îles dans une bouteille.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1000} direction="up" distance={20} duration={1000}>
            <Link href="/boutique" className="btn-luxury-filled">
              Découvrir la collection
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ======== PRODUITS PHARES ======== */}
      <section className="bg-ink py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Nos créations
              </p>
              <h2 className="font-serif text-gold text-2xl md:text-3xl tracking-wide mb-4">
                Les incontournables
              </h2>
              <div className="gold-line mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featured.map((product, i) => {
              const price = (product.price_cents / 100).toFixed(2);
              const shortName = product.name.replace(/^Punch\s+/i, '');
              return (
                <ScrollReveal key={product.id} delay={i * 120} direction="up" distance={40}>
                  <Link href={`/produits/${product.slug}`} className="group block">
                    <div
                      className="relative overflow-hidden rounded-xl mb-5"
                      style={{ aspectRatio: '3/4', background: 'rgba(200,162,77,0.04)', border: '1px solid rgba(200,162,77,0.08)' }}
                    >
                      <Image
                        src={getProductImage(product.slug, product.image_url)}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 640px) 33vw, 100vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <span className="text-xs uppercase tracking-[0.2em] text-gold font-serif">
                          Découvrir &rarr;
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-gold text-center text-lg tracking-wide mb-1 transition-opacity duration-300 group-hover:opacity-80">
                      {shortName}
                    </h3>
                    {product.tagline && (
                      <p className="text-cream-muted/60 text-center text-xs italic mb-2">
                        {product.tagline}
                      </p>
                    )}
                    <p className="text-warm-white text-center font-semibold">{price}&nbsp;&euro;</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={300} direction="up" distance={20}>
            <div className="text-center mt-14">
              <Link href="/boutique" className="btn-luxury">
                Voir toute la collection
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======== ENGAGEMENTS ======== */}
      <section
        className="py-20 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
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
                  <h3
                    className="font-serif text-gold tracking-wide"
                    style={{ fontSize: '1rem' }}
                  >
                    {title}
                  </h3>
                  <p className="text-cream-muted/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SAVOIR-FAIRE 50/50 ======== */}
      <section className="bg-ink py-20 px-6 overflow-hidden">
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
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/5' }}
            >
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

      {/* ======== TÉMOIGNAGES ======== */}
      <section
        className="py-20 px-6"
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
                  style={{
                    background: 'rgba(200,162,77,0.04)',
                    border: '1px solid rgba(200,162,77,0.12)',
                  }}
                >
                  {/* Étoiles */}
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

      {/* ======== NEWSLETTER ======== */}
      <section className="bg-ink py-16 px-6">
        <div className="max-w-xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-8">
              <div className="gold-line mx-auto mb-6" />
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Restez connectés
              </p>
              <h2 className="font-serif text-gold text-xl tracking-wide">
                Nouveautés & offres exclusives
              </h2>
            </div>
            <Newsletter />
          </ScrollReveal>
        </div>
      </section>

      {/* Mention légale */}
      <div className="bg-ink border-t border-gold-muted/10 text-center py-4 px-6">
        <p className="text-cream/20 text-xs">
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </main>
  );
}
