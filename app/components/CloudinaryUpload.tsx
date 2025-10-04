'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface CloudinaryUploadProps {
  onUploadSuccess: (result: any) => void;
  onUploadError?: (error: string) => void;
  projectId: string;
  projectTitle: string;
}

export default function CloudinaryUpload({ onUploadSuccess, onUploadError, projectId, projectTitle }: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  console.log('🎯 CloudinaryUpload - ProjectId reçu:', projectId);
  console.log('🏷️ CloudinaryUpload - ProjectTitle reçu:', projectTitle);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📁 Fichier sélectionné:', file.name, file.size, 'bytes');
    console.log('🆔 Project ID disponible:', projectId);

    if (!projectId) {
      console.log('❌ Aucun projet sélectionné');
      toast.error('Veuillez sélectionner un projet avant d\'uploader une image');
      return;
    }

    setIsUploading(true);
    toast.loading('Upload en cours...', { id: 'upload' });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);

      console.log('📤 Envoi vers /api/fileupload avec projectId:', projectId);
      console.log('📤 Titre du projet pour l\'affichage:', projectTitle);

      const response = await fetch('/api/fileupload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('📥 Réponse de l\'API:', result);

      if (result.success) {
        console.log('✅ Upload réussi!');
        toast.success('Image uploadée avec succès !', { id: 'upload' });
        onUploadSuccess(result.data);
      } else {
        console.log('❌ Erreur dans la réponse:', result.msg, result.error);
        toast.error(result.msg || 'Erreur lors de l\'upload', { id: 'upload' });
        onUploadError?.(result.msg || 'Erreur lors de l\'upload');
      }
    } catch (error: any) {
      console.error('💥 Erreur lors de l\'upload:', error);
      toast.error('Erreur lors de l\'upload', { id: 'upload' });
      onUploadError?.(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="cursor-pointer">
        <div className={`
          w-full h-32 border-2 border-dashed border-gray-300 
          rounded-lg flex flex-col items-center justify-center 
          hover:border-blue-500 hover:bg-blue-50 
          transition-colors duration-200
          ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}>
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-sm text-gray-600">Upload en cours...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Cliquez pour ajouter une image
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF jusqu'à 10MB
              </p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
}