'use client';

import React from 'react';
import { GraduationCap, Plus, BookOpen, Award, Calendar } from 'lucide-react';

const EducationPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Formation & Certifications</h1>
            <p className="text-gray-600">
              Gérez vos formations, certifications et parcours éducatif
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium opacity-50 cursor-not-allowed">
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Formation
          </button>
        </div>
      </div>

      {/* Contenu temporaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Section Formation en développement</h3>
          <p className="text-gray-600 mb-6">
            Cette section permettra de gérer vos formations, certifications et parcours éducatif.
            <br />
            <span className="text-sm text-gray-500">
              Fonctionnalité prévue pour une future version
            </span>
          </p>
          
          {/* Suggestions de contenu */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <h4 className="text-sm font-medium text-blue-800 mb-3">Idées de contenu à ajouter :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Formations techniques</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Certifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Parcours d'apprentissage</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Projets d'étude</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
