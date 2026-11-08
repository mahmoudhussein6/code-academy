import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Compass,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  Zap,
  Lock,
  Layers,
  FileCode,
  Palette,
  Terminal,
  GitBranch,
  ShieldCheck,
  Atom,
} from 'lucide-react';
import { apiService } from '../lib/api';
import { ProgressBar } from '../components/ProgressBar';

export const PathPage: React.FC = () => {
  const { pathSlug = 'frontend-development' } = useParams();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const { data: path, isLoading, error } = useQuery({
    queryKey: ['path', pathSlug],
    queryFn: () => apiService.getPath(pathSlug),
  });

  const courseIcons: Record<string, React.ReactNode> = {
    'html-fundamentals': <FileCode className="w-5 h-5 text-orange-400" />,
    'css-fundamentals': <Palette className="w-5 h-5 text-blue-400" />,
    'javascript-fundamentals': <Terminal className="w-5 h-5 text-amber-400" />,
    'git-github': <GitBranch className="w-5 h-5 text-rose-400" />,
    'typescript': <ShieldCheck className="w-5 h-5 text-sky-400" />,
    'react-development': <Atom className="w-5 h-5 text-cyan-400" />,
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>جارٍ تحميل تفاصيل المسار التعليمي...</p>
      </div>
    );
  }

  if (error || !path) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">المسار التعليمي غير موجود</h2>
        <p className="text-slate-400 text-sm mb-6">تأكد من الرابط أو عد للصفحة الرئيسية</p>
        <Link to="/" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  // Find first uncompleted lesson to recommend
  let firstUncompletedLesson = {
    courseSlug: 'html-fundamentals',
    lessonSlug: 'what-is-html-and-web-basics',
  };
  let found = false;

  for (const course of path.courses) {
    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        if (!les.completed) {
          firstUncompletedLesson = {
            courseSlug: course.slug,
            lessonSlug: les.slug,
          };
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }

  const toggleCourse = (slug: string) => {
    setExpandedCourse(expandedCourse === slug ? null : slug);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Path Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                {path.level === 'beginner' ? 'مسار مبتدئين تماماً' : 'مسار متقدم'}
              </span>
              <span className="text-slate-500 text-xs font-mono">{path.shortTitle}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {path.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {path.description}
            </p>

            {/* Quick Meta */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>حوالي {path.estimatedHours} ساعة تدريبية مقالية</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{path.courses.length} مواد تدريبية متسلسلة</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>{path.totalLessons} دروس تفاعلية</span>
              </div>
            </div>
          </div>

          {/* Right Action & Progress Card */}
          <div className="shrink-0 bg-slate-950/70 border border-slate-800 rounded-2xl p-6 w-full md:w-72 space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-400">إنجازك الإجمالي</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {path.progressPercentage}%
                </span>
              </div>
              <ProgressBar progress={path.progressPercentage || 0} color="emerald" size="md" />
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                أتممت {path.completedLessons} من أصل {path.totalLessons} درساً
              </p>
            </div>

            <Link
              to={`/learn/${firstUncompletedLesson.courseSlug}/${firstUncompletedLesson.lessonSlug}`}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{path.completedLessons && path.completedLessons > 0 ? 'تابع التعلم' : 'ابدأ المسار الآن'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Course Sequence Timeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>المنهج الدراسي والكورسات</span>
            <span className="text-xs bg-slate-800 text-slate-400 font-normal px-2.5 py-1 rounded-full">
              {path.courses.length} كورسات
            </span>
          </h2>
          <span className="text-xs text-slate-400">انقر على أي كورس لعرض الفصول والدروس</span>
        </div>

        <div className="space-y-4">
          {path.courses.map((course, index) => {
            const isExpanded = expandedCourse === course.slug || expandedCourse === null; // open by default for visibility
            const isCompleted = (course.completedLessons || 0) > 0 && course.completedLessons === course.totalLessons;

            return (
              <div
                key={course.slug}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                {/* Course Header Banner */}
                <div
                  onClick={() => toggleCourse(course.slug)}
                  className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                      {courseIcons[course.slug] || <BookOpen className="w-5 h-5 text-indigo-400" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-indigo-400 font-semibold">
                          الكورس {index + 1}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{course.level}</span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> تم الإنجاز
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white hover:text-indigo-300 transition">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:block text-left">
                      <span className="text-xs text-slate-400 font-mono">
                        {course.completedLessons || 0}/{course.totalLessons} دروس
                      </span>
                      <div className="w-24 mt-1">
                        <ProgressBar progress={course.progressPercentage || 0} size="sm" color="indigo" />
                      </div>
                    </div>
                    <div className="p-1 rounded-lg bg-slate-800/60 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Course Modules & Lessons */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/40 p-5 sm:p-6 space-y-6">
                    {course.modules.map((module) => (
                      <div key={module.slug} className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-800/50 pb-2">
                          <span className="text-slate-200">{module.title}</span>
                          <span>{module.lessons.length} دروس</span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {module.lessons.map((lesson) => (
                            <Link
                              key={lesson.slug}
                              to={`/learn/${course.slug}/${lesson.slug}`}
                              className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-indigo-500/40 transition cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 shrink-0 transition" />
                                )}
                                <div>
                                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition">
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                    {lesson.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 mr-2">
                                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{lesson.readTimeMinutes} د</span>
                                </span>
                                <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transform group-hover:-translate-x-1 transition" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 flex justify-end">
                      <Link
                        to={`/courses/${course.slug}`}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>عرض صفحة الكورس المستقلة</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

