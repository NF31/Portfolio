'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/lib/icons';



interface Service {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  technologies: string[];
  category: string;
  deliveryTime?: string;
  isActive: boolean;
  isFeatured: boolean;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?limit=6&isActive=true');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const iconMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : <Icons.Sparkles className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Icons.Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Mes Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Des solutions digitales sur mesure pour donner vie à vos projets, de la conception à la mise en production.
          </p>
        </div>

        {/* Grille de services responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service._id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Backdrop blur au hover - Effet glassmorphism */}
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-700/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              
              {/* Effet de brillance qui traverse */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 dark:via-blue-400/20 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
              
              <div className="relative z-10">
                {/* Icône avec animation */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                  {renderIcon(service.icon)}
                </div>

                {/* Contenu */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description courte */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                {/* Description complète (collapsible) */}
                <details className="mb-4">
                  <summary className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-medium">
                    Voir plus de détails
                  </summary>
                  <div className="mt-3 space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Points clés :</h4>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                              <svg className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-xs text-gray-500 dark:text-gray-500 italic">
                              +{service.features.length - 3} autres points...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>

                {/* Technologies avec style amélioré */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Informations supplémentaires avec style amélioré */}
                <div className="space-y-2">
                  {/* Délai de livraison */}
                  {service.deliveryTime && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Délai:</span> {service.deliveryTime}
                    </div>
                  )}

                  {/* Catégorie avec badge coloré */}
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md border border-purple-200 dark:border-purple-800">
                      {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Badge décoratif animé */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir tous les services */}
        <div className="text-center">
          <Link
            href="/services"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Voir tous les services</span>
            <Icons.ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;

