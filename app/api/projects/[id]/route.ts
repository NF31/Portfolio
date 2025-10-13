import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Project from '../../../../models/Project';
import mongoose from 'mongoose';

// GET /api/projects/[id] - Récupérer un projet spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔗 Connexion à MongoDB pour récupérer le projet...');
    await connectDB();
    console.log('✅ Connexion MongoDB réussie !');
    
    const { id } = params;
    
    // Vérifier que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de projet invalide' },
        { status: 400 }
      );
    }

    console.log('🔍 Recherche du projet avec ID:', id);
    const project = await Project.findById(id).lean();

    if (!project) {
      console.log('❌ Projet non trouvé');
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    console.log('✅ Projet trouvé:', project.title);

    return NextResponse.json({ 
      project: {
        id: project._id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        types: project.types || 'web', // Types (string ou array)
        link: project.link,
        images: project.images,
        createdBy: project.createdBy,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        isArchived: project.isArchived || false
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Modifier un projet
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔗 Connexion à MongoDB pour modifier le projet...');
    await connectDB();
    console.log('✅ Connexion MongoDB réussie !');
    
    const { id } = params;
    
    // Vérifier que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de projet invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('📥 Données reçues pour modification:', body);
    
    // Validation des données requises
    const { title, description, technologies, types, link, isArchived } = body;
    
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

    // Vérifier que le projet existe
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {
      title: title.trim(),
      description: description.trim(),
      technologies,
      link: link?.trim() || undefined,
      isArchived: isArchived || false
    };

    // Gérer les types
    if (types) {
      updateData.types = types; // Types (string ou array)
    }

    console.log('📝 Mise à jour du document Project...');
    console.log('📊 Données de mise à jour:', updateData);
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Retourner le document mis à jour
        runValidators: true // Exécuter les validateurs Mongoose
      }
    );

    console.log('✅ Projet modifié avec succès !');
    console.log('📊 Projet mis à jour:', updatedProject);

    return NextResponse.json(
      { 
        message: 'Projet modifié avec succès',
        project: {
          id: updatedProject._id,
          title: updatedProject.title,
          description: updatedProject.description,
          technologies: updatedProject.technologies,
          types: updatedProject.types,
          link: updatedProject.link,
          images: updatedProject.images,
          createdBy: updatedProject.createdBy,
          createdAt: updatedProject.createdAt,
          updatedAt: updatedProject.updatedAt,
          isArchived: updatedProject.isArchived
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Erreur lors de la modification du projet:', error);
    
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

// DELETE /api/projects/[id] - Supprimer un projet
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔗 Connexion à MongoDB pour supprimer le projet...');
    await connectDB();
    console.log('✅ Connexion MongoDB réussie !');
    
    const { id } = params;
    
    // Vérifier que l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID de projet invalide' },
        { status: 400 }
      );
    }

    // Vérifier que le projet existe
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le projet
    console.log('🗑️ Suppression du projet:', existingProject.title);
    await Project.findByIdAndDelete(id);

    console.log('✅ Projet supprimé avec succès !');

    return NextResponse.json(
      { message: 'Projet supprimé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
