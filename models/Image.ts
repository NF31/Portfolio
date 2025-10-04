import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  url: string;
  alt?: string;
  projectId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);