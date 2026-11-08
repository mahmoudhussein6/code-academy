import axios from 'axios';
import { ILearningPath, ICourse, ILesson, IProgressSummary, IUser } from '../types';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('code_academy_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Paths
  async getPaths(): Promise<ILearningPath[]> {
    const { data } = await api.get<ILearningPath[]>('/paths');
    return data;
  },

  async getPath(slug: string): Promise<ILearningPath> {
    const { data } = await api.get<ILearningPath>(`/paths/${slug}`);
    return data;
  },

  // Courses
  async getCourse(slug: string): Promise<ICourse> {
    const { data } = await api.get<ICourse>(`/courses/${slug}`);
    return data;
  },

  // Lessons
  async getLesson(slug: string): Promise<{
    lesson: ILesson;
    isCompleted: boolean;
    course: {
      slug: string;
      title: string;
      pathSlug: string;
      modules: ICourse['modules'];
    } | null;
    navigation: {
      previousLesson: { slug: string; title: string; courseSlug: string } | null;
      nextLesson: { slug: string; title: string; courseSlug: string } | null;
    };
  }> {
    const { data } = await api.get(`/lessons/${slug}`);
    return data;
  },

  // Progress
  async completeLesson(payload: {
    lessonSlug: string;
    courseSlug: string;
    pathSlug: string;
    quizCompleted?: boolean;
  }): Promise<{ message: string }> {
    const { data } = await api.post('/progress/complete', payload);
    return data;
  },

  async getProgressSummary(): Promise<IProgressSummary> {
    const { data } = await api.get<IProgressSummary>('/progress/summary');
    return data;
  },

  // Auth
  async getMe(): Promise<{ user: IUser }> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('code_academy_token');
  },
};

