/**
 * Zenkai Media Projects Data
 * Comprehensive data structure powering both Zenkai Files and dedicated project presentations.
 * Enriched with complete media libraries for:
 * - 4Thrives Fan Merchandise (19 Artboards + PDF)
 * - Baaz Takedown 2026 Merch (6 Pages + PDF)
 * - Arslan Ash Twitch Broadcast Suite & Stickers (12 Frames)
 * - Growth Creative Motion & Reels Portfolio (21 Full Video Reels)
 * - Tournament Posters Portfolio (11 Posters)
 * - High-CTR YouTube Thumbnails Portfolio (69 Thumbnails)
 */

export const projectsData = [
  // =========================================================================
  // 1. POSTERS PORTFOLIO (11 POSTERS)
  // =========================================================================
  {
    id: 'tekken-8-championship',
    slug: 'tekken-8-championship',
    title: 'OFFICIAL TOURNAMENT POSTERS & KEY ART',
    category: 'Tournament Key Visuals & Posters',
    client: 'Ashes Gaming · Red Bull · Bandai Namco FGC',
    year: '2024 - 2025',
    description: "Master tournament key visuals, matchday fight posters, championship reveal graphics, and athlete portraits for the world's premiere fighting game tournaments.",
    cover: '/assets/POSTERS/Arslan ash tournament.jpg',
    gradientColors: ['#FFC15C', '#FF7348', '#9227B5', '#551276'],
    projectType: 'posters',
    defaultColumns: 2,
    badgeText: '11 POSTERS',
    presentationSections: [
      {
        title: "DESI VS DESERT SHOWDOWN",
        subtitle: "Pakistan vs Saudi Arabia // Tekken 8 Invitational // Venue: RESS",
        image: "/assets/POSTERS/Arslan ash tournament.jpg",
        badge: "TOURNAMENT",
        category: "matchday",
        aspect: "aspect-[3/4]"
      },
      {
        title: "THE JON \u2014 CHAMPION OF TGU",
        subtitle: "Thaiger Uppercut Victory // Bangkok // Team Ashes",
        image: "/assets/POSTERS/20250104_090803.jpg",
        badge: "CHAMPIONSHIP",
        category: "championships",
        aspect: "aspect-[3/4]"
      },
      {
        title: "THE JON IS READY FOR FINALS",
        subtitle: "Tekken World Tour Global Finals // King Specialist Key Art",
        image: "/assets/POSTERS/20250104_090832.jpg",
        badge: "TWT FINALS",
        category: "championships",
        aspect: "aspect-[3/4]"
      },
      {
        title: "USAMA IS YOUR SECOND IMPACT CHAMPION",
        subtitle: "Team Ashes Championship Title // Second Impact Major",
        image: "/assets/POSTERS/20250104_090850.jpg",
        badge: "CHAMPIONSHIP",
        category: "championships",
        aspect: "aspect-[3/4]"
      },
      {
        title: "RUNNER UP OF CAPETOWN SHOWDOWN",
        subtitle: "International FGC Tournament Grand Finals // The Jon",
        image: "/assets/POSTERS/20250104_090915.jpg",
        badge: "RUNNER UP",
        category: "championships",
        aspect: "aspect-[3/4]"
      },
      {
        title: "QASIM \u2014 7TH PLACE AT FIRST KNOCKOUT",
        subtitle: "First Knockout World Placement Key Art // Team Ashes // Lahore",
        image: "/assets/POSTERS/20250104_090933.jpg",
        badge: "PLACEMENT",
        category: "championships",
        aspect: "aspect-[3/4]"
      },
      {
        title: "TEAM PAKISTAN VS TEAM SAUDI",
        subtitle: "Matchday Broadcast Key Visual // Twisted Labs // Sponsored by Al Rajhi Bank",
        image: "/assets/POSTERS/IMG_6968.JPG",
        badge: "MATCHDAY",
        category: "matchday",
        aspect: "aspect-[3/4]"
      },
      {
        title: "CASTING TALENT // BROWNMAN & NAJD",
        subtitle: "Official Hosts & Commentators // Pakistan vs Saudi 2025 // Twisted Labs",
        image: "/assets/POSTERS/IMG_6969.JPG",
        badge: "BROADCAST",
        category: "athletes",
        aspect: "aspect-[3/4]"
      },
      {
        title: "ESPORTS WORLD CUP // TOP 16 QUALIFIED",
        subtitle: "Competing Roster: Arslan Ash, Meer, Noman, Farzeen, Atif Tanveer, Bilal",
        image: "/assets/POSTERS/IMG_6970.JPG",
        badge: "EWC ROSTER",
        category: "athletes",
        aspect: "aspect-[3/4]"
      },
      {
        title: "COMBAT VERSUS // MAIN EVENT FIGHT CARD",
        subtitle: "Heavyweight Collision // Awan Mohamed, Abo Ali Khan, Zia Mashwani, Ismail Khan",
        image: "/assets/POSTERS/IMG_6971.JPG",
        badge: "FIGHT CARD",
        category: "matchday",
        aspect: "aspect-[3/4]"
      },
      {
        title: "THE JON // TEKKEN 8 KING SPECIALIST",
        subtitle: "Official Pro Athlete Profile & Editorial Portrait // Team Ashes",
        image: "/assets/POSTERS/jonn.jpg",
        badge: "PLAYER PROFILE",
        category: "athletes",
        aspect: "aspect-[3/4]"
      }
    ]
  },

  // =========================================================================
  // 2. 4THRIVE FAN MERCHANDISE CONCEPT (19 Artboards + PDF)
  // =========================================================================
  {
    id: '4thrive-merch',
    slug: '4thrive-merch',
    title: '4THRIVE FAN MERCHANDISE SUITE',
    category: 'Merchandise, Collectables & Apparel Design',
    client: '4THRIVE Esports Org · PUBG Mobile Division',
    year: '2025',
    description: 'Complete esports fan merchandise collection, 3D collectables, custom anime chibi mascots, pro hoodies, gaming desk pads, and collector\'s unboxing packaging.',
    cover: '/assets/4t_cover.webp',
    pdfUrl: '/assets/PUBG 4Thrive Fan Merchandise Concept.pdf',
    pdfTitle: 'Download 4THRIVE Fan Merchandise Pitch Deck (PDF)',
    gradientColors: ['#FF6428', '#DE2288', '#580E6E', '#FFA436'],
    projectType: 'merch-pdf',
    defaultColumns: 2,
    badgeText: '16 CASE FILES + PDF',
    presentationSections: [
      {
        title: 'WHO ARE 4THRIVES?',
        subtitle: 'Page 01 // Pakistan-Based PUBG Mobile Esports Team Context & Story',
        image: '/assets/4thrive Merch/3.jpg',
        badge: 'THE TEAM',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'PROJECT OVERVIEW & THE IDEA',
        subtitle: 'Page 02 // Transforming PUBG Mobile Players into Cute, Collectable Merchandise',
        image: '/media/4thrive_overview.jpg',
        badge: 'THE IDEA',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '4THRIVE FAN MERCHANDISE CONCEPT',
        subtitle: 'Page 03 // Official Pitch Deck Title & Collection Cover',
        image: '/assets/4t_cover.webp',
        badge: 'CONCEPT COVER',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'MASTER MERCHANDISE LINEUP',
        subtitle: 'Page 04 // Complete Fan Gear Suite — Hoodies, Deskmat, Phone Covers & Bags',
        image: '/assets/4thrive Merch/Artboard 21.png',
        badge: 'COLLECTION LINEUP',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'ORIGINAL AVATARS — IQ & NOCKI',
        subtitle: 'Page 05 // Tactical Mind IQ with Power-Radar & Clutch Hero Nocki with Cape',
        image: '/assets/4thrive Merch/Artboard 4.jpg',
        badge: 'AVATARS & LORE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'ORIGINAL AVATARS — HUZAIFA & FALAK',
        subtitle: 'Page 06 // Rifle Specialist Huzaifa (M16) & Fandom Tiger Falak',
        image: '/assets/4thrive Merch/Artboard 5.png',
        badge: 'AVATARS & LORE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D FIGURINE — FALAK (THE TIGER)',
        subtitle: 'Page 07 // 3D Chibi Mascot Collectable Toy & Front/Back Details',
        image: '/assets/4thrive Merch/Artboard 9.png',
        badge: '3D FIGURINE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D FIGURINE — NOCKI (SUPERMAN)',
        subtitle: 'Page 08 // 3D Clutch Playmaker Figurine with Heroic Cape',
        image: '/assets/4thrive Merch/Artboard 11.png',
        badge: '3D FIGURINE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D FIGURINE — T240P (VANGUARD SHIELD)',
        subtitle: 'Page 09 // 3D Squad Shield Figurine with 4THRIVE Crest',
        image: '/assets/4thrive Merch/Artboard 19.png',
        badge: '3D FIGURINE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D FIGURINE — HUZAIFA (M16 RIFLE)',
        subtitle: 'Page 10 // 3D Rifle Specialist Figurine with Tactical Sling',
        image: '/assets/4thrive Merch/Artboard 10.png',
        badge: '3D FIGURINE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D FIGURINE — IQ (TACTICAL EYE)',
        subtitle: 'Page 11 // 3D Mastermind Figurine with Holographic Scouter',
        image: '/assets/4thrive Merch/Artboard 8.png',
        badge: '3D FIGURINE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'MASCOT PLUSHIE — DESIGN CONCEPT',
        subtitle: 'Page 12 // Tiger Mascot Anatomy, Jersey Detailing & Materials',
        image: '/assets/4thrive Merch/Artboard 13.png',
        badge: 'PLUSHIE SPEC',
        aspect: 'aspect-[16/9]'
      },
      {
        title: '3D TIGER PLUSHIE TOY — FRONT & BACK',
        subtitle: 'Page 13 // High-Fidelity Physical Plushie Toy Render in Team Colors',
        image: '/assets/4thrive Merch/Artboard 14.png',
        badge: '3D PLUSHIE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'DIE-CUT FAN STICKER PACK',
        subtitle: 'Page 14 // Holographic Vinyl Stickers & Emote Decals',
        image: '/assets/4thrive Merch/Artboard 16.png',
        badge: 'STICKER PACK',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'ORIGINAL AVATAR BANNER',
        subtitle: 'Page 15 // Original Character Avatars Chapter Divider',
        image: '/assets/4thrive Merch/4.jpg',
        badge: 'DIVIDER',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'THANK YOU & CREDITS',
        subtitle: 'Page 16 // Unofficial Concept Showcase by Fatyma Binte Bilal',
        image: '/assets/4thrive Merch/Artboard 22.png',
        badge: 'CREDITS',
        aspect: 'aspect-[16/9]'
      }
    ]
  },

  // =========================================================================
  // 3. BAAZ TAKEDOWN 2026 MERCH (6 PDF Pages + PDF)
  // =========================================================================
  {
    id: 'baaz-merch',
    slug: 'baaz-merch',
    title: 'BAAZ TAKEDOWN 2026 MERCHANDISE',
    category: 'Merchandise & Cultural Apparel Design',
    client: 'Baaz Takedown FGC · International Tournament',
    year: '2026',
    description: 'Official merchandise concept and custom apparel design for Baaz Takedown 2026, combining iconic fighting game legends with authentic Pakistani cultural heritage and Minar-e-Pakistan.',
    cover: '/assets/Baaz Merch/baaz_merch_thumb.png',
    pdfUrl: '/assets/Baaz Takedown MErch.pdf',
    pdfTitle: 'Download Baaz Takedown 2026 Merchandise Pitch Deck (PDF)',
    gradientColors: ['#F03391', '#9227B5', '#FF7348', '#FFC15C'],
    projectType: 'merch-pdf',
    defaultColumns: 2,
    badgeText: '6 PAGES + PDF',
    presentationSections: [
      {
        title: 'OFFICIAL COVER & TITLE',
        subtitle: 'Page 01 // Baaz Takedown 2026 Official Merchandise Pitch Deck',
        image: '/assets/Baaz Merch/page_1.png',
        badge: 'COVER PAGE',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'HERITAGE & COMMUNITY',
        subtitle: 'Page 02 // About Takedown 2026 — FGC Heritage & Community Legacy',
        image: '/assets/Baaz Merch/page_2.png',
        badge: 'HERITAGE',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'DESIGN ELEMENTS & ARCHITECTURE',
        subtitle: 'Page 03 // Cultural Heritage & Minar-e-Pakistan Visual Story',
        image: '/assets/Baaz Merch/page_3.png',
        badge: 'DESIGN CONCEPT',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'LEGENDS KEY ART ILLUSTRATION',
        subtitle: 'Page 04 // Iconic Pakistani FGC Heroes Concept Illustration',
        image: '/assets/Baaz Merch/page_4.png',
        badge: 'KEY ART',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'OFFICIAL TOURNAMENT SHIRT',
        subtitle: 'Page 05 // Baaz Takedown 2026 Merch Shirt — Front & Back Mockup',
        image: '/assets/Baaz Merch/page_5.png',
        badge: 'PRODUCT MOCKUP',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'CLOSING & PRODUCTION SPECS',
        subtitle: 'Page 06 // Community Credits, Fabric Specs & Screenprint Guide',
        image: '/assets/Baaz Merch/page_6.png',
        badge: 'PRODUCTION SPECS',
        aspect: 'aspect-[4/5]'
      },
      {
        title: 'MASTER BRANDING VISUAL',
        subtitle: 'Feature // Baaz Takedown 2026 Full Branding & Typography',
        image: '/assets/Baaz Merch/baaz_merch_with_title.png',
        badge: 'BRAND ASSET',
        aspect: 'aspect-square'
      }
    ]
  },

  // =========================================================================
  // 4. ARSLAN ASH TWITCH BROADCAST SUITE & STICKERS (12 Frames)
  // =========================================================================
  {
    id: 'twitch-stream-packaging',
    slug: 'twitch-stream-packaging',
    title: 'ARSLAN ASH TWITCH BROADCAST & STICKERS',
    category: 'Stream Visuals, Emotes & Channel Branding',
    client: 'Arslan Ash (8x EVO Champion) & Twitch',
    year: '2024 - 2025',
    description: 'Complete Twitch channel overlay systems, interactive emote packages, sub badges, in-game overlays, starting/offline screens, and exclusive chibi character stickers.',
    cover: '/assets/Arslan_Ash_cover.webp',
    gradientColors: ['#9227B5', '#FF7348', '#FFC15C', '#F03391'],
    projectType: 'twitch-stream',
    defaultColumns: 2,
    badgeText: '12 FRAMES & EMOTES',
    presentationSections: [
      {
        title: 'MASTER STREAM PACKAGING',
        subtitle: 'Frame 01 // Master Broadcast Identity & Channel Visual Suite',
        image: '/assets/Arslan_Ash_cover.webp',
        badge: 'MASTER SUITE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'CUSTOM EMOTE CHARACTER SET',
        subtitle: 'Frame 02 // Interactive Twitch Emotes & Stylized Mascot Expressions',
        image: '/assets/Twitch emote presentation/Frame 2.jpg',
        badge: 'EMOTE SUITE',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'LOYALTY BADGES & SUB TIERS',
        subtitle: 'Frame 03 // Tiered Subscriber Badges & Custom Bit Reward Icons',
        image: '/assets/Twitch emote presentation/Frame 3.jpg',
        badge: 'SUB BADGES',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'STARTING SOON SCREEN',
        subtitle: 'Frame 04 // Broadcast Animated Intro Screen with Countdown',
        image: '/assets/Twitch emote presentation/Frame 4.jpg',
        badge: 'STREAM SCREEN',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'IN-GAME HUD & WEBCAM OVERLAY',
        subtitle: 'Frame 05 // Competitive Match Dynamic Overlay & Facecam Frame',
        image: '/assets/Twitch emote presentation/Frame 5.jpg',
        badge: 'GAME OVERLAY',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'INTERMISSION & CHATTING',
        subtitle: 'Frame 06 // Just Chatting & Tournament Break Broadcast Screen',
        image: '/assets/Twitch emote presentation/Frame 6.jpg',
        badge: 'INTERMISSION',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'STREAM ENDING & CREDITS',
        subtitle: 'Frame 07 // Stream Ending Screen with Social Links & Sponsor Badges',
        image: '/assets/Twitch emote presentation/Frame 7.jpg',
        badge: 'OUTRO SCREEN',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'OFFLINE CHANNEL BANNER',
        subtitle: 'Frame 08 // Official Twitch Offline Screen & Schedule Header',
        image: '/assets/Twitch emote presentation/Frame 8.jpg',
        badge: 'OFFLINE BANNER',
        aspect: 'aspect-[16/9]'
      },
      {
        title: 'ARSLAN 5X EVO CHAMPION CHIBI',
        subtitle: 'Sticker 01 // Official Arslan Ash Championship Trophy Chibi',
        image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 1.png',
        badge: 'CHIBI STICKER',
        aspect: 'aspect-[1/1]'
      },
      {
        title: 'TIGER MASCOT VICTORY EMOTE',
        subtitle: 'Sticker 02 // 4THRIVE Tiger Mascot Victory Pose Emote',
        image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 2.png',
        badge: 'CHIBI STICKER',
        aspect: 'aspect-[1/1]'
      },
      {
        title: 'SHADOW KITSUNE NINJA EMOTE',
        subtitle: 'Sticker 03 // Japanese Fox Mask Ninja Anime Character',
        image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 3.png',
        badge: 'CHIBI STICKER',
        aspect: 'aspect-[1/1]'
      },
      {
        title: 'FALAK CHIBI CHEER EMOTE',
        subtitle: 'Sticker 04 // Custom Falak Gaming Mascot Cheer Expression',
        image: '/assets/Twitch emote presentation/Stickers/Twitch sticker 4.png',
        badge: 'CHIBI STICKER',
        aspect: 'aspect-[1/1]'
      }
    ]
  },

  // =========================================================================
  // 5. GROWTH CREATIVE & VIDEO REELS PORTFOLIO (17 Full Video Reels)
  // =========================================================================
  {
    id: 'growth-creative-motion',
    slug: 'growth-creative-motion',
    title: 'GROWTH CREATIVE, MOTION & REELS',
    category: 'Short-Form Video, 3D Motion & Reels',
    client: 'Ashes Gaming · Red Bull · Hardware Brands · Top Creators',
    year: '2024 - 2026',
    description: 'High-velocity short-form reels, 3D motion graphics, cinematic tournament hype trailers, and performance advertising engineered for algorithmic growth across Instagram, TikTok, and YouTube Shorts.',
    cover: '/assets/Reel_cover.webp',
    gradientColors: ['#DA2086', '#FF7348', '#FFC15C', '#551276'],
    projectType: 'reels-portfolio',
    defaultColumns: 4,
    badgeText: '17 VIDEO REELS',
    presentationSections: [
      {
        title: "AUTOMOTIVE REVIEW MOTION EDIT",
        subtitle: "High-Retention Automotive Edit with Custom Sound Design",
        video: "/assets/REELS/4 MILLION VIEWS AUTOMOTIVE REVIEW.mp4",
        category: "Viral Review",
        orientation: "landscape",
        aspect: "aspect-[16/9]"
      },
      {
        title: "3D MAP & DOCUMENTARY ANIMATIONS",
        subtitle: "Cinematic Documentary 3D Map Animations & High-Pacing Edit",
        video: "/assets/REELS/CINEMATIC DOCUMENTARY ANIAMTIONS AND MAP ANIMATIONS AND 3D EDIT.mp4",
        category: "3D Motion",
        orientation: "landscape",
        aspect: "aspect-[16/9]"
      },
      {
        title: "BAAZ TAKEDOWN CHAMPIONSHIP TRAILER",
        subtitle: "High-Energy FGC Championship Trailer for Baaz Takedown",
        video: "/assets/REELS/baaz ptl 4.mp4",
        category: "Esports Hype",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "TEAM ASHES TOURNAMENT REEL",
        subtitle: "Official Team Ashes Esports Championship Journey",
        video: "/assets/REELS/Ashes reel.mp4",
        category: "Pro Team",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "FAKER X LEBRON \u2014 THE GOATS",
        subtitle: "Storytelling Comparison: Kings of Esports & Sports",
        video: "/assets/REELS/faker_lebron.mp4",
        category: "Viral Story",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "ASUS ROG AZOTH HARDWARE AD",
        subtitle: "Commercial Motion Graphics & Sound Design for Gaming Hardware",
        video: "/assets/REELS/rog_azoth.mp4",
        category: "Hardware Ad",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "CINEMATIC MOVIE BREAKDOWN",
        subtitle: "Viral Pop Culture Pacing & Retention Cut",
        video: "/assets/REELS/MOVIE REVIEW 1 MILLION VIEWS.mp4",
        category: "Film Culture",
        orientation: "landscape",
        aspect: "aspect-[16/9]"
      },
      {
        title: "GTA 6 NEXT-GEN CONCEPT REEL",
        subtitle: "Viral Gaming Speculation & Cinematic Hype Edit",
        video: "/assets/REELS/gta 6 sample video  (1).mp4",
        category: "Gaming Hype",
        orientation: "landscape",
        aspect: "aspect-[16/9]"
      },
      {
        title: "FERZEEN DYNAMIC MOTION EDIT",
        subtitle: "Speed-Ramping Motion Graphics & Velocity Pacing",
        video: "/assets/REELS/inter ferzeen reel02.mp4",
        category: "Velocity Cut",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "THE JON & USAMA VISA FEATURE",
        subtitle: "Esports Athlete Travel Documentary & Road to Championship",
        video: "/assets/REELS/jon usama visa final01.mp4",
        category: "Documentary",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "FIGHTING GAME DLC WISHLIST",
        subtitle: "Community Gaming Hype & Roster Wishlist Feature",
        video: "/assets/REELS/dlc_wishlist.mp4",
        category: "Gaming Culture",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "DANYAL MIRZA CREATOR REEL",
        subtitle: "YouTube Creator Pacing & Custom Kinetic Typography",
        video: "/assets/REELS/Danyal Mirza(2).mp4",
        category: "Creator Edit",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "HIGH-CONVERSION UGC PRODUCT REVIEW",
        subtitle: "Performance E-Commerce Video Pacing for Viral Ads",
        video: "/assets/REELS/UGC EDIT OR PRODUCT REVIEW.mp4",
        category: "Commercial",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "ESPORTS ARENA LIVE EVENT HIGHLIGHTS",
        subtitle: "Crowd Hype, Stage Pyros & Live Matchday Energy",
        video: "/assets/REELS/event video .mp4",
        category: "Live Event",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "PRO ATHLETE QUICKFIRE INTERVIEW",
        subtitle: "High-Pacing Short-Form Interview with Arslan Ash",
        video: "/assets/REELS/short interview.mp4",
        category: "Athlete Media",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "GROWTH CREATIVE MASTER REEL",
        subtitle: "Zenkai Media Agency Brand Systems & Motion Reel",
        video: "/assets/GROWTH CREATIVE.mp4",
        category: "Showreel",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      },
      {
        title: "ZENKAI STUDIO SHOWREEL",
        subtitle: "Motion Graphics, 3D Cinematics & Brand Identity Portfolio",
        video: "/media/reel-showcase.mp4",
        category: "Agency Showreel",
        orientation: "portrait",
        aspect: "aspect-[9/16]"
      }
    ]
  },

  // =========================================================================
  // 6. HIGH-CTR YOUTUBE THUMBNAILS (69 Thumbnails)
  // =========================================================================
  {
    id: 'thumbnails',
    slug: 'thumbnails',
    title: 'HIGH-CTR YOUTUBE THUMBNAIL PACKAGING',
    category: 'YouTube Packaging, Thumbnails & CTR Engineering',
    client: 'Top Gaming Creators · Red Bull Athletes · Esports Orgs',
    year: '2024 - 2026',
    description: 'Elite YouTube thumbnail packaging engineered for maximum click-through rates (CTR), high viewer retention, vibrant color psychology, and custom 3D typography across world-class esports gaming channels.',
    cover: '/assets/Thumbnails/Atif 2.jpg',
    gradientColors: ['#FF7348', '#FFC15C', '#F03391', '#551276'],
    projectType: 'thumbnails',
    defaultColumns: 2,
    badgeText: '69 THUMBNAILS',
    presentationSections: [
      {
        title: "JIREN CUSTOM FIGHTER SHOWDOWN",
        subtitle: "Custom Fighter Tech & Tournament Showcase",
        image: "/assets/Thumbnails/2025-01-04_09-01-54.jpg",
        badge: "CHARACTER",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PRO TEKKEN 8 COMBO MASTERCLASS",
        subtitle: "Optimal Damage Routes & Wall Carry Secrets",
        image: "/assets/Thumbnails/2025-01-04_09-02-08.jpg",
        badge: "TECH",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TOP TIER PUNISHMENT BREAKDOWN",
        subtitle: "Frame Advantage & Frame Trap Strategies",
        image: "/assets/Thumbnails/2025-01-04_09-02-21.jpg",
        badge: "GUIDE",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ULTIMATE MATCHUP STRATEGY",
        subtitle: "Neutral Control & Spacing Against Top Tiers",
        image: "/assets/Thumbnails/2025-01-04_09-02-55.jpg",
        badge: "STRATEGY",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CHAMPIONSHIP EXECUTION DRILLS",
        subtitle: "Pro Tournament Practice Routines",
        image: "/assets/Thumbnails/2025-01-04_09-03-06.jpg",
        badge: "TRAINING",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "DEFENSE & SIDESTEP MASTERY",
        subtitle: "Beating High-Pressure Offense in Tekken 8",
        image: "/assets/Thumbnails/2025-01-04_09-03-16.jpg",
        badge: "DEFENSE",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "HIGH-STAKES PRO TOURNAMENT RUN",
        subtitle: "Road Through Championship Winners Bracket",
        image: "/assets/Thumbnails/2025-01-04_09-03-30.jpg",
        badge: "MAJOR",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "UNBREAKABLE MENTALITY & CLUTCH PLAY",
        subtitle: "Championship Finals Decision Rounds",
        image: "/assets/Thumbnails/2025-01-04_09-03-41.jpg",
        badge: "TOURNAMENT",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "DREAMHACK ARENA SHOWDOWN",
        subtitle: "International Main Stage Grand Finals",
        image: "/assets/Thumbnails/2025-01-04_09-03-51.jpg",
        badge: "DREAMHACK",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "S-TIER CHARACTER TIER LIST",
        subtitle: "Patch Ranking & Meta Analysis",
        image: "/assets/Thumbnails/2025-01-04_09-04-07.jpg",
        badge: "TIER LIST",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CHAMPION VS CHALLENGER",
        subtitle: "First to 10 Intense Pro Deathmatch",
        image: "/assets/Thumbnails/2025-01-04_09-04-19.jpg",
        badge: "FT10",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PRO FGC HEAD-TO-HEAD",
        subtitle: "High Roller Money Match Finals",
        image: "/assets/Thumbnails/2025-01-04_09-04-30.jpg",
        badge: "SHOWDOWN",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CLASH OF TITANS",
        subtitle: "Top Ranked Global Competitor Duel",
        image: "/assets/Thumbnails/2025-01-04_09-04-43.jpg",
        badge: "RIVALRY",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "JACK-8 BALANCE PATCH CHANGES",
        subtitle: "Hitbox Fixes & Move Directional Buffs",
        image: "/assets/Thumbnails/2025-01-04_09-05-01.jpg",
        badge: "PATCH BREAKDOWN",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "WORLD TOUR PREPARATION",
        subtitle: "Behind The Scenes Training Bootcamp",
        image: "/assets/Thumbnails/2025-01-04_09-05-12.jpg",
        badge: "BOOTCAMP",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PRO PLAYER DIARIES",
        subtitle: "Travel, Strategy & Tournament Day Routine",
        image: "/assets/Thumbnails/2025-01-04_09-05-21.jpg",
        badge: "VLOG",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "LEVEL UP YOUR GAME: MASTERCLASS",
        subtitle: "Core Fundamentals & Tournament Mindset",
        image: "/assets/Thumbnails/2025-01-04_09-05-36.jpg",
        badge: "MASTERCLASS",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "5V5 ALL-STAR TEAM BATTLE",
        subtitle: "Pakistan vs The World Epic Showdown",
        image: "/assets/Thumbnails/2025-01-04_09-05-52.jpg",
        badge: "5V5 BATTLE",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "VS ALISA & LEGENDS",
        subtitle: "High-Ranked Destruction & Matchup Analysis",
        image: "/assets/Thumbnails/2025-01-04_09-06-04.jpg",
        badge: "LEGENDS",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH: LIVE HIGHLIGHTS",
        subtitle: "Twitch Stream Clutch Rounds & Insane Whiff Punishes",
        image: "/assets/Thumbnails/Arslan 1.jpg",
        badge: "HIGHLIGHTS",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH // AYHEQA MIDDLE EAST",
        subtitle: "Middle East Tour Championship Performance",
        image: "/assets/Thumbnails/Arslan 2.jpg",
        badge: "TOUR",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "RED BULL GOLDEN LETTERS",
        subtitle: "London Invitational Main Stage Visual Packaging",
        image: "/assets/Thumbnails/Arslan 3.jpg",
        badge: "RED BULL",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "VISITING WONDERS OF THE WORLD",
        subtitle: "Arslan Ash International Travel Vlog & Stories",
        image: "/assets/Thumbnails/Arslan 4.jpg",
        badge: "TRAVEL VLOG",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ESPORTS WORLD CUP: ARSLAN VS ATIF",
        subtitle: "The Ultimate Riyadh Clash of Champions",
        image: "/assets/Thumbnails/Arslan 5.jpg",
        badge: "EWC RIYADH",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TEKKEN .EXE FUNNY MOMENTS",
        subtitle: "Memes, Rage Quits & Ranked Shenanigans",
        image: "/assets/Thumbnails/Arslan 55.jpg",
        badge: ".EXE SPECIAL",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ESPORTS WORLD CUP RANKED RUN",
        subtitle: "Dominating The Competitive Ladder",
        image: "/assets/Thumbnails/Arslan 64.jpg",
        badge: "EWC",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH & KNEE: THE PODCAST",
        subtitle: "Who Inspired You? What Is Your Future Goal?",
        image: "/assets/Thumbnails/Arslan podcast.jpg",
        badge: "PODCAST",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PUBG MOBILE SPECIAL SHOWCASE",
        subtitle: "Arslan Ash Official Anniversary Stream",
        image: "/assets/Thumbnails/Arslan pubg.jpg",
        badge: "PUBG MOBILE",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "RAPID FIRE FT. KNEE",
        subtitle: "Unfiltered Q&A with The Greatest Fighting Game Rival",
        image: "/assets/Thumbnails/Arslan rapid fire.jpg",
        badge: "RAPID FIRE",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "OFFICIAL TEKKEN 8 TIER LIST",
        subtitle: "Definitive Tier Rankings with 8x EVO Champion",
        image: "/assets/Thumbnails/Arslan tierlist.jpg",
        badge: "TIER LIST",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "DREAMHACK TOP 8: ARSLAN VS MULGOLD",
        subtitle: "Grand Finals Bracket Reset & Victory",
        image: "/assets/Thumbnails/Arslan tournament.jpg",
        badge: "DREAMHACK",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH VS ABOOD LEGEND",
        subtitle: "Epic International Showdown & Matchup Breakdown",
        image: "/assets/Thumbnails/Arslan vs abood.jpg",
        badge: "SHOWDOWN",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH VS KNEE: THE ETERNAL RIVALRY",
        subtitle: "The Defining Rivalry of Modern Fighting Game History",
        image: "/assets/Thumbnails/Arslan vs knee.jpg",
        badge: "ICONIC RIVALRY",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ARSLAN ASH: OFFICIAL ATHLETE PROFILE",
        subtitle: "Red Bull Athlete & 8x EVO World Champion",
        image: "/assets/Thumbnails/Arslan.jpg",
        badge: "CREATOR",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ATIF BUTT // TEAM FALCONS 2024",
        subtitle: "Official Team Falcons Athlete Signing & Roster Reveal",
        image: "/assets/Thumbnails/Atif 1.jpg",
        badge: "FALCONS",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ATIF BUTT: DEMON AKUMA UNLEASHED",
        subtitle: "Masterclass Execution on World Championship Stage",
        image: "/assets/Thumbnails/Atif 2.jpg",
        badge: "CHAMPION",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ATIF BUTT: WORLD TOUR DOMINANCE",
        subtitle: "Tekken World Tour Championship Campaign",
        image: "/assets/Thumbnails/Atif 3.jpg",
        badge: "WORLD TOUR",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ATIF BUTT: OFFICIAL ATHLETE PROFILE",
        subtitle: "Tekken World Champion & Team Falcons Star",
        image: "/assets/Thumbnails/Atif.jpg",
        badge: "CHAMPION",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "BRYAN FURY TOP 1 COMBO ROUTES",
        subtitle: "Max Damage Wall Carry & Counter Hit Execution",
        image: "/assets/Thumbnails/IMG_6964.JPG",
        badge: "COMBO GUIDE",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "MISHIMA PERFECT EWGF GUIDE",
        subtitle: "Frame-Perfect Electric Wind God Fist Execution",
        image: "/assets/Thumbnails/IMG_6965.JPG",
        badge: "MISHIMA TECH",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "DRAGUNOV HIGH-PRESSURE META",
        subtitle: "Frame Advantage & Plus Frames Strategy",
        image: "/assets/Thumbnails/IMG_6966.JPG",
        badge: "META BREAKDOWN",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "7TH EVO CHAMPION ARSLAN ASH",
        subtitle: "Historic World Record Victory & Trophy Presentation",
        image: "/assets/Thumbnails/IMG_6967.JPG",
        badge: "7X EVO",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TEAM PAKISTAN VS TEAM SAUDI",
        subtitle: "Twisted Labs Official Matchday Broadcast Packaging",
        image: "/assets/Thumbnails/IMG_6968.JPG",
        badge: "TEAM MATCH",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CASTING TALENT // BROWNMAN & NAJD",
        subtitle: "Pakistan vs Saudi 2025 Broadcast Key Art",
        image: "/assets/Thumbnails/IMG_6969.JPG",
        badge: "BROADCAST",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "RED DEAD REDEMPTION 2: WE ARE BACK",
        subtitle: "Epic Open World Stream Special",
        image: "/assets/Thumbnails/IMG_6972.JPG",
        badge: "VARIETY",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "LIVE INTO THE STADIUM",
        subtitle: "Esports Arena Walkout & Stadium Broadcast",
        image: "/assets/Thumbnails/IMG_6973.JPG",
        badge: "STADIUM LIVE",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "HOMELESS CHALLENGE RUN",
        subtitle: "Zero Resources Ranked Challenge Series",
        image: "/assets/Thumbnails/IMG_6974.JPG",
        badge: "CHALLENGE",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ROAD TO GOLD: EVO JAPAN SPECIAL",
        subtitle: "Behind The Scenes in Tokyo & Tournament Run",
        image: "/assets/Thumbnails/IMG_6975.JPG",
        badge: "ROAD TO GOLD",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "UNREACTABLE LOWS & DEFENSE EXPLAINED",
        subtitle: "Fuzzy Guarding, Low Parries & Defensive Reads",
        image: "/assets/Thumbnails/IMG_6976(1).JPG",
        badge: "DEFENSE TECH",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "DIRECTOR IN SAN ANTONIO",
        subtitle: "On-Location Championship Documentary",
        image: "/assets/Thumbnails/IMG_6977.JPG",
        badge: "DOCUMENTARY",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "BLINDFOLDED TEKKEN CHALLENGE",
        subtitle: "Pure Sound Cues & Muscle Memory Mastery",
        image: "/assets/Thumbnails/IMG_6978.JPG",
        badge: "VIRAL CHALLENGE",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "THE BEST KUMA PLAYER IN THE WORLD",
        subtitle: "Bear Meta Destruction & Unorthodox Setups",
        image: "/assets/Thumbnails/IMG_6979.JPG",
        badge: "CHARACTER TECH",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "BEST ONLINE ANNA SPECIALIST",
        subtitle: "Chaos Stance Mixups & High-Ranked Gameplay",
        image: "/assets/Thumbnails/IMG_6980.JPG",
        badge: "ONLINE RANKED",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PAKISTAN TEKKEN LEAGUE: LAHORE",
        subtitle: "Historic National Tournament Stage Key Visual",
        image: "/assets/Thumbnails/IMG_6981.JPG",
        badge: "LAHORE ARENA",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ROAD TO ESPORTS WORLD CUP",
        subtitle: "Qualification Gauntlet & Intensive Scrims",
        image: "/assets/Thumbnails/IMG_6982.JPG",
        badge: "ROAD TO EWC",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PRO MATCHUP ANALYSIS",
        subtitle: "Frame Data & Whiff Punish In-Depth Breakdown",
        image: "/assets/Thumbnails/IMG_6983.JPG",
        badge: "ANALYSIS",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "FALCONS 2024 CHAMPIONSHIP SPECIAL",
        subtitle: "Team Falcons Celebration & Major Highlights",
        image: "/assets/Thumbnails/IMG_6984.JPG",
        badge: "FALCONS 2024",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "2024 SEASON HIGHLIGHT REEL",
        subtitle: "Best Tournament Rounds & Iconic Moments of 2024",
        image: "/assets/Thumbnails/IMG_6985.JPG",
        badge: "2024 REEL",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TEKKEN 8 RANKED GRIND",
        subtitle: "Pushing God of Destruction with Pro Athletes",
        image: "/assets/Thumbnails/IMG_6986.JPG",
        badge: "GOD OF DESTRUCTION",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CHARACTER SPECIALIST MASTERCLASS",
        subtitle: "Frame Traps, Okizeme & Wall Combos",
        image: "/assets/Thumbnails/IMG_6987.JPG",
        badge: "MASTERCLASS",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PRO EXECUTION SECRETS",
        subtitle: "Controller Grip, Timing & Tournament Readiness",
        image: "/assets/Thumbnails/IMG_6988.JPG",
        badge: "PRO SECRETS",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "ULTIMATE MATCHUP BREAKDOWN",
        subtitle: "Beating Korea and Japan on International Stage",
        image: "/assets/Thumbnails/IMG_6992.JPG",
        badge: "MATCHUP",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TEKKEN .EXE COMEDY SPECIAL",
        subtitle: "Insane Glitches, High IQ Plays & Funny Clips",
        image: "/assets/Thumbnails/IMG_6993.JPG",
        badge: ".EXE SPECIAL",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "HIGH-STAKES PRO SCRIMS",
        subtitle: "Ashes Gaming vs Global Pro Athletes Behind Closed Doors",
        image: "/assets/Thumbnails/IMG_6994.JPG",
        badge: "PRO SCRIMS",
        category: "rivalries",
        aspect: "aspect-[16/9]"
      },
      {
        title: "CHARACTER TIER LIST UPDATE",
        subtitle: "Post-Major Meta Shifts & Sleeper Picks",
        image: "/assets/Thumbnails/IMG_6995.JPG",
        badge: "TIER LIST",
        category: "guides",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PAKISTAN TEKKEN LEAGUE: STAGE 1 KARMA",
        subtitle: "Opening Stage Broadcast Key Visual & Brackets",
        image: "/assets/Thumbnails/IMG_8846.JPG",
        badge: "STAGE 1",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "PAKISTAN TEKKEN LEAGUE: STAGE 2 FINALS",
        subtitle: "Grand Finals Showdown at Pakistan Tekken League",
        image: "/assets/Thumbnails/IMG_8847.JPG",
        badge: "GRAND FINALS",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      },
      {
        title: "THE BAAZ: THE MOVIE",
        subtitle: "Official Feature Documentary & Cinematic Story",
        image: "/assets/Thumbnails/IMG_8849.JPG",
        badge: "THE MOVIE",
        category: "shows",
        aspect: "aspect-[16/9]"
      },
      {
        title: "TOURNAMENT PACKAGING SUITE",
        subtitle: "High-CTR YouTube Cover Art & Branding Architecture",
        image: "/assets/Thumbnails/PO.jpg",
        badge: "PACKAGING",
        category: "tournaments",
        aspect: "aspect-[16/9]"
      }
    ]
  }
];

export function getProjectBySlug(slug) {
  if (slug === 'arslan-ash') return projectsData.find((p) => p.slug === 'tekken-8-championship');
  if (slug === '4thrive') return projectsData.find((p) => p.slug === '4thrive-merch');
  if (slug === 'baaz') return projectsData.find((p) => p.slug === 'baaz-merch');
  if (slug === 'thumbnails' || slug === 'pakistan-tekken-showdown') return projectsData.find((p) => p.slug === 'thumbnails');
  if (slug === 'posters') return projectsData.find((p) => p.slug === 'tekken-8-championship');
  if (slug === 'reels') return projectsData.find((p) => p.slug === 'growth-creative-motion');
  if (slug === 'twitch' || slug === 'stickers' || slug === 'twitch-stream' || slug === 'arslan-stickers') return projectsData.find((p) => p.slug === 'twitch-stream-packaging');
  return projectsData.find((p) => p.slug === slug);
}
