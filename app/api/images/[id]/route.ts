import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';
import { cloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const imageId = params.id;
    const image = await Image.findById(imageId).populate('projectId', 'title');

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: image
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération de l\'image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de l\'image' },
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

    const imageId = params.id;
    const body = await request.json();
    const { alt, description, projectId } = body;

    console.log('📝 Mise à jour de l\'image:', imageId);
    console.log('📋 Données reçues:', { alt, description, projectId });

    // Validation
    if (!alt?.trim()) {
      return NextResponse.json(
        { success: false, error: 'La description de l\'image est requise' },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Un projet doit être sélectionné' },
        { status: 400 }
      );
    }

    // Récupérer l'image existante
    const existingImage = await Image.findById(imageId);
    if (!existingImage) {
      return NextResponse.json(
        { success: false, error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    // Mettre à jour l'image
    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      {
        alt: alt.trim(),
        description: description?.trim() || '',
        projectId: projectId
      },
      { new: true, runValidators: true }
    ).populate('projectId', 'title');

    if (!updatedImage) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    console.log('✅ Image mise à jour avec succès:', updatedImage._id);

    return NextResponse.json({
      success: true,
      data: updatedImage,
      message: 'Image mise à jour avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la mise à jour de l\'image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de l\'image' },
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

    const imageId = params.id;
    console.log('🗑️ Suppression de l\'image:', imageId);

    // Récupérer l'image depuis la base de données
    const image = await Image.findById(imageId);
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    console.log('🖼️ Image trouvée:', image);

    // Supprimer l'image de Cloudinary
    try {
      await cloudinary.uploader.destroy(image.publicId);
      console.log('☁️ Image supprimée de Cloudinary:', image.publicId);
    } catch (cloudinaryError) {
      console.warn('⚠️ Erreur lors de la suppression de Cloudinary:', cloudinaryError);
      // On continue même si Cloudinary échoue, on supprime quand même de la DB
    }

    // Supprimer l'image de la base de données
    await Image.findByIdAndDelete(imageId);
    console.log('💾 Image supprimée de la base de données');

    return NextResponse.json({
      success: true,
      message: 'Image supprimée avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la suppression de l\'image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de l\'image' },
      { status: 500 }
    );
  }
}
