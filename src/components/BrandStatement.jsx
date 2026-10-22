import React from 'react';
import AnimatedGradient from './AnimatedGradient';

/**
 * Brand Statement Banner:
 * - Full-width animated gradient banner matching Image 1
 * - Subtitle: "THE GAME IS ONLY THE BEGINNING"
 * - Main heading:
 *   Line 1: "WE BUILD WHAT COMES" (on one line)
 *   Line 2: "NEXT"
 * - Exactly matching Image 1 typography, spacing, and 2-line layout
 */
export default function BrandStatement() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Full-width Animated Gradient Banner matching Image 1 */}
      <AnimatedGradient 
        variant="statement"
        className="w-full pt-14 pb-14 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32 px-3 sm:px-6"
      >
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center relative z-10">
          {/* Subtitle matching Image 1 */}
          <p className="text-white text-xs sm:text-lg md:text-xl font-normal tracking-[0.1em] sm:tracking-[0.12em] uppercase mb-3 sm:mb-5 drop-shadow-md select-none">
            THE GAME IS ONLY THE BEGINNING
          </p>

          {/* Main Heading - Responsive 2-Line Format from Image 1 */}
          <h2 className="font-sans font-black text-white text-[clamp(1.65rem,6.4vw,5.5rem)] tracking-[-0.035em] uppercase leading-[1] drop-shadow-xl select-none px-1">
            <span className="block whitespace-normal sm:whitespace-nowrap">WE BUILD WHAT COMES</span>
            <span className="block whitespace-normal sm:whitespace-nowrap mt-1 sm:mt-2">NEXT</span>
          </h2>
        </div>
      </AnimatedGradient>
    </section>
  );
}
