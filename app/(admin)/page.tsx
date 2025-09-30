'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MessageSquare, 
  Settings, 
  FileText, 
  Plus,
  Rocket,
  TrendingUp,
  Users,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useStats } from '../contexts/StatsContext';

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalServices: number;
  totalSkills: number;
  recentProjects?: number;
  archivedProjects?: number;
}

const AdminDashboard = () => {
  const { stats, isLoading, refreshStats, lastUpdated } = useStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshStats();
    setIsRefreshing(false);
  };

  const quickActions = [
    {
      title: 'Nouveau Projet',
      description: 'Ajouter un nouveau projet au portfolio',
      href: '/projects/add',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Nouveau Service',
      description: 'Créer un nouveau service',
      href: '/services/add',
      icon: Settings,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Nouvelle Compétence',
      description: 'Ajouter une compétence',
      href: '/skills/add',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Nouvel Article',
      description: 'Publier un article de blog',
      href: '/blog/add',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const recentActivities = [
    { action: 'Projet créé', item: 'Portfolio E-commerce', time: 'Il y a 2 heures', icon: Briefcase },
    { action: 'Message reçu', item: 'Demande de devis', time: 'Il y a 4 heures', icon: MessageSquare },
    { action: 'Service modifié', item: 'Développement Web', time: 'Il y a 1 jour', icon: Settings },
    { action: 'Article publié', item: 'Les tendances 2024', time: 'Il y a 2 jours', icon: FileText }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue dans l'administration
            </h1>
            <p className="text-gray-600">
              Gérez votre portfolio et vos contenus en toute simplicité
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Bouton de rafraîchissement */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Actualisation...' : 'Actualiser'}
            </button>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Rocket className="w-8 h-8 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300">Projets totaux</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{stats.projects.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Briefcase className="w-6 h-6 text-blue-600 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/projects"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir tous les projets →
            </Link>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors duration-300">Messages non lus</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{stats.messages.unread}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-emerald-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <MessageSquare className="w-6 h-6 text-green-600 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/messages"
              className="text-green-600 hover:text-green-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir les messages →
            </Link>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors duration-300">Services actifs</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{stats.services.total}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-violet-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Settings className="w-6 h-6 text-purple-600 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/services"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Gérer les services →
            </Link>
          </div>
        </div>

        {/* Projets récents */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors duration-300">Projets récents</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">{stats.projects.recent}</p>
              <p className="text-xs text-gray-500 mt-1">7 derniers jours</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Clock className="w-6 h-6 text-orange-600 group-hover:text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/projects"
              className="text-orange-600 hover:text-orange-700 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Voir tous les projets →
            </Link>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`group relative overflow-hidden rounded-2xl border-2 ${action.borderColor} ${action.bgColor} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Activités récentes</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                <activity.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <div className="text-sm text-gray-500">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
