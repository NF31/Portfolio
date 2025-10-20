'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProjectForm from '../../../components/forms/ProjectForm';
import { useStatsActions } from '../../hooks/useStatsActions';
import Link from 'next/link';
import { Icons } from '@/lib/icons';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  types: string[];
  link: string;
}

const AddProjectPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refreshAfterAction } = useStatsActions();

  const handleSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Projet créé avec succès:', data);
      
      // Toast de succès avec Sonner
      toast.success('Projet créé !', {
        description: `"${data.title}" sauvegardé dans MongoDB`,
        duration: 3000,
      });
      
      // Rafraîchir les statistiques
      await refreshAfterAction('création du projet');
      
      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/admin-projects');
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      
      // Toast d'erreur avec Sonner
      toast.error('Erreur !', {
        description: 'Impossible de sauvegarder le projet',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/admin-projects"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Icons.ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Nouveau Projet</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Créez un nouveau projet pour votre portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
        
      {/* Formulaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        <ProjectForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddProjectPage;