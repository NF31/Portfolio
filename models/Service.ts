import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  shortDescription: string;
  icon: string; // Nom de l'icône Lucide React
  features: string[]; // Liste des fonctionnalités/points clés
  price?: {
    type: 'fixed' | 'hourly' | 'project';
    amount?: number;
    currency?: string;
  };
  category: string; // web, mobile, design, consulting, etc.
  technologies: string[]; // Technologies utilisées
  deliveryTime?: string; // "2-4 semaines", "1 semaine", etc.
  isActive: boolean;
  isFeatured: boolean;
  order: number; // Pour l'ordre d'affichage
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
    maxlength: [100, 'Le titre doit contenir au maximum 100 caractères'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    minlength: [20, 'La description doit contenir au moins 20 caractères'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'La description courte est requise'],
    minlength: [10, 'La description courte doit contenir au moins 10 caractères'],
    maxlength: [200, 'La description courte doit contenir au maximum 200 caractères'],
    trim: true
  },
  icon: {
    type: String,
    required: [true, 'L\'icône est requise'],
    trim: true
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  price: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'project'],
      default: 'project'
    },
    amount: {
      type: Number,
      min: [0, 'Le prix ne peut pas être négatif']
    },
    currency: {
      type: String,
      default: 'EUR'
    }
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['web', 'mobile', 'design', 'consulting', 'maintenance', 'other'],
    default: 'web'
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  deliveryTime: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
    // ref: 'User' // TODO: Décommenter quand le modèle User sera créé
  }
}, {
  timestamps: true
});

ServiceSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ isActive: 1 });
ServiceSchema.index({ isFeatured: 1 });
ServiceSchema.index({ order: 1 });
ServiceSchema.index({ createdBy: 1 });
ServiceSchema.index({ createdAt: -1 });

// Supprimer le modèle du cache pour forcer la recompilation
if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);

export default ServiceModel;
