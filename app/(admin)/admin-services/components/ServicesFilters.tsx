'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/lib/icons';

interface ServicesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onCategoryChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
}

const ServicesFilters: React.FC<ServicesFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange
}) => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/services/categories');
      if (response.ok) {
        const data = await response.json();
        setAvailableCategories(data.categories);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
        <Icons.Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Recherche */}
        <div>
          <label htmlFor="search" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rechercher
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Titre, description..."
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Toutes les catégories</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Statut */}
        <div>
          <label htmlFor="status" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Statut
          </label>
          <select
            id="status"
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            onSearchChange('');
            onCategoryChange('all');
            onStatusChange('all');
          }}
          className="px-3 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Réinitialiser
        </button>
        {searchTerm && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg">
            Recherche: &quot;{searchTerm}&quot;
          </span>
        )}
        {filterCategory !== 'all' && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            Catégorie: {filterCategory}
          </span>
        )}
        {filterStatus !== 'all' && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg">
            Statut: {filterStatus}
          </span>
        )}
      </div>
    </div>
  );
};

export default ServicesFilters;
