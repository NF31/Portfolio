'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiGithub, SiSnapchat } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">NF</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">NFDev21</span>
            </Link>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                Next.js
              </span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full">
                React
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                Laravel
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                TypeScript
              </span>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/nfdev21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                title="GitHub"
                aria-label="GitHub"
              >
                <SiGithub className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://snapchat.com/add/nfdev21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#FFFC00] dark:hover:border-[#FFFC00] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                title="Snapchat"
                aria-label="Snapchat"
              >
                <SiSnapchat className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-[#FFFC00] transition-colors" />
              </a>
            </div>
          </div>

          {/* Liens légaux */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Liens utiles
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/conditions-generales" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:nfdev21@gmail.com" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <Mail className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  nfdev21@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33781882130" className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <Phone className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  0781882130
                </a>
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                Toulouse, France
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} <span className="font-semibold text-gray-900 dark:text-white">NFDev21</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

