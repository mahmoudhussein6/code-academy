import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, X, BookOpen, Clock, ArrowLeft, Terminal, FileCode, Palette, GitBranch, ShieldCheck, Atom } from 'lucide-react';
import { apiService } from '../lib/api';
import { ILessonSummary, ICourse } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  type: 'lesson' | 'course';
  title: string;
  summary?: string;
  courseTitle?: string;
  courseSlug?: string;
  lessonSlug?: string;
  readTimeMinutes?: number;
  url: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const { data: paths = [] } = useQuery({
    queryKey: ['paths'],
    queryFn: () => apiService.getPaths(),
  });

  const { data: frontendPath } = useQuery({
    queryKey: ['path', 'frontend-development'],
    queryFn: () => apiService.getPath('frontend-development'),
    enabled: isOpen,
  });

  // Build searchable index from courses and lessons
  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [];

    if (frontendPath && frontendPath.courses) {
      frontendPath.courses.forEach((course) => {
        items.push({
          type: 'course',
          title: course.title,
          summary: course.description,
          courseSlug: course.slug,
          url: `/courses/${course.slug}`,
        });

        course.modules.forEach((module) => {
          module.lessons.forEach((lesson) => {
            items.push({
              type: 'lesson',
              title: lesson.title,
              summary: lesson.summary,
              courseTitle: course.shortTitle,
              courseSlug: course.slug,
              lessonSlug: lesson.slug,
              readTimeMinutes: lesson.readTimeMinutes,
              url: `/learn/${course.slug}/${lesson.slug}`,
            });
          });
        });
      });
    }

    return items;
  }, [frontendPath]);

  // Filter items based on searchTerm
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      // return first 6 popular lessons by default
      return searchIndex.filter((item) => item.type === 'lesson').slice(0, 6);
    }

    const term = searchTerm.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          (item.summary && item.summary.toLowerCase().includes(term)) ||
          (item.courseTitle && item.courseTitle.toLowerCase().includes(term))
      )
      .slice(0, 8);
  }, [searchIndex, searchTerm]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  // Handle keyboard shortcuts (Ctrl+K or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        navigate(selected.url);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-indigo-400 shrink-0 ml-3" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن درس، تقنية (مثل: HTML, Flexbox, React, TypeScript)..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none text-right font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-500 hover:text-slate-300 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ESC للإغلاق
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              لم يتم العثور على نتائج تطابق: &quot;{searchTerm}&quot;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        item.type === 'course'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {item.type === 'course' ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <FileCode className="w-4 h-4" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{item.title}</span>
                        {item.courseTitle && (
                          <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
                            {item.courseTitle}
                          </span>
                        )}
                      </div>
                      {item.summary && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">{item.summary}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 mr-3 text-xs text-slate-500">
                    {item.readTimeMinutes && (
                      <span className="font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTimeMinutes}د</span>
                      </span>
                    )}
                    <ArrowLeft className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              استخدم <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">↓</kbd> للتنقل
            </span>
            <span>
              اضغط <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Enter</kbd> للفتح
            </span>
          </div>
          <span>Code Academy Search</span>
        </div>
      </div>
    </div>
  );
};

