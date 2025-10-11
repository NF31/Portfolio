'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';

interface ServiceFormData {
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  price: {
    type: 'fixed' | 'hourly' | 'project';
    amount?: number;
    currency?: string;
  };
  category: string;
  technologies: string[];
  deliveryTime: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const EditServicePage = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [service, setService] = useState<ServiceFormData | null>(null);

  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    shortDescription: '',
    icon: 'Briefcase',
    features: [''],
    price: {
      type: 'project',
      amount: undefined,
      currency: 'EUR'
    },
    category: 'web',
    technologies: [''],
    deliveryTime: '',
    isActive: true,
    isFeatured: false,
    order: 0
  });

  // Liste des icônes disponibles
  const availableIcons = [
    'Briefcase', 'Code', 'Palette', 'Smartphone', 'Monitor', 'Database',
    'Cloud', 'Shield', 'Zap', 'Rocket', 'Target', 'Settings', 'Globe',
    'Layers', 'Box', 'Wrench', 'Search', 'TrendingUp', 'Users', 'Star'
  ];

  // Catégories de services
  const serviceCategories = [
    { value: 'web', label: 'Développement Web' },
    { value: 'mobile', label: 'Développement Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'other', label: 'Autre' }
  ];

  // Charger les données du service
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/services/${serviceId}`);
        const data = await response.json();

        if (data.success && data.service) {
          const serviceData = data.service;
          setService(serviceData);
          setFormData({
            title: serviceData.title || '',
            description: serviceData.description || '',
            shortDescription: serviceData.shortDescription || '',
            icon: serviceData.icon || 'Briefcase',
            features: serviceData.features && serviceData.features.length > 0 ? serviceData.features : [''],
            price: {
              type: serviceData.price?.type || 'project',
              amount: serviceData.price?.amount || undefined,
              currency: serviceData.price?.currency || 'EUR'
            },
            category: serviceData.category || 'web',
            technologies: serviceData.technologies && serviceData.technologies.length > 0 ? serviceData.technologies : [''],
            deliveryTime: serviceData.deliveryTime || '',
            isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
            isFeatured: serviceData.isFeatured !== undefined ? serviceData.isFeatured : false,
            order: serviceData.order || 0
          });
        } else {
          toast.error('Service non trouvé');
          router.push('/admin-services');
        }
      } catch (error) {
        console.error('Erreur lors du chargement du service:', error);
        toast.error('Erreur lors du chargement du service');
        router.push('/admin-services');
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId, router]);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('price.')) {
      const priceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        price: {
          ...prev.price,
          [priceField]: priceField === 'amount' ? (value ? Number(value) : undefined) : value
        }
      }));
    } else if (type === 'checkbox') {
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

  // Gérer les fonctionnalités
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  // Gérer les technologies
  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData(prev => ({
      ...prev,
      technologies: newTechnologies
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }));
  };

  const removeTechnology = (index: number) => {
    if (formData.technologies.length > 1) {
      const newTechnologies = formData.technologies.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        technologies: newTechnologies
      }));
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Nettoyer les données avant envoi
      const cleanFormData = {
        ...formData,
        features: formData.features.filter(feature => feature.trim() !== ''),
        technologies: formData.technologies.filter(tech => tech.trim() !== '')
      };

      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFormData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Service modifié avec succès !');
        router.push('/admin-services');
      } else {
        // Afficher les erreurs de validation
        if (data.details && Array.isArray(data.details)) {
          setErrors(data.details);
        } else {
          setErrors([data.error || 'Erreur lors de la modification du service']);
        }
        toast.error('Erreur lors de la modification du service');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du service:', error);
      setErrors(['Erreur de connexion. Veuillez réessayer.']);
      toast.error('Erreur lors de la modification du service');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Chargement du service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Service non trouvé</p>
          <Link href="/admin-services" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin-services"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors dark:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Modifier le Service</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Modifiez les informations de votre service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 dark:bg-gray-800">
        {/* Affichage des erreurs */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Erreurs de validation :
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Informations de base
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                  Titre du service *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                  placeholder="Ex: Développement Web" className="placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {serviceCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                Description courte *
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                maxLength={200}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Une phrase qui décrit votre service" className="placeholder-gray-400 dark:placeholder-gray-500"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.shortDescription.length}/200 caractères
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                Description complète *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Description détaillée de votre service..." className="placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Icône et apparence */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Icône et apparence
            </h2>
            
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                Icône *
              </label>
              <div className="grid grid-cols-6 gap-2">
                {availableIcons.map(iconName => {
                  const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<any>;
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        formData.icon === iconName
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 dark:border-gray-600 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                      title={iconName}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5 mx-auto" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Icône sélectionnée : {formData.icon}
              </p>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Fonctionnalités
            </h2>
            
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Fonctionnalité du service" className="placeholder-gray-400 dark:placeholder-gray-500"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                + Ajouter une fonctionnalité
              </button>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Technologies
            </h2>
            
            <div className="space-y-3">
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder="Technologie utilisée" className="placeholder-gray-400 dark:placeholder-gray-500"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  {formData.technologies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTechnology}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                + Ajouter une technologie
              </button>
            </div>
          </div>

          {/* Prix et délais */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Prix et délais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="price.type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                  Type de prix
                </label>
                <select
                  id="price.type"
                  name="price.type"
                  value={formData.price.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="project">Sur devis</option>
                  <option value="fixed">Prix fixe</option>
                  <option value="hourly">À l'heure</option>
                </select>
              </div>

              {formData.price.type !== 'project' && (
                <div>
                  <label htmlFor="price.amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                    Montant
                  </label>
                  <input
                    type="number"
                    id="price.amount"
                    name="price.amount"
                    value={formData.price.amount || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                    placeholder="0" className="placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              )}

              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
                  Délai de livraison
                </label>
                <input
                  type="text"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500"
                  placeholder="Ex: 2-4 semaines" className="placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Options
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Service actif (visible sur le site)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Service mis en avant (avec étoile)
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin-services"
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium dark:bg-gray-700"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Modification...' : 'Modifier le service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServicePage;
