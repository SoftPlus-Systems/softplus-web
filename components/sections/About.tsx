"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import GridBackdrop from "@/components/GridBackdrop";
import { isLiteDevice } from "@/lib/capability";

const paragraph =
  "Soft Plus Systems is a software studio that builds the operational core of real businesses. We don't chase trends — we build ERP, accounting, stock and POS systems that hold up under the weight of daily use, for teams who need software that simply works, every single day.";

const beliefs = [
  { n: "01", title: "Built for operators", body: "Every system we ship is judged by the person using it at 8am on a Monday, not by a demo." },
  { n: "02", title: "Owned, not rented", body: "We build custom software you actually own — no vendor lock-in, no monthly hostage fees." },
  { n: "03", title: "Engineered to last", body: "Architecture decisions are made for the system's tenth year of operation, not its first demo." },
];

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The word-by-word reveal updates one opacity per word on every scroll
      // tick — around fifty of them. That is fine on a desktop and is real work
      // on a mid-range phone, where the paragraph also runs to ten lines and
      // spends most of the scroll unreadable. There it fades in as one block.
      if (isLiteDevice()) {
        gsap.fromTo(
          "[data-about-text]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-about-text]", start: "top 85%", once: true },
          }
        );
      } else {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]");
        gsap.set(words, { opacity: 0.3 });

        gsap.to(words, {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-about-text]",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-belief]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.06,
            ease: "power3.out",
            // Playing this in reverse on every scroll back up is work for no
            // benefit; the reveal only needs to happen once.
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative overflow-hidden bg-ink-950 py-16 sm:py-24 lg:py-32">
      <GridBackdrop className="opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wide-3 text-signal">
          <span className="h-px w-8 bg-signal" />
          About the studio
        </div>

        <p
          data-about-text
          className="max-w-5xl font-display text-xl font-medium leading-[1.35] tracking-tightest text-bone sm:text-3xl sm:leading-[1.25] lg:text-4xl"
        >
          {paragraph.split(" ").map((word, i) => (
            <span key={i} data-word className="mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-12 grid gap-px sm:mt-20 overflow-hidden rounded-2xl border border-surface-line bg-surface-line sm:grid-cols-3">
          {beliefs.map((b) => (
            <div data-belief key={b.n} className="bg-ink-950 p-8 lg:p-10">
              <span className="font-mono text-sm text-signal">{b.n}</span>
              <h3 className="mt-6 font-display text-xl font-medium text-bone">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
