import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = (product.price_cents / 100).toFixed(2);

  return (
    <Link href={`/produits/${product.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
          <span className="text-6xl">🍹</span>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          
          {product.flavor && (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mb-2">
              {product.flavor}
            </span>
          )}
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-amber-900">{price} €</span>
            {product.alcohol_degree && (
              <span className="text-sm text-gray-500">{product.alcohol_degree}°</span>
            )}
          </div>
          
          {product.stock_quantity > 0 ? (
            <span className="text-green-600 text-sm">En stock</span>
          ) : (
            <span className="text-red-600 text-sm">Rupture de stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}