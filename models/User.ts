import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'superadmin';
  avatar?: string;
  bio?: string;
  location?: string;
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Veuillez entrer un email valide'
    ]
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'La biographie ne peut pas dépasser 500 caractères'],
    default: null
  },
  location: {
    type: String,
    maxlength: [100, 'La localisation ne peut pas dépasser 100 caractères'],
    default: null
  },
  social_links: {
    linkedin: {
      type: String,
      default: null
    },
    github: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    website: {
      type: String,
      default: null
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  experience: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères'],
      default: null
    }
  }],
  education: [{
    degree: {
      type: String,
      required: true,
      trim: true
    },
    school: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères'],
      default: null
    }
  }]
}, {
  timestamps: true,
  collection: 'users'
});

// Index pour optimiser les recherches (email est déjà unique, pas besoin de le redéfinir)
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
