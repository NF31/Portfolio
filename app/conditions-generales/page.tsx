import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Conditions générales - NFDev21',
  description: 'Conditions générales du portfolio NFDev21',
};

export default function ConditionsGeneralesPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Conditions générales</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Bienvenue sur mon portfolio professionnel. En utilisant ce site, vous acceptez les conditions suivantes.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Informations légales</h2>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Propriétaire du site :</strong> NFDev21<br />
              <strong>Contact :</strong> contact@nfdev21.com<br />
              <strong>Téléphone :</strong> +33 6 12 34 56 78<br />
              <strong>Hébergeur :</strong> Vercel Inc. - <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">vercel.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Utilisation du site</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ce site est un portfolio professionnel présentant mes services de développement web et mes réalisations. 
              Vous êtes libre de consulter le contenu et de me contacter pour vos projets.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Tout le contenu (design, code, textes, images) est protégé par le droit d&apos;auteur. 
              Merci de ne pas reproduire ou copier sans autorisation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vos données personnelles</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lorsque vous utilisez le formulaire de contact, je collecte uniquement les informations nécessaires 
              pour vous répondre (nom, email, téléphone, message).
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Engagement :</strong> Vos données ne sont jamais vendues, partagées ou utilisées à des fins commerciales. 
              Elles sont uniquement utilisées pour répondre à votre demande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies et stockage</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ce site n&apos;utilise <strong>aucun cookie de tracking ou publicitaire</strong>. 
              Seule votre préférence de thème (mode clair/sombre) est enregistrée localement dans votre navigateur 
              pour améliorer votre expérience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pour toute question, n&apos;hésitez pas à me contacter :{' '}
              <a href="mailto:contact@nfdev21.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                contact@nfdev21.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

