'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
        <Link href="/boutique" className="text-amber-900 hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const price = (product.price_cents / 100).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/boutique" className="text-amber-900 hover:underline mb-6 inline-block">
        ← Retour à la boutique
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center h-96">
          <span className="text-9xl">🍹</span>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.flavor && (
            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded mb-4">
              {product.flavor}
            </span>
          )}

          <p className="text-3xl font-bold text-amber-900 mb-6">{price} €</p>

          <div className="space-y-3 mb-6 text-gray-700">
            {product.alcohol_degree && (
              <p>🌡️ Degré d'alcool : {product.alcohol_degree}°</p>
            )}
            {product.volume_ml && (
              <p>🍾 Volume : {product.volume_ml} ml</p>
            )}
            <p>
              📦 Stock : {product.stock_quantity > 0 ? (
                <span className="text-green-600 font-semibold">En stock ({product.stock_quantity} disponibles)</span>
              ) : (
                <span className="text-red-600 font-semibold">Rupture de stock</span>
              )}
            </p>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className={`w-full py-4 rounded-lg font-bold text-lg transition ${
              product.stock_quantity > 0
                ? 'bg-amber-900 text-white hover:bg-amber-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {added ? '✓ Ajouté au panier !' : 'Ajouter au panier'}
          </button>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
            <p className="text-red-800 text-sm font-semibold">
              ⚠️ L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}