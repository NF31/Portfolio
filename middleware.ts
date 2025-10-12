import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'utilisateur tente d'accéder aux routes admin
  if (pathname.startsWith('/admin-dashboard') || 
      pathname.startsWith('/admin-projects') || 
      pathname.startsWith('/admin-services') || 
      pathname.startsWith('/admin-skills') || 
      pathname.startsWith('/admin-images') || 
      pathname.startsWith('/admin-messages') || 
      pathname.startsWith('/admin-education')) {
    
    // Vérifier les cookies de session
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    const sessionTime = request.cookies.get('admin_session_time')?.value;
    const userId = request.cookies.get('admin_user_id')?.value;
    
    // Vérifier si la session est encore valide (24 heures)
    const now = Date.now();
    const sessionExpiry = sessionTime ? parseInt(sessionTime) + (24 * 60 * 60 * 1000) : 0;
    
    // Vérifier que tous les cookies nécessaires sont présents
    if (!isAuthenticated || !sessionTime || !userId || now > sessionExpiry) {
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
