import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accès Refusé - Portfolio NFDev21',
  description: 'Accès non autorisé à la section administrative',
  robots: 'noindex, nofollow',
};

export default function AccessDeniedLayout({
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
