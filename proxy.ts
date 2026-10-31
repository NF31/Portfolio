import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionUserId } from './lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'utilisateur tente d'accéder aux routes admin
  if (pathname.startsWith('/admin-dashboard') || 
      pathname.startsWith('/admin-projects') || 
      pathname.startsWith('/admin-services') || 
      pathname.startsWith('/admin-skills') || 
      pathname.startsWith('/admin-images') || 
      pathname.startsWith('/admin-messages') || 
      pathname.startsWith('/admin-education')) {
    
    // Vérifier la session signée (signature + expiration)
    const userId = await getSessionUserId(request);

    if (!userId) {
      // Rediriger vers la page d'accès refusé
      const accessDeniedUrl = new URL('/access-denied', request.url);
      return NextResponse.redirect(accessDeniedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/admin-projects/:path*',
    '/admin-services/:path*',
    '/admin-skills/:path*',
    '/admin-images/:path*',
    '/admin-messages/:path*',
    '/admin-education/:path*',
  ],
};
