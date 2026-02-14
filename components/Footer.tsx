import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pirate-black border-t-4 border-pirate-gold relative overflow-hidden">
      {/* Carte au trésor en fond */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M100,50 Q200,100 300,50 T500,50 L550,150 Q600,200 650,150 L700,350 Q650,300 600,350 L400,350 Q350,300 300,350 L100,350 Q50,300 50,200 Z" 
                fill="var(--pirate-wood)" opacity="0.3"/>
          <circle cx="400" cy="200" r="30" fill="var(--pirate-gold)" opacity="0.6"/>
          <text x="400" y="210" fontSize="30" fill="var(--blood-red)" textAnchor="middle" fontFamily="Pirata One">✕</text>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Colonne 1 - Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-10 h-10 text-pirate-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8c-1.1 0-2 .9-2 2v8l-3 2a2 2 0 1 0 0 4h10a2 2 0 1 0 0-4l-3-2v-8c0-1.1-.9-2-2-2z"/>
              </svg>
              <h3 className="text-2xl font-bold text-pirate-gold font-['Pirata_One']">
                Blackbeard Rhums
              </h3>
            </div>
            <p className="text-parchment-dark leading-relaxed mb-4">
              Rhums arrangés artisanaux élaborés avec les fruits des îles de la Caraïbe, 
              pour des saveurs authentiques et exotiques. Embarquez pour un voyage gustatif unique !
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-caribbean-blue hover:text-pirate-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z"/>
                </svg>
              </a>
              <a href="#" className="text-caribbean-blue hover:text-pirate-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-caribbean-blue hover:text-pirate-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-pirate-gold font-bold text-lg mb-4 font-['Pirata_One']">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-parchment-dark hover:text-pirate-gold transition-colors">
                  ⚓ Accueil
                </Link>
              </li>
                          </ul>
          </div>
        </div>

        <div className="border-t border-pirate-wood/20 pt-8 text-center">
          <p className="text-parchment-dark">
            © {currentYear} Blackbeard Rhums. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
