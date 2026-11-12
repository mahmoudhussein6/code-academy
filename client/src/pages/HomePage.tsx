import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Code2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Layers,
  BookOpen,
  Zap,
  Clock,
  Compass,
  FileCode,
  Palette,
  GitBranch,
  ShieldCheck,
  Atom,
  Server,
  Database,
  Lock,
} from 'lucide-react';
import { apiService } from '../lib/api';
import { ProgressBar } from '../components/ProgressBar';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { data: paths = [], isLoading } = useQuery({
    queryKey: ['paths'],
    queryFn: () => apiService.getPaths(),
  });

  const frontendPath = paths.find((p) => p.slug === 'frontend-development');
  const backendPath = paths.find((p) => p.slug === 'backend-development');

  const courseIcons: Record<string, React.ReactNode> = {
    'html-fundamentals': <FileCode className="w-6 h-6 text-orange-400" />,
    'css-fundamentals': <Palette className="w-6 h-6 text-blue-400" />,
    'javascript-fundamentals': <Terminal className="w-6 h-6 text-amber-400" />,
    'git-github': <GitBranch className="w-6 h-6 text-rose-400" />,
    'typescript': <ShieldCheck className="w-6 h-6 text-sky-400" />,
    'react-development': <Atom className="w-6 h-6 text-cyan-400" />,
  };

  const frontendCoursesList = [
    {
      slug: 'html-fundamentals',
      order: 1,
      title: t('1. أساسيات HTML'),
      shortTitle: 'HTML Fundamentals',
      desc: t('بناء هيكل صفحات الويب وتنظيم المحتوى.'),
      topics: 'Elements · Attributes · Forms · Semantic HTML',
      icon: <FileCode className="w-5 h-5 text-orange-400" />,
      color: 'border-orange-500/30 hover:border-orange-500/70',
      badge: t('الخطوة الأولى'),
    },
    {
      slug: 'css-fundamentals',
      order: 2,
      title: t('2. أساسيات CSS'),
      shortTitle: 'CSS Fundamentals',
      desc: t('تنسيق وتصميم صفحات الويب بأناقة وتجاوب.'),
      topics: 'Selectors · Box Model · Flexbox · Grid · Responsive',
      icon: <Palette className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-500/70',
      badge: t('التصميم والتخطيط'),
    },
    {
      slug: 'javascript-fundamentals',
      order: 3,
      title: t('3. أساسيات JavaScript'),
      shortTitle: 'JavaScript Fundamentals',
      desc: t('برمجة التفاعل والمنطق ودوال الـ DOM والعمليات اللاتزامنية.'),
      topics: 'Variables · Functions · Arrays · Objects · DOM · Async',
      icon: <Terminal className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-500/70',
      badge: t('لغة البرمجة الحية'),
    },
    {
      slug: 'git-github',
      order: 4,
      title: t('4. نظام Git & GitHub'),
      shortTitle: 'Git & GitHub',
      desc: t('إدارة الأكواد وتتبع الإصدارات والعمل الجماعي.'),
      topics: 'Git · Branches · Commits · GitHub',
      icon: <GitBranch className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/30 hover:border-rose-500/70',
      badge: t('أداة المحترفين'),
    },
    {
      slug: 'typescript',
      order: 5,
      title: t('5. لغة TypeScript'),
      shortTitle: 'TypeScript',
      desc: t('كتابة كود JavaScript آمن بمساعدة نظام الأنواع الثابتة.'),
      topics: 'Types · Interfaces · Generics',
      icon: <ShieldCheck className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/30 hover:border-sky-500/70',
      badge: t('البرمجة الموثوقة'),
    },
    {
      slug: 'react-development',
      order: 6,
      title: t('6. تطوير تطبيقات React'),
      shortTitle: 'React Development',
      desc: t('بناء تطبيقات واجهات المستخدم الحديثة وقابلة للتوسع.'),
      topics: 'Components · Props · Hooks · Routing · State Management',
      icon: <Atom className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 hover:border-cyan-500/70',
      badge: t('المحطة الختامية'),
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 to-blue-500/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-inner animate-in fade-in slide-in-from-top-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{t('منصة عربية لتعليم تطوير الويب من الصفر حتى الاحتراف')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.25] sm:leading-[1.2]">
            {t('تعلم تطوير الويب من الصفر')}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {t('بمسار مقالي تطبيقي واضح')}
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('أي شخص ليس لديه أي خبرة برمجية سابقة يستطيع دخول المنصة، اتباع خريطة واضحة، قراءة الدروس المبسطة، تطبيق الأكواد في المتصفح، ومتابعة تقدمه حتى يصبح مطور واجهات محترف (Frontend Developer).')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/paths/frontend-development"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-600/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>{t('ابدأ مسار الفرونت إند مجاناً')}</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <a
              href="#roadmap"
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base rounded-2xl border border-slate-800 transition flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-slate-400" />
              <span>{t('استكشف الخريطة التعليمية')}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-800/60 max-w-4xl mx-auto">
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t('محتوى عربي دقيق ومبسط')}</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">6</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t('كورسات متسلسلة للفرونت إند')}</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{t('مقالي + تفاعلي')}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t('قراءة عميقة وتطبيق فوري')}</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">{t('اختبارات فهم')}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{t('للتأكد من استيعابك لكل درس')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Architecture: Path vs Course vs Module vs Lesson */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>{t('هيكلية التعلم الذكية')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t('كيف صممنا الخريطة لتضمن عدم تشتتك؟')}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('فصلنا المسار التعليمي إلى مستويات هرمية واضحة، حتى تعرف في أي لحظة أين أنت وما هي خطوتك التالية:')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-white">Learning Path</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('رحلة تعليمية متكاملة تحقق هدفاً وظيفياً كبيراً (مثل Frontend Developer).')}
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-white">Course</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('مادة أو تقنية محددة داخل الرحلة (مثل HTML أو JavaScript أو React).')}
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-white">Module</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('فصل موضوعي داخل الكورس يجمع المفاهيم المترابطة (مثل نماذج الإدخال أو Flexbox).')}
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-base font-bold text-white">Lesson</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('مقال تطبيقي مركز، تقرأه في 8 دقائق، مع تجربة الكود واختبار سريع.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Path: Frontend Development Roadmap */}
      <section id="roadmap" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>{t('المسار الأساسي المتاح الآن (Primary Path)')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {t('مسار تطوير واجهات المستخدم (Frontend Development)')}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {t('6 كورسات أساسية مرتبة بعناية فائقة. ندرج Git & GitHub كجزء أساسي ونتعلم TypeScript قبل React المتقدم.')}
            </p>
          </div>

          <Link
            to="/paths/frontend-development"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>{t('استعراض المنهج بالكامل')}</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frontendCoursesList.map((course) => (
            <Link
              key={course.slug}
              to={`/courses/${course.slug}`}
              className={`group bg-slate-900/70 border ${course.color} rounded-2xl p-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {course.icon}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                    {course.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{course.shortTitle}</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{course.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t('المواضيع:')} {course.topics}</span>
                </p>
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:underline">
                  <span>{t('دخول الكورس وتصفح الدروس')}</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Backend Roadmap - Future Expansion */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-950 to-indigo-950/20 rounded-3xl p-8 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 text-xs font-bold mb-3">
              <Server className="w-3.5 h-3.5" />
              <span>{t('التوسع المستقبلي (Future Expansion)')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {t('مسار تطوير الواجهات الخلفية (Backend Development)')}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('الامتداد الطبيعي بعد احتراف الفرونت إند لتصبح مبرمج فول ستاك (Full Stack Web Developer).')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: 'Node.js', icon: <Server className="w-5 h-5 text-emerald-400" /> },
              { title: 'Express.js', icon: <Terminal className="w-5 h-5 text-indigo-400" /> },
              { title: 'REST API', icon: <Code2 className="w-5 h-5 text-sky-400" /> },
              { title: 'MongoDB', icon: <Database className="w-5 h-5 text-green-400" /> },
              { title: 'Authentication', icon: <Lock className="w-5 h-5 text-amber-400" /> },
              { title: 'Full Stack Apps', icon: <Layers className="w-5 h-5 text-purple-400" /> },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-slate-200">{item.title}</span>
                <span className="text-[10px] text-slate-500 font-medium">{t('قريباً')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Article Based section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {t('لماذا التعلم بالمقالات المكتوبة (Article-Based)؟')}
          </h2>
          <p className="text-slate-400 text-sm">
            {t('صممنا الأكاديمية لتكون المكان الأسرع والأكثر كفاءة لاكتساب المهارات الحقيقية دون إضاعة الوقت.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-white">{t('سرعة مضاعفة 3x')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('قراءة مقال احترافي تستغرق 8 دقائق فقط وتمنحك تركيزاً أعلى بكثير من مشاهدة فيديو مدته ساعة مليء بالحشو.')}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              💻
            </div>
            <h3 className="text-lg font-bold text-white">{t('نسخ وتجربة الكود فوراً')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('كل الأكواد مكتوبة بوضوح بنظام Highlighting مع زر نسخ فوري ومختبر كود تفاعلي داخل نفس الصفحة.')}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              📚
            </div>
            <h3 className="text-lg font-bold text-white">{t('مرجع دائم للبحث')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('المقالات يسهل العودة إليها والبحث في فقراتها واسترجاع أي معلومة في ثوانٍ أثناء بناء مشاريعك الشخصية.')}
            </p>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-indigo-900/70 via-blue-900/50 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {t('جاهز لكتابة أول سطر كود اليوم؟')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('المسار مجاني 100% وموجه للمبتدئين تماماً. ابدأ من الدرس الأول في أساسيات HTML الآن.')}
            </p>
          </div>
          <Link
            to="/learn/html-fundamentals/what-is-html-and-web-basics"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl transition cursor-pointer"
          >
            <span>{t('ابدأ الدرس الأول الآن مجاناً')}</span>
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </Link>
        </div>
      </section>
    </div>
  );
};
