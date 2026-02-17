'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-charcoal border-t border-gold-muted/10">
      <div className="flex justify-center w-full">
        <div className="w-full flex flex-col items-center text-center px-6 py-12" style={{ maxWidth: '36rem' }}>
          <p className="font-serif text-gold text-sm tracking-wider mb-3">
            Bô Kay Mwen
          </p>
          <p className="text-cream-muted/70 text-xs leading-relaxed mb-8">
            Rhums arrangés artisanaux — 100% local et 100% fait maison.
          </p>
          <div className="gold-line-wide mb-8" />
          <p className="text-cream-muted/40 text-xs tracking-wider">
            &copy; 2026 Bô Kay Mwen — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
