import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { getAllProducts } from '@/lib/products';

export default function BoutiquePage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero banner — cinematic */}
      <div className="relative h-[50vh] min-h-[350px] md:h-[60vh] flex items-end justify-center overflow-hidden pb-16 md:pb-24">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28">
        {/* Product grid */}
        {products.length === 0 ? (
          <p className="text-center text-cream-muted py-20 text-lg">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 150} direction="up" distance={50}>
                <ProductCard
                  product={product}
                  index={index}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
