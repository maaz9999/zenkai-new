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

          {/* Player Grid: 3 columns desktop, 2 columns tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {playersData.map((player, idx) => (
              <div 
                key={player.id} 
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Rectangular image box with Full Esports Upgrade: Glass Specular & Layered Depth */}
                <div className="w-full aspect-[16/10] bg-[#0c0a12]/95 backdrop-blur-md rounded-none overflow-hidden relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_20px_45px_rgba(0,0,0,0.7)] border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),_0_25px_55px_rgba(0,0,0,0.9)]">
                  
                  {/* Layer 1: Ambient Studio Rim / Spotlight */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)'
                    }}
                  />

                  {/* Layer 2: Ghost Typographic Watermark (layered depth behind athlete) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span className="font-heading font-black text-[5.5rem] sm:text-[6.5rem] md:text-[7.5rem] tracking-tighter text-white/[0.07] uppercase leading-none transform translate-y-1 group-hover:scale-105 group-hover:text-white/[0.12] transition-all duration-700 ease-out">
                      {player.shortTag || player.name.split(' ')[0]}
                    </span>
                  </div>

                  {/* Layer 3: Top Championship Badge Pill */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-lg group-hover:border-amber-400/40 transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB848] animate-pulse" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white/95 tracking-wider uppercase">
                      {player.badge || player.accolades}
                    </span>
                  </div>

                  {/* Layer 4: Top-Left Roster Tag / Index */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 font-mono text-[10px] font-bold text-white/40 tracking-widest uppercase">
                    ZENKAI // {player.number || `0${idx + 1}`}
                  </div>

                  {/* Layer 5: Grounding Vignette (behind athlete feet/chest) */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(12, 10, 18, 0.3) 70%, rgba(12, 10, 18, 0.85) 100%)'
                    }}
                  />

                  {/* Layer 6: Athlete Cutout */}
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
                    <div className="w-full h-full bg-[#0c0a12]" />
                  )}
                </div>

                {/* Player typography centered below image */}
                <div className="mt-3.5 sm:mt-4 text-center flex flex-col items-center">
                  <h3 className="font-heading font-black text-white text-lg sm:text-xl md:text-2xl tracking-wide uppercase leading-tight drop-shadow-md group-hover:text-amber-200 transition-colors duration-300">
                    {player.name}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-1">
                    <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                      {player.role}
                    </p>
                    <span className="text-white/30 hidden xs:inline">•</span>
                    <p className="text-[#FFA436] text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase">
                      {player.team}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedGradient>
    </section>
  );
}
