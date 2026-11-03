import { useEffect, useState } from 'react';
import './IntroScreen.css';

const PHASES = {
  BOOT:    'boot',    // 0–900ms   — black, scanline flicker
  LOGO:    'logo',    // 900–3800  — AI VERSE assembles
  GLITCH:  'glitch',  // 3800–4900 — glitch burst
  SPLIT:   'split',   // 4900–6200 — panels split open
  DONE:    'done',    // 6200+     — unmount
};

export default function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState(PHASES.BOOT);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(PHASES.LOGO),   900);
    const t2 = setTimeout(() => setPhase(PHASES.GLITCH), 3800);
    const t3 = setTimeout(() => setPhase(PHASES.SPLIT),  4900);
    const t4 = setTimeout(() => { setPhase(PHASES.DONE); onDone(); }, 6200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  // Fake boot counter
  useEffect(() => {
    if (phase !== PHASES.BOOT && phase !== PHASES.LOGO) return;
    const t = setInterval(() => setCounter((c) => Math.min(c + Math.floor(Math.random() * 6 + 1), 100)), 28);
    return () => clearInterval(t);
  }, [phase]);

  if (phase === PHASES.DONE) return null;

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      {/* Top & bottom split panels */}
      <div className="intro-panel intro-panel--top" />
      <div className="intro-panel intro-panel--bot" />

      {/* Scanlines */}
      <div className="intro-scanlines" />

      {/* Grid overlay */}
      <div className="intro-grid" />

      {/* Center stage */}
      <div className="intro-stage">

        {/* Boot line */}
        <div className="intro-boot-line">
          <span className="intro-boot-text">AUGMENT_AI://BOOT_SEQUENCE</span>
          <span className="intro-cursor" />
        </div>

        {/* Main logo */}
        <div className="intro-logo">
          <div className="intro-logo-ai">AI</div>
          <div className="intro-logo-verse">VERSE</div>
          <div className="intro-logo-version">3.0</div>
        </div>

        {/* Tagline */}
        <div className="intro-tagline">
          Ideas to Impact &nbsp;·&nbsp; Code to Creation
        </div>

        {/* Progress bar */}
        <div className="intro-progress-wrap">
          <div className="intro-progress-bar" style={{ width: `${counter}%` }} />
        </div>
        <div className="intro-progress-label">{counter}%</div>

        {/* Glitch clone layers */}
        <div className="intro-glitch-r" aria-hidden="true">AI VERSE</div>
        <div className="intro-glitch-b" aria-hidden="true">AI VERSE</div>
      </div>

      {/* Corner decorations */}
      <div className="intro-corner intro-corner--tl" />
      <div className="intro-corner intro-corner--tr" />
      <div className="intro-corner intro-corner--bl" />
      <div className="intro-corner intro-corner--br" />

      {/* Horizontal rule lines */}
      <div className="intro-hline intro-hline--t" />
      <div className="intro-hline intro-hline--b" />
    </div>
  );
}
