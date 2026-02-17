import Image from 'next/image';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/products';

export default function BoutiquePage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen relative">
      {/* Image champ de cannes — fond fixe pleine page */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/sugarcane-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay vert semi-transparent pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(13,31,21,0.45) 0%, rgba(13,31,21,0.55) 40%, rgba(26,46,26,0.6) 70%, rgba(42,31,14,0.65) 100%)' }}
        />
      </div>

      {/* Contenu scrollable par-dessus le fond */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Hero — espace pour voir le champ */}
        <div className="flex flex-col items-center justify-end" style={{ height: '50vh', minHeight: '320px', paddingBottom: '40px' }}>
          <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)', marginBottom: '20px' }} />
          <p
            className="font-serif text-gold tracking-wider text-center"
            style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.7 }}
          >
            Champ de cannes
          </p>
        </div>

        {/* Zone produits avec fond semi-transparent */}
        <div className="flex justify-center w-full" style={{ background: 'linear-gradient(180deg, rgba(13,31,21,0.5) 0%, rgba(26,46,26,0.55) 50%, rgba(42,31,14,0.5) 100%)', backdropFilter: 'blur(2px)' }}>
          <div
            className="w-full"
            style={{
              maxWidth: '340px',
              padding: '40px 20px 60px',
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

        {/* Footer — on revoit le champ à travers */}
        <div className="flex items-center justify-center" style={{ height: '30vh', minHeight: '200px' }}>
          <p
            className="font-serif text-gold text-center tracking-wider text-shadow-sm"
            style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.35em', opacity: 0.5 }}
          >
            Né dans les champs de cannes
          </p>
        </div>
      </div>
    </div>
  );
}
