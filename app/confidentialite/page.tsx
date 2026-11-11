import Link from 'next/link';
import { Icons } from '@/lib/icons';

export const metadata = {
  title: 'Politique de confidentialité - Jean Woto',
  description: 'Politique de confidentialité du portfolio de Jean Woto',
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 mb-8 group"
        >
          <Icons.ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l&apos;accueil
        </Link>

        {/* Contenu */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Politique de confidentialité</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quelles données sont collectées ?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lorsque vous me contactez via le formulaire, je collecte uniquement les informations que vous fournissez :
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Votre nom et prénom</li>
              <li>Votre adresse email</li>
              <li>Votre numéro de téléphone</li>
              <li>Votre message</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comment sont utilisées vos données ?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vos données sont utilisées <strong>uniquement</strong> pour :
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Répondre à votre demande de contact</li>
              <li>Vous recontacter concernant votre projet</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-6 font-semibold text-lg">
              ✅ Vos données ne sont JAMAIS vendues, partagées ou utilisées à des fins publicitaires.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sécurité de vos données</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Vos informations sont stockées de manière sécurisée sur des serveurs protégés. 
              Je prends toutes les mesures nécessaires pour assurer la confidentialité et la sécurité de vos données.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conservation des données</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités 
              décrites dans cette politique, sauf si une période de conservation plus longue est requise ou permise par la loi.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Les critères utilisés pour déterminer nos délais de conservation incluent :
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-4 space-y-2">
              <li>La durée pendant laquelle nous entretenons une relation avec vous</li>
              <li>Nos obligations légales</li>
              <li>Les délais de prescription applicables</li>
              <li>Les litiges ou enquêtes potentiels</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vos droits</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vous avez le contrôle total sur vos données personnelles. Vous pouvez à tout moment :
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Demander l&apos;accès à vos données</li>
              <li>Corriger des informations inexactes</li>
              <li>Demander la suppression de vos données</li>
              <li>Vous opposer à l&apos;utilisation de vos données</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-6">
              Pour exercer ces droits, envoyez simplement un email à :{' '}
              <a href="mailto:nfdev21@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                nfdev21@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ce site n&apos;utilise <strong>aucun cookie de tracking ou publicitaire</strong>. 
              Seule votre préférence de thème (clair/sombre) est enregistrée dans votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modifications de cette politique</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cette politique de confidentialité peut être mise à jour occasionnellement. La date de dernière mise à jour 
              est indiquée en haut de cette page. Nous vous encourageons à consulter cette page régulièrement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

