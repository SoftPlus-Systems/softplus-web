import { stats } from "@/lib/data";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Stats() {
  return (
    <section className="relative border-y border-surface-line bg-ink-950 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-14 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`relative ${i > 0 ? "lg:pl-8 lg:border-l lg:border-surface-line" : ""}`}>
              <div className="font-display text-4xl font-medium tracking-tightest text-bone sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-wide-2 text-mist">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
