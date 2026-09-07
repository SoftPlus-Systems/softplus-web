"use client";

import { motion } from "framer-motion";
import { caseStudies } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import ProjectMockup from "./ProjectMockup";

export default function CaseStudies() {
  return (
    <section id="work" className="relative bg-ink-950 py-32 lg:py-44">
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

      <div className="mt-24 flex flex-col gap-28 lg:gap-36">
        {caseStudies.map((project, i) => (
          <motion.div
            key={project.index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[1400px] px-6 lg:px-10"
          >
            <div
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                data-cursor="view"
                className="group aspect-[4/3] w-full origin-center transition-transform duration-700 ease-cinematic hover:scale-[1.02]"
              >
                <ProjectMockup index={i} />
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

                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-surface-line pt-8">
                  {project.results.map((r) => (
                    <div key={r.label}>
                      <div className="font-display text-2xl font-medium text-signal sm:text-3xl">{r.value}</div>
                      <div className="mt-1 text-xs text-mist">{r.label}</div>
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
