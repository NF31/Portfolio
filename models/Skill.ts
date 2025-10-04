import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  description: string;
  icon: string;
  iconType: 'lucide' | 'simple-icons' | 'custom-svg' | 'url';
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la compétence est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  icon: {
    type: String,
    required: [true, 'L\'icône est requise'],
    trim: true
  },
  iconType: {
    type: String,
    enum: ['lucide', 'simple-icons', 'custom-svg', 'url'],
    default: 'lucide'
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: {
      values: ['frontend', 'backend', 'database', 'tools', 'design', 'other'],
      message: 'La catégorie doit être: frontend, backend, database, tools, design ou other'
    }
  },
  level: {
    type: String,
    required: [true, 'Le niveau est requis'],
    enum: {
      values: ['beginner', 'intermediate', 'advanced', 'expert'],
      message: 'Le niveau doit être: beginner, intermediate, advanced ou expert'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
SkillSchema.index({ category: 1, level: 1 });
SkillSchema.index({ isActive: 1 });
SkillSchema.index({ order: 1 });

// Supprimer le modèle en cache s'il existe pour forcer la mise à jour
if (mongoose.models.Skill) {
  delete mongoose.models.Skill;
}

export default mongoose.model<ISkill>('Skill', SkillSchema);
