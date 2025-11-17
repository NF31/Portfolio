'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Icons } from '@/lib/icons';
import Link from 'next/link';
import { toast } from 'sonner';
import ImageReplacer from '../../components/ImageReplacer';

interface ImageFormData {
  alt: string;
  description: string;
  projectId: string;
}

interface Project {
  _id: string;
  title: string;
}

const EditImagePage = () => {
  const router = useRouter();
  const params = useParams();
  const imageId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  interface ImageData {
    _id: string;
    url: string;
    alt: string;
    description?: string;
    projectId?: { _id: string; title?: string } | string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
  }
  
  const [image, setImage] = useState<ImageData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState<ImageFormData>({
    alt: '',
    description: '',
    projectId: ''
  });

  // Charger l'image et les projets
  useEffect(() => {
    if (imageId) {
      fetchImageAndProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  const fetchImageAndProjects = async () => {
    try {
      setIsLoading(true);
      
      // Récupérer l'image et les projets en parallèle
      const [imageResponse, projectsResponse] = await Promise.all([
        fetch(`/api/images/${imageId}`),
        fetch('/api/projects')
      ]);

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        if (imageData.success) {
          setImage(imageData.data);
          setFormData({
            alt: imageData.data.alt || '',
            description: imageData.data.description || '',
            projectId: imageData.data.projectId._id || ''
          });
        } else {
          toast.error('Image non trouvée');
          router.push('/admin-images');
        }
      }

      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        const projectsList = projectsData.projects || projectsData.data || [];
        const normalizedProjects = projectsList.map((project: { _id?: string; id?: string; title: string }) => ({
          _id: project._id || project.id,
          title: project.title
        }));
        setProjects(normalizedProjects);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: string[] = [];
    if (!formData.alt.trim()) newErrors.push('La description de l\'image est requise');
    if (!formData.projectId) newErrors.push('Un projet doit être sélectionné');
    
    setErrors(newErrors);
    
    if (newErrors.length > 0) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Image mise à jour avec succès !');
        router.push('/admin-images');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin-images');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Icons.Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Chargement de l&apos;image...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.X className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image non trouvée</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 mb-4 sm:mb-6">L&apos;image que vous cherchez à modifier n&apos;existe pas.</p>
        <Link
          href="/admin-images"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste des images
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin-images"
              className="p-2 hover:bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors dark:bg-gray-700"
            >
              <Icons.ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Modifier l&apos;image</h1>
              <p className="text-gray-600 dark:text-gray-400">Modifiez les informations de cette image</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
        {/* Aperçu de l'image */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icons.ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
              Aperçu de l&apos;image
            </h3>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 dark:bg-gray-700">
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <p><strong>URL :</strong> <a href={image.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{image.url}</a></p>
              <p><strong>Ajoutée le :</strong> {image.createdAt ? new Date(image.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}</p>
              <p><strong>Projet actuel :</strong> {typeof image.projectId === 'object' && image.projectId !== null ? image.projectId.title || 'Aucun projet' : 'Aucun projet'}</p>
            </div>

            {/* Section de remplacement d&apos;image */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-3">Remplacer l&apos;image</h4>
              <ImageReplacer
                imageId={image._id}
                currentImageUrl={image.url}
                onReplaceSuccess={(newImageData) => {
                  // Mettre à jour l'état local avec les nouvelles données
                  setImage(newImageData);
                  toast.success('Image remplacée avec succès !', {
                    description: 'Redirection vers la liste des images...',
                    duration: 2000,
                  });
                  
                  // Redirection vers la liste des images après 2 secondes
                  setTimeout(() => {
                    router.push('/admin-images');
                  }, 2000);
                }}
              />
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Erreurs */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-red-800 font-medium mb-2">Erreurs à corriger :</h4>
                  <ul className="list-disc list-inside text-red-700 text-xs sm:text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description de l'image */}
              <div>
                <label htmlFor="alt" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description de l&apos;image *
                </label>
                <input
                  type="text"
                  id="alt"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Décrivez cette image..."
                  required
                />
              </div>

              {/* Description détaillée */}
              <div>
                <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description détaillée
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Description plus détaillée de l&apos;image..."
                />
              </div>

              {/* Sélection du projet */}
              <div>
                <label htmlFor="projectId" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Projet associé *
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  className="w-full min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Sélectionnez un projet</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-2 sm:gap-0">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center dark:bg-gray-700"
                >
                  <Icons.X className="w-4 h-4 mr-2" />
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Icons.Save className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImagePage;
