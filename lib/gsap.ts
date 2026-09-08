"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  // Mobile browsers resize the viewport when the address bar shows/hides on
  // scroll, which otherwise causes pinned sections to recalculate mid-scroll
  // and jump. This is GSAP's documented fix.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
