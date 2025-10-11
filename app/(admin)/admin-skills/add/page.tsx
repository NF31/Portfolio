'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useStatsActions } from '../../hooks/useStatsActions';
import SkillIcon from '@/app/components/SkillIcon';

interface SkillFormData {
  name: string;
  description: string;
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isActive: boolean;
  order: number;
}

const AddSkillPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { refreshAfterAction } = useStatsActions();

  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    description: '',
    icon: 'Code',
    iconType: 'lucide',
    category: 'other',
    level: 'intermediate',
    isActive: true,
    order: 0
  });

  const getIconPlaceholder = () => {
    switch (formData.iconType) {
      case 'lucide': return 'Ex: Code, Database, Palette...';
      case 'simple-icons': return 'Ex: laravel, react, nodejs...';
      case 'custom-svg': return '<svg>...</svg>';
      case 'url': return 'https://example.com/icon.svg';
      default: return 'Ex: Code, Database...';
    }
  };

  const getIconHelp = () => {
    switch (formData.iconType) {
      case 'lucide':
        return (
          <>
            <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">lucide.dev/icons</a>
            <br />Ex: "Code", "Database", "Server"
          </>
        );
      case 'simple-icons':
        return (
          <>
            <a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">simpleicons.org</a>
            <br />Ex: "laravel", "react", "nodejs", "mongodb"
          </>
        );
      case 'custom-svg':
        return 'Collez le code SVG complet (commençant par <svg>)';
      case 'url':
        return 'URL directe vers une image (PNG, SVG, JPG)';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'order') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: string[] = [];
    if (!formData.name.trim()) newErrors.push('Le nom de la compétence est requis');
    if (!formData.description.trim()) newErrors.push('La description est requise');
    if (!formData.icon.trim()) newErrors.push('L\'icône est requise');
    
    setErrors(newErrors);
    
    if (newErrors.length > 0) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Compétence créée avec succès !');
        // Rafraîchir les statistiques
        await refreshAfterAction('création de la compétence');
        router.push('/admin-skills');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin-skills');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin-skills"
              className="p-2 hover:bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors dark:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ajouter une compétence</h1>
              <p className="text-gray-600 dark:text-gray-400">Créez une nouvelle compétence technique</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
          {/* Erreurs */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-medium mb-2">Erreurs à corriger :</h4>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Nom de la compétence */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Nom de la compétence *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: React, Node.js, MongoDB..." className="placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez cette compétence..." className="placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>

          {/* Type d'icône */}
          <div>
            <label htmlFor="iconType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Type d'icône *
            </label>
            <select
              id="iconType"
              name="iconType"
              value={formData.iconType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lucide">Lucide (icônes générales)</option>
              <option value="simple-icons">Simple Icons (technologies)</option>
              <option value="custom-svg">SVG personnalisé</option>
              <option value="url">URL d'image</option>
            </select>
          </div>

          {/* Icône */}
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              {formData.iconType === 'custom-svg' ? 'Code SVG *' : 'Icône *'}
            </label>
            {formData.iconType === 'custom-svg' ? (
              <textarea
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder={getIconPlaceholder()}
                required
              />
            ) : (
              <input
                type="text"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={getIconPlaceholder()}
                required
              />
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getIconHelp()}
            </p>
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Catégorie *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Base de données</option>
              <option value="tools">Outils</option>
              <option value="design">Design</option>
              <option value="other">Autre</option>
            </select>
          </div>

          {/* Niveau */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Niveau *
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Ordre */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 dark:text-gray-300">
              Ordre d'affichage
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0" className="placeholder-gray-400 dark:placeholder-gray-500"
              min="0"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Plus le chiffre est petit, plus la compétence apparaîtra en premier
            </p>
          </div>

          {/* Statut actif */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Compétence active (visible sur le portfolio)
            </label>
          </div>

          {/* Aperçu de l'icône */}
          {formData.icon && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 dark:text-gray-300">Aperçu de l'icône</h3>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <SkillIcon 
                    icon={formData.icon} 
                    iconType={formData.iconType} 
                    name={formData.name}
                    className="w-10 h-10 text-white"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                L'icône sera affichée avec un fond dégradé bleu
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Création...' : 'Créer la compétence'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillPage;
