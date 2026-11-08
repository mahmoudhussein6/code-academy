import mongoose, { Schema, Document } from 'mongoose';
import { IUserProgress } from '../types';

export interface IProgressDocument extends IUserProgress, Document {}

const ProgressSchema = new Schema<IProgressDocument>(
  {
    userId: { type: String, required: true, index: true },
    lessonSlug: { type: String, required: true, index: true },
    courseSlug: { type: String, required: true, index: true },
    pathSlug: { type: String, required: true, index: true },
    completed: { type: Boolean, default: true },
    completedAt: { type: Date, default: Date.now },
    quizCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Compound unique index so user progress on lesson is unique
ProgressSchema.index({ userId: 1, lessonSlug: 1 }, { unique: true });

export const ProgressModel = mongoose.model<IProgressDocument>('Progress', ProgressSchema);

