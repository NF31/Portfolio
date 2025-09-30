import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Administration | NFDev21',
  description: 'Gestion des services proposés par NFDev21',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
