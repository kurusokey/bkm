import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Bô Kay Mwen : questions, commandes, partenariats. Nous serons ravis d\'échanger avec vous.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/contact' },
  openGraph: { url: 'https://blackbeard-umber.vercel.app/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40 pb-20">
      <div className="max-w-2xl mx-auto px-6">

        {/* Titre */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/50 font-serif mb-3">
              Parlons-nous
            </p>
            <h1 className="font-serif text-gold text-2xl tracking-wide mb-4">
              Nous contacter
            </h1>
            <div className="gold-line-wide mx-auto mb-6" />
            <p className="text-cream-muted/70 text-sm leading-relaxed max-w-md mx-auto">
              Une question sur nos punchs, une commande en cours ou simplement envie d&apos;échanger ?
              N&apos;hésitez pas à nous écrire — nous serons ravis de vous répondre.
            </p>
          </div>
        </ScrollReveal>

        {/* Formulaire */}
        <ScrollReveal direction="up" distance={30}>
          <div
            className="rounded-2xl p-8 mb-12"
            style={{ background: 'rgba(200,162,77,0.03)', border: '1px solid rgba(200,162,77,0.10)' }}
          >
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* Coordonnées */}
        <ScrollReveal direction="up" distance={20}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email',
                value: '[À compléter]',
              },
              {
                icon: (
                  <svg className="w-5 h-5 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: 'Téléphone',
                value: '[À compléter]',
              },
              {
                icon: (
                  <svg className="w-5 h-5 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Adresse',
                value: '[À compléter]',
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="py-6 px-4 rounded-xl"
                style={{ background: 'rgba(200,162,77,0.04)', border: '1px solid rgba(200,162,77,0.08)' }}
              >
                <div className="text-gold/50">{icon}</div>
                <p className="text-xs uppercase tracking-[0.15em] text-gold/50 font-serif mb-1">{label}</p>
                <p className="text-cream-muted/60 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Citation */}
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center mt-14">
            <div className="gold-line-wide mx-auto mb-6" />
            <p className="font-serif text-gold/50 text-sm italic leading-relaxed">
              Bô Kay Mwen, c&apos;est avant tout une histoire de partage.
              <br />
              Au plaisir d&apos;échanger avec vous.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
