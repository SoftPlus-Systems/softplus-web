"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import GridBackdrop from "@/components/GridBackdrop";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function BigStatement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
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
        },
        defaults: { ease: "none" },
      });

      // A cross-fade put two different sentences on the same baseline, so the
      // middle of it was a pile of overlapping letterforms. Instead the pair
      // rolls as one unit inside a one-line window: the first line leaves
      // through the top exactly as fast as the second arrives from below, so
      // they never share the same pixels.
      // The travel has to be identical on both lines — easing one against the
      // other lets them drift into the same band and overlap, which is very
      // visible where the copy wraps to two lines. Only the fades are eased.
      tl.to("[data-statement-a]", { yPercent: -100, duration: 0.55 }, 0)
        .fromTo("[data-statement-b]", { yPercent: 100 }, { yPercent: 0, duration: 0.55 }, 0)
        .to("[data-statement-a]", { opacity: 0, duration: 0.55, ease: "power2.in" }, 0)
        .fromTo("[data-statement-b]", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        // Opacity only: this element carries a 120px blur, and animating its
        // size forces the browser to re-render the blur on every scroll tick.
        // It also runs the full length, leaving a beat where the second line
        // simply sits there before the section unpins.
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950"
    >
      <GridBackdrop />
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(198,255,94,0.55), transparent 70%)" }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-4xl px-6 text-center ${
          reduced ? "gap-6" : "overflow-hidden"
        }`}
      >
        <h2
          data-statement-a
          className={`font-display text-[9vw] font-medium leading-[1.15] tracking-tightest text-bone sm:text-[7vw] lg:text-6xl ${layer}`}
        >
          We don&rsquo;t just write code.
        </h2>
        <h2
          data-statement-b
          className={`font-display text-[9vw] font-medium leading-[1.15] tracking-tightest text-signal sm:text-[7vw] lg:text-6xl ${layer} ${
            reduced ? "" : "opacity-0"
          }`}
        >
          We build the infrastructure.
        </h2>
      </div>
    </section>
  );
}
