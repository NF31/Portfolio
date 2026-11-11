import { competences, parcours, profil, recherche } from '@/lib/content';

/**
 * Section « À propos » de l'accueil : ce que je recherche, mon parcours et mes compétences.
 * Composant serveur : tout le texte est dans le HTML envoyé (lisible par les moteurs de recherche).
 */
const ProfilSection = () => {
  const offres = [recherche.stage, recherche.alternance];

  return (
    <section id="parcours" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            À propos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{profil.presentation}</p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Ce que je recherche</h3>
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {offres.map((offre) => (
            <div
              key={offre.titre}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {offre.periode}
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">{offre.titre}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{offre.detail}</p>
            </div>
          ))}
        </div>
        <p className="max-w-3xl text-gray-600 dark:text-gray-400 leading-relaxed mb-16">{recherche.ouverture}</p>

        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Parcours</h3>
            <ol className="space-y-6 border-l border-gray-200 dark:border-gray-700 pl-6">
              {parcours.map((etape) => (
                <li key={etape.titre}>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{etape.periode}</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{etape.titre}</p>
                  <p className="text-gray-600 dark:text-gray-400">{etape.lieu}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Compétences</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {competences.map((groupe) => (
                <div key={groupe.titre}>
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{groupe.titre}</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {groupe.elements.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilSection;
