"use client";

import Image from "next/image";
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

const screenshots: Record<MockupType, string> = {
  erp: "/case-studies/stackbooks.webp",
  accounting: "/case-studies/easyaccounting.webp",
  stock: "/case-studies/dressdesk.webp",
  pos: "/case-studies/pos.webp",
  "mobile-medical": "/case-studies/spmedical.webp",
  "mobile-invoice": "/case-studies/invoicing.webp",
  "website-menu": "/case-studies/menus.webp",
  "website-feedback": "/case-studies/feedback.webp",
};

const mobileShots = ["/case-studies/spmedicalmobile.webp", "/case-studies/spmedicalmobilepatient.webp"];

function DesktopFrame({ src, color, bg, children }: { src: string; color: string; bg: string; children?: React.ReactNode }) {
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
      <div className="relative flex-1 overflow-hidden">
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
      </div>
      {children}
      {/* A radial gradient reads the same as a blurred disc here but costs the
          compositor nothing when the card is scaled on hover. */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}33, transparent 70%)` }}
      />
    </div>
  );
}

function Phone({ src, width }: { src: string; width: number }) {
  return (
    <div
      className="relative flex h-full max-h-[340px] flex-col overflow-hidden rounded-[1.75rem] border border-surface-line-strong bg-ink-950 shadow-2xl"
      style={{ width }}
    >
      <div className="relative flex-1 overflow-hidden">
        <Image src={src} alt="" fill sizes={`${width}px`} className="object-cover object-top" />
      </div>
      <div className="mx-auto mb-1.5 h-1 w-12 rounded-full bg-bone/20" />
    </div>
  );
}

function PhoneFrame({ src, color }: { src: string; color: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="pointer-events-none absolute h-56 w-56 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}2b, transparent 70%)` }}
      />
      <Phone src={src} width={190} />
    </div>
  );
}

// SP Medical ships as both a Windows desktop console and a companion mobile
// app, so its case study shows the desktop screen with the two real phone
// screens fanned across the bottom-right corner rather than picking one.
function CrossPlatformFrame({ color, bg }: { color: string; bg: string }) {
  return (
    <DesktopFrame src={screenshots["mobile-medical"]} color={color} bg={bg}>
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-end gap-2 sm:bottom-4 sm:right-4 sm:gap-2.5">
        <div className="h-[92px] w-[46px] overflow-hidden rounded-[0.7rem] border border-surface-line-strong bg-ink-950 shadow-2xl sm:h-[124px] sm:w-[62px]">
          <div className="relative h-full w-full">
            <Image src={mobileShots[0]} alt="" fill sizes="62px" className="object-cover object-top" />
          </div>
        </div>
        <div className="h-[104px] w-[52px] overflow-hidden rounded-[0.7rem] border border-surface-line-strong bg-ink-950 shadow-2xl sm:h-[140px] sm:w-[70px]">
          <div className="relative h-full w-full">
            <Image src={mobileShots[1]} alt="" fill sizes="70px" className="object-cover object-top" />
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}

export default function ProjectMockup({ index, type }: { index: number; type: MockupType }) {
  const p = palettes[index % palettes.length];

  if (type === "mobile-medical") {
    return <CrossPlatformFrame color={p.a} bg={p.b} />;
  }

  if (type === "mobile-invoice") {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-surface-line"
        style={{ background: p.b }}
      >
        <PhoneFrame src={screenshots[type]} color={p.a} />
      </div>
    );
  }

  return <DesktopFrame src={screenshots[type]} color={p.a} bg={p.b} />;
}
