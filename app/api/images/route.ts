import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';
import { requireAdmin } from '@/lib/session';

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const projectId = searchParams.get('projectId');
    const dateFilter = searchParams.get('date');
    const formatFilter = searchParams.get('format');

    // Construction du filtre
    const filter: Record<string, unknown> = {};
    
    if (search) {
      filter.$or = [
        { alt: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (projectId && projectId !== 'all') {
      if (projectId === 'no-project') {
        filter.projectId = null;
      } else {
        filter.projectId = projectId;
      }
    }

    // Filtre par date
    if (dateFilter && dateFilter !== 'all') {
      const now = new Date();
      let startDate: Date;

      switch (dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0);
      }

      filter.createdAt = { $gte: startDate };
    }

    // Filtre par format
    if (formatFilter && formatFilter !== 'all') {
      filter.format = { $regex: formatFilter, $options: 'i' };
    }

    const images = await Image.find(filter)
      .populate('projectId', 'title')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Image.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: images,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des images' },
      { status: 500 }
    );
  }
}
