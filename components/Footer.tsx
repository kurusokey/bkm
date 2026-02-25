'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Newsletter from './Newsletter';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-charcoal border-t border-gold-muted/10">
      <div className="flex justify-center w-full">
        <div className="w-full flex flex-col items-center text-center px-6 py-12" style={{ maxWidth: '36rem' }}>
          {/* Newsletter */}
          <div className="mb-10 w-full">
            <Newsletter />
          </div>
          <div className="gold-line-wide mb-8" />
          <p className="font-serif text-gold text-sm tracking-wider mb-3">
            Bô Kay Mwen
          </p>
          <p className="text-cream-muted/70 text-xs leading-relaxed mb-8">
            Punchs artisanaux — 100% local et 100% fait maison.
          </p>
          <div className="gold-line-wide mb-6" />
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
            <Link href="/mentions-legales" className="text-xs text-cream-muted/50 hover:text-gold transition-colors">
              Mentions légales
            </Link>
            <span className="text-cream-muted/30 text-xs">·</span>
            <Link href="/cgv" className="text-xs text-cream-muted/50 hover:text-gold transition-colors">
              CGV
            </Link>
            <span className="text-cream-muted/30 text-xs">·</span>
            <Link href="/confidentialite" className="text-xs text-cream-muted/50 hover:text-gold transition-colors">
              Confidentialité
            </Link>
            <span className="text-cream-muted/30 text-xs">·</span>
            <Link href="/contact" className="text-xs text-cream-muted/50 hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
          <p className="text-cream-muted/40 text-xs tracking-wider">
            &copy; 2026 Bô Kay Mwen — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
