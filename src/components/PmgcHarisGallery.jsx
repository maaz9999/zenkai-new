import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from 'lucide-react';
import { pmgcSections } from '../data/pmgcData';

export default function PmgcHarisGallery({
  sections = pmgcSections,
  id = 'pmgc-work',
  eyebrow = 'More PUBG Mobile work · Haris',
  title = 'Built for the battleground.',
  description = 'Explore the expanded collection: Global Open key art, Silent Wolves All Stars War tournament graphics, creator thumbnails, tournament identity, and two broadcast animations by Haris.',
  filterLabel = 'Filter PUBG Mobile work',
  showCTA = true,
}) {
  const collections = ['All Work', ...new Set(sections.map((item) => item.category))];
  const [collection, setCollection] = useState('All Work');
  const [activeIndex, setActiveIndex] = useState(null);
  const dialog = useRef(null);
  const active = activeIndex === null ? null : sections[activeIndex];
  const visible = sections.filter((item) => collection === 'All Work' || item.category === collection);

  useEffect(() => {
    if (activeIndex === null) return;
    const modal = dialog.current;
    if (!modal.open) modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeIndex]);

  const close = () => { dialog.current?.close(); setActiveIndex(null); };
  const move = (direction) => setActiveIndex((index) => (index + direction + sections.length) % sections.length);

  return (
    <div className="min-h-screen bg-[#08050c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <section id={id} className="scroll-mt-24">
          <div className="flex flex-wrap gap-3 justify-between items-end border-t border-white/15 pt-8 mb-6">
            <div><p className="text-sm text-[#FFC15C] uppercase tracking-widest mb-2">{eyebrow}</p><h2 className="font-heading text-3xl sm:text-5xl font-black uppercase">{title}</h2></div>
            <p className="text-sm text-white/50">{visible.length} {visible.length === 1 ? 'asset' : 'assets'}</p>
          </div>
          <p className="text-white/65 text-base leading-relaxed max-w-3xl mb-6">{description}</p>
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label={filterLabel}>
            {collections.map((name) => <button key={name} aria-pressed={collection === name} onClick={() => setCollection(name)} className={`rounded-full px-4 py-2.5 text-sm font-semibold border transition-colors ${collection === name ? 'bg-[#FFC15C] border-[#FFC15C] text-black' : 'border-white/20 text-white/75 hover:bg-white/10'}`}>{name}</button>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {visible.map((item) => (
              <article key={item.title} className="rounded-2xl overflow-hidden bg-[#100c16] border border-white/10">
                <button onClick={() => setActiveIndex(sections.indexOf(item))} aria-label={`${item.video ? 'Play' : 'Expand'} ${item.title}`} className="relative w-full group block bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC15C] focus-visible:outline-offset-[-3px]">
                  {item.image || item.poster ? <img src={item.image || item.poster} alt={item.title} width={item.width} height={item.height} loading="lazy" decoding="async" className="w-full h-auto object-contain" /> : <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#671022] to-[#170817]"><Play className="w-12 h-12 text-[#FFC15C]" /><span className="font-mono text-sm text-white/70">{item.title.includes('Stinger') ? 'BROADCAST STINGER' : 'STARTING SOON'}</span></div>}
                  <span className="absolute top-3 right-3 rounded-full p-2 bg-black/75 text-white group-hover:bg-[#FF7348] transition-colors">{item.video ? <Play size={16} /> : <Maximize2 size={16} />}</span>
                </button>
                <div className="p-4"><p className="text-[#FFC15C] text-sm mb-2">{item.discipline || item.category}{item.credit && ` · ${item.credit}`}</p><h3 className="font-heading text-base font-bold leading-snug">{item.title}</h3></div>
              </article>
            ))}
          </div>
          {showCTA && <div className="mt-14 rounded-3xl border border-white/15 p-7 sm:p-10 flex flex-wrap items-center justify-between gap-6 bg-[#140b1e]">
            <div><h2 className="font-heading text-2xl sm:text-3xl font-black uppercase">Your next event. Our next canvas.</h2><p className="text-white/60 mt-2 text-base">Key visuals, tournament campaigns, and broadcast design.</p></div>
            <Link to="/start-a-project" className="rounded-full bg-[#FF7348] text-black px-6 py-3 font-bold hover:bg-[#FFC15C] transition-colors">Start a project</Link>
          </div>}
        </section>
      </div>
      <dialog ref={dialog} onCancel={close} onClose={() => setActiveIndex(null)} onClick={(event) => { if (event.target === dialog.current) close(); }} onKeyDown={(event) => { if (event.target.tagName === 'VIDEO') return; if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1); }} aria-label={active?.title || 'Artwork viewer'} className="fixed inset-0 m-auto w-[96vw] max-w-6xl max-h-[95dvh] rounded-2xl border border-white/20 bg-[#08050c] p-4 text-white backdrop:bg-black/95">
        {active && <>
          <div className="flex items-center justify-between gap-4 mb-4"><p className="text-sm text-white/75">{activeIndex + 1} / {sections.length} · {active.category}</p><button autoFocus onClick={close} aria-label="Close viewer" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><X /></button></div>
          {active.video ? <video key={active.video} src={encodeURI(active.video)} poster={active.poster} aria-label={active.title} controls autoPlay playsInline className="w-full max-h-[70dvh] bg-black" /> : <img src={active.image} alt={active.title} className="w-full max-h-[70dvh] object-contain" />}
          <div className="flex items-center justify-between gap-4 mt-4"><button onClick={() => move(-1)} aria-label="Previous asset" className="p-2 rounded-full bg-white/10"><ChevronLeft /></button><h2 className="text-sm sm:text-base font-bold text-center">{active.title}</h2><button onClick={() => move(1)} aria-label="Next asset" className="p-2 rounded-full bg-white/10"><ChevronRight /></button></div>
        </>}
      </dialog>
    </div>
  );
}
