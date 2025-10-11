import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import Image from '../../../models/Image';
import mongoose from 'mongoose';

// POST /api/projects - Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await connectDB();
    console.log('✅ Connexion MongoDB réussie !');
    
    const body = await request.json();
    console.log('📥 Données reçues:', body);
    
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
    console.log('👤 ID utilisateur temporaire:', tempUserId);

    // Création du projet en base
    console.log('📝 Création du document Project...');
    const projectData: any = {
      title,
      description,
      technologies,
      link: link || undefined,
      createdBy: tempUserId,
      images: [] // Les images seront ajoutées séparément
    };

    // Gérer les types
    if (types && types.length > 0) {
      projectData.types = types; // Types multiples
    } else {
      projectData.types = 'web'; // Type par défaut
    }

    console.log('📊 Données du projet:', projectData);
    
    const project = new Project(projectData);

    console.log('💾 Sauvegarde dans MongoDB...');
    console.log('📍 Base de données actuelle:', mongoose.connection.db.databaseName);
    console.log('🎯 Base de données attendue: portfolio_db');
    
    const savedProject = await project.save();
    console.log('✅ Projet sauvegardé avec succès !');
    console.log('📊 Base de données finale:', mongoose.connection.db.databaseName);
    console.log('📋 Collection:', 'projects');
    console.log('🆔 ID du projet:', savedProject._id);
    console.log('📄 Document complet:', savedProject);
    
    // Vérification de la sauvegarde
    const verification = await Project.findById(savedProject._id);
    console.log('🔍 Vérification - Projet trouvé:', verification ? 'OUI' : 'NON');

    return NextResponse.json(
      { 
        message: 'Projet créé avec succès',
        project: {
          id: savedProject._id,
          title: savedProject.title,
          description: savedProject.description,
          technologies: savedProject.technologies,
          type: savedProject.type,
          link: savedProject.link,
          createdAt: savedProject.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Erreur lors de la création du projet:', error);
    
    // Gestion des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
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
export async function GET() {
  try {
    console.log('🔗 Connexion à MongoDB pour récupérer les projets...');
    await connectDB();
    console.log('✅ Connexion MongoDB réussie !');
    console.log('📊 Base de données:', mongoose.connection.db.databaseName);
    
    console.log('🔍 Recherche des projets dans la collection "projects"...');
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`📋 ${projects.length} projet(s) trouvé(s)`);
    
    // Récupérer les images pour chaque projet
    const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
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
          link: project.link,
          images: images.map(img => img.url), // Array d'URLs
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        };
      })
    );
    
    console.log('🖼️ Projets avec images:', projectsWithImages);

    return NextResponse.json({ 
      success: true,
      data: projectsWithImages,
      projects: projectsWithImages // Pour compatibilité
    });

  } catch (error) {
    console.error('❌ Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
