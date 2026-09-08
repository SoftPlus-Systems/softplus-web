"use client";

import { motion } from "framer-motion";
import type { MockupType } from "@/lib/data";

const palettes = [
  { a: "#c6ff5e", b: "#0f130a" },
  { a: "#4dd8ff", b: "#0a1216" },
  { a: "#ff7a3d", b: "#160f0a" },
  { a: "#c6ff5e", b: "#0a1216" },
  { a: "#4dd8ff", b: "#100f16" },
  { a: "#ff7a3d", b: "#0f130a" },
  { a: "#c6ff5e", b: "#0a1216" },
  { a: "#4dd8ff", b: "#0f130a" },
];

function Bars({ color }: { color: string }) {
  const bars = [72, 40, 88, 56, 30, 64];
  return (
    <div className="flex flex-1 items-end gap-2 rounded-lg border border-surface-line p-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: "10%" }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 rounded-t-sm"
          style={{ background: i % 3 === 0 ? color : `${color}55` }}
        />
      ))}
    </div>
  );
}

function StatTile({ color, wide = false }: { color: string; wide?: boolean }) {
  return (
    <div className="rounded-lg border border-surface-line p-3">
      <div className="h-2 w-8 rounded-full" style={{ background: color, opacity: 0.7 }} />
      <div className={`mt-3 h-3 rounded-full bg-bone/15 ${wide ? "w-14" : "w-10"}`} />
    </div>
  );
}

function ErpBody({ color }: { color: string }) {
  return (
    <div className="grid flex-1 grid-cols-4 gap-4 p-6">
      <div className="col-span-1 flex flex-col gap-3 rounded-lg border border-surface-line p-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full"
            style={{ background: i === 1 ? color : "rgba(243,244,239,0.1)", opacity: i === 1 ? 0.8 : 1 }}
          />
        ))}
      </div>
      <div className="col-span-3 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatTile key={i} color={color} />
          ))}
        </div>
        <Bars color={color} />
      </div>
    </div>
  );
}

function AccountingBody({ color }: { color: string }) {
  const rows = [58, 82, 40, 70, 34];
  return (
    <div className="grid flex-1 grid-cols-3 gap-4 p-6">
      <div className="col-span-2 flex flex-col gap-2.5 rounded-lg border border-surface-line p-4">
        {rows.map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-2 w-10 rounded-full bg-bone/10" />
            <div className="h-2 flex-1 rounded-full bg-bone/10" style={{ maxWidth: `${w}%` }} />
            <div className="h-2 w-8 rounded-full" style={{ background: i === 0 ? color : "rgba(243,244,239,0.15)" }} />
          </div>
        ))}
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <div className="flex-1 rounded-lg border border-surface-line p-3">
          <div className="h-2 w-10 rounded-full" style={{ background: color, opacity: 0.7 }} />
          <svg viewBox="0 0 100 40" className="mt-3 h-10 w-full">
            <polyline
              points="0,32 15,24 30,28 45,14 60,18 75,6 100,10"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <StatTile color={color} wide />
      </div>
    </div>
  );
}

function StockBody({ color }: { color: string }) {
  const items = [80, 45, 62, 30, 90, 55];
  return (
    <div className="grid flex-1 grid-cols-3 gap-3 p-6">
      {items.map((level, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg border border-surface-line p-3">
          <div
            className="aspect-square w-full rounded-md"
            style={{ background: `linear-gradient(135deg, ${color}33, transparent)`, border: `1px solid ${color}33` }}
          />
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone/10">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="h-full rounded-full"
              style={{ background: level < 40 ? "#ff7a3d" : color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PosBody({ color }: { color: string }) {
  return (
    <div className="grid flex-1 grid-cols-5 gap-4 p-6">
      <div className="col-span-3 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg"
            style={{
              background: i === 4 ? `${color}33` : "rgba(243,244,239,0.05)",
              border: `1px solid ${i === 4 ? color + "66" : "rgba(243,244,239,0.08)"}`,
            }}
          />
        ))}
      </div>
      <div className="col-span-2 flex flex-col gap-2 rounded-lg border border-surface-line p-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="h-2 flex-1 rounded-full bg-bone/10" />
            <div className="h-2 w-6 rounded-full bg-bone/15" />
          </div>
        ))}
        <div className="mt-auto flex items-center justify-between border-t border-surface-line pt-3">
          <div className="h-2.5 w-10 rounded-full" style={{ background: color }} />
          <div className="h-3 w-12 rounded-full" style={{ background: color, opacity: 0.8 }} />
        </div>
      </div>
    </div>
  );
}

function MenuBody({ color }: { color: string }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div
        className="h-16 w-full shrink-0 rounded-lg"
        style={{ background: `linear-gradient(120deg, ${color}44, transparent)`, border: `1px solid ${color}33` }}
      />
      <div className="grid flex-1 grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border border-surface-line p-2.5">
            <div
              className="aspect-square w-full rounded-md"
              style={{ background: `${color}22` }}
            />
            <div className="h-1.5 w-4/5 rounded-full bg-bone/15" />
            <div className="h-1.5 w-1/3 rounded-full" style={{ background: color, opacity: 0.7 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackBody({ color }: { color: string }) {
  const rows = [70, 50, 85];
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-surface-line p-6">
        <div className="h-2 w-24 rounded-full bg-bone/10" />
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg leading-none" style={{ color: i < 4 ? color : "rgba(243,244,239,0.15)" }}>
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {rows.map((w, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-surface-line p-3">
            <div className="h-6 w-6 shrink-0 rounded-full" style={{ background: `${color}33` }} />
            <div className="h-2 rounded-full bg-bone/10" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

const desktopBodies: Record<string, (p: { color: string }) => JSX.Element> = {
  erp: ErpBody,
  accounting: AccountingBody,
  stock: StockBody,
  pos: PosBody,
  "website-menu": MenuBody,
  "website-feedback": FeedbackBody,
};

function DesktopFrame({ type, color, bg }: { type: MockupType; color: string; bg: string }) {
  const Body = desktopBodies[type] ?? ErpBody;
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-surface-line"
      style={{ background: bg }}
    >
      <div className="flex items-center gap-2 border-b border-surface-line px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color, opacity: 0.8 }} />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
        <div className="ml-4 h-2.5 flex-1 max-w-[140px] rounded-full bg-bone/10" />
      </div>
      <Body color={color} />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full blur-[70px]"
        style={{ background: color, opacity: 0.25 }}
      />
    </div>
  );
}

function MedicalRows({ color }: { color: string }) {
  const rows = [
    { w: 70, chip: "10:30" },
    { w: 55, chip: "11:15" },
    { w: 62, chip: "1:00" },
    { w: 45, chip: "2:45" },
  ];
  return (
    <>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg border border-surface-line p-2.5">
          <div className="h-7 w-7 shrink-0 rounded-full" style={{ background: `${color}33` }} />
          <div className="h-2 rounded-full bg-bone/15" style={{ width: `${r.w}%` }} />
          <div
            className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[7px] font-medium"
            style={{ background: `${color}22`, color }}
          >
            {r.chip}
          </div>
        </div>
      ))}
    </>
  );
}

function InvoiceRows({ color }: { color: string }) {
  const rows = [
    { w: 65, status: "Paid", ok: true },
    { w: 50, status: "Paid", ok: true },
    { w: 72, status: "Due", ok: false },
    { w: 40, status: "Paid", ok: true },
  ];
  return (
    <>
      {rows.map((r, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg border border-surface-line p-2.5">
          <div className="flex items-center justify-between">
            <div className="h-2 rounded-full bg-bone/15" style={{ width: `${r.w}%` }} />
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[7px] font-medium"
              style={{ background: r.ok ? `${color}22` : "rgba(255,122,61,0.18)", color: r.ok ? color : "#ff7a3d" }}
            >
              {r.status}
            </span>
          </div>
          <div className="h-1.5 w-1/3 rounded-full bg-bone/10" />
        </div>
      ))}
    </>
  );
}

function PhoneFrame({ type, color }: { type: MockupType; color: string }) {
  const label = type === "mobile-medical" ? "Appointments" : "Invoices";
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="pointer-events-none absolute h-56 w-56 rounded-full blur-[80px]"
        style={{ background: color, opacity: 0.2 }}
      />
      <div className="relative flex h-full max-h-[340px] w-[190px] flex-col overflow-hidden rounded-[2rem] border border-surface-line-strong bg-ink-950 shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-3 font-mono text-[8px] text-bone/70">
          <span>9:41</span>
          <span className="h-2.5 w-10 rounded-full bg-bone/20" />
        </div>
        <div className="mt-3 px-4">
          <div className="h-2.5 w-20 rounded-full bg-bone/15" />
          <div className="mt-1 h-1.5 w-14 rounded-full" style={{ background: color, opacity: 0.7 }} />
        </div>
        <div className="mt-4 flex flex-1 flex-col gap-2 px-3 pb-4">
          {type === "mobile-medical" ? <MedicalRows color={color} /> : <InvoiceRows color={color} />}
        </div>
        <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-bone/20" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function ProjectMockup({ index, type }: { index: number; type: MockupType }) {
  const p = palettes[index % palettes.length];
  const isMobile = type === "mobile-medical" || type === "mobile-invoice";

  if (isMobile) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-surface-line"
        style={{ background: p.b }}
      >
        <PhoneFrame type={type} color={p.a} />
      </div>
    );
  }

  return <DesktopFrame type={type} color={p.a} bg={p.b} />;
}
