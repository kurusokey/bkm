import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProductList from '@/components/ProductList';
import JsonLd from '@/components/JsonLd';
import { getAllProducts, getFeaturedProducts } from '@/lib/products';
import { BASE_URL } from '@/lib/config';
import { getProductImage } from '@/lib/productImages';


export const metadata: Metadata = {
  title: 'Boutique — Nos Punchs Artisanaux',
  description: 'Découvrez notre gamme de punchs artisanaux des Caraïbes : ananas-passion, coco, goyave, pili-pili et bien plus. 100 % local, 100 % fait maison.',
  alternates: { canonical: `${BASE_URL}/boutique` },
  openGraph: {
    url: `${BASE_URL}/boutique`,
    title: 'Boutique — Nos Punchs Artisanaux | Bô Kay Mwen',
    description: 'Ananas-passion, coco, goyave, pili-pili… Découvrez tous nos punchs artisanaux des Caraïbes.',
  },
};

export default function BoutiquePage() {
  const products = getAllProducts();
  const featured = getFeaturedProducts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Punchs Artisanaux Bô Kay Mwen',
    url: `${BASE_URL}/boutique`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${BASE_URL}/produits/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen relative" style={{ overscrollBehavior: 'none' }}>

      {/* Fond fixe — champ de cannes */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/sugarcane-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,31,21,0.45) 0%, rgba(13,31,21,0.55) 40%, rgba(26,46,26,0.6) 70%, rgba(42,31,14,0.65) 100%)',
          }}
        />
      </div>

      {/* Contenu scrollable */}
      <JsonLd data={itemListSchema} />
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Hero ── */}
        <div
          className="flex flex-col items-center justify-end"
          style={{ height: '45vh', minHeight: '300px', paddingBottom: '36px' }}
        >
          <div className="gold-line-wide mb-6" />
          <Image
            src="/images/bkm_logo_header.png"
            alt="Bô Kay Mwen"
            width={220}
            height={220}
            className="mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(200,162,77,0.25))', width: 'clamp(140px, 38vw, 220px)', height: 'auto' }}
            priority
          />
          <h1
            className="font-serif text-gold tracking-wider text-center text-shadow-lg"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}
          >
            Nos Punchs
          </h1>
          <p
            className="text-cream-muted text-center tracking-wide mt-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Saveurs artisanales des Caraïbes
          </p>
        </div>

        {/* ── Les incontournables ── */}
        <div
          style={{
            background: 'rgba(6,14,7,0.45)',
            backdropFilter: 'blur(4px)',
            borderTop: '1px solid rgba(200,162,77,0.08)',
            borderBottom: '1px solid rgba(200,162,77,0.08)',
            padding: '56px 24px',
          }}
        >
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <ScrollReveal direction="up" distance={30}>
              <div className="text-center mb-12">
                <p
                  className="font-serif uppercase tracking-[0.3em] mb-3"
                  style={{ fontSize: '0.6rem', color: 'rgba(200,162,77,0.5)' }}
                >
                  Nos créations
                </p>
                <h2
                  className="font-serif text-gold tracking-wide mb-4"
                  style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}
                >
                  Les incontournables
                </h2>
                <div className="gold-line mx-auto" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((product, i) => {
                const price = (product.price_cents / 100).toFixed(2);
                const shortName = product.name.replace(/^Punch\s+/i, '');
                return (
                  <ScrollReveal key={product.id} delay={i * 120} direction="up" distance={40}>
                    <Link href={`/produits/${product.slug}`} className="group block">
                      <div
                        className="relative overflow-hidden rounded-xl mb-5"
                        style={{
                          aspectRatio: '3/4',
                          background: 'rgba(6,14,7,0.5)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(200,162,77,0.55)',
                        }}
                      >
                        <Image
                          src={getProductImage(product.slug, product.image_url)}
                          alt={product.name}
                          fill
                          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 640px) 33vw, 100vw"
                        />
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
          </div>
        </div>

        {/* ── Toute la collection ── */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(13,31,21,0.5) 0%, rgba(26,46,26,0.55) 50%, rgba(42,31,14,0.5) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div style={{ maxWidth: '880px', margin: '0 auto', padding: '48px 14px' }}>
            <ScrollReveal direction="up" distance={20}>
              <div className="text-center mb-10">
                <p
                  className="font-serif uppercase tracking-[0.3em]"
                  style={{ fontSize: '0.6rem', color: 'rgba(200,162,77,0.45)' }}
                >
                  La collection complète
                </p>
              </div>
            </ScrollReveal>
            {products.length === 0 ? (
              <p className="text-center text-cream-muted" style={{ padding: '80px 0', fontSize: '0.85rem' }}>
                Aucun produit disponible pour le moment.
              </p>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>

        {/* Bas de page */}
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: '28vh', minHeight: '180px' }}
        >
          <p
            className="font-serif text-gold text-center tracking-wider text-shadow-sm"
            style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.35em', opacity: 0.5 }}
          >
            Né au cœur de la Caraïbe
          </p>
          <Link
            href="/a-propos"
            className="text-cream-muted hover:text-gold transition-colors duration-300 mt-3"
            style={{ fontSize: '0.65rem' }}
          >
            Découvrir notre histoire &rarr;
          </Link>
          <p className="text-cream/20 text-xs text-center mt-6 px-6">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>

      </div>
    </div>
  );
}
