'use client';

import React from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, Star, StarOff, Power, PowerOff } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

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

interface ServicesTableProps {
  services: Service[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onToggleFeatured: (id: string, currentFeatured: boolean) => void;
}

const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onDelete,
  onToggleStatus,
  onToggleFeatured
}) => {
  // Fonction pour obtenir l'icône Lucide
  const getLucideIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <LucideIcons.Briefcase className="w-5 h-5" />;
  };

  // Fonction pour formater le prix
  const formatPrice = (price?: Service['price']) => {
    if (!price) return 'Sur devis';
    
    if (price.type === 'project') return 'Sur devis';
    if (price.type === 'hourly') return `${price.amount}€/h`;
    if (price.type === 'fixed') return `${price.amount}€`;
    
    return 'Sur devis';
  };

  // Fonction pour formater la catégorie
  const formatCategory = (category: string) => {
    const categories: { [key: string]: string } = {
      'web': 'Web',
      'mobile': 'Mobile',
      'design': 'Design',
      'consulting': 'Consulting',
      'maintenance': 'Maintenance',
      'other': 'Autre'
    };
    return categories[category] || category;
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <LucideIcons.Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun service trouvé</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">Commencez par ajouter votre premier service à votre portfolio.</p>
        <Link
          href="/admin-services/add"
          className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
        >
          <LucideIcons.Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Ajouter un service
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        {/* Version Desktop - Table */}
        <div className="hidden lg:block">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <div className="text-white">
                            {getLucideIcon(service.icon)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {service.title}
                            </div>
                            {service.isFeatured && (
                              <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {service.shortDescription}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {formatCategory(service.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatPrice(service.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{service.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleStatus(service._id, service.isActive)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            service.isActive
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                          }`}
                          title={service.isActive ? 'Désactiver' : 'Activer'}
                        >
                          {service.isActive ? (
                            <Power className="w-4 h-4 mr-1" />
                          ) : (
                            <PowerOff className="w-4 h-4 mr-1" />
                          )}
                          {service.isActive ? 'Actif' : 'Inactif'}
                        </button>
                        <button
                          onClick={() => onToggleFeatured(service._id, service.isFeatured)}
                          className={`p-1.5 rounded transition-colors ${
                            service.isFeatured
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                          title={service.isFeatured ? 'Retirer des favoris' : 'Mettre en avant'}
                        >
                          {service.isFeatured ? (
                            <Star className="w-4 h-4" />
                          ) : (
                            <StarOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin-services/${service._id}`}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin-services/edit/${service._id}`}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onDelete(service._id)}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Version Mobile - Cards */}
        <div className="lg:hidden space-y-4 p-4">
          {services.map((service) => (
            <div key={service._id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <div className="text-white">
                      {getLucideIcon(service.icon)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {service.title}
                    </h3>
                    {service.isFeatured && (
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {formatCategory(service.category)}
                    </span>
                    <button
                      onClick={() => onToggleStatus(service._id, service.isActive)}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        service.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {service.isActive ? (
                        <Power className="w-3 h-3 mr-1" />
                      ) : (
                        <PowerOff className="w-3 h-3 mr-1" />
                      )}
                      {service.isActive ? 'Actif' : 'Inactif'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatPrice(service.price)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => onToggleFeatured(service._id, service.isFeatured)}
                  className={`p-2 rounded transition-colors ${
                    service.isFeatured
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                  title={service.isFeatured ? 'Retirer des favoris' : 'Mettre en avant'}
                >
                  {service.isFeatured ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>
                <div className="flex gap-2">
                  <Link
                    href={`/admin-services/${service._id}`}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Voir"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin-services/edit/${service._id}`}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(service._id)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesTable;