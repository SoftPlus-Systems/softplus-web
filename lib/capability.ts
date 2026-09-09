"use client";

import { useEffect, useState } from "react";

/**
 * The baseline this site targets is a mid-range phone, not a flagship. A few
 * of the effects here are cheap on a desktop GPU and genuinely expensive on
 * that baseline — a full-viewport SVG noise filter under `mix-blend-overlay`,
 * `backdrop-filter` on a fixed bar over scrolling content, JS-driven smooth
 * scrolling, a pinned ScrollTrigger, a canvas render loop. Those are gated on
 * this check rather than shipped to every device and hoped for.
 *
 * The decision is deliberately made on device class, not on a benchmark: a
 * touch device on a small screen gets the light path, and so does anything
 * asking for reduced data or reporting very few cores.
 */
export function isLiteDevice() {
  if (typeof window === "undefined") return false;

  const touchPhone =
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(max-width: 1023px)").matches;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  const saveData = nav.connection?.saveData === true;
  const fewCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;

  return touchPhone || saveData || (fewCores && lowMemory);
}

/**
 * Resolves after mount, so it is false during SSR and on the first client
 * render. Anything gated on it must therefore be safe to render as the full
 * version for one frame, or be mounted only once this returns true.
 */
export function useLiteDevice() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const update = () => setLite(isLiteDevice());
    update();

    const queries = [
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(max-width: 1023px)"),
    ];
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return lite;
}
