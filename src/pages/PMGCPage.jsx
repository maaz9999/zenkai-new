import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Play, Film, Image, Palette, Shirt } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoDialog from '../components/VideoDialog';
import { pmgcTeamSamples, pmgcStyleSamples } from '../data/leoReels';
import './PMGCPage.css';

const whatsapp = `https://wa.me/923137396135?text=${encodeURIComponent("Hi Zenkai Media! I'd like to discuss a PMGC creative campaign for our team.")}`;
const services = [
  { icon: Film, title: 'HYPE & PLAYER FILMS', text: 'Team introductions, roster reveals, player stories and tournament recaps. Give every moment an edit worth sharing.' },
  { icon: Image, title: 'MATCHDAY CONTENT', text: 'Match posters, result graphics, social cutdowns and YouTube thumbnails that keep your team visible throughout the run.' },
  { icon: Palette, title: 'TEAM IDENTITY', text: 'A consistent visual direction across your campaign, player graphics, motion elements and broadcast assets.' },
  { icon: Shirt, title: 'MERCH & FAN CULTURE', text: 'Jersey concepts, illustrated merchandise and fan-facing creative that carries your identity beyond the match.' },
];

function SamplePreview({ sample, onPlay, priority = false, className = '' }) {
  return (
    <button type="button" onClick={() => onPlay(sample)} aria-label={`Play ${sample.title}`} className={`pmgc-preview group ${className}`}>
      <img src={sample.poster} alt={`${sample.title} video preview`} width="640" height="360" loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding="async" />
      <span className="pmgc-play"><Play size={22} fill="currentColor" /></span>
      <span className="pmgc-runtime">{Math.floor(sample.duration / 60)}:{String(Math.floor(sample.duration % 60)).padStart(2, '0')}</span>
    </button>
  );
}

export default function PMGCPage() {
  const [activeSample, setActiveSample] = useState(null);
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = 'PMGC Creative for Esports Teams — Zenkai Media';
    if (description) description.content = 'Cinematic team films, player edits, matchday graphics and merchandise concepts for your PMGC campaign. Explore 4T and AK GOLD concept samples by Zenkai Media.';
    return () => {
      document.title = previousTitle;
      if (description) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="pmgc-page">
      <Header />
      <main>
        <section className="pmgc-hero pmgc-container">
          <div className="pmgc-hero-copy">
            <p className="pmgc-eyebrow"><span className="pmgc-status" /> ZENKAI MEDIA / PMGC CREATIVE</p>
            <h1>YOUR TEAM.<br />WORLD STAGE.<br /><span>BIGGER STORY.</span></h1>
            <p className="pmgc-intro">You bring the game. We build the hype.</p>
            <p className="pmgc-body">Films, matchday content and visual identity for teams heading to the PUBG MOBILE Global Championship. Make your run mean something beyond the scoreboard.</p>
            <div className="pmgc-actions">
              <a href="#team-samples" className="pmgc-button pmgc-button-brand">WATCH THE SAMPLES <ArrowDown size={17} /></a>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="pmgc-text-link">LET’S TALK PMGC <ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className="pmgc-hero-visual">
            <div className="pmgc-visual-topline"><span>THE ROAD TO PMGC</span><span>CONCEPT / 01</span></div>
            <SamplePreview sample={pmgcTeamSamples[0]} onPlay={setActiveSample} priority className="pmgc-hero-preview" />
            <div className="pmgc-visual-caption"><span>4T / 4THRIVES</span><span>A GLIMPSE OF WHAT’S POSSIBLE <ArrowUpRight size={14} /></span></div>
            <div className="pmgc-visual-note"><span>TEAM FILMS</span><span>PLAYER STORIES</span><span>CAMPAIGN CREATIVE</span></div>
          </div>
        </section>

        <div className="pmgc-ticker" aria-hidden="true"><span>BUILT FOR THE GAME</span><b>✦</b><span>MADE FOR THE CULTURE</span><b>✦</b><span>READY FOR THE WORLD STAGE</span><b>✦</b></div>

        <section id="team-samples" className="pmgc-section pmgc-container">
          <div className="pmgc-section-heading">
            <div><p className="pmgc-eyebrow">01 / THE TEAM CONCEPTS</p><h2>TWO TEAMS.<br /><span>ONE GLOBAL STAGE.</span></h2></div>
            <p className="pmgc-body">4T and AK GOLD are headed to PMGC. We created these concept edits to show how a team’s identity can become a story fans feel.</p>
          </div>
          <div className="pmgc-team-grid">
            {pmgcTeamSamples.map((sample, index) => (
              <article key={sample.source}>
                <div className="pmgc-card-top"><span>PMGC / TEAM CONCEPT</span><span>0{index + 1}</span></div>
                <SamplePreview sample={sample} onPlay={setActiveSample} />
                <div className="pmgc-team-caption"><div><h3>{sample.title}</h3><p>{index === 0 ? 'Team identity. Tournament energy. A story built for the stage.' : 'A bold introduction. A distinct identity. A moment to own.'}</p></div><ArrowUpRight size={24} aria-hidden="true" /></div>
              </article>
            ))}
          </div>
          <p className="pmgc-sample-note">Independent creative samples by Zenkai Media, presented as pitch concepts.</p>
        </section>

        <section className="pmgc-services-band">
          <div className="pmgc-container pmgc-section">
            <div className="pmgc-section-heading"><div><p className="pmgc-eyebrow">02 / YOUR CAMPAIGN, CONNECTED</p><h2>MORE THAN<br /><span>A HYPE VIDEO.</span></h2></div><p className="pmgc-body">One creative direction, from the first announcement to the final result. Pick the support your team needs and we’ll build the scope together.</p></div>
            <div className="pmgc-services">{services.map(({ icon: Icon, title, text }, index) => <article key={title}><div className="pmgc-service-number"><Icon size={23} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
            <Link to="/work/4thrive-merch" className="pmgc-text-link mt-8">EXPLORE THE 4THRIVES MERCH CONCEPT <ArrowUpRight size={17} /></Link>
          </div>
        </section>

        <section className="pmgc-section pmgc-container">
          <div className="pmgc-section-heading"><div><p className="pmgc-eyebrow">03 / FIND YOUR EDITING DIRECTION</p><h2>DIFFERENT GAMES.<br /><span>THE SAME INSTINCT.</span></h2></div><p className="pmgc-body">A few more edits from our esports work. Explore the pacing, storytelling and player focus we can bring to your team’s campaign.</p></div>
          <div className="pmgc-style-grid">{pmgcStyleSamples.map((sample) => <article key={sample.source}><SamplePreview sample={sample} onPlay={setActiveSample} /><p className="pmgc-style-label">{sample.title}</p><h3>{sample.angle}</h3><p className="pmgc-body">{sample.description}</p></article>)}</div>
          <Link to="/work/reels" className="pmgc-text-link mt-9">EXPLORE ALL REELS <ArrowUpRight size={17} /></Link>
        </section>

        <section className="pmgc-container pmgc-process"><p className="pmgc-eyebrow">04 / FROM BRIEF TO FEED</p><div>{[
          ['SHARE YOUR STORY', 'Tell us about your team, your goals, your timeline and the footage you have.'],
          ['SET THE DIRECTION', 'We align on the creative style, deliverables and scope before production begins.'],
          ['MAKE YOUR ENTRANCE', 'We edit, refine with your feedback and deliver the agreed assets for your channels.'],
        ].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

        <section className="pmgc-cta pmgc-container"><p className="pmgc-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>MAKE YOUR RUN<br /><span>IMPOSSIBLE TO IGNORE.</span></h2><p>Representing a PMGC team? Let’s build a campaign around your story.</p><div className="pmgc-actions"><a href={whatsapp} target="_blank" rel="noreferrer" className="pmgc-button pmgc-button-brand">LET’S TALK PMGC <ArrowUpRight size={19} /></a><Link to="/start-a-project?campaign=pmgc" className="pmgc-text-link">SEND A TEAM BRIEF <ArrowUpRight size={18} /></Link></div></section>
      </main>
      <Footer />
      {activeSample && <VideoDialog key={activeSample.video} video={activeSample} onClose={() => setActiveSample(null)} />}
    </div>
  );
}
