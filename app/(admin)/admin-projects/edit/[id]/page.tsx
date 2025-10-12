'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

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

const EditProjectPage = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    types: [] as string[],
    link: '',
    isArchived: false
  });

  const [newTech, setNewTech] = useState('');

  // Types de projets disponibles
  const projectTypes = [
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'data', label: 'Data' },
    { value: 'design', label: 'Design' },
    { value: 'autre', label: 'Autre' }
  ];

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/${projectId}`);
      
      if (!response.ok) {
        throw new Error('Projet non trouvé');
      }

      const data = await response.json();
      setProject(data.project);
      
      // Pré-remplir le formulaire
      setFormData({
        title: data.project.title,
        description: data.project.description,
        technologies: data.project.technologies || [],
        types: Array.isArray(data.project.types) ? data.project.types : [data.project.types], // Convertir en array
        link: data.project.link || '',
        isArchived: data.project.isArchived || false
      });
    } catch (error) {
      console.error('Erreur lors du chargement du projet:', error);
      setError('Erreur lors du chargement du projet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTypeChange = (typeValue: string) => {
    setFormData(prev => {
      const currentTypes = Array.isArray(prev.types) ? prev.types : [prev.types];
      return {
        ...prev,
        types: currentTypes.includes(typeValue)
          ? currentTypes.filter(t => t !== typeValue)
          : [...currentTypes, typeValue]
      };
    });
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Validation
      if (!formData.title.trim() || !formData.description.trim()) {
        throw new Error('Le titre et la description sont requis');
      }

      if (formData.technologies.length === 0) {
        throw new Error('Au moins une technologie est requise');
      }

      if (formData.types.length === 0) {
        throw new Error('Au moins un type de projet est requis');
      }

      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          technologies: formData.technologies,
          types: formData.types,
          type: formData.types[0], // Garder le premier type pour compatibilité
          link: formData.link.trim() || undefined,
          isArchived: formData.isArchived
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la modification');
      }

      // Toast de succès avec Sonner
      toast.success('Projet modifié !', {
        description: `"${formData.title}" mis à jour avec succès`,
        duration: 3000,
      });
      
      // Redirection vers la liste des projets
      router.push('/admin-projects');
    } catch (error: any) {
      console.error('Erreur lors de la modification:', error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Projet non trouvé</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 mb-4 sm:mb-6">Le projet que vous cherchez n'existe pas ou a été supprimé.</p>
          <button
            onClick={() => router.push('/projects')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 px-4 sm:px-6 px-4 sm:px-6 px-4 sm:px-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Modifier le Projet
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Modifiez les informations de votre projet
              </p>
            </div>
            <button
              onClick={() => router.push('/projects')}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-900 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 dark:bg-gray-800">
          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg mb-4 sm:mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-red-800 text-xs sm:text-sm text-xs sm:text-sm text-xs sm:text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}


          <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8 p-4 sm:p-6 p-4 sm:p-6">
            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre du projet *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Entrez le titre du projet" className="placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Décrivez votre projet en détail" className="placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            {/* Types de projet */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Types de projet *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {projectTypes.map(type => (
                  <label
                    key={type.value}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      (Array.isArray(formData.types) ? formData.types : [formData.types]).includes(type.value)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 dark:border-gray-600 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={(Array.isArray(formData.types) ? formData.types : [formData.types]).includes(type.value)}
                      onChange={() => handleTypeChange(type.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded mr-3"
                    />
                    <span className="text-sm font-medium text-xs sm:text-sm text-xs sm:text-sm text-xs sm:text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                  placeholder="Ajouter une technologie" className="placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium px-4 sm:px-6 px-4 sm:px-6 px-4 sm:px-6"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm text-xs sm:text-sm text-xs sm:text-sm text-xs sm:text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Lien du projet */}
            <div>
              <label htmlFor="link" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lien du projet (optionnel)
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="https://exemple.com" className="placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Statut d'archivage */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <input
                type="checkbox"
                id="isArchived"
                name="isArchived"
                checked={formData.isArchived}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-2 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="isArchived" className="ml-3 block text-sm font-medium text-gray-700 text-xs sm:text-sm text-xs sm:text-sm text-xs sm:text-sm">
                Archiver ce projet
              </label>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700 gap-2 sm:gap-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-0 gap-2 sm:gap-4 gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => router.push('/projects')}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:bg-gray-900 transition-all duration-200 px-4 sm:px-6 px-4 sm:px-6 px-4 sm:px-6"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-6 px-4 sm:px-6 px-4 sm:px-6"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sauvegarde...
                  </div>
                ) : (
                  'Sauvegarder les modifications'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectPage;
