'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Copy, Edit, Trash2 } from 'lucide-react';

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

interface ImagesTableProps {
  images: Image[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const ImagesTable: React.FC<ImagesTableProps> = ({
  images,
  isLoading,
  onDelete,
  onEdit
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des images...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucune image trouvée</h3>
        <p className="text-gray-600 mb-6 dark:text-gray-400">Aucune image ne correspond à vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <>
      {/* En-tête du tableau */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 dark:text-white">
          <div className="col-span-3">Image</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Projet</div>
          <div className="col-span-2">Ajoutée le</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
      </div>

      {/* Corps du tableau */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {images.map((image) => (
          <div key={image._id} className="px-6 py-4 hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Image */}
              <div className="col-span-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center overflow-hidden">
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
                      <svg className="w-6 h-6 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {image.alt.length > 30 ? `${image.alt.substring(0, 30)}...` : image.alt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="col-span-3">
                <p className="text-sm text-gray-900 dark:text-white truncate">
                  {image.alt}
                </p>
              </div>

              {/* Projet */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {image.projectId?.title || 'Aucun projet'}
                </span>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <span className="text-sm text-gray-900 dark:text-white">
                  {formatDate(image.createdAt)}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end space-x-2">
                <button
                  onClick={() => window.open(image.url, '_blank')}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Voir l'image"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(image.url);
                  }}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Copier l'URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                      <Link
                        href={`/admin-images/edit/${image._id}`}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                <button
                  onClick={() => onDelete(image._id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesTable;
