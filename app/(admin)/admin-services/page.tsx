'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import ServicesTable from './components/ServicesTable';
import ServicesFilters from './components/ServicesFilters';
import Pagination from './components/Pagination';
import DeleteConfirmModal from './components/DeleteConfirmModal';

interface Service {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  price?: {
    type: 'fixed' | 'hourly' | 'project';
    amount?: number;
    currency?: string;
  };
  category: string;
  technologies: string[];
  deliveryTime?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  current: number;
  pages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
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
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // États pour la popup de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const router = useRouter();

  // Fonction pour récupérer les services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterStatus !== 'all') params.append('isActive', filterStatus === 'active' ? 'true' : 'false');

      const response = await fetch(`/api/services?${params}`);
      const data = await response.json();

      if (data.success) {
        setServices(data.data);
        setPagination(data.pagination);
      } else {
        console.error('Erreur lors de la récupération des services:', data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les services au montage et lors des changements de filtres
  useEffect(() => {
    fetchServices();
  }, [currentPage, searchTerm, filterCategory, filterStatus]);

  // Fonction pour gérer la suppression
  const handleDelete = (id: string) => {
    const service = services.find(s => s._id === id);
    if (service) {
      setServiceToDelete(service);
      setDeleteModalOpen(true);
    }
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/services/${serviceToDelete._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Service supprimé !', {
          description: `"${serviceToDelete.title}" supprimé définitivement`,
          duration: 3000,
        });
        
        // Fermer la popup et recharger la liste
        setDeleteModalOpen(false);
        setServiceToDelete(null);
        await fetchServices();
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
    setServiceToDelete(null);
  };

  // Fonction pour gérer l'archivage (toggle isActive)
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Rafraîchir la liste
        fetchServices();
      } else {
        console.error('Erreur lors de la mise à jour du service:', data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du service:', error);
    }
  };

  // Fonction pour gérer le toggle featured
  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isFeatured: !currentFeatured
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Rafraîchir la liste
        fetchServices();
      } else {
        console.error('Erreur lors de la mise à jour du service:', data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du service:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 dark:text-white">Gestion des Services</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez les services proposés par votre entreprise
            </p>
          </div>
          <Link
            href="/admin-services/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Service
          </Link>
        </div>
      </div>

      {/* Filtres */}
      <ServicesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Chargement des services...</p>
            </div>
          </div>
        ) : (
          <>
            <ServicesTable
              services={services}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onToggleFeatured={handleToggleFeatured}
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
          </>
        )}
      </div>

      {/* Popup de confirmation de suppression */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        service={serviceToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ServicesPage;
