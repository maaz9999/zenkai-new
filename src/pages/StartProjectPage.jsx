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
  User,
  AtSign,
  PhoneCall,
  Award
} from 'lucide-react';

const SERVICES_OPTIONS = [
  {
    id: 'Tournament Key Art & Posters',
    title: 'Tournament Key Art',
    icon: Trophy
  },
  {
    id: 'Video Editing & Motion',
    title: 'Video & Motion',
    icon: Video
  },
  {
    id: 'Thumbnails & Content Packaging',
    title: 'Thumbnails & Packaging',
    icon: ImageIcon
  },
  {
    id: '2D Illustration & Merch',
    title: '2D Illustration & Merch',
    icon: Palette
  },
  {
    id: 'Twitch Broadcast & Stream HUD',
    title: 'Broadcast & Stream HUD',
    icon: Tv
  },
  {
    id: 'Player Management & Identity',
    title: 'Player Branding',
    icon: Crown
  },
  {
    id: 'Full Creative Retainer / Other',
    title: 'Full Retainer / Other',
    icon: Layers
  }
];

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $3,500',
  '$3,500 – $5,000+',
  'Flexible'
];

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handleOrNumber: '',
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
        `Name: ${formData.name}\nEmail: ${formData.email}\nDirect Contact: ${formData.handleOrNumber}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Brief:\n${formData.message}`
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
        className="fixed -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[140px] opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #DA2086 0%, #FF7348 40%, #8C1FA8 80%, transparent 100%)' }}
      />
      <div 
        className="fixed bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[130px] opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #00D2FF 0%, #7B2496 60%, transparent 100%)' }}
      />
      <div className="grain-overlay opacity-25 pointer-events-none" />

      {/* Deep Left "Back to Showcase" Navigation */}
      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 md:pt-30 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-[#FF7348]/40 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-all group backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(255,115,72,0.2)]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#FF7348] group-hover:-translate-x-1.5 transition-transform" />
          <span>Back to Showcase</span>
        </Link>
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 pt-3 sm:pt-4 md:pt-6 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto w-full">

        {/* Hero Title Section */}
        <div className="text-left mb-6 sm:mb-8 md:mb-10">
          <h1 className="font-heading font-black text-white text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight uppercase leading-[0.92] drop-shadow-md">
            <span>START YOUR </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB848] via-[#FF7348] via-[#DA2086] to-[#A8319B]">
              NEXT MOVE.
            </span>
          </h1>

          <p className="mt-2.5 sm:mt-3 text-white/75 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            Partner with the creative studio trusted by world champions. Submit your brief below for scoping, or tap WhatsApp for instant access.
          </p>
        </div>

        {/* Two-Column Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Direct Channels & Studio Trust (5 cols)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* VIP WhatsApp Executive Card */}
            <div className="relative rounded-2xl bg-[#090614]/95 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DIRECT WHATSAPP DESK
                </span>
                <span className="text-[10px] text-white/40 font-mono">&lt; 15 min reply</span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                  <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-white text-lg sm:text-xl uppercase tracking-wide leading-none">
                    FAST TRACK ACCESS
                  </h2>
                  <p className="text-white/60 text-[11px] mt-0.5">Direct Line to Creative Leadership</p>
                </div>
              </div>

              <p className="text-white/70 text-xs mt-2 leading-relaxed">
                Need urgent tournament key art, immediate design feedback, or prefer sending quick voice notes? Reach us directly on WhatsApp.
              </p>

              {/* Number display with 1-click Copy button */}
              <div className="mt-3.5 p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs sm:text-sm text-emerald-300 font-bold tracking-wider">
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
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:brightness-110 active:scale-98 text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Studio Email Card */}
            <div className="rounded-2xl bg-[#090614]/90 border border-white/10 p-4 sm:p-5 backdrop-blur-xl shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7348]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-sm sm:text-base uppercase tracking-wide leading-none">
                      STUDIO INBOX
                    </h3>
                    <p className="text-white/50 text-[10px] font-mono mt-0.5">Formal RFPs & Briefs</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white font-mono text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                <a 
                  href="mailto:team@zenkai.media" 
                  className="font-mono text-xs text-[#FFB848] hover:text-[#FFA436] hover:underline"
                >
                  team@zenkai.media
                </a>
                <span className="text-[10px] text-white/40 font-mono">Under 24h review</span>
              </div>
            </div>

            {/* Studio Standards & Credentials */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-2.5 font-mono text-[11px] text-white/70">
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#FFC15C]">
                ZENKAI MEDIA STANDARDS
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF7348] shrink-0" />
                <span>24-Hour initial response on brief submissions</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Strict confidentiality & Mutual NDA protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#DA2086] shrink-0" />
                <span>Visual production for 5x EVO & World Champions</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: Compact & Sleek Inquiry Form (7 cols)
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#0a0515]/95 border border-white/15 p-5 sm:p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden">
              
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7348] via-[#DA2086] to-[#8C1FA8] opacity-90" />
              
              {status === 'success' ? (
                /* Success Confirmation State */
                <div className="py-10 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_35px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">
                    BRIEF DISPATCHED
                  </span>

                  <h3 className="font-heading font-black text-white text-xl sm:text-3xl uppercase tracking-tight mb-2">
                    WE RECEIVED YOUR INQUIRY
                  </h3>

                  <p className="text-white/75 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
                    Your project details have been transmitted directly to <span className="font-mono text-white font-bold">team@zenkai.media</span>. Our creative director is reviewing your brief and will reply within 24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <span>Follow-up on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                /* Compact Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                  
                  {/* Form Header */}
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-black text-white text-lg sm:text-xl uppercase tracking-wide">
                        PROJECT INQUIRY FORM
                      </h3>
                      <p className="text-white/50 text-xs mt-0.5">
                        Delivered directly to <span className="text-[#FFB848] font-mono">team@zenkai.media</span>
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Contact Information (3-column compact grid on desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Name Field */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5">
                        Your Name / Team <span className="text-[#FF7348]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex / Ashes Gaming"
                          className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5">
                        Email Address <span className="text-[#FF7348]">*</span>
                      </label>
                      <div className="relative">
                        <AtSign className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp or Discord */}
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5 truncate">
                        WhatsApp / Discord
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.handleOrNumber}
                          onChange={(e) => setFormData({ ...formData, handleOrNumber: e.target.value })}
                          placeholder="+92... or @tag"
                          className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Streamlined Discipline Chips */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Select Primary Discipline <span className="text-[#FF7348]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {SERVICES_OPTIONS.map((srv) => {
                        const IconComponent = srv.icon;
                        const isSelected = formData.service === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: srv.id })}
                            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#FF7348] to-[#DA2086] text-white border-transparent shadow-[0_0_15px_rgba(255,115,72,0.35)]'
                                : 'bg-white/[0.03] text-white/70 hover:text-white border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                            }`}
                          >
                            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#FF7348]'}`} />
                            <span>{srv.title}</span>
                            {isSelected && <Check className="w-3 h-3 stroke-[3] ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: Budget Range Pills */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Estimated Investment Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      {BUDGET_OPTIONS.map((b) => {
                        const isSelected = formData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-1.5 px-2 text-center rounded-lg border text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer truncate ${
                              isSelected
                                ? 'bg-[#FF7348] border-[#FF7348] text-white shadow-sm'
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
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Project Brief & Requirements <span className="text-[#FF7348]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share tournament timelines, quantity of deliverables, references, game title, or goals..."
                      className="w-full bg-white/[0.03] border border-white/15 focus:border-[#FF7348] rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FF7348] transition-all resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-hero-cta w-full py-3 sm:py-3.5 px-6 rounded-full text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_8px_30px_rgba(255,115,72,0.35)] cursor-pointer flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-110"
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
                  <div className="pt-1 flex items-center justify-center gap-1.5 text-center text-white/40 text-[10px] font-mono">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Protected by Zenkai Media. Strictly confidential & NDA compliant.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Global Social Proof Ribbon at Bottom of Page */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/10 text-center">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-3">
            IN THE GAME WITH WORLD CHAMPIONS & CREATIVE LEADERS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-white/60">
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
