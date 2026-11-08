import mongoose, { Schema, Document } from 'mongoose';
import { ILesson } from '../types';

export interface ILessonDocument extends Omit<ILesson, '_id'>, Document {}

const LessonSchema = new Schema<ILessonDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    courseSlug: { type: String, required: true, index: true },
    moduleSlug: { type: String, required: true, index: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    readTimeMinutes: { type: Number, default: 5 },
    contentMarkdown: { type: String, required: true },
    interactiveExercise: {
      instructions: { type: String },
      initialHtml: { type: String },
      initialCss: { type: String },
      initialJs: { type: String },
      solution: { type: String },
    },
    quiz: {
      question: { type: String },
      options: [{ type: String }],
      correctIndex: { type: Number },
      explanation: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const LessonModel = mongoose.model<ILessonDocument>('Lesson', LessonSchema);
