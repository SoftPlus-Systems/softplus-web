import { trustedBy } from "@/lib/data";
import PlusLogo from "@/components/PlusLogo";

export default function TrustBar() {
  const list = [...trustedBy, ...trustedBy];

  return (
    <section className="relative border-y border-surface-line bg-ink-950 py-10">
      <div className="mx-auto mb-8 max-w-[1400px] px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-wide-2 text-mist">
          Trusted by ambitious companies building the future
        </p>
      </div>

      <div className="relative mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16">
          {list.map((name, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap opacity-50 transition-opacity hover:opacity-100">
              <PlusLogo className="h-4 w-4 text-mist" />
              <span className="font-display text-xl font-medium tracking-tight text-bone">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
