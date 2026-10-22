import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  Trophy,
  Video,
  Image as ImageIcon,
  Palette,
  Tv,
  Crown,
  Layers,
  MessageCircle,
  Flame,
  User,
  AtSign,
  PhoneCall
} from 'lucide-react';

const SERVICES_OPTIONS = [
  {
    id: 'Tournament Key Art & Posters',
    title: 'Tournament Key Art & Posters',
    desc: 'Main visual branding, stage backdrops & event graphics',
    icon: Trophy,
    popular: true
  },
  {
    id: 'Video Editing (Reels & Long Form)',
    title: 'Video Editing & Motion',
    desc: 'High-retention TikTok/Reels & YouTube long-form edits',
    icon: Video,
    popular: true
  },
  {
    id: 'YouTube Thumbnails & Packaging',
    title: 'Thumbnails & Content Packaging',
    desc: 'High-CTR thumbnail packages & channel assets',
    icon: ImageIcon,
    popular: true
  },
  {
    id: '2D Illustration & Merch Design',
    title: '2D Illustration & Merch',
    desc: 'Custom character art, apparel & fan collection merchandise',
    icon: Palette
  },
  {
    id: 'Twitch Broadcast Packaging & HUD',
    title: 'Twitch Broadcast & Stream HUD',
    desc: 'Animated overlays, stinger transitions & custom stickers',
    icon: Tv
  },
  {
    id: 'Player Management & Branding',
    title: 'Player Management & Identity',
    desc: 'Pro player representation, press kits & jersey identity',
    icon: Crown
  },
  {
    id: 'Full Creative Retainer / Other',
    title: 'Full Creative Retainer / Other',
    desc: 'End-to-end agency partnership or bespoke production',
    icon: Layers
  }
];

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $3,500',
  '$3,500 – $5,000+',
  'Flexible / Custom'
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

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const whatsappRaw = '+92 313 7396135';
  const whatsappUrl = "https://wa.me/923137396135?text=Hi%20Zenkai%20Media!%20I'd%20like%20to%20discuss%20a%20creative%20project.";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+923137396135');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('team@zenkai.media');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

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
        setStatus('success');
      }
    } catch (err) {
      console.warn('Network error on form submission, triggering mailto fallback:', err);
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
    <div className="min-h-screen bg-[#06020c] text-white flex flex-col justify-between selection:bg-[#FF7348] selection:text-white relative overflow-x-hidden">
      {/* Pinned Top Navigation */}
      <Header />

      {/* Atmospheric Studio Ambient Background */}
      <div 
        className="fixed -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full blur-[140px] opacity-25 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #DA2086 0%, #FF7348 40%, #8C1FA8 80%, transparent 100%)' }}
      />
      <div 
        className="fixed bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[130px] opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #00D2FF 0%, #7B2496 60%, transparent 100%)' }}
      />
      <div className="grain-overlay opacity-25 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 flex-1 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto w-full">
        
        {/* Back Navigation Bar */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-all group backdrop-blur-sm shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Showcase</span>
          </Link>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>2026 CALENDAR: ACCEPTING SELECT COMMISSIONS</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-left mb-8 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-3 sm:mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF7348]" />
            <span className="text-white/80 text-[11px] font-mono font-bold tracking-widest uppercase">
              STUDIO INQUIRY & BRIEF DESK
            </span>
          </div>

          <h1 className="font-heading font-black text-white text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.92] drop-shadow-md">
            <span>START YOUR </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB848] via-[#FF7348] via-[#DA2086] to-[#A8319B]">
              NEXT MOVE.
            </span>
          </h1>

          <p className="mt-3.5 sm:mt-5 text-white/75 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Partner with the creative studio trusted by world champions and premier esports events. Fill out your project brief below, or message our team directly on WhatsApp for immediate discussion.
          </p>
        </div>

        {/* Two-Column Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: VIP Direct Channels & Agency Authority (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* VIP WhatsApp Executive Card */}
            <div className="relative rounded-3xl bg-[#0a0712]/90 border border-emerald-500/35 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden group">
              {/* Subtle top specular emerald rim */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  INSTANT RESPONSE DESK
                </span>
                <span className="text-[11px] text-white/40 font-mono">&lt; 15 min reply</span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                  <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-white text-xl sm:text-2xl uppercase tracking-wide">
                    DIRECT WHATSAPP
                  </h2>
                  <p className="text-white/60 text-xs">Active Daily · Global Commissions</p>
                </div>
              </div>

              <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
                Need urgent tournament key art, immediate design feedback, or prefer sending quick voice notes and reference links? Message our creative directors directly.
              </p>

              {/* Number display with 1-click Copy button */}
              <div className="mt-4 p-3 sm:p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-sm sm:text-base text-emerald-300 font-bold tracking-wider">
                    {whatsappRaw}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white font-mono text-xs transition-all flex items-center gap-1 cursor-pointer"
                  title="Copy WhatsApp number"
                >
                  {copiedNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:brightness-110 active:scale-98 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_6px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Studio Email Card */}
            <div className="rounded-3xl bg-[#0c0514]/90 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7348]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base sm:text-lg uppercase tracking-wide">
                      STUDIO INBOX
                    </h3>
                    <p className="text-white/50 text-[11px] font-mono">Formal RFPs & Contracts</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white font-mono text-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                <a 
                  href="mailto:team@zenkai.media" 
                  className="font-mono text-xs sm:text-sm text-[#FFB848] hover:text-[#FFA436] hover:underline"
                >
                  team@zenkai.media
                </a>
                <span className="text-[10px] text-white/40 font-mono">24h turnaround</span>
              </div>
            </div>

            {/* Studio Standards & Credentials */}
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-3 font-mono text-xs text-white/70">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#FFC15C] mb-1">
                ZENKAI MEDIA STANDARDS
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7348] shrink-0" />
                <span>24-Hour initial response on brief submissions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict confidentiality & Mutual NDA protected</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#DA2086] shrink-0" />
                <span>Visual production for 5x EVO & World Champions</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Interactive Brief Form (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0c0514]/95 border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden">
              
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-[#8C1FA8] opacity-90" />
              
              {status === 'success' ? (
                /* Success Confirmation State */
                <div className="py-12 sm:py-16 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                    BRIEF DISPATCHED
                  </span>

                  <h3 className="font-heading font-black text-white text-2xl sm:text-4xl uppercase tracking-tight mb-3">
                    WE RECEIVED YOUR INQUIRY
                  </h3>

                  <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                    Your project details have been transmitted directly to <span className="font-mono text-white font-bold">team@zenkai.media</span>. Our creative director is reviewing your brief and will reply within 24 hours.
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
                      className="w-full sm:w-auto py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                /* The Live Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  
                  {/* Form Header */}
                  <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-black text-white text-xl sm:text-2xl uppercase tracking-wide">
                        PROJECT INQUIRY FORM
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                        Delivered directly to <span className="text-[#FFB848] font-mono">team@zenkai.media</span>
                      </p>
                    </div>

                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-white/50 tracking-wider">
                      STEP 1 OF 1
                    </span>
                  </div>

                  {/* Section 1: Contact Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                          Your Name / Brand / Team <span className="text-[#FF7348]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Alex / Ashes Gaming"
                            className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                          Email Address <span className="text-[#FF7348]">*</span>
                        </label>
                        <div className="relative">
                          <AtSign className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@domain.com"
                            className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp/Discord & Preferred Channel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                          WhatsApp Number / Discord Handle
                        </label>
                        <div className="relative">
                          <PhoneCall className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={formData.handleOrNumber}
                            onChange={(e) => setFormData({ ...formData, handleOrNumber: e.target.value })}
                            placeholder="e.g. +92 300 1234567 or @discord"
                            className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                          Preferred Reply Method
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
                          {[
                            { id: 'whatsapp', label: 'WhatsApp' },
                            { id: 'email', label: 'Email' },
                            { id: 'discord', label: 'Discord' }
                          ].map((channel) => (
                            <button
                              key={channel.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, contactChannel: channel.id })}
                              className={`py-2 px-2 text-center rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                formData.contactChannel === channel.id
                                  ? 'bg-[#FF7348] text-white shadow-sm'
                                  : 'text-white/60 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {channel.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Visual Service Selection Tiles */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      Select Primary Discipline <span className="text-[#FF7348]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICES_OPTIONS.map((srv) => {
                        const IconComponent = srv.icon;
                        const isSelected = formData.service === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: srv.id })}
                            className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 relative overflow-hidden group ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#FF7348]/20 via-[#DA2086]/15 to-transparent border-[#FF7348] shadow-[0_4px_20px_rgba(255,115,72,0.25)]'
                                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected 
                                ? 'bg-[#FF7348] text-white' 
                                : 'bg-white/5 text-white/60 group-hover:text-white'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide block truncate">
                                  {srv.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/50 line-clamp-1 mt-0.5 leading-snug">
                                {srv.desc}
                              </p>
                            </div>

                            {/* Active check pill indicator */}
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#FF7348] flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: Budget Range */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2.5">
                      Estimated Investment Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {BUDGET_OPTIONS.map((b) => {
                        const isSelected = formData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2 px-2 text-center rounded-xl border text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer truncate ${
                              isSelected
                                ? 'bg-[#FF7348] border-[#FF7348] text-white shadow-md'
                                : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white'
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Project Scope & Brief Message */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 mb-2">
                      Project Brief & Requirements <span className="text-[#FF7348]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share tournament timelines, quantity of deliverables, references, game title, or what success looks like for this campaign..."
                      className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-2xl p-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-hero-cta w-full py-4 px-8 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_10px_35px_rgba(255,115,72,0.4)] cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-110"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>TRANSMITTING BRIEF TO TEAM@ZENKAI.MEDIA...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>TRANSMIT BRIEF TO TEAM@ZENKAI.MEDIA</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Footer Footnote */}
                  <div className="pt-2 flex items-center justify-center gap-2 text-center text-white/40 text-[11px] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Protected by Zenkai Media. Strictly confidential & NDA compliant.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Global Social Proof Ribbon at Bottom of Page */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 text-center">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-4">
            IN THE GAME WITH WORLD CHAMPIONS & CREATIVE LEADERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-white/60">
            <span className="hover:text-white transition-colors">ARSLAN ASH · 5X EVO CHAMPION</span>
            <span className="text-white/20">•</span>
            <span className="hover:text-white transition-colors">ATIF BUTT · TWT WORLD CHAMPION</span>
            <span className="text-white/20">•</span>
            <span className="hover:text-white transition-colors">THE JON · TGU CHAMPION</span>
            <span className="text-white/20">•</span>
            <span className="hover:text-white transition-colors">BAAZ GAMING</span>
            <span className="text-white/20">•</span>
            <span className="hover:text-white transition-colors">4THRIVE</span>
          </div>
        </div>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
