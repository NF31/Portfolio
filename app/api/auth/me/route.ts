import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Vérifier les cookies de session
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    const sessionTime = request.cookies.get('admin_session_time')?.value;
    const userId = request.cookies.get('admin_user_id')?.value;
    
    if (!isAuthenticated || !sessionTime || !userId) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Vérifier l'expiration de la session
    const now = Date.now();
    const sessionExpiry = parseInt(sessionTime) + (24 * 60 * 60 * 1000);
    
    if (now > sessionExpiry) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      );
    }

    // Connexion à la base de données
    await connectDB();

    // Rechercher l'utilisateur
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier le rôle admin
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur vérification utilisateur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur de vérification' },
      { status: 500 }
    );
  }
}
