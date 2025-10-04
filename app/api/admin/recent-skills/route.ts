import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function GET() {
  try {
    await connectDB();

    // Récupérer les 6 dernières compétences créées
    const recentSkills = await Skill.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('name category level icon iconType createdAt');

    return NextResponse.json({
      success: true,
      skills: recentSkills
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération des dernières compétences:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la récupération des dernières compétences',
        skills: []
      },
      { status: 500 }
    );
  }
}
