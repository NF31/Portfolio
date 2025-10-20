import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ajouter un Service - Administration | NFDev21',
  description: 'Ajouter un nouveau service à votre portfolio',
  robots: { index: false, follow: false },
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
