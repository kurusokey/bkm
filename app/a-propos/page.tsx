import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Hero banner — cinematic */}
      <div className="relative h-[50vh] min-h-[350px] md:h-[60vh] flex items-end justify-center overflow-hidden pb-16 md:pb-24">
        <Image
          src="/images/craft.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink z-[1]" />

        <div className="relative z-10 text-center">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif">A Propos</p>
          </ScrollReveal>
          <ScrollReveal delay={400} direction="up" distance={40} duration={1000}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold text-shadow-lg mb-4">
              Notre Histoire
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
            <div className="gold-line-wide mx-auto mb-6" />
            <p className="text-cream/80 text-shadow-sm text-base md:text-lg">
              Passionnes par les saveurs authentiques et les traditions artisanales.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-28">
        {/* Story section with lateral image */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
            <div className="md:col-span-7 bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10">
              <h2 className="font-serif text-gold mb-6">L&apos;Aventure Bo Kay Mwen</h2>
              <div className="gold-line mb-6" />
              <div className="space-y-5 text-cream-muted leading-relaxed">
                <p>
                  Passionnes par les saveurs authentiques et les traditions artisanales,
                  nous avons cree Bo Kay Mwen pour partager notre amour
                  des spiritueux de qualite.
                </p>
                <p>
                  Chaque bouteille est preparee avec soin, en selectionnant les meilleurs
                  ingredients naturels pour creer des macerations uniques et savoureuses.
                </p>
              </div>
            </div>

            {/* Ambiance image */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[250px]">
              <Image
                src="/images/barrels.jpg"
                alt="Cave de vieillissement"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </div>
        </ScrollReveal>

        {/* Savoir-faire */}
        <ScrollReveal>
          <section className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10 mb-16 md:mb-24">
            <h2 className="font-serif text-gold mb-6">Notre Savoir-Faire</h2>
            <div className="gold-line mb-6" />
            <p className="text-cream-muted leading-relaxed mb-8 text-base">
              Nos rhums arranges macerent pendant plusieurs mois pour developper des
              aromes riches et complexes. Nous utilisons uniquement des fruits frais,
              des epices de qualite et des rhums soigneusement selectionnes.
            </p>

            {/* Key figures row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-ink/40 border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">3-12</p>
                <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Mois</p>
              </div>
              <div className="bg-ink/40 border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">100%</p>
                <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Naturel</p>
              </div>
              <div className="bg-ink/40 border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">Fait</p>
                <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Main</p>
              </div>
              <div className="bg-ink/40 border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
                <p className="font-serif text-4xl md:text-5xl text-gold mb-1">971</p>
                <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Caraibes</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ingredients 100% naturels</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Maceration artisanale de 3 a 6 mois</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Recettes traditionnelles et originales</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Production en petites quantites pour garantir la qualite</span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Ambiance divider */}
        <ScrollReveal>
          <div className="relative h-48 md:h-72 rounded-2xl overflow-hidden mb-16 md:mb-24">
            <Image
              src="/images/caribbean.jpg"
              alt="Caraibes"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-ink/50" />
          </div>
        </ScrollReveal>

        {/* Engagements */}
        <ScrollReveal>
          <section className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10 mb-16 md:mb-24">
            <h2 className="font-serif text-gold mb-6">Nos Engagements</h2>
            <div className="gold-line mb-6" />
            <p className="text-cream-muted leading-relaxed mb-6">
              Nous nous engageons a proposer des produits de qualite dans le respect
              des traditions et de l&apos;environnement.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Vente responsable d&apos;alcool (interdit aux mineurs)</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Emballages recyclables</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Livraison soignee et securisee</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Service client reactif</span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Legal */}
        <div className="text-center">
          <p className="text-cream-muted/50 text-xs tracking-wider uppercase">
            L&apos;abus d&apos;alcool est dangereux pour la sante. A consommer avec moderation.
          </p>
        </div>
      </div>
    </div>
  );
}
