"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import ParticleField from "./ParticleField";
import { useLiteDevice } from "@/lib/capability";
import { contact, footerNav } from "@/lib/data";

export default function FinalCTA() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lite = useLiteDevice();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-reveal]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden bg-ink-950 py-20 sm:py-28 lg:py-40">
      {/* Decoration only — the gradient below carries the section without it. */}
      {!lite && <ParticleField />}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(198,255,94,0.12), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fine bg-grid-fine opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_100%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div
          data-cta-reveal
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-surface-line px-4 py-2 font-mono text-xs uppercase tracking-wide-2 text-mist"
        >
          <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-signal" />
          Currently taking on new systems
        </div>

        <h2
          data-cta-reveal
          className="font-display text-4xl font-medium leading-[1.02] tracking-tightest text-bone sm:text-5xl lg:text-6xl"
        >
          Have a system worth
          <br />
          <span className="text-signal">building right?</span>
        </h2>

        <p data-cta-reveal className="mx-auto mt-6 max-w-lg leading-relaxed text-mist lg:text-lg">
          Tell us what you&rsquo;re running on today. We&rsquo;ll tell you what it should look like
          in six months.
        </p>

        <div data-cta-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={`mailto:${contact.email}`} className="!px-10 !py-5 !text-sm">
            Email us
          </MagneticButton>
          <MagneticButton href={footerNav.social[0].href} variant="ghost" className="!px-10 !py-5 !text-sm">
            @softplussystems
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
