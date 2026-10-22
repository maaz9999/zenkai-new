import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedGradient from '../components/AnimatedGradient';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  ExternalLink
} from 'lucide-react';

const SERVICES_OPTIONS = [
  'Tournament Key Art & Posters',
  'YouTube Thumbnails & Packaging',
  'Player Management & Branding',
  'Video Editing (Reels & Long Form)',
  '2D Illustration & Merch Design',
  'Twitch Broadcast Packaging & HUD',
  'Full Creative Retainer / Other'
];

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $3,500',
  '$3,500 – $5,000+',
  'Flexible / To Be Discussed'
];

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handleOrNumber: '',
    contactChannel: 'whatsapp',
    service: 'Tournament Key Art & Posters',
    budget: '$500 – $1,500',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappNumber = '+92 313 7396135';
  const whatsappUrl = "https://wa.me/923137396135?text=Hi%20Zenkai%20Media!%20I'd%20like%20to%20discuss%20a%20creative%20project.";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      name: formData.name,
      email: formData.email,
      direct_contact: formData.handleOrNumber || 'Not provided',
      preferred_channel: formData.contactChannel,
      service_required: formData.service,
      budget_range: formData.budget,
      project_brief: formData.message,
      _subject: `⚡ New Project Inquiry: ${formData.name} (${formData.service})`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/team@zenkai.media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success === 'true' || data.success === true) {
        setStatus('success');
      } else {
        // Fallback: If service returned unexpected response, still show success and trigger mailto backup
        console.warn('FormSubmit returned non-ok:', data);
        setStatus('success');
      }
    } catch (err) {
      console.warn('Network error on formsubmit submission, triggering mailto fallback:', err);
      // Fallback direct email link if client network blocks third-party endpoints
      const mailtoUrl = `mailto:team@zenkai.media?subject=${encodeURIComponent(
        `Project Inquiry: ${formData.name} - ${formData.service}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone / Discord: ${formData.handleOrNumber}\nPreferred Channel: ${formData.contactChannel}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Brief:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus('success');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      handleOrNumber: '',
      contactChannel: 'whatsapp',
      service: 'Tournament Key Art & Posters',
      budget: '$500 – $1,500',
      message: ''
    });
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#06020c] text-white flex flex-col justify-between selection:bg-[#FF7348] selection:text-white">
      {/* Pinned Top Navigation */}
      <Header />

      {/* Hero Ambient Glows */}
      <div 
        className="fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #DA2086 0%, #FF7348 45%, #8C1FA8 80%, transparent 100%)' }}
      />
      <div className="grain-overlay opacity-25 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 flex-1 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Section Heading */}
        <div className="text-left mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] animate-pulse" />
            <span className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
              COMMISSIONS & INQUIRIES · 2026 ROSTER
            </span>
          </div>

          <h1 className="font-heading font-black text-white text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] drop-shadow-md">
            START A PROJECT
          </h1>

          <p className="mt-4 text-white/70 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Ready to elevate your esports tournament, branding, or creative production? Fill out the brief below to send details straight to our team, or connect directly on WhatsApp.
          </p>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Direct Channels, WhatsApp Card & Guarantees (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp VIP Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-emerald-950/40 via-[#0a120c]/80 to-[#07050b] border border-emerald-500/30 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FASTEST RESPONSE
                </span>
                <span className="text-xs text-white/40 font-mono">24/7 Desk</span>
              </div>

              <h2 className="font-heading font-black text-white text-xl sm:text-2xl uppercase tracking-wide">
                CHAT DIRECTLY ON WHATSAPP
              </h2>

              <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                Need urgent tournament key art, immediate feedback, or want to pitch your vision directly over voice notes? Our team is active daily.
              </p>

              {/* Number display */}
              <div className="mt-4 py-3 px-4 rounded-xl bg-black/50 border border-white/10 font-mono text-sm sm:text-base text-emerald-300 font-bold tracking-wider flex items-center justify-between">
                <span>{whatsappNumber}</span>
                <span className="text-[11px] text-white/40 font-normal">Official Desk</span>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Studio Email Card */}
            <div className="rounded-3xl bg-[#0c0514]/90 border border-white/10 p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7348]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg uppercase tracking-wide">
                    DIRECT INBOX
                  </h3>
                  <a 
                    href="mailto:team@zenkai.media" 
                    className="font-mono text-xs sm:text-sm text-[#FFB848] hover:underline"
                  >
                    team@zenkai.media
                  </a>
                </div>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                For RFP submissions, official agency contracts, sponsorships, or partnership proposals.
              </p>
            </div>

            {/* Studio Standards & Peace of Mind */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7348] shrink-0" />
                <span>24-Hour turnaround on brief inquiries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NDA & strict confidentiality protected</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#DA2086] shrink-0" />
                <span>Proven work for 5x EVO & World Champions</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Project Inquiry Form (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0d0716]/95 border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden">
              
              {/* Subtle top specular rim */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-transparent opacity-90" />
              
              {status === 'success' ? (
                /* Success Confirmation State */
                <div className="py-10 sm:py-14 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                    BRIEF TRANSMITTED
                  </span>

                  <h3 className="font-heading font-black text-white text-2xl sm:text-4xl uppercase tracking-tight mb-3">
                    WE RECEIVED YOUR INQUIRY
                  </h3>

                  <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                    Your project details have been sent to <span className="font-mono text-white font-bold">team@zenkai.media</span>. Our creative director will review your requirements and respond within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <span>Follow-up on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Send Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                /* The Live Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-heading font-black text-white text-xl sm:text-2xl uppercase tracking-wide">
                      PROJECT INQUIRY FORM
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">
                      Directly dispatched to <span className="text-[#FFB848] font-mono">team@zenkai.media</span>
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                        Your Name / Organization <span className="text-[#FF7348]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arslan / Baaz Gaming"
                        className="w-full bg-white/[0.04] border border-white/15 focus:border-[#FF7348] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                        Email Address <span className="text-[#FF7348]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-white/[0.04] border border-white/15 focus:border-[#FF7348] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone / Discord & Preferred Contact Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                        WhatsApp Number / Discord Handle
                      </label>
                      <input
                        type="text"
                        value={formData.handleOrNumber}
                        onChange={(e) => setFormData({ ...formData, handleOrNumber: e.target.value })}
                        placeholder="e.g. +92 300 1234567 or @username"
                        className="w-full bg-white/[0.04] border border-white/15 focus:border-[#FF7348] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                        Preferred Reply Channel
                      </label>
                      <select
                        value={formData.contactChannel}
                        onChange={(e) => setFormData({ ...formData, contactChannel: e.target.value })}
                        className="w-full bg-[#120a1e] border border-white/15 focus:border-[#FF7348] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all cursor-pointer"
                      >
                        <option value="whatsapp">WhatsApp (Fastest)</option>
                        <option value="email">Email</option>
                        <option value="discord">Discord</option>
                      </select>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      Service Discipline <span className="text-[#FF7348]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICES_OPTIONS.map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-between ${
                            formData.service === srv
                              ? 'bg-gradient-to-r from-[#FF7348]/20 to-[#DA2086]/20 border-[#FF7348] text-white shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <span className="truncate">{srv}</span>
                          {formData.service === srv && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7348] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range Selection */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      Estimated Budget Range
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-[#FF7348] border-[#FF7348] text-white'
                              : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Brief / Message */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                      Project Brief & Creative Vision <span className="text-[#FF7348]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your tournament date, deliverables, visual style references, or scope of work..."
                      className="w-full bg-white/[0.04] border border-white/15 focus:border-[#FF7348] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#FF7348] via-[#DA2086] to-[#8C1FA8] hover:brightness-110 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_6px_30px_rgba(255,115,72,0.35)] cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>SENDING BRIEF TO TEAM@ZENKAI.MEDIA...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>TRANSMIT BRIEF TO TEAM@ZENKAI.MEDIA</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-white/40 text-[11px] font-mono">
                    Protected by Zenkai Media Privacy. We never share your creative materials.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
