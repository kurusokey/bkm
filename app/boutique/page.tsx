import Image from 'next/image';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/products';

export default function BoutiquePage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0B0E11 0%, #14100B 15%, #1A140D 50%, #14100B 85%, #0B0E11 100%)' }}>
      {/* Hero — ambiance distillerie */}
      <div className="relative overflow-hidden" style={{ height: '50vh', minHeight: '320px' }}>
        <Image
          src="/images/barrels.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(11,14,17,0.5) 0%, rgba(20,16,11,0.7) 60%, rgba(20,16,11,1) 100%)' }}
        />

        {/* Titre */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10" style={{ zIndex: 2 }}>
          <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)', marginBottom: '20px' }} />
          <p
            className="font-serif text-gold tracking-wider text-center"
            style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.7 }}
          >
            Distillerie artisanale
          </p>
        </div>
      </div>

      {/* Texture boisée subtile derrière les produits */}
      <div className="relative">
        {/* Bande de texture bois */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(200,162,77,0.3) 2px, rgba(200,162,77,0.3) 3px)',
            backgroundSize: '20px 100%',
          }}
        />

        {/* Contenu produits */}
        <div
          style={{
            maxWidth: '340px',
            margin: '0 auto',
            padding: '40px 20px 60px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {products.length === 0 ? (
            <p className="text-center text-cream-muted" style={{ padding: '80px 0', fontSize: '1rem' }}>
              Aucun produit disponible pour le moment.
            </p>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>

      {/* Footer ambiance — image fûts en bas */}
      <div className="relative overflow-hidden" style={{ height: '30vh', minHeight: '200px' }}>
        <Image
          src="/images/craft.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(20,16,11,1) 0%, rgba(20,16,11,0.6) 50%, rgba(11,14,17,0.8) 100%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <p
            className="font-serif text-gold text-center tracking-wider text-shadow-sm"
            style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.35em', opacity: 0.5 }}
          >
            Fait main aux Antilles
          </p>
        </div>
      </div>
    </div>
  );
}
