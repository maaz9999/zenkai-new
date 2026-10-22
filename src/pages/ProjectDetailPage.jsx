import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedGradient from '../components/AnimatedGradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BaazCaseStudy from '../components/BaazCaseStudy';
import ThumbnailsShowcase from '../components/ThumbnailsShowcase';
import TwitchPackagingShowcase from '../components/TwitchPackagingShowcase';
import FourThriveMerchShowcase from '../components/FourThriveMerchShowcase';
import PostersShowcase from '../components/PostersShowcase';
import ReelsShowcase from '../components/ReelsShowcase';
import { projectsData, getProjectBySlug } from '../data/projectsData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  Download, 
  Columns2, 
  Maximize2, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FolderKanban, 
  Sparkles,
  Eye
} from 'lucide-react';

/**
 * Portfolio Project Detail Page:
 * - Two-column responsive editorial grid by default for 100% full visibility (no cut-out designs)
 * - Complete asset showcases for:
 *   - Baaz Takedown 2026 Merch (6 PDF pages + pitch deck download)
 *   - 4THRIVE Fan Merchandise (19 Artboards + PDF pitch deck download)
 *   - Arslan Ash Twitch Broadcast Suite (12 frames & custom stickers)
 *   - Growth Creative Video Reels Portfolio (21 playable video reels with view counts)
 *   - Official Tournament Posters (14 posters with high-res zoom)
 *   - High-CTR YouTube Thumbnails (36 thumbnails with CTR analytics)
 * - Icons on all bars (Top navigation bar, PDF action bar, panel caption bars)
 * - Full-screen interactive lightbox and video reel player
 */
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [columns, setColumns] = useState(2); // Default to 2 columns as requested
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [reelFilter, setReelFilter] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Find project by slug
  const project = getProjectBySlug(slug) || projectsData[0];
  const currentIndex = projectsData.findIndex((p) => p.slug === project.slug);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Auto-redirect legacy /work/pakistan-tekken-showdown to clean canonical /work/thumbnails
  useEffect(() => {
    if (slug === 'pakistan-tekken-showdown') {
      navigate('/work/thumbnails', { replace: true });
    }
    if (slug === 'twitch' || slug === 'stickers' || slug === 'twitch-stream' || slug === 'arslan-stickers') {
      navigate('/work/twitch-stream-packaging', { replace: true });
    }
    if (slug === '4thrive') {
      navigate('/work/4thrive-merch', { replace: true });
    }
    if (slug === 'posters' || slug === 'tournament-posters' || slug === 'tekken' || slug === 'tekken-posters') {
      navigate('/work/tekken-8-championship', { replace: true });
    }
    if (slug === 'reels' || slug === 'motion' || slug === 'growth' || slug === 'video-reels') {
      navigate('/work/growth-creative-motion', { replace: true });
    }
  }, [slug, navigate]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLightboxIndex(null);
    setActiveVideoModal(null);
  }, [slug]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % project.presentationSections.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + project.presentationSections.length) % project.presentationSections.length);
        }
      }
      if (activeVideoModal !== null && e.key === 'Escape') {
        setActiveVideoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeVideoModal, project.presentationSections.length]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter sections for reels if applicable
  const displayedSections = project.presentationSections.filter((item) => {
    if (project.projectType !== 'reels-portfolio' || reelFilter === 'all') return true;
    if (reelFilter === 'viral') return item.views && (item.views.includes('M') || parseInt(item.views) > 700);
    if (reelFilter === 'esports') return item.category && (item.category.includes('Esports') || item.category.includes('Pro Team') || item.category.includes('Tournament'));
    if (reelFilter === 'motion') return item.category && (item.category.includes('3D') || item.category.includes('Hardware') || item.category.includes('Commercial'));
    return true;
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06020c] text-white">
      {/* Seamless brand moving background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatedGradient className="w-full h-full opacity-65" />
      </div>

      {/* Film grain overlay */}
      <div className="grain-overlay opacity-25 pointer-events-none" />

      {/* Official Zenkai Floating Brand Header (Logo on left, Portfolio / Services / Contact on right) */}
      <Header />

      {/* =========================================================================
          MAIN PRESENTATION AREA
          ========================================================================= */}
      <main className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-24">
        {project.slug === 'baaz-merch' ? (
          <BaazCaseStudy
            project={project}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : project.slug === 'thumbnails' ? (
          <ThumbnailsShowcase
            project={project}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : project.slug === 'twitch-stream-packaging' ? (
          <TwitchPackagingShowcase
            project={project}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : project.slug === '4thrive-merch' ? (
          <FourThriveMerchShowcase
            project={project}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : project.slug === 'tekken-8-championship' ? (
          <PostersShowcase
            project={project}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : project.slug === 'growth-creative-motion' || project.slug === 'reels' ? (
          <ReelsShowcase
            project={project}
            handleShare={handleShare}
            copied={copied}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        ) : (
          <>
            {/* Project Header Info Plaque */}
            <div className="relative bg-[#0c0514]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7348] via-[#DA2086] to-[#8C1FA8] opacity-90" />
          
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

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] animate-pulse" />
                <span className="text-xs uppercase font-mono font-extrabold tracking-widest text-[#FFC15C]">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/60">
                <span>{project.year}</span>
                <span>·</span>
                <span className="text-white/80">{project.client}</span>
                {project.badgeText && (
                  <>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">{project.badgeText}</span>
                  </>
                )}
              </div>

              {/* Column Toggle for standard projects */}
              <button
                onClick={() => setColumns(columns === 2 ? 1 : 2)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  columns === 2 
                    ? 'bg-white/20 border-white/30 text-white' 
                    : 'bg-white/10 border-white/15 text-white/70 hover:text-white'
                }`}
                title="Toggle between Two-Column and Single-Column layout"
              >
                <Columns2 className="w-3.5 h-3.5 text-[#FFC15C]" />
                <span className="hidden sm:inline">{columns === 2 ? '2-Column' : '1-Column'}</span>
              </button>
            </div>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight mb-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            {project.title}
          </h1>

          <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl font-normal">
            {project.description}
          </p>

          {/* PDF Dedicated Download Callout Bar */}
          {project.pdfUrl && (
            <div className="mt-6 pt-6 border-t border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-6 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF7348] to-[#DA2086] flex items-center justify-center text-white shrink-0 shadow-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base uppercase tracking-wider text-white">
                    Official Presentation Pitch Deck
                  </h4>
                  <p className="text-xs text-white/60 font-mono">
                    All pages displayed in 2-column spread below · High-resolution PDF available
                  </p>
                </div>
              </div>

              <a
                href={project.pdfUrl}
                download
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF7348] group-hover:translate-y-0.5 transition-transform" />
                <span>Download Complete Pitch Deck (PDF)</span>
              </a>
            </div>
          )}

          {/* Reels Filter Bar (when on Reels page) */}
          {project.projectType === 'reels-portfolio' && (
            <div className="mt-6 pt-6 border-t border-white/[0.1] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold mr-2">
                FILTER REELS:
              </span>
              {[
                { id: 'all', label: 'All 21 Reels' },
                { id: 'viral', label: 'Viral (1M+ Views)' },
                { id: 'esports', label: 'Esports & Tournaments' },
                { id: 'motion', label: '3D Motion & Commercials' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setReelFilter(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    reelFilter === filter.id
                      ? 'bg-gradient-to-r from-[#FF7348] to-[#DA2086] text-white shadow-md'
                      : 'bg-white/[0.06] hover:bg-white/15 text-white/70 border border-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            TWO-COLUMN EDITORIAL SHOWCASE GRID (NO CUT-OFFS, PERFECT VISIBILITY)
            ========================================================================= */}
        <div className={`grid gap-5 sm:gap-6 lg:gap-8 transition-all duration-300 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {displayedSections.map((section, idx) => {
            const isVideo = Boolean(section.video);

            return (
              <div
                key={idx}
                className="group relative w-full bg-[#0c0514]/95 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:border-white/30 hover:shadow-[0_25px_70px_rgba(255,115,72,0.18)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* ---------------------------------------------------------------
                    VIDEO REEL CARD
                    --------------------------------------------------------------- */}
                {isVideo ? (
                  <div className="relative w-full flex flex-col justify-between bg-black overflow-hidden group/video">
                    {/* Video Player Window */}
                    <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                      <video
                        src={section.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-500 group-hover/video:scale-102"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                        onClick={() => setActiveVideoModal(section)}
                      />

                      {/* Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Category badge at top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-end pointer-events-none z-10">
                        {section.category && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                            {section.category}
                          </span>
                        )}
                      </div>

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setActiveVideoModal(section)}
                        className="absolute inset-0 flex items-center justify-center group-hover/video:scale-110 transition-transform cursor-pointer"
                        aria-label={`Play ${section.title}`}
                      >
                        <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover/video:bg-[#FF7348] group-hover/video:border-transparent transition-all shadow-2xl">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </button>

                      {/* Hover hint */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono uppercase text-white/70 pointer-events-none">
                        Hover to preview · Click to play
                      </div>
                    </div>

                    {/* Bottom Caption Bar with Icon */}
                    <div className="bg-neutral-950/95 border-t border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <Film className="w-4 h-4 text-[#FF7348] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-white leading-tight truncate">
                            {section.title}
                          </h3>
                          <p className="text-xs text-white/60 font-medium truncate mt-0.5">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveVideoModal(section)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0"
                        title="Expand Video"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ---------------------------------------------------------------
                     IMAGE / PDF DOCUMENT CARD (TWO COLUMNS, NO CUTTING OFF)
                     --------------------------------------------------------------- */
                  <div className="relative w-full flex flex-col justify-between bg-black overflow-hidden">
                    {/* Media container: object-contain inside so NOTHING is cut out */}
                    <div 
                      onClick={() => setLightboxIndex(idx)}
                      className="relative w-full bg-[#080310] flex items-center justify-center p-2.5 sm:p-3 overflow-hidden cursor-zoom-in"
                    >
                      <img
                        src={section.image}
                        alt={`${project.title} - ${section.title}`}
                        loading="lazy"
                        className="w-full h-auto max-h-[75vh] object-contain object-center rounded-xl transition-transform duration-500 group-hover:scale-[1.015]"
                      />

                      {/* Top badge on image */}
                      {section.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest text-[#FFC15C] shadow-lg">
                            {section.badge}
                          </span>
                        </div>
                      )}

                      {/* Click to zoom indicator on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 shadow-xl">
                          <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                          <span>View Full Res</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption Bar with Icon */}
                    <div className="bg-neutral-950/95 border-t border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <FileText className="w-4 h-4 text-[#FF7348] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-tight text-white leading-tight truncate">
                            {section.title}
                          </h3>
                          <p className="text-xs text-white/60 font-medium truncate mt-0.5">
                            {section.subtitle}
                          </p>
                        </div>
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
                )}
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM NAVIGATION: PREVIOUS / NEXT PROJECT
            ========================================================================= */}
        <div className="mt-14 sm:mt-18 bg-[#0c0514]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <Link
            to={`/work/${prevProject.slug}`}
            className="flex items-center space-x-3 text-white/80 hover:text-white group transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#FF7348] flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFC15C]">
                PREVIOUS PORTFOLIO
              </span>
              <span className="font-heading font-black text-sm sm:text-base uppercase">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            to="/start-a-project"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF7348] via-[#DA2086] to-[#8C1FA8] hover:brightness-110 active:scale-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg"
            title="Start a Project with Zenkai Media"
          >
            <span>Start a Project</span>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            className="flex items-center space-x-3 text-white/80 hover:text-white group transition-colors text-right sm:flex-row-reverse sm:text-right"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#FF7348] flex items-center justify-center transition-colors sm:ml-3">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFC15C]">
                NEXT PORTFOLIO
              </span>
              <span className="font-heading font-black text-sm sm:text-base uppercase">
                {nextProject.title}
              </span>
            </div>
          </Link>
        </div>
          </>
        )}

      </main>

      {/* =========================================================================
          FULL-SCREEN IMAGE LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none">
          {/* Top Bar with close & counter */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pt-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold">
                {lightboxIndex + 1} / {project.presentationSections.length}
              </span>
              <span className="font-heading font-bold text-sm sm:text-base uppercase tracking-wider hidden sm:inline">
                {project.presentationSections[lightboxIndex]?.title}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image View with Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + project.presentationSections.length) % project.presentationSections.length)}
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-black/70 hover:bg-[#FF7348] border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active image */}
            <img
              src={project.presentationSections[lightboxIndex]?.image}
              alt={project.presentationSections[lightboxIndex]?.title}
              className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />

            {/* Next button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % project.presentationSections.length)}
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-black/70 hover:bg-[#FF7348] border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="max-w-4xl mx-auto w-full text-center pb-2">
            <h3 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white">
              {project.presentationSections[lightboxIndex]?.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-0.5">
              {project.presentationSections[lightboxIndex]?.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL-SCREEN VIDEO MODAL (FOR REELS)
          ========================================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-black border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Top Bar */}
            <div className="p-4 bg-neutral-950/90 border-b border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-black text-sm uppercase text-white">
                  {activeVideoModal.title}
                </h4>
                <p className="text-[11px] text-white/60 font-mono">
                  {activeVideoModal.category}
                </p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-[9/16] bg-black">
              <video
                src={activeVideoModal.video}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
