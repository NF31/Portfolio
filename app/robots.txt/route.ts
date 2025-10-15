import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Bloquer l'accès aux pages d'administration
Disallow: /admin/
Disallow: /admin-*
Disallow: /system-maintenance-portal/

# Bloquer l'accès aux API
Disallow: /api/

# Bloquer l'accès aux fichiers de configuration
Disallow: /*.json$
Disallow: /*.env$
Disallow: /_next/
Disallow: /node_modules/`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
