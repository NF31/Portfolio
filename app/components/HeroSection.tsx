'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Palette, Rocket } from 'lucide-react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const titles = [
    'Développeur Fullstack',
    'Spécialiste Laravel',
    'Design & Performance',
    'Solutions Sur Mesure'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 500); // Durée de l'animation de sortie
    }, 3000); // Change tous les 3 secondes

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950"
    >
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu Texte */}
          <div className="space-y-8 animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Disponible pour de nouveaux projets
              </span>
            </div>

            {/* Titre Principal avec texte dynamique */}
            <div className="space-y-4">
              <div className="h-32 sm:h-36 lg:h-40 flex items-center">
                <h1
                  className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-500 ${isAnimating
                      ? 'opacity-0 translate-y-4 scale-95'
                      : 'opacity-100 translate-y-0 scale-100'
                    }`}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    {titles[currentText]}
                  </span>
                </h1>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                Je transforme vos idées en solutions digitales
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Je conçois des solutions web innovantes et performantes qui transforment vos idées en réalité digitale. Spécialisé dans le développement d'applications web modernes et scalables.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#projets"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Voir mes projets
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="#contact"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                Me contacter
              </Link>
            </div>
          </div>

          {/* Visuel Côté Droit - Version améliorée */}
          <div className="relative lg:block hidden animate-fadeInRight">
            <div className="relative">
              {/* Card principale avec effet 3D */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 transform hover:rotate-1 transition-all duration-500">
                <div className="space-y-6">
                  {/* Élément 1 - Développement */}
                  <div className="group flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-blue-500/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300">
                      <Code2 className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">Développement</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Code clean & performant</p>
                    </div>
                    {/* Indicateur de progression */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                  </div>

                  {/* Élément 2 - Design */}
                  <div className="group flex items-center space-x-4 p-5 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-violet-500/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/50 group-hover:scale-110 transition-all duration-300">
                      <Palette className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">UI/UX Design</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interfaces modernes</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                  </div>

                  {/* Élément 3 - Performance */}
                  <div className="group flex items-center space-x-4 p-5 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-pink-500/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 group-hover:scale-110 transition-all duration-300">
                      <Rocket className="w-7 h-7 text-white group-hover:rotate-12 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">Performance</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Optimisation SEO</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                  </div>
                </div>

                {/* Badge "Disponible" flottant */}
                <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg animate-bounce-slow">
                  <span className="text-white text-xs font-bold flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    Disponible
                  </span>
                </div>
              </div>

              {/* Éléments flottants améliorés */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl transform rotate-12 animate-float shadow-xl opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full opacity-20 animate-pulse-slow"></div>

              {/* Particules décoratives */}
              <div className="absolute top-1/4 -left-4 w-4 h-4 bg-blue-400 rounded-full animate-ping-slow opacity-60"></div>
              <div className="absolute bottom-1/3 -right-2 w-3 h-3 bg-violet-400 rounded-full animate-ping-slow opacity-60" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

