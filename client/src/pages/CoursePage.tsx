import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  FileCode,
  Palette,
  Terminal,
  GitBranch,
  ShieldCheck,
  Atom,
  Sparkles,
} from 'lucide-react';
import { apiService } from '../lib/api';
import { ProgressBar } from '../components/ProgressBar';
import { useLanguage } from '../context/LanguageContext';
import { localizeLessonSummary } from '../lib/lessonTranslations';

export const CoursePage: React.FC = () => {
  const { courseSlug = 'html-fundamentals' } = useParams();
  const { language, t } = useLanguage();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseSlug],
    queryFn: () => apiService.getCourse(courseSlug),
  });

  const courseIcons: Record<string, React.ReactNode> = {
    'html-fundamentals': <FileCode className="w-8 h-8 text-orange-400" />,
    'css-fundamentals': <Palette className="w-8 h-8 text-blue-400" />,
    'javascript-fundamentals': <Terminal className="w-8 h-8 text-amber-400" />,
    'git-github': <GitBranch className="w-8 h-8 text-rose-400" />,
    'typescript': <ShieldCheck className="w-8 h-8 text-sky-400" />,
    'react-development': <Atom className="w-8 h-8 text-cyan-400" />,
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>{t('جارٍ تحميل بيانات الكورس...')}</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">{t('الكورس غير موجود')}</h2>
        <Link to="/paths/frontend-development" className="text-indigo-400 hover:underline text-sm">
          {t('العودة لمسار تطوير واجهات المستخدم')}
        </Link>
      </div>
    );
  }

  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-white transition">{t('الرئيسية')}</Link>
        <span>/</span>
        <Link to={`/paths/${course.pathSlug}`} className="hover:text-white transition">{t('مسار الفرونت إند')}</Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{t(course.shortTitle)}</span>
      </div>

      {/* Course Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
              {courseIcons[course.slug] || <BookOpen className="w-8 h-8 text-indigo-400" />}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-indigo-400 font-semibold">
                {t('الكورس رقم')} {course.order}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{t(course.title)}</h1>
              <p className="text-xs text-slate-400 font-mono">{course.shortTitle}</p>
            </div>
          </div>

          {firstLesson && (
            <Link
              to={`/learn/${course.slug}/${firstLesson.slug}`}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{t('ابدأ أول درس')}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{t(course.description)}</p>

        {/* Topics tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium ml-2">{t('المواضيع المغطاة:')}</span>
          {course.topics.map((topic, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="pt-2">
          <ProgressBar
            progress={course.progressPercentage || 0}
            size="md"
            color="indigo"
            showLabel={true}
          />
        </div>
      </div>

      {/* Modules and Lessons List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{t('فصول ودروس الكورس')}</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {course.totalLessons} {t('دروس')}
          </span>
        </h2>

        <div className="space-y-6">
          {course.modules.map((module) => (
            <div
              key={module.slug}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-1">{t(module.title)}</h3>
                {module.description && (
                  <p className="text-xs text-slate-400 leading-relaxed">{t(module.description)}</p>
                )}
              </div>

              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    to={`/learn/${course.slug}/${lesson.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-indigo-500/40 transition group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 shrink-0 transition" />
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition">
                          {localizeLessonSummary(lesson, language).title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {localizeLessonSummary(lesson, language).summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 mr-2">
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.readTimeMinutes} {t('دقائق')}</span>
                      </span>
                      <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transform group-hover:-translate-x-1 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
