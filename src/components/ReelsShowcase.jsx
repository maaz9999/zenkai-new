import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Film,
  Sparkles,
  X,
  Tv,
  ThumbsUp,
  ThumbsDown,
  Repeat,
  Search,
  SlidersHorizontal,
  Compass,
  Zap,
  LayoutGrid,
  Radio
} from 'lucide-react';

/**
 * YouTube Shorts Icon (Authentic Red badge with white folded play)
 */
function ShortsBadgeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M17.77 10.32l-1.2-.5-1.1-.46 1.02-.57a4.99 4.99 0 002.5-4.32 5 5 0 00-5-5 4.96 4.96 0 00-3.37 1.3L4.9 5.8a5 5 0 00-1.87 3.87 4.99 4.99 0 002.5 4.32l1.2.5 1.1.46-1.02.57a4.99 4.99 0 00-2.5 4.32 5 5 0 005 5 4.96 4.96 0 003.37-1.3l5.72-5.03a5 5 0 001.87-3.87 4.99 4.99 0 00-2.5-4.32zM10 14.65v-5.3l4.5 2.65-4.5 2.65z"
        fill="#FF0000"
      />
    </svg>
  );
}

/**
 * Helper to dynamically resolve poster thumbnail for reels
 */
const getPosterUrl = (videoUrl) => {
  if (!videoUrl) return '';
  if (videoUrl.includes('/assets/REELS/')) {
    return videoUrl.replace('/assets/REELS/', '/assets/REELS/posters/').replace('.mp4', '.jpg');
  }
  if (videoUrl.includes('/assets/GROWTH CREATIVE.mp4')) {
    return '/assets/REELS/posters/GROWTH CREATIVE.jpg';
  }
  if (videoUrl.includes('/media/reel-showcase.mp4')) {
    return '/assets/REELS/posters/reel-showcase.jpg';
  }
  return '';
};

/**
 * ReelsShowcase Component
 * 100% Authentic YouTube Shorts Interface + Long-Form Showcase:
 * - Direct implementation of the official YouTube Shorts player interface (matching user reference screenshot)
 *   - Centered 9:16 vertical phone frame
 *   - Right action rail: Like (with count), Dislike, Share, Remix, Sound, Audio Mute/Unmute
 *   - Floating down-arrow (↓) button on the far right to flip to the next Short
 *   - Bottom overlay on video: Channel avatar + @ZenkaiMedia + Subscribe button, caption with hashtags, audio track pill with play icon
 *   - Active red playback progress line along the bottom edge of the video
 *   - Up/Down arrow keyboard navigation to effortlessly scroll through all 14 Shorts
 * - 4 Long-Form Widescreen Videos (16:9, authentic YouTube desktop video layout)
 * - Navigation Switcher: [ ⚡ Shorts Player ] | [ 📺 Long-Form Videos (4) ] | [ 📑 Grid View (18) ]
 */
export default function ReelsShowcase({
  project,
  handleShare,
  copied,
  nextProject,
  prevProject
}) {
  // View mode: 'shorts-player' (default matching screenshot) | 'videos' | 'all-grid'
  const [viewMode, setViewMode] = useState('shorts-player');
  const [activeShortIdx, setActiveShortIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayerMuted, setIsPlayerMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShortBuffering, setIsShortBuffering] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [playerDuration, setPlayerDuration] = useState(0);
  const [playerCurrentTime, setPlayerCurrentTime] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Theater modal for long-form videos
  const [activeTheaterVideo, setActiveTheaterVideo] = useState(null);
  const [theaterPlaying, setTheaterPlaying] = useState(true);
  const [theaterMuted, setTheaterMuted] = useState(false);
  const [theaterProgress, setTheaterProgress] = useState(0);

  const mainShortsVideoRef = useRef(null);
  const theaterVideoRef = useRef(null);
  const allMedia = project.presentationSections || [];

  // Separate Long-Form (16:9) and Shorts (9:16)
  const { longFormVideos, shortsReels } = useMemo(() => {
    const longForm = allMedia.filter((m) => m.orientation === 'landscape');
    const shorts = allMedia.filter((m) => m.orientation === 'portrait');
    return { longFormVideos: longForm, shortsReels: shorts };
  }, [allMedia]);

  const activeShort = shortsReels[activeShortIdx] || shortsReels[0] || {};

  // Duration mapping for long-form videos
  const getLongDuration = (idx) => {
    const times = ['14:20', '18:45', '11:32', '08:15'];
    return times[idx % times.length];
  };

  // Sync active short video playback
  useEffect(() => {
    if (mainShortsVideoRef.current && viewMode === 'shorts-player') {
      setIsShortBuffering(true);
      mainShortsVideoRef.current.currentTime = 0;
      mainShortsVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasLiked(false);
    }
  }, [activeShortIdx, viewMode]);

  // Keyboard navigation for Shorts Feed Player
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If theater modal open
      if (activeTheaterVideo) {
        if (e.key === 'Escape') setActiveTheaterVideo(null);
        return;
      }

      // If in shorts player mode
      if (viewMode === 'shorts-player') {
        if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          stepShort(1);
        } else if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          stepShort(-1);
        } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          togglePlay();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          setIsPlayerMuted((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activeTheaterVideo, activeShortIdx, shortsReels.length]);

  const stepShort = (direction) => {
    setActiveShortIdx((prev) => {
      const next = (prev + direction + shortsReels.length) % shortsReels.length;
      return next;
    });
  };

  const togglePlay = () => {
    if (!mainShortsVideoRef.current) return;
    if (mainShortsVideoRef.current.paused) {
      mainShortsVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      mainShortsVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!mainShortsVideoRef.current) return;
    const cur = mainShortsVideoRef.current.currentTime;
    const dur = mainShortsVideoRef.current.duration || 1;
    setPlayerCurrentTime(cur);
    setPlayerDuration(dur);
    setPlayerProgress((cur / dur) * 100);
  };

  // Filter helper for long-form & grid
  const filterList = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((item) => {
      const matchesTitle = (item.title || '').toLowerCase().includes(q);
      const matchesSub = (item.subtitle || '').toLowerCase().includes(q);
      const matchesCat = (item.category || '').toLowerCase().includes(q);
      return matchesTitle || matchesSub || matchesCat;
    });
  };

  const filteredLongForm = useMemo(() => filterList(longFormVideos), [longFormVideos, searchQuery]);
  const filteredShorts = useMemo(() => filterList(shortsReels), [shortsReels, searchQuery]);

  return (
    <div className="w-full text-white">
      {/* =========================================================================
          YOUTUBE PRODUCTION HUB APP SHELL
          ========================================================================= */}
      <div className="relative rounded-3xl bg-[#0f0f0f] border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Top App Bar Header */}
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
              <span className="font-heading font-black text-sm sm:text-lg tracking-tight text-white uppercase">
                ZENKAI STUDIOS
              </span>
            </div>

            <span className="w-3.5 h-3.5 rounded-full bg-neutral-600 text-[9px] text-white flex items-center justify-center font-bold" title="Verified Creator">
              ✓
            </span>

            <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase hidden lg:inline px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700">
              {allMedia.length} PRODUCTIONS
            </span>
          </div>

          {/* Search Input */}
          <div className="flex items-center flex-1 max-w-xs sm:max-w-sm mx-1 sm:mx-2">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos & shorts..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-full py-1.5 pl-8 pr-7 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
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

          {/* Right Action Controls: Share */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-mono font-bold text-neutral-200 transition-all cursor-pointer"
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

        {/* Primary Format Switcher Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0f0f0f] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5">
            {/* YouTube Shorts Player Tab (Default) */}
            <button
              onClick={() => setViewMode('shorts-player')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'shorts-player'
                  ? 'bg-[#FF0000] text-white font-bold shadow-md'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              <ShortsBadgeIcon className="w-4 h-4" />
              <span>Shorts Player ({shortsReels.length})</span>
            </button>

            {/* Long-Form Videos Tab */}
            <button
              onClick={() => setViewMode('videos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'videos'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>16:9 Videos ({longFormVideos.length})</span>
            </button>

            {/* Grid View Tab */}
            <button
              onClick={() => setViewMode('all-grid')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'all-grid'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Grid ({allMedia.length})</span>
            </button>
          </div>

          <div className="text-xs text-neutral-400 font-mono hidden sm:flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">↓</kbd> to flip shorts</span>
          </div>
        </div>

        {/* =========================================================================
            VIEW MODE 1: THE ACTUAL YOUTUBE SHORTS INTERFACE (MATCHING USER SCREENSHOT)
            ========================================================================= */}
        {viewMode === 'shorts-player' && (
          <div className="p-3 sm:p-5 lg:p-6 flex flex-col items-center">
            
            {/* The YouTube Shorts Centered Arena */}
            <div className="relative w-full max-w-4xl flex items-center justify-center py-1 sm:py-2">
              
              {/* Main Container: Video + Right Action Column */}
              <div className="relative flex items-end gap-2.5 sm:gap-4">
                
                {/* -------------------------------------------------------------
                    9:16 VERTICAL VIDEO PLAYER WINDOW (Optimized Viewport Sizing)
                    ------------------------------------------------------------- */}
                <div className="relative w-[285px] sm:w-[315px] md:w-[335px] lg:w-[350px] h-[500px] sm:h-[550px] md:h-[585px] lg:h-[610px] max-h-[calc(100vh-210px)] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-neutral-800/80 flex items-center justify-center">
                  <video
                    ref={mainShortsVideoRef}
                    src={activeShort.video}
                    poster={getPosterUrl(activeShort.video)}
                    preload="auto"
                    loop
                    muted={isPlayerMuted}
                    playsInline
                    controls={false}
                    onWaiting={() => setIsShortBuffering(true)}
                    onPlaying={() => setIsShortBuffering(false)}
                    onCanPlay={() => setIsShortBuffering(false)}
                    onLoadedData={() => setIsShortBuffering(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    className="w-full h-full object-cover cursor-pointer select-none"
                  />

                  {/* YouTube Shorts Style Buffer/Loading Spinner */}
                  {isShortBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 z-10 pointer-events-none backdrop-blur-[2px] transition-opacity">
                      <div className="w-11 h-11 rounded-full border-[3px] border-white/20 border-t-[#FF0000] animate-spin shadow-2xl" />
                    </div>
                  )}

                  {/* Top-Right Mute/Unmute Overlay Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayerMuted(!isPlayerMuted);
                    }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-20 shadow-md"
                    title={isPlayerMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isPlayerMuted ? (
                      <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC15C]" />
                    )}
                  </button>

                  {/* Center Play/Pause Indicator on click */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 cursor-pointer"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/75 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* -------------------------------------------------------------
                      BOTTOM OVERLAY: CHANNEL INFO, CAPTION, SOUND (EXACT MATCH)
                      ------------------------------------------------------------- */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 pointer-events-none">
                    {/* Channel Row: Avatar + Handle + Subscribe */}
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2 pointer-events-auto">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-neutral-900 border border-white/20 p-0.5 shrink-0 shadow-md">
                        <img
                          src="/assets/zenkai-emblem.png"
                          alt="Zenkai Media"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        @ZenkaiMedia
                      </span>
                      <button
                        onClick={() => setIsSubscribed(!isSubscribed)}
                        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ml-1 shadow-md ${
                          isSubscribed
                            ? 'bg-neutral-800 text-neutral-300'
                            : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                      >
                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                      </button>
                    </div>

                    {/* Title + Hashtags */}
                    <p className="text-xs sm:text-sm font-semibold text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2">
                      {activeShort.title}{' '}
                      <span className="text-blue-400 font-normal">#shorts #gaming #viral</span>
                    </p>

                    {/* Audio Sound Pill (Exact Match to Screenshot) */}
                    <div className="inline-flex items-center gap-1.5 mt-1.5 sm:mt-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/90 max-w-full">
                      <Play className="w-2.5 h-2.5 fill-current text-white shrink-0" />
                      <span className="font-mono text-[10px] sm:text-[11px] truncate">
                        {activeShort.subtitle || 'Original Sound — Zenkai Media Studios'}
                      </span>
                    </div>
                  </div>

                  {/* -------------------------------------------------------------
                      BOTTOM RED PROGRESS LINE (EXACT MATCH)
                      ------------------------------------------------------------- */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 z-20">
                    <div
                      className="h-full bg-[#FF0000]"
                      style={{ width: `${playerProgress}%` }}
                    />
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    RIGHT ACTION COLUMN (EXACT MATCH TO YOUTUBE SCREENSHOT)
                    ------------------------------------------------------------- */}
                <div className="flex flex-col items-center gap-2.5 sm:gap-3 text-white shrink-0 pb-2 sm:pb-3">
                  {/* Like Button */}
                  <button
                    onClick={() => setHasLiked(!hasLiked)}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="I like this"
                  >
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        hasLiked
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-800/90 group-hover:bg-neutral-700 text-white'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300">
                      {hasLiked ? 'Liked' : 'Like'}
                    </span>
                  </button>

                  {/* Dislike Button */}
                  <button
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="Dislike"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-800/90 group-hover:bg-neutral-700 text-white flex items-center justify-center transition-all shadow-lg">
                      <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300">
                      Dislike
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="Share"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-800/90 group-hover:bg-neutral-700 text-white flex items-center justify-center transition-all shadow-lg">
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300">
                      Share
                    </span>
                  </button>

                  {/* Remix Button */}
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="Remix"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-800/90 group-hover:bg-neutral-700 text-white flex items-center justify-center transition-all shadow-lg">
                      <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300">
                      Remix
                    </span>
                  </button>

                  {/* Sound Avatar Box in bottom right (Exact Match) */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 p-0.5 shrink-0 shadow-lg mt-0.5">
                    <img
                      src="/assets/zenkai-emblem.png"
                      alt="Sound Track"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FLOATING CIRCULAR DOWN ARROW BUTTON (EXACT MATCH TO SCREENSHOT)
                    ------------------------------------------------------------- */}
                <div className="hidden lg:flex flex-col gap-2.5 absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() => stepShort(-1)}
                    className="w-11 h-11 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                    title="Previous Short (Up Arrow / K)"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => stepShort(1)}
                    className="w-11 h-11 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                    title="Next Short (Down Arrow / J)"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Mobile / Tablet Next/Prev Switcher Bar */}
            <div className="flex lg:hidden items-center justify-center gap-4 mt-3">
              <button
                onClick={() => stepShort(-1)}
                className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-mono font-bold flex items-center gap-1.5 text-white"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Prev Short</span>
              </button>
              <span className="text-xs font-mono text-neutral-400">
                {activeShortIdx + 1} of {shortsReels.length}
              </span>
              <button
                onClick={() => stepShort(1)}
                className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-mono font-bold flex items-center gap-1.5 text-white"
              >
                <span>Next Short</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* ===================================================================
                HORIZONTAL QUEUE OF ALL SHORTS (CLICK TO SWITCH INSTANTLY)
                =================================================================== */}
            <div className="w-full mt-6 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  All {shortsReels.length} Shorts in Reel ({activeShortIdx + 1} Playing)
                </span>
                <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                  Click any to load directly into the Shorts Player
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-thin">
                {shortsReels.map((short, idx) => {
                  const isActive = idx === activeShortIdx;
                  return (
                    <div
                      key={`queue-${idx}`}
                      onClick={() => setActiveShortIdx(idx)}
                      className={`relative w-28 aspect-[9/16] rounded-xl overflow-hidden shrink-0 cursor-pointer border transition-all duration-300 ${
                        isActive
                          ? 'border-[#FF0000] ring-2 ring-[#FF0000]/60 scale-105 shadow-xl'
                          : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getPosterUrl(short.video)}
                        alt={short.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded bg-[#FF0000] text-white font-mono text-[8px] font-bold">
                          PLAYING
                        </div>
                      )}

                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-semibold text-white truncate block">
                        {short.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            VIEW MODE 2: 16:9 LONG-FORM VIDEOS ONLY
            ========================================================================= */}
        {viewMode === 'videos' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-neutral-400" />
                <h2 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white">
                  Long-Form Productions (16:9)
                </h2>
                <span className="text-xs text-neutral-400 font-mono ml-2">
                  {filteredLongForm.length} master videos
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredLongForm.map((video, idx) => {
                const duration = getLongDuration(idx);
                return (
                  <div
                    key={`longform-only-${idx}`}
                    onClick={() => setActiveTheaterVideo(video)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 shadow-md group-hover:shadow-[0_15px_40px_rgba(255,115,72,0.18)] transition-all duration-300">
                      <video
                        src={video.video}
                        poster={getPosterUrl(video.video)}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                        onMouseEnter={(e) => {
                          e.target.preload = 'auto';
                          e.target.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-white font-mono text-xs font-bold tracking-wider shadow-md border border-white/10 pointer-events-none">
                        {duration}
                      </span>
                    </div>

                    <div className="mt-3 flex items-start gap-3 px-0.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 p-1 flex items-center justify-center mt-0.5">
                        <img
                          src="/assets/zenkai-emblem.png"
                          alt="Zenkai Media"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-xs text-neutral-400 font-medium mt-1 flex items-center gap-1.5">
                          <span>Zenkai Studios</span>
                          <span className="w-3 h-3 rounded-full bg-neutral-600 text-[8px] text-white flex items-center justify-center font-bold">
                            ✓
                          </span>
                        </p>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          {video.category}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 3: FULL GRID VIEW (BOTH LONG-FORM & SHORTS)
            ========================================================================= */}
        {viewMode === 'all-grid' && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-12">
            {/* Shelf 1: Videos */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-neutral-400" />
                  <h2 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white">
                    Videos
                  </h2>
                  <span className="text-xs text-neutral-400 font-mono ml-2">
                    {filteredLongForm.length} videos
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredLongForm.map((video, idx) => (
                  <div
                    key={`all-longform-${idx}`}
                    onClick={() => setActiveTheaterVideo(video)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 shadow-md transition-all duration-300">
                      <video
                        src={video.video}
                        poster={getPosterUrl(video.video)}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                        onMouseEnter={(e) => {
                          e.target.preload = 'auto';
                          e.target.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-white font-mono text-xs font-bold tracking-wider shadow-md border border-white/10 pointer-events-none">
                        {getLongDuration(idx)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-start gap-3 px-0.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 p-1 flex items-center justify-center mt-0.5">
                        <img
                          src="/assets/zenkai-emblem.png"
                          alt="Zenkai Media"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-xs text-neutral-400 font-mono mt-1">
                          Zenkai Studios ✓ • {video.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf 2: Shorts */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <ShortsBadgeIcon className="w-5 h-5" />
                  <h2 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white">
                    Shorts
                  </h2>
                  <span className="text-xs text-neutral-400 font-mono ml-2">
                    {filteredShorts.length} shorts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                {filteredShorts.map((short, idx) => (
                  <div
                    key={`all-shorts-${idx}`}
                    onClick={() => {
                      const realIdx = shortsReels.findIndex((s) => s.video === short.video);
                      if (realIdx !== -1) setActiveShortIdx(realIdx);
                      setViewMode('shorts-player');
                    }}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 shadow-md group-hover:shadow-[0_12px_36px_rgba(255,0,0,0.22)] transition-all duration-300">
                      <video
                        src={short.video}
                        poster={getPosterUrl(short.video)}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-300"
                        onMouseEnter={(e) => {
                          e.target.preload = 'auto';
                          e.target.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-full bg-[#FF0000] w-full animate-pulse" />
                      </div>
                    </div>

                    <div className="mt-2.5 px-0.5">
                      <h3 className="font-semibold text-sm text-white line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
                        {short.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 font-mono">
                        {short.category || 'Shorts'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          LONG-FORM THEATER MODAL (16:9)
          ========================================================================= */}
      {activeTheaterVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveTheaterVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col items-center bg-[#0d0718] border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
          >
            <div className="w-full h-14 px-4 sm:px-6 bg-black/80 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0 flex items-center gap-2.5">
                <Tv className="w-4 h-4 text-[#FF7348] shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-heading font-black text-sm uppercase tracking-tight text-white truncate">
                    {activeTheaterVideo.title}
                  </h3>
                  <p className="text-[11px] text-white/50 font-mono truncate">
                    {activeTheaterVideo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-bold text-[#FFC15C] hidden sm:inline">
                  {activeTheaterVideo.category}
                </span>
                <button
                  onClick={() => setActiveTheaterVideo(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative w-full flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden p-2">
              <video
                ref={theaterVideoRef}
                src={activeTheaterVideo.video}
                poster={getPosterUrl(activeTheaterVideo.video)}
                preload="auto"
                loop
                muted={theaterMuted}
                playsInline
                autoPlay
                className="max-w-full max-h-[68vh] aspect-[16/9] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          BOTTOM PROJECT NAVIGATION (Prev / Next)
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
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider text-right"
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

    </div>
  );
}
