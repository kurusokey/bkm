import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { getFeaturedProducts } from '@/lib/products';

export default function Home() {
  const products = getFeaturedProducts();

  return (
    <main className="min-h-screen">
      {/* ========== HERO — FULL SCREEN ========== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image with Ken Burns effect */}
        <Image
          src="/images/hero-rum.jpg"
          alt=""
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink z-[1]" />
        {/* Bottom vignette for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent z-[2]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal delay={200} direction="none" duration={1000}>
            <div className="gold-line-wide mx-auto mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={400} direction="up" distance={40} duration={1000}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-light mb-6 font-serif">
              Rhums Arranges d&apos;Exception
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up" distance={50} duration={1200}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gold font-semibold mb-8 tracking-wide text-shadow-lg leading-[0.95]">
              Bo Kay Mwen
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={800} direction="up" distance={30} duration={1000}>
            <p className="text-lg md:text-xl lg:text-2xl text-cream/90 max-w-2xl mx-auto mb-12 leading-relaxed text-shadow-sm font-light">
              Rhums arranges 100% local — Des creations artisanales realisees avec les meilleurs fruits des iles de la Caraibe.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1000} direction="up" distance={20} duration={1000}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/boutique" className="btn-luxury-filled">
                Decouvrir nos Planteurs
              </Link>
              <Link href="/a-propos" className="btn-luxury">
                Notre Histoire
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <ScrollReveal delay={1500} direction="up" distance={10} duration={1000} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-cream/50">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em]">Defiler</span>
            <div className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent animate-pulse" />
          </div>
        </ScrollReveal>
      </section>

      {/* ========== LEGAL NOTICE — SUBTLE ========== */}
      <section className="py-4 md:py-5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-cream-muted/50 text-xs tracking-wider uppercase">
            L&apos;abus d&apos;alcool est dangereux pour la sante. A consommer avec moderation.
          </p>
        </div>
      </section>

      {/* ========== FEATURED PRODUCTS ========== */}
      <section className="py-24 md:py-36 lg:py-44 px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-24">
              <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif">Nos Planteurs</p>
              <h2 className="font-serif text-gold mb-6">
                Nos Creations Artisanales
              </h2>
              <div className="gold-line-wide mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-16">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 150} direction="up" distance={50}>
                  <ProductCard product={product} index={index} />
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-cream-muted text-lg">
                  Aucun produit disponible pour le moment.
                </p>
              </div>
            )}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link href="/boutique" className="btn-luxury">
                Voir tous nos Planteurs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== NOS VALEURS ========== */}
      <section className="py-24 md:py-36 lg:py-44 px-6 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-24">
              <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif">Nos Engagements</p>
              <h2 className="font-serif text-gold mb-6">Pourquoi Bo Kay Mwen</h2>
              <div className="gold-line-wide mx-auto mb-6" />
              <p className="text-cream/80 text-base leading-relaxed max-w-2xl mx-auto">
                Nos planteurs sont faits de maniere artisanale avec des produits locaux.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Valeur 1 */}
            <ScrollReveal delay={0}>
              <div className="text-center px-4">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/5 border border-gold-muted/20 flex items-center justify-center">
                  <svg className="w-9 h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-gold mb-4 tracking-wider">Maceration Artisanale</h3>
                <p className="text-cream-muted text-base leading-relaxed">
                  Nos fruits macerent patiemment pour liberer des aromes d&apos;une richesse incomparable. Chaque bouteille est le fruit du temps et du savoir-faire.
                </p>
              </div>
            </ScrollReveal>

            {/* Valeur 2 */}
            <ScrollReveal delay={150}>
              <div className="text-center px-4">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/5 border border-gold-muted/20 flex items-center justify-center">
                  <svg className="w-9 h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-gold mb-4 tracking-wider">100% Local</h3>
                <p className="text-cream-muted text-base leading-relaxed">
                  Fruits frais des Caraibes, selectionnes aupres de producteurs locaux. Des ingredients authentiques, un terroir respecte.
                </p>
              </div>
            </ScrollReveal>

            {/* Valeur 3 */}
            <ScrollReveal delay={300}>
              <div className="text-center px-4">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/5 border border-gold-muted/20 flex items-center justify-center">
                  <svg className="w-9 h-9 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-gold mb-4 tracking-wider">Fait Maison</h3>
                <p className="text-cream-muted text-base leading-relaxed">
                  Chaque bouteille est preparee a la main, en petite serie, pour garantir une qualite irreprochable a chaque gorgee.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== SAVOIR-FAIRE ========== */}
      <section className="relative py-28 md:py-40 lg:py-52 px-6 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/barrels.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/80 z-[1]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center">
            {/* Text — 7 columns */}
            <ScrollReveal direction="left" className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif text-shadow-sm">Tradition</p>
              <h2 className="font-serif text-gold mb-8 text-shadow-sm">
                Notre Savoir-Faire
              </h2>
              <div className="gold-line-wide mb-8" />
              <div className="space-y-6 text-cream/90 leading-relaxed text-lg text-shadow-sm">
                <p>
                  Nous transmettons avec fierte nos <strong className="text-gold-light">traditions caribeennes</strong>.
                  Chaque planteur est le resultat d&apos;un savoir-faire transmis de generation en generation,
                  marie aux meilleurs fruits de nos iles.
                </p>
                <p>
                  De la selection des fruits a la maceration, chaque etape est realisee
                  <span className="text-gold-light"> a la main, avec passion et exigence</span>.
                </p>
              </div>
            </ScrollReveal>

            {/* Key figures — 5 columns, vertical stack */}
            <div className="md:col-span-5 space-y-6">
              <ScrollReveal delay={0}>
                <div className="bg-ink/40 backdrop-blur-sm border border-gold-muted/15 rounded-2xl p-8 text-center">
                  <p className="font-serif text-5xl md:text-6xl text-gold mb-2">6+</p>
                  <p className="text-cream-muted text-xs uppercase tracking-[0.2em]">Mois de maceration</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="bg-ink/40 backdrop-blur-sm border border-gold-muted/15 rounded-2xl p-8 text-center">
                  <p className="font-serif text-5xl md:text-6xl text-gold mb-2">100%</p>
                  <p className="text-cream-muted text-xs uppercase tracking-[0.2em]">Naturel</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="bg-ink/40 backdrop-blur-sm border border-gold-muted/15 rounded-2xl p-8 text-center">
                  <p className="font-serif text-5xl md:text-6xl text-gold mb-2">971</p>
                  <p className="text-cream-muted text-xs uppercase tracking-[0.2em]">Caraibes</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER CTA ========== */}
      <section className="relative py-28 md:py-40 lg:py-48 px-6 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/caribbean.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/85 z-[1]" />

        <ScrollReveal className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cream-muted mb-4 font-serif text-shadow-sm">Newsletter</p>
          <h2 className="font-serif text-gold mb-6 text-shadow-sm">
            Restez Informe
          </h2>
          <div className="gold-line-wide mx-auto mb-8" />
          <p className="text-cream/80 mb-10 leading-relaxed text-lg text-shadow-sm">
            Restez informe de nos nouvelles creations, offres exclusives et coulisses de fabrication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 px-5 py-4 bg-ink/40 backdrop-blur-sm border border-gold-muted/30 text-cream placeholder:text-cream-muted/40 focus:border-gold focus:outline-none transition-all duration-500 text-sm tracking-wider"
            />
            <button className="btn-luxury-filled whitespace-nowrap">
              S&apos;inscrire
            </button>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
