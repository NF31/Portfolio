import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Conditions d\'utilisation - NFDev21',
  description: 'Conditions d\'utilisation du portfolio NFDev21',
};

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l&apos;accueil
        </Link>

        {/* Contenu */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Conditions d&apos;utilisation</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptation des conditions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              En accédant et en utilisant ce site web, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation, 
              toutes les lois et réglementations applicables. Si vous n&apos;acceptez pas ces conditions, 
              vous n&apos;êtes pas autorisé à utiliser ce site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Utilisation du site</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ce portfolio professionnel est accessible librement. Vous pouvez consulter mes services, 
              mes projets et me contacter pour discuter de vos besoins.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Utilisation autorisée :</strong> Consultation du contenu, contact via le formulaire, 
              partage des liens du site.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              <strong>Utilisation interdite :</strong> Copie du contenu sans autorisation, spam, 
              tentative de piratage, usage malveillant.
            </p>
          </section>


          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modifications des conditions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Je me réserve le droit de modifier ces conditions d&apos;utilisation à tout moment. 
              Les modifications prendront effet dès leur publication sur cette page. 
              La date de dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pour toute question concernant ces conditions d&apos;utilisation, contactez-moi à :{' '}
              <a href="mailto:nfdev21@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                nfdev21@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

