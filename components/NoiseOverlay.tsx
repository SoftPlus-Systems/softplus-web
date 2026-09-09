"use client";

import { useLiteDevice } from "@/lib/capability";

export default function NoiseOverlay() {
  // A full-viewport SVG turbulence filter composited with `mix-blend-overlay`
  // makes every scroll frame a blend of the whole page. It is worth about 2%
  // opacity of texture, which is not worth that on a mid-range phone.
  const lite = useLiteDevice();
  if (lite) return null;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full opacity-[0.022] mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
