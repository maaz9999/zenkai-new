import React, { useState, useEffect } from 'react';
import FolderFloat from './FolderFloat';
import { servicesData } from '../data/servicesData';
import { X } from 'lucide-react';

const SERVICE_ITEMS = [
  { label: 'Player Management', shortLabel: 'Player Management', value: 'player-management' },
  { label: 'Graphics (Thumbnails / Posters / Stream Assets)', shortLabel: 'Graphics & Stream Assets', value: 'graphics' },
  { label: '2D Illustration', shortLabel: '2D Illustration', value: '2d-illustration' },
  { label: 'Video Editing (Long Form / Short Form)', shortLabel: 'Video Editing', value: 'video-editing' },
  { label: 'Social Media Management', shortLabel: 'Social Media Management', value: 'social-media-management' }
];

/**
 * Our Craft Section:
 * - Solid pure black background with tactile film grain
 * - Default: Centered layout with section heading & interactive studio folder vault
 * - When a service pill is clicked:
 *   - Balanced split layout: Left side keeps OUR CRAFT and folder centered
 *   - Clean, refined, ultra-modern service info card appears firmly on the right
 *   - Pure informational card explaining only the opened service (no cluttered buttons)
 */
export default function OurCraft() {
  const [selectedService, setSelectedService] = useState(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  // Close service panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedService) {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const handleSelectService = (value) => {
    const target = String(value).toLowerCase();
    const found = servicesData.find(
      (s) =>
        s.slug === value ||
        s.id === value ||
        s.title.toLowerCase() === target ||
        s.title.toLowerCase().includes(target)
    );
    if (found) {
      setSelectedService(found);
      setIsFolderOpen(true);
    }
  };

  const handleCloseService = () => {
    setSelectedService(null);
  };

  return (
    <section 
      id="our-craft" 
      className={`relative bg-black transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden ${
        isFolderOpen 
          ? 'pt-16 pb-28 sm:pt-20 sm:pb-36 md:pt-24 md:pb-40' 
          : 'pt-14 pb-18 sm:pt-18 sm:pb-24 md:pt-20 md:pb-28'
      }`}
    >
      {/* Pure solid proper black base background */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Tactile film grain overlay */}
      <div className="grain-overlay opacity-25 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 ${
          selectedService ? 'items-stretch' : 'items-center'
        }`}>
          
          {/* LEFT SIDE: Heading + Folder Float */}
          <div 
            className={`w-full flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              selectedService 
                ? 'lg:col-span-6 justify-between translate-x-0' 
                : 'lg:col-span-12 translate-x-0'
            }`}
          >
            {/* Category tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348]" />
              <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
                STUDIO DISCIPLINES & EXPERTISE
              </span>
            </div>

            {/* Section Heading */}
            <h2 className={`font-heading font-black text-white tracking-tight uppercase leading-none transition-all duration-500 ${
              selectedService 
                ? 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl' 
                : 'text-3xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl'
            }`}>
              OUR CRAFT
            </h2>

            {/* Interactive Status Pill */}
            <div className="mt-3 mb-3 sm:mt-4 sm:mb-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm shadow-inner transition-all duration-300 max-w-[calc(100vw-32px)]">
              {selectedService ? (
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] animate-pulse shrink-0" />
                  <span className="text-white/90 text-[11px] sm:text-xs tracking-wider uppercase font-semibold truncate">
                    Viewing {selectedService.titleFirstLine} · Click to switch
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseService}
                    className="ml-1 sm:ml-1.5 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 border border-white/20 cursor-pointer shadow-sm shrink-0"
                    aria-label="Back to overview"
                    title="Close selection"
                  >
                    Close ✕
                  </button>
                </div>
              ) : isFolderOpen ? (
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] animate-pulse shrink-0" />
                  <span className="text-white/80 text-[11px] sm:text-xs tracking-wider uppercase font-semibold truncate">
                    Vault open · Click any discipline
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFolderOpen(false)}
                    className="ml-1 sm:ml-1.5 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 border border-white/20 cursor-pointer shadow-sm shrink-0"
                    aria-label="Close folder"
                    title="Close folder"
                  >
                    Close ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <p className="text-white/70 text-[11px] sm:text-xs tracking-widest uppercase font-semibold truncate">
                    Click the folder below to unveil our services
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Folder Float Container */}
            <div 
              className={`w-full relative flex flex-col items-center justify-center transition-all duration-[520ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isFolderOpen 
                  ? selectedService 
                    ? 'pt-44 pb-6 sm:pt-64 sm:pb-12 min-h-[460px] sm:min-h-[580px]' 
                    : 'pt-48 pb-8 sm:pt-80 sm:pb-16 min-h-[490px] sm:min-h-[660px]'
                  : 'pt-2 pb-3 min-h-[200px]'
              }`}
            >
              <div 
                className={`relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isFolderOpen ? (selectedService ? 'translate-y-8 sm:translate-y-14' : 'translate-y-14 sm:translate-y-24') : 'translate-y-0'
                }`}
              >
                <FolderFloat
                  items={SERVICE_ITEMS}
                  label="OUR SERVICES"
                  sublabel="5 disciplines"
                  trigger="click"
                  open={isFolderOpen}
                  defaultOpen={false}
                  closeOnSelect={false}
                  physics={true}
                  drift={0.4}
                  activeValue={selectedService?.slug || selectedService?.id}
                  compact={Boolean(selectedService)}
                  onSelect={handleSelectService}
                  onOpenChange={(open) => setIsFolderOpen(open)}
                  folderColor="#35064A"
                  frontColor="#68118A"
                  paperColor="#FFFFFF"
                  itemColor="#FFFFFF"
                  itemTextColor="#FFFFFF"
                  labelColor="#FFFFFF"
                  width={selectedService ? 280 : 330}
                  height={selectedService ? 190 : 220}
                  radius={18}
                  spread={selectedService ? 240 : 380}
                  lift={selectedService ? 22 : 26}
                  tilt={3}
                  flapAngle={38}
                  restAngle={0}
                  openDuration={520}
                  stagger={45}
                  bounce={0.3}
                />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Visual Studio Showcase Dossier — Matching Section Height & High-End Studio Aesthetic */}
          {selectedService && (
            <div className="w-full lg:col-span-6 flex justify-center lg:justify-end mt-6 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-500 h-full">
              <div className="relative w-full max-w-md lg:max-w-[480px] xl:max-w-[520px] ml-auto rounded-3xl bg-[#0c0514]/95 backdrop-blur-2xl border border-white/[0.14] p-5 sm:p-6 lg:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-white transition-all flex flex-col justify-between h-full min-h-[540px] sm:min-h-[580px] lg:min-h-[600px] xl:min-h-[630px]">
                
                {/* Ultra-subtle gradient highlight along top edge */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-transparent opacity-90" />
                
                {/* Soft ambient atmospheric glow behind card */}
                <div 
                  className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[70px] opacity-35 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #DA2086 0%, #8C1FA8 60%, transparent 100%)' }}
                />
                <div 
                  className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-[70px] opacity-25 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #FF7348 0%, #FFC15C 50%, transparent 100%)' }}
                />
                <div className="grain-overlay opacity-20 pointer-events-none" />

                {/* Top Docket Bar: Discipline Number + Tag & Clean Close Button */}
                <div className="flex items-center justify-between relative z-10 pb-1">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
                    <span className="font-mono text-xs font-black text-[#FF7348]">
                      {selectedService.number || '01'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-[11px] font-mono tracking-widest uppercase text-white/80 font-bold">
                      {selectedService.tag}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseService}
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                    aria-label="Close service details"
                    title="Close"
                  >
                    <span className="text-[11px] font-bold tracking-wider uppercase">Close</span>
                    <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>

                {/* Featured Visual Media Preview Window */}
                {selectedService.previewImage && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 my-3.5 group/media shadow-[0_12px_32px_rgba(0,0,0,0.7)] bg-black/50 z-10 shrink-0">
                    <img 
                      src={selectedService.previewImage} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/media:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                    
                    {/* Badge on visual showcase */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-extrabold uppercase tracking-widest text-white/95">
                      {selectedService.badge || 'STUDIO SPEC'}
                    </span>
                  </div>
                )}

                {/* Service Header & Description */}
                <div className="relative z-10 text-left my-1">
                  <h3 className="font-heading font-black text-2xl sm:text-3xl xl:text-4xl uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                    {selectedService.titleFirstLine} {selectedService.titleSecondLine}
                  </h3>
                  <p className="text-white/75 text-xs sm:text-[13.5px] leading-relaxed font-normal mt-2">
                    {selectedService.description}
                  </p>
                </div>

                {/* Deliverables & Scope — Modern Glowing Chip Pills */}
                <div className="pt-3.5 border-t border-white/[0.08] relative z-10 text-left mt-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFC15C] font-bold mb-2.5">
                    Scope & Production Deliverables
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selectedService.scopePills || selectedService.details).map((pill, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] text-xs font-semibold text-white/90 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] shrink-0" />
                        <span>{pill}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
