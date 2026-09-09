"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import GridBackdrop from "@/components/GridBackdrop";
import { onIntroReady } from "@/lib/intro";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [showScene, setShowScene] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Only mount the WebGL scene on desktop — on mobile even a CSS-hidden
    // canvas keeps its render loop running and competes with scroll animations.
    const mq = window.matchMedia("(min-width: 1024px)");
    setShowScene(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShowScene(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Nothing here is load-bearing for layout — the copy is already in place
    // and the timeline only reveals it — so it is simply skipped.
    if (reduced) return;

    // Waits on the preloader instead of a fixed delay, so the headline starts
    // the moment the overlay clears however fast the page loaded.
    return onIntroReady(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo("[data-hero-eyebrow]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(
            "[data-hero-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.07 },
            "-=0.3"
          )
          .fromTo("[data-hero-sub]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
            "-=0.45"
          )
          .fromTo("[data-hero-scroll]", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");
      }, rootRef);

      cleanupRef.current = () => ctx.revert();
    });
  }, [reduced]);

  useEffect(() => {
    // Separate from the intro timeline: the scene is a dynamic import behind a
    // media query, so it can mount after the timeline has already been built.
    if (!showScene) return;
    if (reduced) {
      // The scene starts hidden so it can fade in; without motion it just gets
      // its resting opacity outright.
      gsap.set(sceneRef.current, { opacity: 0.6 });
      return;
    }
    let tween: gsap.core.Tween | undefined;
    const off = onIntroReady(() => {
      if (!sceneRef.current) return;
      tween = gsap.fromTo(
        sceneRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 0.6, scale: 1, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
    });
    return () => {
      off();
      tween?.kill();
    };
  }, [showScene, reduced]);

  useEffect(() => () => cleanupRef.current?.(), []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-950 pb-14 pt-36"
    >
      <GridBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 30%, rgba(198,255,94,0.10), transparent 55%), radial-gradient(circle at 15% 85%, rgba(77,216,255,0.05), transparent 50%)",
        }}
      />

      {showScene && (
        <div
          ref={sceneRef}
          // An elliptical mask fades the field on every side, so it reads as
          // something drifting behind the page rather than a canvas clipped at
          // the window edge.
          className="absolute bottom-0 right-0 top-24 -z-0 hidden w-[46%] opacity-0 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)] lg:block"
        >
          <HeroScene />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <div
            data-hero-eyebrow
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-wide-3 text-signal"
          >
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-signal" />
            Business systems, engineered
          </div>

          <h1 className="font-display text-[10.5vw] font-medium leading-[0.98] tracking-tightest text-bone sm:text-[7.5vw] lg:text-[clamp(3rem,4.4vw,4.5rem)]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Software that runs
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-signal">
                the business behind
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                the business.
              </span>
            </span>
          </h1>

          <p data-hero-sub className="mt-7 max-w-lg leading-relaxed text-mist lg:text-lg">
            Soft Plus Systems designs and builds the ERP, accounting, stock, POS, mobile and
            web platforms that ambitious operators run on — precise, custom, built to scale.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div data-hero-cta>
              <MagneticButton href="#contact">Start a project</MagneticButton>
            </div>
            <div data-hero-cta>
              <MagneticButton href="#work" variant="ghost">
                See our work
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="relative z-10 mx-auto mt-16 flex w-full max-w-[1400px] items-center justify-between px-6 font-mono text-[11px] uppercase tracking-wide-2 text-mist lg:px-10"
      >
        <span>Scroll to explore</span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="h-8 w-px animate-pulse-slow bg-surface-line-strong" />
          Est. Soft Plus Systems
        </span>
      </div>
    </section>
  );
}
