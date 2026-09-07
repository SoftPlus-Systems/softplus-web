"use client";

import { stack } from "@/lib/data";
import PlusLogo from "@/components/PlusLogo";
import SectionHeading from "@/components/SectionHeading";

const ring1 = stack.slice(0, 5);
const ring2 = stack.slice(5, 12);

function Orbit({
  items,
  radius,
  duration,
  reverse = false,
}: {
  items: string[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        animation: `spin ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {items.map((item, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={item}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
            }}
          >
            <div
              className="flex items-center gap-2 rounded-full border border-surface-line bg-surface px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0)]"
              style={{ animation: `spin ${duration}s linear infinite ${reverse ? "" : "reverse"}` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="whitespace-nowrap font-mono text-xs text-bone">{item}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Technology() {
  return (
    <section id="stack" className="relative overflow-hidden bg-ink-950 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Technology"
          align="center"
          title="A modern, proven stack."
          description="We choose technology for longevity, not novelty — tools that will still be maintainable a decade from now."
        />
      </div>

      <div className="relative mx-auto mt-20 hidden h-[560px] max-w-3xl items-center justify-center md:flex">
        <div className="absolute h-[420px] w-[420px] rounded-full border border-surface-line" />
        <div className="absolute h-[260px] w-[260px] rounded-full border border-surface-line" />

        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-signal/50 bg-surface shadow-glow">
          <PlusLogo className="h-10 w-10 text-signal" />
        </div>

        <Orbit items={ring1} radius={130} duration={26} />
        <Orbit items={ring2} radius={210} duration={40} reverse />
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 md:hidden">
        {stack.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-full border border-surface-line bg-surface px-4 py-2.5"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span className="truncate font-mono text-xs text-bone">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
