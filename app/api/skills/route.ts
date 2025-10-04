import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || 'all';
    const level = searchParams.get('level') || 'all';
    const search = searchParams.get('search') || '';

    // Construction du filtre
    const filter: any = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (level && level !== 'all') {
      filter.level = level;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Récupération des compétences avec pagination
    const skills = await Skill.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Skill.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: skills,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération des compétences:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des compétences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, icon, category, level, isActive, order } = body;

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

    // Création de la compétence
    const skill = await Skill.create({
      name: name.trim(),
      description: description.trim(),
      icon: icon.trim(),
      category: category || 'other',
      level: level || 'intermediate',
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    });

    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Compétence créée avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la création de la compétence:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la compétence' },
      { status: 500 }
    );
  }
}
