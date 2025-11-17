'use client';

import React from 'react';
import Image from 'next/image';
import { Icons } from '@/lib/icons';

interface SkillIconProps {
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  name: string;
  className?: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ icon, iconType, name, className = 'w-8 h-8' }) => {
  
  // Générer l'URL CDN pour Simple Icons
  const getSimpleIconUrl = (iconName: string) => {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${iconName}.svg`;
  };

  // Préparer un SVG pour l'affichage en ajoutant fill="currentColor" si nécessaire
  const prepareSvg = (svgString: string): string => {
    const trimmedSvg = svgString.trim();
    
    // Si le SVG n'a pas d'attribut fill, on ajoute fill="currentColor" pour hériter de la couleur parente
    if (!trimmedSvg.includes('fill=')) {
      return trimmedSvg.replace('<svg', '<svg fill="currentColor"');
    }
    
    return trimmedSvg;
  };

  const renderIcon = () => {
    
    // Détection automatique : si iconType est "lucide" mais que icon contient un SVG complet
    const isSvgContent = icon && icon.trim().startsWith('<svg');
    
    switch (iconType) {
      case 'lucide':
        // Si c'est un SVG complet, on le traite comme custom-svg
        if (isSvgContent) {
          const preparedSvg = prepareSvg(icon);
          return (
            <div 
              className={`${className} flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`}
              dangerouslySetInnerHTML={{ __html: preparedSvg }}
            />
          );
        }
        
        // Sinon, on cherche l'icône Lucide
        const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[icon];
        if (IconComponent) {
          return <IconComponent className={className} />;
        }
        break;

      case 'simple-icons':
        return (
          <Image 
            src={getSimpleIconUrl(icon)} 
            alt={name}
            width={32}
            height={32}
            className={`${className} object-contain`}
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        );

      case 'custom-svg':
        // Nettoyer et préparer le SVG
        const preparedSvg = prepareSvg(icon);
        return (
          <div 
            className={`${className} flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`}
            dangerouslySetInnerHTML={{ __html: preparedSvg }}
          />
        );

      case 'url':
        return (
          <Image 
            src={icon} 
            alt={name}
            width={32}
            height={32}
            className={`${className} object-contain`}
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        );

      default:
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
