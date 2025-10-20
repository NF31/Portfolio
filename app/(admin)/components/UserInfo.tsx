'use client';

import React, { useEffect, useState } from 'react';
import { Icons } from '@/lib/icons';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si on est dans l'espace admin, c'est qu'on est connecté (middleware protège les routes)
    // Affichons directement les infos utilisateur
    setUserInfo({
      id: 'authenticated',
      name: 'NFDev21',
      email: 'nfdev21@gmail.com',
      role: 'admin'
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span>Chargement...</span>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
        <Icons.User className="w-4 h-4" />
        <span>Utilisateur non trouvé</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
        <Icons.User className="w-4 h-4 text-white" />
      </div>
      
      {/* Informations utilisateur */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {userInfo.name}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            userInfo.role === 'superadmin' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            <Icons.Shield className="w-3 h-3 mr-1" />
            {userInfo.role === 'superadmin' ? 'Super Admin' : 'Admin'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Icons.Mail className="w-3 h-3" />
          <span className="truncate max-w-[150px]">{userInfo.email}</span>
        </div>
      </div>
      
      {/* Version mobile simplifiée */}
      <div className="md:hidden">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {userInfo.name}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
