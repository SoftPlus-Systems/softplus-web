"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

function ServiceGlyph({ seed, color }: { seed: number; color: string }) {
  const cells = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: 36 }, () => rand() > 0.58);
  }, [seed]);

  return (
    <div className="grid w-[150px] grid-cols-6 gap-[5px]">
      {cells.map((on, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.08, scale: 0.7 }}
          animate={{
            opacity: on ? 0.85 : 0.08,
            scale: on ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.025 }}
          className="aspect-square rounded-[2px]"
          style={{ background: on ? color : "rgba(243,244,239,0.35)" }}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-surface-line bg-surface p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
        style={{ background: `radial-gradient(circle, ${service.color}2b, transparent 70%)` }}
      />
      <div className="relative">
        <span className="font-mono text-sm" style={{ color: service.color }}>
          {service.index}
        </span>
        <ServiceGlyph seed={Number(service.index)} color={service.color} />

        <h3 className="mt-8 font-display text-2xl font-medium text-bone">{service.name}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-mist">{service.description}</p>

        <ul className="mt-7 grid grid-cols-1 gap-3">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-bone/90">
              <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: service.color }} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function onScroll() {
      const card = el!.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardWidth = card.offsetWidth + 16; // gap-4
      setActive(Math.round(el!.scrollLeft / cardWidth));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-6 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <div key={service.id} className="w-[86vw] shrink-0 snap-center sm:w-[420px]">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {services.map((service, i) => (
          <button
            key={service.id}
            aria-label={`Show ${service.name}`}
            onClick={() => goTo(i)}
            data-cursor="link"
            // The dot is 6px tall; the button around it is what gets tapped.
            className="flex h-11 w-8 items-center justify-center"
          >
            <span
              className="block h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? "22px" : "6px",
                background: active === i ? service.color : "rgba(243,244,239,0.2)",
              }}
            />
          </button>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wide-2 text-mist">
        Swipe to explore
      </p>
    </div>
  );
}

function DesktopExplorer() {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div>
        {services.map((service, i) => (
          <button
            key={service.id}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            data-cursor="link"
            className={`group flex w-full items-center gap-6 border-b border-surface-line py-6 text-left transition-colors duration-300 first:border-t ${
              active === i ? "text-bone" : "text-mist hover:text-bone/80"
            }`}
          >
            <span
              className="font-mono text-sm transition-colors duration-300"
              style={{ color: active === i ? svc.color : undefined }}
            >
              {service.index}
            </span>
            <span className="flex-1">
              <span className="block font-display text-2xl font-medium tracking-tight sm:text-3xl">
                {service.name}
              </span>
              <span className="mt-1 block text-sm text-mist">{service.short}</span>
            </span>
            <span
              className={`hidden font-mono text-lg transition-all duration-300 sm:block ${
                active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
              style={{ color: svc.color }}
            >
              →
            </span>
          </button>
        ))}
      </div>

      <div className="lg:sticky lg:top-32 lg:h-fit">
        <div className="relative overflow-hidden rounded-3xl border border-surface-line bg-surface p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full transition-[background] duration-500"
            style={{ background: `radial-gradient(circle, ${svc.color}2b, transparent 70%)` }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <ServiceGlyph seed={active + 1} color={svc.color} />

              <h3 className="mt-8 font-display text-2xl font-medium text-bone">{svc.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{svc.description}</p>

              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {svc.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-bone/90">
                    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: svc.color }} />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              Six systems.
              <br />
              One operating standard.
            </>
          }
          description="Every business runs on the same handful of critical systems. We build all of them — connected, custom, and built around how your business actually works."
        />
      </div>

      <div className="mt-10 sm:mt-16">
        <MobileCarousel />
        <div className="mx-auto hidden max-w-[1400px] px-6 lg:block lg:px-10">
          <DesktopExplorer />
        </div>
      </div>
    </section>
  );
}
