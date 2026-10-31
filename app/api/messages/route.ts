import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { requireAdmin } from '@/lib/session';

// GET - Récupérer tous les messages
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Construire le filtre
    const filter: Record<string, unknown> = {};
    if (status && ['unread', 'read', 'processed'].includes(status)) {
      filter.status = status;
    }

    // Récupérer les messages avec pagination
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Compter le total
    const total = await Message.countDocuments(filter);

    // Compter par statut pour les statistiques
    const stats = {
      unread: await Message.countDocuments({ status: 'unread' }),
      read: await Message.countDocuments({ status: 'read' }),
      processed: await Message.countDocuments({ status: 'processed' }),
      total: await Message.countDocuments(),
    };

    return NextResponse.json({
      success: true,
      data: messages,
      total,
      stats,
      pagination: {
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

