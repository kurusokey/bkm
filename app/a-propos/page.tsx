import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[440px] flex items-end justify-center overflow-hidden">
        <Image
          src="/images/hero-mornes.jpg"
          alt="Les Pitons de Sainte-Lucie surplombant la côte caribéenne verdoyante"
          fill
          priority
          className="object-cover animate-slow-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-ink/20 to-ink z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent z-[2]" />

        <div className="relative z-10 text-center w-full px-6 pb-14">
          <ScrollReveal delay={200} direction="up" distance={30} duration={1000}>
            <p className="text-xs uppercase tracking-[0.3em] text-cream-muted/70 mb-5 font-serif">
              À Propos
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400} direction="up" distance={40} duration={1000}>
            <h1 className="font-serif text-2xl text-gold text-shadow-lg mb-5 tracking-wide">
              Bô Kay Mwen
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={600} direction="up" distance={20} duration={1000}>
            <div
              className="mx-auto w-[120px] h-[1px]"
              style={{ background: 'linear-gradient(90deg, #2A7C7B, #C8A24D, #8B2F3A)' }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Poème — centré via flexbox */}
      <div className="flex justify-center w-full">
        <div className="w-full text-center px-8 py-32" style={{ maxWidth: '28rem' }}>

          {/* Strophe 1 — dédicace */}
          <ScrollReveal>
            <div className="mb-28">
              <p className="font-serif text-gold/80 text-lg leading-[2.6] tracking-wide">
                C&apos;est l&apos;histoire d&apos;un amour profond
                <br />
                pour notre terre antillaise
                <br />
                et la volonté de le partager.
              </p>
            </div>
          </ScrollReveal>

          {/* Séparateur — points drapeau Martinique (vert • or • rouge) */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-28">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2A7C7B' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8A24D' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B2F3A' }} />
            </div>
          </ScrollReveal>

          {/* Strophe 2 — la terre */}
          <ScrollReveal>
            <div className="mb-28">
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                Aux Antilles,
                <br />
                la terre est généreuse.
              </p>
              <div className="h-7" />
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                Bercés par le soleil des Caraïbes
                <br />
                et les alizés chargés d&apos;embruns,
                <br />
                nous puisons dans ce terroir d&apos;exception
                <br />
                l&apos;essence de nos rhums arrangés.
              </p>
            </div>
          </ScrollReveal>

          {/* Ligne émeraude subtile — vert des mornes */}
          <ScrollReveal>
            <div className="flex justify-center mb-28">
              <div
                className="w-16 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #2A7C7B80, transparent)' }}
              />
            </div>
          </ScrollReveal>

          {/* Strophe 3 — les ingrédients */}
          <ScrollReveal>
            <div className="mb-28">
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                De la canne à sucre
                <br />
                aux épices récoltées à la main,
                <br />
                chaque ingrédient porte en lui
                <br />
                la richesse de nos îles.
              </p>
              <div className="h-7" />
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                Nous travaillons
                <br />
                avec des agriculteurs locaux
                <br />
                qui partagent notre passion
                <br />
                pour une agriculture
                <br />
                respectueuse de la terre.
              </p>
            </div>
          </ScrollReveal>

          {/* Séparateur — Guadeloupe : bleu mer → or soleil */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-28">
              <div
                className="w-10 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #3B6FA0)' }}
              />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8A24D' }} />
              <div
                className="w-10 h-[1px]"
                style={{ background: 'linear-gradient(90deg, #3B6FA0, transparent)' }}
              />
            </div>
          </ScrollReveal>

          {/* Strophe 4 — les saveurs */}
          <ScrollReveal>
            <div className="mb-28">
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                Nos rhums arrangés célèbrent
                <br />
                la richesse des fruits tropicaux
                <br />
                qui mûrissent
                <br />
                sous le soleil des Antilles.
              </p>
              <div className="h-7" />
              <p className="text-cream-muted/90 leading-[2.8] tracking-wide">
                Chaque recette
                <br />
                est une invitation au voyage,
                <br />
                un hommage aux saveurs
                <br />
                de notre archipel.
              </p>
            </div>
          </ScrollReveal>

          {/* Séparateur — points drapeau Martinique */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-28">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2A7C7B' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8A24D' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B2F3A' }} />
            </div>
          </ScrollReveal>

          {/* Citation finale — murmure */}
          <ScrollReveal>
            <div className="mb-40">
              <p className="font-serif italic text-lg leading-[2.6] tracking-wide" style={{ color: 'rgba(200, 162, 77, 0.35)' }}>
                Rien d&apos;artificiel,
                <br />
                que des ressources locales
                <br />
                transformées
                <br />
                avec patience et passion.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
