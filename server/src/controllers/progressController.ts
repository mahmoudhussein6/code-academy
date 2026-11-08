import { Response } from 'express';
import { getStore } from '../data/store';
import { AuthRequest } from '../middleware/auth';

export const completeLesson = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id || 'guest_user';
    const { lessonSlug, courseSlug, pathSlug, quizCompleted } = req.body;

    if (!lessonSlug || !courseSlug || !pathSlug) {
      res.status(400).json({ message: 'بيانات الدرس غير مكتملة' });
      return;
    }

    const progress = await getStore.markLessonComplete(
      userId,
      lessonSlug,
      courseSlug,
      pathSlug,
      Boolean(quizCompleted)
    );

    res.json({
      message: 'تم حفظ التقدم بنجاح!',
      progress,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'فشل حفظ التقدم', error: error.message });
  }
};

export const getProgressSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id || 'guest_user';
    const userProgress = await getStore.getUserProgress(userId);

    const completedLessons = userProgress.filter((p) => p.completed).map((p) => p.lessonSlug);

    // Calculate badges
    const badges = [];
    if (completedLessons.length >= 1) {
      badges.push({
        id: 'first_step',
        title: 'الخطوة الأولى',
        description: 'أتممت درسك الأول في الأكاديمية بنجاح!',
        icon: 'Sparkles',
        date: 'متحققة',
      });
    }
    if (completedLessons.some((s) => s.startsWith('html-'))) {
      badges.push({
        id: 'html_master',
        title: 'بناء الهياكل (HTML)',
        description: 'أتقنت أساسيات وسوم ونماذج HTML5.',
        icon: 'FileCode',
        date: 'متحققة',
      });
    }
    if (completedLessons.some((s) => s.startsWith('css-') || s.startsWith('flexbox-'))) {
      badges.push({
        id: 'css_wizard',
        title: 'مهندس التنسيق (CSS)',
        description: 'أتممت دروس نموذج الصندوق و Flexbox.',
        icon: 'Palette',
        date: 'متحققة',
      });
    }
    if (completedLessons.some((s) => s.startsWith('js-') || s.startsWith('dom-') || s.startsWith('async-'))) {
      badges.push({
        id: 'js_ninja',
        title: 'سيد المنطق (JavaScript)',
        description: 'انتقلت للتفاعل والعمليات اللاتزامنية.',
        icon: 'Terminal',
        date: 'متحققة',
      });
    }
    if (completedLessons.length >= 5) {
      badges.push({
        id: 'fast_learner',
        title: 'متعلم شغوف',
        description: 'أنجزت 5 دروس كاملة في مسار تطوير الويب.',
        icon: 'Zap',
        date: 'متحققة',
      });
    }

    res.json({
      totalCompleted: completedLessons.length,
      completedLessons,
      badges,
      streakDays: 3,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'فشل جلب ملخص التقدم', error: error.message });
  }
};

