import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail } from 'lucide-react';

/**
 * Clean Studio Footer Component:
 * - Minimal, high-impact layout containing only essential info
 * - Single direct studio email: team@zenkai.media
 * - Core site navigation & verified social channels
 * - Smooth Back to Top interaction
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsappUrl =
    "https://wa.me/923137396135?text=Hi%20Zenkai%20Media!%20I'd%20like%20to%20discuss%20a%20creative%20project.";

  return (
    <footer className="relative bg-[#06020c] text-white overflow-hidden border-t border-white/[0.1]">
      {/* Top Edge Gradient Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-[#8C1FA8] opacity-80" />

      {/* Atmospheric Background Ambient Glows */}
      <div 
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DA2086 0%, #8C1FA8 60%, transparent 100%)' }}
      />
      <div 
        className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF7348 0%, #FFC15C 50%, transparent 100%)' }}
      />
      <div className="grain-overlay opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 pb-6 sm:pb-10 md:pb-12">
          
          {/* Column 1: Brand & Studio Identity (5 cols) */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2.5 sm:gap-3 group transition-transform hover:scale-[1.02]"
                aria-label="ZENKAI MEDIA Home"
              >
                <img 
                  src="/assets/zenkai-emblem.png" 
                  alt="Zenkai Media" 
                  className="h-7 sm:h-9 w-auto object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" 
                />
                <span className="font-brand font-black text-white text-lg sm:text-2xl tracking-[-0.01em] uppercase flex items-center">
                  <span>ZENKAI</span>
                  <span className="font-bold text-white/90 ml-1.5 sm:ml-2 tracking-normal">MEDIA</span>
                </span>
              </Link>
              
              <p className="mt-2.5 sm:mt-4 text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm">
                Full-service creative agency and esports management studio operating at the intersection of gaming, entertainment, and digital culture.
              </p>
            </div>

            <div className="mt-3.5 sm:mt-6 flex items-center gap-2 text-xs text-white/60 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">Available for select 2026 commissions</span>
            </div>
          </div>

          {/* Mobile 2-Column Wrapper (side-by-side on phone, standard cols on desktop) */}
          <div className="grid grid-cols-2 md:contents gap-6 sm:gap-8">
            
            {/* Column 2: Navigation Links (3 cols on desktop) */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FFC15C] font-bold mb-2.5 sm:mb-4">
                NAVIGATION
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm font-semibold">
                <li>
                  <Link to="/" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <a 
                    href="/#zenkai-files" 
                    onClick={(e) => handleNavClick(e, 'zenkai-files')}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a 
                    href="/#our-craft" 
                    onClick={(e) => handleNavClick(e, 'our-craft')}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="/#in-the-game-with" 
                    onClick={(e) => handleNavClick(e, 'in-the-game-with')}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a 
                    href="/#contact" 
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Community (4 cols on desktop) */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#FFC15C] font-bold mb-2.5 sm:mb-4">
                  DIRECT INQUIRIES
                </h4>
                
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  {/* WhatsApp Direct Chat */}
                  <a 
                    href={whatsappUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-mono font-bold text-xs transition-all w-fit"
                    title="Direct WhatsApp Chat"
                  >
                    <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:team@zenkai.media" 
                    className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/90 hover:text-white font-mono font-bold text-xs transition-all w-fit"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#FF7348] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate">team@zenkai.media</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM LEGAL & BACK TO TOP BAR
            ========================================================================= */}
        <div className="pt-5 sm:pt-8 border-t border-white/[0.08] flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-xs text-white/50 text-center sm:text-left">
          <div className="text-[11px] sm:text-xs">
            © 2026 ZENKAI MEDIA LLC. ALL RIGHTS RESERVED.
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-white/40 font-semibold">
            BUILT FOR THE GAME · MADE FOR THE CULTURE
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer text-[11px] font-bold uppercase tracking-wider"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
