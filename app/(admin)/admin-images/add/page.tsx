'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CloudinaryUpload from '@/app/components/CloudinaryUpload';
import { toast } from 'sonner';
import { useStatsActions } from '../../hooks/useStatsActions';

interface Project {
  _id: string;
  title: string;
}

export default function AddImagePage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { refreshAfterAction } = useStatsActions();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('🔍 Récupération des projets pour l\'ajout d\'image...');
      const response = await fetch('/api/projects');
      console.log('📡 Réponse API projets:', response.status, response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📋 Données reçues:', data);
        console.log('📊 Structure des données:', {
          hasProjects: !!data.projects,
          hasData: !!data.data,
          projectsLength: data.projects?.length || 0,
          dataLength: data.data?.length || 0
        });
        
        // Utiliser data.projects car c'est ce que retourne votre API
        const projectsList = data.projects || data.data || [];
        console.log('📝 Liste des projets:', projectsList);
        console.log('🏷️ Titres des projets:', projectsList.map((p: any) => p.title));
        console.log('🆔 IDs des projets:', projectsList.map((p: any) => p._id || p.id));
        
        // Normaliser les données pour s'assurer d'avoir _id et title
        const normalizedProjects = projectsList.map((project: any) => ({
          _id: project._id || project.id,
          title: project.title
        }));
        
        console.log('✅ Projets normalisés:', normalizedProjects);
        setProjects(normalizedProjects);
      } else {
        console.error('❌ Erreur de réponse:', response.status);
      }
    } catch (error) {
      console.error('💥 Erreur lors du chargement des projets:', error);
      toast.error('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (imageData: any) => {
    console.log('Image uploadée avec succès:', imageData);
    toast.success('Image ajoutée avec succès !');
    // Rafraîchir les statistiques
    await refreshAfterAction('ajout d\'image');
    router.push('/admin-images');
  };

  const handleUploadError = (error: string) => {
    console.error('Erreur lors de l\'upload:', error);
    toast.error(error);
  };

  if (loading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ajouter une nouvelle image
          </h1>

      {/* Sélection du projet */}
          <div className="mb-6">
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Associer à un projet *
          </label>
          <select
            id="project"
              value={selectedProjectId}
            onChange={(e) => {
                const projectId = e.target.value;
                const selectedProject = projects.find(p => (p._id || p.id) === projectId);
                console.log('🔄 Projet sélectionné ID:', projectId);
                console.log('🏷️ Titre du projet:', selectedProject?.title);
                setSelectedProjectId(projectId);
                setSelectedProjectTitle(selectedProject?.title || '');
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            >
              <option value="">Sélectionnez un projet</option>
              {projects.map((project) => (
                <option key={project._id || project.id} value={project._id || project.id}>
                    {project.title}
                  </option>
              ))}
          </select>
          </div>

          {/* Upload Cloudinary */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Image à uploader
            </label>
            {selectedProjectId ? (
              <div>
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                    <strong>Projet sélectionné :</strong> {selectedProjectTitle}
              </p>
            </div>
                <CloudinaryUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                  projectId={selectedProjectId}
                  projectTitle={selectedProjectTitle}
                />
              </div>
            ) : (
              <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Veuillez sélectionner un projet pour uploader une image</p>
              </div>
            )}
      </div>

          {/* Informations */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Informations importantes :
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Les images sont automatiquement optimisées par Cloudinary</li>
              <li>• Formats supportés : PNG, JPG, GIF, WebP</li>
              <li>• Taille maximale : 10MB</li>
              <li>• L'image sera stockée dans le dossier "portfolio" sur Cloudinary</li>
              <li>• Cette image sera associée au projet sélectionné</li>
            </ul>
          </div>
          
          {/* Bouton retour */}
          <div className="mt-6 flex justify-end">
          <button
              onClick={() => router.push('/admin-images')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:text-gray-200 transition-colors"
          >
              Retour à la liste des images
          </button>
        </div>
      </div>
    </div>
  );
}