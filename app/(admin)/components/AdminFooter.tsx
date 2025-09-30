'use client';

import React from 'react';
import Link from 'next/link';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Dashboard', href: '/' },
      { name: 'Projets', href: '/projects' },
      { name: 'Services', href: '/services' },
      { name: 'Compétences', href: '/skills' },
      { name: 'Blog', href: '/blog' },
      { name: 'Messages', href: '/messages' },
    ],
    support: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Aide', href: '/help' },
      { name: 'Statut', href: '/status' },
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/NFDev21', icon: '🐙' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/nfdev21', icon: '💼' },
      { name: 'Portfolio', href: '/', icon: '🌐' },
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">NF</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">NFDev21</h3>
                <p className="text-sm text-gray-600">Administration</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Interface d'administration du portfolio NFDev21. 
              Gérez vos projets, services et contenus en toute simplicité.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social et contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🏠</span>
                Voir le site public
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>© {currentYear} NFDev21. Tous droits réservés.</span>
              <span className="hidden sm:block">•</span>
              <span className="hidden sm:block">Développé avec Next.js & MongoDB</span>
            </div>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-xs text-gray-500">
                Version 1.0.0
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Système opérationnel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
