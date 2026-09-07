type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <div
        className={`mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-wide-3 ${
          light ? "text-ink-900/60" : "text-signal"
        } ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </div>
      <h2
        className={`font-display text-4xl font-medium leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl ${
          light ? "text-ink-950" : "text-bone"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? "text-ink-900/70" : "text-mist"}`}>{description}</p>
      )}
    </div>
  );
}
