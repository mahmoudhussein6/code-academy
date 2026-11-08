export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface IQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface IInteractiveExercise {
  instructions: string;
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  solution?: string;
}

export interface ILessonSummary {
  slug: string;
  title: string;
  order: number;
  readTimeMinutes: number;
  summary: string;
  completed?: boolean;
}

export interface ILesson extends ILessonSummary {
  courseSlug: string;
  moduleSlug: string;
  contentMarkdown: string;
  interactiveExercise?: IInteractiveExercise;
  quiz?: IQuiz;
}

export interface IModule {
  slug: string;
  courseSlug: string;
  order: number;
  title: string;
  description?: string;
  lessons: ILessonSummary[];
}

export interface ICourse {
  slug: string;
  pathSlug: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  topics: string[];
  icon: string;
  color: string;
  level: string;
  estimatedHours: number;
  modules: IModule[];
  status: 'available' | 'coming-soon';
  totalLessons?: number;
  completedLessons?: number;
  progressPercentage?: number;
}

export interface ILearningPath {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  isPrimary: boolean;
  status: 'available' | 'coming-soon';
  estimatedHours: number;
  courses: ICourse[];
  coursesCount?: number;
  totalLessons?: number;
  completedLessonsCount?: number;
  progressPercentage?: number;
}

export interface IProgressSummary {
  totalCompleted: number;
  completedLessons: string[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
  }[];
  streakDays: number;
}

