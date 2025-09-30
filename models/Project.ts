import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  images: string[]; // URLs des images
  technologies: string[];
  link?: string;
  types: string | string[]; // Types (peut être un string ou un array)
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
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
    minlength: [10, 'La description doit contenir au moins 10 caractères'],
    trim: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        // Validation d'URL
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: 'Chaque image doit être une URL valide'
    }
  }],
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  link: {
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Optionnel
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      message: 'Le lien doit être une URL valide'
    },
    trim: true
  },
  types: {
    type: Schema.Types.Mixed,
    required: [true, 'Le type de projet est requis'],
    validate: {
      validator: function(v: any) {
        // Peut être un string ou un array de strings
        const validTypes = ['web', 'mobile', 'fullstack', 'data', 'design', 'autre'];
        if (typeof v === 'string') {
          return validTypes.includes(v);
        }
        if (Array.isArray(v)) {
          return v.length > 0 && v.every(type => 
            typeof type === 'string' && 
            validTypes.includes(type)
          );
        }
        return false;
      },
      message: 'Le type doit être un string ou un array de strings valides: web, mobile, fullstack, data, design, ou autre'
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
    // ref: 'User' // TODO: Décommenter quand le modèle User sera créé
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Index pour améliorer les performances
ProjectSchema.index({ title: 'text', description: 'text' });
ProjectSchema.index({ type: 1 });
ProjectSchema.index({ createdBy: 1 });
ProjectSchema.index({ createdAt: -1 });

// S'assurer que le modèle utilise la bonne base de données
// Supprimer le modèle du cache pour forcer la recompilation
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);

// Forcer l'utilisation de la base de données portfolio_db
if (mongoose.connection.db && mongoose.connection.db.databaseName !== 'portfolio_db') {
  console.log('⚠️ Attention: Connexion à la base de données:', mongoose.connection.db.databaseName);
  console.log('📍 Base de données attendue: portfolio_db');
}

export default ProjectModel;
