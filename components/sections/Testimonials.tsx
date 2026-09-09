"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import PlusLogo from "@/components/PlusLogo";

function TestimonialCard({ quote, name, role }: (typeof testimonials)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 25 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative flex h-full w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-surface-line bg-surface p-8 sm:w-[440px] lg:p-10"
    >
      <PlusLogo className="h-7 w-7 text-signal/70" />
      <p className="mt-8 font-display text-xl font-medium leading-relaxed text-bone lg:text-2xl">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-10 flex items-center gap-3 border-t border-surface-line pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/15 font-mono text-xs text-signal">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <div className="text-sm font-medium text-bone">{name}</div>
          <div className="text-xs text-mist">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-ink-950 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading eyebrow="Client voices" title="Trusted with the systems that matter." />
      </div>

      <div className="mt-14 flex gap-6 overflow-x-auto px-6 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:px-10 [&::-webkit-scrollbar]:hidden">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name + t.role} {...t} />
        ))}
        <div className="w-px shrink-0" />
      </div>
    </section>
  );
}
