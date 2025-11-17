'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/lib/icons';


interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link?: string;
  types: string | string[];
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?limit=6');
      const data = await response.json();
      
      console.log('📊 Projets récupérés (section):', data);
      
      // L'API retourne { projects: [...] } ou { success: true, data: [...] }
      const projectsData = data.projects || data.data || [];
      
      if (projectsData.length > 0) {
        // Limiter à 6 projets
        setProjects(projectsData.slice(0, 6));
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectTypes = (types: string | string[]) => {
    if (Array.isArray(types)) {
      return types;
    }
    return [types];
  };

  // Fonction pour formater le label d'un type - VRAIMENT dynamique
  const formatTypeLabel = (type: string) => {
    if (!type) return '';
    // Capitalise simplement la première lettre, affiche tel quel de la BDD
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Icons.Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section id="projets" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Mes Dernières Réalisations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez une sélection de projets sur lesquels j&apos;ai travaillé récemment
          </p>
        </div>

        {/* Grille de projets - Design amélioré */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Image du projet */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30">
                {project.images && project.images.length > 0 ? (
                  <>
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay permanent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-500/30"></div>
                    <span className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Overlay interactif au hover avec backdrop blur intense */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6">
                  <p className="text-white text-center mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icons.Globe className="w-5 h-5 mr-2" />
                      Visiter le site
                    </a>
                  )}
                </div>

                {/* Types badges repositionnés */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                  {getProjectTypes(project.types).map((type, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/30"
                    >
                      {formatTypeLabel(type)}
                    </span>
                  ))}
                </div>

                {/* Titre et lien sur l'image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-2xl flex-1">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-600 hover:scale-110 transition-all shadow-xl group/link"
                        onClick={(e) => e.stopPropagation()}
                        title="Visiter le site"
                      >
                        <Icons.Globe className="w-6 h-6 text-blue-600 group-hover/link:scale-110 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu - Technologies et lien */}
              <div className="p-6 bg-white dark:bg-gray-800">
                {/* Technologies avec design amélioré */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-2 animate-pulse"></span>
                      Technologies
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {project.technologies.length} stack{project.technologies.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="group/tech relative px-3 py-2 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
                      >
                        <span className="relative z-10">{tech}</span>
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-500/20 to-transparent transform -translate-x-full group-hover/tech:translate-x-full transition-transform duration-700"></div>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bouton lien visible en permanence */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5 group/btn"
                  >
                    <Icons.Globe className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    Voir le projet
                    <Icons.ExternalLink className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              {/* Barre de progression décorative */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Bouton Voir tous les projets */}
        <div className="text-center">
          <Link
            href="/projets"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Voir tous les projets</span>
            <Icons.ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;

