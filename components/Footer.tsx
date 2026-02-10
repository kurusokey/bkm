import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Rhums Arrangés</h3>
            <p className="text-gray-400 text-sm">
              Découvrez nos rhums arrangés artisanaux, macérés avec des ingrédients naturels.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-gray-400 hover:text-white">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-gray-400 hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: contact@rhums-arranges.fr<br />
              Tél: 01 23 45 67 89
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="mb-2 font-semibold text-red-400">
            L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
          <p>&copy; 2026 Rhums Arrangés. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}