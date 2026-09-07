"use client";

import { useMemo, useState } from "react";
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
    <div className="grid grid-cols-6 gap-2">
      {cells.map((on, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.08, scale: 0.7 }}
          animate={{
            opacity: on ? 1 : 0.08,
            scale: on ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.025 }}
          className="aspect-square rounded-[3px]"
          style={{ background: on ? color : "rgba(243,244,239,0.4)" }}
        />
      ))}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <section id="services" className="relative bg-ink-950 py-32 lg:py-44">
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

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1">
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

          <div className="order-1 lg:order-2 lg:sticky lg:top-32 lg:h-fit">
            <div className="relative overflow-hidden rounded-3xl border border-surface-line bg-surface p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px] transition-colors duration-500"
                style={{ background: svc.color, opacity: 0.25 }}
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
                        <span
                          className="h-1 w-1 shrink-0 rounded-full"
                          style={{ background: svc.color }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
