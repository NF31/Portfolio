'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Mail, Phone, Loader2, Sparkles, Send, Clock, Rocket, Zap, Shield, AlertCircle, ChevronDown, Filter, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  iconType?: 'lucide' | 'url';
  category: string;
  features: string[];
  technologies: string[];
  deliveryTime?: string;
  price?: {
    type: 'fixed' | 'hourly' | 'project';
    amount?: number;
    currency?: string;
  };
  isActive: boolean;
  isFeatured: boolean;
}

type CategoryType = 'all' | string;

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(s => s.category === activeCategory));
    }
  }, [activeCategory, services]);

  // Déterminer si on doit utiliser le select (plus de 4 catégories)
  const shouldUseSelect = categories.length > 4;

  // Système responsive intelligent basé sur le nombre de services
  const getResponsiveGrid = (serviceCount: number) => {
    if (serviceCount === 1) {
      // Pour 1 seul service : centré avec largeur limitée
      return 'grid-cols-1 max-w-md mx-auto';
    } else if (serviceCount === 2) {
      // Pour 2 services : centré avec largeur limitée
      return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto';
    } else if (serviceCount <= 4) {
      // Pour 3-4 services : 2 colonnes max
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2';
    } else if (serviceCount <= 6) {
      // Pour 5-6 services : jusqu'à 3 colonnes
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3';
    } else if (serviceCount <= 9) {
      // Pour 7-9 services : jusqu'à 4 colonnes
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4';
    } else if (serviceCount <= 12) {
      // Pour 10-12 services : jusqu'à 5 colonnes
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
    } else {
      // Pour 13+ services : jusqu'à 6 colonnes
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6';
    }
  };

  // Conteneur responsive selon le nombre de services
  const getResponsiveContainer = (serviceCount: number) => {
    if (serviceCount === 1) {
      return 'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8';
    } else if (serviceCount === 2) {
      return 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';
    } else if (serviceCount <= 4) {
      return 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8';
    } else if (serviceCount <= 6) {
      return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    } else {
      return 'w-full px-4 sm:px-6 lg:px-8';
    }
  };

  // Padding responsive des cartes
  const getResponsiveCardPadding = (serviceCount: number) => {
    if (serviceCount === 1) {
      return 'p-6 sm:p-8 lg:p-10 xl:p-12';
    } else if (serviceCount === 2) {
      return 'p-5 sm:p-6 lg:p-8 xl:p-10';
    } else if (serviceCount <= 4) {
      return 'p-4 sm:p-5 lg:p-6 xl:p-8';
    } else if (serviceCount <= 6) {
      return 'p-3 sm:p-4 lg:p-5 xl:p-6';
    } else {
      return 'p-3 sm:p-4 lg:p-5';
    }
  };

  // Tailles de texte responsive optimisées
  const getResponsiveTextSizes = (serviceCount: number) => {
    if (serviceCount === 1) {
      return {
        title: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
        description: 'text-sm sm:text-base lg:text-lg',
        shortDescription: 'text-xs sm:text-sm lg:text-base',
        badge: 'text-xs sm:text-sm'
      };
    } else if (serviceCount === 2) {
      return {
        title: 'text-base sm:text-lg lg:text-xl xl:text-2xl',
        description: 'text-xs sm:text-sm lg:text-base',
        shortDescription: 'text-xs sm:text-sm',
        badge: 'text-xs'
      };
    } else if (serviceCount <= 4) {
      return {
        title: 'text-sm sm:text-base lg:text-lg xl:text-xl',
        description: 'text-xs sm:text-sm lg:text-base',
        shortDescription: 'text-xs sm:text-sm',
        badge: 'text-xs'
      };
    } else if (serviceCount <= 6) {
      return {
        title: 'text-sm sm:text-base lg:text-lg',
        description: 'text-xs sm:text-sm',
        shortDescription: 'text-xs sm:text-sm',
        badge: 'text-xs'
      };
    } else {
      return {
        title: 'text-xs sm:text-sm lg:text-base',
        description: 'text-xs sm:text-sm',
        shortDescription: 'text-xs',
        badge: 'text-xs'
      };
    }
  };

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showCategorySelect && !target.closest('.category-select-container')) {
        setShowCategorySelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategorySelect]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?isActive=true');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
        setFilteredServices(data.data);
        
        // Extraire les catégories uniques
        const uniqueCategories = Array.from(new Set(data.data.map((s: Service) => s.category)));
        setCategories(uniqueCategories as string[]);
      }
    } catch (error) {
      // Erreur silencieuse lors du chargement des services
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName: string, iconType?: string) => {
    if (iconType === 'url') {
      return <Image src={iconName} alt="" width={32} height={32} className="w-8 h-8" />;
    }
    
    const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <LucideIcons.Sparkles className="w-8 h-8" />;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      web: 'Web',
      mobile: 'Mobile',
      design: 'Design',
      consulting: 'Conseil',
      maintenance: 'Maintenance',
      other: 'Autre'
    };
    return labels[category] || category;
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', message: '' };
    let isValid = true;

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
      isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
      isValid = false;
    }

    // Validation du téléphone
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,5}[-\s.]?[0-9]{1,6}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
      isValid = false;
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Le numéro doit contenir au moins 10 chiffres';
      isValid = false;
    } else if (formData.phone.replace(/[^0-9]/g, '').length > 15) {
      newErrors.phone = 'Le numéro ne peut pas dépasser 15 chiffres';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Format invalide (ex: +33 6 12 34 56 78)';
      isValid = false;
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères';
      isValid = false;
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Le message ne peut pas dépasser 1000 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation côté client
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setSending(true);
    setErrors({ name: '', email: '', phone: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message envoyé avec succès ! Je vous répondrai sous 24h.');
        setFormData({ name: '', email: '', phone: '', subject: '', budget: '', message: '' });
      } else {
        toast.error(data.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-12 group transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
          
          {/* Contenu centré */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
              Services Professionnels
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed mb-10">
              Des solutions sur mesure, innovantes et performantes pour transformer vos idées en réalité digitale.
            </p>
            
            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 group"
            >
              <span>Discuter de votre projet</span>
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Filtres par catégorie - Version améliorée */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Titre et compteur */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Filtrer par catégorie
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''}
                  {activeCategory !== 'all' && ` dans "${activeCategory}"`}
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                  {filteredServices.length <= 2 ? 'Large' : filteredServices.length <= 6 ? 'Medium' : 'Compact'}
                </span>
              </div>
            </div>

            {/* Bouton "Tous les services" si une catégorie est sélectionnée */}
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Voir tous les services
              </button>
            )}
          </div>

          {/* Filtres - Version adaptative */}
          <div className="mt-6">
            {shouldUseSelect ? (
              /* Select stylé pour beaucoup de catégories */
              <div className="relative w-full max-w-4xl mx-auto category-select-container">
                <div className="relative">
                  <button
                    onClick={() => setShowCategorySelect(!showCategorySelect)}
                    className="w-full flex items-center justify-between px-8 py-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-blue-300 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-lg"
                  >
                    <span className="flex items-center text-lg font-semibold">
                      <Filter className="w-6 h-6 mr-4 text-gray-500" />
                      {activeCategory === 'all' ? 'Toutes les catégories' : activeCategory}
                    </span>
                    <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${showCategorySelect ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {showCategorySelect && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl z-50 max-h-80 overflow-hidden">
                      <div 
                        className="overflow-y-auto max-h-80 custom-scrollbar"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#3b82f6 #f1f5f9'
                        }}
                        onWheel={(e) => {
                          e.stopPropagation();
                          const target = e.currentTarget;
                          target.scrollTop += e.deltaY;
                        }}
                      >
                        <button
                          onClick={() => {
                            setActiveCategory('all');
                            setShowCategorySelect(false);
                          }}
                          className={`w-full flex items-center justify-between px-8 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                            activeCategory === 'all' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <span className="flex items-center text-lg font-semibold">
                            <Sparkles className="w-6 h-6 mr-4" />
                            Toutes les catégories
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full font-medium">({services.length})</span>
                        </button>
                        
                        {categories.map((category, index) => (
                          <button
                            key={category}
                            onClick={() => {
                              setActiveCategory(category);
                              setShowCategorySelect(false);
                            }}
                            className={`w-full flex items-center justify-between px-8 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              index === categories.length - 1 ? '' : 'border-b border-gray-100 dark:border-gray-700'
                            } ${
                              activeCategory === category ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <span className="capitalize text-lg font-semibold">{category}</span>
                            <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full font-medium">({services.filter(s => s.category === category).length})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Boutons horizontaux pour peu de catégories */
              <div className="flex items-center justify-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                    activeCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Tous ({services.length})
                  </span>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="capitalize">{category} ({services.filter(s => s.category === category).length})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid - Version responsive améliorée */}
      <section className="py-20">
        <div className={getResponsiveContainer(filteredServices.length)}>
          {/* Message si aucun service trouvé */}
          {filteredServices.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Aucun service trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Aucun service ne correspond à la catégorie sélectionnée.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Voir tous les services
              </button>
            </div>
          ) : (
            <div className={`grid ${getResponsiveGrid(filteredServices.length)} gap-4 sm:gap-6 lg:gap-8`}>
              {filteredServices.map((service) => (
              <div
                key={service._id}
                className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl ${getResponsiveCardPadding(filteredServices.length)} shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}
              >
                {/* Backdrop blur au hover - Effet glassmorphism avancé */}
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                
                {/* Effet de brillance qui traverse */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative">
                  {/* En-tête avec icône et catégorie */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${filteredServices.length <= 2 ? 'w-16 h-16 sm:w-20 sm:h-20' : filteredServices.length <= 6 ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-10 h-10 sm:w-12 sm:h-12'}`}>
                        {renderIcon(service.icon, service.iconType)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${getResponsiveTextSizes(filteredServices.length).title}`}>
                          {service.title}
                        </h3>
                        <p className={`text-gray-600 dark:text-gray-400 ${getResponsiveTextSizes(filteredServices.length).shortDescription}`}>
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold rounded-full ${getResponsiveTextSizes(filteredServices.length).badge}`}>
                      {getCategoryLabel(service.category)}
                    </span>
                  </div>

                  {/* Description complète */}
                  <p className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4 lg:mb-6 ${getResponsiveTextSizes(filteredServices.length).description}`}>
                    {service.description}
                  </p>

                  {/* Technologies */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className={`mb-3 sm:mb-4 lg:mb-6 ${filteredServices.length <= 2 ? 'block' : 'block'}`}>
                      <h4 className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 flex items-center ${getResponsiveTextSizes(filteredServices.length).badge}`}>
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-2"></span>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 font-medium rounded-lg border border-blue-200 dark:border-blue-700 ${getResponsiveTextSizes(filteredServices.length).badge}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fonctionnalités */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <h4 className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 flex items-center ${getResponsiveTextSizes(filteredServices.length).badge}`}>
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full mr-2"></span>
                        Ce qui est inclus
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className={`text-green-500 mr-2 flex-shrink-0 mt-0.5 ${filteredServices.length <= 2 ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-3 h-3 sm:w-4 sm:h-4'}`} />
                            <span className={`text-gray-700 dark:text-gray-300 ${getResponsiveTextSizes(filteredServices.length).description}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Délai de livraison */}
                  {service.deliveryTime && (
                    <div className={`flex items-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${getResponsiveTextSizes(filteredServices.length).badge}`}>
                      <Clock className={`text-blue-600 mr-2 ${filteredServices.length <= 2 ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-3 h-3'}`} />
                      Délai : <span className="font-semibold ml-1">{service.deliveryTime}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Section Tarifs/Formules - Personnalisée */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Comment puis-je vous aider ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Formule 1 : Projet Unique */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Projet Unique</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sur devis
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Conception complète</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Design responsive moderne</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Développement Laravel & React</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Formation à l&apos;utilisation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Support 2 mois offert</span>
                </li>
              </ul>

              <a
                href="#contact"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Demander un devis
              </a>
            </div>

            {/* Formule 2 : Accompagnement - RECOMMANDÉ */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border-2 border-blue-500 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              {/* Badge Recommandé */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full shadow-lg">
                  🔥 Recommandé
                </span>
              </div>

              <div className="text-center mb-6 mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Accompagnement Mensuel</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-xl text-gray-600 dark:text-gray-400">Dès</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mx-2">
                    1800€
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Développement en sprints</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Évolutions continues</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Suivi hebdomadaire</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Support technique</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Optimisations régulières</span>
                </li>
              </ul>

              <a
                href="#contact"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Commencer maintenant
              </a>
            </div>

            {/* Formule 3 : Maintenance & Support */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Maintenance & Support</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-xl text-gray-600 dark:text-gray-400">Dès</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mx-2">
                    800€
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Corrections de bugs</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Mises à jour de sécurité</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Optimisations mensuelles</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Monitoring et alertes</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Disponibilité par email</span>
                </li>
              </ul>

              <a
                href="#contact"
                className="block w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Souscrire au support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact - Style Esperant Kela */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Travaillons ensemble
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Prêt à transformer vos idées en réalité ? Contactez-moi pour discuter de votre projet.
            </p>
          </div>

          {/* Grid 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Prénom et Nom sur la même ligne */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.name.split(' ')[0] || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-lg focus:ring-2 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-lg focus:ring-2 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="jean.dupont@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-lg focus:ring-2 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="+33 6 12 34 56 78"
                    maxLength={20}
                  />
                  {errors.phone ? (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format : +33 6 12 34 56 78</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 rounded-lg focus:ring-2 transition-all resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Décrivez votre projet, vos besoins et objectifs..."
                  />
                  {errors.message ? (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{formData.message.length}/1000 caractères</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>
              </form>
            </div>

            {/* Informations de contact + Visuel */}
            <div className="space-y-8">
              {/* Infos de contact */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Informations de contact</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Email</h4>
                    <a
                      href="mailto:contact@nfdev21.com"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium flex items-center group"
                    >
                      <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      contact@nfdev21.com
                    </a>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Téléphone</h4>
                    <a
                      href="tel:+33123456789"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium flex items-center group"
                    >
                      <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
              </div>

              {/* Visuel décoratif */}
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800 rounded-3xl p-12 overflow-hidden shadow-2xl">
                {/* Éléments décoratifs */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                </div>
                
                <div className="relative text-white text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Réponse rapide garantie</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Je m&apos;engage à répondre à toutes les demandes dans les 24 heures. 
                    Discutons de votre projet sans engagement !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }

          /* Styles personnalisés pour la barre de défilement */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
            margin: 8px 0;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6, #1d4ed8);
            border-radius: 10px;
            border: 2px solid #f1f5f9;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb, #1e40af);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: linear-gradient(180deg, #1d4ed8, #1e3a8a);
          }

          /* Version dark mode */
          .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
          }
          
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #60a5fa, #3b82f6);
            border: 2px solid rgba(31, 41, 55, 0.5);
          }
          
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #3b82f6, #2563eb);
          }
          
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: linear-gradient(180deg, #2563eb, #1d4ed8);
          }
        `}</style>
      </section>
    </div>
  );
};

export default ServicesPage;

