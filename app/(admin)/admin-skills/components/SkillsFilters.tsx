'use client';

import React from 'react';
import { Search, Filter, Code, Star } from 'lucide-react';

interface SkillsFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterCategory: string;
  onCategoryChange: (category: string) => void;
  filterLevel: string;
  onLevelChange: (level: string) => void;
}

const SkillsFilters: React.FC<SkillsFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterLevel,
  onLevelChange
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 gap-2 sm:gap-4">
        {/* Recherche */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-white text-xs sm:text-sm">
            Rechercher
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Nom ou description..." className="placeholder-gray-400 dark:placeholder-gray-500"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-white text-xs sm:text-sm">
            Catégorie
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code className="h-4 w-4 text-gray-400" />
            </div>
            <select
              id="category"
              value={filterCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Toutes les catégories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Base de données</option>
              <option value="tools">Outils</option>
              <option value="design">Design</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        {/* Niveau */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-white text-xs sm:text-sm">
            Niveau
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Star className="h-4 w-4 text-gray-400" />
            </div>
            <select
              id="level"
              value={filterLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Tous les niveaux</option>
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            onSearchChange('');
            onCategoryChange('all');
            onLevelChange('all');
          }}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-white text-xs sm:text-sm"
        >
          Réinitialiser
        </button>
        {searchTerm && (
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm">
            Recherche: "{searchTerm}"
          </span>
        )}
        {filterCategory !== 'all' && (
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm">
            Catégorie: {filterCategory}
          </span>
        )}
        {filterLevel !== 'all' && (
          <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg text-xs sm:text-sm">
            Niveau: {filterLevel}
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillsFilters;
