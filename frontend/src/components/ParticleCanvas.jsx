
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const isMobile = mobileQuery.matches;
    const reducedMotion = reducedMotionQuery.matches;

    const COUNT = isMobile ? 24 : 65;
    const MAX_DISTANCE = isMobile ? 85 : 110;
    const FRAME_INTERVAL = isMobile ? 1000 / 30 : 1000 / 60;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    let animationId = null;
    let lastFrame = 0;
    let isVisible = !document.hidden;

    const mouse = { x: -9999, y: -9999 };

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.3 + 0.4,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(
        window.devicePixelRatio || 1,
        mobileQuery.matches ? 1 : 1.5
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      });

      draw();
    };

    const onMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!isMobile && !reducedMotion) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < 120) {
            const force = (120 - distance) / 120;
            p.vx += (dx / distance) * force * 0.45;
            p.vy += (dy / distance) * force * 0.45;
          }
        }

        if (!reducedMotion) {
          p.vx *= 0.985;
          p.vy *= 0.985;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,99,${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < MAX_DISTANCE * MAX_DISTANCE) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 0.07 * (1 - distance / MAX_DISTANCE);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,175,99,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = (timestamp) => {
      if (!isVisible || reducedMotion) return;

      if (timestamp - lastFrame >= FRAME_INTERVAL) {
        draw();
        lastFrame = timestamp;
      }

      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationId !== null || !isVisible || reducedMotion) return;
      animationId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;

      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    resize();

    if (!reducedMotion) {
      startAnimation();
    }

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
    />
  );
}
