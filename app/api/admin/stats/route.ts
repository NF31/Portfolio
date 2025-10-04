import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Skill from '@/models/Skill';
import Image from '@/models/Image';
// TODO: Importer le modèle Message quand il sera créé
// import Message from '@/models/Message';

export async function GET() {
  try {
    await connectDB();

    // Récupérer les statistiques des projets
    const totalProjects = await Project.countDocuments();
    const publishedProjects = await Project.countDocuments({ isArchived: { $ne: true } });
    const archivedProjects = await Project.countDocuments({ isArchived: true });

    // Statistiques par type de projet
    const projectsByType = await Project.aggregate([
      {
        $group: {
          _id: '$types',
          count: { $sum: 1 }
        }
      }
    ]);

    // Projets récents (derniers 7 jours)
    const recentProjects = await Project.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    });

    // Récupérer les statistiques des services
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });
    const featuredServices = await Service.countDocuments({ isFeatured: true });

    // Récupérer les statistiques des compétences
    const totalSkills = await Skill.countDocuments();
    const activeSkills = await Skill.countDocuments({ isActive: true });

    // Récupérer les statistiques des images
    const totalImages = await Image.countDocuments();
    const recentImages = await Image.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    });

    // TODO: Récupérer les vraies statistiques quand le modèle Message sera créé
    const totalMessages = 0; // await Message.countDocuments();
    const unreadMessages = 0; // await Message.countDocuments({ isRead: false });
    const totalBlogPosts = 0; // await BlogPost.countDocuments();

    const stats = {
      projects: {
        total: totalProjects,
        published: publishedProjects,
        archived: archivedProjects,
        recent: recentProjects,
        byType: projectsByType
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages
      },
      services: {
        total: totalServices,
        active: activeServices,
        featured: featuredServices
      },
      skills: {
        total: totalSkills,
        active: activeSkills
      },
      blog: {
        total: totalBlogPosts
      },
      images: {
        total: totalImages,
        recent: recentImages
      }
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error: any) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la récupération des statistiques',
        stats: {
          projects: { total: 0, published: 0, archived: 0, recent: 0, byType: [] },
          messages: { total: 0, unread: 0 },
          services: { total: 0, active: 0, featured: 0 },
          skills: { total: 0, active: 0 },
          blog: { total: 0 },
          images: { total: 0, recent: 0 }
        }
      },
      { status: 500 }
    );
  }
}
