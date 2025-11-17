import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}, 'category').lean();
    const allCategories = new Set<string>();
    
    services.forEach(service => {
      if (service.category) {
        allCategories.add(service.category);
      }
    });
    
    const uniqueCategories = Array.from(allCategories).sort();
    
    return NextResponse.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
