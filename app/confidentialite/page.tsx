import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Confidentialité — Bô Kay Mwen',
  description: 'Politique de confidentialité de Bô Kay Mwen : données collectées, droits RGPD, cookies et contact DPO.',
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-ink pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Titre */}
        <ScrollReveal>
          <h1 className="font-serif text-gold text-2xl text-center tracking-wide mb-5">
            Politique de confidentialité
          </h1>
          <div className="gold-line-wide mx-auto mb-12" />
        </ScrollReveal>

        {/* Données collectées */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Données collectées</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Dans le cadre de l&apos;utilisation du site <strong className="text-cream">bokaymwen.fr</strong>,
                nous sommes amenés à collecter les données personnelles suivantes :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Adresse postale (pour la livraison)</li>
                <li>Numéro de téléphone</li>
                <li>Données de navigation (cookies, adresse IP)</li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Finalité du traitement */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Finalité du traitement</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>Les données collectées sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Le traitement et le suivi des commandes</li>
                <li>La gestion de la relation client</li>
                <li>L&apos;envoi de communications commerciales (avec consentement)</li>
                <li>L&apos;amélioration de nos services et de l&apos;expérience utilisateur</li>
                <li>Le respect de nos obligations légales</li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Durée de conservation */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Durée de conservation</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Les données personnelles sont conservées pendant la durée strictement nécessaire
                à l&apos;accomplissement des finalités mentionnées ci-dessus, et conformément à la
                législation en vigueur :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Données clients : 3 ans après le dernier achat</li>
                <li>Données de facturation : 10 ans (obligation comptable)</li>
                <li>Données de navigation : 13 mois maximum</li>
              </ul>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Droits des utilisateurs */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Droits des utilisateurs</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
                loi Informatique et Libertés, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong className="text-cream">Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
                <li><strong className="text-cream">Droit de rectification</strong> : corriger des données inexactes</li>
                <li><strong className="text-cream">Droit de suppression</strong> : demander l&apos;effacement de vos données</li>
                <li><strong className="text-cream">Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong className="text-cream">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : <span className="text-cream">[À COMPLÉTER]</span>.
              </p>
              <p>
                Vous pouvez également introduire une réclamation auprès de la CNIL
                (Commission Nationale de l&apos;Informatique et des Libertés).
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Cookies */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Cookies</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Le site utilise des cookies pour améliorer l&apos;expérience de navigation. Les cookies
                sont de petits fichiers stockés sur votre appareil.
              </p>
              <p>Types de cookies utilisés :</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong className="text-cream">Cookies essentiels</strong> : nécessaires au fonctionnement du site (panier, session)</li>
                <li><strong className="text-cream">Cookies analytiques</strong> : mesure d&apos;audience anonyme</li>
              </ul>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies. Cela pourrait
                toutefois affecter certaines fonctionnalités du site.
              </p>
            </div>
          </section>
          <div className="gold-line-wide mx-auto mb-10" />
        </ScrollReveal>

        {/* Contact DPO */}
        <ScrollReveal>
          <section className="mb-10">
            <h2 className="font-serif text-gold text-lg mb-4">Délégué à la protection des données</h2>
            <div className="text-cream-muted text-sm leading-relaxed space-y-3">
              <p>
                Pour toute question relative à la protection de vos données personnelles, vous
                pouvez contacter notre délégué à la protection des données (DPO) :
              </p>
              <ul className="list-none space-y-1 pl-0">
                <li>Nom : <span className="text-cream">[À COMPLÉTER]</span></li>
                <li>Email : <span className="text-cream">[À COMPLÉTER]</span></li>
              </ul>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
