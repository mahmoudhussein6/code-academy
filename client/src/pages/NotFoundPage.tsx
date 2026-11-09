import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Terminal, RefreshCw } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [typed, setTyped] = useState('');
  const [visible, setVisible] = useState(false);

  const targetText = '404 | الصفحة غير موجودة';

  useEffect(() => {
    // Entrance animation
    const visTimer = setTimeout(() => setVisible(true), 100);

    // Typewriter effect
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < targetText.length) {
        setTyped(targetText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 60);

    // Countdown redirect
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countInterval);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(visTimer);
      clearInterval(typeInterval);
      clearInterval(countInterval);
    };
  }, [navigate]);

  return (
    <div
      className={`min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      dir="rtl"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(ellipse, #06b6d4, transparent)' }}
        />

        {/* Floating code snippets */}
        {['<div>', '</>', '{...}', '404', 'null', 'undefined'].map((text, i) => (
          <div
            key={i}
            className="absolute text-indigo-500/20 font-mono text-xl font-bold select-none"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 15}%`,
              animation: `floatCode${i % 3} ${4 + i}s ease-in-out infinite`,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Main card */}
      <div
        className={`relative z-10 max-w-2xl w-full text-center space-y-8 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Giant 404 */}
        <div className="relative">
          <div
            className="text-[180px] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </div>
          {/* Overlay glow text */}
          <div
            className="absolute inset-0 text-[180px] font-black leading-none select-none blur-sm opacity-30"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </div>
        </div>

        {/* Terminal window */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden text-left shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex items-center gap-2 mr-4 text-slate-400 text-sm">
              <Terminal className="w-4 h-4" />
              <span>code-academy ~ bash</span>
            </div>
          </div>
          {/* Terminal body */}
          <div className="p-5 font-mono text-sm space-y-2" dir="ltr">
            <div className="text-green-400">$ navigate to /unknown-page</div>
            <div className="text-red-400">Error: Page not found (404)</div>
            <div className="text-slate-500">
              at Router.resolve (router.js:142)
            </div>
            <div className="text-slate-500">at App.render (App.tsx:49)</div>
            <div className="flex items-center gap-2 text-cyan-400 mt-3">
              <span>$</span>
              <span
                style={{
                  borderRight: '2px solid #22d3ee',
                  animation: 'blink 1s step-end infinite',
                  paddingRight: '2px',
                }}
              >
                {typed}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            يبدو أنك ضلّيت الطريق! 🧭
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
            <br />
            سيتم توجيهك للرئيسية خلال{' '}
            <span
              className="font-bold text-indigo-400"
              style={{ animation: 'countPulse 1s ease-in-out infinite' }}
            >
              {countdown}
            </span>{' '}
            ثوانٍ.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-slate-300 border border-slate-700 hover:border-indigo-500 hover:text-white transition-all duration-200 hover:scale-105"
          >
            <ArrowRight className="w-5 h-5" />
            الصفحة السابقة
          </button>
        </div>

        {/* Countdown ring */}
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#6366f1"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - countdown / 10)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #22d3ee; }
        }
        @keyframes countPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes floatCode0 {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatCode1 {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes floatCode2 {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

