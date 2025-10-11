'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProjectForm from '../../../components/forms/ProjectForm';
import { useStatsActions } from '../../hooks/useStatsActions';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header avec icône */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nouveau Projet
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Créez un nouveau projet pour votre portfolio avec toutes les informations nécessaires
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden dark:bg-gray-800">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Informations du projet</h2>
            <p className="text-blue-100 mt-1">Remplissez les détails de votre nouveau projet</p>
          </div>
          
          <div className="p-8">
            <ProjectForm 
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;