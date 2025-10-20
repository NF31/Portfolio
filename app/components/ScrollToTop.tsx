'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/lib/icons';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  

  // Fonction pour calculer le pourcentage de scroll et la visibilité
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    const progress = Math.min(Math.max(scrollPercent, 0), 100);
    const shouldBeVisible = scrollTop > 300;
    
    
    setScrollProgress(progress);
    setIsVisible(shouldBeVisible);
    
  };

  // Fonction pour remonter en haut avec transition fluide
  const scrollToTop = () => {
    try {
      // Animation fluide personnalisée
      
      const startPosition = window.scrollY;
      const startTime = performance.now();
      const duration = 800; // 800ms pour une animation fluide
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing pour une animation plus naturelle
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentPosition = startPosition * (1 - easeOutCubic);
        
        window.scrollTo(0, startPosition - currentPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // S'assurer qu'on est bien en haut
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      };
      
      // Démarrer l'animation
      requestAnimationFrame(animateScroll);
    } catch (error) {
      // Fallback avec smooth scroll natif
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Vérifier si on est côté client
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Appel initial pour vérifier la position
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  
  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-[9999] group">
          {/* Container principal */}
          <div className="relative">
            {/* Jauge de progression circulaire */}
            <div className="w-16 h-16 relative">
              {/* Cercle de fond */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                {/* Cercle de fond - adapté au dark/light mode */}
                <path
                  className="stroke-gray-300 dark:stroke-gray-600"
                  strokeWidth="2.5"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Cercle de progression - adapté au dark/light mode */}
                <path
                  className="stroke-blue-500 dark:stroke-blue-400 transition-all duration-300 ease-out"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${scrollProgress * 0.94}, 94`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              
              {/* Bouton central avec gradient adapté */}
              <button
                onClick={() => {
                  scrollToTop();
                }}
                className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 hover:scale-110 group-hover:rotate-3 m-auto active:scale-95 active:rotate-6 cursor-pointer"
                style={{
                  pointerEvents: 'auto',
                  zIndex: 10000
                }}
                aria-label="Remonter en haut de la page"
                type="button"
              >
                <Icons.ArrowUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-active:scale-110 pointer-events-none" />
              </button>
              
              {/* Effet de brillance qui traverse */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 dark:via-blue-300/40 rounded-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Effet de glow au hover - adapté au dark mode */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 blur-md transition-opacity duration-300 -inset-1"></div>
            </div>
            
            {/* Pourcentage de scroll affiché - adapté au dark mode */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              {Math.round(scrollProgress)}%
            </div>
            
            {/* Tooltip principal - adapté au dark mode */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              Remonter en haut
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          }
        }
        
        @keyframes click-bounce {
          0% { transform: scale(1); }
          50% { transform: scale(0.9) rotate(5deg); }
          100% { transform: scale(1.05) rotate(-2deg); }
        }
        
        .group:hover .animate-pulse {
          animation: float 2s ease-in-out infinite;
        }
        
        /* Animation de la jauge améliorée */
        .stroke-blue-500,
        .stroke-blue-400 {
          transition: stroke-dasharray 0.3s ease-out;
        }
        
        /* Pulsation douce continue */
        .group button {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
        
        /* Animation au clic */
        .group button:active {
          animation: click-bounce 0.3s ease-out;
        }
        
        /* Effet de pulsation pour le bouton */
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }
        
        .group:hover button {
          animation: pulse-glow 2s infinite, gentle-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
