import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Award,
  Zap,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Flame,
  Sparkles,
  User,
  ShieldCheck,
  FileCode,
  Palette,
  Terminal,
} from 'lucide-react';
import { apiService } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { ProgressBar } from '../components/ProgressBar';
import { useLanguage } from '../context/LanguageContext';

export const DashboardPage: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const { t, direction } = useLanguage();

  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['progressSummary'],
    queryFn: () => apiService.getProgressSummary(),
  });

  const { data: path } = useQuery({
    queryKey: ['path', 'frontend-development'],
    queryFn: () => apiService.getPath('frontend-development'),
  });

  const totalLessons = path?.totalLessons || 17;
  const completedCount = summary?.totalCompleted || 0;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  const badgeIcons: Record<string, React.ReactNode> = {
    first_step: <Sparkles className="w-5 h-5 text-amber-400" />,
    html_master: <FileCode className="w-5 h-5 text-orange-400" />,
    css_wizard: <Palette className="w-5 h-5 text-blue-400" />,
    js_ninja: <Terminal className="w-5 h-5 text-amber-400" />,
    fast_learner: <Zap className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10" dir={direction}>
      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5 text-center sm:text-start">
          <img
            src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
            alt=""
            className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-indigo-500/40 p-1"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user?.name || t('طالب الأكاديمية')}</h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                {t('مطور مستقبلي 🚀')}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <p className="text-xs text-slate-400 pt-1">
              {t('المسار الحالي:')}{' '}
              <span className="text-slate-200 font-medium">{t('تطوير واجهات المستخدم (Frontend)')}</span>
            </p>
          </div>
        </div>

        {user?.id === 'guest_user' && (
          <button
            onClick={openAuthModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
          >
            {t('حفظ الحساب بكلمة مرور')}
          </button>
        )}
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{t('الدروس المكتملة')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">
            {completedCount} <span className="text-xs text-slate-500 font-sans">/ {totalLessons}</span>
          </p>
          <ProgressBar progress={progressPercentage} size="sm" color="emerald" />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{t('نسبة إنجاز المسار')}</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-indigo-400 font-mono">{progressPercentage}%</p>
          <ProgressBar progress={progressPercentage} size="sm" color="indigo" />
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{t('أيام الاستمرار (Streak)')}</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-orange-400 font-mono">{t('3 أيام متتالية 🔥')}</p>
          <p className="text-[11px] text-slate-500">{t('واصل القراءة يومياً لتحافظ على الشعلة!')}</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{t('الأوسمة المكتسبة')}</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-400 font-mono">
            {summary?.badges?.length || 1} {t('أوسمة')}
          </p>
          <p className="text-[11px] text-slate-500">{t('تم فتح إنجازات جديدة')}</p>
        </div>
      </div>

      {/* Continue Learning CTA */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-start">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            {t('تابع رحلتك الآن')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {t('جاهز للانتقال للدرس التالي؟')}
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            {t('خطوة صغيرة يومياً بمعدل 10 دقائق تضمن تحولك لمطور ويب متمكن ومستعد لسوق العمل.')}
          </p>
        </div>

        <Link
          to="/paths/frontend-development"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{t('تصفح خريطة الدروس')}</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Badges & Achievements Showcase */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" />
          <span>{t('الأوسمة والإنجازات (Achievements)')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(summary?.badges || []).map((badge) => (
            <div
              key={badge.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:border-indigo-500/40 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                {badgeIcons[badge.id] || <Sparkles className="w-6 h-6 text-indigo-400" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-0.5">{t(badge.title)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t(badge.description)}</p>
                <span className="inline-block text-[10px] text-emerald-400 font-mono mt-2 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {badge.date}
                </span>
              </div>
            </div>
          ))}

          {/* Locked Badge teaser */}
          <div className="bg-slate-950/40 border border-slate-800/60 border-dashed rounded-2xl p-5 flex items-start gap-4 opacity-50">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 text-slate-500">
              🔒
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 mb-0.5">{t('خبير الـ React ⚛️')}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t('أتمم كورس React Development بالكامل لفتح هذا الوسام النادر.')}
              </p>
              <span className="inline-block text-[10px] text-slate-600 font-mono mt-2">
                {t('قيد القفل')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
