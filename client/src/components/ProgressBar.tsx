import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'indigo',
  size = 'md',
  showLabel = false,
}) => {
  const { t } = useLanguage();
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorGradients: Record<string, string> = {
    indigo: 'from-indigo-500 to-blue-500',
    emerald: 'from-emerald-500 to-teal-400',
    cyan: 'from-cyan-500 to-blue-500',
    orange: 'from-orange-500 to-amber-400',
    rose: 'from-rose-500 to-pink-500',
  };

  const gradient = colorGradients[color] || colorGradients.indigo;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1 text-slate-400 font-medium">
          <span>{t('نسبة الإنجاز')}</span>
          <span className="font-mono text-indigo-400 font-semibold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
