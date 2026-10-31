'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProjectsFilters from './components/ProjectsFilters';
import ProjectsTable from './components/ProjectsTable';
import Pagination from './components/Pagination';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  types: string | string[];
  link?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  isArchived?: boolean;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtrage des projets
  const filteredProjects = projects.filter(project => {
    // Gérer les types (peuvent être un string ou un array)
    const projectTypes = Array.isArray(project.types) ? project.types : [project.types];
    const matchesType = filterType === 'all' || projectTypes.includes(filterType);
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'archived' && project.isArchived) ||
      (filterStatus === 'active' && !project.isArchived);
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Actions
  const handleEdit = (projectId: string) => {
    // Navigation vers la page d'édition
    window.location.href = `/admin-projects/edit/${projectId}`;
  };

  const handleDelete = (projectId: string) => {
    // Navigation vers la page de suppression
    window.location.href = `/admin-projects/delete/${projectId}`;
  };

  const handleArchive = async (projectId: string, isArchived: boolean) => {
    const project = projects.find(p => p.id === projectId);
    const projectTitle = project?.title || 'Projet';
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, { 
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          isArchived,
          // Conserver les autres données existantes
          ...projects.find(p => p.id === projectId)
        })
      });
      
      if (response.ok) {
        // Toast de succès
        toast.success(isArchived ? 'Projet archivé !' : 'Projet désarchivé !', {
          description: `"${projectTitle}" ${isArchived ? 'archivé' : 'restauré'}`,
          duration: 3000,
        });
        
        // Recharger la liste des projets
        await fetchProjects();
      } else {
        const errorData = await response.json();
        toast.error('Erreur lors de l\'archivage', {
          description: errorData.error,
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'archivage:', error);
      toast.error('Erreur lors de l\'archivage', {
        description: 'Une erreur est survenue',
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Gestion des Projets
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Gérez tous vos projets avec pagination et filtres avancés
            </p>
          </div>
          <a
            href="/admin-projects/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau Projet
          </a>
        </div>
      </div>

        {/* Filtres et recherche */}
        <ProjectsFilters
          searchTerm={searchTerm}
          filterType={filterType}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onTypeChange={setFilterType}
          onStatusChange={setFilterStatus}
        />

      {/* Tableau des projets */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden dark:bg-gray-800">
        <ProjectsTable
          projects={currentProjects}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
