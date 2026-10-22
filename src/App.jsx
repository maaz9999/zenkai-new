import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import StartProjectPage from './pages/StartProjectPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/:slug" element={<ProjectDetailPage />} />
      <Route path="/start-a-project" element={<StartProjectPage />} />
      <Route path="/contact" element={<StartProjectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
