import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Bô Kay Mwen : questions, commandes, partenariats. Nous serons ravis d\'échanger avec vous.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/contact' },
  openGraph: { url: 'https://blackbeard-umber.vercel.app/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Titre */}
        <ScrollReveal>
          <h1 className="font-serif text-gold text-2xl text-center tracking-wide mb-5">
            Nous contacter
          </h1>
          <div className="gold-line-wide mx-auto mb-12" />
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal>
          <section className="mb-10 text-center">
            <p className="text-cream-muted text-sm leading-relaxed">
              Une question sur nos punchs, une commande en cours ou simplement envie
              d&apos;échanger ? N&apos;hésitez pas à nous écrire, nous serons ravis de vous répondre.
            </p>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Coordonnées */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Coordonnées</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <ul className="list-none space-y-2 pl-0">
                <li>
                  <span className="text-cream font-semibold">Email :</span>{' '}
                  <span className="text-cream">[À COMPLÉTER]</span>
                </li>
                <li>
                  <span className="text-cream font-semibold">Téléphone :</span>{' '}
                  <span className="text-cream">[À COMPLÉTER]</span>
                </li>
                <li>
                  <span className="text-cream font-semibold">Adresse :</span>{' '}
                  <span className="text-cream">[À COMPLÉTER]</span>
                </li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Horaires */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Horaires</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-2">
              <p><span className="text-cream">[À COMPLÉTER]</span></p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Message chaleureux */}
        <ScrollReveal>
          <section className="text-center">
            <p className="font-serif text-gold/70 text-base italic leading-relaxed">
              Bô Kay Mwen, c&apos;est avant tout une histoire de partage.
              <br />
              Au plaisir d&apos;échanger avec vous.
            </p>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
