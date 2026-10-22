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
  Share2,
  Check,
  Columns2,
  LayoutGrid,
  Trophy,
  Swords,
  Sparkles,
  Flame,
  ListFilter,
  Eye,
  Tv
} from 'lucide-react';

/**
 * PostersShowcase Component
 * Premier Esports Tournament Posters & Key Art Studio:
 * - Minimal, immediate top bar (no giant 350px box pushing content below the fold)
 * - Hero Poster Stage on Left (Pristine 3:4 portrait visual with high-res zoom)
 * - Interactive Poster Deck on Right (All 14 Posters, 2-Col Grid or List, click to swap active poster)
 * - Category filter chips: All (14), Championships, Matchday, Athletes
 * - Layout Switcher: 'stage' (Hero + Deck) vs 'wall' (Full 2-Column Exhibition Wall)
 * - Fullscreen uncompressed 3:4 Lightbox
 */
export default function PostersShowcase({
  project,
  handleShare,
  copied,
  nextProject,
  prevProject
}) {
  const [activePosterIndex, setActivePosterIndex] = useState(0);
  const [viewMode, setViewMode] = useState('stage'); // 'stage' (Hero + Deck) | 'wall' (Full Grid)
  const [deckLayout, setDeckLayout] = useState('grid'); // 'grid' | 'list' for right sidebar
  const [wallColumns, setWallColumns] = useState(2); // 2-col or 3-col for wall mode
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allPosters = project.presentationSections || [];

  // Categorize posters into clean tournament buckets
  const categorizedPosters = useMemo(() => {
    return allPosters.map((item, index) => {
      const titleLower = (item.title || '').toLowerCase();
      const badgeLower = (item.badge || '').toLowerCase();

      let category = item.category || 'other';
      let icon = Trophy;
      let accent = '#FFC15C';

      if (!item.category) {
        if (
          titleLower.includes('desi') ||
          titleLower.includes('thaigher') ||
          titleLower.includes('world tour') ||
          titleLower.includes('evo') ||
          titleLower.includes('showdown') ||
          badgeLower.includes('grand finals') ||
          badgeLower.includes('champion') ||
          badgeLower.includes('evo') ||
          badgeLower.includes('tournament')
        ) {
          category = 'championships';
          icon = Trophy;
          accent = '#FFC15C';
        } else if (
          titleLower.includes('red bull') ||
          titleLower.includes('capetown') ||
          titleLower.includes('duel') ||
          titleLower.includes('collision') ||
          badgeLower.includes('matchday') ||
          badgeLower.includes('head to head')
        ) {
          category = 'matchday';
          icon = Swords;
          accent = '#FF7348';
        } else if (
          titleLower.includes('roster') ||
          titleLower.includes('arena') ||
          titleLower.includes('farewell') ||
          titleLower.includes('spotlight') ||
          badgeLower.includes('roster') ||
          badgeLower.includes('tribute') ||
          badgeLower.includes('editorial')
        ) {
          category = 'athletes';
          icon = Sparkles;
          accent = '#DA2086';
        }
      } else {
        if (item.category === 'championships') {
          icon = Trophy;
          accent = '#FFC15C';
        } else if (item.category === 'matchday') {
          icon = Swords;
          accent = '#FF7348';
        } else if (item.category === 'athletes') {
          icon = Sparkles;
          accent = '#DA2086';
        }
      }

      return {
        ...item,
        index,
        category,
        icon,
        accent
      };
    });
  }, [allPosters]);

  // Filter based on search and category
  const filteredPosters = useMemo(() => {
    return categorizedPosters.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || '').toLowerCase().includes(q);
        const subtitleMatch = (item.subtitle || '').toLowerCase().includes(q);
        const badgeMatch = (item.badge || '').toLowerCase().includes(q);
        if (!titleMatch && !subtitleMatch && !badgeMatch) return false;
      }

      if (activeCategory === 'all') return true;
      return item.category === activeCategory;
    });
  }, [categorizedPosters, activeCategory, searchQuery]);

  const activePoster = categorizedPosters[activePosterIndex] || categorizedPosters[0] || {};

  // Category counts
  const counts = useMemo(() => {
    return {
      all: categorizedPosters.length,
      championships: categorizedPosters.filter((p) => p.category === 'championships').length,
      matchday: categorizedPosters.filter((p) => p.category === 'matchday').length,
      athletes: categorizedPosters.filter((p) => p.category === 'athletes').length
    };
  }, [categorizedPosters]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % categorizedPosters.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + categorizedPosters.length) % categorizedPosters.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, categorizedPosters.length]);

  return (
    <div className="w-full text-white">
      {/* =========================================================================
          TOURNAMENT POSTERS STUDIO SHELL
          ========================================================================= */}
      <div className="relative rounded-3xl bg-[#0c0514]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Control Bar */}
        <div className="h-14 px-3 sm:px-6 bg-black/60 border-b border-white/10 flex items-center justify-between gap-2 sm:gap-4">
          {/* Back to Portfolio + Branding */}
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
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF7348] to-[#DA2086] flex items-center justify-center text-white shadow-md">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-black text-sm sm:text-lg tracking-tight text-white uppercase">
                TOURNAMENT KEY ART
              </span>
              <span className="text-[10px] text-white/50 font-mono font-bold uppercase ml-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 hidden md:inline">
                {filteredPosters.length} POSTERS
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-xs sm:max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by badge or category..."
                className="w-full bg-white/[0.06] border border-white/10 rounded-full py-1.5 pl-8 pr-7 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#FF7348] transition-colors"
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

          {/* Right Mode Switcher & Share */}
          <div className="inline-flex items-center gap-2">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
              <button
                onClick={() => setViewMode('stage')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'stage'
                    ? 'bg-gradient-to-r from-[#FF7348] to-[#DA2086] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Interactive Stage View"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stage</span>
              </button>
              <button
                onClick={() => setViewMode('wall')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'wall'
                    ? 'bg-gradient-to-r from-[#FF7348] to-[#DA2086] text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Full Exhibition Grid Wall"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exhibition Wall</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-white transition-all cursor-pointer text-xs font-mono font-bold uppercase tracking-wider"
              title="Share Showcase"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 hidden sm:inline">Copied</span>
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
        <div className="px-4 sm:px-6 py-2.5 bg-black/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: `All Posters (${counts.all})` },
            { id: 'championships', label: `🏆 Championships & EVO (${counts.championships})` },
            { id: 'matchday', label: `⚔️ Matchday Duels (${counts.matchday})` },
            { id: 'athletes', label: `⭐ Athlete Tributes (${counts.athletes})` }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveCategory(chip.id);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === chip.id
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/[0.05] hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* =========================================================================
            VIEW MODE 1: INTERACTIVE STAGE (HERO ON LEFT + CLICKABLE DECK ON RIGHT)
            ========================================================================= */}
        {viewMode === 'stage' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* ===================================================================
                  LEFT COLUMN: HERO POSTER STAGE
                  =================================================================== */}
              <div className="lg:col-span-7 flex flex-col items-center">
                {/* 3:4 Hero Poster Display */}
                <div
                  onClick={() => setLightboxIndex(activePoster.index)}
                  className="group relative w-full max-w-lg aspect-[3/4] rounded-2xl sm:rounded-3xl bg-[#080310] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/20 hover:border-[#FF7348]/60 transition-all duration-300 cursor-pointer flex items-center justify-center p-3 sm:p-4"
                >
                  <img
                    src={activePoster.image}
                    alt={activePoster.title}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Hero Metadata Below */}
                <div className="w-full max-w-lg mt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest bg-white/[0.08] border border-white/15 text-[#FFC15C]">
                          {activePoster.badge}
                        </span>
                        <span className="text-white/40 text-xs font-mono">
                          Poster #{activePoster.index + 1 < 10 ? `0${activePoster.index + 1}` : activePoster.index + 1} of {allPosters.length}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 font-mono">
                        Official 3:4 Tournament Key Visual · High-Resolution Key Art
                      </p>
                    </div>

                    <button
                      onClick={() => setLightboxIndex(activePoster.index)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer shrink-0"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                      <span>Zoom High-Res</span>
                    </button>
                  </div>

                  <div className="mt-3.5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>Print Quality: 300 DPI CMYK Key Art</span>
                    <span className="text-[#FFC15C]">Click right deck to swap visual ↗</span>
                  </div>
                </div>
              </div>

              {/* ===================================================================
                  RIGHT COLUMN: POSTERS DECK (CLICK TO SWAP)
                  =================================================================== */}
              <div className="lg:col-span-5 flex flex-col">
                {/* Header with Display Toggle */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                      Tournament Collection ({filteredPosters.length})
                    </h3>
                  </div>

                  {/* Toggle: 2-Col Grid vs List */}
                  <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.06] border border-white/10">
                    <button
                      onClick={() => setDeckLayout('grid')}
                      className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                        deckLayout === 'grid'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/40 hover:text-white'
                      }`}
                      title="2-Column Mini Grid"
                    >
                      <Columns2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeckLayout('list')}
                      className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                        deckLayout === 'list'
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/40 hover:text-white'
                      }`}
                      title="List View"
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Deck Container: Grid View */}
                {deckLayout === 'grid' ? (
                  <div className="grid grid-cols-2 gap-3 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                    {filteredPosters.map((item) => {
                      const isSelected = item.index === activePoster.index;
                      return (
                        <div
                          key={`deck-grid-${item.index}`}
                          onClick={() => setActivePosterIndex(item.index)}
                          className={`group flex flex-col p-2.5 rounded-2xl transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-white/15 border-[#FF7348]/70 shadow-lg scale-[1.02]'
                              : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10'
                          }`}
                        >
                          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#080310] mb-2 border border-white/10 flex items-center justify-center p-1.5">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            {isSelected && (
                              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#FF7348] text-white font-mono text-[8px] font-extrabold uppercase shadow-md">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold mt-1 px-0.5">
                            <span className="text-[#FFC15C] uppercase truncate">
                              {item.badge}
                            </span>
                            <span className="text-white/40 shrink-0 ml-1">
                              #{item.index + 1 < 10 ? `0${item.index + 1}` : item.index + 1}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Deck Container: List View */
                  <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                    {filteredPosters.map((item) => {
                      const isSelected = item.index === activePoster.index;
                      return (
                        <div
                          key={`deck-list-${item.index}`}
                          onClick={() => setActivePosterIndex(item.index)}
                          className={`group flex items-center gap-3.5 p-3 rounded-2xl transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-white/15 border-[#FF7348]/70 shadow-lg'
                              : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10'
                          }`}
                        >
                          <div className="relative w-16 aspect-[3/4] rounded-xl overflow-hidden bg-[#080310] shrink-0 border border-white/10 flex items-center justify-center p-1">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            {isSelected && (
                              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#FF7348] text-white font-mono text-[7px] font-extrabold">
                                ON
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono font-bold text-[#FFC15C] uppercase">
                                {item.badge}
                              </span>
                              <span className="text-white/40 font-mono text-[10px]">
                                #{item.index + 1 < 10 ? `0${item.index + 1}` : item.index + 1}
                              </span>
                            </div>
                            <p className="text-xs text-white/70 font-mono truncate">
                              Official Tournament Poster · 3:4 Key Visual
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 2: EXHIBITION GRID WALL (ALL 14 POSTERS)
            ========================================================================= */}
        {viewMode === 'wall' && (
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Top Toolbar in Wall Mode: Column Switcher */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="text-xs font-mono text-white/60">
                Displaying all {filteredPosters.length} tournament posters in full resolution
              </span>

              <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
                <button
                  onClick={() => setWallColumns(2)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    wallColumns === 2 ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  2-Column (Large)
                </button>
                <button
                  onClick={() => setWallColumns(3)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    wallColumns === 3 ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  3-Column (Gallery)
                </button>
              </div>
            </div>

            {filteredPosters.length === 0 ? (
              <div className="py-20 text-center text-white/60 font-mono text-sm">
                No matching posters found.
              </div>
            ) : (
              <div
                className={`grid gap-6 sm:gap-8 transition-all duration-300 ${
                  wallColumns === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredPosters.map((poster) => (
                  <div
                    key={`wall-poster-${poster.index}`}
                    onClick={() => setLightboxIndex(poster.index)}
                    className="group relative w-full bg-[#080310] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:border-[#FF7348]/40 hover:shadow-[0_25px_70px_rgba(255,115,72,0.18)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div className="relative w-full aspect-[3/4] bg-[#080310] overflow-hidden flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={poster.image}
                        alt={poster.title}
                        loading="lazy"
                        className="w-full h-full object-contain rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 shadow-xl">
                          <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                          <span>Inspect High-Res</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-950/95 border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-[#FFC15C]">
                          {poster.badge}
                        </span>
                        <span className="text-xs text-white/50 font-mono">
                          Poster #{poster.index + 1 < 10 ? `0${poster.index + 1}` : poster.index + 1}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex(poster.index);
                        }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
                        title="Inspect Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4 text-[#FF7348]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
          3. BOTTOM PROJECT NAVIGATION (Prev / Next)
          ========================================================================= */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProject ? (
          <Link
            to={`/work/${prevProject.slug}`}
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] text-white/40 block">Previous Project</span>
              <span className="font-bold">{prevProject.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
          >
            <div className="text-right">
              <span className="text-[10px] text-white/40 block">Next Project</span>
              <span className="font-bold">{nextProject.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* =========================================================================
          4. FULLSCREEN HIGH-RES LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && categorizedPosters[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between mb-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
                {lightboxIndex + 1} / {categorizedPosters.length}
              </span>
              <span className="text-sm font-heading font-black uppercase text-white truncate max-w-xs sm:max-w-md">
                {categorizedPosters[lightboxIndex]?.badge} · Poster #{lightboxIndex + 1}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main 3:4 Image Viewport with Arrows */}
          <div
            className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={categorizedPosters[lightboxIndex].image}
              alt={categorizedPosters[lightboxIndex].title}
              className="max-h-[78vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20 select-none"
            />

            {/* Left Nav Arrow */}
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev - 1 + categorizedPosters.length) % categorizedPosters.length
                )
              }
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Previous Poster"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev + 1) % categorizedPosters.length)
              }
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Next Poster"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="w-full max-w-4xl mt-4 text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/80 font-mono text-xs sm:text-sm">
              {categorizedPosters[lightboxIndex].subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
