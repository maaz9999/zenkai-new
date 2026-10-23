import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Download,
  ListFilter,
  Columns2,
  Play,
  Pause,
  Share2,
  Check
} from 'lucide-react';

/**
 * FourThriveMerchShowcase Component
 * Premier Esports Merchandise Case Study & Interactive Studio Simulator
 * Modeled on the high-impact split-screen Thumbnail UI architecture:
 * - Top Shell Bar (Zenkai brand emblem, Search bar, Autoplay & PDF Download actions)
 * - Category Filter Chips Bar (All, Case Deck, Chibi Avatars, 3D Figurines, Plushie, Credits)
 * - Main 2-Column Split:
 *   - LEFT COLUMN (lg:col-span-8): Featured 16:9 Screen (Pristine artwork, floating chevrons, fullscreen zoom)
 *   - RIGHT COLUMN (lg:col-span-4): Case Files Selector Sidebar (List vs 2-Col Mini Grid view, instant slide swap)
 * - Fullscreen 16:9 Lightbox with keyboard navigation
 */
export default function FourThriveMerchShowcase({
  project,
  handleShare,
  copied,
  nextProject,
  prevProject
}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sidebarLayout, setSidebarLayout] = useState('list'); // 'list' | 'grid'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 16 Master Case Files with verified artboards and authentic lore
  const caseFiles = useMemo(() => [
    {
      id: 'who-are-4thrives',
      index: 0,
      page: 'Page 01',
      pageNumber: '01 / 16',
      badge: 'THE TEAM',
      title: 'WHO ARE 4THRIVES?',
      subtitle: 'Pakistan-Based PUBG Mobile Esports Team — South Asian Scene Competitors & Story',
      image: '/assets/4thrive Merch/3.jpg',
      category: 'case-deck',
      lore: '4THRIVE is a competitive PUBG Mobile squad from Pakistan making waves in South Asian esports tournaments. This merchandise initiative was designed to give the team a distinct brand universe, uniting their competitive identity with fan-accessible streetwear and collectables.',
      tags: ['#4THRIVE', '#PUBGMobile', '#TeamOrigin', '#EsportsPakistan']
    },
    {
      id: 'project-overview',
      index: 1,
      page: 'Page 02',
      pageNumber: '02 / 16',
      badge: 'THE IDEA',
      title: 'PROJECT OVERVIEW & THE IDEA',
      subtitle: 'Transforming PUBG Mobile Esports Players into a Complete Fan Merchandise Collection',
      image: '/media/4thrive_overview.jpg',
      category: 'case-deck',
      lore: 'The creative challenge was turning five hardcore in-game tournament athletes into cute, instantly recognizable anime-style chibi characters while retaining their signature in-game personalities, gear preferences, and playstyles.',
      tags: ['#CreativeDirection', '#ChibiMascot', '#BrandIdentity', '#FanMerch']
    },
    {
      id: 'concept-cover',
      index: 2,
      page: 'Page 03',
      pageNumber: '03 / 16',
      badge: 'CONCEPT COVER',
      title: '4THRIVE FAN MERCHANDISE CONCEPT',
      subtitle: 'Official Pitch Deck Title Slide & Visual Identity Cover',
      image: '/assets/4t_cover.webp?v=full',
      category: 'case-deck',
      lore: 'Official pitch deck cover establishing the 4THRIVE visual identity system — bold energetic orange, neon magenta, and royal violet palette tailored for high-energy esports fans and convention releases.',
      tags: ['#CoverDesign', '#PitchDeck', '#VisualIdentity', '#Typography']
    },
    {
      id: 'master-lineup',
      index: 3,
      page: 'Page 04',
      pageNumber: '04 / 16',
      badge: 'COLLECTION LINEUP',
      title: 'MASTER MERCHANDISE LINEUP',
      subtitle: 'Complete Fan Gear Suite — Hoodies, Deskmat, Phone Covers, Keychains & Backpacks',
      image: '/assets/4thrive Merch/Artboard 21.png',
      category: 'case-deck',
      lore: 'A comprehensive collection spread featuring team oversized fleece hoodies, ergonomic stitched-edge gaming deskmats, impact-resistant phone cases, custom silicone keychains, and tournament backpacks.',
      tags: ['#MerchandiseSuite', '#EsportsApparel', '#GamingDeskmat', '#Streetwear']
    },
    {
      id: 'avatars-iq-nocki',
      index: 4,
      page: 'Page 05',
      pageNumber: '05 / 16',
      badge: 'AVATARS & LORE',
      title: 'ORIGINAL AVATARS — IQ & NOCKI',
      subtitle: '4THRIVE IQ (Tactical Power-Radar) & 4THRIVE NOCKI (Superman Clutch Hero)',
      image: '/assets/4thrive Merch/Artboard 4.jpg',
      category: 'avatars',
      lore: 'Character breakdown highlighting 4THRIVE IQ as the calm battlefield strategist equipped with holographic radar optics, alongside 4THRIVE NOCKI, renowned for heroic 1v3 clutch saves represented by his flowing superhero cape.',
      tags: ['#CharacterDesign', '#ChibiIQ', '#ChibiNocki', '#PUBGMobileClutch']
    },
    {
      id: 'avatars-huzaifa-falak',
      index: 5,
      page: 'Page 06',
      pageNumber: '06 / 16',
      badge: 'AVATARS & LORE',
      title: 'ORIGINAL AVATARS — HUZAIFA & FALAK',
      subtitle: '4THRIVE HUZAIFA (M16 Rifleman) & 4THRIVE FALAK (The Aggressive Tiger)',
      image: '/assets/4thrive Merch/Artboard 5.png',
      category: 'avatars',
      lore: 'Character designs for 4THRIVE HUZAIFA, carrying his signature burst-fire M16 assault rifle, and 4THRIVE FALAK, embodying the ferocious agility and striking speed of a predator tiger.',
      tags: ['#CharacterDesign', '#ChibiHuzaifa', '#ChibiFalak', '#TigerMascot']
    },
    {
      id: 'figurine-falak',
      index: 6,
      page: 'Page 07',
      pageNumber: '07 / 16',
      badge: '3D FIGURINE',
      title: '3D FIGURINE — FALAK (THE TIGER)',
      subtitle: 'Tiger Chibi 3D Collectable Toy & Front/Back Rotations',
      image: '/assets/4thrive Merch/Artboard 9.png',
      category: 'figurines',
      lore: 'Front and rear turnaround renders for the Falak 3D vinyl collectable figurine, highlighting custom striped tail detailing, team ear-hoodie crest, and weighted desktop display base.',
      tags: ['#3DCollectable', '#VinylFigurine', '#FalakTiger', '#ProductDesign']
    },
    {
      id: 'figurine-nocki',
      index: 7,
      page: 'Page 08',
      pageNumber: '08 / 16',
      badge: '3D FIGURINE',
      title: '3D FIGURINE — NOCKI (SUPERMAN)',
      subtitle: 'Superman Cape Clutch Hero 3D Collectable Figurine (Front & Back Rotations)',
      image: '/assets/4thrive Merch/Artboard 11.png',
      category: 'figurines',
      lore: 'Vinyl collectable toy model showcasing Nocki with his flowing crimson superhero cape, heroic fist pose, and glossy finish on the 4THRIVE tournament jersey.',
      tags: ['#3DFigurine', '#NockiSuperman', '#ClutchHero', '#EsportsToys']
    },
    {
      id: 'figurine-t240p',
      index: 8,
      page: 'Page 09',
      pageNumber: '09 / 16',
      badge: '3D FIGURINE',
      title: '3D FIGURINE — T240P (VANGUARD SHIELD)',
      subtitle: 'Vanguard Shield Defender 3D Collectable Figurine (Front & Back Rotations)',
      image: '/assets/4thrive Merch/Artboard 19.png',
      category: 'figurines',
      lore: '3D toy rendering of T240P, the squad vanguard and tactical anchor. Features an oversized heavy riot shield bearing the 4THRIVE crest and defensive battle posture.',
      tags: ['#3DCollectable', '#T240PShield', '#Vanguard', '#ChibiVinyl']
    },
    {
      id: 'figurine-huzaifa',
      index: 9,
      page: 'Page 10',
      pageNumber: '10 / 16',
      badge: '3D FIGURINE',
      title: '3D FIGURINE — HUZAIFA (M16 RIFLE)',
      subtitle: 'Tactical M16 Assault Rifleman 3D Collectable Figurine (Front & Back Rotations)',
      image: '/assets/4thrive Merch/Artboard 10.png',
      category: 'figurines',
      lore: 'Turnaround perspective for Huzaifa, showing the scoped M16 rifle slung over the shoulder, high-top tournament sneakers, and stylized anime eye reflections.',
      tags: ['#3DFigurine', '#HuzaifaM16', '#Marksman', '#VinylCollectable']
    },
    {
      id: 'figurine-iq',
      index: 10,
      page: 'Page 11',
      pageNumber: '11 / 16',
      badge: '3D FIGURINE',
      title: '3D FIGURINE — IQ (TACTICAL EYE)',
      subtitle: 'Tactical Power-Radar Mastermind 3D Collectable Figurine (Front & Back Rotations)',
      image: '/assets/4thrive Merch/Artboard 8.png',
      category: 'figurines',
      lore: 'Mastermind squad captain IQ rendered in 3D vinyl with translucent amber-tinted scouter eyepiece, confident leadership stance, and custom base plate.',
      tags: ['#3DFigurine', '#IQCaptain', '#TacticalIGL', '#VinylToy']
    },
    {
      id: 'plushie-concept',
      index: 11,
      page: 'Page 12',
      pageNumber: '12 / 16',
      badge: 'PLUSHIE SPEC',
      title: 'MASCOT PLUSHIE — DESIGN CONCEPT',
      subtitle: 'Tiger Mascot Anatomy, Jersey Detailing & Materials Specification',
      image: '/assets/4thrive Merch/Artboard 13.png',
      category: 'plushie',
      lore: 'Factory-ready plushie schematic specifying dimensions, hypoallergenic ultra-soft polyester velvet fabric, reinforced seam stitching, and screen-printed team number.',
      tags: ['#PlushieDesign', '#MascotToy', '#ProductSpec', '#FabricDetail']
    },
    {
      id: 'plushie-toy',
      index: 12,
      page: 'Page 13',
      pageNumber: '13 / 16',
      badge: '3D PLUSHIE',
      title: '3D TIGER PLUSHIE TOY — FRONT & BACK',
      subtitle: 'High-Fidelity Physical Plushie Toy Render in Team Colors',
      image: '/assets/4thrive Merch/Artboard 14.png',
      category: 'plushie',
      lore: 'Photorealistic 3D render of the plush toy as a finished physical manufactured item, highlighting soft plush fabric textures, 3D stitched ears, and embroidered eyes.',
      tags: ['#PhysicalToy', '#3DPlushie', '#TigerCuddly', '#MerchUnboxing']
    },
    {
      id: 'sticker-pack',
      index: 13,
      page: 'Page 14',
      pageNumber: '14 / 16',
      badge: 'STICKER PACK',
      title: 'DIE-CUT FAN STICKER PACK',
      subtitle: 'Holographic Vinyl Stickers & Emote Decals',
      image: '/assets/4thrive Merch/Artboard 16.png',
      category: 'plushie',
      lore: 'Die-cut weather-resistant vinyl stickers featuring all five player chibi emotes, squad slogans, tournament logos, and holographic border finishes for fan laptop & phone customization.',
      tags: ['#StickerPack', '#DieCutVinyl', '#Holographic', '#FanDecals']
    },
    {
      id: 'avatar-banner',
      index: 14,
      page: 'Page 15',
      pageNumber: '15 / 16',
      badge: 'DIVIDER',
      title: 'ORIGINAL AVATAR BANNER',
      subtitle: 'Original Character Avatars Chapter Divider',
      image: '/assets/4thrive Merch/4.jpg',
      category: 'avatars',
      lore: 'Graphic editorial divider showcasing the full 5-player chibi lineup arranged in a dynamic anime battle charge formation across vibrant team gradient backgrounds.',
      tags: ['#SquadBanner', '#Lineup', '#AnimeArt', '#ChapterDivider']
    },
    {
      id: 'credits',
      index: 15,
      page: 'Page 16',
      pageNumber: '16 / 16',
      badge: 'CREDITS',
      title: 'THANK YOU & CREDITS',
      subtitle: 'Unofficial Concept Showcase by Fatyma Binte Bilal',
      image: '/assets/4thrive Merch/Artboard 22.png',
      category: 'credits',
      lore: 'Project acknowledgments and creative credits outlining the creative vision, 3D modeling, merchandise design, and brand presentation for 4THRIVE Esports.',
      tags: ['#Credits', '#ZenkaiMedia', '#EsportsDesign', '#Portfolio']
    }
  ], []);

  // Filter slides by category and search
  const filteredSlides = useMemo(() => {
    return caseFiles.filter((slide) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = slide.title.toLowerCase().includes(q);
        const matchesSubtitle = slide.subtitle.toLowerCase().includes(q);
        const matchesBadge = slide.badge.toLowerCase().includes(q);
        const matchesTags = slide.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesBadge && !matchesTags) return false;
      }

      // Category filter
      if (activeCategory === 'all') return true;
      return slide.category === activeCategory;
    });
  }, [caseFiles, activeCategory, searchQuery]);

  // Active slide
  const activeSlide = caseFiles[activeSlideIndex] || caseFiles[0];

  // Category counts
  const counts = useMemo(() => ({
    all: caseFiles.length,
    deck: caseFiles.filter((s) => s.category === 'case-deck').length,
    avatars: caseFiles.filter((s) => s.category === 'avatars').length,
    figurines: caseFiles.filter((s) => s.category === 'figurines').length,
    plushie: caseFiles.filter((s) => s.category === 'plushie').length,
    credits: caseFiles.filter((s) => s.category === 'credits').length
  }), [caseFiles]);

  // Next / Previous Handlers
  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % caseFiles.length);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + caseFiles.length) % caseFiles.length);
  };

  // Autoplay Effect (4.5s interval)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, activeSlideIndex, caseFiles.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % caseFiles.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + caseFiles.length) % caseFiles.length);
        }
      } else {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === ' ') {
          e.preventDefault();
          setIsPlaying((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, caseFiles.length, activeSlideIndex]);

  return (
    <div className="w-full text-white mb-16">

      {/* =========================================================================
          1. 4THRIVE STUDIO SHELL (MODELED ON THUMBNAIL UI ARCHITECTURE)
          ========================================================================= */}
      <div className="relative rounded-3xl bg-[#0c0517] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Top App Bar */}
        <div className="h-14 px-3 sm:px-6 bg-[#0c0517] border-b border-white/10 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Back to Portfolio + Brand & Project Heading */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/#zenkai-files"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/15 text-white/90 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer shadow-sm"
              title="Back to Zenkai Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#FFC15C]" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 p-1 flex items-center justify-center ring-2 ring-[#FF6428]/40 shrink-0">
                <img
                  src="/assets/zenkai-emblem.png"
                  alt="Zenkai Media"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-black text-base sm:text-lg tracking-tight text-white">
                4THRIVE
              </span>
              <span className="text-[10px] text-[#FFC15C] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/15 hidden xs:inline">
                MERCH SUITE
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artboards, characters, items..."
                className="w-full bg-white/[0.05] border border-white/15 rounded-full py-1.5 pl-9 pr-8 text-xs font-sans text-white placeholder-white/40 focus:outline-none focus:border-[#FF6428] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Autoplay / Present Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-r from-[#FF6428] to-[#DE2288] text-white shadow-md'
                  : 'bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white/80'
              }`}
              title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay Slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-white" />
                  <span className="hidden sm:inline">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#FFC15C]" />
                  <span className="hidden sm:inline">Autoplay</span>
                </>
              )}
            </button>

            {/* Direct Pitch Deck Download */}
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                title="Download Master Pitch Deck PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#FF6428]" />
                <span className="hidden md:inline">Download Deck</span>
              </a>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
              title="Share showcase link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#080210] border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: `All Files (${counts.all})` },
            { id: 'case-deck', label: `Project Case (${counts.deck})` },
            { id: 'avatars', label: `Chibi Avatars (${counts.avatars})` },
            { id: 'figurines', label: `3D Figurines (${counts.figurines})` },
            { id: 'plushie', label: `Plushie & Stickers (${counts.plushie})` },
            { id: 'credits', label: `Credits (${counts.credits})` }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveCategory(chip.id);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === chip.id
                  ? 'bg-gradient-to-r from-[#FF6428] to-[#DE2288] text-white font-bold shadow-md'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* =========================================================================
            MAIN CONTENT: FEATURED PREVIEW ON LEFT + SELECTOR SIDEBAR ON RIGHT
            ========================================================================= */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ===================================================================
                LEFT COLUMN: FEATURED PREVIEW CANVAS (CLEAN 16:9 ARTWORK)
                =================================================================== */}
            <div className="lg:col-span-8 flex flex-col">
              
              {/* 16:9 Featured Artwork Screen */}
              <div
                onClick={() => setLightboxIndex(activeSlide.index)}
                className="group relative aspect-[16/9] w-full rounded-2xl bg-black overflow-hidden shadow-2xl border border-white/10 hover:border-[#FF6428]/50 transition-all cursor-pointer flex items-center justify-center"
              >
                {/* Clean Artboard Image */}
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-contain bg-black group-hover:scale-[1.008] transition-transform duration-500"
                />

                {/* Floating Chevron Arrow - Left */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 hover:border-[#FF6428] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 cursor-pointer group/arrow"
                  title="Previous Slide (←)"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover/arrow:text-[#FF6428] transition-colors" />
                </button>

                {/* Floating Chevron Arrow - Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 hover:border-[#FF6428] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 cursor-pointer group/arrow"
                  title="Next Slide (→)"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover/arrow:text-[#FF6428] transition-colors" />
                </button>

                {/* Top-Right Inspect Fullscreen Action */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(activeSlide.index);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-black transition-colors shadow-lg"
                    title="Inspect Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF6428]" />
                    <span>Inspect Artwork</span>
                  </button>
                </div>

                {/* Bottom-Right Page Counter */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white/90 font-mono text-xs font-bold shadow-md pointer-events-none">
                  {activeSlide.pageNumber}
                </span>
              </div>

              {/* Slide Context & Engagement Info Below Artwork */}
              <div className="mt-4">
                
                {/* Title */}
                <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-white leading-tight">
                  {activeSlide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-white/60 font-mono mt-1">
                  {activeSlide.subtitle}
                </p>

                {/* Channel / Team Info Row & Actions */}
                <div className="mt-4 pb-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Team Profile */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-white/20 p-1 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/zenkai-emblem.png"
                        alt="4THRIVE Org"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-sm text-white uppercase tracking-tight">
                          4THRIVE ESPORTS
                        </span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#FF6428] text-[9px] text-white flex items-center justify-center font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs text-white/50 font-mono">
                        PUBG Mobile South Asia Division · Fan Merch Suite
                      </span>
                    </div>

                    {/* Badge Pill */}
                    <span className="ml-2 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-white/[0.08] border border-white/15 text-[#FFC15C]">
                      {activeSlide.badge}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrev}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                      title="Previous Slide"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#FF6428]" />
                      <span>Prev</span>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                      title="Next Slide"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3 text-[#FF6428]" />
                    </button>

                    {/* Full Res Lightbox Button */}
                    <button
                      onClick={() => setLightboxIndex(activeSlide.index)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-xs font-mono font-bold text-white cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3 text-[#FFC15C]" />
                      <span>Full Res</span>
                    </button>
                  </div>
                </div>

                {/* Project Description & Lore Box */}
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  <p className="font-medium text-white/85 mb-2">
                    {activeSlide.lore}
                  </p>
                  <div className="mt-2 text-white/50 flex flex-wrap gap-2 font-mono text-xs">
                    {activeSlide.tags.map((tag) => (
                      <span key={tag} className="text-[#FFC15C] hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ===================================================================
                RIGHT COLUMN: CASE FILES SELECTOR SIDEBAR (LIST VS 2-COL GRID)
                =================================================================== */}
            <div className="lg:col-span-4 flex flex-col">
              
              {/* Sidebar Header with Layout Toggle */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                    Case Files ({filteredSlides.length})
                  </h3>
                </div>

                {/* Sidebar Layout Options: List vs 2-Col Mini Grid */}
                <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.08] border border-white/15">
                  <button
                    onClick={() => setSidebarLayout('list')}
                    className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                      sidebarLayout === 'list'
                        ? 'bg-gradient-to-r from-[#FF6428] to-[#DE2288] text-white shadow-md'
                        : 'text-white/50 hover:text-white'
                    }`}
                    title="List View"
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSidebarLayout('grid')}
                    className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                      sidebarLayout === 'grid'
                        ? 'bg-gradient-to-r from-[#FF6428] to-[#DE2288] text-white shadow-md'
                        : 'text-white/50 hover:text-white'
                    }`}
                    title="Mini Grid View"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Thumbnails / Case Files Container */}
              {sidebarLayout === 'list' ? (
                /* OPTION A: LIST VIEW (HORIZONTAL CARDS) */
                <div className="space-y-2.5 max-h-[640px] lg:max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredSlides.map((item) => {
                    const isSelected = item.index === activeSlide.index;
                    return (
                      <div
                        key={`sidebar-list-${item.id}`}
                        onClick={() => setActiveSlideIndex(item.index)}
                        className={`group flex gap-3 p-2.5 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white/[0.08] border-[#FF6428] shadow-[0_0_25px_rgba(255,100,40,0.25)]'
                            : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Mini 16:9 Thumbnail Image */}
                        <div className="relative w-32 aspect-[16/9] rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/85 text-white font-mono text-[9px] font-semibold">
                            {item.pageNumber}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-[#FF6428] text-white font-mono text-[8px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-[#FFC15C] uppercase block mb-0.5 truncate">
                              {item.badge}
                            </span>
                            <h4
                              className={`font-heading font-black text-xs uppercase leading-tight line-clamp-2 transition-colors ${
                                isSelected ? 'text-[#FFC15C]' : 'text-white group-hover:text-[#FFC15C]'
                              }`}
                            >
                              {item.title}
                            </h4>
                          </div>
                          <span className="text-[10px] text-white/50 font-mono block truncate mt-1">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* OPTION B: MINI GRID VIEW (2-COLUMN CARDS) */
                <div className="grid grid-cols-2 gap-2.5 max-h-[640px] lg:max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredSlides.map((item) => {
                    const isSelected = item.index === activeSlide.index;
                    return (
                      <div
                        key={`sidebar-grid-${item.id}`}
                        onClick={() => setActiveSlideIndex(item.index)}
                        className={`group flex flex-col p-2 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-white/[0.08] border-[#FF6428] shadow-[0_0_25px_rgba(255,100,40,0.25)]'
                            : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black mb-1.5 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/85 text-white font-mono text-[9px] font-semibold">
                            {item.pageNumber}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-[#FF6428] text-white font-mono text-[8px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-[8px] font-mono font-bold text-[#FFC15C] uppercase block mb-0.5 truncate">
                          {item.badge}
                        </span>
                        <h4
                          className={`font-heading font-black text-[11px] leading-tight uppercase line-clamp-2 transition-colors ${
                            isSelected ? 'text-[#FFC15C]' : 'text-white group-hover:text-[#FFC15C]'
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
          2. FULLSCREEN 16:9 LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with Title & Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-xs font-mono font-bold text-[#FFC15C]">
                {caseFiles[lightboxIndex]?.pageNumber || `${lightboxIndex + 1} / ${caseFiles.length}`}
              </span>
              <span className="font-heading font-black text-sm uppercase text-white hidden sm:inline">
                {caseFiles[lightboxIndex]?.title}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + caseFiles.length) % caseFiles.length);
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            title="Previous (←)"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Center Lightbox Image */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={caseFiles[lightboxIndex]?.image}
              alt={caseFiles[lightboxIndex]?.title || 'Fullscreen Artboard'}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % caseFiles.length);
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            title="Next (→)"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

    </div>
  );
}
