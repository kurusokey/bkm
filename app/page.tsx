import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
          Rhums Arrangés Artisanaux
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Découvrez notre sélection de rhums arrangés authentiques, 
          passionnément créés selon les traditions artisanales
        </p>
        <Link 
          href="/boutique"
          className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-700 transition"
        >
          Découvrir nos produits
        </Link>
      </div>

      {/* Avertissement Santé */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 md:mx-auto md:max-w-4xl mb-12">
        <p className="text-red-800 font-semibold text-center">
          ⚠️ L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌴</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Recettes Traditionnelles</h3>
            <p className="text-gray-600">
              Des recettes authentiques transmises de génération en génération
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Ingrédients Naturels</h3>
            <p className="text-gray-600">
              Fruits frais et épices sélectionnés avec soin
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Fabrication Artisanale</h3>
            <p className="text-gray-600">
              Macération longue pour des saveurs exceptionnelles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}