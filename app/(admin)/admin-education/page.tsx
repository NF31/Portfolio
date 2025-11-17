'use client';

import React from 'react';
import { Icons } from '@/lib/icons';

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Formation & Certifications</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Gérez vos formations, certifications et parcours éducatif
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium opacity-50 cursor-not-allowed text-sm sm:text-base whitespace-nowrap">
            <Icons.Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Nouvelle Formation
          </button>
        </div>
      </div>

      {/* Contenu temporaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Section Formation en développement</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            Cette section permettra de gérer vos formations, certifications et parcours éducatif.
            <br />
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Fonctionnalité prévue pour une future version
            </span>
          </p>
          
          {/* Suggestions de contenu */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
            <h4 className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">Idées de contenu à ajouter :</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              <div className="flex items-center gap-2">
                <Icons.BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Formations techniques</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Award className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Parcours d&apos;apprentissage</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Projets d&apos;étude</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
