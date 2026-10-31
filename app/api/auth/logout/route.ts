import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Déconnexion réussie' },
    { status: 200 }
  );

  // Supprimer le cookie de session, et ceux de l'ancien système s'ils traînent encore
  for (const name of [SESSION_COOKIE, 'admin_authenticated', 'admin_session_time', 'admin_user_id']) {
    response.cookies.set(name, '', {
      path: '/',
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict'
    });
  }

  return response;
}
