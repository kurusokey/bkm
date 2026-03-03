'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/boutique',      label: 'Nos punchs'     },
  { href: '/coffrets',      label: 'Coffrets'       },
  { href: '/savoir-faire',  label: 'Savoir-faire'   },
  { href: '/a-propos',      label: 'Notre histoire' },
  { href: '/newsletter',    label: 'Newsletter'     },
  { href: '/contact',       label: 'Contact'        },
];

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname === '/' ||
    pathname.startsWith('/produits/')
  ) return null;

  return (
    <footer style={{ background: '#060e07' }}>

      {/* Filet tricolore */}
      <div className="h-px w-full flex">
        <div className="flex-1" style={{ background: '#2A7C7B' }} />
        <div className="flex-1" style={{ background: '#C8A24D' }} />
        <div className="flex-1" style={{ background: '#8B2F3A' }} />
      </div>

      {/* Contenu centré */}
      <div className="flex flex-col items-center text-center px-8" style={{ paddingTop: '64px', paddingBottom: '48px', gap: '40px' }}>

        {/* Marque */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <p className="font-serif text-gold tracking-[0.35em] uppercase" style={{ fontSize: '1.3rem' }}>
            Bô Kay Mwen
          </p>
          <p className="font-serif italic" style={{ fontSize: '0.8rem', color: 'rgba(232,224,208,0.55)' }}>
            Punchs artisanaux des Antilles
          </p>
        </div>

        {/* Séparateur */}
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,162,77,0.4), transparent)' }} />

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center" style={{ gap: '32px' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors duration-300 hover:text-gold"
              style={{
                fontSize: '0.85rem',
                color: pathname === href ? '#C8A24D' : 'rgba(232,224,208,0.7)',
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-300 hover:opacity-60"
          style={{ color: 'rgba(232,224,208,0.55)' }}
          aria-label="Instagram"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

      </div>

      {/* Bas de page */}
      <div style={{ borderTop: '1px solid rgba(200,162,77,0.08)', paddingTop: '24px', paddingBottom: '24px' }}>
        <div className="flex flex-col items-center text-center px-8" style={{ gap: '10px' }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(232,224,208,0.4)', lineHeight: '1.8' }}>
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
          <div className="flex flex-wrap justify-center" style={{ gap: '20px' }}>
            {[
              { href: '/mentions-legales', label: 'Mentions légales' },
              { href: '/cgv',              label: 'CGV' },
              { href: '/confidentialite',  label: 'Confidentialité' },
              { href: '/admin',            label: 'Dashboard'        },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-gold transition-colors duration-300"
                style={{ fontSize: '0.65rem', color: 'rgba(232,224,208,0.3)', letterSpacing: '0.06em' }}
              >
                {label}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: '0.62rem', color: 'rgba(232,224,208,0.2)', letterSpacing: '0.08em' }}>
            &copy; 2026 Bô Kay Mwen
          </p>
        </div>
      </div>

    </footer>
  );
}
