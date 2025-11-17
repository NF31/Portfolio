'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from '@/lib/icons';

import { useStats } from '../contexts/StatsContext';
import SkillIcon from '@/app/components/SkillIcon';
import { formatRelativeTime } from '@/lib/dateUtils';


interface RecentSkill {
  _id: string;
  name: string;
  category: string;
  level: string;
  icon: string;
  iconType: string;
  createdAt: string;
}

interface RecentImage {
  _id: string;
  url: string;
  alt: string;
  projectId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'service' | 'skill' | 'image' | 'message';
  action: string;
  item: string;
  timestamp: string;
  icon: string;
  color: string;
  details?: any;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const AdminDashboard = () => {
  const { stats, isLoading, refreshStats } = useStats();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recentSkills, setRecentSkills] = useState<RecentSkill[]>([]);
  const [recentImages, setRecentImages] = useState<RecentImage[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [activitiesPagination, setActivitiesPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loadingRecentData, setLoadingRecentData] = useState(true);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshStats();
    await fetchRecentData();
    setIsRefreshing(false);
  };

  const fetchRecentData = async (page: number = 1) => {
    try {
      setLoadingRecentData(true);
      
      // Récupérer les dernières compétences, images et activités en parallèle
      const [skillsResponse, imagesResponse, activitiesResponse] = await Promise.all([
        fetch('/api/admin/recent-skills'),
        fetch('/api/admin/recent-images'),
        fetch(`/api/admin/recent-activities?page=${page}&limit=10`)
      ]);

      if (skillsResponse.ok) {
        const skillsData = await skillsResponse.json();
        setRecentSkills(skillsData.skills || []);
      }

      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        setRecentImages(imagesData.images || []);
      }

      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json();
        setRecentActivities(activitiesData.activities || []);
        setActivitiesPagination(activitiesData.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données récentes:', error);
    } finally {
      setLoadingRecentData(false);
    }
  };

  useEffect(() => {
    fetchRecentData();
    
    // Écouter l'événement de rafraîchissement des données récentes
    const handleRefreshRecentData = () => {
      fetchRecentData();
    };
    
    window.addEventListener('refreshRecentData', handleRefreshRecentData);
    
    return () => {
      window.removeEventListener('refreshRecentData', handleRefreshRecentData);
    };
  }, []);

  const quickActions = [
    {
      title: 'Nouveau Projet',
      description: 'Ajouter un nouveau projet au portfolio',
      href: '/projects/add',
      icon: Icons.Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Nouvelle Compétence',
      description: 'Ajouter une compétence technique',
      href: '/skills/add',
      icon: Icons.Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Nouvelle Image',
      description: 'Uploader une nouvelle image',
      href: '/images/add',
      icon: Icons.ImageIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Nouveau Service',
      description: 'Créer un nouveau service',
      href: '/services/add',
      icon: Icons.Settings,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  // Fonction pour obtenir l'icône Lucide à partir du nom
  const getActivityIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Briefcase': Icons.Briefcase,
      'MessageSquare': Icons.MessageSquare,
      'Settings': Icons.Settings,
      'Target': Icons.Target,
      'Image': Icons.ImageIcon,
      'Icons.Rocket': Icons.Rocket,
      'RefreshCw': Icons.RefreshCw
    };
    return iconMap[iconName] || Icons.Settings;
  };

  // Fonctions de pagination
  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && newPage <= activitiesPagination.totalPages) {
      await fetchRecentData(newPage);
    }
  };

  const handlePrevPage = () => {
    if (activitiesPagination.hasPrevPage) {
      handlePageChange(activitiesPagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (activitiesPagination.hasNextPage) {
      handlePageChange(activitiesPagination.page + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.01] group dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bienvenue dans l&apos;administration
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Gérez votre portfolio et vos contenus en toute simplicité
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Bouton de rafraîchissement */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Actualisation...' : 'Actualiser'}
            </button>
            <div className="hidden sm:block">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Icons.Rocket className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Projets */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Projets totaux</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">{stats.projects.total}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.projects.published} publiés</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icons.Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link 
              href="/admin-projects"
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir tous les projets →
            </Link>
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Compétences</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">{stats.skills?.total || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.skills?.active || 0} actives</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-violet-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icons.Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link 
              href="/admin-skills"
              className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Gérer les compétences →
            </Link>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Images</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300">{stats.images?.total || 0}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.images?.recent || 0} récentes</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icons.ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link 
              href="/admin-images"
              className="text-xs sm:text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir toutes les images →
            </Link>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Messages</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors duration-300">{stats.messages.total}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.messages.unread} non lus</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Icons.MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <Link 
              href="/messages"
              className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir les messages →
            </Link>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`group relative overflow-hidden rounded-2xl border-2 ${action.borderColor} ${action.bgColor} dark:bg-gray-700 dark:border-gray-600 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Aperçu rapide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Dernières compétences */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Dernières compétences</h2>
            <Link href="/admin-skills" className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
              Voir toutes →
            </Link>
          </div>
          {loadingRecentData ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : recentSkills.length > 0 ? (
            <div className="space-y-3">
              {recentSkills.slice(0, 3).map((skill) => {
                const getCategoryLabel = (category: string) => {
                  switch (category) {
                    case 'frontend': return 'Frontend';
                    case 'backend': return 'Backend';
                    case 'database': return 'Base de données';
                    case 'tools': return 'Outils';
                    case 'design': return 'Design';
                    default: return 'Autre';
                  }
                };
                
                const getLevelLabel = (level: string) => {
                  switch (level) {
                    case 'beginner': return 'Débutant';
                    case 'intermediate': return 'Intermédiaire';
                    case 'advanced': return 'Avancé';
                    case 'expert': return 'Expert';
                    default: return 'Intermédiaire';
                  }
                };

                return (
                  <div key={skill._id} className="flex items-center space-x-3 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <SkillIcon 
                      name={skill.name}
                      icon={skill.icon} 
                      iconType={skill.iconType as 'lucide' | 'simple-icons' | 'custom-svg' | 'url'} 
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{getCategoryLabel(skill.category)} • {getLevelLabel(skill.level)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Aucune compétence récente</p>
            </div>
          )}
        </div>

        {/* Images récentes */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Images récentes</h2>
            <Link href="/admin-images" className="text-xs sm:text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
              Voir toutes →
            </Link>
          </div>
          {loadingRecentData ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : recentImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {recentImages.slice(0, 4).map((image) => (
                <div key={image._id} className="relative group">
                  <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {image.url ? (
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <Icons.ImageIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1.5 sm:p-2 rounded-b-lg">
                    <p className="text-xs font-medium truncate">{image.projectId?.title || 'Projet inconnu'}</p>
                    <p className="text-xs opacity-75 truncate">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Aucune image récente</p>
            </div>
          )}
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Activités récentes</h2>
          <button
            onClick={fetchRecentData}
            disabled={loadingRecentData}
            className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 disabled:opacity-50"
          >
            <Icons.RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${loadingRecentData ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>
        
        {loadingRecentData ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : recentActivities.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.icon);
              
              return (
                <div key={activity.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-[1.01] group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color} group-hover:animate-pulse`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors truncate">
                      {activity.item}
                    </p>
                    {/* Affichage des détails supplémentaires pour certains types */}
                    {activity.details && (
                      <div className="mt-1">
                        {activity.type === 'image' && activity.details.projectTitle && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Projet: {activity.details.projectTitle}
                          </p>
                        )}
                        {activity.type === 'message' && activity.details.from && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            De: {activity.details.from}
                          </p>
                        )}
                        {activity.type === 'project' && activity.details.isPublished !== undefined && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {activity.details.isPublished ? 'Publié' : 'Brouillon'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-400 dark:group-hover:text-gray-300 transition-colors whitespace-nowrap">
                    {formatRelativeTime(activity.timestamp)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Icons.Settings className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2">
              Aucune activité récente
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Les activités apparaîtront ici une fois que vous aurez créé du contenu
            </p>
          </div>
        )}

        {/* Pagination */}
        {recentActivities.length > 0 && activitiesPagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <span>
                Page {activitiesPagination.page} sur {activitiesPagination.totalPages}
                {' '}({activitiesPagination.total} activité{activitiesPagination.total > 1 ? 's' : ''})
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Bouton Précédent */}
              <button
                onClick={handlePrevPage}
                disabled={!activitiesPagination.hasPrevPage || loadingRecentData}
                className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>

              {/* Numéros de page */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, activitiesPagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (activitiesPagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (activitiesPagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (activitiesPagination.page >= activitiesPagination.totalPages - 2) {
                    pageNum = activitiesPagination.totalPages - 4 + i;
                  } else {
                    pageNum = activitiesPagination.page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loadingRecentData}
                      className={`inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${
                        pageNum === activitiesPagination.page
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Bouton Suivant */}
              <button
                onClick={handleNextPage}
                disabled={!activitiesPagination.hasNextPage || loadingRecentData}
                className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
