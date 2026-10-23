import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Code-split heavy secondary detail pages to keep main landing instant
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const StartProjectPage = lazy(() => import('./pages/StartProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Ultra-lightweight brand fallback loader for subroutes
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
    <Routes>
      {/* HomePage renders instantly with zero loading waterfall */}
      <Route path="/" element={<HomePage />} />
      
      {/* Subroutes with lazy code-splitting and smooth fallback */}
      <Route 
        path="/work/:slug" 
        element={
          <Suspense fallback={<PageLoader />}>
            <ProjectDetailPage />
          </Suspense>
        } 
      />
      <Route 
        path="/start-a-project" 
        element={
          <Suspense fallback={<PageLoader />}>
            <StartProjectPage />
          </Suspense>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <Suspense fallback={<PageLoader />}>
            <StartProjectPage />
          </Suspense>
        } 
      />
      <Route 
        path="*" 
        element={
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        } 
      />
    </Routes>
  );
}
