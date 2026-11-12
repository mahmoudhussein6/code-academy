import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, GitBranch, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">Code Academy</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('منصة عربية مفتوحة لتعليم تطوير الويب من الصفر حتى الاحتراف، بمحتوى مقالي تفاعلي يركز على التطبيق العملي وبناء المشاريع الحقيقية.')}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{t('صُنع بشغف للمطورين العرب')}</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>

          {/* Paths Col */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t('المسارات التعليمية')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/paths/frontend-development" className="hover:text-indigo-400 transition">
                  {t('مسار Frontend Development')}
                </Link>
              </li>
              <li>
                <span className="text-slate-600 cursor-not-allowed flex items-center gap-2">
                  {t('مسار Backend Development')}
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{t('قريباً')}</span>
                </span>
              </li>
              <li>
                <Link to="/courses/html-fundamentals" className="hover:text-indigo-400 transition">
                  {t('أساسيات HTML')}
                </Link>
              </li>
              <li>
                <Link to="/courses/react-development" className="hover:text-indigo-400 transition">
                  {t('تطوير React')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t('روابط سريعة')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition">
                  {t('لوحة تقدم الطالب')}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <GitBranch className="w-4 h-4 text-rose-400" />
                  <span>{t('المستودع البرمجي')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Code Academy. {t('جميع الحقوق محفوظة.')}</p>
          <p className="mt-2 sm:mt-0">{t('تعلم، طبق، وابنِ مستقبلك البرمجي 🚀')}</p>
        </div>
      </div>
    </footer>
  );
};
