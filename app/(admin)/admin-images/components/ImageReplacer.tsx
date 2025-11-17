'use client';

import React, { useState } from 'react';
import { Icons } from '@/lib/icons';
import { toast } from 'sonner';

interface ImageReplacerProps {
  imageId: string;
  currentImageUrl: string;
  onReplaceSuccess: (newImageData: any) => void;
}

export default function ImageReplacer({ imageId, currentImageUrl, onReplaceSuccess }: ImageReplacerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validation du fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner un fichier image');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('Le fichier est trop volumineux (max 10MB)');
        return;
      }

      setSelectedFile(file);
      
      // Créer un aperçu
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleReplace = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    toast.loading('Remplacement de l\'image en cours...', { id: 'replace' });

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`/api/images/${imageId}/replace`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Image remplacée avec succès !', { id: 'replace' });
        
        // Nettoyer les URLs d'aperçu
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        
        // Réinitialiser le composant
        setSelectedFile(null);
        setPreviewUrl(null);
        
        // Notifier le parent du succès
        onReplaceSuccess(result.data);
      } else {
        toast.error(result.error || 'Erreur lors du remplacement', { id: 'replace' });
      }
    } catch (error: any) {
      console.error('Erreur lors du remplacement:', error);
      toast.error('Erreur lors du remplacement', { id: 'replace' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Zone d'upload */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
          id="replace-image-input"
        />
        <label
          htmlFor="replace-image-input"
          className={`cursor-pointer ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            {isUploading ? (
              <>
                <Icons.Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600">Remplacement en cours...</p>
              </>
            ) : (
              <>
                <Icons.Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Cliquez pour sélectionner une nouvelle image
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF, WebP jusqu&apos;à 10MB
                </p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Aperçu de la nouvelle image */}
      {previewUrl && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Aperçu de la nouvelle image :</h4>
          <div className="relative">
            <img
              src={previewUrl}
              alt="Aperçu"
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
          
          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleReplace}
              disabled={isUploading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <Icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Icons.Upload className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Remplacement...' : 'Remplacer l&apos;image'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUploading}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Icons.X className="w-4 h-4 mr-2" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Avertissement */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icons.AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-orange-800">
            <p className="font-medium">Attention !</p>
            <p>L&apos;ancienne image sera définitivement supprimée et remplacée par la nouvelle.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
