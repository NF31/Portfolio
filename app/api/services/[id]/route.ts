import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    const service = await Service.findById(params.id).lean();

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service
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
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Vérifier que le service existe
    const existingService = await Service.findById(params.id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    // Mettre à jour le service
    const updatedService = await Service.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedService,
      message: 'Service mis à jour avec succès'
    });

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du service:', error);
    
    // Gérer les erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
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
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'ID de service invalide' },
        { status: 400 }
      );
    }

    // Vérifier que le service existe
    const existingService = await Service.findById(params.id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, error: 'Service non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le service
    await Service.findByIdAndDelete(params.id);

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
