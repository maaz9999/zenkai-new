import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ZenkaiFiles from '../components/ZenkaiFiles';
import BrandStatement from '../components/BrandStatement';
import OurCraft from '../components/OurCraft';
import InTheGameWith from '../components/InTheGameWith';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

/**
 * HomePage
 * Assembles all 6 main page sections in the exact order specified:
 * 1. HERO SECTION (Screenshot 1) + Marquee
 * 2. ZENKAI FILES (Screenshot 2)
 * 3. BRAND STATEMENT (Screenshot 3) + Marquee
 * 4. OUR CRAFT (Screenshot 4)
 * 5. IN THE GAME WITH (Screenshot 5)
 * 6. FINAL CALL TO ACTION (Screenshot 6)
 * 7. FOOTER
 */
export default function HomePage() {
  const location = useLocation();

  // Handle hash scrolling on page navigation
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* 1. Hero Section — Screenshot 1 */}
      <Hero />

      {/* 2. Zenkai Files — Screenshot 2 */}
      <ZenkaiFiles />

      {/* 3. Brand Statement — Screenshot 3 */}
      <BrandStatement />

      {/* 4. Our Craft — Screenshot 4 */}
      <OurCraft />

      {/* 5. In The Game With — Screenshot 5 */}
      <InTheGameWith />

      {/* 6. Final Call to Action — Screenshot 6 */}
      <FinalCTA />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
