'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/lib/icons';

import Link from 'next/link';
import { toast } from 'sonner';


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

const AddServicePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

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

  // Liste des icônes disponibles (organisées par catégorie)
  const availableIcons = [
    // Web & Développement
    'Globe', 'Monitor', 'Laptop', 'Code', 'Code2', 'Terminal', 'Browser',
    'Window', 'Layout', 'Layers', 'Grid', 'Box', 'Package',
    
    // Mobile & Design
    'Smartphone', 'Tablet', 'Palette', 'Brush', 'Paintbrush', 'Image',
    'Camera', 'Video', 'Film', 'Mic', 'Headphones',
    
    // Technologies & Outils
    'Database', 'Server', 'Cloud', 'Shield', 'Lock', 'Key', 'Cpu',
    'HardDrive', 'Wifi', 'Bluetooth', 'Zap', 'Bolt', 'Activity',
    
    // Business & Services
    'Briefcase', 'Target', 'TrendingUp', 'BarChart', 'PieChart',
    'Users', 'User', 'UserPlus', 'Building', 'Building2',
    
    // Actions & Navigation
    'Rocket', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft',
    'Search', 'Settings', 'Wrench', 'Tool', 'Cog',
    
    // Communication & Support
    'MessageCircle', 'Mail', 'Phone', 'Calendar', 'Clock',
    'MapPin', 'Navigation', 'Compass',
    
    // Divers
    'Star', 'Heart', 'ThumbsUp', 'Award', 'Trophy', 'Medal',
    'Gift', 'Lightbulb', 'Book', 'FileText', 'Folder'
  ];

  // Charger les catégories disponibles
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/services/categories');
      if (response.ok) {
        const data = await response.json();
        setAvailableCategories(data.categories);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const addNewCategory = () => {
    if (newCategory.trim() && !availableCategories.includes(newCategory.trim().toLowerCase())) {
      const categoryValue = newCategory.trim().toLowerCase();
      setAvailableCategories(prev => [...prev, categoryValue]);
      setFormData(prev => ({ ...prev, category: categoryValue }));
      setNewCategory('');
    }
  };

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
    setErrors([]); // Réinitialiser les erreurs

    try {
      // Nettoyer les données avant envoi
      const cleanFormData = {
        ...formData,
        features: formData.features.filter(feature => feature.trim() !== ''),
        technologies: formData.technologies.filter(tech => tech.trim() !== ''),
        createdBy: '507f1f77bcf86cd799439011' // TODO: Remplacer par l'ID utilisateur réel
      };

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFormData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Service créé avec succès !');
        router.push('/admin-services');
      } else {
        // Afficher les erreurs de validation
        if (data.details && Array.isArray(data.details)) {
          setErrors(data.details);
        } else {
          setErrors([data.error || 'Erreur lors de la création du service']);
        }
        toast.error('Erreur lors de la création du service');
      }
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
      setErrors(['Erreur de connexion. Veuillez réessayer.']);
      toast.error('Erreur lors de la création du service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/admin-services"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Icons.ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Nouveau Service</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Créez un nouveau service pour votre portfolio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        {/* Affichage des erreurs */}
        {errors.length > 0 && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Erreurs de validation :
            </h3>
            <ul className="text-xs sm:text-sm text-red-700 dark:text-red-300 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Informations de base */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Informations de base
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre du service *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ex: Développement Web"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catégorie *
                </label>
                <div className="space-y-3">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {availableCategories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  
                  {/* Ajouter une nouvelle catégorie */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Nouvelle catégorie"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={addNewCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Une phrase qui décrit votre service"
              />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.shortDescription.length}/200 caractères
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description complète *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Description détaillée de votre service..."
              />
            </div>
          </div>

          {/* Icône et apparence */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Icône et apparence
            </h2>
            
            <div>
              <label htmlFor="icon" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Icône *
              </label>
              
              {/* Icône sélectionnée */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                    {(() => {
                      const IconComponent = (Icons as any)[formData.icon];
                      return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Sparkles className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Icône sélectionnée : {formData.icon}
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Aperçu de l'icône dans votre service
                    </p>
                  </div>
                </div>
              </div>

              {/* Grille d'icônes organisée par catégories */}
              <div className="space-y-4">
                {/* Web & Développement */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🌐 Web & Développement</h4>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {['Globe', 'Monitor', 'Laptop', 'Code', 'Code2', 'Terminal', 'Browser', 'Window', 'Layout', 'Layers', 'Grid', 'Box'].map(iconName => {
                      const IconComponent = (Icons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                          className={`p-2 border-2 rounded-lg transition-all hover:scale-105 ${
                            formData.icon === iconName
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-md'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                          }`}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 mx-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile & Design */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📱 Mobile & Design</h4>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {['Smartphone', 'Tablet', 'Palette', 'Brush', 'Paintbrush', 'Image', 'Camera', 'Video', 'Film', 'Mic', 'Headphones'].map(iconName => {
                      const IconComponent = (Icons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                          className={`p-2 border-2 rounded-lg transition-all hover:scale-105 ${
                            formData.icon === iconName
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-md'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                          }`}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 mx-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technologies & Outils */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">⚙️ Technologies & Outils</h4>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {['Database', 'Server', 'Cloud', 'Shield', 'Lock', 'Key', 'Cpu', 'HardDrive', 'Wifi', 'Bluetooth', 'Zap', 'Bolt'].map(iconName => {
                      const IconComponent = (Icons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                          className={`p-2 border-2 rounded-lg transition-all hover:scale-105 ${
                            formData.icon === iconName
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-md'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                          }`}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 mx-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Business & Services */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">💼 Business & Services</h4>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {['Briefcase', 'Target', 'TrendingUp', 'BarChart', 'PieChart', 'Users', 'User', 'UserPlus', 'Building', 'Building2', 'Rocket', 'Star'].map(iconName => {
                      const IconComponent = (Icons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                          className={`p-2 border-2 rounded-lg transition-all hover:scale-105 ${
                            formData.icon === iconName
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-md'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                          }`}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 mx-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Fonctionnalités
            </h2>
            
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Fonctionnalité du service"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 sm:p-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                + Ajouter une fonctionnalité
              </button>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Technologies
            </h2>
            
            <div className="space-y-3">
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder="Technologie utilisée"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  {formData.technologies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="p-2 sm:p-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTechnology}
                className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                + Ajouter une technologie
              </button>
            </div>
          </div>

          {/* Prix et délais */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Prix et délais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label htmlFor="price.type" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de prix
                </label>
                <select
                  id="price.type"
                  name="price.type"
                  value={formData.price.type}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="project">Sur devis</option>
                  <option value="fixed">Prix fixe</option>
                  <option value="hourly">À l'heure</option>
                </select>
              </div>

              {formData.price.type !== 'project' && (
                <div>
                  <label htmlFor="price.amount" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="0"
                  />
                </div>
              )}

              <div>
                <label htmlFor="deliveryTime" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Délai de livraison
                </label>
                <input
                  type="text"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ex: 2-4 semaines"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Options
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-xs sm:text-sm text-gray-900 dark:text-white">
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
                <label htmlFor="isFeatured" className="ml-2 block text-xs sm:text-sm text-gray-900 dark:text-white">
                  Service mis en avant (avec étoile)
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin-services"
              className="px-4 sm:px-6 py-2 sm:py-3 text-center text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Création...' : 'Créer le service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServicePage;
