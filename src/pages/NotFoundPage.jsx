import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedGradient from '../components/AnimatedGradient';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <AnimatedGradient rounded="rounded-3xl" className="p-10 border border-white/10 shadow-2xl">
          <h1 className="font-heading font-black text-6xl text-white mb-2">404</h1>
          <p className="text-white/80 font-medium mb-6">Page Not Found</p>
          <Link
            to="/"
            className="inline-block bg-white text-black font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Return to Arena
          </Link>
        </AnimatedGradient>
      </div>
    </div>
  );
}
