import Link from 'next/link';
import { Icons } from '@/lib/icons';
import BackButton from './components/BackButton';

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icône d'erreur admin */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
            <Icons.Shield className="w-12 h-12 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23F97316%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        {/* Titre principal */}
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Section Admin non trouvée
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Cette section d'administration n'existe pas ou a été déplacée.
        </p>

        {/* Boutons d'action */}
        <div className="space-y-4">
          <Link
            href="/admin-dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Icons.Home className="w-5 h-5" />
            Dashboard Admin
          </Link>
          
          <div className="pt-2">
            <BackButton />
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-2">
            <Icons.Lock className="w-4 h-4" />
            Zone sécurisée
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Accès restreint aux administrateurs autorisés.
          </p>
        </div>
      </div>
    </div>
  );
}
