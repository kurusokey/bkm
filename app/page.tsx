import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(3);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Rhums Arrangés Artisanaux
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez nos rhums arrangés macérés avec des ingrédients naturels,
            pour une expérience gustative unique et authentique.
          </p>
          <Link
            href="/boutique"
            className="inline-block bg-white text-amber-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-100 transition"
          >
            Découvrir nos produits
          </Link>
        </div>
      </section>

      {/* Warning Section */}
      <section className="bg-red-50 border-l-4 border-red-500 p-4 my-8 container mx-auto">
        <p className="text-red-800 font-semibold text-center">
          ⚠️ L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nos Produits Phares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/boutique"
            className="inline-block bg-amber-900 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition"
          >
            Voir tous nos rhums
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-amber-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Notre Savoir-Faire</h2>
            <p className="text-lg text-gray-700 mb-4">
              Chaque rhum arrangé est préparé artisanalement avec des ingrédients
              soigneusement sélectionnés. Nous laissons macérer nos créations
              pendant plusieurs mois pour développer des arômes riches et complexes.
            </p>
            <Link
              href="/a-propos"
              className="inline-block text-amber-900 font-semibold hover:text-amber-700 transition"
            >
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}