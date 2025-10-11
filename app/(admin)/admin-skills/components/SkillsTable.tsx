'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Copy, Edit, Trash2 } from 'lucide-react';
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
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      case 'frontend': return 'bg-blue-100 text-blue-800';
      case 'backend': return 'bg-green-100 text-green-800';
      case 'database': return 'bg-purple-100 text-purple-800';
      case 'tools': return 'bg-orange-100 text-orange-800';
      case 'design': return 'bg-pink-100 text-pink-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <p className="mt-4 text-gray-600">Chargement des compétences...</p>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune compétence trouvée</h3>
        <p className="text-gray-600 mb-6">Aucune compétence ne correspond à vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <>
      {/* En-tête du tableau */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
          <div className="col-span-3">Compétence</div>
          <div className="col-span-2">Catégorie</div>
          <div className="col-span-2">Niveau</div>
          <div className="col-span-2">Statut</div>
          <div className="col-span-2">Ajoutée le</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
      </div>

      {/* Corps du tableau */}
      <div className="divide-y divide-gray-200">
        {skills.map((skill) => (
          <div key={skill._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Compétence */}
              <div className="col-span-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <SkillIcon 
                        icon={skill.icon} 
                        iconType={skill.iconType} 
                        name={skill.name}
                        className="w-5 h-5 text-white"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {skill.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Catégorie */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(skill.category)}`}>
                  {getCategoryLabel(skill.category)}
                </span>
              </div>

              {/* Niveau */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                  {getLevelLabel(skill.level)}
                </span>
              </div>

              {/* Statut */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  skill.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {skill.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <span className="text-sm text-gray-900">
                  {formatDate(skill.createdAt)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end space-x-1">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(skill.name);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Copier le nom"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <Link
                  href={`/admin-skills/edit/${skill._id}`}
                  className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onDelete(skill._id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsTable;
