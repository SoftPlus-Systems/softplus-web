"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import GridBackdrop from "@/components/GridBackdrop";

export default function BigStatement() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 0.6,
            pin: true,
          },
        });

        tl.set("[data-statement-b]", { opacity: 0, scale: 1.08 })
          .to("[data-statement-a]", { opacity: 0, scale: 0.88, yPercent: -6, ease: "none" }, 0)
          .to("[data-statement-b]", { opacity: 1, scale: 1, ease: "none" }, 0.15)
          .to("[data-glow]", { opacity: 1, scale: 1.4, ease: "none" }, 0);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink-950"
    >
      <GridBackdrop />
      <div
        data-glow
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-signal opacity-30 blur-[130px]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h2
          data-statement-a
          className="absolute inset-0 flex items-center justify-center px-6 font-display text-[11vw] font-medium leading-[0.95] tracking-tightest text-bone sm:text-[9vw] lg:text-7xl"
        >
          We don&rsquo;t just write code.
        </h2>
        <h2
          data-statement-b
          className="font-display text-[11vw] font-medium leading-[0.95] tracking-tightest text-signal sm:text-[9vw] lg:text-7xl"
        >
          We build the infrastructure.
        </h2>
      </div>
    </section>
  );
}
