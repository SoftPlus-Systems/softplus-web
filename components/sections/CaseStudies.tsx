"use client";

import { motion } from "framer-motion";
import { caseStudies } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectMockup from "./ProjectMockup";

export default function CaseStudies() {
  return (
    <section id="work" className="relative bg-ink-950 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Real systems.
              <br />
              Real operations.
            </>
          }
          description="A sample of the platforms we've engineered — each one a live system a business runs on today."
        />
      </div>

      <div className="mt-12 flex flex-col gap-16 sm:mt-20 sm:gap-20 lg:gap-28">
        {caseStudies.map((project, i) => (
          <motion.div
            key={project.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            // once: false meant every project re-animated each time it came
            // back into view, which made scrolling back up feel unsettled.
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[1400px] px-6 lg:px-10"
          >
            <div
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                data-cursor="view"
                className="group aspect-[4/3] w-full origin-center transition-transform duration-500 ease-cinematic hover:scale-[1.01]"
              >
                <ProjectMockup index={i} type={project.type} />
              </div>

              <div>
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wide-2 text-mist">
                  <span className="text-signal">{project.index}</span>
                  {project.category}
                </div>
                <h3 className="mt-5 font-display text-3xl font-medium tracking-tightest text-bone sm:text-4xl lg:text-5xl">
                  {project.name}
                </h3>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">{project.description}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-surface-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide-2 text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Several results are words, not figures ("Multi-entity",
                    "Windows + Mobile"), which no three-column grid holds at
                    phone width. They read as a spec list there instead. */}
                <div className="mt-8 grid gap-3 border-t border-surface-line pt-6 sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:pt-8">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-4 border-b border-surface-line pb-3 last:border-0 last:pb-0 sm:block sm:border-0 sm:pb-0"
                    >
                      <div className="font-display text-xl font-medium text-signal sm:text-2xl lg:text-3xl">
                        {r.value}
                      </div>
                      <div className="text-xs text-mist sm:mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
