import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Service from '@/models/Service';
import Skill from '@/models/Skill';
import Image from '@/models/Image';
import Message from '@/models/Message';

interface RecentActivity {
  id: string;
  type: 'project' | 'service' | 'skill' | 'image' | 'message';
  action: string;
  item: string;
  timestamp: Date;
  icon: string;
  color: string;
  details?: Record<string, unknown>;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const activities: RecentActivity[] = [];

    // Récupérer les projets récents
    const recentProjects = await Project.find({}, 'title createdAt updatedAt isPublished')
      .sort({ updatedAt: -1 })
      .lean();

    recentProjects.forEach(project => {
      // Projet créé
      activities.push({
        id: `project-created-${project._id}`,
        type: 'project',
        action: 'Projet créé',
        item: project.title,
        timestamp: project.createdAt,
        icon: 'Briefcase',
        color: 'text-blue-600',
        details: { projectId: project._id, isArchived: project.isArchived || false }
      });

      // Projet modifié (si différent de la création)
      if (project.updatedAt && project.updatedAt.getTime() !== project.createdAt.getTime()) {
        activities.push({
          id: `project-updated-${project._id}`,
          type: 'project',
          action: project.isArchived ? 'Projet archivé' : 'Projet modifié',
          item: project.title,
          timestamp: project.updatedAt,
          icon: 'Briefcase',
          color: 'text-blue-600',
          details: { projectId: project._id, isArchived: project.isArchived || false }
        });
      }
    });

    // Récupérer les services récents
    const recentServices = await Service.find({}, 'title createdAt updatedAt isActive')
      .sort({ updatedAt: -1 })
      .lean();

    recentServices.forEach(service => {
      // Service créé
      activities.push({
        id: `service-created-${service._id}`,
        type: 'service',
        action: 'Service créé',
        item: service.title,
        timestamp: service.createdAt,
        icon: 'Settings',
        color: 'text-orange-600',
        details: { serviceId: service._id, isActive: service.isActive }
      });

      // Service modifié
      if (service.updatedAt && service.updatedAt.getTime() !== service.createdAt.getTime()) {
        activities.push({
          id: `service-updated-${service._id}`,
          type: 'service',
          action: 'Service modifié',
          item: service.title,
          timestamp: service.updatedAt,
          icon: 'Settings',
          color: 'text-orange-600',
          details: { serviceId: service._id, isActive: service.isActive }
        });
      }
    });

    // Récupérer les compétences récentes
    const recentSkills = await Skill.find({}, 'name createdAt updatedAt isActive')
      .sort({ updatedAt: -1 })
      .lean();

    recentSkills.forEach(skill => {
      // Compétence créée
      activities.push({
        id: `skill-created-${skill._id}`,
        type: 'skill',
        action: 'Compétence ajoutée',
        item: skill.name,
        timestamp: skill.createdAt,
        icon: 'Target',
        color: 'text-purple-600',
        details: { skillId: skill._id, isActive: skill.isActive }
      });

      // Compétence modifiée
      if (skill.updatedAt && skill.updatedAt.getTime() !== skill.createdAt.getTime()) {
        activities.push({
          id: `skill-updated-${skill._id}`,
          type: 'skill',
          action: 'Compétence modifiée',
          item: skill.name,
          timestamp: skill.updatedAt,
          icon: 'Target',
          color: 'text-purple-600',
          details: { skillId: skill._id, isActive: skill.isActive }
        });
      }
    });

    // Récupérer les images récentes
    const recentImages = await Image.find({}, 'alt createdAt projectId')
      .populate('projectId', 'title')
      .sort({ createdAt: -1 })
      .lean();

    recentImages.forEach(image => {
      activities.push({
        id: `image-created-${image._id}`,
        type: 'image',
        action: 'Image uploadée',
        item: image.alt || 'Nouvelle image',
        timestamp: image.createdAt,
        icon: 'Image',
        color: 'text-green-600',
        details: { 
          imageId: image._id, 
          projectTitle: image.projectId?.title || 'Projet inconnu',
          projectId: image.projectId?._id 
        }
      });
    });

    // Récupérer les messages récents
    const recentMessages = await Message.find({}, 'name email subject createdAt isRead')
      .sort({ createdAt: -1 })
      .lean();

    recentMessages.forEach(message => {
      activities.push({
        id: `message-received-${message._id}`,
        type: 'message',
        action: 'Message reçu',
        item: message.subject || `Message de ${message.name}`,
        timestamp: message.createdAt,
        icon: 'MessageSquare',
        color: 'text-orange-600',
        details: { 
          messageId: message._id, 
          from: message.name,
          email: message.email,
          isRead: message.isRead 
        }
      });
    });

    // Trier toutes les activités par timestamp (plus récent en premier)
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Calculer la pagination
    const total = activities.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedActivities = activities.slice(offset, offset + limit);

    return NextResponse.json({ 
      activities: paginatedActivities,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des activités récentes:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
