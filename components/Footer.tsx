'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Newsletter from './Newsletter';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-charcoal border-t border-gold-muted/10">

      {/* Newsletter — section généreuse et aérée */}
      <div className="px-6 py-16 text-center">
        <div className="mx-auto" style={{ maxWidth: '480px' }}>
          <Newsletter />
        </div>
      </div>

      {/* Séparateur décoratif */}
      <div className="flex items-center justify-center gap-4 px-6">
        <div className="h-px flex-1" style={{ maxWidth: '120px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.3))' }} />
        <span className="text-gold/30 text-xs">✦</span>
        <div className="h-px flex-1" style={{ maxWidth: '120px', background: 'linear-gradient(90deg, rgba(200,162,77,0.3), transparent)' }} />
      </div>

      {/* Identité */}
      <div className="px-6 py-10 text-center">
        <p className="font-serif text-gold text-sm tracking-wider mb-2">
          Bô Kay Mwen
        </p>
        <p className="text-cream-muted/45 text-xs tracking-wide">
          Punchs artisanaux · 100&nbsp;% local · 100&nbsp;% fait maison
        </p>
      </div>

      {/* Navigation principale */}
      <div className="px-6 pb-6 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/" className="text-xs text-cream-muted/60 hover:text-gold transition-colors tracking-wide">
            Accueil
          </Link>
          <span className="text-cream-muted/20 text-xs">·</span>
          <Link href="/boutique" className="text-xs text-cream-muted/60 hover:text-gold transition-colors tracking-wide">
            Nos punchs
          </Link>
          <span className="text-cream-muted/20 text-xs">·</span>
          <Link href="/a-propos" className="text-xs text-cream-muted/60 hover:text-gold transition-colors tracking-wide">
            Notre histoire
          </Link>
          <span className="text-cream-muted/20 text-xs">·</span>
          <Link href="/contact" className="text-xs text-cream-muted/60 hover:text-gold transition-colors tracking-wide">
            Contact
          </Link>
        </nav>
      </div>

      {/* Liens légaux */}
      <div className="px-6 pb-10 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/mentions-legales" className="text-[0.65rem] text-cream-muted/35 hover:text-cream-muted/70 transition-colors">
            Mentions légales
          </Link>
          <span className="text-cream-muted/20 text-[0.65rem]">·</span>
          <Link href="/cgv" className="text-[0.65rem] text-cream-muted/35 hover:text-cream-muted/70 transition-colors">
            CGV
          </Link>
          <span className="text-cream-muted/20 text-[0.65rem]">·</span>
          <Link href="/confidentialite" className="text-[0.65rem] text-cream-muted/35 hover:text-cream-muted/70 transition-colors">
            Confidentialité
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-gold-muted/10 py-5 px-6 text-center">
        <p className="text-cream-muted/30 text-xs tracking-wider mb-1">
          &copy; 2026 Bô Kay Mwen — Tous droits réservés.
        </p>
        <p className="text-cream-muted/20 text-[0.6rem] tracking-wide">
          L&apos;abus d&apos;alcool est dangereux pour la santé.
        </p>
      </div>

    </footer>
  );
}
