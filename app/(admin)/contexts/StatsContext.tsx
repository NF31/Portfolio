'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface StatsData {
  projects: {
    total: number;
    published: number;
    archived: number;
    recent: number;
  };
  messages: {
    total: number;
    unread: number;
  };
  services: {
    total: number;
  };
  skills: {
    total: number;
    active: number;
  };
  blog: {
    total: number;
  };
  images: {
    total: number;
    recent: number;
  };
}

interface StatsContextType {
  stats: StatsData;
  isLoading: boolean;
  refreshStats: () => Promise<void>;
  lastUpdated: Date | null;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<StatsData>({
    projects: { total: 0, published: 0, archived: 0, recent: 0 },
    messages: { total: 0, unread: 0 },
    services: { total: 0 },
    skills: { total: 0, active: 0 },
    blog: { total: 0 },
    images: { total: 0, recent: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshStats();
    
    // Rafraîchissement automatique toutes les 30 secondes
    const interval = setInterval(refreshStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const value: StatsContextType = {
    stats,
    isLoading,
    refreshStats,
    lastUpdated
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
};
