import { BASE_URL } from '@/lib/config';
import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Bô Kay Mwen : éditeur, hébergeur, propriété intellectuelle et réglementation sur l\'alcool.',
  alternates: { canonical: 'https://laroutedurhum.com/mentions-legales' },
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Titre */}
        <ScrollReveal>
          <h1 className="font-serif text-gold text-2xl text-center tracking-wide mb-5">
            Mentions légales
          </h1>
          <div className="gold-line-wide mx-auto mb-12" />
        </ScrollReveal>

        {/* Éditeur du site */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Éditeur du site</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-2">
              <p>Le site <strong className="text-cream">bokaymwen.fr</strong> est édité par :</p>
              <ul className="list-none space-y-1 pl-0">
                <li>Raison sociale : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Forme juridique : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>SIRET : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Adresse du siège social : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Téléphone : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Email : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Directeur de la publication : <span className="text-cream">[À COMPLÉTER]</span></li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Hébergeur */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Hébergeur</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-2">
              <ul className="list-none space-y-1 pl-0">
                <li>Vercel Inc.</li>
                <li>440 N Barranca Ave #4133</li>
                <li>Covina, CA 91723, États-Unis</li>
                <li>Site web : vercel.com</li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Propriété intellectuelle */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Propriété intellectuelle</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, photographies, logos, marques,
                illustrations, vidéos, sons, mise en page) est la propriété exclusive de Bô Kay Mwen
                ou de ses partenaires et est protégé par les lois françaises et internationales
                relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite sans autorisation écrite préalable.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Responsabilité */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Responsabilité</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                L&apos;éditeur s&apos;efforce de fournir des informations aussi précises que possible.
                Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes ou des
                carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait de tiers.
              </p>
              <p>
                L&apos;éditeur ne saurait être tenu pour responsable des dommages directs ou indirects
                résultant de l&apos;accès ou de l&apos;utilisation du site.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Réglementation alcool */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Réglementation sur l&apos;alcool</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Conformément aux dispositions du Code de la santé publique, la vente d&apos;alcool est
                interdite aux mineurs de moins de 18 ans. En accédant à ce site, vous certifiez
                avoir l&apos;âge légal requis pour consommer de l&apos;alcool dans votre pays de résidence.
              </p>
              <p className="font-semibold text-cream">
                L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
              </p>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
