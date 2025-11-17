'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/lib/icons';
import { toast } from 'sonner';
import { useStatsActions } from '../hooks/useStatsActions';
import ImagesFilters from './components/ImagesFilters';
import ImagesTable from './components/ImagesTable';
import Pagination from './components/Pagination';
import DeleteConfirmModal from './components/DeleteConfirmModal';

interface Image {
  _id: string;
  url: string;
  alt: string;
  projectId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImagesPage = () => {
  const [images, setImages] = useState<Image[]>([]);
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
  const [filterProject, setFilterProject] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterFormat, setFilterFormat] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // États pour la popup de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<Image | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refreshAfterAction } = useStatsActions();

  // Fonction pour récupérer les images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (filterProject !== 'all') params.append('projectId', filterProject);
      if (filterDate !== 'all') params.append('date', filterDate);
      if (filterFormat !== 'all') params.append('format', filterFormat);

      const response = await fetch(`/api/images?${params}`);
      const data = await response.json();

      if (data.success) {
        setImages(data.data);
        setPagination(data.pagination);
      } else {
        console.error('Erreur lors de la récupération des images:', data.error);
        toast.error('Erreur lors du chargement des images');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      toast.error('Erreur lors du chargement des images');
    } finally {
      setLoading(false);
    }
  };

  // Charger les images au montage et lors des changements de filtres
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, filterProject, filterDate, filterFormat]);

  // Fonction pour gérer la suppression
  const handleDelete = (id: string) => {
    const image = images.find(img => img._id === id);
    if (image) {
      setImageToDelete(image);
      setDeleteModalOpen(true);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/images/${imageToDelete._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Image supprimée !', {
          description: `"${imageToDelete.alt}" supprimée définitivement`,
          duration: 3000,
        });
        
        // Fermer la popup et recharger la liste
        setDeleteModalOpen(false);
        setImageToDelete(null);
        await fetchImages();
        // Rafraîchir les statistiques
        await refreshAfterAction('suppression d\'image');
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
    setImageToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestion des Images</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Gérez les images de votre portfolio
            </p>
          </div>
          <Link
            href="/admin-images/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Icons.Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Nouvelle Image
          </Link>
        </div>
      </div>

      {/* Filtres */}
      <ImagesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterProject={filterProject}
        onProjectChange={setFilterProject}
        filterDate={filterDate}
        onDateChange={setFilterDate}
        filterFormat={filterFormat}
        onFormatChange={setFilterFormat}
      />

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800">
        <ImagesTable
          images={images}
          isLoading={loading}
          onDelete={handleDelete}
        />
        
        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700">
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
        image={imageToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ImagesPage;