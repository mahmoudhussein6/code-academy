import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { IQuiz } from '../types';

interface LessonQuizProps {
  quiz: IQuiz;
  onPassed?: () => void;
}

export const LessonQuiz: React.FC<LessonQuizProps> = ({ quiz, onPassed }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === quiz.correctIndex && onPassed) {
      onPassed();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="my-10 p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
      {/* Quiz Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">اختبر فهمك للدرس (Quiz)</h3>
          <p className="text-xs text-slate-400">سؤال سريع لترسيخ المعلومات قبل الانتقال للدرس التالي</p>
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-6">
        <p className="text-base font-semibold text-slate-100">{quiz.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, idx) => {
          let optionStyle = 'border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700';

          if (isSubmitted) {
            if (idx === quiz.correctIndex) {
              optionStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-300';
            } else if (selectedOption === idx) {
              optionStyle = 'border-rose-500 bg-rose-950/30 text-rose-300';
            } else {
              optionStyle = 'border-slate-800/60 opacity-50';
            }
          } else if (selectedOption === idx) {
            optionStyle = 'border-indigo-500 bg-indigo-950/30 text-indigo-200 shadow-sm';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-right p-4 rounded-xl border transition flex items-center justify-between cursor-pointer ${optionStyle}`}
            >
              <span className="text-sm font-medium leading-relaxed">{option}</span>
              <div className="mr-3 shrink-0">
                {isSubmitted && idx === quiz.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {isSubmitted && selectedOption === idx && idx !== quiz.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                {!isSubmitted && (
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedOption === idx ? 'border-indigo-500 bg-indigo-600' : 'border-slate-700'
                    }`}
                  >
                    {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action / Result */}
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>تحقق من الإجابة</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isCorrect
                ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
            }`}
          >
            {isCorrect ? (
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm mb-1">
                {isCorrect ? 'إجابة ممتازة وصحيحة! 🎉' : 'إجابة غير دقيقة، حاول مرة أخرى!'}
              </p>
              <p className="text-xs leading-relaxed opacity-90">{quiz.explanation}</p>
            </div>
          </div>

          {!isCorrect && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              إعادة المحاولة
            </button>
          )}
        </div>
      )}
    </div>
  );
};

