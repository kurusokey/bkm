import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* ==========================================
          1. Hero cinématique — "Notre Histoire"
          ========================================== */}
      <div className="relative h-[55vh] min-h-[400px] md:h-[65vh] flex items-end justify-center overflow-hidden pb-16 md:pb-24">
        <Image
          src="/images/hero-terroir.jpg"
          alt="Côte caribéenne aux collines tropicales verdoyantes"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay dégradé chaud doré/ambré → ink */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-800/20 to-ink z-[1]" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif">À Propos</p>
          </ScrollReveal>
          <ScrollReveal delay={400} direction="up" distance={40} duration={1000}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold text-shadow-lg mb-4">
              Notre Histoire
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
            <div className="gold-line-wide mx-auto mb-6" />
            <p className="text-cream/80 text-shadow-sm text-base md:text-lg leading-relaxed">
              Nés de la terre antillaise, nos rhums arrangés racontent l&apos;amour du terroir et des saveurs tropicales.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-28">
        {/* ==========================================
            2. De la Terre à la Bouteille
            ========================================== */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
            {/* Texte — 7 colonnes */}
            <div className="md:col-span-7 bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10">
              <h2 className="font-serif text-gold mb-6">De la Terre à la Bouteille</h2>
              <div className="gold-line mb-6" />
              <div className="space-y-5 text-cream-muted leading-relaxed">
                <p>
                  Aux Antilles, la terre est généreuse. Bercés par le soleil des Caraïbes
                  et les alizés chargés d&apos;embruns, nous puisons dans ce terroir
                  d&apos;exception l&apos;essence de nos rhums arrangés.
                </p>
                <p>
                  De la canne à sucre cultivée sur les mornes verdoyants aux épices
                  récoltées à la main, chaque ingrédient porte en lui la richesse de
                  notre île. Nous travaillons avec des agriculteurs locaux qui partagent
                  notre passion pour une agriculture respectueuse de la terre.
                </p>
                <p>
                  Bo Kay Mwen, c&apos;est l&apos;histoire d&apos;un amour profond pour
                  notre terroir — et la volonté de le partager, bouteille après bouteille.
                </p>
              </div>
            </div>

            {/* Image palmiers — 5 colonnes */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[280px]">
              <Image
                src="/images/palmiers-martinique.jpg"
                alt="Palmiers sur la plage de Sainte-Anne, Martinique"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </div>
        </ScrollReveal>

        {/* ==========================================
            3. Les Trésors des Îles — Fruits & ingrédients
            ========================================== */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
            {/* Image fruits — 5 colonnes (inversée) */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[280px] order-2 md:order-1">
              <Image
                src="/images/fruits-tropicaux.jpg"
                alt="Fruits tropicaux frais disposés sur une plage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>

            {/* Texte — 7 colonnes */}
            <div className="md:col-span-7 bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10 order-1 md:order-2">
              <h2 className="font-serif text-gold mb-6">Les Trésors des Îles</h2>
              <div className="gold-line mb-6" />
              <div className="space-y-5 text-cream-muted leading-relaxed">
                <p>
                  Nos rhums arrangés célèbrent la richesse des fruits tropicaux qui
                  mûrissent sous le soleil des Antilles. Chaque recette est une invitation
                  au voyage, un hommage aux saveurs de notre archipel.
                </p>
                <p>
                  Noix de coco fraîchement récoltée, gousses de vanille charnues, mangues
                  juteuses cueillies à maturité, ananas Queen Victoria parfumés, agrumes
                  gorgés de soleil — nous sélectionnons avec rigueur les meilleurs fruits
                  de nos îles pour composer des assemblages uniques.
                </p>
                <p>
                  Rien d&apos;artificiel, que des ressources locales transformées avec
                  patience et passion.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ==========================================
            4. Chiffres clés
            ========================================== */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 md:mb-24">
            <div className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold mb-1">3-12</p>
              <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Mois</p>
            </div>
            <div className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold mb-1">100%</p>
              <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Naturel</p>
            </div>
            <div className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold mb-1">Fait</p>
              <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Main</p>
            </div>
            <div className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-8 text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold mb-1">971</p>
              <p className="text-cream-muted text-xs uppercase tracking-[0.15em]">Caraïbes</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ==========================================
            5. Divider panoramique — Cocotiers au soleil
            ========================================== */}
        <ScrollReveal>
          <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden mb-16 md:mb-24">
            <Image
              src="/images/cocotiers-soleil.jpg"
              alt="Reflet de cocotiers sous le soleil des Caraïbes"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            {/* Overlay ambré pour ambiance soleil couchant */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-amber-900/30" />
            <div className="absolute inset-0 bg-ink/30" />
          </div>
        </ScrollReveal>

        {/* ==========================================
            6. Notre Savoir-Faire
            ========================================== */}
        <ScrollReveal>
          <section className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10 mb-16 md:mb-24">
            <h2 className="font-serif text-gold mb-6">Notre Savoir-Faire</h2>
            <div className="gold-line mb-6" />
            <p className="text-cream-muted leading-relaxed mb-8 text-base">
              Nos rhums arrangés macèrent pendant plusieurs mois pour développer des
              arômes riches et complexes. Nous utilisons uniquement des fruits frais,
              des épices de qualité et des rhums soigneusement sélectionnés.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ingrédients 100% naturels</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Macération artisanale de 3 à 12 mois</span>
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
                <span>Production en petites quantités pour garantir la qualité</span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* ==========================================
            7. Nos Engagements
            ========================================== */}
        <ScrollReveal>
          <section className="bg-charcoal border border-gold-muted/15 rounded-2xl p-6 md:p-10 mb-16 md:mb-24">
            <h2 className="font-serif text-gold mb-6">Nos Engagements</h2>
            <div className="gold-line mb-6" />
            <p className="text-cream-muted leading-relaxed mb-6">
              Nous nous engageons à proposer des produits de qualité dans le respect
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
                <span>Livraison soignée et sécurisée</span>
              </li>
              <li className="flex items-start gap-3 text-cream-muted">
                <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Service client réactif</span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* ==========================================
            8. Mention légale
            ========================================== */}
        <div className="text-center">
          <p className="text-cream-muted/50 text-xs tracking-wider uppercase">
            L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  );
}
