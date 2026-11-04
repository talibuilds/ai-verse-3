
import { useEffect, useRef, useState } from 'react';
import './IntroScreen.css';

const PHASES = {
  BOOT: 'boot',
  LOGO: 'logo',
  GLITCH: 'glitch',
  SPLIT: 'split',
  DONE: 'done',
};

const INTRO_DURATION = 4000;

export default function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState(PHASES.BOOT);
  const [counter, setCounter] = useState(0);

  const onDoneRef = useRef(onDone);
  const hasFinished = useRef(false);

  // Always keep the latest callback without restarting animation timers.
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Main intro sequence: runs exactly once per mount.
  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let timers = [];

    const finishIntro = () => {
      if (hasFinished.current) return;

      hasFinished.current = true;
      timers.forEach(clearTimeout);
      timers = [];

      setPhase(PHASES.DONE);
      onDoneRef.current?.();
    };

    if (motionQuery.matches) {
      finishIntro();
      return;
    }

    timers = [
      setTimeout(() => setPhase(PHASES.LOGO), 600),
      setTimeout(() => setPhase(PHASES.GLITCH), 2800),
      setTimeout(() => setPhase(PHASES.SPLIT), 3350),
      setTimeout(finishIntro, INTRO_DURATION),
    ];

    const handleMotionChange = (event) => {
      if (event.matches) finishIntro();
    };

    motionQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      timers.forEach(clearTimeout);
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  // Progress counter.
  useEffect(() => {
    if (phase !== PHASES.BOOT && phase !== PHASES.LOGO) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCounter((current) =>
        Math.min(current + 100 / 90, 100)
      );
    }, 30);

    return () => clearInterval(timer);
  }, [phase]);

  if (phase === PHASES.DONE) return null;

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro-panel intro-panel--top" />
      <div className="intro-panel intro-panel--bot" />

      <div className="intro-scanlines" />
      <div className="intro-grid" />

      <div className="intro-stage">
        <div className="intro-boot-line">
          <span className="intro-boot-text">
            AUGMENT_AI
          </span>
          <span className="intro-cursor" />
        </div>

        <div className="intro-logo">
          <div className="intro-logo-ai">AI</div>
          <div className="intro-logo-verse">VERSE</div>
          <div className="intro-logo-version">3.0</div>
        </div>

        <div className="intro-tagline">
          Ideas to Impact &nbsp;·&nbsp; Code to Creation
        </div>

        <div className="intro-progress-wrap">
          <div
            className="intro-progress-bar"
            style={{ width: `${counter}%` }}
          />
        </div>

        <div className="intro-progress-label">
          {Math.round(counter)}%
        </div>

        <div className="intro-glitch-r" aria-hidden="true">
          AI VERSE
        </div>

        <div className="intro-glitch-b" aria-hidden="true">
          AI VERSE
        </div>
      </div>

      <div className="intro-corner intro-corner--tl" />
      <div className="intro-corner intro-corner--tr" />
      <div className="intro-corner intro-corner--bl" />
      <div className="intro-corner intro-corner--br" />

      <div className="intro-hline intro-hline--t" />
      <div className="intro-hline intro-hline--b" />
    </div>
  );
}
