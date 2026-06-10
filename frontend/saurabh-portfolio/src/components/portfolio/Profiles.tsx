import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Code2, Trophy } from "lucide-react";
import { profiles } from "@/lib/portfolio-data";
import { Section } from "./Section";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  GeeksforGeeks: Trophy,
  LeetCode: Code2,
  LinkedIn: Linkedin,
};

export function Profiles() {
  return (
    <Section
      id="profiles"
      eyebrow="Coding Profiles"
      title={<span className="text-gradient">Where I practise & ship.</span>}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((p, i) => {
          const Icon = iconMap[p.name];
          return (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-center justify-between rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:glass-strong"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.handle}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.detail}</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
