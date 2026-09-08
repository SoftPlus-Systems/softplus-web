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

function TechMarquee({ items, duration, reverse = false }: { items: string[]; duration: number; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden mask-fade-x">
      <div
        className="flex w-max items-center gap-3 pr-3"
        style={{ animation: `marquee ${duration}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {list.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-surface-line bg-surface px-4 py-2.5"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span className="whitespace-nowrap font-mono text-xs text-bone">{item}</span>
          </div>
        ))}
      </div>
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

      <div className="mt-16 flex flex-col gap-4 md:hidden">
        <TechMarquee items={ring1} duration={18} />
        <TechMarquee items={ring2} duration={22} reverse />
      </div>
    </section>
  );
}
