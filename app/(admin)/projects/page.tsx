'use client';

import React, { useState, useEffect } from 'react';
import ProjectsFilters from './components/ProjectsFilters';
import ProjectsTable from './components/ProjectsTable';
import Pagination from './components/Pagination';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  type: string;
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

  useEffect(() => {
    fetchProjects();
  }, []);

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

  // Filtrage des projets
  const filteredProjects = projects.filter(project => {
    const matchesType = filterType === 'all' || project.type === filterType;
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
    console.log('Edit project:', projectId);
    // TODO: Implémenter la navigation vers la page d'édition
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        // TODO: Implémenter l'API de suppression
        console.log('Delete project:', projectId);
        // await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
        // fetchProjects(); // Recharger la liste
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleArchive = async (projectId: string, isArchived: boolean) => {
    try {
      // TODO: Implémenter l'API d'archivage
      console.log('Archive project:', projectId, isArchived);
      // await fetch(`/api/projects/${projectId}`, { 
      //   method: 'PATCH', 
      //   body: JSON.stringify({ isArchived }) 
      // });
      // fetchProjects(); // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de l\'archivage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Projets
              </h1>
              <p className="text-gray-600">
                Gérez tous vos projets avec pagination et filtres avancés
              </p>
            </div>
            <a
              href="/projects/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <ProjectsTable
            projects={currentProjects}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProjects.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
