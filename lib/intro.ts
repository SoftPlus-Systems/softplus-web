"use client";

/**
 * The preloader and the hero timeline used to be coordinated by hand-tuned
 * delays (1.7s here, 2.4s there), which drifted apart whenever the loading
 * time changed. The preloader now announces when it is out of the way and
 * everything downstream waits on that instead.
 */
export const INTRO_READY_EVENT = "softplus:intro-ready";

export function markIntroReady() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.introReady = "true";
  window.dispatchEvent(new Event(INTRO_READY_EVENT));
}

export function isIntroReady() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.introReady === "true";
}

/** Runs `callback` once the intro is done. Returns a cleanup function. */
export function onIntroReady(callback: () => void) {
  if (isIntroReady()) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_READY_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_READY_EVENT, callback);
}
