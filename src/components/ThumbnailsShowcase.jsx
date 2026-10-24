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
  Bell,
  ThumbsUp,
  ThumbsDown,
  Download,
  Tv,
  LayoutGrid,
  Smartphone,
  ListFilter,
  Columns2,
  Sparkles
} from 'lucide-react';

/**
 * ThumbnailsShowcase Component
 * Interactive YouTube Packaging Simulator:
 * - Removed the giant header box completely for immediate above-the-fold visual impact
 * - Slim, minimal project metadata top bar
 * - Authentic YouTube App Shell
 * - Main Featured Thumbnail on Left (Pristine 16:9 artwork, ZERO play/pause buttons, NO video scrubbers)
 * - Thumbnails on Right with rich browsing options:
 *   - Category filter chips (All, Rivalries, EVO, Guides, Tier Lists)
 *   - Sidebar View Toggle: List View vs 2-Column Mini Grid View
 *   - Instant click-to-swap to the main screen
 * - Fullscreen 16:9 Lightbox
 */
export default function ThumbnailsShowcase({
  project,
  handleShare,
  copied,
  nextProject,
  prevProject
}) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [sidebarLayout, setSidebarLayout] = useState('list'); // 'list' | 'grid'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(184200);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allThumbnails = project.presentationSections || [];

  // Prepare each thumbnail with clean, authentic YouTube metadata
  const ytVideos = useMemo(() => {
    return allThumbnails.map((item, index) => {
      const titleLower = (item.title || '').toLowerCase();
      const subtitleLower = (item.subtitle || '').toLowerCase();

      // Determine channel & role
      let channelName = 'Arslan Ash';
      let channelAvatar = '/assets/Thumbnails/Arslan.jpg';
      let channelRole = '8x EVO World Champion';

      if (
        titleLower.includes('atif') ||
        subtitleLower.includes('atif') ||
        (item.image && item.image.includes('Atif'))
      ) {
        channelName = 'Atif Butt';
        channelAvatar = '/assets/Thumbnails/Atif.jpg';
        channelRole = 'Tekken World Champion';
      } else if (titleLower.includes('ashes') || subtitleLower.includes('ashes')) {
        channelName = 'Team Ashes Esports';
        channelAvatar = '/assets/Thumbnails/IMG_6968.JPG';
        channelRole = 'Official Pro Esports Team';
      } else if (titleLower.includes('showdown') || titleLower.includes('lahore')) {
        channelName = 'Pakistan Tekken League';
        channelAvatar = '/assets/Thumbnails/IMG_6981.JPG';
        channelRole = 'National Tournament League';
      }

      // Sanitize subtitle to remove fake views and CTR metrics
      let cleanSubtitle = (item.subtitle || '')
        .replace(/\s*\/\/\s*\d+\.?\d*[MK]?\s*Views/gi, '')
        .replace(/\s*\/\/\s*\d+\.?\d*%\s*CTR/gi, '')
        .replace(/^\s*\/\/\s*/, '')
        .trim();
      if (!cleanSubtitle) cleanSubtitle = 'Official Channel Packaging';

      // Categorize
      let category = item.category || 'other';
      if (!item.category) {
        if (
          titleLower.includes('vs') ||
          titleLower.includes('rivalry') ||
          titleLower.includes('deathmatch') ||
          titleLower.includes('clash') ||
          titleLower.includes('heera') ||
          titleLower.includes('miracle')
        ) {
          category = 'rivalries';
        } else if (
          titleLower.includes('evo') ||
          titleLower.includes('tournament') ||
          titleLower.includes('championship') ||
          titleLower.includes('finals') ||
          titleLower.includes('ewc') ||
          titleLower.includes('stage')
        ) {
          category = 'tournaments';
        } else if (
          titleLower.includes('guide') ||
          titleLower.includes('tech') ||
          titleLower.includes('meta') ||
          titleLower.includes('combo') ||
          titleLower.includes('masterclass') ||
          titleLower.includes('bryan') ||
          titleLower.includes('mishima')
        ) {
          category = 'guides';
        } else if (
          titleLower.includes('tier') ||
          titleLower.includes('podcast') ||
          titleLower.includes('speedrun') ||
          titleLower.includes('q&a') ||
          titleLower.includes('pubg') ||
          titleLower.includes('rapid fire')
        ) {
          category = 'shows';
        }
      }

      // Duration badge
      const durations = [
        '18:42', '24:15', '14:08', '31:50', '22:19',
        '16:44', '12:30', '45:12', '19:05', '28:34',
        '15:18', '21:02', '34:11', '17:55', '26:40',
        '13:22', '38:15', '20:49', '11:58', '29:04'
      ];
      const duration = durations[index % durations.length];

      return {
        ...item,
        index,
        channelName,
        channelAvatar,
        channelRole,
        subtitle: cleanSubtitle,
        category,
        duration
      };
    });
  }, [allThumbnails]);

  // Filter videos based on category and search
  const filteredVideos = useMemo(() => {
    return ytVideos.filter((video) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = (video.title || '').toLowerCase().includes(q);
        const matchesChannel = video.channelName.toLowerCase().includes(q);
        const matchesSubtitle = (video.subtitle || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesChannel && !matchesSubtitle) return false;
      }

      // Category filter
      if (activeCategory === 'all') return true;
      return video.category === activeCategory;
    });
  }, [ytVideos, activeCategory, searchQuery]);

  const activeVideo = ytVideos[activeVideoIndex] || ytVideos[0] || {};

  // Category counts
  const counts = useMemo(() => {
    return {
      all: ytVideos.length,
      rivalries: ytVideos.filter((t) => t.category === 'rivalries').length,
      tournaments: ytVideos.filter((t) => t.category === 'tournaments').length,
      guides: ytVideos.filter((t) => t.category === 'guides').length,
      shows: ytVideos.filter((t) => t.category === 'shows').length
    };
  }, [ytVideos]);

  // Preload adjacent thumbnails for instant zero-latency swapping
  useEffect(() => {
    if (!ytVideos || ytVideos.length === 0) return;
    const indicesToPreload = [
      activeVideoIndex,
      (activeVideoIndex + 1) % ytVideos.length,
      (activeVideoIndex + 2) % ytVideos.length,
      (activeVideoIndex - 1 + ytVideos.length) % ytVideos.length
    ];
    indicesToPreload.forEach((idx) => {
      const vid = ytVideos[idx];
      if (vid && vid.image) {
        const preloader = new Image();
        preloader.src = vid.image;
      }
    });
  }, [activeVideoIndex, ytVideos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % ytVideos.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + ytVideos.length) % ytVideos.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, ytVideos.length]);

  return (
    <div className="w-full text-white">
      {/* =========================================================================
          YOUTUBE APP SHELL (IMMEDIATELY AT THE TOP)
          ========================================================================= */}
      <div className="relative rounded-3xl bg-[#0f0f0f] border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top App Bar */}
        <div className="h-14 px-3 sm:px-6 bg-[#0f0f0f] border-b border-neutral-800 flex items-center justify-between gap-2 sm:gap-4">
          {/* Back to Portfolio + YouTube Logo */}
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

            <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <img
                src="/YT.png"
                alt="YouTube"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
              <span className="font-heading font-black text-base sm:text-lg tracking-tighter text-white">
                YouTube
              </span>
              <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase ml-0.5 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 hidden xs:inline">
                PACKAGING
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by channel or category..."
                className="w-full bg-[#121212] border border-neutral-700 rounded-full py-1.5 pl-9 pr-8 text-xs font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF7348] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 active:scale-95 border border-neutral-700 text-white transition-all cursor-pointer text-xs font-mono font-bold uppercase tracking-wider"
              title="Share Showcase"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <div className="relative p-2 rounded-full text-neutral-400">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF0000]" />
            </div>

            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 p-1 flex items-center justify-center ring-2 ring-neutral-700" title="Zenkai Media">
              <img
                src="/assets/zenkai-emblem.png"
                alt="Zenkai Media"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Category Chips Bar (YouTube Dark Pill Chips) */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0f0f0f] border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: `All (${counts.all})` },
            { id: 'rivalries', label: `Rivalries (${counts.rivalries})` },
            { id: 'tournaments', label: `EVO & Tournaments (${counts.tournaments})` },
            { id: 'guides', label: `Guides & Meta (${counts.guides})` },
            { id: 'shows', label: `Shows & Podcasts (${counts.shows})` }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveCategory(chip.id);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === chip.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* =========================================================================
            3. MAIN CONTENT: FEATURED ON LEFT + THUMBNAILS ON RIGHT
            ========================================================================= */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ===================================================================
                LEFT COLUMN: FEATURED THUMBNAIL (CLEAN ARTWORK, ZERO PLAY BUTTONS)
                =================================================================== */}
            <div className="lg:col-span-8 flex flex-col">
              {/* 16:9 Featured Thumbnail Display */}
              <div
                onClick={() => setLightboxIndex(activeVideo.index)}
                className="group relative aspect-[16/9] w-full rounded-2xl bg-black overflow-hidden shadow-2xl border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
              >
                <img
                  src={activeVideo.image}
                  alt={activeVideo.title}
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.retried) {
                      e.currentTarget.dataset.retried = 'true';
                      e.currentTarget.src = activeVideo.image.replace(/\.webp$/i, '.jpg');
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                />

                {/* Top-Right Fullscreen Zoom Prompt */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(activeVideo.index);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-black transition-colors"
                    title="Inspect Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                    <span>Inspect Artwork</span>
                  </button>
                </div>

                {/* Duration Badge in bottom-right */}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 text-white font-mono text-[11px] font-semibold tracking-wider shadow-md">
                  {activeVideo.duration}
                </span>
              </div>

              {/* Metadata Below Featured Thumbnail */}
              <div className="mt-4">

                {/* Channel Row & Engagement Actions */}
                <div className="pb-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  {/* Channel Profile */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
                      <img
                        src={activeVideo.channelAvatar}
                        alt={activeVideo.channelName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-white">
                          {activeVideo.channelName}
                        </span>
                        <span className="w-3.5 h-3.5 rounded-full bg-neutral-500 text-[9px] text-white flex items-center justify-center font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400">
                        {activeVideo.channelRole}
                      </span>
                    </div>

                    {/* Subscribe Button */}
                    <button
                      onClick={() => setIsSubscribed(!isSubscribed)}
                      className={`ml-3 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSubscribed
                          ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                          : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Like Button */}
                    <div className="inline-flex items-center rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden text-xs">
                      <button
                        onClick={() => setHasLiked(!hasLiked)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 hover:bg-neutral-700 transition-colors cursor-pointer ${
                          hasLiked ? 'text-blue-400 font-bold' : 'text-neutral-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{hasLiked ? 'Liked' : 'Like'}</span>
                      </button>
                      <span className="w-[1px] h-4 bg-neutral-700" />
                      <button className="px-3 py-1.5 hover:bg-neutral-700 text-neutral-400 cursor-pointer">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Share */}
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-medium text-neutral-200 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    {/* Inspect Fullscreen */}
                    <button
                      onClick={() => setLightboxIndex(activeVideo.index)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-medium text-neutral-200 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Full Res</span>
                    </button>
                  </div>
                </div>

                {/* Description & Packaging Info Box */}
                <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-sans">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#FFC15C] uppercase tracking-wider">
                      Thumbnail Packaging #{activeVideo.index + 1 < 10 ? `0${activeVideo.index + 1}` : activeVideo.index + 1} of {ytVideos.length}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      16:9 Esports High-CTR Artwork
                    </span>
                  </div>
                  <div className="mt-2 text-neutral-400 flex flex-wrap gap-2 font-mono text-xs">
                    <span className="text-blue-400">#Tekken8</span>
                    <span className="text-blue-400">#ArslanAsh</span>
                    <span className="text-blue-400">#EsportsPackaging</span>
                    <span className="text-blue-400">#ZenkaiMedia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================================
                RIGHT COLUMN: THUMBNAILS LIST WITH DISPLAY OPTIONS (LIST VS GRID)
                =================================================================== */}
            <div className="lg:col-span-4 flex flex-col">
              {/* Sidebar Header with View Mode Options */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                    Thumbnails ({filteredVideos.length})
                  </h3>
                </div>

                {/* Sidebar Layout Options: List vs 2-Col Mini Grid */}
                <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-neutral-800 border border-neutral-700">
                  <button
                    onClick={() => setSidebarLayout('list')}
                    className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                      sidebarLayout === 'list'
                        ? 'bg-neutral-700 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="List View"
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSidebarLayout('grid')}
                    className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
                      sidebarLayout === 'grid'
                        ? 'bg-neutral-700 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Mini Grid View"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Thumbnails Container */}
              {sidebarLayout === 'list' ? (
                /* OPTION A: LIST VIEW (HORIZONTAL CARDS) */
                <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredVideos.map((item) => {
                    const isSelected = item.index === activeVideo.index;
                    return (
                      <div
                        key={`sidebar-list-${item.index}`}
                        onClick={() => setActiveVideoIndex(item.index)}
                        className={`group flex gap-3 p-2.5 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-neutral-800 border-[#FF7348]/60 shadow-lg'
                            : 'bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800'
                        }`}
                      >
                        {/* Mini 16:9 Thumbnail Image */}
                        <div className="relative w-36 aspect-[16/9] rounded-lg overflow-hidden bg-neutral-900/90 shrink-0 border border-neutral-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              if (!e.currentTarget.dataset.retried) {
                                e.currentTarget.dataset.retried = 'true';
                                e.currentTarget.src = item.image.replace(/\.webp$/i, '.jpg');
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/85 text-white font-mono text-[9px] font-semibold">
                            {item.duration}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-[#FF7348] text-white font-mono text-[8px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        {/* Channel & Thumbnail Meta info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#FFC15C] uppercase block mb-1">
                              {item.category.toUpperCase()} · #{item.index + 1 < 10 ? `0${item.index + 1}` : item.index + 1}
                            </span>
                            <span className={`font-semibold text-xs truncate block transition-colors ${
                              isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                            }`}>
                              {item.channelName}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-mono block truncate">
                            {item.channelRole}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* OPTION B: MINI GRID VIEW (2-COLUMN VISUAL CARDS) */
                <div className="grid grid-cols-2 gap-2.5 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredVideos.map((item) => {
                    const isSelected = item.index === activeVideo.index;
                    return (
                      <div
                        key={`sidebar-grid-${item.index}`}
                        onClick={() => setActiveVideoIndex(item.index)}
                        className={`group flex flex-col p-2 rounded-xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-neutral-800 border-[#FF7348]/60 shadow-lg'
                            : 'bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800'
                        }`}
                      >
                        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-900/90 mb-1.5 border border-neutral-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              if (!e.currentTarget.dataset.retried) {
                                e.currentTarget.dataset.retried = 'true';
                                e.currentTarget.src = item.image.replace(/\.webp$/i, '.jpg');
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/85 text-white font-mono text-[9px] font-semibold">
                            {item.duration}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-[#FF7348] text-white font-mono text-[8px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] mt-1 px-0.5">
                          <span className={`font-semibold truncate transition-colors ${
                            isSelected ? 'text-[#FFC15C]' : 'text-neutral-300 group-hover:text-white'
                          }`}>
                            {item.channelName}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 font-bold shrink-0 ml-1">
                            #{item.index + 1 < 10 ? `0${item.index + 1}` : item.index + 1}
                          </span>
                        </div>
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
          4. BOTTOM PROJECT NAVIGATION (Prev / Next)
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
          5. FULLSCREEN 16:9 LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && ytVideos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar Controls */}
          <div
            className="w-full max-w-6xl flex items-center justify-between mb-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
                {lightboxIndex + 1} / {ytVideos.length}
              </span>
              <span className="text-sm font-heading font-black uppercase text-white truncate max-w-xs sm:max-w-md">
                {ytVideos[lightboxIndex]?.channelName} · Thumbnail #{lightboxIndex + 1}
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

          {/* Main 16:9 Image Viewport with Arrows */}
          <div
            className="relative w-full max-w-6xl aspect-[16/9] max-h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={ytVideos[lightboxIndex].image}
              alt={ytVideos[lightboxIndex].title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/20 select-none"
            />

            {/* Left Nav Arrow */}
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev - 1 + ytVideos.length) % ytVideos.length
                )
              }
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Previous Thumbnail"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev + 1) % ytVideos.length)
              }
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Next Thumbnail"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="w-full max-w-6xl mt-4 text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/80 font-mono text-xs sm:text-sm">
              {ytVideos[lightboxIndex].subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
