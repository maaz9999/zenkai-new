import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Check,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tv,
  Layers,
  Columns2,
  LayoutGrid
} from 'lucide-react';

/**
 * TwitchPackagingShowcase Component
 * Interactive Studio Switcher & Tactile Vinyl Sticker Mat
 * - Interactive 16:9 Stream Monitor (OBS scene switcher dock for Starting Soon, HUD, Chatting, Ending, Offline)
 * - Tactile 3D Vinyl Sticker Deck (peel tilt & holographic sheen for 4 chibi characters)
 * - Master Broadcast Identity & Emote Suite (Frames 1, 2, 3)
 * - Clean layout toggle (Studio Experience vs All Assets Grid)
 * - Fullscreen 16:9 & vector Lightbox
 */
export default function TwitchPackagingShowcase({
  project,
  handleShare,
  copied,
  nextProject,
  prevProject
}) {
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'grid'
  const [activeSceneIndex, setActiveSceneIndex] = useState(1); // default to In-Game HUD (Frame 5)
  const [isHoloFoil, setIsHoloFoil] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allAssets = project.presentationSections || [];

  // 5 Broadcast Scenes for the OBS Monitor
  const broadcastScenes = useMemo(() => [
    {
      id: 'starting-soon',
      label: 'Starting Soon',
      frame: 'Frame 04',
      badge: 'COUNTDOWN SCENE',
      image: '/assets/Twitch emote presentation/Frame 4.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'in-game-hud',
      label: 'In-Game HUD & Cam',
      frame: 'Frame 05',
      badge: 'COMPETITIVE HUD',
      image: '/assets/Twitch emote presentation/Frame 5.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'just-chatting',
      label: 'Just Chatting',
      frame: 'Frame 06',
      badge: 'INTERMISSION',
      image: '/assets/Twitch emote presentation/Frame 6.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'stream-ending',
      label: 'Stream Ending',
      frame: 'Frame 07',
      badge: 'OUTRO CREDITS',
      image: '/assets/Twitch emote presentation/Frame 7.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 'offline-banner',
      label: 'Offline Header',
      frame: 'Frame 08',
      badge: 'CHANNEL BANNER',
      image: '/assets/Twitch emote presentation/Frame 8.jpg',
      aspect: 'aspect-[16/9]'
    }
  ], []);

  // 4 Chibi Die-Cut Stickers
  const chibiStickers = useMemo(() => [
    {
      id: 'sticker-1',
      title: 'ARSLAN 8X EVO TROPHY',
      character: 'Arslan Ash World Champion',
      image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 1.png',
      badge: '8X EVO TROPHY',
      accent: '#FFC15C'
    },
    {
      id: 'sticker-2',
      title: '4THRIVE TIGER MASCOT',
      character: 'Team Bengal Mascot',
      image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 2.png',
      badge: 'VICTORY EMOTE',
      accent: '#FF7348'
    },
    {
      id: 'sticker-3',
      title: 'SHADOW KITSUNE NINJA',
      character: 'Masked Anime Assassin',
      image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 3.png',
      badge: 'NINJA CHIBI',
      accent: '#DA2086'
    },
    {
      id: 'sticker-4',
      title: 'FALAK GAMING MASCOT',
      character: 'Tournament Cheer Mascot',
      image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 4.png',
      badge: 'CHEER EMOTE',
      accent: '#9146FF'
    }
  ], []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % allAssets.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + allAssets.length) % allAssets.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allAssets.length]);

  // 3D Tilt handler for sticker cards
  const handleStickerMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
  };

  const handleStickerMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="relative w-full text-white">

      {/* =========================================================================
          1. SLEEK MINIMAL HEADER & VIEW SWITCHER
          ========================================================================= */}
      <section className="relative mb-8 sm:mb-10">
        <div className="relative bg-[#0c0514]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9146FF] via-[#FF7348] to-[#FFC15C]" />

          {/* Eyebrow & Meta info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                to="/#zenkai-files"
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/15 text-white/90 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer shadow-sm"
                title="Back to Zenkai Portfolio"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#FFC15C]" />
                <span className="hidden sm:inline">Back to Portfolio</span>
                <span className="sm:hidden">Back</span>
              </Link>

              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10">
                <span className="text-xs uppercase font-mono font-extrabold tracking-widest text-[#C89BFF]">
                  {project.category || 'Stream Visuals, Emotes & Channel Branding'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-white/60">
              <span className="text-white/80">Arslan Ash (8x EVO Champion) & Twitch</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">12 ASSETS</span>

              <button
                onClick={handleShare}
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                title="Share link"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3 text-[#FF7348]" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight mb-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                ARSLAN ASH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9146FF] via-[#FF7348] to-[#FFC15C]">
                  TWITCH BROADCAST & STICKERS
                </span>
              </h1>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                Broadcast overlay systems, interactive subscriber emotes, loyalty badges, and exclusive chibi character stickers engineered for 8x EVO World Champion Arslan Ash.
              </p>
            </div>

            {/* Layout Mode Selector (Studio Mode vs Grid View) */}
            <div className="flex items-center gap-1.5 bg-black/50 border border-white/15 p-1 rounded-2xl shrink-0 self-start md:self-end">
              <button
                onClick={() => setViewMode('studio')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'studio'
                    ? 'bg-gradient-to-r from-[#9146FF] to-[#FF7348] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Studio View</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#9146FF] to-[#FF7348] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Assets (12)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIEW MODE A: INTERACTIVE STUDIO MODE (SWITCHER & STICKER MAT)
          ========================================================================= */}
      {viewMode === 'studio' ? (
        <div className="space-y-12 sm:space-y-16 mb-20">
          
          {/* ---------------------------------------------------------------------
              PART 1: THE INTERACTIVE OBS BROADCAST MONITOR
              --------------------------------------------------------------------- */}
          <section className="relative bg-[#0c0517]/95 border border-white/15 rounded-3xl p-5 sm:p-7 lg:p-9 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Monitor Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-white/90">
                  OBS BROADCAST MONITOR
                </span>
                <span className="hidden sm:inline text-white/30 font-mono text-xs">/</span>
                <span className="hidden sm:inline text-xs font-mono font-bold text-[#FFC15C]">
                  {broadcastScenes[activeSceneIndex].frame} · {broadcastScenes[activeSceneIndex].label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const idx = allAssets.findIndex((a) => a.image === broadcastScenes[activeSceneIndex].image);
                    if (idx !== -1) setLightboxIndex(idx);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                  title="Inspect Master 1080p Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                  <span>Inspect Full Res</span>
                </button>
              </div>
            </div>

            {/* Main Active 16:9 Screen Display */}
            <div
              onClick={() => {
                const idx = allAssets.findIndex((a) => a.image === broadcastScenes[activeSceneIndex].image);
                if (idx !== -1) setLightboxIndex(idx);
              }}
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] cursor-zoom-in group/screen flex items-center justify-center mb-6"
            >
              <img
                key={broadcastScenes[activeSceneIndex].id}
                src={broadcastScenes[activeSceneIndex].image}
                alt={broadcastScenes[activeSceneIndex].label}
                className="w-full h-full object-contain object-center transition-all duration-500 animate-fadeIn group-hover/screen:scale-[1.01]"
              />

              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Hover Zoom overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/90 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 shadow-2xl">
                  <Maximize2 className="w-4 h-4 text-[#FF7348]" />
                  <span>View Full 1080p Asset</span>
                </div>
              </div>
            </div>

            {/* The OBS Switcher Dock: Clickable Mini Previews */}
            <div>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold block mb-2.5">
                CLICK TO SWITCH BROADCAST SCENE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                {broadcastScenes.map((scene, idx) => {
                  const isActive = activeSceneIndex === idx;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => setActiveSceneIndex(idx)}
                      className={`group/dock relative rounded-xl overflow-hidden border p-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#9146FF]/20 border-[#FF7348] shadow-[0_0_20px_rgba(255,115,72,0.35)] ring-1 ring-[#FF7348]'
                          : 'bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.08]'
                      }`}
                    >
                      {/* Mini Thumbnail */}
                      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black mb-2">
                        <img
                          src={scene.image}
                          alt={scene.label}
                          className="w-full h-full object-cover object-center group-hover/dock:scale-105 transition-transform"
                        />
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-[#FFC15C] pointer-events-none" />
                        )}
                      </div>

                      {/* Scene Label */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-mono font-bold text-white uppercase truncate">
                          {scene.label}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#FF7348] animate-pulse' : 'bg-white/20'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              PART 2: TACTILE VINYL CHIBI STICKER MAT (3D TILT & DIE-CUT)
              --------------------------------------------------------------------- */}
          <section className="relative bg-[#0c0517]/95 border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Header & Holographic Foil Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7348]/20 border border-[#FF7348]/40 text-xs font-mono font-bold text-[#FFC15C] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF7348]" />
                  DIE-CUT VINYL ARTWORK
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  CHIBI STICKER COLLECTION
                </h2>
                <p className="text-xs sm:text-sm text-white/60 font-mono mt-0.5">
                  Hover to peel and tilt with 3D perspective · Click to view transparent vector artwork.
                </p>
              </div>

              {/* Holographic Sheen Switch */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                  Holo Foil Sheen:
                </span>
                <button
                  onClick={() => setIsHoloFoil(!isHoloFoil)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer border ${
                    isHoloFoil ? 'bg-gradient-to-r from-[#9146FF] to-[#FF7348] border-white/40' : 'bg-white/10 border-white/20'
                  }`}
                  title="Toggle Holographic Foil Shimmer"
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isHoloFoil ? 'translate-x-8 shadow-[0_0_10px_rgba(255,115,72,0.8)]' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* The 4 Chibi Sticker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {chibiStickers.map((sticker) => (
                <div
                  key={sticker.id}
                  onMouseMove={handleStickerMouseMove}
                  onMouseLeave={handleStickerMouseLeave}
                  onClick={() => {
                    const idx = allAssets.findIndex((a) => a.image === sticker.image);
                    if (idx !== -1) setLightboxIndex(idx);
                  }}
                  className="group relative bg-[#07020e] border border-white/15 hover:border-[#FF7348]/70 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-zoom-in overflow-hidden shadow-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Holographic foil shimmer reflection overlay */}
                  {isHoloFoil && (
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,0,128,0.3) 0%, rgba(0,240,255,0.3) 25%, rgba(255,200,0,0.3) 50%, rgba(145,70,255,0.3) 75%, rgba(255,0,128,0.3) 100%)',
                        backgroundSize: '200% 200%'
                      }}
                    />
                  )}

                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3 z-10">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider"
                      style={{ backgroundColor: `${sticker.accent}20`, color: sticker.accent, border: `1px solid ${sticker.accent}40` }}
                    >
                      {sticker.badge}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">DIE-CUT</span>
                  </div>

                  {/* Die-Cut Transparent Sticker */}
                  <div className="relative aspect-square w-full rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-4 my-2 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-30 blur-xl transition-opacity group-hover:opacity-75"
                      style={{ background: `radial-gradient(circle, ${sticker.accent} 0%, transparent 70%)` }}
                    />
                    <img
                      src={sticker.image}
                      alt={sticker.title}
                      className="w-full h-full object-contain object-center z-10 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] transition-transform duration-300"
                    />
                  </div>

                  {/* Card Title & Character */}
                  <div className="z-10 mt-2">
                    <h3 className="font-heading font-black text-xs uppercase text-white tracking-tight truncate group-hover:text-[#FFC15C] transition-colors">
                      {sticker.title}
                    </h3>
                    <p className="text-[11px] text-white/50 font-mono mt-0.5 truncate">
                      {sticker.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              PART 3: MASTER IDENTITY & EMOTES (FRAMES 1, 2, 3)
              --------------------------------------------------------------------- */}
          <section className="relative bg-[#0c0517]/95 border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#9146FF]/20 border border-[#9146FF]/40 text-xs font-mono font-bold text-[#C89BFF] uppercase tracking-wider mb-2">
                  CHANNEL ARTWORKS & SUITES
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  MASTER SUITE & EMOTE SHEETS
                </h2>
              </div>
            </div>

            {/* Balanced 3-Card Grid (Zero dead space, identical height & aspect ratio) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              
              {/* Card 1: Master Suite (Frame 1) */}
              <div
                onClick={() => {
                  const idx = allAssets.findIndex((a) => a.title.includes('MASTER'));
                  if (idx !== -1) setLightboxIndex(idx);
                }}
                className="group bg-black/60 rounded-2xl overflow-hidden border border-white/15 hover:border-[#FF7348]/60 shadow-xl transition-all cursor-zoom-in flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full bg-[#05020a] overflow-hidden">
                  <img
                    src="/assets/Twitch emote presentation/Frame 1.jpg"
                    alt="Master Stream Packaging"
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold uppercase text-[#FFC15C]">
                    MASTER SUITE
                  </div>
                </div>
                <div className="p-4 bg-neutral-950 flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="font-heading font-black text-sm uppercase text-white truncate">
                      MASTER STREAM PACKAGING
                    </h4>
                    <p className="text-xs text-white/60 font-mono truncate">
                      Frame 01 // Master Broadcast Identity
                    </p>
                  </div>
                  <Maximize2 className="w-4 h-4 text-[#FF7348] shrink-0 ml-2" />
                </div>
              </div>

              {/* Card 2: Emote Suite (Frame 2) */}
              <div
                onClick={() => {
                  const idx = allAssets.findIndex((a) => a.title.includes('EMOTE'));
                  if (idx !== -1) setLightboxIndex(idx);
                }}
                className="group bg-black/60 rounded-2xl overflow-hidden border border-white/15 hover:border-[#FF7348]/60 shadow-xl transition-all cursor-zoom-in flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full bg-[#05020a] overflow-hidden">
                  <img
                    src="/assets/Twitch emote presentation/Frame 2.jpg"
                    alt="Custom Emote Character Set"
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold uppercase text-[#FFC15C]">
                    EMOTE SUITE
                  </div>
                </div>
                <div className="p-4 bg-neutral-950 flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="font-heading font-black text-sm uppercase text-white truncate">
                      CUSTOM EMOTE CHARACTER SET
                    </h4>
                    <p className="text-xs text-white/60 font-mono truncate">
                      Frame 02 // Interactive Twitch Emotes
                    </p>
                  </div>
                  <Maximize2 className="w-4 h-4 text-[#FF7348] shrink-0 ml-2" />
                </div>
              </div>

              {/* Card 3: Sub Badges (Frame 3) */}
              <div
                onClick={() => {
                  const idx = allAssets.findIndex((a) => a.title.includes('LOYALTY') || a.title.includes('BADGES'));
                  if (idx !== -1) setLightboxIndex(idx);
                }}
                className="group bg-black/60 rounded-2xl overflow-hidden border border-white/15 hover:border-[#FF7348]/60 shadow-xl transition-all cursor-zoom-in flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full bg-[#05020a] overflow-hidden">
                  <img
                    src="/assets/Twitch emote presentation/Frame 3.jpg"
                    alt="Loyalty Badges & Sub Tiers"
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold uppercase text-[#FFC15C]">
                    SUB BADGES
                  </div>
                </div>
                <div className="p-4 bg-neutral-950 flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="font-heading font-black text-sm uppercase text-white truncate">
                      LOYALTY BADGES & SUB TIERS
                    </h4>
                    <p className="text-xs text-white/60 font-mono truncate">
                      Frame 03 // Tiered Subscriber Badges
                    </p>
                  </div>
                  <Maximize2 className="w-4 h-4 text-[#FF7348] shrink-0 ml-2" />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* =========================================================================
            VIEW MODE B: CLEAN ALL-ASSETS GRID (12 ITEMS)
            ========================================================================= */
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {allAssets.map((item, idx) => {
              const isSticker = item.badge && item.badge.includes('STICKER');
              return (
                <div
                  key={idx}
                  className="group relative bg-[#0c0514]/95 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 hover:border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-full ${isSticker ? 'aspect-[4/3] p-8' : 'aspect-[16/9] p-2 sm:p-3'} bg-[#080310] overflow-hidden cursor-zoom-in flex items-center justify-center`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className={`w-full h-full ${isSticker ? 'object-contain max-h-[85%] drop-shadow-2xl' : 'object-contain'} object-center rounded-xl transition-transform duration-500 group-hover:scale-[1.02]`}
                    />
                    {item.badge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-[#FFC15C] shadow-lg">
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                        <span>View Full Res</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-950/95 border-t border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-white leading-tight truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/60 font-medium truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => setLightboxIndex(idx)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
                      title="Open Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          5. FULLSCREEN LIGHTBOX
          ========================================================================= */}
      {lightboxIndex !== null && allAssets[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Control Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between gap-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-[#FFC15C]">
                Asset {lightboxIndex + 1} of {allAssets.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
          </div>

          {/* Main Inspection Stage */}
          <div
            className="relative w-full max-w-5xl my-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + allAssets.length) % allAssets.length);
              }}
              className="absolute -left-3 sm:-left-6 lg:-left-12 p-3 rounded-full bg-black/75 hover:bg-[#9146FF] border border-white/20 text-white transition-all cursor-pointer z-20"
              aria-label="Previous Asset"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Canvas */}
            <div className="w-full max-h-[75vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-black flex items-center justify-center p-3">
              <img
                src={allAssets[lightboxIndex].image}
                alt={allAssets[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain object-center"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % allAssets.length);
              }}
              className="absolute -right-3 sm:-right-6 lg:-right-12 p-3 rounded-full bg-black/75 hover:bg-[#9146FF] border border-white/20 text-white transition-all cursor-pointer z-20"
              aria-label="Next Asset"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-4xl bg-neutral-950/90 border border-white/15 backdrop-blur-xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="font-heading font-black text-base sm:text-xl uppercase tracking-tight text-white mb-1">
                {allAssets[lightboxIndex].title}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                {allAssets[lightboxIndex].subtitle}
              </p>
            </div>

            {allAssets[lightboxIndex].badge && (
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#9146FF] to-[#FF7348] text-white font-mono font-black text-xs uppercase tracking-wider shrink-0 shadow-lg">
                {allAssets[lightboxIndex].badge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          6. BOTTOM NAVIGATION: PREVIOUS / NEXT PROJECT
          ========================================================================= */}
      <section className="pt-12 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {prevProject && (
            <Link
              to={`/work/${prevProject.slug}`}
              className="group p-6 rounded-3xl bg-[#0c0514]/90 border border-white/15 hover:border-white/30 transition-all flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-[#9146FF] group-hover:text-white flex items-center justify-center transition-all shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold block mb-1">
                  Previous Project
                </span>
                <h4 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-white group-hover:text-[#FFC15C] transition-colors truncate">
                  {prevProject.title}
                </h4>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/work/${nextProject.slug}`}
              className="group p-6 rounded-3xl bg-[#0c0514]/90 border border-white/15 hover:border-white/30 transition-all flex items-center justify-between gap-4 cursor-pointer text-right"
            >
              <div className="min-w-0 text-left sm:text-right">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold block mb-1">
                  Next Project
                </span>
                <h4 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-white group-hover:text-[#FFC15C] transition-colors truncate">
                  {nextProject.title}
                </h4>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-[#FF7348] group-hover:text-white flex items-center justify-center transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
