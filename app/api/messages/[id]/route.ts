import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import mongoose from 'mongoose';

// PATCH - Mettre à jour le statut d'un message
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    // Valider le statut
    if (!status || !['unread', 'read', 'processed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Statut invalide' },
        { status: 400 }
      );
    }

    // Mettre à jour le message
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, error: 'Message non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMessage,
      message: 'Statut mis à jour avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du message' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    // Supprimer le message
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, error: 'Message non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message supprimé avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du message' },
      { status: 500 }
    );
  }
}

