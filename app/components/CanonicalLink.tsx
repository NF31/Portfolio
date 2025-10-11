'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalLink() {
  const pathname = usePathname();
  const baseUrl = 'https://nfdev21.com'; // Remplacez par votre domaine
  const canonical = `${baseUrl}${pathname}`;

  return (
    <link rel="canonical" href={canonical} />
  );
}

