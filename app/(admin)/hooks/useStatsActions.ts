'use client';

import { useStats } from '../contexts/StatsContext';
import { toast } from 'sonner';

export const useStatsActions = () => {
  const { refreshStats } = useStats();

  const refreshAfterAction = async (actionName: string) => {
    try {
      await refreshStats();
      // Déclencher un événement personnalisé pour rafraîchir les données récentes
      window.dispatchEvent(new CustomEvent('refreshRecentData'));
      toast.success(`Statistiques mises à jour après ${actionName}`);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des stats:', error);
    }
  };

  return {
    refreshAfterAction
  };
};
