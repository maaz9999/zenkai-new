import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedGradient from './AnimatedGradient';
import { Menu, X, ArrowUpRight } from 'lucide-react';

/**
 * Header component:
 * - Rounded horizontal brand gradient pill pinned neatly at the top
 * - Zenkai Media logo aligned on the left
 * - Desktop: Navbar on the right side (Portfolio, Services, Contact)
 * - Mobile: Sleek interactive hamburger button with floating dropdown drawer
 * - Active pill highlighting: Only selected when clicked or when that section is active in view
 */
export default function Header() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Scroll spy to dynamically track active section on the homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveNav(null);
      return;
    }

    const sections = [
      { id: 'zenkai-files', key: 'portfolio' },
      { id: 'our-craft', key: 'services' },
      { id: 'in-the-game-with', key: 'partners' },
      { id: 'contact', key: 'contact' }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      let current = null;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section.key;
          }
        }
      }
      setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Click outside to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('pointerdown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, targetId, navKey) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const desktopNavItems = [
    { label: 'Portfolio', id: 'zenkai-files', key: 'portfolio' },
    { label: 'Services', id: 'our-craft', key: 'services' },
    { label: 'Contact', id: 'contact', key: 'contact' }
  ];

  const mobileNavItems = [
    { label: 'Portfolio', id: 'zenkai-files', key: 'portfolio' },
    { label: 'Services', id: 'our-craft', key: 'services' },
    { label: 'Partners', id: 'in-the-game-with', key: 'partners' },
    { label: 'Contact', id: 'contact', key: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3 md:pt-3.5 px-2.5 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Gradient pill container */}
        <AnimatedGradient 
          variant="pill"
          rounded="rounded-full"
          className="w-full h-[42px] sm:h-[48px] md:h-[52px] shadow-[0_10px_35px_rgba(0,0,0,0.65)] border border-white/20 backdrop-blur-md"
        >
          <div className="w-full h-full flex items-center justify-between px-2.5 sm:px-5 md:px-7">
            {/* Logo aligned left */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-200 hover:scale-[1.02] shrink-0"
              aria-label="ZENKAI MEDIA Home"
            >
              {/* Official Zenkai geometric emblem */}
              <img 
                src="/assets/zenkai-emblem.png" 
                alt="Zenkai Media Emblem" 
                className="h-5 sm:h-6.5 md:h-7.5 w-auto object-contain shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" 
              />

              {/* Bold Brand Text */}
              <span className="font-brand font-black text-white tracking-[-0.02em] text-xs sm:text-sm md:text-base uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] flex items-center">
                <span>ZENKAI</span>
                <span className="hidden xs:inline font-bold text-white/90 ml-1.5 tracking-normal">MEDIA</span>
              </span>
            </Link>

            {/* Desktop Navbar: Portfolio, Services, Contact */}
            <nav className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0" aria-label="Main Navigation">
              {desktopNavItems.map((item) => {
                const isActive = activeNav === item.key;
                return (
                  <a
                    key={item.key}
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id, item.key)}
                    className={`group flex items-center px-3 sm:px-3.5 py-1 md:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer ${
                      isActive
                        ? 'bg-white/25 hover:bg-white/30 text-white border border-white/30 shadow-[0_2px_12px_rgba(0,0,0,0.25)]'
                        : 'text-white/80 hover:text-white hover:bg-white/15 border border-transparent active:scale-95'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 flex items-center justify-center text-white border border-white/25 transition-all cursor-pointer shadow-sm shrink-0"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </AnimatedGradient>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div 
            ref={menuRef}
            className="sm:hidden mt-2.5 w-full max-w-sm mx-auto rounded-3xl bg-[#0d0416]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-3 text-white transition-all overflow-hidden relative"
          >
            {/* Subtle top edge gradient highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-[#8C1FA8] opacity-80" />

            <div className="flex flex-col gap-1">
              {mobileNavItems.map((item) => {
                const isActive = activeNav === item.key;
                return (
                  <a
                    key={item.key}
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id, item.key)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all select-none cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF7348]/25 to-[#DA2086]/25 text-white border border-[#FF7348]/40 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10 active:scale-98 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FF7348]' : 'bg-white/40'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
                  </a>
                );
              })}

              {/* Dedicated Start a Project Button */}
              <Link
                to="/start-a-project"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-hero-cta mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-black uppercase tracking-wider text-xs text-white shadow-md cursor-pointer select-none active:scale-95 transition-all"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
