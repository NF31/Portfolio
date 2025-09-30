'use client';

import React, { useState } from 'react';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  types: string[];
  link: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  initialData?: Partial<ProjectFormData>;
  isLoading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  onSubmit, 
  initialData = {}, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    technologies: [],
    types: [],
    link: '',
    ...initialData
  });
  
  const [newTech, setNewTech] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type) 
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Title validation (3-100 caractères)
    if (!formData.title || formData.title.length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères.';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Le titre doit contenir au maximum 100 caractères.';
    }

    // Description validation (min 10 caractères)
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères.';
    }

    // Technologies validation (minimum 1)
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'Vous devez sélectionner au moins une technologie.';
    }

    // Types validation (minimum 1)
    if (formData.types.length === 0) {
      newErrors.types = 'Vous devez sélectionner au moins un type de projet.';
    }

    // Link validation (URL valide si renseignée)
    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = 'Le lien doit être une URL valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la création du projet');
        }

        const result = await response.json();
        console.log('API Response:', result);
        onSubmit(formData);
        
        // Reset form after successful submission
        setFormData({
          title: '',
          description: '',
          technologies: [],
          types: [],
          link: ''
        });
        setNewTech('');
        setErrors({});
        
      } catch (error) {
        console.error('Erreur:', error);
        setErrors({ submit: error instanceof Error ? error.message : 'Erreur inconnue' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Titre du projet */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Titre du projet
            <span className="text-red-500">*</span>
          </span>
        </label>
        <input 
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            errors.title 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
          }`}
          placeholder="Ex: Site e-commerce moderne"
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>
      
      {/* Description */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description détaillée
            <span className="text-red-500">*</span>
          </span>
        </label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
            errors.description 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
          }`}
          rows={4}
          placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités, défis techniques..."
          minLength={10}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.description}
          </p>
        )}
      </div>
      
      {/* Technologies */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Technologies utilisées
            <span className="text-red-500">*</span>
          </span>
        </label>
        <div className="flex gap-3">
          <input 
            type="text" 
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all duration-200"
            placeholder="Ex: React, Next.js, TypeScript..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
          />
          <button 
            type="button"
            onClick={addTechnology}
            className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              !newTech.trim() 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        {/* Liste des technologies ajoutées */}
        {formData.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-1 text-blue-600 hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
        
        {errors.technologies && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.technologies}
          </p>
        )}
      </div>
      
      {/* Types de projet */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-4 group-focus-within:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Types de projet
            <span className="text-red-500">*</span>
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { value: 'web', label: 'Web', icon: '🌐', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
            { value: 'mobile', label: 'Mobile', icon: '📱', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
            { value: 'fullstack', label: 'Fullstack', icon: '⚡', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
            { value: 'data', label: 'Data', icon: '📊', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
            { value: 'design', label: 'Design', icon: '🎨', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
            { value: 'autre', label: 'Autre', icon: '🔧', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' }
          ].map((type) => (
            <label 
              key={type.value} 
              className={`relative cursor-pointer group transition-all duration-200 ${
                formData.types.includes(type.value) 
                  ? `${type.bgColor} ${type.borderColor} border-2 shadow-lg transform scale-105` 
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.types.includes(type.value)}
                onChange={() => handleTypeChange(type.value)}
                className="sr-only"
              />
              <div className="p-4 rounded-xl transition-all duration-200">
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                    {type.icon}
                  </div>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-semibold ${
                    formData.types.includes(type.value) 
                      ? 'text-gray-900' 
                      : 'text-gray-700'
                  }`}>
                    {type.label}
                  </span>
                </div>
                {formData.types.includes(type.value) && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
        {errors.types && (
          <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.types}
          </p>
        )}
      </div>
      
      {/* Lien du projet */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lien du projet
          </span>
        </label>
        <input 
          type="url" 
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
            errors.link 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
          }`}
          placeholder="https://github.com/username/project"
        />
        {errors.link && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.link}
          </p>
        )}
      </div>
      
      {/* Note sur les images */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Gestion des images
            </h3>
            <p className="text-blue-800 leading-relaxed">
              Les images seront ajoutées après la création du projet via la section 
              <span className="font-semibold text-blue-900"> Gestion des images</span> dans l&apos;interface d&apos;administration.
            </p>
          </div>
        </div>
      </div>
      
      {/* Affichage des erreurs de soumission */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800 font-medium">{errors.submit}</span>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <button 
          type="submit"
          disabled={isLoading}
          className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
          {isLoading ? 'Création en cours...' : 'Créer le projet'}
        </button>
        <button 
          type="button"
          disabled={isLoading}
          className="flex-1 sm:flex-none px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
