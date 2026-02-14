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
    <main className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="hero-pirate relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Logo Ancre */}
          <div className="flex justify-center mb-6 animate-bounce">
            <svg className="w-20 h-20 opacity-80" viewBox="0 0 24 24" fill="var(--pirate-gold)">
              <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8c-1.1 0-2 .9-2 2v8l-3 2a2 2 0 1 0 0 4h10a2 2 0 1 0 0-4l-3-2v-8c0-1.1-.9-2-2-2zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
          </div>

          {/* Titre principal */}
          <h1 className="title-pirate text-6xl md:text-8xl font-bold mb-10 animate-fade-in">
            Rhums Arrangés<br />
            <span className="text-pirate-gold">Artisanaux</span>
          </h1>

          {/* Sous-titre */}
          <p className="subtitle-pirate text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Découvrez nos rhums arrangés macérés avec les fruits des îles de la Caraïbe,
            <br />pour des <span className="text-caribbean-blue font-bold">saveurs authentiques et exotiques</span>
          </p>

          {/* CTA Boutons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/boutique"
              className="btn-pirate inline-block px-10 py-5 rounded-xl font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              ⚓ Explorer la Cale
            </Link>
            <Link
              href="/a-propos"
              className="btn-pirate-secondary inline-block px-10 py-5 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              📜 Notre Histoire
            </Link>
          </div>

          {/* Divider décoratif */}
          <div className="mt-16 flex items-center justify-center gap-4 opacity-50">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pirate-gold to-transparent"></div>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="var(--pirate-gold)">
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pirate-gold to-transparent"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-parchment opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ========== WARNING SECTION ========== */}
      <section className="bg-gradient-to-r from-blood-red/20 via-blood-red/10 to-blood-red/20 border-t-4 border-b-4 border-blood-red py-8 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="text-4xl animate-pulse">⚠️</span>
            <p className="text-red-200 font-bold text-lg md:text-xl">
              L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
            </p>
            <span className="text-4xl animate-pulse">🍹</span>
          </div>
        </div>
        
        {/* Texture vagues danger */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blood-red/30 to-transparent"></div>
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="py-20 px-4 bg-pirate-dark relative">
        <div className="container mx-auto max-w-7xl">
          {/* Titre section */}
          <div className="text-center mb-16">
            <h2 className="title-pirate text-5xl font-bold mb-6">
              🏴‍☠️ Nos Produits Phares
            </h2>
            <p className="subtitle-pirate text-xl max-w-2xl mx-auto">
              Une sélection des meilleurs rhums arrangés de la cale du capitaine
            </p>
          </div>

          {/* Grille produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-parchment-dark text-xl">
                  🏴‍☠️ La cale est vide, revenez plus tard moussaillon !
                </p>
              </div>
            )}
          </div>

          {/* CTA Voir tous les produits */}
          <div className="text-center">
            <Link
              href="/boutique"
              className="btn-pirate inline-block px-12 py-5 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Voir tous les Rhums →
            </Link>
          </div>
        </div>

        {/* Décorations background */}
        <div className="absolute top-20 left-10 opacity-5 pointer-events-none">
          <svg className="w-64 h-64" viewBox="0 0 200 200" fill="var(--pirate-gold)">
            <circle cx="100" cy="100" r="80"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 pointer-events-none">
          <svg className="w-64 h-64" viewBox="0 0 200 200" fill="var(--caribbean-blue)">
            <circle cx="100" cy="100" r="80"/>
          </svg>
        </div>
      </section>

      {/* ========== NOTRE SAVOIR-FAIRE ========== */}
      <section className="py-20 px-4 bg-gradient-to-b from-pirate-brown to-pirate-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div>
              <h2 className="title-pirate text-4xl md:text-5xl font-bold mb-8">
                🍹 Les Secrets de la Cale
              </h2>
              <div className="space-y-6 text-lg text-parchment-dark">
                <p className="leading-relaxed">
                  Nos rhums arrangés sont <strong className="text-pirate-gold">macérés à la main</strong> dans 
                  les traditions des flibustiers des Caraïbes. Chaque bouteille contient des fruits exotiques 
                  soigneusement sélectionnés : <em>vanille de Tahiti, ananas Victoria, mangue carotte...</em>
                </p>
                <p className="leading-relaxed">
                  Dans les cales du <strong className="text-rum-amber">Capitaine Blackbeard</strong>, 
                  le temps fait son œuvre pendant plusieurs mois pour créer des saveurs 
                  <span className="text-caribbean-blue font-bold"> authentiques et uniques</span>.
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pirate-gold text-2xl">⚓</span>
                    <span>Macération artisanale de 3 à 12 mois</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pirate-gold text-2xl">🌴</span>
                    <span>Fruits des îles certifiés bio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pirate-gold text-2xl">🏴‍☠️</span>
                    <span>Recettes héritées des pirates des Caraïbes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative">
              <div className="card-pirate p-8 text-center">
                <svg className="w-full h-64 mx-auto mb-6" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="80" fill="var(--rum-amber)" opacity="0.3"/>
                  <rect x="70" y="40" width="60" height="120" rx="30" fill="var(--rum-amber)" opacity="0.6"/>
                  <rect x="75" y="45" width="50" height="100" rx="25" fill="var(--rum-amber)"/>
                  <ellipse cx="100" cy="50" rx="20" ry="8" fill="var(--pirate-wood)"/>
                  <text x="100" y="110" fontSize="40" fill="var(--parchment)" textAnchor="middle" fontFamily="Pirata One">🍹</text>
                </svg>
                <p className="text-pirate-brown font-bold text-xl">
                  "Un trésor dans chaque bouteille"
                </p>
                <p className="text-pirate-wood italic mt-2">
                  - Capitaine Blackbeard
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fond texture bois */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] opacity-20"></div>
        </div>
      </section>

      {/* ========== CTA FINALE ========== */}
      <section className="py-24 px-4 bg-gradient-to-r from-ocean-night via-caribbean-teal to-ocean-night relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="title-pirate text-5xl md:text-6xl font-bold mb-8">
            Prêt à Lever l'Ancre ?
          </h2>
          <p className="text-2xl text-parchment mb-12 leading-relaxed">
            Rejoignez l'équipage de Blackbeard et recevez nos nouveautés,
            <br />recettes exclusives et <span className="text-pirate-gold font-bold">offres de moussaillon</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="votre.email@caraibe.fr"
              className="flex-1 px-6 py-4 rounded-lg bg-parchment text-pirate-dark font-semibold border-4 border-pirate-wood focus:border-pirate-gold outline-none transition-all"
            />
            <button className="btn-pirate px-8 py-4 rounded-lg whitespace-nowrap">
              Embarquer 🏴‍☠️
            </button>
          </div>
        </div>

        {/* Vagues animées */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path fill="var(--pirate-black)" d="M0,50 Q300,100 600,50 T1200,50 L1200,100 L0,100 Z">
                        </svg>
        </div>
      </section>
    </main>
  );
}
