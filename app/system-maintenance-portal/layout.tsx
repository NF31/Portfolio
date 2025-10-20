import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Système de Maintenance - Accès Sécurisé',
  description: 'Portail d\'administration sécurisé pour la maintenance du système',
  robots: 'noindex, nofollow', // Empêche l'indexation par les moteurs de recherche
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased">
      {children}
    </div>
  );
}
