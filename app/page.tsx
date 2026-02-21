import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
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

          <ScrollReveal delay={400} direction="up" distance={50} duration={1200}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gold font-semibold mb-8 tracking-wide text-shadow-lg leading-[0.95]">
              Bô Kay Mwen
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={800} direction="up" distance={30} duration={1000}>
            <p className="text-lg md:text-xl lg:text-2xl text-cream/90 max-w-2xl mx-auto mb-12 leading-relaxed text-shadow-sm font-light">
              Rhums arrangés d&apos;origine caribéenne.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1000} direction="up" distance={20} duration={1000}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/boutique" className="btn-luxury-filled">
                Découvre nos créations
              </Link>
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* Mention légale alcool */}
      <div className="bg-ink text-center py-4 px-6">
        <p className="text-cream/20 text-xs">
          L&apos;abus d&apos;alcool est dangereux pour la sant&eacute;. &Agrave; consommer avec mod&eacute;ration.
        </p>
      </div>
    </main>
  );
}
