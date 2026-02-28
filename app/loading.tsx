export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0B0E11' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinner doré */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-label="Chargement…"
          className="animate-spin"
          style={{ animationDuration: '1.2s' }}
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(200,162,77,0.12)"
            strokeWidth="2"
          />
          <path
            d="M24 4 A20 20 0 0 1 44 24"
            stroke="#C8A24D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p
          className="font-serif text-gold/50 uppercase tracking-[0.3em]"
          style={{ fontSize: '0.6rem' }}
        >
          Bô Kay Mwen
        </p>
      </div>
    </div>
  );
}
