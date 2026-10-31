import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import Image from '../../../models/Image';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/session';

// POST /api/projects - Créer un nouveau projet
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validation des données requises
    const { title, description, technologies, types, link } = body;
    
    if (!title || !description || !technologies || !types) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    if (technologies.length === 0) {
      return NextResponse.json(
        { error: 'Au moins une technologie est requise' },
        { status: 400 }
      );
    }

    if (types.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un type de projet est requis' },
        { status: 400 }
      );
    }

    // TODO: Récupérer l'ID utilisateur depuis la session
    // Pour l'instant, on utilise un ObjectId temporaire
    const tempUserId = new mongoose.Types.ObjectId();

    // Création du projet en base
    const projectData: {
      title: string;
      description: string;
      technologies: string[];
      types: string | string[];
      link?: string;
      createdBy: mongoose.Types.ObjectId;
      images: string[];
    } = {
      title,
      description,
      technologies,
      types: (types && types.length > 0) ? types : 'web', // Types multiples ou par défaut
      link: link || undefined,
      createdBy: tempUserId,
      images: [] // Les images seront ajoutées séparément
    };
    
    const project = new Project(projectData);
    const savedProject = await project.save();

    return NextResponse.json(
      { 
        message: 'Projet créé avec succès',
        project: {
          id: savedProject._id,
          title: savedProject.title,
          description: savedProject.description,
          technologies: savedProject.technologies,
          types: savedProject.types,
          link: savedProject.link,
          createdAt: savedProject.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    // Gestion des erreurs de validation Mongoose
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const mongooseError = error as { errors: Record<string, { message: string }> };
      const errors = Object.values(mongooseError.errors).map((err) => err.message);
      return NextResponse.json(
        { error: 'Erreur de validation', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// GET /api/projects - Récupérer tous les projets avec leurs images
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    
    // Construire le filtre pour exclure les projets archivés
    // Utiliser $or pour gérer les cas où isArchived n'existe pas
    const filter: Record<string, unknown> = {
      $or: [
        { isArchived: { $ne: true } },
        { isArchived: { $exists: false } }
      ]
    };
    
    // Récupérer les projets (non archivés par défaut)
    let query = Project.find(filter)
      .sort({ createdAt: -1 });
    
    if (limitNum && limitNum > 0) {
      query = query.limit(limitNum);
    }
    
    const projects = await query.lean();
    
    // Récupérer les images pour chaque projet
    const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
        try {
          const images = await Image.find({ projectId: project._id })
            .select('url alt')
            .lean();
          
          return {
            _id: project._id,
            id: project._id,
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            types: project.types || 'web',
            isArchived: project.isArchived || false,
            link: project.link,
            images: images.map(img => img.url), // Array d'URLs
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
          };
        } catch {
          // Si erreur lors de la récupération des images, retourner le projet sans images
          return {
            _id: project._id,
            id: project._id,
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            types: project.types || 'web',
            isArchived: project.isArchived || false,
            link: project.link,
            images: [],
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
          };
        }
      })
    );

    return NextResponse.json({ 
      success: true,
      data: projectsWithImages,
      projects: projectsWithImages // Pour compatibilité
    });

  } catch {
    // En production, ne pas exposer les détails de l'erreur
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
