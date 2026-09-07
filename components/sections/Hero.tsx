"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import GridBackdrop from "@/components/GridBackdrop";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.7, defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 120, rotate: 1 },
          { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-scene]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.4 },
          "-=1.2"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-950 pb-14 pt-40"
    >
      <GridBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 30%, rgba(198,255,94,0.16), transparent 55%), radial-gradient(circle at 15% 85%, rgba(77,216,255,0.08), transparent 50%)",
        }}
      />

      <div
        data-hero-scene
        className="absolute bottom-0 right-0 top-28 -z-0 hidden w-[44%] opacity-70 [mask-image:linear-gradient(to_right,transparent,black_65%,black_100%)] lg:block"
      >
        <HeroScene />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <div
            data-hero-eyebrow
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wide-3 text-signal"
          >
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-signal" />
            Business systems, engineered
          </div>

          <h1 className="font-display text-[12vw] font-medium leading-[0.95] tracking-tightest text-bone sm:text-[8vw] lg:text-[5vw]">
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

          <p data-hero-sub className="mt-8 max-w-lg text-lg leading-relaxed text-mist lg:text-xl">
            Soft Plus Systems designs and builds the ERP, accounting, stock, POS, mobile and
            web platforms that ambitious operators run on — precise, custom, built to scale.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
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
        className="relative z-10 mx-auto mt-20 flex w-full max-w-[1400px] items-center justify-between px-6 font-mono text-[11px] uppercase tracking-wide-2 text-mist lg:px-10"
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
