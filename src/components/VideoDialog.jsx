import React, { useEffect, useRef, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function VideoDialog({ video, onClose }) {
  const dialogRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="sample-video-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-auto w-[calc(100%-24px)] max-w-6xl max-h-[90dvh] p-0 rounded-2xl border border-white/20 bg-[#0b0910] text-white shadow-2xl backdrop:bg-black/90"
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <h2 id="sample-video-title" className="text-sm sm:text-base tracking-tight">{video.title}</h2>
        <button autoFocus type="button" onClick={onClose} aria-label="Close video" className="p-2 rounded-full border border-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFC15C]">
          <X size={20} />
        </button>
      </div>
      <video
        key={video.video}
        src={video.video}
        poster={video.poster}
        controls autoPlay playsInline preload="auto"
        aria-label={video.title}
        onError={() => setFailed(true)}
        className="w-full max-h-[70dvh] bg-black object-contain"
      />
      <div className="px-4 sm:px-6 py-4 flex flex-wrap justify-between gap-3 text-xs text-white/60">
        <p role={failed ? 'alert' : undefined}>{failed ? 'Playback could not start. Try opening the video directly.' : video.subtitle}</p>
        <a href={video.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#FFC15C] hover:underline">Open video <ExternalLink size={13} /></a>
      </div>
    </dialog>
  );
}
