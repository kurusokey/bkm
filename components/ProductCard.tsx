import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductImage } from '@/lib/productImages';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const price = (product.price_cents / 100).toFixed(2);

  return (
    <div className="group relative">
      {/* Image area — tall, rounded, no visible border */}
      <div className="relative h-80 md:h-[420px] bg-charcoal/50 rounded-2xl overflow-hidden mb-6">
        <Image
          src={getProductImage(product.slug, product.image_url)}
          alt={product.name}
          fill
          className="object-contain p-8 md:p-10 group-hover:scale-110 transition-transform duration-700 ease-out"
          style={{ objectFit: 'contain' }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


        {/* Collection number */}
        <div className="absolute top-5 left-5 text-cream-muted/30 text-sm font-serif tracking-widest">
          N&deg;{String(index + 1).padStart(2, '0')}
        </div>

        {/* CTA overlay on hover — slides up */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <Link
            href={`/produits/${product.slug}`}
            className="block w-full text-center py-3 bg-gold text-ink text-xs font-semibold uppercase tracking-[0.15em] rounded-lg transition-colors duration-300 hover:bg-gold-light"
          >
            Decouvrir
          </Link>
        </div>
      </div>

      {/* Content — minimal, below the image */}
      <div className="px-2">
        <h3 className="text-lg font-serif text-gold mb-2 tracking-wider">
          {product.name}
        </h3>

        <p className="text-sm text-cream-muted leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-semibold text-warm-white tracking-wide">
            {price}&euro;
          </span>
          <span className="text-xs text-cream-muted/60 uppercase tracking-wider">
            {product.volume || '70cl'}
          </span>
        </div>
      </div>
    </div>
  );
}
