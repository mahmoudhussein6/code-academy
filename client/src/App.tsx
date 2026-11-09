import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './pages/HomePage';
import { PathPage } from './pages/PathPage';
import { CoursePage } from './pages/CoursePage';
import { LessonReaderPage } from './pages/LessonReaderPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// ─── Page Transition Wrapper ──────────────────────────────────────────────────
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setIsTransitioning(true);
    setOpacity(0);

    const t1 = setTimeout(() => {
      setDisplayChildren(children);
      setOpacity(1);
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(t1);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        opacity,
        transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
    >
      {displayChildren}
    </div>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isReader = location.pathname.startsWith('/learn/');
  const is404 = !['/', '/dashboard'].includes(location.pathname) &&
    !location.pathname.startsWith('/paths/') &&
    !location.pathname.startsWith('/courses/') &&
    !location.pathname.startsWith('/learn/');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {!is404 && <Navbar />}
      <main className="flex-1">
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      {!isReader && !is404 && <Footer />}
      <AuthModal />
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on first visit (per session)
    return !sessionStorage.getItem('splashShown');
  });

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: showSplash ? 'none' : 'auto',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/paths/:pathSlug" element={<PathPage />} />
                  <Route path="/courses/:courseSlug" element={<CoursePage />} />
                  <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonReaderPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
