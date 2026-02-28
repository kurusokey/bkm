import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ background: 'linear-gradient(180deg, #1A1208 0%, #0B0E11 100%)' }}
    >
      {/* Icône */}
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="#C8A24D" strokeWidth="1.5" fill="rgba(200,162,77,0.06)" />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="#C8A24D"
            fontSize="20"
            fontFamily="serif"
            opacity="0.8"
          >
            404
          </text>
        </svg>
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
        Page introuvable
      </p>
      <h1 className="font-serif text-2xl text-gold tracking-wide mb-3">
        Cette page n&apos;existe pas
      </h1>
      <p className="text-cream-muted/60 text-sm leading-relaxed mb-10" style={{ maxWidth: '340px' }}>
        La page que vous cherchez a peut-être été déplacée ou n&apos;existe plus.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link href="/boutique" className="btn-luxury-filled">
          Voir nos punchs
        </Link>
        <Link href="/" className="text-sm text-cream-muted/60 hover:text-gold transition-colors">
          Retour à l&apos;accueil
        </Link>
      </div>

      <p className="text-cream/15 text-xs mt-10">
        L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
