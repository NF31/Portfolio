import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation des données d'entrée
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Vérification du rôle admin
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    // Vérification du mot de passe
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Connexion réussie
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Connexion réussie',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );

    // Créer les cookies de session sécurisés
    const sessionTime = Date.now().toString();
    
    response.cookies.set('admin_authenticated', 'true', {
      path: '/',
      maxAge: 24 * 60 * 60, // 24 heures
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict'
    });

    response.cookies.set('admin_session_time', sessionTime, {
      path: '/',
      maxAge: 24 * 60 * 60, // 24 heures
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict'
    });

    response.cookies.set('admin_user_id', user._id.toString(), {
      path: '/',
      maxAge: 24 * 60 * 60, // 24 heures
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict'
    });

    return response;

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur de connexion' },
      { status: 500 }
    );
  }
}
