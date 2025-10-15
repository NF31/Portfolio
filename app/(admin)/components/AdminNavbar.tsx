'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Menu, 
  X, 
  BarChart3, 
  Briefcase, 
  Settings, 
  Target, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  GraduationCap,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';

// Styles CSS personnalisés pour les animations
const styles = `
  @keyframes slideInFromTop {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/admin-dashboard', icon: BarChart3 },
    { name: 'Projets', href: '/admin-projects', icon: Briefcase },
    { name: 'Services', href: '/admin-services', icon: Settings },
    { name: 'Compétences', href: '/admin-skills', icon: Target },
  /* { name: 'Formation', href: '/admin-education', icon: GraduationCap },
    { name: 'Blog', href: '/blog', icon: FileText },*/
    { name: 'Messages', href: '/admin-messages', icon: MessageSquare },
    { name: 'Images', href: '/admin-images', icon: ImageIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/admin-dashboard') {
      return pathname === '/admin-dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-lg group-hover:rotate-12 transition-transform duration-300">NF</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">NFDev21</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">Administration</p>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </button>

            {/* Boutons d'action */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Informations utilisateur */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <UserInfo />
              </div>
              
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:border-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Home className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Retour au site
              </Link>
              <LogoutButton />
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-110"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-900'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <item.icon className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {item.name}
                  {isActive(item.href) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {/* Informations utilisateur mobile */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mx-2">
                  <UserInfo />
                </div>
                
                <Link
                  href="/portfolio"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105"
                >
                  <Home className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Retour au site
                </Link>
                <div className="px-4">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default AdminNavbar;
