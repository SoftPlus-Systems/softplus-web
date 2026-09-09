"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [seen, setSeen] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "view">("default");

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canHover && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3.out" });
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" });

    function move(e: MouseEvent) {
      // Until the pointer has actually moved there is no position to draw at,
      // and the ring would otherwise sit parked in the top-left corner.
      setSeen(true);
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    }

    function overCheck(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) setVariant("view");
      else if (target.closest("a, button, [data-cursor='link']")) setVariant("link");
      else setVariant("default");
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overCheck);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overCheck);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform", opacity: seen ? 1 : 0 }}
      >
        <div
          className={`flex items-center justify-center rounded-full border border-bone transition-all duration-200 ease-cinematic ${
            variant === "link"
              ? "h-11 w-11 border-signal bg-signal/10"
              : variant === "view"
              ? "h-16 w-16 border-signal bg-signal/10"
              : "h-7 w-7"
          }`}
        >
          {variant === "view" && (
            <span className="font-mono text-[10px] uppercase tracking-wide-2 text-bone">View</span>
          )}
        </div>
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal mix-blend-difference"
        style={{ willChange: "transform", opacity: seen ? 1 : 0 }}
      />
    </>
  );
}
