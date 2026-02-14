import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export default async function BoutiquePage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-noir-profond pt-24 pb-16">
      <div className="container mx-auto px-8">
        {/* Titre section */}
        <h1 className="section-title">
          La Collection
        </h1>
        <div className="section-divider"></div>
        <p className="section-subtitle">
          Découvrez nos rhums arrangés artisanaux, élaborés avec les meilleurs fruits des Caraïbes
        </p>

        {/* Message d'avertissement */}
        <div className="warning-message max-w-2xl mx-auto mb-16">
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </div>

        {/* Grille de produits */}
        {products.length === 0 ? (
          <p className="text-center text-gris-pierre py-12">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
