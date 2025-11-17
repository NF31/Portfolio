'use client';

import React from 'react';
import { Icons } from '@/lib/icons';

interface Image {
  _id: string;
  url: string;
  alt: string;
  projectId?: {
    _id: string;
    title: string;
  } | string;
  createdAt?: string;
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

  const projectTitle = typeof image.projectId === 'object' && image.projectId !== null 
    ? image.projectId.title 
    : 'Aucun projet';

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
              <Icons.AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Supprimer l&apos;image
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
            Êtes-vous sûr de vouloir supprimer cette image ?
          </p>

          {/* Informations détaillées de l'image */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Alt text :</span>
                <p className="text-sm sm:text-base text-gray-900 dark:text-white mt-1">{image.alt || 'Aucun alt text'}</p>
              </div>
              
              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Projet associé :</span>
                <p className="text-sm sm:text-base text-gray-900 dark:text-white mt-1">{projectTitle}</p>
              </div>

              {image.createdAt && (
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Date d&apos;ajout :</span>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-white mt-1">
                    {new Date(image.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">URL :</span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-all">{image.url}</p>
              </div>

              <div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">ID de l&apos;image :</span>
                <p className="text-gray-900 font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-1 dark:text-white break-all">
                  {image._id}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 sm:p-3">
            <div className="flex items-start gap-2">
              <Icons.AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-red-800 dark:text-red-200">
                <p className="font-medium">Attention !</p>
                <p>Cette image sera définitivement supprimée et ne pourra pas être récupérée.</p>
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
                <Icons.Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <Icons.Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
