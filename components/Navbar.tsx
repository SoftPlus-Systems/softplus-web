"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "./PlusLogo";
import { contact, nav } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 ease-cinematic lg:px-10 ${
            scrolled ? "rounded-full border border-surface-line bg-ink-950/80 py-2.5 backdrop-blur-xl mx-4 lg:mx-10" : ""
          }`}
        >
          <a href="#top" data-cursor="link" className="text-bone">
            <Wordmark className="h-8 lg:h-9" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="link"
                className="group relative font-mono text-xs uppercase tracking-wide-2 text-mist transition-colors duration-300 hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 ease-cinematic group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="#contact" variant="ghost" className="!px-6 !py-3 !text-[11px]">
              Start a project
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-bone"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-bone"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-surface-line py-4 font-display text-4xl font-medium text-bone"
                >
                  <span className="mr-3 font-mono text-sm text-signal">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wide-2 text-mist sm:flex-row sm:items-center sm:justify-between">
              <span>Soft+Systems</span>
              <a href={`mailto:${contact.email}`} className="transition-colors duration-300 hover:text-bone">
                Email us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
