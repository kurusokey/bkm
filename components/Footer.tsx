'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Newsletter from './Newsletter';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-charcoal">

      {/* Filet tricolore — identité Antilles */}
      <div className="h-px w-full flex">
        <div className="flex-1" style={{ background: '#2A7C7B' }} />
        <div className="flex-1" style={{ background: '#C8A24D' }} />
        <div className="flex-1" style={{ background: '#8B2F3A' }} />
      </div>

      {/* Haut du footer : Marque + Newsletter côte à côte */}
      <div className="border-b border-gold/10">
        <div
          className="mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ maxWidth: '900px' }}
        >
          {/* Identité de marque */}
          <div>
            <p className="font-serif text-gold text-xl tracking-[0.3em] uppercase mb-4">
              Bô Kay Mwen
            </p>
            <div className="h-px w-14 mb-5" style={{ background: 'linear-gradient(90deg, #C8A24D, transparent)' }} />
            <p className="text-cream-muted text-sm leading-relaxed">
              Punchs artisanaux des Antilles.
            </p>
            <p className="text-cream-muted/60 text-xs mt-1 leading-relaxed">
              100&nbsp;% local · 100&nbsp;% fait maison.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:border-l lg:border-gold/10 lg:pl-12">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Navigation — 3 colonnes */}
      <div
        className="mx-auto px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10"
        style={{ maxWidth: '900px' }}
      >
        {/* Pages */}
        <div>
          <p className="font-serif text-gold text-[0.62rem] tracking-[0.28em] uppercase mb-6">
            Pages
          </p>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Accueil
            </Link>
            <Link href="/boutique" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Nos punchs
            </Link>
            <Link href="/coffrets" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Coffrets cadeaux
            </Link>
            <Link href="/a-propos" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Notre histoire
            </Link>
            <Link href="/contact" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Contact
            </Link>
          </nav>
        </div>

        {/* Légal */}
        <div>
          <p className="font-serif text-gold text-[0.62rem] tracking-[0.28em] uppercase mb-6">
            Légal
          </p>
          <nav className="flex flex-col gap-4">
            <Link href="/mentions-legales" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Mentions légales
            </Link>
            <Link href="/cgv" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              CGV
            </Link>
            <Link href="/confidentialite" className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300">
              Confidentialité
            </Link>
          </nav>
        </div>

        {/* Suivez-nous */}
        <div>
          <p className="font-serif text-gold text-[0.62rem] tracking-[0.28em] uppercase mb-6">
            Suivez-nous
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-muted/70 hover:text-gold transition-colors duration-300"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bandeau légal alcool */}
      <div className="border-t border-gold/10 bg-ink/40">
        <div
          className="mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          style={{ maxWidth: '900px' }}
        >
          <p className="text-cream-muted/55 text-xs leading-relaxed">
            🔞 <strong className="text-cream-muted/70">La vente d&apos;alcool est interdite aux personnes de moins de 18 ans.</strong>
            <br className="sm:hidden" />
            {' '}Licence de vente à emporter n° <span className="text-cream-muted/70">[À COMPLÉTER]</span>
          </p>
          <p className="text-cream-muted/45 text-xs leading-relaxed sm:text-right">
            L&apos;abus d&apos;alcool est dangereux pour la santé.
            <br />
            À consommer avec modération.
          </p>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gold/10">
        <div
          className="mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ maxWidth: '900px' }}
        >
          <p className="text-cream-muted/35 text-xs tracking-wider">
            &copy; 2026 Bô Kay Mwen — Tous droits réservés.
          </p>
          <nav className="flex items-center gap-4">
            <Link href="/mentions-legales" className="text-[0.65rem] text-cream-muted/30 hover:text-cream-muted/60 transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="text-[0.65rem] text-cream-muted/30 hover:text-cream-muted/60 transition-colors">CGV</Link>
            <Link href="/confidentialite" className="text-[0.65rem] text-cream-muted/30 hover:text-cream-muted/60 transition-colors">Confidentialité</Link>
          </nav>
        </div>
      </div>

    </footer>
  );
}
