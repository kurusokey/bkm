export default function AProposPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">À Propos</h1>

      <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-amber-900">Notre Histoire</h2>
          <p className="mb-4">
            Passionnés par les saveurs authentiques et les traditions artisanales,
            nous avons créé notre boutique de rhums arrangés pour partager notre amour
            des spiritueux de qualité.
          </p>
          <p>
            Chaque bouteille est préparée avec soin, en sélectionnant les meilleurs
            ingrédients naturels pour créer des macérations uniques et savoureuses.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-amber-900">Notre Savoir-Faire</h2>
          <p className="mb-4">
            Nos rhums arrangés macèrent pendant plusieurs mois pour développer des
            arômes riches et complexes. Nous utilisons uniquement des fruits frais,
            des épices de qualité et des rhums soigneusement sélectionnés.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ingrédients 100% naturels</li>
            <li>Macération artisanale de 3 à 6 mois</li>
            <li>Recettes traditionnelles et originales</li>
            <li>Production en petites quantités pour garantir la qualité</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-amber-900">Nos Engagements</h2>
          <p className="mb-4">
            Nous nous engageons à proposer des produits de qualité dans le respect
            des traditions et de l'environnement.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Vente responsable d'alcool (interdit aux mineurs)</li>
            <li>Emballages recyclables</li>
            <li>Livraison soignée et sécurisée</li>
            <li>Service client réactif</li>
          </ul>
        </section>

        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-800 font-semibold text-center">
            ⚠️ L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
          </p>
        </div>
      </div>
    </div>
  );
}