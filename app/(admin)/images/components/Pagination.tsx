'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Générer la liste des pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Si on a moins de 5 pages, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages autour de la page courante
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      // Ajuster si on est près du début ou de la fin
      if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
      }
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-700">
        <span>
          Page {currentPage} sur {totalPages}
        </span>
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Bouton précédent */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Précédent
        </button>

        {/* Numéros de pages */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Bouton suivant */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          Suivant
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
