'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Loader2, Sparkles, Github, Globe } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link?: string;
  types: string | string[];
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => {
          const types = Array.isArray(p.types) ? p.types : [p.types];
          return types.includes(activeFilter);
        })
      );
    }
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      console.log('📊 Projets récupérés:', data);
      
      // L'API retourne { projects: [...] } ou { success: true, data: [...] }
      const projectsData = data.projects || data.data || [];
      
      if (projectsData.length > 0) {
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        
        // Extraire les types uniques dynamiquement
        const allTypes = new Set<string>();
        projectsData.forEach((project: Project) => {
          const types = Array.isArray(project.types) ? project.types : [project.types];
          types.forEach((type: string) => allTypes.add(type));
        });
        
        setAvailableTypes(Array.from(allTypes));
        console.log('🏷️ Types disponibles:', Array.from(allTypes));
      } else {
        console.log('⚠️ Aucun projet trouvé');
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectTypes = (types: string | string[]) => {
    return Array.isArray(types) ? types : [types];
  };

  // Fonction pour formater le label d'un type - VRAIMENT dynamique
  const formatTypeLabel = (type: string) => {
    if (!type) return '';
    // Capitalise simplement la première lettre, affiche tel quel de la BDD
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-12 group transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Portfolio
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed mb-10">
              Découvrez mes dernières réalisations et projets sur lesquels j'ai travaillé
            </p>
            
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 group"
            >
              <span>Discuter d'un projet</span>
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Filtres dynamiques */}
      <section className="py-12 bg-white border-b border-gray-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-wrap gap-4">
            {/* Bouton Tous */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Tous ({projects.length})
              </span>
            </button>
            
            {/* Filtres dynamiques depuis la BDD */}
            {availableTypes.map((type) => {
              const count = projects.filter((p) => {
                const types = Array.isArray(p.types) ? p.types : [p.types];
                return types.includes(type);
              }).length;
              
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === type
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formatTypeLabel(type)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grille de projets */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun projet trouvé dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image avec effet avancé */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
                    {project.images && project.images.length > 0 ? (
                      <>
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                        <span className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Overlay au hover avec backdrop blur */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="space-y-4 px-6">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="w-5 h-5 mr-2" />
                            Voir le projet
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Types badges en haut */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                      {getProjectTypes(project.types).map((type, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-blue-700 text-xs font-bold rounded-full shadow-lg border border-white/50"
                        >
                          {formatTypeLabel(type)}
                        </span>
                      ))}
                    </div>

                    {/* Titre et lien sur l'image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg flex-1">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all shadow-xl group/link"
                            onClick={(e) => e.stopPropagation()}
                            title="Visiter le site"
                          >
                            <Globe className="w-6 h-6 text-blue-600 group-hover/link:scale-110 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenu en dessous */}
                  <div className="p-6 bg-white">
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies - Présentation améliorée */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        Stack Technique
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="group/tech relative px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 cursor-default"
                          >
                            <span className="relative z-10">{tech}</span>
                            {/* Effet de brillance au hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 transform -translate-x-full group-hover/tech:translate-x-full transition-transform duration-700 rounded-lg"></div>
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
                      <Globe className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Voir le projet
                      <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  )}
                  </div>

                  {/* Barre décorative en bas */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;

