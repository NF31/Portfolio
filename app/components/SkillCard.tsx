'use client';

import React from 'react';
import Image from 'next/image';
import { Icons } from '@/lib/icons';

interface SkillCardProps {
  skill: {
    name: string;
    description: string;
    icon: string;
    category: string;
    level: string;
  };
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, className = '' }) => {
  // Fonction pour déterminer si c'est du SVG, une URL ou un nom Lucide
  const getIconComponent = () => {
    // Nettoyer l'icône (enlever le texte avant le SVG)
    let cleanIcon = skill.icon;
    const svgIndex = skill.icon.indexOf('<svg');
    if (svgIndex > 0) {
      cleanIcon = skill.icon.substring(svgIndex);
    }
    
    // Si c'est du code SVG (commence par <svg)
    if (cleanIcon.startsWith('<svg')) {
      return (
        <div 
          className="w-8 h-8 flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: cleanIcon }}
        />
      );
    }
    
    // Si c'est une URL (commence par http)
    if (cleanIcon.startsWith('http')) {
      return (
        <Image 
          src={cleanIcon} 
          alt={skill.name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    
    // Sinon, c'est probablement un nom Lucide
    const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[cleanIcon];
    
    if (IconComponent) {
      return <IconComponent className="w-8 h-8" />;
    }
    
    // Fallback si l'icône n'existe pas
    return (
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-xs font-bold text-gray-600">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      case 'expert': return 'Expert';
      default: return level;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 ${className}`}>
      <div className="flex items-start space-x-4">
        {/* Icône */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
            {getIconComponent()}
          </div>
        </div>
        
        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {skill.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
              {getLevelLabel(skill.level)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {skill.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              {skill.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
