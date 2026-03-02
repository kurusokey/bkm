import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

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


export default function Home() {
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

      {/* Mention légale */}
      <div className="bg-ink border-t border-gold-muted/10 text-center py-4 px-6">
        <p className="text-cream/20 text-xs">
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </main>
  );
}
