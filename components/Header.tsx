'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled || isMenuOpen
          ? 'bg-ink/95 backdrop-blur-md border-b border-gold-muted/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="flex justify-between items-center">
          {/* Logo (hidden) */}
          <Link href="/" className="w-0 h-0 overflow-hidden absolute" aria-label="Accueil" />
          <div />

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-xs text-cream/80 uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
            >
              Bô Kay Mwen
            </Link>
            <Link
              href="/boutique"
              className="text-xs text-cream/80 uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
            >
              Ròm aranjé
            </Link>
            <Link
              href="/a-propos"
              className="text-xs text-cream/80 uppercase tracking-[0.2em] hover:text-gold transition-colors duration-500"
            >
              Istwa an nou
            </Link>

            {/* Panier */}
            <Link
              href="/panier"
              className="relative text-cream/80 hover:text-gold transition-colors duration-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-ink text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="md:hidden text-cream hover:text-gold transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gold-muted/20 pt-4 space-y-4 animate-fade-in">
            <Link
              href="/"
              className="block text-sm text-cream uppercase tracking-widest hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Bô Kay Mwen
            </Link>
            <Link
              href="/boutique"
              className="block text-sm text-cream uppercase tracking-widest hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Ròm aranjé
            </Link>
            <Link
              href="/a-propos"
              className="block text-sm text-cream uppercase tracking-widest hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Istwa an nou
            </Link>
            <Link
              href="/panier"
              className="block text-sm text-cream uppercase tracking-widest hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Pani&eacute; ({totalItems})
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
