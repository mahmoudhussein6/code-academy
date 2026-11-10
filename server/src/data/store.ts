import { ILearningPath, ICourse, ILesson, IUser, IUserProgress } from '../types';
import { pathsData, coursesData } from './curriculumData';
import { lessonsData } from './lessonsContent';
import { isDbConnected } from '../config/database';
import { PathModel } from '../models/Path';
import { CourseModel } from '../models/Course';
import { LessonModel } from '../models/Lesson';
import { UserModel } from '../models/User';
import { ProgressModel } from '../models/Progress';

// In-memory memory structures for zero-config fallback
let memUsers: IUser[] = [
  {
    _id: 'user_default',
    name: 'طالب الأكاديمية',
    email: 'student@example.com',
    passwordHash: '$2a$10$wZk0c.q7mRjF5tKzVvP68.wE1tK1R3T1JgS5aC8q4xM8B7dF1lE7G', // 123456
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=student',
    createdAt: new Date(),
  },
];

let memProgress: IUserProgress[] = [
  {
    userId: 'user_default',
    lessonSlug: 'what-is-html-and-web-basics',
    courseSlug: 'html-fundamentals',
    pathSlug: 'frontend-development',
    completed: true,
    completedAt: new Date(),
    quizCompleted: true,
  },
];

export const initSeedData = async () => {
  if (isDbConnected()) {
    try {
      const pathsCount = await PathModel.countDocuments();
      if (pathsCount === 0) {
        console.log('🌱 Seeding MongoDB with initial Arabic curriculum...');
        await PathModel.insertMany(pathsData);
        await CourseModel.insertMany(coursesData);
        await LessonModel.insertMany(lessonsData);
        console.log('✅ MongoDB Seed completed successfully!');
        return;
      }

      const updatedCourses = coursesData.filter((course) =>
        ['html-fundamentals', 'css-fundamentals'].includes(course.slug)
      );
      if (updatedCourses.length !== 2) {
        throw new Error('HTML and CSS course data is required for curriculum synchronization');
      }

      for (const course of updatedCourses) {
        await CourseModel.updateOne({ slug: course.slug }, { $set: course }, { upsert: true });
      }

      await LessonModel.bulkWrite(
        lessonsData
          .filter((lesson) => updatedCourses.some((course) => course.slug === lesson.courseSlug))
          .map((lesson) => ({
            updateOne: {
              filter: { slug: lesson.slug },
              update: { $set: lesson },
              upsert: true,
            },
          }))
      );
    } catch (err) {
      console.error('Error seeding MongoDB:', err);
    }
  }
};

export const getStore = {
  // Paths
  async getPaths(): Promise<ILearningPath[]> {
    if (isDbConnected()) {
      return await PathModel.find().lean();
    }
    return pathsData;
  },

  async getPathBySlug(slug: string): Promise<ILearningPath | null> {
    if (isDbConnected()) {
      const path = await PathModel.findOne({ slug }).lean();
      if (!path) return null;
      const courses = await CourseModel.find({ pathSlug: slug }).sort({ order: 1 }).lean();
      return { ...path, courses };
    }
    const path = pathsData.find((p) => p.slug === slug);
    if (!path) return null;
    const courses = coursesData.filter((c) => c.pathSlug === slug).sort((a, b) => a.order - b.order);
    return { ...path, courses };
  },

  // Courses
  async getAllCourses(): Promise<ICourse[]> {
    if (isDbConnected()) {
      return await CourseModel.find().sort({ order: 1 }).lean();
    }
    return coursesData.slice().sort((a, b) => a.order - b.order);
  },

  async getCoursesByPath(pathSlug: string): Promise<ICourse[]> {
    if (isDbConnected()) {
      return await CourseModel.find({ pathSlug }).sort({ order: 1 }).lean();
    }
    return coursesData.filter((c) => c.pathSlug === pathSlug).sort((a, b) => a.order - b.order);
  },

  async getCourseBySlug(slug: string): Promise<ICourse | null> {
    if (isDbConnected()) {
      return await CourseModel.findOne({ slug }).lean();
    }
    return coursesData.find((c) => c.slug === slug) || null;
  },

  // Lessons
  async getAllLessons(): Promise<ILesson[]> {
    if (isDbConnected()) {
      return await LessonModel.find().sort({ order: 1 }).lean();
    }
    return lessonsData.slice().sort((a, b) => a.order - b.order);
  },

  async getLessonBySlug(slug: string): Promise<ILesson | null> {
    if (isDbConnected()) {
      return await LessonModel.findOne({ slug }).lean();
    }
    return lessonsData.find((l) => l.slug === slug) || null;
  },

  async getLessonsByCourse(courseSlug: string): Promise<ILesson[]> {
    if (isDbConnected()) {
      return await LessonModel.find({ courseSlug }).sort({ order: 1 }).lean();
    }
    return lessonsData.filter((l) => l.courseSlug === courseSlug).sort((a, b) => a.order - b.order);
  },

  // Users
  async findUserByEmail(email: string): Promise<IUser | null> {
    if (isDbConnected()) {
      return await UserModel.findOne({ email }).lean();
    }
    return memUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserById(id: string): Promise<IUser | null> {
    if (isDbConnected()) {
      return await UserModel.findById(id).lean();
    }
    return memUsers.find((u) => u._id === id) || null;
  },

  async createUser(user: IUser): Promise<IUser> {
    if (isDbConnected()) {
      const created = await UserModel.create(user);
      return created.toObject();
    }
    const newUser = { ...user, _id: `user_${Date.now()}` };
    memUsers.push(newUser);
    return newUser;
  },

  // Progress
  async getUserProgress(userId: string): Promise<IUserProgress[]> {
    if (isDbConnected()) {
      return await ProgressModel.find({ userId }).lean();
    }
    return memProgress.filter((p) => p.userId === userId);
  },

  async markLessonComplete(
    userId: string,
    lessonSlug: string,
    courseSlug: string,
    pathSlug: string,
    quizCompleted: boolean = false
  ): Promise<IUserProgress> {
    if (isDbConnected()) {
      const progress = await ProgressModel.findOneAndUpdate(
        { userId, lessonSlug },
        {
          userId,
          lessonSlug,
          courseSlug,
          pathSlug,
          completed: true,
          completedAt: new Date(),
          quizCompleted,
        },
        { upsert: true, new: true }
      ).lean();
      return progress;
    }

    const existingIndex = memProgress.findIndex((p) => p.userId === userId && p.lessonSlug === lessonSlug);
    const item: IUserProgress = {
      userId,
      lessonSlug,
      courseSlug,
      pathSlug,
      completed: true,
      completedAt: new Date(),
      quizCompleted,
    };

    if (existingIndex >= 0) {
      memProgress[existingIndex] = item;
    } else {
      memProgress.push(item);
    }
    return item;
  },
};
