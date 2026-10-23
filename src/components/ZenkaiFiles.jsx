import React from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';

/**
 * Zenkai Files Portfolio Section (Screenshot 2):
 * - Pure black background
 * - Centered bold white typography: "ZENKAI FILES"
 * - 6 cards with respective folder thumbnails + glowing organic gradients + bottom titles
 * - Card 4 now showcases 4THRIVE merchandise work (replacing duplicate Arslan Ash)
 */
export default function ZenkaiFiles() {
  const blocks = [
    {
      heading: 'THUMBNAILS',
      project: projectsData.find((p) => p.slug === 'thumbnails' || p.id === 'thumbnails') || projectsData[2],
      thumbnail: '/media/thumb_Arslan_podcast.webp',
      badge: 'THUMBNAIL'
    },
    {
      heading: 'POSTERS',
      project: projectsData.find((p) => p.id === 'tekken-8-championship') || projectsData[0],
      thumbnail: '/media/Arslan_tournament.webp',
      badge: 'POSTER'
    },
    {
      heading: 'REELS',
      project: projectsData.find((p) => p.id === 'growth-creative-motion') || projectsData[5],
      thumbnail: '/assets/Reel_cover.webp',
      badge: 'REEL'
    },
    {
      heading: '4THRIVES MERCH CONCEPT',
      project: projectsData.find((p) => p.id === '4thrive-merch') || {
        id: '4thrive-merch',
        slug: '4thrive-merch',
        title: '4THRIVE FAN MERCHANDISE',
        category: 'Merchandise & Esports Apparel'
      },
      thumbnail: '/assets/4t_cover.webp',
      badge: 'MERCH'
    },
    {
      heading: 'ARSLAN ASH STICKERS',
      project: projectsData.find((p) => p.id === 'twitch-stream-packaging') || projectsData[6],
      thumbnail: '/assets/Arslan_Ash_cover.webp',
      badge: 'STICKERS'
    },
    {
      heading: 'BAAZ MERCH',
      project: projectsData.find((p) => p.id === 'baaz-merch') || {
        id: 'baaz-merch',
        slug: 'baaz-merch',
        title: 'BAAZ TAKEDOWN 2026 MERCH',
        category: 'Merchandise & Apparel Design'
      },
      thumbnail: '/assets/Baaz Merch/baaz_merch_thumb.webp',
      badge: 'MERCH'
    }
  ];

  return (
    <section id="zenkai-files" className="relative bg-black py-14 sm:py-24 md:py-36 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading matching Screenshot 2 */}
        <div className="text-center mb-8 sm:mb-14 md:mb-16">
          <h2 className="font-heading font-black text-white text-3xl xs:text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase">
            ZENKAI FILES
          </h2>
        </div>

        {/* 3-Column x 2-Row Grid with horizontal cards and thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {blocks.map((block, idx) => (
            <ProjectCard
              key={`${block.heading}-${block.project.id}-${idx}`}
              project={block.project}
              heading={block.heading}
              thumbnail={block.thumbnail}
              badge={block.badge}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
