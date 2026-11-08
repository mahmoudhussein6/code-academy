import { Response } from 'express';
import { getStore } from '../data/store';
import { AuthRequest } from '../middleware/auth';

export const getPaths = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const paths = await getStore.getPaths();
    const userId = req.user?.id;

    // Attach courses count and user progress if user logged in
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];

    const enrichedPaths = await Promise.all(
      paths.map(async (path) => {
        const courses = await getStore.getCoursesByPath(path.slug);
        let totalLessons = 0;
        courses.forEach((c) => {
          c.modules.forEach((m) => {
            totalLessons += m.lessons.length;
          });
        });

        const completedCount = userProgress.filter((p) => p.pathSlug === path.slug && p.completed).length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        return {
          ...path,
          coursesCount: courses.length,
          totalLessons,
          completedLessonsCount: completedCount,
          progressPercentage,
        };
      })
    );

    res.json(enrichedPaths);
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب المسارات التعليمية', error: error.message });
  }
};

export const getPathBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    if (!slug) {
      res.status(400).json({ message: 'معرف المسار مطلوب' });
      return;
    }

    const path = await getStore.getPathBySlug(slug);

    if (!path) {
      res.status(404).json({ message: 'المسار التعليمي غير موجود' });
      return;
    }

    const userId = req.user?.id;
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];
    const completedSet = new Set(userProgress.filter((p) => p.completed).map((p) => p.lessonSlug));

    let totalLessonsCount = 0;
    const enrichedCourses = path.courses.map((course) => {
      let courseTotal = 0;
      let courseCompleted = 0;

      const enrichedModules = course.modules.map((module) => {
        const enrichedLessons = module.lessons.map((lesson) => {
          courseTotal++;
          totalLessonsCount++;
          const isDone = completedSet.has(lesson.slug);
          if (isDone) courseCompleted++;
          return {
            ...lesson,
            completed: isDone,
          };
        });

        return {
          ...module,
          lessons: enrichedLessons,
        };
      });

      return {
        ...course,
        modules: enrichedModules,
        totalLessons: courseTotal,
        completedLessons: courseCompleted,
        progressPercentage: courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0,
      };
    });

    const totalCompleted = userProgress.filter((p) => p.pathSlug === slug && p.completed).length;

    res.json({
      ...path,
      courses: enrichedCourses,
      totalLessons: totalLessonsCount,
      completedLessons: totalCompleted,
      progressPercentage: totalLessonsCount > 0 ? Math.round((totalCompleted / totalLessonsCount) * 100) : 0,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب تفاصيل المسار', error: error.message });
  }
};
