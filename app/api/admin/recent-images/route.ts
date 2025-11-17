import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function GET() {
  try {
    await connectDB();

    // Récupérer les 6 dernières images uploadées avec les infos du projet
    const recentImages = await Image.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('projectId', 'title')
      .select('url alt projectId createdAt');

    return NextResponse.json({
      success: true,
      images: recentImages
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des images récentes:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la récupération des images récentes',
        images: []
      },
      { status: 500 }
    );
  }
}
