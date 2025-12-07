'use client';

import { useRouter } from 'next/navigation';
import { Icons } from '@/lib/icons';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // Vérifier si on peut revenir en arrière
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      // Si pas d'historique, rediriger vers le dashboard admin
      router.push('/admin-dashboard');
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
    >
      <Icons.ArrowLeft className="w-4 h-4" />
      Page précédente
    </button>
  );
};

export default BackButton;
