'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Code, Database, Palette, Wrench } from 'lucide-react';

const SkillsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compétences Techniques</h1>
            <p className="text-gray-600">
              Gérez vos compétences techniques et soft skills
            </p>
          </div>
          <Link
            href="/skills/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Compétence
          </Link>
        </div>
      </div>

      {/* Contenu temporaire */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestion des compétences</h3>
          <p className="text-gray-600 mb-6">
            Cette section permettra de gérer vos compétences techniques.
          </p>
          <Link
            href="/skills/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter votre première compétence
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
