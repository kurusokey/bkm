import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Boutique — Bô Kay Mwen',
  description: 'Découvrez notre gamme de punchs artisanaux des Caraïbes : ananas-passion, coco, goyave, pili-pili et bien plus. 100% local, 100% fait maison.',
};

export default function BoutiquePage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen relative">
      {/* Image champ de cannes — fond fixe pleine page (immersif) */}
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

      {/* Contenu scrollable par-dessus le fond */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Hero — on voit le champ */}
        <div
          className="flex flex-col items-center justify-end"
          style={{ height: '45vh', minHeight: '300px', paddingBottom: '36px' }}
        >
          <div className="gold-line-wide mb-4" />
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

        {/* Zone produits avec fond semi-transparent */}
        <div
          className="flex justify-center w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,31,21,0.5) 0%, rgba(26,46,26,0.55) 50%, rgba(42,31,14,0.5) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div className="w-full" style={{ maxWidth: '880px', padding: '32px 14px 48px' }}>
            {products.length === 0 ? (
              <p className="text-center text-cream-muted" style={{ padding: '80px 0', fontSize: '0.85rem' }}>
                Aucun produit disponible pour le moment.
              </p>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>

        {/* Bas de page — on revoit le champ */}
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: '28vh', minHeight: '180px' }}
        >
          <p
            className="font-serif text-gold text-center tracking-wider text-shadow-sm"
            style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.35em', opacity: 0.5 }}
          >
            Né au cœur de la Caraïbes
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
