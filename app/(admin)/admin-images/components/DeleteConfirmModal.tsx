'use client';

import React from 'react';

interface Service {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  price?: {
    type: 'fixed' | 'hourly' | 'project';
    amount?: number;
    currency?: string;
  };
  category: string;
  technologies: string[];
  deliveryTime?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: Service | null;
  isDeleting?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  service,
  isDeleting = false
}) => {
  if (!isOpen || !service) return null;

  // Récupérer l'icône du service
  const getIconComponent = (iconName: string) => {
    try {
      const Icons = require('lucide-react');
      return Icons[iconName] as React.ComponentType<any>;
    } catch {
      return null;
    }
  };

  const IconComponent = getIconComponent(service.icon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Supprimer le service
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Cette action est irréversible
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
            Êtes-vous sûr de vouloir supprimer le service{' '}
            <span className="font-semibold text-gray-900 dark:text-white">"{service.title}"</span> ?
          </p>

          {/* Informations détaillées du service */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Détails du service à supprimer
            </h3>
            
            {/* Header du service avec icône */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                {IconComponent && <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{service.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.shortDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Catégorie :</span>
                <p className="text-sm sm:text-base text-gray-900 font-medium capitalize dark:text-white">{service.category}</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Statut :</span>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {service.isActive ? 'Actif' : 'Inactif'}
                  </span>
                  {service.isFeatured && (
                    <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Mis en avant
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Description :</span>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">{service.description}</p>
            </div>

            {service.features && service.features.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Fonctionnalités :</span>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  {service.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Technologies :</span>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Catégorie :</span>
                <p className="text-sm sm:text-base text-gray-900 font-medium capitalize dark:text-white">{service.category}</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Statut :</span>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {service.isActive ? 'Actif' : 'Inactif'}
                  </span>
                  {service.isFeatured && (
                    <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Mis en avant
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Description :</span>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">{service.description}</p>
            </div>

            {service.features && service.features.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Fonctionnalités :</span>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  {service.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Technologies :</span>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prix et délai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Prix :</span>
                <div className="mt-1">
                  {service.price?.type === 'project' ? (
                    <p className="text-sm sm:text-base text-gray-900 font-medium dark:text-white">Sur devis</p>
                  ) : service.price?.amount ? (
                    <p className="text-sm sm:text-base text-gray-900 font-medium dark:text-white">
                      {service.price.amount} {service.price.currency || 'EUR'}
                      {service.price.type === 'hourly' ? '/heure' : ''}
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 italic dark:text-gray-400">Aucun prix défini</p>
                  )}
                </div>
              </div>
              {service.deliveryTime && (
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Délai de livraison :</span>
                  <p className="text-sm sm:text-base text-gray-900 font-medium dark:text-white mt-1">{service.deliveryTime}</p>
                </div>
              )}
            </div>

            {/* ID du service */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">ID du service :</span>
              <p className="text-gray-900 font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-1 dark:text-white break-all">
                {service._id}
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 sm:p-3">
            <div className="flex items-start gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-xs sm:text-sm text-red-800 dark:text-red-200">
                <p className="font-medium">Attention !</p>
                <p>Toutes les données du service seront définitivement supprimées et ne pourront pas être récupérées.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base text-center text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Suppression...
              </>
            ) : (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer définitivement
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
