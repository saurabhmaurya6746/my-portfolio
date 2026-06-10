import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
