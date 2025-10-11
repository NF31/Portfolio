'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Services', href: '#services' },
    { name: 'Parcours', href: '#parcours' },
    { name: 'Projets', href: '#projets' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl">NF</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NFDev21
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop + Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className="relative z-10">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-500 group-hover:-rotate-12" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <Link
              href="#contact"
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Me Contacter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Dark Mode Toggle Mobile + Menu Burger */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-500 group-hover:rotate-180" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>

            {/* Menu Burger avec animation incroyable */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Ligne du haut */}
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                {/* Ligne du milieu */}
                <span
                  className={`absolute h-0.5 w-6 bg-current transition-all duration-200 ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                ></span>
                {/* Ligne du bas */}
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile avec animation spectaculaire */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-4 mt-2 mb-4 px-6 pt-4 pb-6 space-y-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
          {/* Effet de brillance animé en arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 dark:from-blue-900/20 dark:via-transparent dark:to-indigo-900/20 opacity-50"></div>
          
          <div className="relative space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group relative block px-5 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:pl-7 hover:shadow-md overflow-hidden"
                style={{
                  animation: isMenuOpen
                    ? `slideInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s forwards`
                    : 'none',
                  opacity: 0,
                  transform: 'translateX(-30px) scale(0.8)',
                }}
              >
                {/* Effet de survol lumineux */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center justify-between">
                  {item.name}
                  <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300"></span>
                </span>
              </Link>
            ))}
            
            {/* Séparateur décoratif */}
            <div className="flex items-center space-x-2 py-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Bouton CTA mobile */}
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="relative block px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 overflow-hidden group"
              style={{
                animation: isMenuOpen
                  ? `slideInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${navItems.length * 0.1}s forwards`
                  : 'none',
                opacity: 0,
              }}
            >
              <span className="relative z-10">Me Contacter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Effet d'onde */}
              <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.8);
          }
          50% {
            transform: translateX(5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

