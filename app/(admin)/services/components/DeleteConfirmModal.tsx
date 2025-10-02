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
      const LucideIcons = require('lucide-react');
      return LucideIcons[iconName] as React.ComponentType<any>;
    } catch {
      return null;
    }
  };

  const IconComponent = getIconComponent(service.icon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full mx-4 transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Supprimer le service
              </h3>
              <p className="text-sm text-gray-500">
                Cette action est irréversible
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-700 mb-6">
            Êtes-vous sûr de vouloir supprimer le service{' '}
            <span className="font-semibold text-gray-900">"{service.title}"</span> ?
          </p>

          {/* Informations détaillées du service */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Détails du service à supprimer
            </h3>
            
            {/* Header du service avec icône */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                {IconComponent && <IconComponent className="w-6 h-6 text-blue-600" />}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.shortDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Catégorie :</span>
                <p className="text-gray-900 font-medium capitalize">{service.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Statut :</span>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.isActive ? 'Actif' : 'Inactif'}
                  </span>
                  {service.isFeatured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Mis en avant
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500">Description :</span>
              <p className="text-gray-700 mt-1 text-sm">{service.description}</p>
            </div>

            {service.features && service.features.length > 0 && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Fonctionnalités :</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {service.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Technologies :</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prix complet */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500">Informations tarifaires :</span>
              <div className="mt-1">
                {service.price?.type === 'project' ? (
                  <p className="text-gray-900 font-medium">Sur devis</p>
                ) : service.price?.amount ? (
                  <p className="text-gray-900 font-medium">
                    {service.price.amount} {service.price.currency || 'EUR'}
                    {service.price.type === 'hourly' ? '/heure' : ''}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Aucun prix défini</p>
                )}
              </div>
            </div>

            {service.deliveryTime && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Délai de livraison :</span>
                <p className="text-gray-900 font-medium">{service.deliveryTime}</p>
              </div>
            )}

            {/* Informations système */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
              <div>
                <span className="text-sm font-medium text-gray-500">Ordre d'affichage :</span>
                <p className="text-gray-900 font-medium">{service.order}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Type de prix :</span>
                <p className="text-gray-900 font-medium capitalize">
                  {service.price?.type === 'project' ? 'Sur devis' : 
                   service.price?.type === 'fixed' ? 'Prix fixe' : 
                   service.price?.type === 'hourly' ? 'À l\'heure' : 'Non défini'}
                </p>
              </div>
            </div>

            {/* Devise par défaut */}
            {service.price && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Devise :</span>
                <p className="text-gray-900 font-medium">{service.price.currency || 'EUR'}</p>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <span className="text-sm font-medium text-gray-500">Date de création :</span>
                <p className="text-gray-900 font-medium">
                  {new Date(service.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Dernière modification :</span>
                <p className="text-gray-900 font-medium">
                  {new Date(service.updatedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* ID du service */}
            <div className="pt-4 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-500">ID du service :</span>
              <p className="text-gray-900 font-mono text-xs bg-gray-100 px-2 py-1 rounded mt-1">
                {service._id}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-sm text-red-800">
                <p className="font-medium">Attention !</p>
                <p>Toutes les données du service seront définitivement supprimées et ne pourront pas être récupérées.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Suppression...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
