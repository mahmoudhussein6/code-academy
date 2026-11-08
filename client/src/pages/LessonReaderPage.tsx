import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  Share2,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';
import { apiService } from '../lib/api';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { CodePlayground } from '../components/CodePlayground';
import { LessonQuiz } from '../components/LessonQuiz';

export const LessonReaderPage: React.FC = () => {
  const { courseSlug = '', lessonSlug = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['lesson', lessonSlug],
    queryFn: () => apiService.getLesson(lessonSlug),
    enabled: Boolean(lessonSlug),
  });

  const completeMutation = useMutation({
    mutationFn: () =>
      apiService.completeLesson({
        lessonSlug,
        courseSlug,
        pathSlug: data?.course?.pathSlug || 'frontend-development',
        quizCompleted: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonSlug] });
      queryClient.invalidateQueries({ queryKey: ['path'] });
      queryClient.invalidateQueries({ queryKey: ['course'] });
      queryClient.invalidateQueries({ queryKey: ['progressSummary'] });
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p>جارٍ تحميل المقال التعليمي...</p>
      </div>
    );
  }

  if (error || !data || !data.lesson) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-bold text-white mb-2">الدرس غير متوفر</h2>
        <p className="text-slate-400 text-sm mb-6">الدرس المطلوب غير موجود أو تم نقله</p>
        <Link to="/paths/frontend-development" className="text-indigo-400 hover:underline text-sm font-semibold">
          العودة لخريطة المسار
        </Link>
      </div>
    );
  }

  const { lesson, isCompleted, course, navigation } = data;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Reading Navigation Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Breadcrumb & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
            title="فهرس الدروس"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
            <Link to="/paths/frontend-development" className="hover:text-indigo-400 transition hidden sm:inline">
              المسار
            </Link>
            <span className="hidden sm:inline text-slate-600">/</span>
            <Link to={`/courses/${courseSlug}`} className="hover:text-indigo-400 transition truncate max-w-[140px] sm:max-w-xs font-medium">
              {course?.title || courseSlug}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-semibold truncate max-w-[120px] sm:max-w-sm">
              {lesson.title}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition text-xs flex items-center gap-1 cursor-pointer"
            title="مشاركة رابط الدرس"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedShare ? 'تم النسخ' : 'مشاركة'}</span>
          </button>

          <button
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isCompleted
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/80'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'مكتمل ✅' : 'تحديد كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex gap-8">
        {/* Desktop Course Sidebar */}
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-80 bg-slate-950 border-l border-slate-800 p-5 transform transition-transform duration-200 lg:static lg:translate-x-0 lg:w-72 lg:shrink-0 lg:p-0 lg:border-l-0 lg:bg-transparent ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="lg:sticky lg:top-32 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>فهرس كورس:</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Navigation Modules */}
            {course?.modules.map((mod) => (
              <div key={mod.slug} className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                  {mod.title}
                </p>
                <div className="space-y-1">
                  {mod.lessons.map((les) => {
                    const isCurrent = les.slug === lessonSlug;
                    return (
                      <Link
                        key={les.slug}
                        to={`/learn/${courseSlug}/${les.slug}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                          isCurrent
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {les.completed || (les.slug === lessonSlug && isCompleted) ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-indigo-400' : 'text-slate-600'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0 mr-1">
                          {les.readTimeMinutes}د
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Reader Content Column */}
        <main className="flex-1 max-w-3xl mx-auto min-w-0">
          {/* Article Header */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 font-medium">
                الدرس رقم {lesson.order}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>زمن القراءة المتوقع: {lesson.readTimeMinutes} دقائق</span>
              </span>
              {isCompleted && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تم إنجاز هذا المقال</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {lesson.title}
            </h1>

            {/* Summary callout */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-200 mb-1">ملخص سريع:</p>
              <p>{lesson.summary}</p>
            </div>
          </div>

          {/* Article Markdown Content */}
          <article className="prose prose-invert max-w-none">
            <MarkdownRenderer content={lesson.contentMarkdown} />
          </article>

          {/* Interactive Code Playground (if present) */}
          {lesson.interactiveExercise && (
            <div className="mt-12 pt-8 border-t border-slate-800/80">
              <CodePlayground exercise={lesson.interactiveExercise} />
            </div>
          )}

          {/* End of Lesson Quiz (if present) */}
          {lesson.quiz && (
            <div className="mt-8">
              <LessonQuiz
                quiz={lesson.quiz}
                onPassed={() => completeMutation.mutate()}
              />
            </div>
          )}

          {/* Bottom Next/Prev Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {navigation.previousLesson ? (
              <Link
                to={`/learn/${navigation.previousLesson.courseSlug}/${navigation.previousLesson.slug}`}
                className="w-full sm:w-auto p-4 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-right group transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                  <span>الدرس السابق</span>
                </div>
                <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition">
                  {navigation.previousLesson.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {navigation.nextLesson ? (
              <Link
                to={`/learn/${navigation.nextLesson.courseSlug}/${navigation.nextLesson.slug}`}
                className="w-full sm:w-auto p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-blue-900/40 hover:from-indigo-900/60 hover:to-blue-900/60 border border-indigo-500/30 text-left group transition cursor-pointer"
              >
                <div className="flex items-center justify-end gap-2 text-xs text-indigo-400 mb-1">
                  <span>الدرس التالي</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition" />
                </div>
                <p className="text-sm font-bold text-white group-hover:text-indigo-200 transition text-right">
                  {navigation.nextLesson.title}
                </p>
              </Link>
            ) : (
              <Link
                to={`/paths/frontend-development`}
                className="w-full sm:w-auto p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 font-bold text-sm text-center"
              >
                🎉 أحسنت! أتممت دروس هذا الكورس بنجاح. عد لخريطة المسار
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

