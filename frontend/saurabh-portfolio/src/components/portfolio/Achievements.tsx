import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/lib/portfolio-data";
import { Section } from "./Section";

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={<span className="text-gradient">Recognition & milestones.</span>}
      description="A snapshot of competitive exams, awards, and consistent execution."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:glass-strong"
          >
            <div
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity group-hover:opacity-100"
            />
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="text-xs text-muted-foreground">{a.year}</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
