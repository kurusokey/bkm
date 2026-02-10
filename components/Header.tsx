'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-amber-900 text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-amber-200 transition">
            🍹 Rhums Arrangés
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-amber-200 transition">
              Accueil
            </Link>
            <Link href="/boutique" className="hover:text-amber-200 transition">
              Boutique
            </Link>
            <Link href="/a-propos" className="hover:text-amber-200 transition">
              À propos
            </Link>
          </nav>

          <Link
            href="/panier"
            className="relative bg-amber-700 px-4 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            🛒 Panier
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}