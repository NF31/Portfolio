import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Déconnexion réussie' },
    { status: 200 }
  );

  // Supprimer les cookies de session
  response.cookies.set('admin_authenticated', '', {
    path: '/',
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  });

  response.cookies.set('admin_session_time', '', {
    path: '/',
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  });

  return response;
}
