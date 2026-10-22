import React from 'react';
import AnimatedGradient from './AnimatedGradient';
import { playersData } from '../data/playersData';

/**
 * In The Game With Section (Screenshot 5):
 * - Full-width animated brand gradient background
 * - Centered heading: "IN THE GAME WITH"
 * - Three-column player grid on desktop, two on tablet, one on mobile
 * - Clean black rectangular image boxes
 * - Centered player name and game title directly below each box
 */
export default function InTheGameWith() {
  return (
    <section id="in-the-game-with" className="relative w-full overflow-hidden bg-black">
      <div id="in-the-game" className="absolute top-0 pointer-events-none" />
      <AnimatedGradient 
        variant="banner"
        className="w-full py-12 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading matching Screenshot 5 */}
          <div className="text-center mb-8 sm:mb-14 md:mb-16">
            <h2 className="font-heading font-black text-white text-3xl xs:text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase drop-shadow-md">
              IN THE GAME WITH
            </h2>
          </div>

          {/* Player Grid: 3 columns desktop, 2 columns tablet matching Screenshot 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-8">
            {playersData.map((player) => (
              <div 
                key={player.id} 
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Rectangular image box with Option 3: Matte Graphite / Carbon Studio */}
                <div className="w-full aspect-[16/10] bg-[#111115] rounded-none overflow-hidden relative shadow-[0_15px_35px_rgba(0,0,0,0.65)] border border-white/10 group-hover:border-white/25 transition-all duration-300 group-hover:shadow-[0_22px_45px_rgba(0,0,0,0.85)] group-hover:-translate-y-0.5">
                  {/* Faint overhead rim light / neutral studio gradient */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 12%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 75%)'
                    }}
                  />
                  {/* Subtle bottom vignette to ground athlete */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 55%, rgba(0, 0, 0, 0.5) 100%)'
                    }}
                  />

                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.retried) {
                          e.currentTarget.dataset.retried = 'true';
                          e.currentTarget.src = player.image.replace('/assets/', '/media/');
                        }
                      }}
                      className="w-full h-full object-cover object-center scale-[1.35] translate-y-4 sm:translate-y-6 md:translate-y-7 origin-[center_40%] opacity-95 group-hover:opacity-100 group-hover:scale-[1.4] transition-all duration-500 ease-out relative z-10"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111115]" />
                  )}
                </div>

                {/* Player typography centered below image matching Screenshot 5 */}
                <div className="mt-3 sm:mt-4 text-center">
                  <h3 className="font-heading font-bold text-white text-lg sm:text-xl md:text-2xl tracking-wide uppercase leading-tight drop-shadow-sm">
                    {player.name}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase mt-0.5">
                    {player.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedGradient>
    </section>
  );
}
