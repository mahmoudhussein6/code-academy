export interface IUser {
  _id?: any;
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt?: Date;
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

export interface ILesson {
  _id?: any;
  slug: string;
  courseSlug: string;
  moduleSlug: string;
  order: number;
  title: string;
  summary: string;
  readTimeMinutes: number;
  contentMarkdown: string;
  interactiveExercise?: IInteractiveExercise;
  quiz?: IQuiz;
}

export interface IModule {
  _id?: any;
  slug: string;
  courseSlug: string;
  order: number;
  title: string;
  description?: string;
  lessons: ILesson[];
}

export interface ICourse {
  _id?: any;
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
}

export interface ILearningPath {
  _id?: any;
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
}

export interface IUserProgress {
  userId: string;
  lessonSlug: string;
  courseSlug: string;
  pathSlug: string;
  completed: boolean;
  completedAt: Date;
  quizCompleted?: boolean;
}
