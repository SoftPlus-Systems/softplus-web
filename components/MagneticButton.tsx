"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function MagneticButton({ children, href, onClick, variant = "primary", className }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(0.35);

  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-mono text-[13px] uppercase tracking-wide-2 transition-colors duration-500 ease-cinematic";

  const styles =
    variant === "primary"
      ? "bg-signal text-ink-950 hover:text-ink-950"
      : "border border-surface-line text-bone hover:border-signal/60";

  const content = (
    <>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-cinematic group-hover:translate-x-0" />
      )}
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-500 ease-cinematic group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (href) {
    return (
      // onClick matters on the link form too — the mobile menu uses it to close
      // itself when the in-page CTA is tapped.
      <a ref={ref} href={href} onClick={onClick} data-cursor="link" className={clsx(base, styles, className)}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-cursor="link"
      className={clsx(base, styles, className)}
    >
      {content}
    </button>
  );
}
