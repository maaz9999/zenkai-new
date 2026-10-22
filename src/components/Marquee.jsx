import React from 'react';

/**
 * Infinite Marquee Slider (Screenshots 1 & 3):
 * - Thin white strip with continuously scrolling text:
 *   "Brand . Design . Illustration . Motion."
 * - Words colored in brand colors:
 *   - Brand: Orange
 *   - Design: Orange
 *   - Illustration: Pink
 *   - Motion.: Purple
 * - Seamless right-to-left loop, pause on hover
 */
export default function Marquee({ className = '' }) {
  const units = [
    // Core creative disciplines (retained)
    { text: 'Brand', color: 'text-[#FF662A]' },
    { dot: true, color: 'text-[#FF662A]' },
    { text: 'Design', color: 'text-[#FF662A]' },
    { dot: true, color: 'text-[#DF2888]' },
    { text: 'Illustration', color: 'text-[#DF2888]' },
    { dot: true, color: 'text-[#7E189E]' },
    { text: 'Motion', color: 'text-[#7E189E]' },
    { dot: true, color: 'text-[#FF662A]' },

    // All studio services from Our Craft
    { text: 'Player Management', color: 'text-[#FF662A]' },
    { dot: true, color: 'text-[#FF7348]' },
    { text: 'Graphics (Thumbnail / Poster / Streaming Assets)', color: 'text-[#FF7348]' },
    { dot: true, color: 'text-[#DF2888]' },
    { text: '2D Illustration', color: 'text-[#DF2888]' },
    { dot: true, color: 'text-[#9B32A7]' },
    { text: 'Video Editing (Long Form / Short Form)', color: 'text-[#9B32A7]' },
    { dot: true, color: 'text-[#7E189E]' },
    { text: 'Social Media Management', color: 'text-[#7E189E]' },
    { dot: true, color: 'text-[#FF662A]' },
  ];

  // Repeat sequence for seamless infinite track width
  const sequence = Array(8).fill(units).flat();

  return (
    <div 
      className={`relative w-full bg-white text-black overflow-hidden py-1.5 sm:py-2 select-none z-20 marquee-wrapper ${className}`}
      aria-label="Creative disciplines marquee"
    >
      <div className="flex w-max animate-marquee-infinite">
        {/* Primary Track */}
        <div className="flex items-center space-x-6 sm:space-x-8 px-4 whitespace-nowrap">
          {sequence.map((item, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              {item.dot ? (
                <span className={`font-bold text-sm sm:text-base ${item.color}`}>.</span>
              ) : (
                <span className={`font-semibold tracking-wider text-xs sm:text-sm md:text-base ${item.color}`}>
                  {item.text}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Seamless Clone Track */}
        <div className="flex items-center space-x-6 sm:space-x-8 px-4 whitespace-nowrap" aria-hidden="true">
          {sequence.map((item, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              {item.dot ? (
                <span className={`font-bold text-sm sm:text-base ${item.color}`}>.</span>
              ) : (
                <span className={`font-semibold tracking-wider text-xs sm:text-sm md:text-base ${item.color}`}>
                  {item.text}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
