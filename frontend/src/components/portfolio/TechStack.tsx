import { motion } from "framer-motion";
import { techStack } from "@/lib/portfolio-data";
import { Section } from "./Section";

export function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title={<span className="text-gradient">Tools I build with.</span>}
      description="A focused stack across AI/ML, backend, and modern web."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(techStack).map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-2xl glass p-6 transition-all hover:glass-strong"
          >
            <div className="text-xs uppercase tracking-wider text-primary">{group}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-white/5 px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
