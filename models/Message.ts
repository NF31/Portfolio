import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  budget?: string;
  status: 'unread' | 'read' | 'processed';
  ip?: string;
  emailSent: boolean;
  emailSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Format d'email invalide"],
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone est requis'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Le message est requis'],
      minlength: [20, 'Le message doit contenir au moins 20 caractères'],
      maxlength: [1000, 'Le message ne peut pas dépasser 1000 caractères'],
    },
    subject: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'processed'],
      default: 'unread',
    },
    ip: {
      type: String,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// Index pour optimiser les requêtes
MessageSchema.index({ status: 1, createdAt: -1 });
MessageSchema.index({ email: 1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

