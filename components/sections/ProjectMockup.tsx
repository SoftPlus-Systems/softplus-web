"use client";

import { motion } from "framer-motion";

const palettes = [
  { a: "#c6ff5e", b: "#0f130a" },
  { a: "#4dd8ff", b: "#0a1216" },
  { a: "#ff7a3d", b: "#160f0a" },
  { a: "#c6ff5e", b: "#0a1216" },
];

export default function ProjectMockup({ index }: { index: number }) {
  const p = palettes[index % palettes.length];
  const bars = [72, 40, 88, 56, 30, 64];

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-surface-line"
      style={{ background: p.b }}
    >
      <div className="flex items-center gap-2 border-b border-surface-line px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.a, opacity: 0.8 }} />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
        <div className="ml-4 h-2.5 flex-1 max-w-[140px] rounded-full bg-bone/10" />
      </div>

      <div className="grid flex-1 grid-cols-3 gap-4 p-6">
        <div className="col-span-1 flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-bone/10"
              style={{ width: `${90 - i * 12}%` }}
            />
          ))}
          <div className="mt-4 flex-1 rounded-lg" style={{ background: `${p.a}22`, border: `1px solid ${p.a}44` }} />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-end gap-2 rounded-lg border border-surface-line p-4" style={{ height: "60%" }}>
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: "10%" }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-sm"
                style={{ background: i % 3 === 0 ? p.a : `${p.a}55` }}
              />
            ))}
          </div>
          <div className="grid flex-1 grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-surface-line p-3">
                <div className="h-2 w-8 rounded-full" style={{ background: p.a, opacity: 0.7 }} />
                <div className="mt-3 h-3 w-10 rounded-full bg-bone/15" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full blur-[70px]"
        style={{ background: p.a, opacity: 0.25 }}
      />
    </div>
  );
}
