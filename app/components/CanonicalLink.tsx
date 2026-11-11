'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalLink() {
  const pathname = usePathname();
  const baseUrl = 'https://www.nfdev.fr';
  const canonical = `${baseUrl}${pathname}`;

  return (
    <link rel="canonical" href={canonical} />
  );
}

