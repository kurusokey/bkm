'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/boutique', label: 'Nos punchs' },
    { href: '/coffrets', label: 'Coffrets' },
    { href: '/savoir-faire', label: 'Savoir-faire' },
    { href: '/a-propos', label: 'Notre histoire' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[90] transition-all duration-500 ease-out ${
        scrolled || isMenuOpen
          ? 'bg-ink/95 backdrop-blur-md border-b border-gold-muted/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${scrolled ? 'pb-4' : 'pb-6'}`}
        style={{ paddingTop: scrolled ? 'calc(env(safe-area-inset-top, 0px) + 20px)' : 'calc(env(safe-area-inset-top, 0px) + 28px)' }}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" aria-label="Accueil" className="w-6" />

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isActive(href) ? 'text-gold' : 'text-cream/80 hover:text-gold'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Panier + Burger */}
          <div className="flex items-center gap-5">
            <Link
              href="/panier"
              className="relative text-cream/80 hover:text-gold transition-colors duration-500"
              aria-label={`Panier (${totalItems} article${totalItems > 1 ? 's' : ''})`}
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

            {/* Burger mobile only */}
            <button
              className="md:hidden text-cream hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
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
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 pb-4 border-t border-gold-muted/20 pt-4 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block text-sm uppercase tracking-widest transition-colors duration-300 ${
                  isActive(href) ? 'text-gold' : 'text-cream hover:text-gold'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
