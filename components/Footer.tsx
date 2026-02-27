'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Newsletter from './Newsletter';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="bg-ink relative overflow-hidden">

      {/* Filet doré supérieur */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(200,162,77,0.5) 50%, transparent 100%)' }}
      />

      {/* — Identité de marque — */}
      <div className="text-center pt-20 pb-14 px-6">
        <div className="flex items-center justify-center gap-5 mb-7">
          <div
            className="h-px w-16"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.45))' }}
          />
          <span style={{ color: 'rgba(200,162,77,0.45)', fontSize: '0.55rem', letterSpacing: '0.2em' }}>✦</span>
          <div
            className="h-px w-16"
            style={{ background: 'linear-gradient(90deg, rgba(200,162,77,0.45), transparent)' }}
          />
        </div>
        <p className="font-serif text-gold tracking-[0.35em] text-base uppercase mb-3">
          Bô Kay Mwen
        </p>
        <p className="text-cream-muted/40 text-[0.68rem] tracking-[0.18em] uppercase">
          Punchs artisanaux des Antilles
        </p>
      </div>

      {/* Séparateur fin */}
      <div className="flex justify-center px-6">
        <div
          className="h-px w-full"
          style={{ maxWidth: '480px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.15), transparent)' }}
        />
      </div>

      {/* — Newsletter — */}
      <div className="px-6 py-16">
        <div className="mx-auto" style={{ maxWidth: '420px' }}>
          <Newsletter />
        </div>
      </div>

      {/* Séparateur fin */}
      <div className="flex justify-center px-6">
        <div
          className="h-px w-full"
          style={{ maxWidth: '760px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.15), transparent)' }}
        />
      </div>

      {/* — Navigation — 3 colonnes — */}
      <div
        className="mx-auto px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left"
        style={{ maxWidth: '760px' }}
      >

        {/* Explorer */}
        <div>
          <p
            className="font-serif text-[0.6rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: 'rgba(200,162,77,0.55)' }}
          >
            Explorer
          </p>
          <nav className="flex flex-col gap-4">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/boutique', label: 'Nos punchs' },
              { href: '/a-propos', label: 'Notre histoire' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.72rem] text-cream-muted/45 hover:text-gold transition-colors duration-300 tracking-[0.08em]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Légal */}
        <div>
          <p
            className="font-serif text-[0.6rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: 'rgba(200,162,77,0.55)' }}
          >
            Légal
          </p>
          <nav className="flex flex-col gap-4">
            {[
              { href: '/mentions-legales', label: 'Mentions légales' },
              { href: '/cgv', label: 'CGV' },
              { href: '/confidentialite', label: 'Confidentialité' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.72rem] text-cream-muted/45 hover:text-gold transition-colors duration-300 tracking-[0.08em]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Suivez-nous */}
        <div>
          <p
            className="font-serif text-[0.6rem] tracking-[0.3em] uppercase mb-7"
            style={{ color: 'rgba(200,162,77,0.55)' }}
          >
            Suivez-nous
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.72rem] text-cream-muted/45 hover:text-gold transition-colors duration-300 tracking-[0.08em]"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.72rem] text-cream-muted/45 hover:text-gold transition-colors duration-300 tracking-[0.08em]"
            >
              Facebook
            </a>
          </div>
        </div>

      </div>

      {/* Séparateur fin */}
      <div className="flex justify-center px-6">
        <div
          className="h-px w-full"
          style={{ maxWidth: '760px', background: 'rgba(200,162,77,0.08)' }}
        />
      </div>

      {/* — Copyright — */}
      <div className="text-center px-6 py-10">
        <p className="text-cream-muted/25 text-[0.62rem] tracking-[0.2em] uppercase mb-2">
          &copy; 2026 Bô Kay Mwen — Tous droits réservés
        </p>
        <p className="text-cream-muted/18 text-[0.58rem] tracking-[0.12em]"
          style={{ color: 'rgba(155,146,133,0.18)' }}
        >
          L&apos;abus d&apos;alcool est dangereux pour la santé.
        </p>
      </div>

    </footer>
  );
}
