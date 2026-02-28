import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'CGV de Bô Kay Mwen : commande, livraison, droit de rétractation et réglementation sur la vente d\'alcool.',
  alternates: { canonical: 'https://blackbeard-umber.vercel.app/cgv' },
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Titre */}
        <ScrollReveal>
          <h1 className="font-serif text-gold text-2xl text-center tracking-wide mb-5">
            Conditions générales de vente
          </h1>
          <div className="gold-line-wide mx-auto mb-12" />
        </ScrollReveal>

        {/* Objet et champ d'application */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Objet et champ d&apos;application</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les présentes conditions générales de vente (CGV) régissent l&apos;ensemble des ventes
                conclues sur le site <strong className="text-cream">bokaymwen.fr</strong>, exploité
                par Bô Kay Mwen (ci-après « le Vendeur »).
              </p>
              <p>
                Toute commande passée sur le site implique l&apos;acceptation pleine et entière des
                présentes CGV. Le Vendeur se réserve le droit de modifier ces conditions à tout
                moment. Les CGV applicables sont celles en vigueur à la date de la commande.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Produits et prix */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Produits et prix</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les produits proposés à la vente sont des punchs artisanaux. Chaque produit
                est décrit avec la plus grande exactitude possible. Les photographies sont non
                contractuelles.
              </p>
              <p>
                Les prix sont indiqués en euros, toutes taxes comprises (TTC). Le Vendeur se réserve
                le droit de modifier ses prix à tout moment, les produits étant facturés sur la base
                des tarifs en vigueur au moment de la validation de la commande.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Commande et paiement */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Commande et paiement</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Le client passe commande sur le site en ajoutant les produits à son panier puis en
                validant sa commande. Un récapitulatif de la commande est présenté avant la
                confirmation définitive.
              </p>
              <p>
                Le paiement est exigible immédiatement à la commande. Les moyens de paiement
                acceptés sont : <span className="text-cream">[À COMPLÉTER]</span>.
              </p>
              <p>
                La commande est considérée comme confirmée après réception du paiement intégral.
                Un email de confirmation est envoyé au client.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Livraison */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Livraison</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les livraisons sont effectuées à l&apos;adresse indiquée par le client lors de la
                commande.
              </p>
              <ul className="list-none space-y-1 pl-0">
                <li>Zones de livraison : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Délais de livraison : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Frais de livraison : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Transporteur : <span className="text-cream">[À COMPLÉTER]</span></li>
              </ul>
              <p>
                En cas de retard de livraison, le client peut contacter le Vendeur par email. Le
                Vendeur ne saurait être tenu responsable des retards imputables au transporteur.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Droit de rétractation */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Droit de rétractation</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Conformément aux articles L.221-18 et suivants du Code de la consommation, le
                client dispose d&apos;un délai de <strong className="text-cream">14 jours</strong> à
                compter de la réception de sa commande pour exercer son droit de rétractation,
                sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
              <p>
                Les produits doivent être retournés dans leur emballage d&apos;origine, non ouverts et
                en parfait état. Les frais de retour sont à la charge du client. Le remboursement
                sera effectué dans un délai de 14 jours suivant la réception des produits retournés.
              </p>
              <p>
                Pour exercer ce droit, contactez-nous à : <span className="text-cream">[À COMPLÉTER]</span>.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Garanties et responsabilité */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Garanties et responsabilité</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les produits bénéficient de la garantie légale de conformité (articles L.217-4 et
                suivants du Code de la consommation) et de la garantie des vices cachés (articles
                1641 et suivants du Code civil).
              </p>
              <p>
                Le Vendeur ne saurait être tenu responsable de l&apos;utilisation non conforme des
                produits achetés ni des dommages résultant d&apos;une mauvaise conservation.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Données personnelles */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Données personnelles</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les données personnelles collectées lors de la commande (nom, adresse, email,
                téléphone) sont utilisées exclusivement pour le traitement et le suivi de la
                commande, ainsi que pour l&apos;envoi de communications commerciales avec votre
                consentement préalable.
              </p>
              <p>
                Ces données sont conservées conformément à notre{' '}
                <a href="/confidentialite" className="text-gold hover:underline">
                  Politique de confidentialité
                </a>
                . Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données en nous contactant à : <span className="text-cream">[À COMPLÉTER]</span>.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Loi applicable et juridiction */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Loi applicable et juridiction</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, et après
                tentative de résolution amiable, les tribunaux français seront seuls compétents.
              </p>
              <p>
                Conformément aux articles L.612-1 et suivants du Code de la consommation, le
                client peut recourir gratuitement à un médiateur de la consommation pour tout
                litige non résolu. Médiateur compétent : <span className="text-cream">[À COMPLÉTER]</span>.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Vente d'alcool */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Vente d&apos;alcool aux mineurs</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Conformément à l&apos;article L.3342-1 du Code de la santé publique, la vente d&apos;alcool
                à des mineurs de moins de 18 ans est strictement interdite.
              </p>
              <p>
                En passant commande sur le site, le client certifie avoir au moins 18 ans. Le
                Vendeur se réserve le droit de demander une pièce d&apos;identité lors de la livraison
                pour vérifier l&apos;âge de l&apos;acheteur.
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
