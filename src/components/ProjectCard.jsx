import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ProjectCard component for Zenkai Files:
 * - Full vibrant organic gradient canvas matching Screenshot 2
 * - Prominent preview thumbnail from respective category folder
 * - Heading and title clearly displayed on top at the bottom line
 * - Preserves full gradient glow around and behind the artwork
 * - Navigates to dedicated project detail page (/work/:slug)
 */
export default function ProjectCard({ project, index, heading, thumbnail, badge }) {
  // Bespoke gradient styles matching each card in Screenshot 2
  const cardGradientStyles = [
    // Card 1: Warm amber/gold dominant with bottom-right magenta/violet crease
    {
      background: 'radial-gradient(circle at 25% 25%, #FFD066 0%, #FFA938 50%, #FF682E 75%, #7D1898 100%)',
      accentStyle: (
        <div 
          className="absolute -bottom-10 -right-10 w-[70%] h-[75%] blur-[40px] opacity-90"
          style={{ background: 'radial-gradient(circle, #8C1FA8 0%, #4B0868 80%)' }}
        />
      )
    },
    // Card 2: Deep rich violet with top magenta ridge
    {
      background: 'linear-gradient(145deg, #4B0868 0%, #681484 60%, #3C0654 100%)',
      accentStyle: (
        <div 
          className="absolute -top-12 left-[15%] w-[75%] h-[60%] blur-[35px] opacity-85"
          style={{ background: 'radial-gradient(ellipse at center, #FF662A 0%, #DA2086 55%, transparent 90%)' }}
        />
      )
    },
    // Card 3: Deep violet with fiery diagonal orange/gold beam
    {
      background: 'linear-gradient(135deg, #4A0B66 0%, #5B0E7D 100%)',
      accentStyle: (
        <div 
          className="absolute -bottom-10 left-[10%] w-[65%] h-[90%] blur-[45px] opacity-90 -rotate-12"
          style={{ background: 'radial-gradient(ellipse at center, #FFC15C 0%, #FF642E 60%, transparent 100%)' }}
        />
      )
    },
    // Card 4: Violet field with smooth rising magenta/orange wave
    {
      background: 'linear-gradient(160deg, #581075 0%, #44095C 100%)',
      accentStyle: (
        <div 
          className="absolute -bottom-12 -left-10 w-[80%] h-[80%] blur-[45px] opacity-90"
          style={{ background: 'radial-gradient(circle, #FF7838 0%, #DA2086 50%, transparent 85%)' }}
        />
      )
    },
    // Card 5: Luminous warm gold field with top magenta accent
    {
      background: 'radial-gradient(ellipse at 40% 50%, #FFD670 0%, #FFB642 60%, #FF8032 90%)',
      accentStyle: (
        <div 
          className="absolute -top-10 right-0 w-[55%] h-[55%] blur-[35px] opacity-80"
          style={{ background: 'radial-gradient(circle, #DA2086 0%, #7E189E 75%, transparent 100%)' }}
        />
      )
    },
    // Card 6: Violet field with luminous center-left warm flame
    {
      background: 'linear-gradient(145deg, #4E0D6B 0%, #3E0656 100%)',
      accentStyle: (
        <div 
          className="absolute -bottom-8 left-[15%] w-[70%] h-[80%] blur-[45px] opacity-90"
          style={{ background: 'radial-gradient(circle, #FFBA48 0%, #FF622A 55%, #DA2086 85%, transparent 100%)' }}
        />
      )
    }
  ];

  const currentGradient = cardGradientStyles[index % cardGradientStyles.length];
  const displayHeading = heading || project.blockHeading || project.title;
  const displayThumbnail = thumbnail || project.cover;

  const isLongHeading = displayHeading.length > 15;

  const handlePrefetch = () => {
    // Instant prefetch of target route and showcase chunk on user hover / touch
    import('../pages/ProjectDetailPage');
    if (project.slug === 'growth-creative-motion' || project.slug === 'reels') {
      import('./ReelsShowcase');
    } else if (project.slug === 'thumbnails') {
      import('./ThumbnailsShowcase');
    } else if (project.slug === 'twitch-stream-packaging') {
      import('./TwitchPackagingShowcase');
    } else if (project.slug === 'tekken-8-championship') {
      import('./PostersShowcase');
    } else if (project.slug === '4thrive-merch') {
      import('./FourThriveMerchShowcase');
    } else if (project.slug === 'baaz-merch') {
      import('./BaazCaseStudy');
    }

    // Preload top images for this project into browser memory
    if (project.presentationSections && project.presentationSections.length > 0) {
      project.presentationSections.slice(0, 3).forEach((sec) => {
        if (sec.image) {
          const img = new Image();
          img.src = sec.image;
        }
      });
    }
    if (project.cover) {
      const img = new Image();
      img.src = project.cover;
    }
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
      className="group block relative aspect-[16/11] overflow-hidden bg-black transition-all duration-300 cursor-pointer select-none rounded-none"
      aria-label={`View project: ${displayHeading} — ${project.title}`}
    >
      {/* Full-glow organic gradient background — colors DO NOT change on hover */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ background: currentGradient.background }}
      >
        {currentGradient.accentStyle}
        
        {/* Subtle noise grain texture overlay */}
        <div className="grain-overlay" />
      </div>

      {/* Featured Horizontal Thumbnail Window matching the bottom cards */}
      {displayThumbnail && (
        <div className="absolute top-2 left-2.5 right-2.5 sm:top-2.5 sm:left-3 sm:right-3 h-[75%] sm:h-[77%] rounded-xl overflow-hidden border border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.65)] z-[2] transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <img 
            src={displayThumbnail} 
            alt={displayHeading} 
            loading="lazy"
            decoding="async"
            onError={(e) => {
              if (!e.currentTarget.dataset.retried && displayThumbnail.includes('.webp')) {
                e.currentTarget.dataset.retried = 'true';
                e.currentTarget.src = displayThumbnail.replace(/\.webp(\?.*)?$/i, '.png$1');
              }
            }}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
          />
          {/* Subtle gradient vignette at bottom of thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
        </div>
      )}

      {/* Bottom Content — single clean heading vertically centered with arrow, with reduced gap to inside card */}
      <div className="absolute inset-0 px-3.5 pb-2 sm:px-4 sm:pb-2.5 lg:px-4.5 lg:pb-2.5 flex flex-col justify-end z-10 pointer-events-none">
        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          <h3 className={`font-heading font-black text-white ${isLongHeading ? 'text-sm sm:text-base lg:text-lg xl:text-xl' : 'text-base sm:text-lg lg:text-xl xl:text-2xl'} tracking-tight uppercase leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none min-w-0 truncate`}>
            {displayHeading}
          </h3>
          <span className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs sm:text-sm font-bold transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-lg">
            →
          </span>
        </div>
      </div>

      {/* Subtle border outline */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
    </Link>
  );
}
