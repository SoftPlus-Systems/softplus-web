"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let particles: { x: number; y: number; r: number; vy: number; o: number }[] = [];

    function resize() {
      const parent = canvas!.parentElement!;
      width = parent.clientWidth;
      height = parent.clientHeight;
      // Retina phones would otherwise composite a 3x buffer for what is a
      // handful of 1px dots; 1.5x is indistinguishable and much cheaper.
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * scale);
      canvas!.height = Math.round(height * scale);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(scale, 0, 0, scale, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vy: Math.random() * 0.22 + 0.05,
        o: Math.random() * 0.4 + 0.15,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.vy;
        if (p.y < -5) p.y = height + 5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(198,255,94,${p.o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();

    // This sits in the final CTA at the very bottom of the page — no reason to
    // run a full-width animation loop for the whole scroll up to it.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { rootMargin: "15% 0px" }
    );
    observer.observe(canvas);

    function onVisibility() {
      if (document.hidden) stop();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
