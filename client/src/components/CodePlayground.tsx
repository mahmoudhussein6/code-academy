import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Eye, EyeOff, Terminal, Sparkles, MonitorPlay } from 'lucide-react';
import { IInteractiveExercise } from '../types';

interface CodePlaygroundProps {
  exercise: IInteractiveExercise;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ exercise }) => {
  const [htmlCode, setHtmlCode] = useState(exercise.initialHtml || '');
  const [cssCode, setCssCode] = useState(exercise.initialCss || '');
  const [jsCode, setJsCode] = useState(exercise.initialJs || '');
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [outputTab, setOutputTab] = useState<'preview' | 'console'>('preview');
  const [logs, setLogs] = useState<{ type: 'log' | 'error' | 'warn'; message: string }[]>([]);
  const [previewKey, setPreviewKey] = useState(0);

  // If there is JS code and no HTML code initially, default to JS tab and console tab
  useEffect(() => {
    if (!exercise.initialHtml && exercise.initialJs) {
      setActiveTab('js');
      setOutputTab('console');
    }
  }, [exercise]);

  // Listen for message events posted from iframe sandbox for console logging
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'code-academy-sandbox') {
        setLogs((prev) => [...prev, { type: event.data.type, message: event.data.message }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleReset = () => {
    setHtmlCode(exercise.initialHtml || '');
    setCssCode(exercise.initialCss || '');
    setJsCode(exercise.initialJs || '');
    setLogs([]);
    setPreviewKey((k) => k + 1);
  };

  const handleRun = () => {
    setLogs([]);
    setPreviewKey((k) => k + 1);
  };

  const previewSource = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            padding: 16px; 
            margin: 0; 
            background: #090d16; 
            color: #f1f5f9; 
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script>
          (function() {
            const formatArg = (arg) => {
              if (typeof arg === 'object') {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch(e) {
                  return String(arg);
                }
              }
              return String(arg);
            };

            const send = (type, args) => {
              const message = Array.from(args).map(formatArg).join(' ');
              window.parent.postMessage({
                source: 'code-academy-sandbox',
                type: type,
                message: message
              }, '*');
            };

            console.log = (...args) => send('log', args);
            console.error = (...args) => send('error', args);
            console.warn = (...args) => send('warn', args);

            try {
              ${jsCode}
            } catch (err) {
              console.error(err.message || String(err));
            }
          })();
        </script>
      </body>
    </html>
  `;

  return (
    <div className="my-10 border border-slate-800 bg-slate-900/60 rounded-2xl overflow-hidden shadow-2xl">
      {/* Exercise Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 p-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm mb-1">
          <Terminal className="w-4 h-4" />
          <span>مختبر التطبيق العملي التفاعلي (Interactive Sandbox)</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{exercise.instructions}</p>
      </div>

      {/* Editor & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
        {/* Editor Area */}
        <div className="flex flex-col bg-[#090d16]">
          {/* Tabs Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-1">
              {exercise.initialHtml !== undefined && (
                <button
                  type="button"
                  onClick={() => setActiveTab('html')}
                  className={`px-3 py-1.5 rounded-lg font-mono font-medium transition cursor-pointer ${
                    activeTab === 'html' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML
                </button>
              )}
              {exercise.initialCss !== undefined && (
                <button
                  type="button"
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1.5 rounded-lg font-mono font-medium transition cursor-pointer ${
                    activeTab === 'css' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS
                </button>
              )}
              {exercise.initialJs !== undefined && (
                <button
                  type="button"
                  onClick={() => setActiveTab('js')}
                  className={`px-3 py-1.5 rounded-lg font-mono font-medium transition cursor-pointer ${
                    activeTab === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  JavaScript
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                title="إعادة تعيين الكود الأصلي"
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-xs">إعادة ضبط</span>
              </button>
              {exercise.solution && (
                <button
                  type="button"
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span className="text-xs">{showSolution ? 'إخفاء الحل' : 'عرض الحل النموذجي'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Solution Callout if toggled */}
          {showSolution && exercise.solution && (
            <div className="p-3 bg-emerald-950/40 border-b border-emerald-800/60 text-xs text-emerald-300 font-mono" dir="ltr">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> الحل المقترح:
              </div>
              <pre className="whitespace-pre-wrap">{exercise.solution}</pre>
            </div>
          )}

          {/* Active Code Input */}
          <div className="p-3 flex-1 min-h-[240px]">
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                spellCheck={false}
                dir="ltr"
                className="w-full h-full min-h-[220px] bg-transparent text-emerald-400 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                placeholder="اكتب كود HTML هنا..."
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                spellCheck={false}
                dir="ltr"
                className="w-full h-full min-h-[220px] bg-transparent text-sky-400 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                placeholder="اكتب كود CSS هنا..."
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                spellCheck={false}
                dir="ltr"
                className="w-full h-full min-h-[220px] bg-transparent text-amber-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                placeholder="اكتب كود JavaScript هنا..."
              />
            )}
          </div>
        </div>

        {/* Output & Console Area */}
        <div className="flex flex-col bg-slate-950">
          {/* Header selector between Visual Preview and Console */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOutputTab('preview')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                  outputTab === 'preview'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5 text-emerald-400" />
                <span>المعاينة المرئية</span>
              </button>

              <button
                type="button"
                onClick={() => setOutputTab('console')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                  outputTab === 'console'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>الطرفية (Console)</span>
                {logs.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center font-mono">
                    {logs.length}
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow transition cursor-pointer text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>تشغيل الكود</span>
            </button>
          </div>

          {/* Visual Output */}
          <div className="flex-1 p-2 min-h-[240px] bg-slate-950 flex flex-col">
            {outputTab === 'preview' ? (
              <iframe
                key={previewKey}
                srcDoc={previewSource}
                title="Code Preview"
                sandbox="allow-scripts"
                className="w-full h-full min-h-[220px] rounded-lg border border-slate-800 bg-slate-900"
              />
            ) : (
              <div
                className="w-full h-full min-h-[220px] rounded-lg border border-slate-800 bg-[#090d16] p-3 overflow-y-auto font-mono text-xs space-y-1.5"
                dir="ltr"
              >
                <div className="text-slate-500 pb-2 border-b border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span>// Console Output</span>
                  <button
                    type="button"
                    onClick={() => setLogs([])}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer text-[10px]"
                  >
                    Clear
                  </button>
                </div>
                {logs.length === 0 ? (
                  <p className="text-slate-600 italic pt-2">No logs printed yet. Run code with console.log(...) to see output.</p>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={index}
                      className={`leading-relaxed ${
                        log.type === 'error'
                          ? 'text-rose-400 bg-rose-950/30 p-1 rounded'
                          : log.type === 'warn'
                          ? 'text-amber-400'
                          : 'text-slate-200'
                      }`}
                    >
                      <span className="text-slate-500 select-none mr-2">&gt;</span>
                      <span>{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
