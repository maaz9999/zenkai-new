import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dynamic lazy imports for instant route-level code-splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const StartProjectPage = lazy(() => import('./pages/StartProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Ultra-lightweight brand fallback loader
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#FF7348] animate-spin" />
        <span className="font-mono text-xs tracking-widest text-white/50 uppercase">Loading Zenkai...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/start-a-project" element={<StartProjectPage />} />
        <Route path="/contact" element={<StartProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
