import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from '@/lib/cloudinary';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 Début de l\'upload d\'image...');
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;
    
    console.log('📄 Fichier reçu:', file ? `${file.name} (${file.size} bytes)` : 'Aucun fichier');
    console.log('🆔 Project ID reçu:', projectId);
    console.log('🔍 Type du projectId:', typeof projectId);
    console.log('📏 Longueur du projectId:', projectId?.length);

    if (!file) {
      return NextResponse.json({
        success: false,
        msg: "Aucun fichier fourni",
        statusCode: 400,
      });
    }

    if (!projectId) {
      return NextResponse.json({
        success: false,
        msg: "Aucun projet sélectionné",
        statusCode: 400,
      });
    }

    // Upload vers Cloudinary dans le dossier portfolio
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
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

    // Sauvegarder en base de données
    console.log('💾 Connexion à la base de données...');
    await connectDB();
    
    const imageData = {
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      format: cloudinaryResult.format,
      bytes: cloudinaryResult.bytes,
      projectId: projectId,
      alt: `Image pour le projet ${projectId}`, // On utilisera le titre après le populate
      description: ''
    };

    console.log('📝 Données de l\'image à sauvegarder:', imageData);
    console.log('🔗 Project ID utilisé:', projectId);

    const savedImage = await new Image(imageData).save();
    console.log('✅ Image sauvegardée avec ID:', savedImage._id);
    
    console.log('🔍 Populate du projet associé...');
    await savedImage.populate('projectId', 'title');
    console.log('📋 Image avec projet populate:', savedImage);
    
    // Mettre à jour l'alt avec le titre du projet
    if (savedImage.projectId && typeof savedImage.projectId === 'object' && 'title' in savedImage.projectId) {
      savedImage.alt = `Image pour le projet "${savedImage.projectId.title}"`;
      await savedImage.save();
      console.log('🏷️ Alt mis à jour avec le titre:', savedImage.alt);
    }

    return NextResponse.json({
      success: true,
      msg: "Image uploadée et sauvegardée avec succès",
      data: savedImage,
      statusCode: 200,
    });

  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      msg: "Erreur lors de l'upload",
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      statusCode: 500,
    });
  }
}