import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from '../types';

export interface ICourseDocument extends Omit<ICourse, '_id'>, Document {}

const ModuleSchema = new Schema({
  slug: { type: String, required: true },
  courseSlug: { type: String, required: true },
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  lessons: [
    {
      slug: { type: String, required: true },
      title: { type: String, required: true },
      order: { type: Number, required: true },
      readTimeMinutes: { type: Number, default: 5 },
      summary: { type: String, default: '' },
    },
  ],
});

const CourseSchema = new Schema<ICourseDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    pathSlug: { type: String, required: true, index: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    description: { type: String, required: true },
    topics: [{ type: String }],
    icon: { type: String, default: 'Code' },
    color: { type: String, default: 'blue' },
    level: { type: String, default: 'مبتدئ' },
    estimatedHours: { type: Number, default: 5 },
    modules: [ModuleSchema],
    status: { type: String, enum: ['available', 'coming-soon'], default: 'available' },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = mongoose.model<ICourseDocument>('Course', CourseSchema);
