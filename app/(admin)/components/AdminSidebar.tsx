'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  X, 
  BarChart3, 
  Briefcase, 
  Settings, 
  Target, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon 
} from 'lucide-react';
import { useStats } from '../contexts/StatsContext';

// Styles CSS personnalisés pour les animations
const sidebarStyles = `
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
    }
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    75% { transform: rotate(-1deg); }
  }
`;

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { stats } = useStats();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin-dashboard',
      icon: BarChart3,
      description: 'Vue d\'ensemble'
      // Pas de badge pour le dashboard
    },
    {
      name: 'Projets',
      href: '/admin-projects',
      icon: Briefcase,
      description: 'Gérer les projets',
      badge: stats.projects.total.toString()
    },
    {
      name: 'Services',
      href: '/admin-services',
      icon: Settings,
      description: 'Services proposés',
      badge: stats.services.total.toString()
    },
    {
      name: 'Compétences',
      href: '/admin-skills',
      icon: Target,
      description: 'Compétences techniques',
      badge: stats.skills.total.toString()
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: FileText,
      description: 'Articles de blog',
      badge: stats.blog.total.toString()
    },
    {
      name: 'Messages',
      href: '/admin-messages',
      icon: MessageSquare,
      description: 'Messages reçus',
      badge: stats.messages.total.toString(),
      unreadBadge: stats.messages.unread > 0 ? stats.messages.unread.toString() : undefined
    },
    {
      name: 'Images',
      href: '/admin-images',
      icon: ImageIcon,
      description: 'Gestion des médias',
      badge: stats.images.total.toString()
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin-dashboard') {
      return pathname === '/admin-dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sidebarStyles }} />
      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-white/20 dark:border-gray-800/20 shadow-xl z-50 transform transition-all duration-500 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'animate-slideInFromLeft' : ''}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:animate-pulseGlow">
                <span className="text-white font-bold text-lg group-hover:animate-wiggle">NF</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">NFDev21</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">Administration</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-5 h-5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl animate-pulseGlow'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-gray-900 dark:hover:text-white'
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isOpen ? 'fadeInUp 0.5s ease-out forwards' : 'none'
              }}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div>
                  <div className="font-medium group-hover:translate-x-1 transition-transform duration-300">{item.name}</div>
                  <div className={`text-xs transition-colors duration-300 ${isActive(item.href) ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {item.badge !== undefined && (
                  <span className={`
                    px-2 py-1 text-xs font-bold rounded-full transition-all duration-300 group-hover:scale-110 min-w-[20px] text-center
                    ${isActive(item.href)
                      ? 'bg-white/30 text-white shadow-lg'
                      : item.badge === '0' 
                        ? 'bg-gray-400 text-white group-hover:bg-gray-500 shadow-md'
                        : 'bg-blue-500 text-white group-hover:bg-blue-600 shadow-md'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
                {item.unreadBadge && (
                  <span className={`
                    px-2 py-1 text-xs font-bold rounded-full transition-all duration-300 group-hover:scale-110 min-w-[20px] text-center animate-pulse
                    ${isActive(item.href)
                      ? 'bg-white/30 text-white shadow-lg'
                      : 'bg-red-500 text-white group-hover:bg-red-600 shadow-md'
                    }
                  `}>
                    {item.unreadBadge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer de la sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            className="group flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <Home className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div>
              <div className="font-medium group-hover:translate-x-1 transition-transform duration-300">Retour au site</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">Voir le portfolio public</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
