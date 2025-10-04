'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Code, Database, Palette, Wrench, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Skill {
  _id: string;
  name: string;
  description: string;
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isActive: boolean;
  order: number;
}

export default function EditSkillPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    iconType: 'lucide' as 'lucide' | 'simple-icons' | 'custom-svg' | 'url',
    category: 'other' as 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other',
    level: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    isActive: true,
    order: 0
  });

  // Icônes Lucide populaires
  const lucideIcons = [
    'Code', 'Database', 'Palette', 'Wrench', 'Zap', 'Monitor', 'Smartphone',
    'Server', 'Cloud', 'Shield', 'Lock', 'Globe', 'Layers', 'Box',
    'Package', 'Settings', 'Tool', 'Cpu', 'HardDrive', 'Network',
    'Terminal', 'GitBranch', 'GitCommit', 'GitMerge', 'GitPullRequest',
    'Github', 'Gitlab', 'Bitbucket', 'Docker', 'Kubernetes', 'Jenkins',
    'React', 'Vue', 'Angular', 'Node', 'Python', 'Java', 'CSharp',
    'Html', 'Css', 'Javascript', 'Typescript', 'Php', 'Ruby', 'Go',
    'Swift', 'Kotlin', 'Rust', 'Scala', 'Clojure', 'Haskell', 'Elixir'
  ];

  // Icônes Simple Icons populaires
  const simpleIcons = [
    'react', 'vuejs', 'angular', 'nodejs', 'python', 'java', 'javascript',
    'typescript', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin',
    'docker', 'kubernetes', 'aws', 'googlecloud', 'azure', 'firebase',
    'mongodb', 'mysql', 'postgresql', 'redis', 'elasticsearch',
    'nginx', 'apache', 'git', 'github', 'gitlab', 'bitbucket',
    'figma', 'sketch', 'adobe', 'photoshop', 'illustrator',
    'html5', 'css3', 'sass', 'less', 'bootstrap', 'tailwindcss',
    'webpack', 'vite', 'babel', 'eslint', 'prettier', 'jest',
    'cypress', 'storybook', 'nextjs', 'nuxtjs', 'gatsby', 'svelte'
  ];

  useEffect(() => {
    if (params.id) {
      fetchSkill();
    }
  }, [params.id]);

  const fetchSkill = async () => {
    try {
      const response = await fetch(`/api/skills/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setSkill(data.data);
        setFormData({
          name: data.data.name,
          description: data.data.description,
          icon: data.data.icon,
          iconType: data.data.iconType,
          category: data.data.category,
          level: data.data.level,
          isActive: data.data.isActive,
          order: data.data.order
        });
      } else {
        toast.error('Compétence non trouvée');
        router.push('/skills');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la compétence:', error);
      toast.error('Erreur lors du chargement de la compétence');
      router.push('/skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/skills/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Compétence mise à jour avec succès !');
        router.push('/skills');
      } else {
        toast.error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code className="w-4 h-4" />;
      case 'backend': return <Database className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'tools': return <Wrench className="w-4 h-4" />;
      case 'design': return <Palette className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-blue-600';
      case 'advanced': return 'text-orange-600';
      case 'expert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/skills')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modifier la compétence</h1>
              <p className="text-gray-600 mt-1">
                Modifiez les informations de "{skill?.name}"
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill?.category === 'frontend' ? 'bg-blue-100 text-blue-800' :
              skill?.category === 'backend' ? 'bg-green-100 text-green-800' :
              skill?.category === 'database' ? 'bg-purple-100 text-purple-800' :
              skill?.category === 'tools' ? 'bg-orange-100 text-orange-800' :
              skill?.category === 'design' ? 'bg-pink-100 text-pink-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className="flex items-center space-x-1">
                {getCategoryIcon(skill?.category || 'other')}
                <span className="capitalize">{skill?.category}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill?.level === 'beginner' ? 'bg-green-100 text-green-800' :
              skill?.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
              skill?.level === 'advanced' ? 'bg-orange-100 text-orange-800' :
              skill?.level === 'expert' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <span className="capitalize">{skill?.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations de base</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la compétence *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Base de données</option>
                    <option value="tools">Outils</option>
                    <option value="design">Design</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau *
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Compétence active</span>
                </label>
              </div>
            </div>

            {/* Icône */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Icône</h2>
              
              <div className="mb-4">
                <label htmlFor="iconType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'icône *
                </label>
                <select
                  id="iconType"
                  name="iconType"
                  value={formData.iconType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="lucide">Lucide Icons</option>
                  <option value="simple-icons">Simple Icons</option>
                  <option value="custom-svg">SVG personnalisé</option>
                  <option value="url">URL d'image</option>
                </select>
              </div>

              {formData.iconType === 'lucide' && (
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                    Icône Lucide *
                  </label>
                  <select
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="">Sélectionnez une icône</option>
                    {lucideIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.iconType === 'simple-icons' && (
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                    Icône Simple Icons *
                  </label>
                  <select
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="">Sélectionnez une icône</option>
                    {simpleIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.iconType === 'custom-svg' && (
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                    Code SVG *
                  </label>
                  <textarea
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-mono text-sm"
                    placeholder="<svg>...</svg>"
                  />
                </div>
              )}

              {formData.iconType === 'url' && (
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                    URL de l'icône *
                  </label>
                  <input
                    type="url"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="https://example.com/icon.svg"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/skills')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Aperçu */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Aperçu</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{formData.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{formData.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{formData.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-sm font-medium ${getLevelColor(formData.level)}`}>
                    {formData.level}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {formData.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Type d'icône :</strong> {formData.iconType}</p>
                <p><strong>Ordre :</strong> {formData.order}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
