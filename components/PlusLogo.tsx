export default function PlusLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M16 8V24" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M8 16H24" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display font-semibold ${className}`}>
      <PlusLogo className="h-7 w-7 text-signal" />
      <span className="tracking-tight">
        Soft<span className="text-signal">+</span>Systems
      </span>
    </span>
  );
}
