'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface SkillIconProps {
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  name: string;
  className?: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ icon, iconType, name, className = 'w-8 h-8' }) => {
  
  // Debug pour voir les valeurs reçues
  console.log('🎨 SkillIcon - iconType:', iconType);
  console.log('🎨 SkillIcon - icon:', icon);
  console.log('🎨 SkillIcon - name:', name);
  
  // Générer l'URL CDN pour Simple Icons
  const getSimpleIconUrl = (iconName: string) => {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${iconName}.svg`;
  };

  const renderIcon = () => {
    console.log('🎨 RenderIcon - Traitement iconType:', iconType);
    
    // Détection automatique : si iconType est "lucide" mais que icon contient un SVG complet
    const isSvgContent = icon && icon.trim().startsWith('<svg');
    
    switch (iconType) {
      case 'lucide':
        // Si c'est un SVG complet, on le traite comme custom-svg
        if (isSvgContent) {
          console.log('🎨 SVG détecté dans lucide, conversion vers custom-svg');
          return (
            <div 
              className={`${className} flex items-center justify-center`}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          );
        }
        
        // Sinon, on cherche l'icône Lucide
        const IconComponent = (LucideIcons as any)[icon];
        if (IconComponent) {
          return <IconComponent className={className} />;
        }
        console.log('❌ Lucide icon not found:', icon);
        break;

      case 'simple-icons':
        return (
          <img 
            src={getSimpleIconUrl(icon)} 
            alt={name}
            className={`${className} object-contain`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        );

      case 'custom-svg':
        console.log('🎨 Rendering custom SVG:', icon);
        return (
          <div 
            className={`${className} flex items-center justify-center`}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        );

      case 'url':
        return (
          <img 
            src={icon} 
            alt={name}
            className={`${className} object-contain`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        );

      default:
        console.log('❌ Unknown iconType:', iconType);
        break;
    }

    // Fallback si l'icône n'existe pas
    return (
      <div className={`${className} bg-gray-200 rounded flex items-center justify-center`}>
        <span className="text-xs font-bold text-gray-600">
          {name && name.length > 0 ? name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
    );
  };

  return (
    <>
      {renderIcon()}
      {/* Icône de fallback cachée */}
      <div className={`${className} bg-gray-200 rounded flex items-center justify-center hidden`}>
        <span className="text-xs font-bold text-gray-600">
          {name && name.length > 0 ? name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
    </>
  );
};

export default SkillIcon;
