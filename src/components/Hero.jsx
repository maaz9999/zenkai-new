import React from 'react';
import Header from './Header';
import Marquee from './Marquee';

/**
 * Hero Section (Screenshot 1):
 * - Rounded horizontal gradient pill header
 * - Background video using BG.MP4 with dark overlay
 * - Subtitle: "Esports Creative Studio"
 * - Main heading: "BUILT FOR THE GAME / MADE FOR THE CULTURE"
 * - CTA button: "VIEW WORK" (orange-to-magenta gradient pill)
 * - Infinite Marquee slider flush at bottom
 */
export default function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById('zenkai-files');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          src="/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center grayscale"
          style={{ filter: 'grayscale(100%)' }}
        />
        {/* Dark overlay ensuring perfect contrast matching Screenshot 1 */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Floating Header Pill */}
      <Header />

      {/* Hero Central Typography & CTA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-16 text-center max-w-6xl mx-auto">
        {/* Kicker */}
        <p className="text-white text-lg sm:text-xl md:text-2xl font-normal tracking-normal mb-3 sm:mb-4">
          Esports Creative Studio
        </p>

        {/* Main Heading - Exact typography and 2-line structure from Image 2 */}
        <h1 className="font-sans font-black text-white text-[clamp(2rem,5.8vw,5.25rem)] tracking-[-0.035em] uppercase leading-[1.02] drop-shadow-xl mb-8 sm:mb-10 max-w-5xl select-none">
          <span className="block whitespace-nowrap">BUILT FOR THE GAME</span>
          <span className="block whitespace-nowrap mt-1 sm:mt-2">MADE FOR THE CULTURE</span>
        </h1>

        {/* CTA Button matching user reference */}
        <div>
          <button
            onClick={scrollToWork}
            className="btn-hero-cta text-white font-black text-sm sm:text-base tracking-[0.06em] uppercase px-9 sm:px-11 py-3.5 sm:py-4 rounded-full cursor-pointer select-none"
            aria-label="Scroll to Zenkai Files portfolio"
          >
            <span className="relative z-10">VIEW WORK</span>
          </button>
        </div>
      </div>

      {/* Infinite Marquee Strip flush at the bottom of Hero */}
      <div className="relative z-10 w-full">
        <Marquee />
      </div>
    </section>
  );
}
