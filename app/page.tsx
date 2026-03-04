import { BASE_URL } from '@/lib/config';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
  description: 'Punchs artisanaux macérés avec des fruits tropicaux des Caraïbes. Ananas-passion, coco, goyave, pili-pili — 100 % local, 100 % fait maison.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    url: BASE_URL,
    title: 'Bô Kay Mwen — Punchs Artisanaux des Caraïbes',
    description: 'Punchs artisanaux macérés avec des fruits tropicaux des Caraïbes.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bô Kay Mwen',
  url: BASE_URL,
  logo: 'https://laroutedurhum.com/og-image.jpg',
  description: 'Punchs artisanaux des Caraïbes — 100 % local, 100 % fait maison.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bô Kay Mwen',
  url: BASE_URL,
};


export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      {/* ======== HERO — FULL SCREEN ======== */}
      <section className="relative h-screen min-h-[600px] flex flex-col overflow-hidden">
        <Image
          src="/images/punch-all.jpg"
          alt=""
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent z-[2]" />

        {/* Logo — centré dans la zone claire */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-6 pt-16">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal delay={200} direction="none" duration={1000}>
              <div className="gold-line-wide mx-auto mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={400} direction="up" distance={50} duration={1200}>
              <Image
                src="/images/bkm_logo_header.png"
                alt="Bô Kay Mwen"
                width={300}
                height={300}
                className="mx-auto"
                style={{ filter: 'drop-shadow(0 8px 40px rgba(200,162,77,0.3))', width: 'clamp(180px, 45vw, 300px)', height: 'auto' }}
                priority
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Tagline + bouton — bas de page, sur le fond sombre */}
        <div className="relative z-10 text-center px-6 pb-16 md:pb-20">
          <ScrollReveal delay={800} direction="up" distance={30} duration={1000}>
            <p className="text-base md:text-lg mx-auto mb-10 font-light text-shadow-lg" style={{ color: '#C8A24D' }}>
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
