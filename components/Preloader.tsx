"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlusLogo from "./PlusLogo";
import { markIntroReady } from "@/lib/intro";

// The old preloader ran a fixed 1.6s fake progress bar before anything else
// could start, so the site felt slow even when it had loaded instantly. This
// one waits on the real page load, gives up after MAX_WAIT either way, and
// stays out of the way entirely on subsequent navigations in the same tab.
const MAX_WAIT = 900;
const SEEN_KEY = "softplus:intro-seen";

export default function Preloader() {
  const [done, setDone] = useState(false);
  // Set when the intro is being skipped outright, so the overlay is dropped
  // without an exit animation instead of fading a black panel over a black page.
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Private-mode browsers can throw on sessionStorage; not worth failing over.
    }

    if (reduced || alreadySeen) {
      // `preloading` ships in the server-rendered markup and locks scrolling;
      // it has to come off here too, not just on the animated path.
      document.documentElement.classList.remove("preloading");
      setSkip(true);
      setDone(true);
      markIntroReady();
      return;
    }

    document.documentElement.classList.add("preloading");

    let settled = false;
    const timer = window.setTimeout(finish, MAX_WAIT);

    function onLoad() {
      // Even on a warm cache, hold just long enough for the mark to register
      // as intentional rather than a flash.
      window.setTimeout(finish, 220);
    }

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    function finish() {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // See above.
      }
      document.documentElement.classList.remove("preloading");
      setDone(true);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      document.documentElement.classList.remove("preloading");
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={markIntroReady}>
      {!done && (
        <motion.div
          data-preloader
          exit={{ opacity: 0 }}
          transition={{ duration: skip ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <PlusLogo className="h-10 w-10 text-signal" />
            <span className="h-px w-16 overflow-hidden bg-surface-line">
              <motion.span
                className="block h-full w-full origin-left bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
