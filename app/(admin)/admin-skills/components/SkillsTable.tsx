'use client';

import React from 'react';
import Link from 'next/link';
import { Copy, Edit, Trash2 } from 'lucide-react';
import SkillIcon from '@/app/components/SkillIcon';

interface Skill {
  _id: string;
  name: string;
  description: string;
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isActive: boolean;
  order: number;
  createdAt: string;
}

interface SkillsTableProps {
  skills: Skill[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const SkillsTable: React.FC<SkillsTableProps> = ({
  skills,
  isLoading,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      default: return level;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'backend': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'database': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tools': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'design': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'database': return 'Base de données';
      case 'tools': return 'Outils';
      case 'design': return 'Design';
      case 'other': return 'Autre';
      default: return category;
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">Chargement des compétences...</p>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucune compétence trouvée</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">Aucune compétence ne correspond à vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        {/* Version Desktop - Table */}
        <div className="hidden lg:block">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Compétence
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {skills.map((skill) => (
                <tr key={skill._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <SkillIcon 
                            icon={skill.icon} 
                            iconType={skill.iconType} 
                            name={skill.name}
                            className="w-6 h-6 text-white"
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {skill.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(skill.category)}`}>
                      {getCategoryLabel(skill.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}>
                      {getLevelLabel(skill.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      skill.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {skill.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatDate(skill.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(skill.name)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="Copier le nom"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/admin-skills/edit/${skill._id}`}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        aria-label="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(skill._id)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Version Mobile - Cards */}
        <div className="lg:hidden space-y-4 p-4">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <SkillIcon 
                      icon={skill.icon} 
                      iconType={skill.iconType} 
                      name={skill.name}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {skill.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(skill.category)}`}>
                      {getCategoryLabel(skill.category)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {getLevelLabel(skill.level)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      skill.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {skill.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(skill.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => navigator.clipboard.writeText(skill.name)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Copier le nom"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <Link
                  href={`/admin-skills/edit/${skill._id}`}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onDelete(skill._id)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTable;
