import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Bloquer uniquement les fichiers sensibles et répertoires techniques
Disallow: /*.json$
Disallow: /*.env$
Disallow: /_next/
Disallow: /node_modules/

# Les pages admin sont contrôlées par meta robots noindex au niveau des layouts
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
