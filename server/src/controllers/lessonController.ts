import { Response } from 'express';
import { getStore } from '../data/store';
import { AuthRequest } from '../middleware/auth';

export const getLessons = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const courseSlug = req.query.course as string | undefined;
    const lessons = courseSlug
      ? await getStore.getLessonsByCourse(courseSlug)
      : await getStore.getAllLessons();

    const userId = req.user?.id;
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];
    const completedSet = new Set(userProgress.filter((p) => p.completed).map((p) => p.lessonSlug));

    const enriched = lessons.map((les) => ({
      ...les,
      completed: completedSet.has(les.slug),
    }));

    res.json(enriched);
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب قائمة الدروس', error: error.message });
  }
};

export const getLessonBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    if (!slug) {
      res.status(400).json({ message: 'معرف الدرس مطلوب' });
      return;
    }

    const lesson = await getStore.getLessonBySlug(slug);

    if (!lesson) {
      res.status(404).json({ message: 'الدرس المطلوب غير موجود' });
      return;
    }

    const course = await getStore.getCourseBySlug(lesson.courseSlug);
    const userId = req.user?.id;
    const userProgress = userId ? await getStore.getUserProgress(userId) : [];

    const isCompleted = userProgress.some((p) => p.lessonSlug === slug && p.completed);

    // Compute all lessons in this course flattened to find previous and next lesson
    const flatLessons: { slug: string; title: string; courseSlug: string }[] = [];
    if (course) {
      course.modules.forEach((mod) => {
        mod.lessons.forEach((les) => {
          flatLessons.push({
            slug: les.slug,
            title: les.title,
            courseSlug: course.slug,
          });
        });
      });
    }

    const currentIndex = flatLessons.findIndex((l) => l.slug === slug);
    const previousLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex >= 0 && currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;

    res.json({
      lesson,
      isCompleted,
      course: course
        ? {
            slug: course.slug,
            title: course.title,
            pathSlug: course.pathSlug,
            modules: course.modules,
          }
        : null,
      navigation: {
        previousLesson,
        nextLesson,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب الدرس', error: error.message });
  }
};
