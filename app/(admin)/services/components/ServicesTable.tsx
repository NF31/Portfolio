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
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <LucideIcons.Briefcase className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
        <p className="text-gray-600 mb-6">
          Commencez par ajouter votre premier service à votre portfolio.
        </p>
        <Link
          href="/services/add"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          <LucideIcons.Plus className="w-5 h-5 mr-2" />
          Ajouter un service
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prix
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Technologies
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <div className="text-white">
                      {getLucideIcon(service.icon)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {service.title}
                      </div>
                      {service.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-500 ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {service.shortDescription}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {formatCategory(service.category)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(service.price)}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {service.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                      +{service.technologies.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleStatus(service._id, service.isActive)}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      service.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                    title={service.isActive ? 'Désactiver' : 'Activer'}
                  >
                    {service.isActive ? (
                      <Power className="w-3 h-3 mr-1" />
                    ) : (
                      <PowerOff className="w-3 h-3 mr-1" />
                    )}
                    {service.isActive ? 'Actif' : 'Inactif'}
                  </button>
                  <button
                    onClick={() => onToggleFeatured(service._id, service.isFeatured)}
                    className={`p-1 rounded transition-colors ${
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/services/${service._id}`}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                    title="Voir"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/services/edit/${service._id}`}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(service._id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
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
  );
};

export default ServicesTable;
