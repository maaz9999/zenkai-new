import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedGradient from './AnimatedGradient';

/**
 * Header component:
 * - Rounded horizontal brand gradient pill pinned neatly at the top
 * - Zenkai Media logo aligned on the left
 * - Navbar on the right side: Portfolio, Services, Contact
 * - Active pill highlighting: Only selected when clicked or when that section is active in view
 */
export default function Header() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(null);

  // Scroll spy to dynamically track active section on the homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveNav(null);
      return;
    }

    const sections = [
      { id: 'zenkai-files', key: 'portfolio' },
      { id: 'our-craft', key: 'services' },
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

  const handleNavClick = (e, targetId, navKey) => {
    setActiveNav(navKey);
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Portfolio', id: 'zenkai-files', key: 'portfolio' },
    { label: 'Services', id: 'our-craft', key: 'services' },
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

            {/* Navbar on the right side: Portfolio, Services, Contact */}
            <nav className="flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 shrink-0" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activeNav === item.key;
                return (
                  <a
                    key={item.key}
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id, item.key)}
                    className={`group flex items-center px-2 xs:px-2.5 sm:px-3.5 py-0.5 sm:py-1 md:py-1.5 rounded-full text-[10.5px] xs:text-[11px] sm:text-xs md:text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer ${
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
          </div>
        </AnimatedGradient>
      </div>
    </header>
  );
}
