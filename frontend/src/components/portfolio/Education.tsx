import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/portfolio-data";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={<span className="text-gradient">Academic foundation.</span>}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl glass p-6 transition-all hover:glass-strong"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{e.degree}</h3>
            <div className="mt-1 text-sm text-muted-foreground">{e.school}</div>
            <div className="mt-3 inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {e.score}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
