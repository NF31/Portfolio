'use client';

import React from 'react';

interface Image {
  _id: string;
  url: string;
  alt: string;
  projectId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  image: Image | null;
  isDeleting?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  image,
  isDeleting = false
}) => {
  if (!isOpen || !image) return null;

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
                Supprimer l'image
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
            Êtes-vous sûr de vouloir supprimer cette image ?
          </p>

          {/* Informations détaillées de l'image */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Détails de l'image à supprimer
            </h3>
            
            {/* Aperçu de l'image */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={image.url}
                  alt={image.alt}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <svg className="w-8 h-8 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{image.alt}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Projet associé :</span>
                    <p className="text-gray-900 font-medium">
                      {image.projectId?.title || 'Aucun projet'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">URL :</span>
                    <p className="text-gray-900 font-mono text-xs break-all">
                      {image.url}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations système */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <span className="text-sm font-medium text-gray-500">Date d'ajout :</span>
                <p className="text-gray-900 font-medium">
                  {new Date(image.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">ID de l'image :</span>
                <p className="text-gray-900 font-mono text-xs bg-gray-100 px-2 py-1 rounded mt-1">
                  {image._id}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-sm text-red-800">
                <p className="font-medium">Attention !</p>
                <p>L'image sera définitivement supprimée de Cloudinary et de la base de données. Cette action ne peut pas être annulée.</p>
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
