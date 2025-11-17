'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/lib/icons';

interface ImagesFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterProject: string;
  onProjectChange: (project: string) => void;
  filterDate: string;
  onDateChange: (date: string) => void;
  filterFormat: string;
  onFormatChange: (format: string) => void;
}

interface Project {
  _id: string;
  title: string;
}

const ImagesFilters: React.FC<ImagesFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterProject,
  onProjectChange,
  filterDate,
  onDateChange,
  filterFormat,
  onFormatChange
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        const projectsList = data.projects || data.data || [];
        const normalizedProjects = projectsList.map((project: { _id?: string; id?: string; title: string }) => ({
          _id: project._id || project.id,
          title: project.title
        }));
        setProjects(normalizedProjects);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
        <Icons.Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Filtres</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
              placeholder="Description..."
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Projet */}
        <div>
          <label htmlFor="project" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Projet
          </label>
          <select
            id="project"
            value={filterProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Tous les projets</option>
            <option value="no-project">Sans projet</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Période
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select
              id="date"
              value={filterDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Toutes les périodes</option>
              <option value="today">Aujourd&apos;hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>

        {/* Format */}
        <div>
          <label htmlFor="format" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Format
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.ImageIcon className="h-4 w-4 text-gray-400" />
            </div>
            <select
              id="format"
              value={filterFormat}
              onChange={(e) => onFormatChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Tous les formats</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="gif">GIF</option>
              <option value="webp">WebP</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            onSearchChange('');
            onProjectChange('all');
            onDateChange('all');
            onFormatChange('all');
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
        {filterProject !== 'all' && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            Projet: {projects.find(p => p._id === filterProject)?.title || 'Sans projet'}
          </span>
        )}
        {filterDate !== 'all' && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg">
            Période: {filterDate}
          </span>
        )}
        {filterFormat !== 'all' && (
          <span className="px-3 py-1 text-xs sm:text-sm bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 rounded-lg">
            Format: {filterFormat.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesFilters;
