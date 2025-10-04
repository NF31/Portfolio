import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const skillId = params.id;
    const skill = await Skill.findById(skillId);

    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Compétence non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: skill
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération de la compétence:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la compétence' },
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

    const skillId = params.id;
    const body = await request.json();
    const { name, description, icon, iconType, category, level, isActive, order } = body;

    console.log('📝 Mise à jour de la compétence:', skillId);
    console.log('📋 Données reçues:', { name, description, icon, iconType, category, level, isActive, order });

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Le nom de la compétence est requis' },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'La description est requise' },
        { status: 400 }
      );
    }

    if (!icon?.trim()) {
      return NextResponse.json(
        { success: false, error: 'L\'icône est requise' },
        { status: 400 }
      );
    }

    // Récupérer la compétence existante
    const existingSkill = await Skill.findById(skillId);
    if (!existingSkill) {
      return NextResponse.json(
        { success: false, error: 'Compétence non trouvée' },
        { status: 404 }
      );
    }

    // Mettre à jour la compétence
    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      {
        name: name.trim(),
        description: description.trim(),
        icon: icon.trim(),
        iconType: iconType || 'lucide',
        category: category || 'other',
        level: level || 'intermediate',
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0
      },
      { new: true, runValidators: true }
    );

    if (!updatedSkill) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    console.log('✅ Compétence mise à jour avec succès:', updatedSkill._id);

    return NextResponse.json({
      success: true,
      data: updatedSkill,
      message: 'Compétence mise à jour avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la mise à jour de la compétence:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour de la compétence' },
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

    const skillId = params.id;
    console.log('🗑️ Suppression de la compétence:', skillId);

    // Récupérer la compétence depuis la base de données
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Compétence non trouvée' },
        { status: 404 }
      );
    }

    console.log('💼 Compétence trouvée:', skill);

    // Supprimer la compétence de la base de données
    await Skill.findByIdAndDelete(skillId);
    console.log('💾 Compétence supprimée de la base de données');

    return NextResponse.json({
      success: true,
      message: 'Compétence supprimée avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la suppression de la compétence:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de la compétence' },
      { status: 500 }
    );
  }
}