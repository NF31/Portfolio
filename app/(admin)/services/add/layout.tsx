import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ajouter un Service - Administration | NFDev21',
  description: 'Ajouter un nouveau service à votre portfolio',
};

export default function AddServiceLayout({
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
