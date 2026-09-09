"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import GridBackdrop from "@/components/GridBackdrop";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Anything that changes layout is decided by this breakpoint in CSS as well as
// in JS, so the two always agree and nothing reflows after hydration.
const PINNED = "(min-width: 1024px)";

export default function BigStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Pinning is the expensive half of this: it inserts a spacer, switches
      // the section to position:fixed, and recalculates every time a mobile
      // address bar resizes the viewport. Below the breakpoint the same roll is
      // scrubbed as the section crosses the screen — no pin, no spacer, and no
      // extra screen of scrolling spent on one sentence.
      const pinned = window.matchMedia(PINNED).matches;

      const scrollTrigger: ScrollTrigger.Vars = pinned
        ? {
            trigger: rootRef.current,
            start: "top top",
            // Half a screen of scroll is enough to read one line and land on
            // the next; the old 120% left a long stretch of dead scrolling.
            end: "+=55%",
            scrub: 0.4,
            pin: true,
            // Pinning mid-scroll otherwise snaps the section by the height of
            // the spacer ScrollTrigger inserts, which reads as a jump.
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        : {
            trigger: rootRef.current,
            // Runs while the section travels into the middle of the screen, so
            // the swap is finished by the time it settles rather than happening
            // half off the bottom edge.
            start: "top 80%",
            end: "top 30%",
            scrub: 0.4,
          };

      const tl = gsap.timeline({ scrollTrigger, defaults: { ease: "none" } });

      // A cross-fade put two different sentences on the same baseline, so the
      // middle of it was a pile of overlapping letterforms. Instead the pair
      // rolls as one unit inside a one-line window: the first line leaves
      // through the top exactly as fast as the second arrives from below, so
      // they never share the same pixels. The travel has to be identical on
      // both — easing one against the other lets them drift into the same band,
      // very visible where the copy wraps to two lines. Only the fades are eased.
      tl.to("[data-statement-a]", { yPercent: -100, duration: 0.55 }, 0)
        .fromTo("[data-statement-b]", { yPercent: 100 }, { yPercent: 0, duration: 0.55 }, 0)
        .to("[data-statement-a]", { opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .fromTo("[data-statement-b]", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        // Opacity only: on the pinned path this element carries a 120px blur,
        // and animating its size would re-render that blur on every scroll
        // tick. It also runs the full length, leaving a beat where the second
        // line simply sits there before the section unpins.
        .fromTo("[data-glow]", { opacity: 0.22 }, { opacity: 0.45, duration: 1 }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // Without motion the two lines simply stack and both stay readable; with
  // motion they share one grid cell, which is the window the roll runs inside.
  const layer = reduced ? "" : "col-start-1 row-start-1";

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-ink-950 py-16 lg:min-h-[100svh] lg:py-0"
    >
      <GridBackdrop />
      {/* The blur is a large, expensive layer to composite; below the
          breakpoint the same shape is painted as a plain gradient instead. */}
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-25 lg:h-[380px] lg:w-[380px] lg:blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(198,255,94,0.3), transparent 72%)" }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-4xl px-6 text-center ${
          reduced ? "gap-6" : "overflow-hidden"
        }`}
      >
        <h2
          data-statement-a
          className={`font-display text-[8.5vw] font-medium leading-[1.15] tracking-tightest text-bone sm:text-[7vw] lg:text-6xl ${layer}`}
        >
          We don&rsquo;t just write code.
        </h2>
        <h2
          data-statement-b
          className={`font-display text-[8.5vw] font-medium leading-[1.15] tracking-tightest text-signal sm:text-[7vw] lg:text-6xl ${layer} ${
            reduced ? "" : "opacity-0"
          }`}
        >
          We build the infrastructure.
        </h2>
      </div>
    </section>
  );
}
