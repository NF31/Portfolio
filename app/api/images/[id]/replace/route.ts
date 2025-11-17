import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔄 Remplacement d\'image:', id);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Aucun fichier fourni"
      }, { status: 400 });
    }

    await connectDB();

    // Récupérer l'image existante
    const existingImage = await Image.findById(id);
    if (!existingImage) {
      return NextResponse.json({
        success: false,
        error: "Image non trouvée"
      }, { status: 404 });
    }

    console.log('📄 Nouveau fichier:', file.name, file.size, 'bytes');
    console.log('🗑️ Ancienne image à supprimer:', existingImage.publicId);
    console.log('🔍 Ancienne image complète:', existingImage);

    // Convertir le nouveau fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Uploader la nouvelle image sur Cloudinary
    const cloudinaryResult = await new Promise<{
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: 'auto',
          transformation: {
            quality: 'auto',
            fetch_format: 'auto'
          }
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as {
              public_id: string;
              secure_url: string;
              width: number;
              height: number;
              format: string;
              bytes: number;
            });
          }
        }
      );
      uploadStream.end(buffer);
    });

    console.log('✅ Nouvelle image uploadée:', cloudinaryResult.public_id);

    // Supprimer l'ancienne image de Cloudinary
    try {
      console.log('🗑️ Tentative de suppression de:', existingImage.publicId);
      const deleteResult = await cloudinary.uploader.destroy(existingImage.publicId);
      console.log('🗑️ Résultat de suppression:', deleteResult);
      console.log('🗑️ Ancienne image supprimée de Cloudinary:', existingImage.publicId);
    } catch (cloudinaryError) {
      console.error('❌ Erreur lors de la suppression de l\'ancienne image:', cloudinaryError);
      // On continue même si la suppression échoue
    }

    // Mettre à jour l'image dans la base de données
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height,
        format: cloudinaryResult.format,
        bytes: cloudinaryResult.bytes
      },
      { new: true, runValidators: true }
    ).populate('projectId', 'title');

    console.log('💾 Image mise à jour en base de données');

    return NextResponse.json({
      success: true,
      data: updatedImage,
      message: 'Image remplacée avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur lors du remplacement de l\'image:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du remplacement de l\'image' },
      { status: 500 }
    );
  }
}
