'use client';

import { Icons } from '@/lib/icons';

const BackButton = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
    >
      <Icons.ArrowLeft className="w-4 h-4" />
      Page précédente
    </button>
  );
};

export default BackButton;
