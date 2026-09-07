"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlusLogo from "./PlusLogo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      document.documentElement.classList.remove("preloading");
      return;
    }

    document.documentElement.classList.add("preloading");
    let raf: number;
    const start = performance.now();
    const duration = 1600;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("preloading");
        }, 250);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-ink-950"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <PlusLogo className="h-14 w-14 text-signal drop-shadow-glow" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: ["0 0 0px rgba(198,255,94,0)", "0 0 40px rgba(198,255,94,0.5)", "0 0 0px rgba(198,255,94,0)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="flex w-52 flex-col items-center gap-3">
            <div className="h-px w-full bg-surface-line">
              <motion.div
                className="h-full bg-signal"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums tracking-wide-2 text-mist">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
