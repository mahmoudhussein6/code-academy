import { Response } from 'express';
import { getStore } from '../data/store';
import { AuthRequest } from '../middleware/auth';

export const getCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pathSlug = req.query.path as string | undefined;
    const courses = pathSlug
      ? await getStore.getCoursesByPath(pathSlug)
      : await getStore.getAllCourses();

    const userId = req.user?.id;
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];
    const completedSet = new Set(userProgress.filter((p) => p.completed).map((p) => p.lessonSlug));

    const enriched = courses.map((course) => {
      let totalLessons = 0;
      let completedLessons = 0;

      course.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          totalLessons++;
          if (completedSet.has(lesson.slug)) completedLessons++;
        });
      });

      return {
        ...course,
        totalLessons,
        completedLessons,
        progressPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      };
    });

    res.json(enriched);
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب قائمة الكورسات', error: error.message });
  }
};

export const getCourseBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    if (!slug) {
      res.status(400).json({ message: 'معرف الكورس مطلوب' });
      return;
    }

    const course = await getStore.getCourseBySlug(slug);

    if (!course) {
      res.status(404).json({ message: 'الكورس غير موجود' });
      return;
    }

    const userId = req.user?.id;
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];
    const completedSet = new Set(userProgress.filter((p) => p.completed).map((p) => p.lessonSlug));

    let totalLessons = 0;
    let completedLessons = 0;

    const enrichedModules = course.modules.map((module) => {
      const enrichedLessons = module.lessons.map((lesson) => {
        totalLessons++;
        const isCompleted = completedSet.has(lesson.slug);
        if (isCompleted) completedLessons++;
        return {
          ...lesson,
          completed: isCompleted,
        };
      });

      return {
        ...module,
        lessons: enrichedLessons,
      };
    });

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    res.json({
      ...course,
      modules: enrichedModules,
      totalLessons,
      completedLessons,
      progressPercentage,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب تفاصيل الكورس', error: error.message });
  }
};
