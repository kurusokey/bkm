'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-noir-profond/85 backdrop-blur-sm border-b border-or-vieilli/15 z-50">
      <nav className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/"
            className="text-2xl font-serif text-ivoire tracking-wider hover:text-or-vieilli transition-colors"
          >
            BLACKBEARD
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/boutique" 
              className="text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
            >
              Collection
            </Link>
            <Link 
              href="/a-propos" 
              className="text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
            >
              La Cave
            </Link>
            
            {/* Panier */}
            <Link 
              href="/panier"
              className="relative text-ivoire hover:text-or-vieilli transition-colors"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-or-vieilli text-noir-profond text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button 
            className="md:hidden text-ivoire"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-or-vieilli/15 pt-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              href="/boutique" 
              className="block text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collection
            </Link>
            <Link 
              href="/a-propos" 
              className="block text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              La Cave
            </Link>
            <Link 
              href="/panier" 
              className="block text-sm text-ivoire uppercase tracking-widest hover:text-or-vieilli transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Panier ({totalItems})
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
