import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  Check, 
  Maximize2, 
  FileText, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Flame, 
  Trophy, 
  Palette, 
  ArrowRight, 
  ArrowLeft,
  Info,
  Layers,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

/**
 * BaazCaseStudy Component
 * World-class design case study theme for Baaz Takedown 2026 Merchandise
 * Combining fighting game royalty (Tekken 8, Street Fighter 6, Fatal Fury)
 * with Pakistani cultural heritage and Lahore's Minar-e-Pakistan.
 */
export default function BaazCaseStudy({ 
  project, 
  onOpenLightbox, 
  handleShare, 
  copied,
  nextProject,
  prevProject
}) {
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef(null);

  // Character breakdown data from the official illustration
  const characters = [
    {
      name: 'HEIHACHI MISHIMA',
      franchise: 'Tekken 8 · Bandai Namco',
      role: 'Swinging from Minar-e-Pakistan Spire',
      outfit: 'Traditional Pakistani Shalwar Kameez',
      description: 'The iron-fisted patriarch reimagined in a classic sand-beige Pakistani Shalwar Kameez, wearing traditional wooden prayer beads (Tasbih) around his neck, joyfully riding the swings suspended from Lahore\'s Minar-e-Pakistan.',
      color: '#FF7348',
      quote: '"Connecting global fighting royalty to Lahore\'s monumental skyline."'
    },
    {
      name: 'CHUN-LI',
      franchise: 'Street Fighter 6 · Capcom',
      role: 'First Lady of Fighting Games',
      outfit: 'Royal Blue Kurti with White Flowing Dupatta',
      description: 'Capcom\'s legendary Interpol officer styled in a royal blue Kurti paired with matching loose trousers and an elegant white Dupatta, retaining her iconic studded wrist cuffs as she glides alongside the monument.',
      color: '#3B82F6',
      quote: '"Grace, discipline, and authentic South Asian streetwear."'
    },
    {
      name: 'ROCK HOWARD',
      franchise: 'Fatal Fury: City of the Wolves · SNK',
      role: 'Prodigal Heir on the Front Swing',
      outfit: 'Embroidered Ajrak-Inspired Waistcoat & Kurta',
      description: 'SNK\'s fan-favorite hero wearing a crisp white Kurta and tailored maroon embroidered waistcoat, accented with his signature combat fingerless gloves and high-top sneakers.',
      color: '#EAB308',
      quote: '"Modern high-fashion youth streetwear meets traditional craftsmanship."'
    },
    {
      name: 'BRYAN FURY & NINA WILLIAMS',
      franchise: 'Tekken 8 · Bandai Namco',
      role: 'Relaxed at the Monument Base',
      outfit: 'Sage Green & Lavender Casual Kurtas',
      description: 'Bryan in a relaxed sage-green Kurta and Nina in an understated pastel lavender Kurti and dark shawl with sunglasses, sitting at the base of Minar-e-Pakistan absorbed in head-to-head matches on handheld consoles.',
      color: '#A855F7',
      quote: '"Even assassins take time out for casual handheld gaming."'
    },
    {
      name: 'MINAR-E-PAKISTAN',
      franchise: 'National Architectural Landmark · Lahore',
      role: 'Central Composition Anchor',
      outfit: 'Architectural Heritage & Cultural Anchor',
      description: 'Pakistan\'s monumental tower in Greater Iqbal Park, Lahore — where the historic Lahore Resolution was passed in 1940. It anchors the entire artwork, grounding international esports in national cultural heritage.',
      color: '#10B981',
      quote: '"The physical and historical anchor of Pakistan\'s FGC capital."'
    }
  ];

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  return (
    <div className="relative w-full text-white">

      {/* =========================================================================
          1. EDITORIAL CASE STUDY HERO
          ========================================================================= */}
      <section className="relative pt-2 pb-16 sm:pb-24 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#DA2086]/25 via-[#9227B5]/20 to-[#FF7348]/20 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          {/* Top metadata eyebrow */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            <Link
              to="/#zenkai-files"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 border border-white/15 text-white/90 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer shadow-sm"
              title="Back to Zenkai Portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#FFC15C]" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#FF7348]/20 to-[#DA2086]/20 border border-[#FF7348]/40 text-[#FFC15C]">
              CASE STUDY 02
            </span>
            <span className="text-white/30 font-mono text-xs">/</span>
            <span className="text-xs font-mono font-semibold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF7348]" />
              Packages Mall · Lahore
            </span>
            <span className="text-white/30 font-mono text-xs">·</span>
            <span className="text-xs font-mono font-semibold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFC15C]" />
              Season 2026
            </span>
            <span className="text-white/30 font-mono text-xs">·</span>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Official FGC Major
            </span>
          </div>

          {/* Main Case Study Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <h1 className="font-heading font-black text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                BAAZ TAKEDOWN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7348] via-[#DA2086] to-[#FFC15C]">
                  2026 MERCH SUITE
                </span>
              </h1>

              <p className="text-base sm:text-xl text-white/85 font-light leading-relaxed mb-8 max-w-2xl">
                Uniting international fighting-game royalty with Pakistan’s living cultural heritage. 
                An exclusive tournament merchandise concept combining <strong className="text-white font-semibold">Tekken 8</strong>, <strong className="text-white font-semibold">Street Fighter 6</strong>, and <strong className="text-white font-semibold">Fatal Fury</strong> with Lahore’s iconic <strong className="text-white font-semibold">Minar-e-Pakistan</strong>.
              </p>

              {/* Case Study Meta Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-0.5">
                    Client & Event
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Baaz Takedown FGC
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-0.5">
                    Discipline
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Merchandise & Apparel
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-0.5">
                    Creative Lead
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#FFC15C]">
                    @designsbyfatyma
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Featured 3D Apparel Hero Mockup */}
            <div className="lg:col-span-5">
              <div className="relative group/mockup rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#180826] to-[#0c0414] p-3 sm:p-4 shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                  <img 
                    src="/assets/Baaz Merch/baaz_merch_with_title.png" 
                    alt="Baaz Takedown 2026 Official Merch Shirt"
                    className="w-full h-full object-cover group-hover/mockup:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/mockup:opacity-30 transition-opacity" />
                  
                  {/* Floating pill badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                      Official Tournament Apparel
                    </span>
                    <button
                      onClick={() => onOpenLightbox(4)}
                      className="p-2 rounded-full bg-[#FF7348] text-white pointer-events-auto hover:scale-110 active:scale-95 transition-all shadow-lg"
                      title="Inspect full-screen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CHAPTER 01: THE CONTEXT & THE BRIEF
          ========================================================================= */}
      <section className="relative py-12 sm:py-20 border-t border-white/10">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Visual presentation slide */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div 
                onClick={() => onOpenLightbox(1)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-white/35 transition-all duration-300"
              >
                <img 
                  src="/assets/Baaz Merch/page_2.png" 
                  alt="About Takedown 2026 - Tournament Context"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                    Click to Inspect Slide in High-Res
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial story text */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-[#FFC15C] mb-4 self-start">
                <span>01</span>
                <span>/</span>
                <span>THE BRIEF & TOURNAMENT CONTEXT</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight mb-5">
                Bringing Global Esports Royalty to Lahore
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 font-normal">
                When Baaz organized Pakistan's biggest international fighting game tournament, the creative objective went far beyond standard event branding. Pakistan had become a feared global powerhouse in competitive fighting games, yet tournament apparel rarely celebrated the country's own architectural and cultural roots.
              </p>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Our design challenge: craft a unified visual identity for Takedown 2026 that honoured the three heavyweight publisher franchises while establishing Lahore as the living epicentre of South Asian esports.
              </p>

              {/* Tournament Impact Matrix */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    Host Venue
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-white">
                    Packages Mall
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Lahore, Pakistan
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    Publishers
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-[#FF7348]">
                    3 Franchises
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Bandai · SNK · Capcom
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    Event Tier
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-emerald-400">
                    Flagship Major
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    International Tier
                  </span>
                </div>
              </div>

              {/* Behind the scenes design insight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-white/[0.05] to-transparent border-l-2 border-[#FF7348] text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                <span className="font-bold text-white mr-1.5">Creative Strategy:</span>
                Rather than treating the tournament as a generic venue, we positioned Lahore's heritage as an active hero in the global fighting game story.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CHAPTER 02: THE CREATIVE CONCEPT & CULTURAL FUSION
          ========================================================================= */}
      <section className="relative py-12 sm:py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Details on the LEFT */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-[#FF7348] mb-4 self-start">
                <span>02</span>
                <span>/</span>
                <span>THE ART DIRECTION & CONCEPT</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight mb-5">
                Beyond Generic Renders: Authentic Cultural Reimagining
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 font-normal">
                Standard tournament merchandise often relies on pasting generic publisher key art onto stock blank t-shirts. For Takedown 2026, we rejected that convention entirely in favor of an original, hand-crafted cultural crossover.
              </p>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Instead of corporate renders, we illustrated legendary fighters from Tekken, Street Fighter, and Fatal Fury dressed in traditional Pakistani apparel, using Lahore's iconic <strong className="text-white font-semibold">Minar-e-Pakistan</strong> as the central architectural anchor.
              </p>

              {/* Design Pillars Matrix matching Chapter 01 style */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    01 / Wardrobe
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-white">
                    Custom Attire
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Shalwar Kameez & Ajrak
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    02 / Landmark
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-[#DA2086]">
                    Minar-e-Pakistan
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Lahore Cultural Anchor
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
                    03 / Output
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-[#FFC15C]">
                    Collectible Art
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Limited Apparel Run
                  </span>
                </div>
              </div>

              {/* Behind the scenes design insight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-white/[0.05] to-transparent border-l-2 border-[#DA2086] text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                <span className="font-bold text-white mr-1.5">Art Direction:</span>
                Unifying three competing global fighting game publishers into a single harmonious canvas through authentic Pakistani cultural heritage.
              </div>
            </div>

            {/* Visual presentation slide on the RIGHT */}
            <div className="lg:col-span-6">
              <div 
                onClick={() => onOpenLightbox(2)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-white/35 transition-all duration-300"
              >
                <img 
                  src="/assets/Baaz Merch/page_3.png" 
                  alt="The Concept - Minar-e-Pakistan and Cultural Fusion"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                    Click to Inspect Concept Slide
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CHAPTER 03: MASTER ARTWORK & INTERACTIVE CHARACTER BREAKDOWN
          ========================================================================= */}
      <section className="relative py-12 sm:py-20 border-t border-white/10">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Visual master artwork card on the LEFT */}
            <div className="lg:col-span-6 order-1">
              <div 
                onClick={() => onOpenLightbox(3)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:border-white/35 transition-all duration-300"
              >
                <img 
                  src="/assets/Baaz Merch/page_4.png" 
                  alt="The Character Roster on Minar-e-Pakistan"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                    <Maximize2 className="w-4 h-4 text-[#FF7348]" />
                    Click to Open Master Art in High-Res
                  </span>
                </div>
              </div>

              {/* Slide figure caption */}
              <div className="flex items-center justify-between text-[11px] font-mono text-white/45 mt-3 px-1">
                <span>FIG 04 / MASTER ROSTER ARTWORK</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ORIGINAL HAND-DRAWN ROSTER
                </span>
              </div>
            </div>

            {/* Details on the RIGHT */}
            <div className="lg:col-span-6 order-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-[#FFC15C] mb-3 self-start">
                <span>03</span>
                <span>/</span>
                <span>MASTER ARTWORK BREAKDOWN</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-3">
                The Character Roster on Minar-e-Pakistan
              </h2>

              <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                Every fighter was illustrated in authentic Pakistani silhouettes — uniting global fighting icons with Lahore's monumental landmark. Click below to inspect each cultural adaptation:
              </p>

              {/* Interactive Character Selector & Deep Dive */}
              <div className="space-y-2">
                {characters.map((char, index) => {
                  const isActive = activeCharacter === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveCharacter(index)}
                      className={`group cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-200 border overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-white/[0.12] to-white/[0.04] border-white/35 shadow-[0_8px_25px_rgba(0,0,0,0.5)] p-3.5 sm:p-4' 
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 px-3.5 py-2.5'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125" 
                            style={{ 
                              backgroundColor: char.color, 
                              boxShadow: isActive ? `0 0 8px ${char.color}` : 'none' 
                            }} 
                          />
                          <h3 className={`font-heading font-black text-xs sm:text-sm uppercase tracking-wider truncate ${
                            isActive ? 'text-white' : 'text-white/85 group-hover:text-white'
                          }`}>
                            {char.name}
                          </h3>
                          {!isActive && (
                            <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 truncate">
                              · {char.outfit}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">
                            {char.franchise.split('·')[0].trim()}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${
                            isActive ? 'rotate-90 text-[#FFC15C]' : 'group-hover:translate-x-0.5'
                          }`} />
                        </div>
                      </div>

                      {isActive && (
                        <div className="pt-2.5 mt-2.5 border-t border-white/10 animate-fadeIn space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block px-2 py-0.5 rounded bg-[#FFC15C]/15 border border-[#FFC15C]/30 text-[11px] font-mono font-bold text-[#FFC15C]">
                              {char.outfit}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono text-white/50">
                              {char.role}
                            </span>
                          </div>

                          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed font-normal">
                            {char.description}
                          </p>

                          <blockquote 
                            className="text-[11px] italic font-serif text-white/60 border-l-2 pl-2.5 py-0.5 bg-white/[0.02] rounded-r" 
                            style={{ borderColor: char.color }}
                          >
                            {char.quote}
                          </blockquote>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CHAPTER 04: THE MERCH SHIRT — FRONT & BACK PRODUCTION MOCKUPS
          ========================================================================= */}
      <section className="relative py-12 sm:py-20 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Story & Specifications on the LEFT */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-[#DA2086] mb-4 self-start">
                <span>04</span>
                <span>/</span>
                <span>TOURNAMENT APPAREL</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-4">
                The Final Merch Shirt: Front & Back Mockups
              </h2>

              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Engineered for maximum presence in stadium tournament arenas, broadcast streams, and daily streetwear. The tee balances bold typography with intricate hand-drawn art.
              </p>

              {/* Garment Tech Specs 3-Column Matrix */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#FF7348] font-bold mb-1">
                    01 / Front Graphic
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-white">
                    Takedown '26
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Distressed Type & Roster
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#DA2086] font-bold mb-1">
                    02 / Back Yoke
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-white">
                    Baaz Emblem
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Gold Banner & Skyline
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#FFC15C] font-bold mb-1">
                    03 / Fabric & Print
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base text-white">
                    240 GSM Cotton
                  </span>
                  <span className="block text-[10px] text-white/50 font-mono mt-0.5">
                    Discharge Screenprint
                  </span>
                </div>
              </div>

              {/* Production standard design insight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-white/[0.05] to-transparent border-l-2 border-[#DA2086] text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-6">
                <span className="font-bold text-white mr-1.5">Production Standard:</span>
                Soft water-based discharge ink ensures zero heavy rubber feel, preserving breathability for players under intense arena lighting.
              </div>

              {project.pdfUrl && (
                <div className="flex items-center gap-3">
                  <a
                    href={project.pdfUrl}
                    download
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 hover:border-white/40 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all duration-200 active:scale-95 shadow-sm group"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FF7348] group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Tech Pack in PDF</span>
                  </a>
                  <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                    Complete Garment Specifications
                  </span>
                </div>
              )}
            </div>

            {/* Visual Shirt Mockup Slide 05 on the RIGHT */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div 
                onClick={() => onOpenLightbox(4)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:border-white/35 transition-all duration-300 w-full max-w-[460px]"
              >
                <img 
                  src="/assets/Baaz Merch/page_5.png" 
                  alt="Final Design Merch Shirt - Front and Back Mockup"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF7348]" />
                    Click to Open Full-Screen Mockup
                  </span>
                </div>
              </div>

              {/* Slide figure caption */}
              <div className="w-full max-w-[460px] flex items-center justify-between text-[11px] font-mono text-white/45 mt-3 px-1">
                <span>FIG 05 / APPAREL PRODUCTION</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FRONT & BACK PRODUCTION TEE
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CHAPTER 05: LIVE TOURNAMENT ENERGY (VIDEO REEL)
          ========================================================================= */}
      <section className="relative py-12 sm:py-20 border-t border-white/10">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#0e0517] p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-bold text-[#FF7348] mb-3">
                  <span>05</span>
                  <span>/</span>
                  <span>LIVE TOURNAMENT REEL</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight mb-4">
                  The Raw Energy of Lahore's FGC Arena
                </h2>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                  Pakistan’s competitive fighting game atmosphere is famed across the world for intense rivalries, packed spectator stands, and roaring chants. This video captures the authentic tournament pulse that inspired the merchandise suite.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={toggleVideo}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF7348] to-[#DA2086] hover:brightness-110 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{videoPlaying ? 'Pause Highlight Reel' : 'Play Tournament Reel'}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-white/15 cursor-pointer"
                  >
                    {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{videoMuted ? 'Unmute Audio' : 'Mute'}</span>
                  </button>
                </div>
              </div>

              {/* Video Player Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-xs aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src="/assets/REELS/baaz ptl 4.mp4"
                    poster="/assets/Baaz Merch/page_2.png"
                    playsInline
                    loop
                    muted={videoMuted}
                    className="w-full h-full object-cover"
                    onPlay={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                  />

                  {/* Play overlay if paused */}
                  {!videoPlaying && (
                    <div 
                      onClick={toggleVideo}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer group"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#FF7348] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          7. CHAPTER 06: CASE STUDY CLOSING & DOWNLOAD ACTION STRIP
          ========================================================================= */}
      <section className="relative py-14 sm:py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FF7348] to-[#DA2086] flex items-center justify-center text-white mx-auto mb-6 shadow-[0_10px_30px_rgba(255,115,72,0.4)]">
            <FileText className="w-8 h-8" />
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight mb-4">
            Download the Complete Pitch Deck
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Get the full high-resolution PDF document including vector typography assets, screenprinting separation guides, and brand color specifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                download
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF7348] via-[#DA2086] to-[#9227B5] hover:brightness-110 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(255,115,72,0.45)] cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Pitch Deck (PDF 21.6 MB)</span>
              </a>
            )}

            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
            >
              <span>Commission Custom Merchandise</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject && (
              <Link
                to={`/work/${prevProject.slug}`}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF7348] flex items-center justify-center transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-white/40">Previous Project</span>
                  <span className="font-bold text-white group-hover:text-[#FFC15C] transition-colors">{prevProject.title}</span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                to={`/work/${nextProject.slug}`}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider text-right ml-auto"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-white/40">Next Case Study</span>
                  <span className="font-bold text-white group-hover:text-[#FFC15C] transition-colors">{nextProject.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF7348] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
