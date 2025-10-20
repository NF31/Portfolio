import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modifier un Service - Administration | NFDev21',
  description: 'Modifier un service existant de votre portfolio',
  robots: { index: false, follow: false },
};

export default function EditServiceLayout({
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
