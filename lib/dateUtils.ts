/**
 * Formate une date en temps relatif (ex: "Il y a 2 heures", "Il y a 3 jours")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  // Moins d'une minute
  if (diffInSeconds < 60) {
    return 'À l\'instant';
  }

  // Moins d'une heure
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (diffInMinutes === 1) {
      return 'Il y a 1 minute';
    }
    return `Il y a ${diffInMinutes} minutes`;
  }

  // Moins d'un jour
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (diffInHours === 1) {
      return 'Il y a 1 heure';
    }
    return `Il y a ${diffInHours} heures`;
  }

  // Moins d'une semaine
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) {
      return 'Il y a 1 jour';
    }
    return `Il y a ${diffInDays} jours`;
  }

  // Moins d'un mois
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    if (diffInWeeks === 1) {
      return 'Il y a 1 semaine';
    }
    return `Il y a ${diffInWeeks} semaines`;
  }

  // Moins d'un an
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    if (diffInMonths === 1) {
      return 'Il y a 1 mois';
    }
    return `Il y a ${diffInMonths} mois`;
  }

  // Plus d'un an
  const diffInYears = Math.floor(diffInDays / 365);
  if (diffInYears === 1) {
    return 'Il y a 1 an';
  }
  return `Il y a ${diffInYears} ans`;
}

/**
 * Formate une date en format court (ex: "15/03/2024")
 */
export function formatShortDate(date: Date | string): string {
  const targetDate = new Date(date);
  return targetDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Formate une date en format long (ex: "15 mars 2024 à 14:30")
 */
export function formatLongDate(date: Date | string): string {
  const targetDate = new Date(date);
  return targetDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
