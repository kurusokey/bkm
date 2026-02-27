'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Newsletter from './Newsletter';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-charcoal border-t border-gold-muted/10">

      {/* Newsletter — bande pleine largeur */}
      <div className="border-b border-gold-muted/10 py-10 px-6">
        <div className="mx-auto w-full" style={{ maxWidth: '36rem' }}>
          <Newsletter />
        </div>
      </div>

      {/* Corps — 4 colonnes */}
      <div
        className="mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        style={{ maxWidth: '72rem' }}
      >

        {/* Colonne 1 — Identité */}
        <div className="col-span-2 lg:col-span-1 flex flex-col">
          <p className="font-serif text-gold text-sm tracking-wider mb-3">
            Bô Kay Mwen
          </p>
          <div
            className="mb-5"
            style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, var(--gold), transparent)',
            }}
          />
          <p className="text-cream-muted/60 text-xs leading-relaxed mb-2">
            Punchs artisanaux des Antilles.
          </p>
          <p className="text-cream-muted/60 text-xs leading-relaxed mb-2">
            100&nbsp;% local, 100&nbsp;% fait maison.
          </p>
          <p className="text-cream-muted/35 text-xs leading-relaxed mt-3">
            Fruits tropicaux, épices locales,<br />
            recettes transmises avec passion.
          </p>
        </div>

        {/* Colonne 2 — Explorer */}
        <div className="flex flex-col">
          <p className="font-serif text-gold/60 text-[0.65rem] tracking-[0.22em] uppercase mb-5">
            Explorer
          </p>
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Accueil
            </Link>
            <Link href="/boutique" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Nos punchs
            </Link>
            <Link href="/a-propos" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Istwa an nou
            </Link>
            <Link href="/contact" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Colonne 3 — Légal */}
        <div className="flex flex-col">
          <p className="font-serif text-gold/60 text-[0.65rem] tracking-[0.22em] uppercase mb-5">
            Légal
          </p>
          <nav className="flex flex-col gap-3">
            <Link href="/mentions-legales" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgv" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              CGV
            </Link>
            <Link href="/confidentialite" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Confidentialité
            </Link>
          </nav>
        </div>

        {/* Colonne 4 — Contact */}
        <div className="flex flex-col">
          <p className="font-serif text-gold/60 text-[0.65rem] tracking-[0.22em] uppercase mb-5">
            Contact
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="text-xs text-cream-muted/55 hover:text-gold transition-colors">
              Nous écrire
            </Link>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cream-muted/55 hover:text-gold transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cream-muted/55 hover:text-gold transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gold-muted/10 py-5 px-6">
        <div
          className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ maxWidth: '72rem' }}
        >
          <p className="text-cream-muted/40 text-xs tracking-wider">
            &copy; 2026 Bô Kay Mwen — Tous droits réservés.
          </p>
          <p className="text-cream-muted/30 text-xs">
            L&apos;abus d&apos;alcool est dangereux pour la santé.
          </p>
        </div>
      </div>

    </footer>
  );
}
