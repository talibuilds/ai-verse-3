import { useEffect, useState } from 'react';
import './Countdown.css';

const TARGET = new Date('2026-12-07T09:00:00+05:30').getTime();

function pad(n) { return String(n).padStart(2, '0'); }

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Flip({ value, label }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(value); setFlip(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flip-unit">
      <div className={`flip-card${flip ? ' flipping' : ''}`}>
        <span className="flip-top">{pad(flip ? prev : value)}</span>
        <span className="flip-bottom">{pad(value)}</span>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="countdown-wrap">
      <p className="countdown-eyebrow">Hackathon starts in</p>
      <div className="countdown-row">
        <Flip value={time.days}    label="Days" />
        <span className="countdown-colon">:</span>
        <Flip value={time.hours}   label="Hours" />
        <span className="countdown-colon">:</span>
        <Flip value={time.minutes} label="Mins" />
        <span className="countdown-colon">:</span>
        <Flip value={time.seconds} label="Secs" />
      </div>
    </div>
  );
}
