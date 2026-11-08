import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Compass, Award, User, LogOut, Menu, X, Sparkles, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isGuest = !user || user.id === 'guest_user';

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'مسار الفرونت إند', path: '/paths/frontend-development' },
    { label: 'لوحة تقدمي', path: '/dashboard' },
  ];

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
                Code Academy
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[11px] text-slate-400 -mt-0.5 font-medium">تعلم تطوير الويب من الصفر</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-white bg-slate-800/80 font-semibold border border-slate-700/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger & User Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-indigo-400" />
                <span>ابحث في الدروس...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-950 rounded border border-slate-800">
                Ctrl K
              </kbd>
            </button>

            {isGuest ? (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-xl shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition"
                >
                  <img
                    src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg bg-slate-800"
                  />
                  <span className="text-sm font-medium text-slate-200">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  title="تسجيل الخروج"
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile search & menu buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg"
              title="بحث"
            >
              <Search className="w-5 h-5 text-indigo-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-800">
              {isGuest ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تسجيل الدخول / إنشاء حساب</span>
                </button>
              ) : (
                <div className="flex items-center justify-between">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-slate-200"
                  >
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg" />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-400 hover:underline"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal Palette */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
