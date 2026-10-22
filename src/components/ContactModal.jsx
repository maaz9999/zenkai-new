import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

/**
 * Interactive Contact Modal
 * Triggered by "Start a Project" button from Final CTA (Screenshot 6)
 */
export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Tournament Key Art & Posters',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
        {/* Background gradient glow */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF7348 0%, #F03391 100%)' }}
        />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-[#FF7348] mb-4" />
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mb-2">
              MESSAGE RECEIVED
            </h3>
            <p className="text-neutral-300 text-sm max-w-sm mb-6">
              Thank you for reaching out to Zenkai Media. Our creative team will get back to you within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="bg-[#FF7348] hover:bg-[#ff5d2b] text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF7348]">
                INQUIRE CREATIVE
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mt-1">
                START A PROJECT
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Tell us about your esports team, tournament, or creative vision.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex / Ashes Team"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7348] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Email / Discord
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="yourname@gmail.com or Discord ID"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7348] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Project Discipline
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7348] transition-colors cursor-pointer"
                >
                  <option value="Tournament Key Art & Posters">Tournament Key Art & Posters</option>
                  <option value="High-CTR YouTube Packaging">High-CTR YouTube Packaging</option>
                  <option value="Short-Form Reels & Motion">Short-Form Reels & Motion</option>
                  <option value="Esports Player Representation">Player Management & Branding</option>
                  <option value="Twitch Stream & Brand Identity">Twitch & Org Identity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Project Scope
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your timeline, assets, or objectives..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7348] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF7348] hover:bg-[#ff5d2b] text-white font-bold py-3.5 rounded-full text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Send Brief</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
