import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Notre Histoire — Istwa an nou',
  description: 'Un amour profond pour la terre antillaise, des ingrédients locaux et des recettes transmises avec passion. Découvrez l\'âme de Bô Kay Mwen.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/a-propos' },
  openGraph: {
    url: 'https://blackbeard-umber.vercel.app/a-propos',
    title: 'Notre Histoire | Bô Kay Mwen',
    description: 'L\'histoire d\'un amour profond pour la terre antillaise et la volonté de le partager.',
  },
};

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
                l&apos;essence de nos punchs.
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
                Nos punchs célèbrent
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

      {/* ======== PROCESSUS DE FABRICATION ======== */}
      <section
        className="py-20 px-6"
        style={{ background: 'linear-gradient(180deg, #0D1A0D 0%, #0B0E11 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Notre processus
              </p>
              <h2 className="font-serif text-gold text-2xl tracking-wide mb-4">
                De la terre à la bouteille
              </h2>
              <div
                className="mx-auto w-[80px] h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)' }}
              />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Ligne verticale */}
            <div
              className="absolute left-[19px] top-4 bottom-4 w-[1px] hidden sm:block"
              style={{ background: 'linear-gradient(180deg, rgba(200,162,77,0.5), rgba(200,162,77,0.05))' }}
            />

            <div className="space-y-10">
              {[
                {
                  step: '01',
                  title: 'Sélection des fruits',
                  desc: 'Nous choisissons des fruits cueillis à pleine maturité, sourcés auprès d\'agriculteurs locaux des Antilles. Ananas, goyave, mangue, litchis — chaque ingrédient est sélectionné pour sa qualité et son arôme.',
                  image: '/images/fruits-tropicaux.jpg',
                },
                {
                  step: '02',
                  title: 'Macération lente',
                  desc: 'Les fruits sont mis à macérer dans notre rhum agricole pendant plusieurs semaines. C\'est là que la magie opère — les arômes s\'entrelacent, la couleur se forme, le caractère se révèle.',
                  image: '/images/barrels.jpg',
                },
                {
                  step: '03',
                  title: 'Filtration & équilibre',
                  desc: 'Un filtrage délicat permet d\'affiner la texture du punch sans en dénaturer les arômes naturels. On goûte, on ajuste, on vérifie que chaque lot correspond à notre standard de qualité.',
                  image: '/images/craft.jpg',
                },
                {
                  step: '04',
                  title: 'Mise en bouteille artisanale',
                  desc: 'Chaque bouteille est remplie, bouchée et étiquetée à la main. Un dernier contrôle avant qu\'elle prenne la route vers votre table — avec tout le soleil des Antilles dedans.',
                  image: '/images/spirits.jpg',
                },
              ].map(({ step, title, desc }, i) => (
                <ScrollReveal key={step} delay={i * 100} direction="up" distance={30}>
                  <div className="flex gap-6 items-start">
                    {/* Numéro */}
                    <div className="shrink-0 relative">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-gold text-xs z-10 relative"
                        style={{
                          background: '#0B0E11',
                          border: '1px solid rgba(200,162,77,0.4)',
                        }}
                      >
                        {step}
                      </div>
                    </div>
                    {/* Contenu */}
                    <div className="flex-1 pb-2">
                      <h3
                        className="font-serif text-gold tracking-wide mb-2"
                        style={{ fontSize: '1rem' }}
                      >
                        {title}
                      </h3>
                      <p className="text-cream-muted/75 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== VALEURS ======== */}
      <section className="bg-ink py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
                Ce qui nous guide
              </p>
              <h2 className="font-serif text-gold text-2xl tracking-wide mb-4">
                Nos valeurs
              </h2>
              <div
                className="mx-auto w-[80px] h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #C8A24D, transparent)' }}
              />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: 'Authenticité',
                desc: 'Des recettes transmises avec passion, fidèles aux traditions créoles des Antilles.',
                color: '#C8A24D',
              },
              {
                label: 'Terroir',
                desc: '100 % d\'ingrédients locaux, cultivés par des agriculteurs des Caraïbes qui partagent nos valeurs.',
                color: '#2A7C7B',
              },
              {
                label: 'Artisanat',
                desc: 'Fait main, bouteille par bouteille, avec le soin qu\'on réserve aux choses qui comptent vraiment.',
                color: '#8B2F3A',
              },
            ].map(({ label, desc, color }, i) => (
              <ScrollReveal key={label} delay={i * 120} direction="up" distance={30}>
                <div className="text-center">
                  <div
                    className="w-8 h-[2px] mx-auto mb-5"
                    style={{ background: color }}
                  />
                  <h3
                    className="font-serif tracking-wide mb-3"
                    style={{ fontSize: '1rem', color }}
                  >
                    {label}
                  </h3>
                  <p className="text-cream-muted/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======== PHOTO SAVOIR-FAIRE ======== */}
      <section className="relative h-[50vh] min-h-[300px] overflow-hidden">
        <Image
          src="/images/cocotiers-soleil.jpg"
          alt="Les Caraïbes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <ScrollReveal direction="up" distance={30}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-6">
            <p className="font-serif text-gold/80 text-sm leading-relaxed tracking-wide max-w-xs">
              Chaque bouteille est une invitation au voyage.
            </p>
            <Link href="/boutique" className="btn-luxury-filled">
              Découvrir nos punchs
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
