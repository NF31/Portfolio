import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { requireAdmin } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');

    // Construire le filtre
    const filter: Record<string, unknown> = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (isActive !== null && isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculer le skip pour la pagination
    const skip = (page - 1) * limit;

    // Récupérer les services avec pagination
    const services = await Service.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Compter le total pour la pagination
    const total = await Service.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: services,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();

    const body = await request.json();
    
    // Créer un nouvel objet Service
    const newService = new Service(body);
    
    // Sauvegarder dans la base de données
    const savedService = await newService.save();

    return NextResponse.json({
      success: true,
      data: savedService,
      message: 'Service créé avec succès'
    }, { status: 201 });

  } catch (error) {
    // Gérer les erreurs de validation Mongoose
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const mongooseError = error as { errors: Record<string, { message: string }> };
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
      { success: false, error: 'Erreur lors de la création du service' },
      { status: 500 }
    );
  }
}
