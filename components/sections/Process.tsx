"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { process } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Process() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: "[data-process-track]",
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el) => {
        const marker = el.querySelector("[data-stage-marker]");
        gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 65%", end: "top 35%", scrub: 0.5 },
        })
          .fromTo(el, { opacity: 0.35 }, { opacity: 1, ease: "none" })
          .fromTo(
            marker,
            { scale: 0.75, backgroundColor: "rgba(21,23,27,1)", borderColor: "rgba(198,255,94,0.25)" },
            {
              scale: 1,
              backgroundColor: "rgba(198,255,94,0.14)",
              borderColor: "rgba(198,255,94,0.7)",
              ease: "none",
            },
            0
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={rootRef} className="relative bg-ink-950 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              From idea to
              <br />
              infrastructure.
            </>
          }
          description="A deliberate process built to remove risk at every stage — you always know exactly what's being built and why."
        />

        <div data-process-track className="relative mx-auto mt-20 max-w-3xl">
          {/* Line sits at pl-2 + half the marker's own width, so it runs
              through the marker's true center rather than its edge. */}
          <div className="absolute left-6 top-0 h-full w-px bg-surface-line sm:left-7" />
          <div
            ref={lineRef}
            className="absolute left-6 top-0 h-full w-px bg-signal shadow-glow-sm sm:left-7"
          />

          <div className="flex flex-col gap-14 lg:gap-16">
            {process.map((stage) => (
              <div data-stage key={stage.index} className="relative flex gap-8 pl-2 sm:gap-10">
                <div
                  data-stage-marker
                  className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-signal/25 bg-surface font-mono text-[11px] sm:h-10 sm:w-10"
                >
                  <span className="text-signal">{stage.index}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium text-bone sm:text-3xl">{stage.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
