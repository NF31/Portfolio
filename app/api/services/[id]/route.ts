import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    const service = await Service.findById(id).lean();

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service: service
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du service:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du service' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Vérifier que le service existe
    const existingService = await Service.findById(id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    // Mettre à jour le service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      service: updatedService,
      message: 'Service mis à jour avec succès'
    });

  } catch (error: unknown) {
    console.error('Erreur lors de la mise à jour du service:', error);
    
    // Gérer les erreurs de validation Mongoose
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const mongooseError = error as unknown as { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(mongooseError.errors).map((err) => err.message);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur de validation',
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du service' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    // Vérifier que le service existe
    const existingService = await Service.findById(id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le service
    await Service.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Service supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du service' },
      { status: 500 }
    );
  }
}
