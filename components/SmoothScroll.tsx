"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isLiteDevice } from "@/lib/capability";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis re-drives scrolling from JS on the main thread. A browser's own
    // touch scrolling is handled off it, so on a phone this trades a smooth
    // scroll for a janky one — and the library is a dynamic import, so a
    // device that skips it never downloads it either.
    if (isLiteDevice()) return;

    let lenis: import("lenis").default | undefined;
    let ticker: ((time: number) => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      lenis.on("scroll", ScrollTrigger.update);

      ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
