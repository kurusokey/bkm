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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Notre Boutique</h1>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <p className="text-red-800 font-semibold text-center">
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 py-12">
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}