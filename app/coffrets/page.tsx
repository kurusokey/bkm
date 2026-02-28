import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getAllProducts } from '@/lib/products';
import { getProductImage } from '@/lib/productImages';

export const metadata: Metadata = {
  title: 'Coffrets Cadeaux — Offrez les Caraïbes',
  description: 'Coffrets cadeaux Bô Kay Mwen : l\'idée cadeau idéale pour offrir un voyage gustatif aux Antilles. Coffret Découverte et Coffret Prestige.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/coffrets' },
  openGraph: {
    url: 'https://blackbeard-umber.vercel.app/coffrets',
    title: 'Coffrets Cadeaux | Bô Kay Mwen',
  },
};

export default function CoffretsPage() {
  const coffrets = getAllProducts().filter((p) => p.category === 'coffret');

  return (
    <div className="min-h-screen bg-ink">

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center">
        <ScrollReveal direction="up" distance={30}>
          <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
            Idée cadeau
          </p>
          <h1 className="font-serif text-gold text-3xl md:text-4xl tracking-wide mb-5 leading-snug">
            Offrez les Caraïbes
          </h1>
          <div
            className="mx-auto w-[80px] h-[1px] mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)' }}
          />
          <p className="text-cream-muted/70 text-sm leading-relaxed max-w-md mx-auto">
            Réunis dans un coffret élégant, nos punchs artisanaux font le cadeau idéal pour
            toutes les occasions — anniversaire, fêtes, remerciements.
          </p>
        </ScrollReveal>
      </section>

      {/* Coffrets */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {coffrets.map((coffret, i) => {
            const price = (coffret.price_cents / 100).toFixed(2);
            return (
              <ScrollReveal key={coffret.id} direction={i % 2 === 0 ? 'left' : 'right'} distance={40} delay={i * 100}>
                <div
                  className="grid md:grid-cols-2 gap-10 items-center rounded-2xl p-8"
                  style={{ background: 'rgba(200,162,77,0.04)', border: '1px solid rgba(200,162,77,0.12)' }}
                >
                  {/* Image */}
                  <div className={`relative ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                    <div className="relative h-72 md:h-80 rounded-xl overflow-hidden">
                      <Image
                        src={getProductImage(coffret.slug, coffret.image_url)}
                        alt={coffret.name}
                        fill
                        className="object-contain p-6"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className={i % 2 !== 0 ? 'md:order-1' : ''}>
                    <span
                      className="inline-block text-[10px] uppercase tracking-[0.2em] font-serif px-2 py-0.5 rounded-full mb-4"
                      style={{ background: 'rgba(200,162,77,0.12)', color: '#C8A24D' }}
                    >
                      Coffret cadeau
                    </span>
                    <h2 className="font-serif text-gold text-xl tracking-wide mb-2">
                      {coffret.name}
                    </h2>
                    {coffret.tagline && (
                      <p className="text-cream-muted/60 italic text-sm mb-4">{coffret.tagline}</p>
                    )}
                    <p className="text-cream-muted/80 text-sm leading-relaxed mb-5">
                      {coffret.description}
                    </p>

                    {coffret.pack_contents && coffret.pack_contents.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-gold/50 font-serif mb-2">
                          Contenu
                        </p>
                        <ul className="space-y-1">
                          {coffret.pack_contents.map((item) => (
                            <li key={item} className="text-cream-muted/70 text-sm">
                              — {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="text-xs text-cream-muted/50 font-serif uppercase tracking-wider mb-1">
                          {coffret.volume}
                        </p>
                        <p className="text-2xl font-semibold text-warm-white">
                          {price}&nbsp;&euro;
                        </p>
                      </div>
                      <Link href={`/produits/${coffret.slug}`} className="btn-luxury-filled">
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Section valeur ajoutée */}
      <section
        className="py-16 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: '🎁', label: 'Emballage cadeau', desc: 'Coffret élégant prêt à offrir' },
                { icon: '🚚', label: 'Livraison soignée', desc: 'Emballage protégé pour la livraison' },
                { icon: '✉️', label: 'Message personnalisé', desc: 'Ajoutez une note lors de la commande' },
              ].map(({ icon, label, desc }) => (
                <div key={label}>
                  <div className="text-3xl mb-3">{icon}</div>
                  <p className="font-serif text-gold text-sm tracking-wide mb-1">{label}</p>
                  <p className="text-cream-muted/55 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA boutique */}
      <section className="py-14 px-6 text-center bg-ink">
        <ScrollReveal direction="up" distance={20}>
          <p className="text-cream-muted/50 text-sm mb-6">
            Vous souhaitez également découvrir nos punchs à l&apos;unité ?
          </p>
          <Link href="/boutique" className="btn-luxury">
            Voir tous nos punchs
          </Link>
        </ScrollReveal>
      </section>

    </div>
  );
}
