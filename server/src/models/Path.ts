import mongoose, { Schema, Document } from 'mongoose';
import { ILearningPath } from '../types';

export interface IPathDocument extends Omit<ILearningPath, '_id'>, Document {}

const PathSchema = new Schema<IPathDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    icon: { type: String, default: 'Compass' },
    color: { type: String, default: 'blue' },
    isPrimary: { type: Boolean, default: false },
    status: { type: String, enum: ['available', 'coming-soon'], default: 'available' },
    estimatedHours: { type: Number, default: 30 },
  },
  {
    timestamps: true,
  }
);

export const PathModel = mongoose.model<IPathDocument>('Path', PathSchema);
