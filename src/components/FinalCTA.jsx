import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Final Call To Action Section:
 * - Pure high-contrast white background
 * - Large black heading: "THE NEXT MOVE / IS YOURS."
 * - Dedicated Project Inquiry Page Link (/start-a-project)
 */
export default function FinalCTA() {
  return (
    <section id="contact" className="relative bg-white text-black py-16 sm:py-28 md:py-40 px-3.5 sm:px-6">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Main Heading matching Screenshot 6 */}
        <h2 className="font-heading font-black text-black text-3xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight uppercase leading-[0.96] mb-6 sm:mb-10 px-1">
          <span className="block">THE NEXT MOVE</span>
          <span className="block mt-1">IS YOURS.</span>
        </h2>

        {/* Orange CTA Button linking directly to dedicated Start a Project page */}
        <div>
          <Link
            to="/start-a-project"
            className="btn-orange inline-flex items-center gap-2.5 sm:gap-3 text-white font-bold text-xs sm:text-base md:text-lg px-7 sm:px-11 py-3 sm:py-4 rounded-full shadow-[0_6px_25px_rgba(255,100,51,0.35)] cursor-pointer select-none active:scale-95 group transition-all"
            aria-label="Start a project with Zenkai Media"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
