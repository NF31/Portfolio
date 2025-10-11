'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useStatsActions } from '../hooks/useStatsActions';
import SkillsFilters from './components/SkillsFilters';
import SkillsTable from './components/SkillsTable';
import Pagination from './components/Pagination';
import DeleteConfirmModal from './components/DeleteConfirmModal';

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

interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  });

  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // États pour la popup de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refreshAfterAction } = useStatsActions();

  // Fonction pour récupérer les compétences
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterLevel !== 'all') params.append('level', filterLevel);

      const response = await fetch(`/api/skills?${params}`);
      const data = await response.json();

      if (data.success) {
        setSkills(data.data);
        setPagination(data.pagination);
      } else {
        console.error('Erreur lors de la récupération des compétences:', data.error);
        toast.error('Erreur lors du chargement des compétences');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      toast.error('Erreur lors du chargement des compétences');
    } finally {
      setLoading(false);
    }
  };

  // Charger les compétences au montage et lors des changements de filtres
  useEffect(() => {
    fetchSkills();
  }, [currentPage, searchTerm, filterCategory, filterLevel]);

  // Fonction pour gérer la suppression
  const handleDelete = (id: string) => {
    const skill = skills.find(s => s._id === id);
    if (skill) {
      setSkillToDelete(skill);
      setDeleteModalOpen(true);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/skills/${skillToDelete._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Compétence supprimée !', {
          description: `"${skillToDelete.name}" supprimée définitivement`,
          duration: 3000,
        });

        // Fermer la popup et recharger la liste
        setDeleteModalOpen(false);
        setSkillToDelete(null);
        await fetchSkills();
        // Rafraîchir les statistiques
        await refreshAfterAction('suppression de compétence');
      } else {
        const errorData = await response.json();
        toast.error('Erreur lors de la suppression', {
          description: errorData.error || 'Une erreur est survenue',
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression', {
        description: 'Une erreur est survenue',
        duration: 4000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Fonction pour annuler la suppression
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 dark:text-white">Gestion des Compétences</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez vos compétences techniques et soft skills
            </p>
          </div>
          <Link
            href="/admin-skills/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Compétence
          </Link>
        </div>
      </div>

      {/* Filtres */}
      <SkillsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        filterLevel={filterLevel}
        onLevelChange={setFilterLevel}
      />

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800">
        <SkillsTable
          skills={skills}
          isLoading={loading}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.pages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Popup de confirmation de suppression */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        skill={skillToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SkillsPage;
