import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-gold-muted/10">
      {/* Reassurance bar */}
      <div className="border-b border-gold-muted/10 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-4">
              <svg className="w-6 h-6 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-cream text-sm tracking-wider">Livraison soignee et suivie</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <svg className="w-6 h-6 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-cream text-sm tracking-wider">Paiement securise et protege</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <svg className="w-6 h-6 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-cream text-sm tracking-wider">Une equipe a votre ecoute</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          {/* Logo & Description — takes 2 columns */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl md:text-3xl text-gold tracking-widest mb-6">
              BÔ KAY MWEN
            </h3>
            <div className="gold-line mb-6" />
            <p className="text-cream-muted leading-relaxed text-sm max-w-sm">
              Planteurs artisanaux elabores avec les meilleurs fruits des iles de la Caraibe.
              100% local, 100% fait maison.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs text-gold uppercase tracking-[0.2em] mb-6 font-serif">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-cream-muted hover:text-gold transition-colors duration-500 text-sm">
                  Bô Kay Mwen
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-cream-muted hover:text-gold transition-colors duration-500 text-sm">
                  Nos rhums arrangés
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-cream-muted hover:text-gold transition-colors duration-500 text-sm">
                  L&apos;art du planteur
                </Link>
              </li>
              <li>
                <Link href="/panier" className="text-cream-muted hover:text-gold transition-colors duration-500 text-sm">
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs text-gold uppercase tracking-[0.2em] mb-6 font-serif">Suivez-nous</h4>
            <div className="flex gap-5">
              <a href="#" className="text-cream-muted hover:text-gold transition-all duration-500" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z"/>
                </svg>
              </a>
              <a href="#" className="text-cream-muted hover:text-gold transition-all duration-500" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-cream-muted hover:text-gold transition-all duration-500" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line-wide mx-auto mb-12" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-muted/60 text-xs tracking-wider">
            &copy; {currentYear} Bô Kay Mwen. Tous droits reserves.
          </p>
          <p className="text-cream-muted/40 text-xs tracking-wider">
            L&apos;abus d&apos;alcool est dangereux pour la sante. A consommer avec moderation.
          </p>
        </div>
      </div>
    </footer>
  );
}
