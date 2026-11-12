import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { direction, t } = useLanguage();
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Enter phase
    const enterTimer = setTimeout(() => setPhase('show'), 100);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Exit phase
    const exitTimer = setTimeout(() => setPhase('exit'), 2000);

    // Finish
    const finishTimer = setTimeout(() => onFinish(), 2500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        phase === 'enter' ? 'opacity-0' : phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
      dir={direction}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Glowing blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent)',
          animation: 'blobFloat1 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent)',
          animation: 'blobFloat2 8s ease-in-out infinite',
        }}
      />

      {/* Main content */}
      <div
        className={`flex flex-col items-center gap-8 transition-transform duration-500 ${
          phase === 'show' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Logo */}
        <div
          className="relative flex items-center justify-center w-24 h-24 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            boxShadow: '0 0 60px rgba(99,102,241,0.5)',
            animation: 'logoPulse 2s ease-in-out infinite',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </svg>

          {/* Orbiting dot */}
          <div
            className="absolute w-3 h-3 rounded-full bg-cyan-400"
            style={{ animation: 'orbit 2s linear infinite' }}
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-black"
            style={{
              background: 'linear-gradient(90deg, #6366f1, #06b6d4, #6366f1)',
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'textShimmer 2s linear infinite',
            }}
          >
            Code Academy
          </h1>
          <p className="text-slate-400 text-lg font-medium tracking-wide">
            {t('تعلم تطوير الويب بالعربي')}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500"
              style={{
                animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
              boxShadow: '0 0 10px rgba(99,102,241,0.8)',
            }}
          />
        </div>

        <p className="text-slate-600 text-sm">{t('جاري التحميل...')}</p>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(99,102,241,0.5); }
          50% { box-shadow: 0 0 90px rgba(6,182,212,0.7); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(44px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
        }
        @keyframes textShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
