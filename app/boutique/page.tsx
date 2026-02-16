import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/products';

export default function BoutiquePage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[350px] flex items-end justify-center overflow-hidden pb-16">
        <Image
          src="/images/spirits.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink z-[1]" />

        <div className="relative z-10 text-center">
          <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
            <div className="gold-line-wide mx-auto" />
          </ScrollReveal>
        </div>
      </div>

      {/* Product list */}
      <section className="max-w-md mx-auto px-6 py-16">
        {products.length === 0 ? (
          <p className="text-center text-cream-muted py-20 text-lg">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <ProductList products={products} />
        )}
      </section>
    </div>
  );
}
