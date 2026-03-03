import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Coffrets Cadeaux — Offrez les Caraïbes',
  description:
    "Coffrets cadeaux Bô Kay Mwen : l'idée cadeau idéale pour offrir un voyage gustatif aux Antilles. Coffret Découverte et Coffret Prestige.",
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/coffrets' },
  openGraph: {
    url: 'https://blackbeard-umber.vercel.app/coffrets',
    title: 'Coffrets Cadeaux | Bô Kay Mwen',
  },
};

// ─── Scènes botaniques ────────────────────────────────────────────────────────

const SCENE: Record<string, { bg: string; plantLeft: string; plantRight: string }> = {
  'coffret-decouverte': {
    bg:         '/images/balata-jardin-1.jpg',
    plantLeft:  '/images/balata-heliconia.jpg',
    plantRight: '/images/balata-fougeres.jpg',
  },
  'coffret-prestige': {
    bg:         '/images/balata-jardin-2.jpg',
    plantLeft:  '/images/balata-anthurium.jpg',
    plantRight: '/images/balata-heliconia.jpg',
  },
};

const FALLBACK = SCENE['coffret-decouverte'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoffretsPage() {
  const coffrets = getAllProducts().filter((p) => p.category === 'coffret');

  return (
    <div style={{ background: '#060e07', overflow: 'hidden', overscrollBehavior: 'none' }}>

      {/* ══════════════════════════════════════════════════════════
          COFFRETS — Dans le jardin, immédiatement
      ══════════════════════════════════════════════════════════ */}
      {coffrets.map((coffret, i) => {
        const price  = (coffret.price_cents / 100).toFixed(2);
        const scene  = SCENE[coffret.slug] ?? FALLBACK;
        const isEven = i % 2 === 0;

        return (
          <div key={coffret.id}>

            {/* ── Respiration entre les deux coffrets ── */}
            {i > 0 && (
              <div
                style={{
                  height: '28px',
                  background:
                    'linear-gradient(180deg, rgba(4,12,6,0.96) 0%, #060e07 50%, rgba(4,12,6,0.96) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '32px', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.25), transparent)',
                  }}
                />
              </div>
            )}

          <section
            className="relative overflow-hidden flex items-center"
            style={{ minHeight: '100vh' }}
          >
            {/* Fond : jardin botanique */}
            <Image
              src={scene.bg}
              alt={coffret.name}
              fill
              className="object-cover"
              sizes="100vw"
            />

            {/* Voile — légèrement plus sombre pour lisibilité */}
            <div
              className="absolute inset-0 z-[1]"
              style={{ background: 'rgba(4,12,6,0.58)' }}
            />

            {/* Halo central doux */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(200,162,77,0.04) 0%, transparent 70%)',
              }}
            />

            {/* Plante avant-plan DROITE — subtile, juste un liseré */}
            <div
              className="absolute right-0 top-0 bottom-0 z-[4] hidden md:block"
              style={{
                width: '18%',
                maskImage:        'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
                WebkitMaskImage:  'linear-gradient(270deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
              }}
            >
              <Image src={isEven ? scene.plantRight : scene.plantLeft} alt="" fill className="object-cover" sizes="18vw" />
              <div className="absolute inset-0" style={{ background: 'rgba(4,12,6,0.30)' }} />
            </div>

            {/* Contenu — centré verticalement et horizontalement */}
            <div className="relative z-[5] w-full flex items-center justify-center px-6 py-12" style={{ minHeight: '100vh' }}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <ScrollReveal direction="up" distance={30} delay={60}>

                    {/* Encart — glassmorphism transparent sur le jardin */}
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
                      {/* Zone image — en haut de l'encart */}
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          height: '280px',
                          background:
                            'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(200,162,77,0.08) 0%, rgba(42,124,59,0.04) 50%, transparent 80%)',
                        }}
                      >
                        <Image
                          src="/images/bkm_logo_header.png"
                          alt="Bô Kay Mwen"
                          width={220}
                          height={220}
                          style={{
                            filter: 'drop-shadow(0 8px 24px rgba(200,162,77,0.2))',
                          }}
                        />
                      </div>

                      {/* Séparateur subtil */}
                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.14), transparent)' }} />

                      {/* Infos produit */}
                      <div style={{ padding: '1.75rem 1.75rem 2rem' }}>
                      <p
                        className="font-serif uppercase tracking-[0.38em] mb-4"
                        style={{ fontSize: '0.58rem', color: 'rgba(200,162,77,0.4)' }}
                      >
                        Coffret cadeau
                      </p>

                      <h2
                        className="font-serif text-gold leading-snug mb-2"
                        style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}
                      >
                        {coffret.name}
                      </h2>

                      {coffret.tagline && (
                        <p className="italic text-cream-muted/55 mb-4" style={{ fontSize: '0.8rem' }}>
                          {coffret.tagline}
                        </p>
                      )}

                      <div
                        className="mb-5"
                        style={{
                          height: '1px',
                          background: 'linear-gradient(90deg, rgba(200,162,77,0.15), transparent)',
                        }}
                      />

                      <p className="text-cream-muted/75 leading-relaxed mb-5" style={{ fontSize: '0.82rem' }}>
                        {coffret.description}
                      </p>

                      {coffret.pack_contents && coffret.pack_contents.length > 0 && (
                        <div className="mb-6">
                          <p
                            className="font-serif uppercase tracking-[0.2em] mb-2.5"
                            style={{ fontSize: '0.57rem', color: 'rgba(200,162,77,0.38)' }}
                          >
                            Contenu
                          </p>
                          <ul className="space-y-1.5">
                            {coffret.pack_contents.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-cream-muted/65"
                                style={{ fontSize: '0.8rem' }}
                              >
                                <span style={{ color: 'rgba(42,124,59,0.65)', flexShrink: 0, lineHeight: '1.6', fontSize: '0.55rem' }}>✦</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div
                        className="pt-4 flex items-center justify-between"
                        style={{ borderTop: '1px solid rgba(200,162,77,0.1)' }}
                      >
                        <div>
                          <p
                            className="font-serif uppercase tracking-wider mb-0.5"
                            style={{ fontSize: '0.57rem', color: 'rgba(200,162,77,0.32)' }}
                          >
                            {coffret.volume}
                          </p>
                          <p className="text-xl font-semibold text-warm-white">
                            {price}&nbsp;&euro;
                          </p>
                        </div>
                        <Link
                          href={`/produits/${coffret.slug}`}
                          className="btn-luxury-filled"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Offrir ce coffret
                        </Link>
                      </div>
                      </div>{/* fin infos produit */}
                    </div>{/* fin encart */}

                </ScrollReveal>
              </div>
            </div>
          </section>
          </div>
        );
      })}

      {/* ══════════════════════════════════════════════════════════
          OUTRO — Galerie + invitation
          Pour ceux qui s'attardent
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#060e07' }}>

        {/* Citation et CTA — centré, collé au footer */}
        <div className="text-center px-6 py-16">
          <ScrollReveal direction="up" distance={20}>
            <p
              className="font-serif italic leading-[2.4] mb-8"
              style={{ fontSize: '0.88rem', color: 'rgba(200,162,77,0.5)' }}
            >
              De Martinique en Guadeloupe,<br />
              de Guadeloupe en Caraïbe —<br />
              chaque gorgée est un voyage.
            </p>
            <div
              className="mx-auto mb-7"
              style={{ width: '32px', height: '1px', background: 'rgba(42,124,59,0.4)' }}
            />
            <p
              className="text-cream-muted/40 mb-6"
              style={{ fontSize: '0.75rem' }}
            >
              Découvrez aussi nos punchs à l&apos;unité
            </p>
            <Link href="/boutique" className="btn-luxury">
              Voir tous nos punchs
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Mention légale */}
      <div
        className="text-center py-4 px-6"
        style={{ background: '#060e07', borderTop: '1px solid rgba(200,162,77,0.06)' }}
      >
        <p style={{ fontSize: '0.68rem', color: 'rgba(232,224,208,0.14)' }}>
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>

    </div>
  );
}
